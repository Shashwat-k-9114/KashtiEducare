export const VISITOR_ID_COOKIE = "kashti_vid";
export const VISITOR_ID_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // ~1 year

/**
 * Anonymous visitor ID: a random UUID in an HttpOnly first-party cookie.
 * Client JS never reads or writes it directly — no invasive
 * fingerprinting, just "does this browser have our cookie already."
 * This approximates a *returning browser*, not a guaranteed unique
 * human (cleared cookies, private browsing, or a shared/public device
 * all break that assumption) — surfaced as a documented limitation on
 * the admin dashboard, not claimed as exact.
 */
export function generateVisitorId(): string {
  return crypto.randomUUID();
}
