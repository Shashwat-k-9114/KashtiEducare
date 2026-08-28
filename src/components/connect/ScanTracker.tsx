"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Fires one fire-and-forget scan event on mount. Never awaited, never
 * blocks render — if /api/connect/scan is slow or down, this silently
 * fails and the page is unaffected (see the try/catch in the route
 * handler itself, which always returns 200 regardless of backend state).
 */
export function ScanTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const campaign = searchParams.get("src") ?? "";
    try {
      fetch("/api/connect/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ campaign }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // Analytics must never affect the page.
    }
    // Only fire once per page load — deliberately excludes `searchParams`
    // from deps so client-side query-string changes (there aren't any on
    // this page) can't refire it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
