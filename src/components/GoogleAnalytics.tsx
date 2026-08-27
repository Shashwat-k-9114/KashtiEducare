import Script from "next/script";

import { CONSENT_STORAGE_KEY } from "@/lib/consent";

/**
 * GA4 with Google Consent Mode v2. Renders nothing until
 * NEXT_PUBLIC_GA_MEASUREMENT_ID is set, so it's fully inert until a real
 * property exists.
 *
 * Consent Mode v2 (resolved — this used to be a flagged gap): the gtag.js
 * library itself always loads, but analytics_storage defaults to 'denied'
 * before it loads (set in a `beforeInteractive` script — Next's own docs
 * list cookie-consent managers as the intended use for that strategy), so
 * GA4 sends cookieless pings and sets no analytics cookies until a visitor
 * explicitly accepts via <ConsentBanner>. Returning visitors who already
 * accepted get 'granted' as the default immediately (read from
 * localStorage synchronously, before gtag.js loads), so they aren't
 * re-prompted every session. ad_storage/ad_user_data/ad_personalization
 * stay denied unconditionally — this site has no advertising use case.
 */
export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!measurementId) return null;

  return (
    <>
      <Script id="ga4-consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){ window.dataLayer.push(arguments); }
          window.gtag = gtag;
          var storedConsent = null;
          try { storedConsent = window.localStorage.getItem('${CONSENT_STORAGE_KEY}'); } catch (e) {}
          gtag('consent', 'default', {
            analytics_storage: storedConsent === 'granted' ? 'granted' : 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
        `}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.gtag('js', new Date());
          window.gtag('config', '${measurementId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
