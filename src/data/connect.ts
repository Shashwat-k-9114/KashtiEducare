import type { Accent } from "@/components/AccentCard";
import type { ContactIntent } from "@/data/contact";
import { siteConfig } from "@/lib/seo";

/**
 * Single source of truth for the public /connect page.
 *
 * /connect is the digital second side of the Kashti Educare visiting card:
 * the printed card carries a QR that points here permanently
 * (https://kashtieducare.com/connect) instead of a wall of links. The
 * visitor is usually a school leader who has just met someone from Kashti.
 *
 * The page is fully static — every destination below is a real route,
 * asset, or a deep-link into the existing /contact enquiry flow. There is
 * no backend, database, API, admin or analytics. To change anything, edit
 * this file and redeploy.
 *
 * Icon names map to components in src/components/connect/BrandIcons.tsx.
 */

export type ConnectIconName =
  | "calendar"
  | "whatsapp"
  | "phone"
  | "email"
  | "participation"
  | "exposure"
  | "stem"
  | "leadership"
  | "experiential"
  | "rocket"
  | "magazine"
  | "custom"
  | "gallery"
  | "website"
  | "instagram"
  | "linkedin"
  | "youtube"
  | "facebook";

export type Cta = {
  label: string;
  href: string;
  /** http(s) links open in a new tab; internal / mailto / tel links do not. */
  external: boolean;
};

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

// --- Section 1 — Hero / digital visiting card -----------------------------

export const hero = {
  eyebrow: "Scan · Explore · Connect",
  heading: "Let’s Explore What’s Possible for Your Students",
  supporting:
    "Kashti Educare · Experiences that expand Exposure, Perspective & Resilience",
  actions: [
    {
      label: "Book a Discussion",
      sublabel: "Talk to the Kashti team",
      href: contactUrl("scheduling a discussion about our students"),
      icon: "calendar" as ConnectIconName,
      external: false,
      tone: "primary" as const,
    },
    {
      label: "WhatsApp",
      sublabel: siteConfig.contact.phone,
      href: whatsappUrl,
      icon: "whatsapp" as ConnectIconName,
      external: true,
      tone: "secondary" as const,
    },
  ],
};

// --- Section 2 — "What does your school need right now?" ------------------
// Guided-discovery shortcuts. Each points at the closest real Kashti
// destination so the page feels consultative, not like a link dump.

export type NeedShortcut = {
  label: string;
  href: string;
  icon: ConnectIconName;
  accent: Accent;
};

export const needsHeading = "What Does Your School Need Right Now?";

export const needShortcuts: NeedShortcut[] = [
  {
    label: "More Student Participation",
    href: "/programs/adventure-experiential-learning",
    icon: "participation",
    accent: "coral",
  },
  {
    label: "Better Exposure",
    href: "/programs/career-industry-exposure",
    icon: "exposure",
    accent: "green",
  },
  {
    label: "STEM & Technology",
    href: "/programs/future-stem-exploration",
    icon: "stem",
    accent: "teal",
  },
  {
    label: "Leadership & Resilience",
    href: "/programs/leadership-discipline-character",
    icon: "leadership",
    accent: "gold",
  },
  {
    label: "Experiential Learning",
    href: "/programs",
    icon: "experiential",
    accent: "teal",
  },
];

// --- Section 3 — Primary offerings (numbered 01–04) ----------------------

export type Offering = {
  number: string;
  brand?: string;
  title: string;
  copy: string;
  themes?: string[];
  /** null => nothing to link to yet; render `note` instead of a CTA. */
  cta: Cta | null;
  note?: string;
  accent: Accent;
  icon: ConnectIconName;
};

export const primaryOfferings: Offering[] = [
  {
    number: "01",
    title: "Schedule an AR/VR ISRO Seminar",
    copy: "Bring immersive space, science and technology experiences to your school.",
    // No dedicated AR/VR page exists in the repo. Real, related proof:
    // STEM Tours (Chennai–Sriharikota space circuit) and ISRO visit photos
    // in the gallery. The CTA routes into the /contact flow with context.
    cta: {
      label: "Schedule a Session",
      href: contactUrl("an AR/VR & ISRO space-science seminar at our school"),
      external: false,
    },
    accent: "teal",
    icon: "rocket",
  },
  {
    number: "02",
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
    accent: "green",
    icon: "experiential",
  },
  {
    number: "03",
    brand: "Kashti Lens",
    title: "Download the Latest Monthly Magazine",
    copy: "Insights, ideas, opportunities and conversations shaping the future of student learning.",
    // No magazine / PDF exists in the repo yet — presented as an honest
    // "coming soon" rather than a broken download.
    cta: null,
    note: "New issue coming soon",
    accent: "gold",
    icon: "magazine",
  },
  {
    number: "04",
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
    accent: "coral",
    icon: "custom",
  },
];

// --- Section 4 — Explore more (visually lighter) ------------------------
// Only real destinations. "Insights for Education Leaders" is intentionally
// omitted: no articles/blog/insights content exists in the repo yet.

export const experiencesInAction = {
  title: "See Experiences in Action",
  copy: "Photos from Kashti programmes, institution visits and field expeditions — as they actually happened.",
  cta: { label: "View the Gallery", href: "/gallery", external: false } as Cta,
};

export const exploreLinks: { label: string; href: string }[] = [
  { label: "About Kashti", href: "/about" },
  { label: "Why Kashti", href: "/why-kashti" },
  { label: "The Experience Model", href: "/experiences" },
];

// --- Section 5 — School-leader conversation (conversion) ---------------

export const conversation = {
  heading: "Let’s discuss what your students need next.",
  modes: [
    "15-Minute Discovery Call",
    "School Visit",
    "Program Presentation",
    "Custom Experience Design",
  ],
  primary: {
    label: "Book a Conversation",
    href: contactUrl("a conversation about what our students need next"),
    external: false,
  } as Cta,
  secondary: { label: "WhatsApp", href: whatsappUrl, external: true } as Cta,
};

// --- Section 6 — Closing / digital contact card -----------------------

export const closing = {
  heading: "Keep Kashti With You",
  statement: "Let’s Create Opportunities Students Remember.",
};

export type ContactAction = {
  label: string;
  value: string;
  href: string;
  icon: ConnectIconName;
  external: boolean;
};

export const contactActions: ContactAction[] = [
  { label: "Call", value: siteConfig.contact.phone, href: phoneUrl, icon: "phone", external: false },
  { label: "WhatsApp", value: siteConfig.contact.phone, href: whatsappUrl, icon: "whatsapp", external: true },
  { label: "Email", value: siteConfig.contact.email, href: emailUrl, icon: "email", external: false },
];

/** Static vCard in /public, built from verified siteConfig data only. */
export const saveContact = { label: "Save Our Contact", href: "/kashti-educare.vcf" };

export type SocialLink = {
  label: string;
  /** `null` until a real, verified account URL exists (siteConfig.sameAs is empty). */
  href: string | null;
  icon: ConnectIconName;
};

export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: null, icon: "linkedin" },
  { label: "Instagram", href: null, icon: "instagram" },
  { label: "YouTube", href: null, icon: "youtube" },
  { label: "Facebook", href: null, icon: "facebook" },
];

/** Social buttons are only rendered when a real URL is configured above. */
export function visibleSocials(): SocialLink[] {
  return socialLinks.filter((s) => s.href);
}
