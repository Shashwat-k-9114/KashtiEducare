// advisorIntake.gs
//
// MIRROR ONLY — this file is version-controlled for reference, but it is
// NOT the source of truth for what's actually running. The live copy
// lives in a standalone Apps Script project deployed as a Web App
// (script.google.com), separate from this repo. If you edit the deployed
// script, copy the change back into this file too so they don't drift.
//
// Deployment (manual, in script.google.com):
//   1. New Apps Script project -> paste this file's contents.
//   2. Create the target Sheet and Drive folder first, then set SHEET_ID
//      and DRIVE_FOLDER_ID below to their real IDs.
//   3. Run setupAndTest() once (select it in the function dropdown next to
//      "Debug", click Run) — NOT doPost. doPost(e) requires a real HTTP
//      request's event object; running it directly from the editor passes
//      no argument, so `e` is undefined and the function fails before ever
//      touching Sheets, Drive, or Mail — it looks like it "ran" but never
//      exercises (or authorizes) any of those scopes. setupAndTest() takes
//      no arguments, so the Run button works on it, and it deliberately
//      writes one row, uploads one tiny real file to Drive, and sends one
//      real email so the authorization prompt covers all three scopes
//      doPost needs.
//   4. Deploy -> New deployment -> Web app -> Execute as: Me,
//      Who has access: Anyone -> copy the deployment URL.
//   5. Put that URL into the site's NEXT_PUBLIC_ADVISOR_FORM_ENDPOINT env
//      var (see .env.example) — in Vercel's Environment Variables, not
//      just a local .env file — and redeploy the site. NEXT_PUBLIC_ vars
//      are baked into the JS bundle at build time; adding it to Vercel
//      without triggering a new build/deploy has no effect.
//   Validation below (required fields, MIME allowlist, size cap) exists
//   because this URL is public/client-visible by design — anyone who
//   finds it can POST to it directly, not just this site's own form.

const SHEET_ID = 'REPLACE_WITH_SHEET_ID';
const DRIVE_FOLDER_ID = 'REPLACE_WITH_DRIVE_FOLDER_ID';
const ADMIN_EMAIL = 'engage@kashtieducare.com';
const SHEET_NAME = 'Advisors';
const HEADERS = ['Timestamp', 'Name', 'Email', 'Phone', 'Institution', 'Designation', 'Bio', 'Logo URL', 'Photo URL'];

const REQUIRED_FIELDS = ['name', 'email', 'phone', 'institution', 'designation', 'bio', 'institutionLogo', 'personalPhoto'];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB per image, matches the client-side cap
const ALLOWED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Honeypot: the site's hidden "honeypot" field should always arrive
    // empty from a real visitor. A bot that fills every field gets a
    // silent "ok" so it doesn't learn to leave the field blank.
    if (data.honeypot) {
      return jsonResponse({ status: 'ok' });
    }

    const missing = REQUIRED_FIELDS.filter((field) => !data[field]);
    if (missing.length > 0) {
      return jsonResponse({ status: 'error', message: `Missing required field(s): ${missing.join(', ')}` });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return jsonResponse({ status: 'error', message: 'Invalid email address.' });
    }

    const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
    const safeName = sanitizeFilename_(data.name);
    const logoFile = saveBase64File(data.institutionLogo, folder, `${safeName}-logo`);
    const photoFile = saveBase64File(data.personalPhoto, folder, `${safeName}-photo`);

    appendAdvisorRow(data, logoFile.getUrl(), photoFile.getUrl());

    // Email sends are each wrapped separately: a failure in one must not
    // skip the other, and neither should undo the Sheet row / Drive
    // uploads that already succeeded.
    try {
      MailApp.sendEmail({
        to: data.email,
        subject: 'Thanks for your interest in advising Kashti Educare',
        htmlBody: acknowledgementTemplate_(data),
      });
    } catch (mailErr) {
      logMailFailure_('acknowledgement', data.email, mailErr);
    }

    try {
      MailApp.sendEmail({
        to: ADMIN_EMAIL,
        subject: `New advisor application — ${data.name}`,
        htmlBody: adminNotificationTemplate_(data, logoFile.getUrl(), photoFile.getUrl()),
      });
    } catch (mailErr) {
      logMailFailure_('admin notification', ADMIN_EMAIL, mailErr);
    }

    return jsonResponse({ status: 'ok' });
  } catch (err) {
    return jsonResponse({ status: 'error', message: err.message });
  }
}

function appendAdvisorRow(data, logoUrl, photoUrl) {
  const sheet = getSheet_();
  sheet.appendRow([
    new Date(),
    sanitizeForSheet_(data.name),
    sanitizeForSheet_(data.email),
    sanitizeForSheet_(data.phone),
    sanitizeForSheet_(data.institution),
    sanitizeForSheet_(data.designation),
    sanitizeForSheet_(data.bio),
    logoUrl,
    photoUrl,
  ]);
}

function getSheet_() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
  }
  return sheet;
}

function saveBase64File(base64Data, folder, filenamePrefix) {
  const matches = base64Data.match(/^data:(.+);base64,(.+)$/);
  if (!matches) throw new Error(`Malformed image data for ${filenamePrefix}`);
  const mimeType = matches[1];
  if (ALLOWED_IMAGE_MIME_TYPES.indexOf(mimeType) === -1) {
    throw new Error(`Unsupported image type for ${filenamePrefix}: ${mimeType}`);
  }
  const bytes = Utilities.base64Decode(matches[2]);
  if (bytes.length > MAX_IMAGE_BYTES) throw new Error(`Image too large: ${filenamePrefix}`);
  const blob = Utilities.newBlob(bytes, mimeType, filenamePrefix);
  return folder.createFile(blob);
}

/** Drive filenames aren't a real filesystem path (no traversal risk), but
 * an unbounded/odd name is still worth capping and cleaning up for a
 * folder a human will browse. */
function sanitizeFilename_(name) {
  const cleaned = String(name || 'advisor').replace(/[\r\n\t]/g, ' ').trim();
  return cleaned.slice(0, 80) || 'advisor';
}

function sanitizeForSheet_(value) {
  const str = value === undefined || value === null ? '' : String(value);
  return /^[=+\-@]/.test(str) ? `'${str}` : str;
}

function escapeHtml_(value) {
  const str = value === undefined || value === null ? '' : String(value);
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function logMailFailure_(which, to, err) {
  console.error(`Failed to send ${which} email to ${to}: ${err.message}`);
}

function jsonResponse(body) {
  return ContentService.createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}

function acknowledgementTemplate_(data) {
  return `<p>Hi ${escapeHtml_(data.name)},</p><p>We've received your application
    and will review it shortly.</p><p>— Team Kashti Educare</p>`;
}

function adminNotificationTemplate_(data, logoUrl, photoUrl) {
  return `<p><strong>${escapeHtml_(data.name)}</strong> (${escapeHtml_(data.institution)},
    ${escapeHtml_(data.designation)}) applied.</p><p>${escapeHtml_(data.bio)}</p>
    <p>Logo: ${logoUrl}<br>Photo: ${photoUrl}</p>`;
}

/**
 * Run this once from the Apps Script editor (function dropdown -> Run) —
 * NOT doPost. Exercises the exact same Sheets + Drive + Mail scopes
 * doPost uses (a 1x1 transparent PNG is uploaded for real), so the
 * authorization prompt it triggers covers all three. Writes one
 * clearly-labeled test row, one small test file in the Drive folder, and
 * sends one real test email — safe to run once, delete the test row/file
 * afterward if you don't want them kept.
 */
function setupAndTest() {
  // A real, valid 1x1 transparent PNG — small enough to be an obviously
  // throwaway test file, but real enough to exercise MIME validation and
  // actual Drive upload, not a stub.
  const onePixelPng =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';

  const testData = {
    name: 'Setup Test — safe to delete',
    email: ADMIN_EMAIL,
    phone: '',
    institution: 'Setup Test',
    designation: 'Setup Test',
    bio: 'This row confirms Sheets + Drive + Mail authorization for advisorIntake.gs. Delete it once verified.',
  };

  const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
  const safeName = sanitizeFilename_(testData.name);
  const logoFile = saveBase64File(onePixelPng, folder, `${safeName}-logo`);
  const photoFile = saveBase64File(onePixelPng, folder, `${safeName}-photo`);
  appendAdvisorRow(testData, logoFile.getUrl(), photoFile.getUrl());

  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject: 'advisorIntake.gs setup test — this worked',
    htmlBody: '<p>If you received this, Sheets, Drive, and Mail are all authorized correctly under this account.</p>',
  });
  console.log('setupAndTest complete — check the Sheet, the Drive folder, and your inbox at ' + ADMIN_EMAIL);
}
