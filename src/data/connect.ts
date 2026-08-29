import { siteConfig } from "@/lib/seo";

/**
 * Single source of truth for the public /connect page — the one
 * permanent destination the Kashti Educare QR code points to
 * (https://kashtieducare.com/connect).
 *
 * There is no database, no admin UI and no API behind this page: every
 * link below is rendered straight from this file. To add, remove or
 * change a link, edit this file and redeploy — nothing else.
 *
 * Icon names map to components in
 * src/components/connect/BrandIcons.tsx (`connectIconMap`).
 */

export type ConnectIconName =
  | "website"
  | "whatsapp"
  | "email"
  | "instagram"
  | "linkedin"
  | "youtube"
  | "facebook"
  | "contact"
  | "programmes"
  | "about"
  | "why-kashti";

export type ConnectLink = {
  label: string;
  /** `null` means "not configured yet" — the button is omitted from the page. */
  href: string | null;
  icon: ConnectIconName;
  description?: string;
  /** Lower number sorts first within its group. */
  priority: number;
  /** Opens in a new tab with rel="noopener noreferrer". mailto:/tel:/internal links are not external. */
  external: boolean;
};

/** wa.me wants a bare international number, digits only. */
const whatsappNumber = siteConfig.contact.phoneE164.replace(/\D/g, "");

/**
 * Primary calls to action — rendered as large, filled buttons at the top
 * of the page.
 */
export const primaryActions: ConnectLink[] = [
  {
    label: "Visit Website",
    href: "/",
    icon: "website",
    description: "kashtieducare.com",
    priority: 1,
    external: false,
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${whatsappNumber}`,
    icon: "whatsapp",
    description: siteConfig.contact.phone,
    priority: 2,
    external: true,
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.contact.email}`,
    icon: "email",
    description: siteConfig.contact.email,
    priority: 3,
    external: false,
  },
];

/**
 * Social profiles. No real, active Kashti Educare social accounts exist
 * in this codebase yet (see `siteConfig.sameAs`), so every href is `null`
 * and the whole section is hidden. When an account goes live, paste its
 * URL here — the button appears automatically, no other change needed.
 */
export const socialLinks: ConnectLink[] = [
  { label: "Instagram", href: null, icon: "instagram", priority: 1, external: true },
  { label: "LinkedIn", href: null, icon: "linkedin", priority: 2, external: true },
  { label: "YouTube", href: null, icon: "youtube", priority: 3, external: true },
  { label: "Facebook", href: null, icon: "facebook", priority: 4, external: true },
];

/**
 * Useful destinations elsewhere on the Kashti Educare site — rendered as
 * bordered list tiles below the primary actions.
 */
export const destinations: ConnectLink[] = [
  {
    label: "Contact Us",
    href: "/contact",
    icon: "contact",
    description: "Enquiries & custom proposals",
    priority: 1,
    external: false,
  },
  {
    label: "Programmes",
    href: "/programs",
    icon: "programmes",
    description: "School & higher-education immersion",
    priority: 2,
    external: false,
  },
  {
    label: "About Kashti",
    href: "/about",
    icon: "about",
    description: "Who we are",
    priority: 3,
    external: false,
  },
  {
    label: "Why Kashti",
    href: "/why-kashti",
    icon: "why-kashti",
    description: "Our approach & impact",
    priority: 4,
    external: false,
  },
];

const byPriority = (a: ConnectLink, b: ConnectLink) => a.priority - b.priority;

/** Only links with a configured href, sorted by priority. */
export function visibleLinks(links: ConnectLink[]): ConnectLink[] {
  return links.filter((link) => link.href).sort(byPriority);
}
