"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { KASHTI } from "@/lib/data";
import { initKashti } from "@/legacy/engine";

// Set by link clicks, consumed by the next page's mount (not set for back/forward, which restore scroll).
let scrollTopOnMount = false;

/**
 * Boots the page behaviour (hero stage, planner, catalogue, gallery viewer, cookie banner, ...) that
 * renders the data-driven sections. Mounted once per navigation (see app/template.tsx), cleaned up on unmount.
 */
export function Enhancer({ overrides }: { overrides: Record<string, unknown> }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    document.body.dataset.page = pathname === "/" ? "index" : pathname.replace(/^\//, "");
    // Arrived by clicking a link: start at the top of the new page (unless the link had a #hash).
    if (scrollTopOnMount && !location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    scrollTopOnMount = false;
    const cleanup = initKashti({ ...KASHTI, ...overrides });

    // Content rendered by the engine does not exist yet when the browser first tries to honour #hash.
    if (location.hash.length > 1) {
      const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (el) requestAnimationFrame(() => el.scrollIntoView());
    }

    // Links the engine injects are plain <a>. Route cross-page clicks through the client router; same-page
    // links (hash jumps, ?filters) keep the browser's native behaviour, exactly as on the original site.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      e.preventDefault();
      scrollTopOnMount = true;
      router.push(url.pathname + url.search + url.hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
