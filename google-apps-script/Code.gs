/**
 * Kashti Educare: saves website form submissions into this Google Sheet
 * and sends the visitor a branded confirmation email.
 * Deploy as a Web app (see README, "Google Sheet setup"). Not part of the Next.js build.
 *
 * Script Properties (Project Settings -> Script properties):
 *   SECRET   any long random string; must equal GOOGLE_SCRIPT_SECRET on the website
 */
var SHEET_ID = "1cnfoN42WLOZoGJg5tZhgVSTEClshalhKgx09BhAWfyw";
var SITE = "https://kashtieducare.com";
var BRAND_EMAIL = "engage@kashtieducare.com";
var BRAND_PHONE = "+91 8307039685";
var SENDER_NAME = "Kashti Educare";

var TABS = {
  Enquiries: ["Received", "Role", "Name", "Institution / Organisation", "Email", "Phone", "Programme", "Learners / grades", "Message", "Consent", "Page", "Status", "Notes"],
  Newsletter: ["Received", "Email", "I am a", "Page"],
};
var CONTENT_HEADERS = ["Key", "Part", "Value", "Updated", "By"];
var LOG_HEADERS = ["Time", "Action", "Section", "By", "Summary"];
var STATUSES = ["New", "Contacted", "In discussion", "Won", "Closed", "Spam"];
var CHUNK = 40000; // a cell holds at most 50,000 characters

function doPost(e) {
  var lock = LockService.getScriptLock();
  var body, f;
  try {
    body = JSON.parse(e.postData.contents);
    var secret = PropertiesService.getScriptProperties().getProperty("SECRET");
    if (!secret || body.secret !== secret) return out_({ ok: false, error: "unauthorized" });
    if (body.action) return out_(admin_(body)); // admin portal calls (see ADMIN PORTAL section below)
    if (!TABS[body.sheet]) return out_({ ok: false, error: "unknown sheet" });

    lock.waitLock(20000);
    var sh = tab_(body.sheet, TABS[body.sheet]);
    f = body.fields || {};
    var row =
      body.sheet === "Enquiries"
        ? [new Date(), f.role, f.name, f.org, f.email, f.phone, f.programme, f.learners, f.message, f.consent, body.source, "New", ""]
        : [new Date(), f.email, f.role, body.source];
    // A leading = + - @ would be run as a formula; force plain text.
    row = row.map(function (v) {
      return typeof v === "string" && /^[=+\-@]/.test(v) ? "'" + v : v;
    });
    sh.appendRow(row);
  } catch (err) {
    return out_({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }

  // The row is saved. An email problem (quota, bad address) must never make the form look failed.
  // Each email is independent: if one fails the other is still sent.
  try {
    sendConfirmation_(body.sheet, f);
  } catch (mailErr) {
    console.error("confirmation email failed: " + mailErr);
  }
  try {
    notifyTeam_(body.sheet, f, body.source);
  } catch (mailErr) {
    console.error("team notification failed: " + mailErr);
  }
  return out_({ ok: true });
}

function out_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

/* =====================================================================
   CONFIRMATION EMAILS
   ===================================================================== */

function sendConfirmation_(sheet, f) {
  if (!f || !f.email) return;
  var mail = sheet === "Enquiries" ? enquiryEmail_(f, "cid:kashtilogo") : newsletterEmail_(f, "cid:kashtilogo");
  // The logo is bundled in this script (LOGO_B64 below, already cropped), so it never depends on a website being reachable.
  var logo = Utilities.newBlob(Utilities.base64Decode(LOGO_B64), "image/jpeg", "kashti-logo.jpg");
  MailApp.sendEmail({
    to: f.email,
    subject: mail.subject,
    body: mail.text,
    htmlBody: mail.html,
    name: SENDER_NAME,
    replyTo: BRAND_EMAIL,
    inlineImages: { kashtilogo: logo },
  });
}

/** Tells the Kashti team a form was submitted. Reply goes straight to the visitor for enquiries. */
function notifyTeam_(sheet, f, source) {
  if (!f) return;
  var isEnq = sheet === "Enquiries";
  var fields = isEnq
    ? [["Reaching out as", f.role], ["Name", f.name], ["Institution / Organisation", f.org], ["Email", f.email], ["Phone", f.phone], ["Programme", f.programme], ["Learners / grades", f.learners], ["Message", f.message], ["Consent", f.consent], ["Submitted from", source]]
    : [["Email", f.email], ["I am a", f.role], ["Submitted from", source]];
  var rows = fields.filter(function (r) { return r[1]; }).map(function (r) {
    return '<tr><td style="padding:9px 14px;border-bottom:1px solid ' + C.line + ";font-family:" + FONT + ";font-size:13px;font-weight:700;color:" + C.mute + ';width:34%;vertical-align:top;">' + r[0] +
      '</td><td style="padding:9px 14px;border-bottom:1px solid ' + C.line + ";font-family:" + FONT + ";font-size:14px;color:" + C.ink + ';vertical-align:top;">' + esc_(r[1]).replace(/\n/g, "<br>") + "</td></tr>";
  }).join("");
  var title = isEnq ? "New enquiry" : "New newsletter sign-up";
  var sheetUrl = "https://docs.google.com/spreadsheets/d/" + SHEET_ID + "/edit";
  var cta = (isEnq && f.email ? button_("Reply to " + esc_(firstName_(f.name)), "mailto:" + encodeURI(f.email), true) : "") + button_("Open in admin", SITE + "/admin/submissions", !isEnq) + button_("Open the sheet", sheetUrl, false);
  var html = '<!doctype html><html><body style="margin:0;padding:24px 12px;background:' + C.wash + ';"><table role="presentation" width="600" cellpadding="0" cellspacing="0" align="center" style="width:100%;max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;">' +
    '<tr><td style="background:' + C.navy + ";padding:22px 28px;font-family:" + FONT + ';"><div style="font-size:12px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:' + C.mint + ';">Kashti Educare &middot; website</div>' +
    '<div style="font-size:24px;font-weight:800;color:#ffffff;margin-top:6px;">' + title + "</div>" +
    (isEnq ? '<div style="font-size:14px;color:#D6E2FA;margin-top:6px;">' + esc_(f.name) + (f.org ? " &middot; " + esc_(f.org) : "") + "</div>" : "") + "</td></tr>" +
    '<tr><td style="padding:18px 14px 6px 14px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">' + rows + "</table></td></tr>" +
    '<tr><td style="padding:14px 28px 26px 28px;">' + cta + "</td></tr>" +
    '<tr><td style="padding:0 28px 22px 28px;font-family:' + FONT + ';font-size:12px;color:' + C.mute + ';">The visitor has been sent an automatic confirmation email. This row is also saved in the sheet.</td></tr></table></body></html>';
  var text = title + "\n\n" + fields.filter(function (r) { return r[1]; }).map(function (r) { return r[0] + ": " + r[1]; }).join("\n") + "\n\nSheet: " + sheetUrl;
  var subject = isEnq ? "New enquiry: " + (f.org || f.name) + " (" + f.role + ")" : "New newsletter sign-up: " + f.email;
  var opts = { to: BRAND_EMAIL, subject: subject, body: text, htmlBody: html, name: SENDER_NAME + " website" };
  if (isEnq && f.email) opts.replyTo = f.email;
  MailApp.sendEmail(opts);
}

function esc_(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function firstName_(name) {
  var n = String(name || "").trim().split(/\s+/)[0] || "there";
  return n.charAt(0).toUpperCase() + n.slice(1);
}

var FONT = "'Plus Jakarta Sans','Segoe UI',Helvetica,Arial,sans-serif";
var C = { navy: "#0B2A66", blue: "#0F3E9E", teal: "#0E8F86", mint: "#38D1C2", saffron: "#F4B321", ink: "#14213D", mute: "#5B6B8C", wash: "#F2F6FC", line: "#E1E8F4" };
var PHOTOS = {
  see: SITE + "/images/gallery/isro-visit-2.jpeg",
  build: SITE + "/images/gallery/leadership-session.jpeg",
  become: SITE + "/images/gallery/opj-visit-2.jpeg",
};

function button_(label, href, primary) {
  var bg = primary ? C.saffron : "#ffffff";
  var fg = primary ? C.navy : C.blue;
  var border = primary ? C.saffron : C.blue;
  return '<a href="' + href + '" style="display:inline-block;background:' + bg + ";color:" + fg + ";border:2px solid " + border +
    ";font-family:" + FONT + ';font-size:15px;font-weight:800;text-decoration:none;padding:13px 26px;border-radius:999px;margin:4px 6px 4px 0;">' + label + " &rarr;</a>";
}

function step_(n, color, title, text) {
  return '<tr><td valign="top" width="52" style="padding:0 0 18px 0;">' +
    '<table role="presentation" cellpadding="0" cellspacing="0"><tr><td align="center" valign="middle" width="40" height="40" style="width:40px;height:40px;border-radius:20px;background:' + color +
    ";color:#ffffff;font-family:" + FONT + ';font-size:17px;font-weight:800;">' + n + "</td></tr></table></td>" +
    '<td valign="top" style="padding:0 0 18px 0;font-family:' + FONT + ';"><div style="font-size:16px;font-weight:800;color:' + C.ink + ';">' + title +
    '</div><div style="font-size:14px;line-height:1.6;color:' + C.mute + ';margin-top:2px;">' + text + "</div></td></tr>";
}

function photo_(src, label, color, caption) {
  // Fixed-height background cell so all three photos line up whatever their proportions (cover-crop).
  return '<td width="33.33%" valign="top" style="padding:0 5px;"><img src="' + src + '" alt="' + esc_(caption) + '" width="170" height="140" style="display:block;width:100%;height:140px;border-radius:12px;border:0;object-fit:cover;background:' + color + ';">' +
    '<div style="font-family:' + FONT + ";font-size:13px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:" + color + ';padding-top:10px;">' + label + "</div></td>";
}

function shell_(logoSrc, preheader, heroEyebrow, heroTitle, heroText, inner) {
  return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>Kashti Educare</title></head>' +
    '<body style="margin:0;padding:0;background:' + C.wash + ';-webkit-text-size-adjust:100%;">' +
    '<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">' + esc_(preheader) + "&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;</div>" +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:' + C.wash + ';"><tr><td align="center" style="padding:28px 12px;">' +
    '<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 10px 40px rgba(11,42,102,.12);">' +
    // logo band
    // logoSrc is the pre-cropped logo (740x360); the band colour matches the image background so it blends in
    '<tr><td align="left" bgcolor="#FCFCFC" style="padding:18px 32px;background:#FCFCFC;border-bottom:1px solid ' + C.line + ';"><a href="' + SITE + '" style="text-decoration:none;">' +
    '<img src="' + logoSrc + '" alt="Kashti Educare" width="200" height="97" style="display:block;width:200px;height:auto;border:0;font-family:' + FONT + ';font-size:20px;font-weight:800;color:' + C.navy + ';"></a></td></tr>' +
    // hero
    '<tr><td bgcolor="' + C.navy + '" style="background-color:' + C.navy + ";background-image:linear-gradient(135deg," + C.navy + " 0%," + C.blue + " 62%," + C.teal + ' 125%);padding:44px 32px 40px 32px;">' +
    '<div style="font-family:' + FONT + ";font-size:12px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:" + C.mint + ';">' + heroEyebrow + "</div>" +
    '<div style="font-family:' + FONT + ';font-size:32px;line-height:1.18;font-weight:800;color:#ffffff;margin-top:14px;">' + heroTitle + "</div>" +
    '<div style="font-family:' + FONT + ';font-size:16px;line-height:1.65;color:#D6E2FA;margin-top:14px;">' + heroText + "</div>" +
    '<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:24px;"><tr><td width="56" height="5" style="background:' + C.saffron + ';border-radius:3px;font-size:0;line-height:0;">&nbsp;</td><td width="8"></td><td width="28" height="5" style="background:' + C.mint + ';border-radius:3px;font-size:0;line-height:0;">&nbsp;</td></tr></table>' +
    "</td></tr>" +
    inner +
    // footer
    '<tr><td style="background:' + C.navy + ';padding:30px 32px;font-family:' + FONT + ';">' +
    '<div style="font-size:15px;font-weight:800;color:#ffffff;">Kashti Educare</div>' +
    '<div style="font-size:13px;line-height:1.7;color:#B9C8E8;margin-top:6px;">Preparing learners for the world beyond the classroom.<br>Real world &middot; Real learning &middot; Real impact</div>' +
    '<div style="font-size:13px;line-height:1.9;color:#ffffff;margin-top:14px;"><a href="mailto:' + BRAND_EMAIL + '" style="color:' + C.mint + ';text-decoration:none;font-weight:700;">' + BRAND_EMAIL +
    '</a> &nbsp;&middot;&nbsp; <a href="tel:+918307039685" style="color:' + C.mint + ';text-decoration:none;font-weight:700;">' + BRAND_PHONE + "</a></div>" +
    '<div style="font-size:12px;line-height:1.6;color:#8FA3CC;margin-top:16px;border-top:1px solid #23407F;padding-top:14px;">You are receiving this one-time message because you submitted a form on <a href="' + SITE +
    '" style="color:#8FA3CC;">kashtieducare.com</a>. Just reply to this email if anything needs correcting.<br>&copy; 2026 Kashti Educare. All rights reserved.</div>' +
    "</td></tr></table></td></tr></table></body></html>";
}

function journeyBlock_() {
  return '<tr><td style="padding:8px 32px 8px 32px;font-family:' + FONT + ';"><div style="font-size:12px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:' + C.teal + ';">The Kashti experience model</div>' +
    '<div style="font-size:24px;font-weight:800;color:' + C.ink + ';margin:6px 0 16px 0;">See. Build. Become.</div>' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-left:-5px;"><tr>' +
    photo_(PHOTOS.see, "See", C.blue, "Students on a visit to ISRO") +
    photo_(PHOTOS.build, "Build", C.teal, "A leadership and mentorship session") +
    photo_(PHOTOS.become, "Become", "#C98A00", "A visit to O.P. Jindal Global University") +
    "</tr></table>" +
    '<div style="font-size:14px;line-height:1.65;color:' + C.mute + ';margin-top:14px;">Learners see real environments, build real skills, and become clearer about where learning leads next.</div></td></tr>';
}

function enquiryEmail_(f, logoSrc) {
  var first = firstName_(f.name);
  var rows = [["Institution", f.org], ["You are", f.role], ["Programme of interest", f.programme], ["Learners / grades", f.learners]]
    .filter(function (r) { return r[1]; })
    .map(function (r) {
      return '<tr><td style="padding:10px 0;border-bottom:1px solid ' + C.line + ";font-family:" + FONT + ";font-size:13px;font-weight:700;color:" + C.mute + ';width:42%;vertical-align:top;">' + r[0] +
        '</td><td style="padding:10px 0;border-bottom:1px solid ' + C.line + ";font-family:" + FONT + ";font-size:14px;font-weight:700;color:" + C.ink + ';vertical-align:top;">' + esc_(r[1]) + "</td></tr>";
    }).join("");
  var msg = f.message ? '<div style="margin-top:14px;padding:14px 16px;background:#ffffff;border-left:4px solid ' + C.saffron + ";border-radius:8px;font-family:" + FONT +
    ";font-size:14px;line-height:1.65;color:" + C.ink + ';">' + esc_(String(f.message).slice(0, 600)).replace(/\n/g, "<br>") + (String(f.message).length > 600 ? "&hellip;" : "") + "</div>" : "";

  var inner =
    '<tr><td style="padding:34px 32px 8px 32px;font-family:' + FONT + ';"><div style="font-size:12px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:' + C.teal + ';">Your enquiry at a glance</div>' +
    '<div style="background:' + C.wash + ";border-radius:14px;padding:6px 20px 20px 20px;margin-top:12px;\"><table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\">" + rows + "</table>" + msg + "</div></td></tr>" +
    '<tr><td style="padding:30px 32px 6px 32px;font-family:' + FONT + ';"><div style="font-size:12px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:' + C.teal + ';">What happens next</div>' +
    '<div style="font-size:24px;font-weight:800;color:' + C.ink + ';margin:6px 0 20px 0;">Three simple steps</div>' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">' +
    step_("1", C.blue, "We read your enquiry", "A Kashti programme manager reviews your institution, learners and goals.") +
    step_("2", C.teal, "We design a tailored proposal", "Formats from a 90-minute session to a full academic year, shaped around your calendar and NEP 2020 goals.") +
    step_("3", "#C98A00", "We plan it end to end", "Design, safety policy and on-ground delivery, so your learners step into the real world with confidence.") +
    "</table></td></tr>" +
    journeyBlock_() +
    '<tr><td style="padding:26px 32px 36px 32px;font-family:' + FONT + ';"><div style="font-size:15px;line-height:1.65;color:' + C.ink + ';margin-bottom:14px;">While you wait, explore what is possible:</div>' +
    button_("Explore programmes", SITE + "/programs", true) + button_("See moments from the field", SITE + "/gallery", false) + "</td></tr>";

  var html = shell_(logoSrc, "Thank you, " + first + ". We have received your enquiry and will reply with a tailored proposal.", "Real world &middot; Real learning &middot; Real impact",
    "Thank you, " + esc_(first) + ".<br>Your journey starts here.",
    "We have received your enquiry" + (f.org ? " for <strong style=\"color:#ffffff;\">" + esc_(f.org) + "</strong>" : "") + ". A programme manager will be in touch with a customised experiential-learning proposal.", inner);
  var text = "Thank you, " + first + ".\n\nWe have received your enquiry" + (f.org ? " for " + f.org : "") + ". A Kashti programme manager will reply with a tailored proposal.\n\n" +
    "What happens next:\n1. We read your enquiry\n2. We design a tailored proposal\n3. We plan it end to end\n\nExplore programmes: " + SITE + "/programs\n\nKashti Educare | " + BRAND_EMAIL + " | " + BRAND_PHONE;
  return { subject: "Thank you, " + first + ". We have received your enquiry | Kashti Educare", html: html, text: text };
}

function newsletterEmail_(f, logoSrc) {
  var inner =
    '<tr><td style="padding:34px 32px 8px 32px;font-family:' + FONT + ';"><div style="font-size:12px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:' + C.teal + ';">What to expect</div>' +
    '<div style="font-size:24px;font-weight:800;color:' + C.ink + ';margin:6px 0 20px 0;">Stories from the field</div>' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">' +
    step_("&#9998;", C.blue, "Field notes and ideas", "Short reads on experiential learning, from classrooms, campuses and industry visits.") +
    step_("&#9733;", C.teal, "Programme news", "New circuits, open applications and upcoming expeditions, first.") +
    step_("&#10064;", "#C98A00", "The Kashti magazine", "Long reads, photo essays and learner voices.") +
    "</table></td></tr>" +
    journeyBlock_() +
    '<tr><td style="padding:26px 32px 36px 32px;font-family:' + FONT + ';">' + button_("Read the latest", SITE + "/read", true) + button_("Explore programmes", SITE + "/programs", false) + "</td></tr>";
  var html = shell_(logoSrc, "You are on the Kashti Educare list. Welcome.", "Welcome aboard",
    "You are on the list.<br>Welcome to Kashti.", "Thank you for subscribing. Expect thoughtful stories on preparing learners for the world beyond the classroom.", inner);
  var text = "You are on the Kashti Educare list. Welcome.\n\nThank you for subscribing. Read the latest: " + SITE + "/read\n\nKashti Educare | " + BRAND_EMAIL + " | " + BRAND_PHONE;
  return { subject: "Welcome to Kashti Educare", html: html, text: text };
}

/* =====================================================================
   ADMIN PORTAL (content + submissions), called by the website server only
   ===================================================================== */

var ENQ_KEYS = ["received", "role", "name", "org", "email", "phone", "programme", "learners", "message", "consent", "page", "status", "notes"];
var NL_KEYS = ["received", "email", "role", "page"];

function tab_(name, headers) {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(headers);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  } else if (sh.getLastColumn() < headers.length) {
    // An older sheet without the newer columns (e.g. Status / Notes): add the headers.
    var r = sh.getRange(1, 1, 1, headers.length);
    r.setValues([headers]);
    r.setFontWeight("bold");
  }
  return sh;
}

function withLock_(fn) {
  var l = LockService.getScriptLock();
  l.waitLock(20000);
  try { return fn(); } finally { l.releaseLock(); }
}

function admin_(b) {
  try {
    switch (b.action) {
      case "content.getAll": return contentGetAll_();
      case "content.set": return withLock_(function () { return contentSet_(b); });
      case "content.reset": return withLock_(function () { return contentReset_(b); });
      case "subs.list": return { ok: true, enquiries: readRows_("Enquiries", ENQ_KEYS), newsletter: readRows_("Newsletter", NL_KEYS) };
      case "subs.update": return withLock_(function () { return subsUpdate_(b); });
      case "subs.delete": return withLock_(function () { return subsDelete_(b); });
      case "admin.dash": return dash_();
    }
    return { ok: false, error: "unknown action" };
  } catch (err) {
    return { ok: false, error: String(err && err.message ? err.message : err) };
  }
}

function log_(action, section, by, summary) {
  tab_("Changelog", LOG_HEADERS).appendRow([new Date(), action, section || "", by || "admin", summary || ""]);
}

/* ---- content: one JSON document per section, split into <=40k-char chunks (Content tab) ---- */

function contentGetAll_() {
  var sh = tab_("Content", CONTENT_HEADERS);
  var n = sh.getLastRow();
  var out = {}, updated = {};
  if (n > 1) {
    var vals = sh.getRange(2, 1, n - 1, 5).getValues();
    var parts = {};
    vals.forEach(function (r) {
      var k = r[0];
      if (!k) return;
      (parts[k] = parts[k] || []).push([Number(r[1]), String(r[2]).slice(1)]); // drop the "~" guard prefix
      updated[k] = r[3] instanceof Date ? r[3].toISOString() : String(r[3]);
    });
    Object.keys(parts).forEach(function (k) {
      parts[k].sort(function (a, b) { return a[0] - b[0]; });
      try { out[k] = JSON.parse(parts[k].map(function (p) { return p[1]; }).join("")); } catch (e) { /* skip a damaged section */ }
    });
  }
  return { ok: true, content: out, updated: updated };
}

function deleteKeyRows_(sh, key) {
  var n = sh.getLastRow();
  if (n < 2) return;
  var keys = sh.getRange(2, 1, n - 1, 1).getValues();
  for (var i = keys.length - 1; i >= 0; i--) if (keys[i][0] === key) sh.deleteRow(i + 2);
}

function contentSet_(b) {
  if (!/^[A-Za-z0-9_]{1,40}$/.test(b.key || "")) return { ok: false, error: "bad key" };
  var json = String(b.value);
  JSON.parse(json); // must be valid JSON
  var sh = tab_("Content", CONTENT_HEADERS);
  deleteKeyRows_(sh, b.key);
  var now = new Date(), rows = [];
  for (var i = 0, idx = 0; i < json.length; i += CHUNK, idx++) rows.push([b.key, idx, "~" + json.substr(i, CHUNK), now, b.by || "admin"]);
  var start = sh.getLastRow() + 1;
  sh.getRange(start, 3, rows.length, 1).setNumberFormat("@"); // plain text: never a number or formula
  sh.getRange(start, 1, rows.length, 5).setValues(rows);
  log_("Edited", b.key, b.by, b.summary);
  return { ok: true, parts: rows.length };
}

function contentReset_(b) {
  if (!/^[A-Za-z0-9_]{1,40}$/.test(b.key || "")) return { ok: false, error: "bad key" };
  deleteKeyRows_(tab_("Content", CONTENT_HEADERS), b.key);
  log_("Reset", b.key, b.by, b.summary);
  return { ok: true };
}

/* ---- submissions ---- */

function readRows_(name, keys) {
  var sh = tab_(name, TABS[name]);
  var n = sh.getLastRow();
  if (n < 2) return [];
  var vals = sh.getRange(2, 1, n - 1, keys.length).getValues();
  var emailIdx = keys.indexOf("email"), out = [];
  for (var i = 0; i < vals.length; i++) {
    if (!vals[i][emailIdx]) continue;
    var o = { row: i + 2 };
    for (var j = 0; j < keys.length; j++) {
      var v = vals[i][j];
      o[keys[j]] = v instanceof Date ? v.toISOString() : v == null ? "" : String(v);
    }
    if (name === "Enquiries" && !o.status) o.status = "New";
    out.push(o);
  }
  return out;
}

function checkRow_(sh, b) {
  var emailCol = b.sheet === "Enquiries" ? 5 : 2;
  if (b.row < 2 || b.row > sh.getLastRow()) throw new Error("That row no longer exists. Refresh and try again.");
  var actual = String(sh.getRange(b.row, emailCol).getValue()).toLowerCase();
  if (actual !== String(b.expectEmail).toLowerCase()) throw new Error("The sheet changed since you loaded it. Refresh and try again.");
}

function subsUpdate_(b) {
  if (!TABS[b.sheet]) return { ok: false, error: "unknown sheet" };
  var sh = tab_(b.sheet, TABS[b.sheet]);
  checkRow_(sh, b);
  if (b.sheet === "Enquiries") {
    if (b.status !== undefined) {
      if (STATUSES.indexOf(b.status) < 0) return { ok: false, error: "unknown status" };
      sh.getRange(b.row, 12).setValue(b.status);
    }
    if (b.notes !== undefined) {
      var note = String(b.notes).slice(0, 5000);
      sh.getRange(b.row, 13).setValue(/^[=+\-@]/.test(note) ? "'" + note : note);
    }
    log_("Updated", "Enquiries", b.by, "Row " + b.row + (b.status !== undefined ? " status: " + b.status : "") + (b.notes !== undefined ? " notes edited" : ""));
  }
  return { ok: true };
}

function subsDelete_(b) {
  if (!TABS[b.sheet]) return { ok: false, error: "unknown sheet" };
  var sh = tab_(b.sheet, TABS[b.sheet]);
  checkRow_(sh, b);
  sh.deleteRow(b.row);
  log_("Deleted", b.sheet, b.by, "Removed " + b.expectEmail);
  return { ok: true };
}

/* ---- dashboard ---- */

function dash_() {
  var enq = readRows_("Enquiries", ENQ_KEYS), nl = readRows_("Newsletter", NL_KEYS);
  var week = Date.now() - 7 * 86400000;
  var since = function (a) { return a.filter(function (r) { return new Date(r.received).getTime() >= week; }).length; };
  var logSh = tab_("Changelog", LOG_HEADERS), n = logSh.getLastRow(), log = [];
  if (n > 1) {
    var v = logSh.getRange(Math.max(2, n - 9), 1, Math.min(10, n - 1), 5).getValues();
    for (var i = v.length - 1; i >= 0; i--) log.push({ time: v[i][0] instanceof Date ? v[i][0].toISOString() : String(v[i][0]), action: v[i][1], section: v[i][2], by: v[i][3], summary: v[i][4] });
  }
  var c = contentGetAll_();
  return {
    ok: true,
    counts: {
      enquiries: enq.length,
      newEnquiries: enq.filter(function (r) { return r.status === "New"; }).length,
      newsletter: nl.length,
      enquiries7: since(enq),
      newsletter7: since(nl),
    },
    recent: enq.slice(-6).reverse(),
    log: log,
    edited: c.updated,
  };
}

/* Kashti logo, cropped to its artwork (740x360 JPEG, base64). Embedded so emails never depend on a website being reachable. */
var LOGO_B64 = "/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAQDAwMDAgQDAwMEBAQFBgoGBgUFBgwICQcKDgwPDg4MDQ0PERYTDxAVEQ0NExoTFRcYGRkZDxIbHRsYHRYYGRj/2wBDAQQEBAYFBgsGBgsYEA0QGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBj/wAARCAFoAuQDASIAAhEBAxEB/8QAHQABAAEFAQEBAAAAAAAAAAAAAAgBBQYHCQIDBP/EAGEQAAEDAgMEBAUKEgcECAcBAQEAAgMEEQUGIQcSMUEIUWFxEyKBkbMUMjdCcnWUobHRFRYXGCMzNThSVVZic3SCssHSJDQ2krTT8EOTovFEU1Rjg5XC4SVFRleEo8Nkhf/EABsBAQABBQEAAAAAAAAAAAAAAAAHAQIEBQYD/8QANREBAAEDAgQDCAIBAwUBAAAAAAECAwQFEQYSITE0UXETFBYyM0FSkSJhgSNCoRUksdHh8P/aAAwDAQACEQMRAD8An0iIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIlxe10QES4RAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBeXOaBqQFUmwvorNmHGqbBMHfUyuBJ8SOMHV5PyDt5LwyL9Nmiaq+0LqKZrmKY7rtJPDG3ee8NtzX5Pothzn7ja6FzuG6Hi60ximO4ni9QZKyqcWk3bG3xWt8nPqudT28rbvAX8a1zbhzXGZHF8UXJpt07x/bf2tBqqoiqudpSGbIx48Ugr1otLYHmnEcGljbJI+akvYxPJdu9rSeC29h9dDiFDFVQSB7Ht3muHMLoNK1i1n0/wAelTV5mBXiz/Ls/WiIt0whERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERCXlwBYQb2PUtUbQa18+Y20gfZkLQC3lvO1J81lte5sVqTaFSOhzYKix3J4wQeVx4p/gua4nmuMSZpbXSIp95jmWjL+EOxvG2UReY2Fpe91tQ0acO+y2BPs/wAEdRFkIkjmtutlErrk9ovu/EsAy/i5wbHWVpaXs3SyQDjYm/8ABbFqc+YIyh8JFUukmI0YGuBPfyC5zRPcfdqpyNuZtNT969tHs+zVdXSvo8QmpZN0ujkMRPDXrWxdmddJNh1VROJIhc17b8g4HTzg+da7q6t1biMtZK2zpZPCWtqCeXxLYWzGldHRVlW7hI5sYB57oNz/AMY8yxuHpmM//T+Wd3tqsf8Aafz+boz9ERSjHZyAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIiih0BOvkWM5xwM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";
