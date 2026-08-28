// enquiryForm.gs
//
// MIRROR ONLY — this file is version-controlled for reference, but it is
// NOT the source of truth for what's actually running. The live copy
// lives in a standalone Apps Script project deployed as a Web App
// (script.google.com), separate from this repo. If you edit the deployed
// script, copy the change back into this file too so they don't drift.
//
// Backs the site's normal /contact enquiry form (src/components/ContactForm.tsx).
//
// Deployment (manual, in script.google.com):
//   1. New Apps Script project -> paste this file's contents.
//   2. Create the target Sheet first, then set SHEET_ID below to its real ID.
//   3. Run setupAndTest() once (select it in the function dropdown next to
//      "Debug", click Run) — NOT doPost. doPost(e) requires a real HTTP
//      request's event object; running it directly from the editor passes
//      no argument, so `e` is undefined and the function fails before ever
//      touching Sheets or Mail — it looks like it "ran" but never
//      exercises (or authorizes) either scope. setupAndTest() takes no
//      arguments, so the Run button works on it, and it deliberately
//      writes one row and sends one real email so the authorization
//      prompt actually covers both scopes doPost needs.
//   4. Deploy -> New deployment -> Web app -> Execute as: Me,
//      Who has access: Anyone -> copy the deployment URL.
//   5. Put that URL into the site's NEXT_PUBLIC_ENQUIRY_FORM_ENDPOINT env
//      var (see .env.example) — in Vercel's Environment Variables, not
//      just a local .env file — and redeploy the site. NEXT_PUBLIC_ vars
//      are baked into the JS bundle at build time; adding it to Vercel
//      without triggering a new build/deploy has no effect.

const SHEET_ID = 'REPLACE_WITH_SHEET_ID';
const ADMIN_EMAIL = 'engage@kashtieducare.com';
const SHEET_NAME = 'Enquiries';
const HEADERS = ['Timestamp', 'Intent', 'Name', 'Email', 'Phone', 'Institution', 'Programme', 'Message'];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Honeypot: the site's hidden "honeypot" field should always arrive
    // empty from a real visitor. A bot that fills every field gets a
    // silent "ok" so it doesn't learn to leave the field blank.
    if (data.honeypot) {
      return jsonResponse({ status: 'ok' });
    }
    if (!data.name || !data.email || !isValidEmail(data.email)) {
      return jsonResponse({ status: 'error', message: 'Missing or invalid required fields' });
    }

    // The sheet write is the one step that must succeed for this to count
    // as "received" — if it throws, the outer catch reports a real error
    // to the visitor (nothing was recorded, so "try again" is correct).
    appendEnquiryRow(data);

    // Email sends are each wrapped separately: a MailApp quota error or
    // any other mail failure must not un-record an enquiry that was
    // already safely written to the Sheet, and a failure in one email
    // must not silently skip the other.
    try {
      MailApp.sendEmail({
        to: data.email,
        subject: "We've received your enquiry — Kashti Educare",
        htmlBody: acknowledgementTemplate(data),
      });
    } catch (mailErr) {
      logMailFailure_('acknowledgement', data.email, mailErr);
    }

    try {
      MailApp.sendEmail({
        to: ADMIN_EMAIL,
        subject: `New enquiry — ${data.name}${data.programmeName ? ` (${data.programmeName})` : ''}`,
        htmlBody: adminNotificationTemplate(data),
      });
    } catch (mailErr) {
      logMailFailure_('admin notification', ADMIN_EMAIL, mailErr);
    }

    return jsonResponse({ status: 'ok' });
  } catch (err) {
    return jsonResponse({ status: 'error', message: err.message });
  }
}

function appendEnquiryRow(data) {
  const sheet = getSheet_();
  sheet.appendRow([
    new Date(),
    sanitizeForSheet_(data.intent),
    sanitizeForSheet_(data.name),
    sanitizeForSheet_(data.email),
    sanitizeForSheet_(data.phone),
    sanitizeForSheet_(data.institution),
    sanitizeForSheet_(data.programmeName),
    sanitizeForSheet_(data.message),
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

/**
 * Google Sheets treats a cell value starting with =, +, -, or @ as a
 * formula, even when written via Apps Script's appendRow/setValue — a
 * malicious submitter could inject a formula that runs when the sheet is
 * later opened. Prefixing with a leading apostrophe forces Sheets to
 * store the value as literal text.
 */
function sanitizeForSheet_(value) {
  const str = value === undefined || value === null ? '' : String(value);
  return /^[=+\-@]/.test(str) ? `'${str}` : str;
}

/** Minimal HTML-escaping for values interpolated into email bodies — these
 * are user-submitted and go into an HTML email read by a real inbox. */
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
  // Apps Script's execution log (View -> Executions) — not visible to the
  // visitor, just a breadcrumb for whoever's checking why a mail didn't
  // arrive even though the Sheet row is there.
  console.error(`Failed to send ${which} email to ${to}: ${err.message}`);
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function acknowledgementTemplate(data) {
  const name = escapeHtml_(data.name);
  const programme = data.programmeName ? escapeHtml_(data.programmeName) : '';
  return `
    <div style="font-family: sans-serif; max-width: 480px;">
      <h2 style="color:#1a3a2e;">Thanks, ${name}!</h2>
      <p>We've received your enquiry${programme ? ` about <strong>${programme}</strong>` : ''}
         and will get back to you shortly.</p>
      <p>— Team Kashti Educare</p>
    </div>`;
}

function adminNotificationTemplate(data) {
  const rows = [
    ['Intent', data.intent], ['Name', data.name], ['Email', data.email],
    ['Phone', data.phone], ['Institution', data.institution],
    ['Programme', data.programmeName], ['Message', data.message],
  ].filter(([, v]) => v).map(([k, v]) => `<tr><td><strong>${escapeHtml_(k)}</strong></td><td>${escapeHtml_(v)}</td></tr>`).join('');
  return `<table>${rows}</table>`;
}

/**
 * Run this once from the Apps Script editor (function dropdown -> Run) —
 * NOT doPost. Exercises the exact same Sheets + Mail scopes doPost uses,
 * so the authorization prompt it triggers actually covers both. Writes
 * one clearly-labeled test row and sends one real test email to
 * ADMIN_EMAIL — safe to run once, delete the test row afterward if you
 * don't want it in the Sheet.
 */
function setupAndTest() {
  const testData = {
    intent: 'other',
    name: 'Setup Test — safe to delete this row',
    email: ADMIN_EMAIL,
    phone: '',
    institution: '',
    programmeName: '',
    message: 'This row confirms Sheets + Mail authorization for enquiryForm.gs. Delete it once you\'ve verified the setup.',
  };
  appendEnquiryRow(testData);
  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject: 'enquiryForm.gs setup test — this worked',
    htmlBody: '<p>If you received this, Sheets and Mail are both authorized correctly under this account.</p>',
  });
  console.log('setupAndTest complete — check the Sheet and your inbox at ' + ADMIN_EMAIL);
}
