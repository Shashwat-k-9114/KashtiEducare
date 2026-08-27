declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Fires a GA4 custom event. No-ops safely if GA hasn't loaded (no
 * NEXT_PUBLIC_GA_MEASUREMENT_ID set, ad-blocker, script still loading) —
 * conversion tracking should never be able to break the page it's on.
 */
export function trackEvent(name: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
