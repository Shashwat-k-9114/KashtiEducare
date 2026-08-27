// enquiryForm.gs
//
// MIRROR ONLY — this file is version-controlled for reference, but it is
// NOT the source of truth for what's actually running. The live copy
// lives in a standalone Apps Script project deployed as a Web App
// (script.google.com), separate from this repo. If you edit the deployed
// script, copy the change back into this file too so they don't drift.
//
// Backs the site's normal /contact enquiry form (src/components/ContactForm.tsx).
// Prior to this, ContactForm's submit handler was a pure client-side stub
// (a fake setTimeout delay, no network call) — there was no working SMTP
// path to replace, despite a comment referencing an EMAIL_APP_PASSWORD env
// var that nothing ever actually read. This is the first real send path,
// not a replacement of working functionality. It follows the same
// Apps-Script-Web-App pattern as scripts/google-apps-script/advisorIntake.gs
// (one integration approach for both forms) rather than adding a second,
// SMTP-based mechanism.
//
// Deployment (manual, in script.google.com):
//   1. New Apps Script project -> paste this file's contents.
//   2. Create the target Sheet first, then set SHEET_ID below to its real ID.
//   3. Deploy -> New deployment -> Web app -> Execute as: Me,
//      Who has access: Anyone -> copy the deployment URL.
//   4. Put that URL into the site's NEXT_PUBLIC_ENQUIRY_FORM_ENDPOINT env
//      var (see .env.example). Public/client-visible by design — it's an
//      endpoint, not a secret.
//   5. Run doPost once manually from the Apps Script editor (or submit one
//      real test) to trigger the OAuth consent screen and confirm it
//      authorizes as the engage@kashtieducare.com Workspace identity —
//      that's what puts sent mail under the Workspace daily quota instead
//      of a personal Gmail account's.

const SHEET_ID = 'REPLACE_WITH_SHEET_ID';
const ADMIN_EMAIL = 'engage@kashtieducare.com';

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

    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Enquiries')
      || SpreadsheetApp.openById(SHEET_ID).insertSheet('Enquiries');

    sheet.appendRow([
      new Date(), data.intent || '', data.name, data.email, data.phone || '',
      data.institution || '', data.programmeName || '', data.message || '',
    ]);

    MailApp.sendEmail({
      to: data.email,
      subject: "We've received your enquiry — Kashti Educare",
      htmlBody: acknowledgementTemplate(data),
    });

    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: `New enquiry — ${data.name}${data.programmeName ? ` (${data.programmeName})` : ''}`,
      htmlBody: adminNotificationTemplate(data),
    });

    return jsonResponse({ status: 'ok' });
  } catch (err) {
    return jsonResponse({ status: 'error', message: err.message });
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function acknowledgementTemplate(data) {
  return `
    <div style="font-family: sans-serif; max-width: 480px;">
      <h2 style="color:#1a3a2e;">Thanks, ${data.name}!</h2>
      <p>We've received your enquiry${data.programmeName ? ` about <strong>${data.programmeName}</strong>` : ''}
         and will get back to you shortly.</p>
      <p>— Team Kashti Educare</p>
    </div>`;
}

function adminNotificationTemplate(data) {
  const rows = [
    ['Intent', data.intent], ['Name', data.name], ['Email', data.email],
    ['Phone', data.phone], ['Institution', data.institution],
    ['Programme', data.programmeName], ['Message', data.message],
  ].filter(([, v]) => v).map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${v}</td></tr>`).join('');
  return `<table>${rows}</table>`;
}
