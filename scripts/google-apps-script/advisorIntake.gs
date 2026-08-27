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
//   3. Deploy -> New deployment -> Web app -> Execute as: Me,
//      Who has access: Anyone -> copy the deployment URL.
//   4. Put that URL into the site's NEXT_PUBLIC_ADVISOR_FORM_ENDPOINT env
//      var (see .env.example). It's fine for this URL to be public/client
//      -visible — it's an endpoint, not a secret — but the validation
//      below exists because anyone who finds it can POST to it directly.
//   5. Run doPost once manually from the Apps Script editor (or submit one
//      real test) to trigger the OAuth consent screen and confirm it
//      authorizes as the engage@kashtieducare.com Workspace identity —
//      that's what puts sent mail under the Workspace daily quota instead
//      of a personal Gmail account's.

const SHEET_ID = 'REPLACE_WITH_SHEET_ID';
const DRIVE_FOLDER_ID = 'REPLACE_WITH_DRIVE_FOLDER_ID';
const ADMIN_EMAIL = 'engage@kashtieducare.com';

const REQUIRED_FIELDS = ['name', 'email', 'phone', 'institution', 'designation', 'bio', 'institutionLogo', 'personalPhoto'];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB per image, matches the client-side cap

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Honeypot: the site's hidden "website" field should always arrive
    // empty from a real visitor. A bot that fills every field gets a
    // silent "ok" so it doesn't learn to leave the field blank.
    if (data.website) {
      return jsonResponse({ status: 'ok' });
    }

    const missing = REQUIRED_FIELDS.filter((field) => !data[field]);
    if (missing.length > 0) {
      return jsonResponse({ status: 'error', message: `Missing required field(s): ${missing.join(', ')}` });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return jsonResponse({ status: 'error', message: 'Invalid email address.' });
    }

    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Advisors')
      || SpreadsheetApp.openById(SHEET_ID).insertSheet('Advisors');
    const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);

    const logoFile = saveBase64File(data.institutionLogo, folder, `${data.name}-logo`);
    const photoFile = saveBase64File(data.personalPhoto, folder, `${data.name}-photo`);

    sheet.appendRow([
      new Date(), data.name, data.email, data.phone, data.institution,
      data.designation, data.bio, logoFile.getUrl(), photoFile.getUrl(),
    ]);

    MailApp.sendEmail({
      to: data.email,
      subject: 'Thanks for your interest in advising Kashti Educare',
      htmlBody: `<p>Hi ${data.name},</p><p>We've received your application
        and will review it shortly.</p><p>— Team Kashti Educare</p>`,
    });

    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: `New advisor application — ${data.name}`,
      htmlBody: `<p><strong>${data.name}</strong> (${data.institution},
        ${data.designation}) applied.</p><p>${data.bio}</p>
        <p>Logo: ${logoFile.getUrl()}<br>Photo: ${photoFile.getUrl()}</p>`,
    });

    return jsonResponse({ status: 'ok' });
  } catch (err) {
    return jsonResponse({ status: 'error', message: err.message });
  }
}

function saveBase64File(base64Data, folder, filenamePrefix) {
  const matches = base64Data.match(/^data:(.+);base64,(.+)$/);
  if (!matches) throw new Error(`Malformed image data for ${filenamePrefix}`);
  const bytes = Utilities.base64Decode(matches[2]);
  if (bytes.length > MAX_IMAGE_BYTES) throw new Error(`Image too large: ${filenamePrefix}`);
  const blob = Utilities.newBlob(bytes, matches[1], filenamePrefix);
  return folder.createFile(blob);
}

function jsonResponse(body) {
  return ContentService.createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
