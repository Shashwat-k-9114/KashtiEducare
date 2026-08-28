import type { ReactNode } from "react";

import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/**
 * Shared chrome for every "marketing site" page — everything that was
 * previously in the root layout except /connect and /admin/**, which
 * sit outside this route group (see the comment in src/app/layout.tsx).
 * `(site)` is a route group: it organizes files, not URLs — none of
 * these pages' paths change.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AnnouncementBanner />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
