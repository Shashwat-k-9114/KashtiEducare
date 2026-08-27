"use client";

import { Cookie } from "lucide-react";
import { useState, useSyncExternalStore } from "react";

import { CONSENT_STORAGE_KEY, setStoredConsent, updateGtagConsent, type ConsentChoice } from "@/lib/consent";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

// localStorage isn't available during SSR, so the server snapshot reports
// "no choice yet" — the real value is read once the client hydrates.
function getSnapshot() {
  return window.localStorage.getItem(CONSENT_STORAGE_KEY);
}

function getServerSnapshot() {
  return null;
}

/**
 * Bottom consent bar. Only ever shown when no choice has been made yet —
 * a returning visitor who already accepted or rejected never sees this
 * again. Both buttons are real: Reject explicitly confirms denial (and
 * updates gtag consent state to match, even though it's already the
 * default) rather than just closing the banner in a way that could be
 * mistaken for acceptance.
 */
export function ConsentBanner() {
  const storedRaw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  // A response made in this render (before the "storage" event, which only
  // fires in *other* tabs) is tracked here so the banner hides immediately.
  const [respondedThisSession, setRespondedThisSession] = useState(false);

  const visible = storedRaw === null && !respondedThisSession;

  const respond = (choice: ConsentChoice) => {
    setStoredConsent(choice);
    updateGtagConsent(choice);
    setRespondedThisSession(true);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-kashti-border-light bg-kashti-bg-light px-6 py-5 shadow-[0_-8px_24px_-8px_rgba(69,69,69,0.15)] lg:px-10"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="flex items-start gap-3 text-center sm:text-left">
          <Cookie size={22} strokeWidth={1.75} className="mt-0.5 hidden shrink-0 text-kashti-gold-deep sm:block" />
          <p className="text-sm leading-relaxed text-kashti-charcoal/75">
            We use cookies to understand how visitors use this site. Analytics only turns on if you say yes — nothing is
            tracked until then.{" "}
            <a
              href="/contact"
              className="underline decoration-kashti-charcoal/30 underline-offset-2 hover:decoration-kashti-charcoal"
            >
              Questions? Contact us.
            </a>
          </p>
        </div>
        <div className="flex w-full shrink-0 items-center justify-center gap-3 sm:w-auto">
          <button
            type="button"
            onClick={() => respond("denied")}
            className="rounded-full border border-kashti-border-light px-5 py-2.5 text-sm font-semibold text-kashti-charcoal transition-colors hover:bg-kashti-charcoal/5"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => respond("granted")}
            className="rounded-full bg-kashti-green px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-kashti-green-soft"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
