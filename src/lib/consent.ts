export type ConsentChoice = "granted" | "denied";

export const CONSENT_STORAGE_KEY = "kashti-consent";

export function getStoredConsent(): ConsentChoice | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return raw === "granted" || raw === "denied" ? raw : null;
  } catch {
    return null;
  }
}

export function setStoredConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // localStorage unavailable (private mode, etc.) — the gtag update below
    // still applies for the current page load, it just won't persist.
  }
}

/**
 * Only analytics_storage is ever granted here — this site has no
 * advertising/remarketing use case, so ad_storage/ad_user_data/
 * ad_personalization stay denied unconditionally rather than asking for
 * consent to something we don't actually use.
 */
export function updateGtagConsent(choice: ConsentChoice) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", { analytics_storage: choice });
}
