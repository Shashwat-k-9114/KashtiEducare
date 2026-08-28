// connectSystem.gs
//
// MIRROR ONLY — this file is version-controlled for reference, but it is
// NOT the source of truth for what's actually running. The live copy
// lives in a standalone Apps Script project deployed as a Web App
// (script.google.com), separate from this repo. If you edit the deployed
// script, copy the change back into this file too so they don't drift.
//
// Backs the /connect link page (Links) + scan/click analytics
// (ScanEvents, ClickEvents) — one Sheet, three tabs, one Web App, an
// `action`-keyed router. Reached only from this site's own Next.js
// Route Handlers (src/app/api/connect/*, src/lib/connectApi.ts) — the
// public site never calls this URL directly from the browser.
//
// Deployment (manual, in script.google.com):
//   1. New Apps Script project -> paste this file's contents.
//   2. Create the target Sheet first (any name; tabs are created
//      automatically on first write), then set SHEET_ID below to its ID.
//   3. Pick a long random STATS_SECRET and set it below — it must match
//      the site's CONNECT_STATS_SECRET env var exactly. This gates every
//      admin action (stats, link create/update/delete/reorder,
//      links_admin) — public actions (scan, click, links) don't need it.
//   4. Deploy -> New deployment -> Web app -> Execute as: Me,
//      Who has access: Anyone -> copy the deployment URL into the site's
//      CONNECT_APPS_SCRIPT_URL env var (server-only, no NEXT_PUBLIC_
//      prefix — this URL is never sent to the browser).

const SHEET_ID = 'REPLACE_WITH_SHEET_ID';
const STATS_SECRET = 'REPLACE_WITH_STATS_SECRET';

const LINKS_SHEET_NAME = 'Links';
const SCAN_SHEET_NAME = 'ScanEvents';
const CLICK_SHEET_NAME = 'ClickEvents';

const LINKS_HEADERS = ['id', 'name', 'url', 'icon', 'description', 'category', 'position', 'enabled', 'archived', 'createdAt', 'updatedAt'];
const SCAN_HEADERS = ['id', 'visitorId', 'timestamp', 'campaign', 'referrer', 'country', 'region', 'city', 'deviceType', 'browser', 'operatingSystem'];
const CLICK_HEADERS = ['id', 'visitorId', 'linkId', 'timestamp', 'campaign'];

// ---------------------------------------------------------------------
// Entry points
// ---------------------------------------------------------------------

function doGet(e) {
  try {
    const action = e.parameter.action;
    if (action === 'links') return jsonResponse({ links: getPublicLinks() });
    if (action === 'links_admin') {
      if (!isAuthorized(e.parameter.secret)) return jsonResponse({ status: 'error', message: 'Unauthorized' });
      return jsonResponse({ links: getAllLinks() });
    }
    if (action === 'stats') {
      if (!isAuthorized(e.parameter.secret)) return jsonResponse({ status: 'error', message: 'Unauthorized' });
      return jsonResponse(computeStats());
    }
    return jsonResponse({ status: 'error', message: 'Unknown action' });
  } catch (err) {
    return jsonResponse({ status: 'error', message: err.message });
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.action === 'scan') return jsonResponse(recordScan(data));
    if (data.action === 'click') return jsonResponse(recordClick(data));

    if (data.action === 'link_create' || data.action === 'link_update' || data.action === 'link_delete' || data.action === 'link_reorder') {
      if (!isAuthorized(data.secret)) return jsonResponse({ status: 'error', message: 'Unauthorized' });
      if (data.action === 'link_create') return jsonResponse(createLink(data));
      if (data.action === 'link_update') return jsonResponse(updateLink(data));
      if (data.action === 'link_delete') return jsonResponse(deleteLink(data));
      if (data.action === 'link_reorder') return jsonResponse(reorderLinks(data));
    }

    return jsonResponse({ status: 'error', message: 'Unknown action' });
  } catch (err) {
    return jsonResponse({ status: 'error', message: err.message });
  }
}

function isAuthorized(secret) {
  return typeof secret === 'string' && secret.length > 0 && secret === STATS_SECRET;
}

const ALLOWED_URL_SCHEMES = ['http://', 'https://', 'mailto:', 'tel:'];

function isValidLinkUrl_(url) {
  if (typeof url !== 'string' || url.length === 0 || url.length > 2048) return false;
  return ALLOWED_URL_SCHEMES.some((scheme) => url.indexOf(scheme) === 0);
}

/** Same rationale as the other two .gs files: Sheets treats a leading
 * =, +, -, or @ as a formula even via appendRow/setValue. campaign and
 * referrer reach recordScan/recordClick straight from the public
 * /api/connect/scan and /click routes (no admin secret gates them), so
 * they're the one place in this file that takes truly untrusted input. */
function sanitizeForSheet_(value) {
  const str = value === undefined || value === null ? '' : String(value);
  return /^[=+\-@]/.test(str) ? `'${str}` : str;
}

function jsonResponse(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}

// ---------------------------------------------------------------------
// Sheet helpers
// ---------------------------------------------------------------------

function getSheet(name, headers) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
  }
  return sheet;
}

function readRows(sheet, headers) {
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  return values.slice(1).map((row, index) => {
    const obj = { _row: index + 2 }; // 1-indexed + header row
    headers.forEach((header, i) => {
      obj[header] = row[i];
    });
    return obj;
  });
}

// ---------------------------------------------------------------------
// Links
// ---------------------------------------------------------------------

function getAllLinks() {
  const sheet = getSheet(LINKS_SHEET_NAME, LINKS_HEADERS);
  return readRows(sheet, LINKS_HEADERS)
    .filter((row) => row.archived !== true)
    .map(toLinkObject)
    .sort((a, b) => a.position - b.position);
}

function getPublicLinks() {
  return getAllLinks().filter((link) => link.enabled === true);
}

function toLinkObject(row) {
  return {
    id: row.id,
    name: row.name,
    url: row.url,
    icon: row.icon,
    description: row.description || '',
    category: row.category || '',
    position: Number(row.position) || 0,
    enabled: row.enabled === true,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function createLink(data) {
  if (!isValidLinkUrl_(data.url)) return { status: 'error', message: 'Invalid link URL — must start with http://, https://, mailto:, or tel:' };
  const sheet = getSheet(LINKS_SHEET_NAME, LINKS_HEADERS);
  const existing = readRows(sheet, LINKS_HEADERS).filter((row) => row.archived !== true);
  const nextPosition = existing.length;
  const now = new Date().toISOString();
  const id = Utilities.getUuid();
  sheet.appendRow([id, data.name, data.url, data.icon, data.description || '', data.category || '', nextPosition, true, false, now, now]);
  return { status: 'ok', id: id };
}

function findLinkRow(sheet, id) {
  const rows = readRows(sheet, LINKS_HEADERS);
  return rows.find((row) => row.id === id);
}

function updateLink(data) {
  if (Object.prototype.hasOwnProperty.call(data, 'url') && !isValidLinkUrl_(data.url)) {
    return { status: 'error', message: 'Invalid link URL — must start with http://, https://, mailto:, or tel:' };
  }
  const sheet = getSheet(LINKS_SHEET_NAME, LINKS_HEADERS);
  const row = findLinkRow(sheet, data.id);
  if (!row) return { status: 'error', message: 'Link not found' };

  const fields = ['name', 'url', 'icon', 'description', 'category', 'enabled'];
  fields.forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(data, field)) {
      const columnIndex = LINKS_HEADERS.indexOf(field) + 1;
      sheet.getRange(row._row, columnIndex).setValue(data[field]);
    }
  });
  sheet.getRange(row._row, LINKS_HEADERS.indexOf('updatedAt') + 1).setValue(new Date().toISOString());
  return { status: 'ok' };
}

function deleteLink(data) {
  const sheet = getSheet(LINKS_SHEET_NAME, LINKS_HEADERS);
  const row = findLinkRow(sheet, data.id);
  if (!row) return { status: 'error', message: 'Link not found' };
  sheet.getRange(row._row, LINKS_HEADERS.indexOf('archived') + 1).setValue(true);
  sheet.getRange(row._row, LINKS_HEADERS.indexOf('updatedAt') + 1).setValue(new Date().toISOString());
  return { status: 'ok' };
}

function reorderLinks(data) {
  const sheet = getSheet(LINKS_SHEET_NAME, LINKS_HEADERS);
  const rows = readRows(sheet, LINKS_HEADERS);
  const positionColumn = LINKS_HEADERS.indexOf('position') + 1;
  const updatedAtColumn = LINKS_HEADERS.indexOf('updatedAt') + 1;
  const now = new Date().toISOString();
  (data.order || []).forEach((entry) => {
    const row = rows.find((r) => r.id === entry.id);
    if (row) {
      sheet.getRange(row._row, positionColumn).setValue(entry.position);
      sheet.getRange(row._row, updatedAtColumn).setValue(now);
    }
  });
  return { status: 'ok' };
}

// ---------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------

function recordScan(data) {
  const sheet = getSheet(SCAN_SHEET_NAME, SCAN_HEADERS);
  sheet.appendRow([
    Utilities.getUuid(), data.visitorId || '', new Date().toISOString(), sanitizeForSheet_(data.campaign),
    sanitizeForSheet_(data.referrer), data.country || '', data.region || '', data.city || '',
    data.deviceType || '', data.browser || '', data.operatingSystem || '',
  ]);
  return { status: 'ok' };
}

function recordClick(data) {
  const sheet = getSheet(CLICK_SHEET_NAME, CLICK_HEADERS);
  sheet.appendRow([Utilities.getUuid(), data.visitorId || '', data.linkId || '', new Date().toISOString(), sanitizeForSheet_(data.campaign)]);
  return { status: 'ok' };
}

/**
 * Run this once from the Apps Script editor (function dropdown -> Run) to
 * trigger the Sheets authorization prompt before deploying. Manually
 * running doGet/doPost instead would fail silently the same way it would
 * in the other two .gs files in this repo (`e` is undefined when called
 * with no arguments from the editor) — this function takes no arguments,
 * so Run works on it, and it exercises the same SpreadsheetApp calls
 * doGet/doPost use. Writes one clearly-labeled test link — safe to
 * delete (or just leave disabled) from /admin/connect afterward.
 */
function setupAndTest() {
  createLink({
    name: 'Setup Test — safe to delete',
    url: 'https://kashtieducare.com',
    icon: 'link',
    description: 'Confirms Sheets authorization for connectSystem.gs.',
    category: '',
  });
  console.log('setupAndTest complete — check the Links tab, then delete/disable the test row from /admin/connect or the Sheet directly.');
}

// ---------------------------------------------------------------------
// Stats aggregation — reads whole sheets into memory; fine at the scale
// a small-business QR/campaign system produces (thousands of rows), not
// designed to scale past that without revisiting (documented tradeoff of
// using Sheets instead of a real database for this feature).
// ---------------------------------------------------------------------

function computeStats() {
  const scanSheet = getSheet(SCAN_SHEET_NAME, SCAN_HEADERS);
  const clickSheet = getSheet(CLICK_SHEET_NAME, CLICK_HEADERS);
  const scans = readRows(scanSheet, SCAN_HEADERS);
  const clicks = readRows(clickSheet, CLICK_HEADERS);
  const links = getAllLinks();

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const msPerDay = 24 * 60 * 60 * 1000;

  const scansWithDates = scans.map((s) => Object.assign({}, s, { _date: new Date(s.timestamp) }));

  const totalScans = scansWithDates.length;
  const visitorIds = scansWithDates.map((s) => s.visitorId).filter(Boolean);
  const uniqueVisitorSet = new Set(visitorIds);
  const visitCounts = {};
  visitorIds.forEach((id) => {
    visitCounts[id] = (visitCounts[id] || 0) + 1;
  });
  const returningVisitors = Object.values(visitCounts).filter((count) => count > 1).length;

  const scansToday = scansWithDates.filter((s) => s._date >= startOfToday).length;
  const scansLast7Days = scansWithDates.filter((s) => now - s._date <= 7 * msPerDay).length;
  const scansLast30Days = scansWithDates.filter((s) => now - s._date <= 30 * msPerDay).length;

  const scansOverTime = [];
  for (let i = 29; i >= 0; i--) {
    const day = new Date(startOfToday.getTime() - i * msPerDay);
    const dateKey = Utilities.formatDate(day, Session.getScriptTimeZone(), 'yyyy-MM-dd');
    const count = scansWithDates.filter((s) => Utilities.formatDate(s._date, Session.getScriptTimeZone(), 'yyyy-MM-dd') === dateKey).length;
    scansOverTime.push({ date: dateKey, count: count });
  }

  const countries = topCounts(scansWithDates, 'country');
  const regions = topCounts(scansWithDates, 'region');
  const cities = topCounts(scansWithDates, 'city');
  const deviceTypes = topCounts(scansWithDates, 'deviceType');
  const browsers = topCounts(scansWithDates, 'browser');
  const operatingSystems = topCounts(scansWithDates, 'operatingSystem');

  const clicksByLink = {};
  clicks.forEach((c) => {
    clicksByLink[c.linkId] = (clicksByLink[c.linkId] || 0) + 1;
  });
  const linkStats = links.map((link) => ({
    id: link.id,
    name: link.name,
    clicks: clicksByLink[link.id] || 0,
    ctr: totalScans > 0 ? (clicksByLink[link.id] || 0) / totalScans : 0,
  }));

  const campaignKeys = new Set();
  scansWithDates.forEach((s) => campaignKeys.add(s.campaign || ''));
  clicks.forEach((c) => campaignKeys.add(c.campaign || ''));
  const campaigns = Array.from(campaignKeys).map((src) => {
    const campaignScans = scansWithDates.filter((s) => (s.campaign || '') === src);
    const campaignClicks = clicks.filter((c) => (c.campaign || '') === src);
    const uniqueForCampaign = new Set(campaignScans.map((s) => s.visitorId).filter(Boolean)).size;
    return {
      src: src,
      scans: campaignScans.length,
      uniqueVisitors: uniqueForCampaign,
      clicks: campaignClicks.length,
      conversionRate: campaignScans.length > 0 ? campaignClicks.length / campaignScans.length : 0,
    };
  }).sort((a, b) => b.scans - a.scans);

  return {
    overview: {
      totalScans: totalScans,
      estimatedUniqueVisitors: uniqueVisitorSet.size,
      returningVisitors: returningVisitors,
      scansToday: scansToday,
      scansLast7Days: scansLast7Days,
      scansLast30Days: scansLast30Days,
    },
    scansOverTime: scansOverTime,
    location: { countries: countries, regions: regions, cities: cities },
    devices: { deviceTypes: deviceTypes, browsers: browsers, operatingSystems: operatingSystems },
    links: linkStats,
    campaigns: campaigns,
  };
}

function topCounts(rows, field, limit) {
  limit = limit || 10;
  const counts = {};
  rows.forEach((row) => {
    const key = row[field] || 'Unknown';
    counts[key] = (counts[key] || 0) + 1;
  });
  return Object.keys(counts)
    .map((key) => ({ key: key, count: counts[key] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}
