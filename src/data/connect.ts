import type { ContactIntent } from "@/data/contact";
import { galleryPhotos, type GalleryPhoto } from "@/data/media";
import { siteConfig } from "@/lib/seo";

/**
 * Single source of truth for the public /connect page — "The Charted
 * Voyage".
 *
 * /connect is the digital second side of the Kashti Educare visiting
 * card: the printed card carries a QR that points here permanently
 * (https://kashtieducare.com/connect) instead of a wall of links. The
 * visitor is usually a school leader who has just met someone from Kashti.
 *
 * The page is fully static — every destination below is a real route, a
 * real photo in /public, or a deep-link into the existing /contact
 * enquiry flow. There is no backend, database, API, admin or analytics.
 * To change anything, edit this file and redeploy.
 */

// --- Contact / messaging endpoints (all derived from src/lib/seo.ts) -------

const whatsappNumber = siteConfig.contact.phoneE164.replace(/\D/g, "");

export const whatsappUrl = `https://wa.me/${whatsappNumber}`;
export const emailUrl = `mailto:${siteConfig.contact.email}`;
export const phoneUrl = `tel:${siteConfig.contact.phoneE164}`;

/**
 * Deep-link into the existing /contact enquiry form. `topic` pre-fills the
 * "Programme of interest" field and seeds the message; `intent` pre-selects
 * the enquiry type. /contact already reads both query params
 * (see src/app/(site)/contact/page.tsx + src/components/ContactForm.tsx) —
 * no new route, form or backend is introduced.
 */
export function contactUrl(topic: string, intent: ContactIntent = "school"): string {
  const params = new URLSearchParams({ intent });
  if (topic) params.set("program", topic);
  return `/contact?${params.toString()}`;
}

export type Cta = {
  label: string;
  href: string;
  /** http(s) links open in a new tab; internal / mailto / tel links do not. */
  external: boolean;
};

/** Pull a real gallery photo (with authoritative alt + dimensions) by filename. */
function photo(file: string): GalleryPhoto {
  const found = galleryPhotos.find((p) => p.src === `/images/gallery/${file}`);
  if (!found) throw new Error(`connect.ts: gallery photo not found — ${file}`);
  return found;
}

// --- The voyage — six stations the visitor moves through -----------------
// Order is meaningful: the page is a single journey from "you scanned the
// card" to "keep Kashti with you". The rail/waypoint system visualises it.

export type Station = {
  id: "departure" | "bearing" | "passage" | "sightings" | "hail" | "harbour";
  /** Short chart label shown at the waypoint. */
  name: string;
  /** One-line description shown in the margin on wide screens. */
  note: string;
};

export const journey: Station[] = [
  { id: "departure", name: "Departure", note: "You scanned the card" },
  { id: "bearing", name: "Bearing", note: "Choose a direction" },
  { id: "passage", name: "Passage", note: "What Kashti can do" },
  { id: "sightings", name: "Sightings", note: "Real experiences" },
  { id: "hail", name: "Hail", note: "Open a conversation" },
  { id: "harbour", name: "Harbour", note: "Keep Kashti with you" },
];

// --- Station 1 — Departure (hero) ---------------------------------------

export const hero = {
  eyebrow: "Scan · Explore · Connect",
  heading: "Let’s Explore What’s Possible for Your Students",
  supporting: "Kashti Educare · Experiences that expand Exposure, Perspective & Resilience",
  actions: [
    {
      label: "Book a Discussion",
      href: contactUrl("scheduling a discussion about our students"),
      external: false,
      tone: "primary" as const,
    },
    {
      label: "WhatsApp",
      href: whatsappUrl,
      external: true,
      tone: "secondary" as const,
    },
  ],
};

// --- Station 2 — Bearing ("What does your school need right now?") ------
// Five directions. Each steers to the closest real Kashti destination, so
// the page feels consultative rather than like a link dump. `bearing` is a
// decorative compass reading only (aria-hidden in the UI).

export type Direction = {
  label: string;
  href: string;
  bearing: string;
  icon: DirectionIcon;
};

export type DirectionIcon = "participation" | "exposure" | "stem" | "leadership" | "experiential";

export const bearingHeading = "What Does Your School Need Right Now?";

export const directions: Direction[] = [
  { label: "More Student Participation", href: "/programs/adventure-experiential-learning", bearing: "015°", icon: "participation" },
  { label: "Better Exposure", href: "/programs/career-industry-exposure", bearing: "084°", icon: "exposure" },
  { label: "STEM & Technology", href: "/programs/future-stem-exploration", bearing: "153°", icon: "stem" },
  { label: "Leadership & Resilience", href: "/programs/leadership-discipline-character", bearing: "222°", icon: "leadership" },
  { label: "Experiential Learning", href: "/programs", bearing: "291°", icon: "experiential" },
];

// --- Station 3 — Passage (primary offerings, four legs) ----------------

export type Leg = {
  title: string;
  brand?: string;
  copy: string;
  themes?: string[];
  /** null => nothing real to link to yet; `note` is shown instead. */
  cta: Cta | null;
  note?: string;
  /** a quiet graphic motif for legs that carry no theme list. */
  motif?: "orbit" | "draft";
};

export const legs: Leg[] = [
  {
    title: "Schedule an AR/VR ISRO Seminar",
    copy: "Bring immersive space, science and technology experiences into your school — a session built around curiosity about how the universe works.",
    // No dedicated AR/VR page exists in the repo. Real, related proof: the
    // Chennai–Sriharikota STEM circuit and ISRO visit photography. The CTA
    // routes into /contact with context.
    cta: {
      label: "Schedule a Session",
      href: contactUrl("an AR/VR & ISRO space-science seminar at our school"),
      external: false,
    },
    motif: "orbit",
  },
  {
    title: "Explore Experiential Learning Programs",
    copy: "Structured, real-world exposure across the themes shaping future-ready students.",
    themes: [
      "STEM & Innovation",
      "Space & Aerospace",
      "AI & Future Technologies",
      "Industry Exposure",
      "Heritage & Culture",
      "Outdoor & Leadership Learning",
    ],
    cta: { label: "Explore Programs", href: "/programs", external: false },
  },
  {
    brand: "Kashti Lens",
    title: "The Monthly Magazine",
    copy: "Insights, ideas, opportunities and conversations shaping the future of student learning.",
    // No magazine / PDF exists in the repo yet — an honest "log not yet
    // written" note rather than a broken download.
    cta: null,
    note: "New issue in preparation",
    motif: "draft",
  },
  {
    title: "Request a Custom Experience",
    copy: "Tell us what your school wants to achieve. We’ll help design the right experience.",
    themes: [
      "Student Engagement",
      "STEM Exposure",
      "Career Awareness",
      "Leadership Development",
      "Technology & Innovation",
      "Educational Tours",
      "Something Custom",
    ],
    cta: {
      label: "Let’s Build It Together",
      href: contactUrl("designing a custom experience for our school"),
      external: false,
    },
  },
];

// --- Station 4 — Sightings (real photography trail) -------------------
// A curated subset of the real gallery. "Insights for Education Leaders"
// stays omitted — no articles/blog content exists in the repo.

export type Sighting = { photo: GalleryPhoto; caption: string };

export const sightingsHeading = "See Experiences in Action";
export const sightingsCta: Cta = { label: "Open the Gallery", href: "/gallery", external: false };

export const sightings: Sighting[] = [
  { photo: photo("expedition-group-1.jpg"), caption: "Expedition · Corbett" },
  { photo: photo("school-leaders-summit.jpeg"), caption: "School Leaders’ Summit" },
  { photo: photo("shimla-expedition.jpeg"), caption: "Expedition · Shimla" },
  { photo: photo("opj-visit-1.jpeg"), caption: "Campus visit · O.P. Jindal University" },
  { photo: photo("ntpc-activity.jpeg"), caption: "Industry activity · NTPC" },
  { photo: photo("iilm-session.jpeg"), caption: "Programme session · IILM" },
  { photo: photo("isro-visit-1.jpeg"), caption: "Seminar session in school" },
];

export const exploreLinks: { label: string; href: string }[] = [
  { label: "About Kashti", href: "/about" },
  { label: "Why Kashti", href: "/why-kashti" },
  { label: "The Experience Model", href: "/experiences" },
];

// --- Station 5 — Hail (conversation / conversion) --------------------

export const conversation = {
  heading: "Let’s discuss what your students need next.",
  modes: ["15-Minute Discovery Call", "School Visit", "Program Presentation", "Custom Experience Design"],
  primary: {
    label: "Book a Conversation",
    href: contactUrl("a conversation about what our students need next"),
    external: false,
  } as Cta,
  secondary: { label: "WhatsApp", href: whatsappUrl, external: true } as Cta,
};

// --- Station 6 — Harbour (arrival / digital contact card) -----------

export const closing = {
  heading: "Keep Kashti With You",
  statement: "Let’s Create Opportunities Students Remember.",
};

export type ContactRow = {
  label: string;
  value: string;
  href: string;
  external: boolean;
  /** true => triggers a download rather than navigation (the vCard). */
  download?: boolean;
  /** the visually elevated row — the point of a visiting card. */
  emphasis?: boolean;
};

export const manifest: ContactRow[] = [
  { label: "Call", value: siteConfig.contact.phone, href: phoneUrl, external: false },
  { label: "WhatsApp", value: "Message the team", href: whatsappUrl, external: true },
  { label: "Email", value: siteConfig.contact.email, href: emailUrl, external: false },
  { label: "Save Our Contact", value: "kashti-educare.vcf", href: "/kashti-educare.vcf", external: false, download: true, emphasis: true },
];

export type SocialLink = {
  label: string;
  /** `null` until a real, verified account URL exists (siteConfig.sameAs is empty). */
  href: string | null;
};

export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: null },
  { label: "Instagram", href: null },
  { label: "YouTube", href: null },
  { label: "Facebook", href: null },
];

/** Social links are only rendered when a real URL is configured above. */
export function visibleSocials(): SocialLink[] {
  return socialLinks.filter((s) => s.href);
}

export const wordmark = { primary: "Kashti", secondary: "educare" };
export const homeHref = "/";
export const homeLabel = "kashtieducare.com";
