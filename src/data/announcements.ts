/**
 * Announcement banner content. Data-driven so the banner can be updated
 * without touching component code. Placeholder entries below — replace
 * with real announcements once the marketing calendar is finalised.
 */

export type Announcement = {
  id: string;
  message: string;
  link?: { href: string; label: string };
  active: boolean;
  /** Higher priority surfaces first when several are active at once. */
  priority: number;
  /** ISO date string. Past-expiry announcements are filtered out automatically. */
  expiresAt?: string;
};

export const announcements: Announcement[] = [
  {
    id: "winter-2026-applications",
    message: "Winter cohort applications are now open for Global Immersion Programmes.",
    link: { href: "/programs/global-international-immersion", label: "View programmes" },
    active: true,
    priority: 10,
    expiresAt: "2026-10-31",
  },
  {
    id: "stem-coimbatore-circuit",
    message: "New STEM Tours circuit: Coimbatore–Siruvani, now bookable for the 2026–27 season.",
    link: { href: "/programs/experience/stem-tours", label: "Explore STEM Tours" },
    active: true,
    priority: 5,
    expiresAt: "2027-03-31",
  },
];

export function getActiveAnnouncements(): Announcement[] {
  const now = Date.now();
  return announcements
    .filter((a) => a.active && (!a.expiresAt || new Date(a.expiresAt).getTime() > now))
    .sort((a, b) => b.priority - a.priority);
}
