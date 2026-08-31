import type { Metadata } from "next";

import type { Programme } from "@/data/programs";

/**
 * Single source of truth for site-wide SEO facts. Every generateMetadata
 * call, the sitemap, robots.txt, llms.txt, and the JSON-LD builders below
 * all read from this file so nothing drifts out of sync.
 */
export const siteConfig = {
  name: "Kashti Educare",
  shortName: "Kashti",
  // Canonical production domain: the non-www apex. Every canonical URL,
  // the sitemap, robots.txt's Sitemap: line, llms.txt, the JSON-LD `url`
  // fields and every OG/Twitter image URL below are derived from this, so
  // it MUST match the domain Vercel serves as primary (apex, with
  // www.kashtieducare.com redirecting to it). Override per-deployment with
  // NEXT_PUBLIC_SITE_URL only when a different origin is genuinely needed.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://kashtieducare.com").replace(/\/$/, ""),
  description:
    "Kashti Educare connects learners with people, institutions, industries and ideas shaping the real world through meaningful, transformative experiences.",
  tagline: "Preparing Learners for the World Beyond the Classroom",
  locale: "en_IN",
  // Sitewide "Our Reach" stats — repeated verbatim everywhere they appear
  // (home, /why-kashti, Organization JSON-LD) since AI answer engines treat
  // consistent repeated facts as a confidence signal, and inconsistent
  // numbers in different places actively hurts citability.
  // "Immersion Programmes" is pluralized (brief listed "Immersion Program"
  // singular) to match grammatical count consistency and the "Programme"
  // spelling already used sitewide in body copy since the SEO pass.
  stats: [
    { label: "Students Reached", value: 5000, suffix: "+" },
    { label: "Expert Mentors", value: 200, suffix: "+" },
    { label: "Institutions Partnered", value: 100, suffix: "+" },
    { label: "Immersion Programmes", value: 500, suffix: "+" },
  ],
  contact: {
    email: "engage@kashtieducare.com",
    phone: "+91 8307039685",
    phoneE164: "+918307039685",
    location: "India",
  },
  // No real, active social profiles exist anywhere in this codebase yet.
  // Leave empty rather than fabricate — Organization JSON-LD's `sameAs` is
  // only a genuine trust signal if these are real, active accounts. Add
  // URLs here once they exist; every page picks this up automatically.
  sameAs: [] as string[],
} as const;

export function absoluteUrl(path: string): string {
  return new URL(path, `${siteConfig.url}/`).toString();
}

/** "5000+ Students Reached, 200+ Expert Mentors, ..." — single source for every place that recites siteConfig.stats as a sentence. */
export function statsSummary(): string {
  return siteConfig.stats.map((s) => `${s.value}${s.suffix} ${s.label}`).join(", ");
}

/**
 * A short, single-line hook derived from a longer description, for use in
 * "{Name} — {hook} | Kashti Educare" titles. Takes the first sentence, then
 * caps it at maxLen on a word boundary — many programme descriptions in
 * the source data are a single sentence with no internal period, so naively
 * splitting on "." alone (or not capping length at all) can return the
 * entire description, producing a title that just repeats the meta
 * description back at itself.
 */
export function shortHook(description: string, maxLen = 70): string {
  const firstSentence = description.split(/(?<=\.)\s+/)[0].replace(/\.$/, "").trim();
  if (firstSentence.length <= maxLen) return firstSentence;
  const truncated = firstSentence.slice(0, maxLen);
  const lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > 40 ? truncated.slice(0, lastSpace) : truncated).trim();
}

/**
 * Meta description for a programme page. Most of the 53 programme
 * descriptions in the source content doc are well under the 150-160 char
 * SERP sweet spot (median ~110 chars) — rather than ship a noticeably
 * short snippet, short ones are extended with a clause built from the
 * programme's own (already placeholder-flagged) metadata, not invented
 * copy. Descriptions already in or past the target range are left as-is
 * (past-165 ones are trimmed at a word boundary, not mid-word).
 */
export function programmeMetaDescription(programme: Programme): string {
  const base = programme.description.trim();
  if (base.length > 165) return `${shortHook(base, 160)}.`;
  if (base.length >= 120) return base;
  const extended = `${base} Suited for ${programme.metadata.recommendedFor}, typically ${programme.metadata.suggestedLength}.`;
  return extended.length <= 180 ? extended : base;
}

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  /** Set true only for pages that should not be indexed (none currently). */
  noIndex?: boolean;
};

/**
 * Builds a consistent Metadata object (canonical + OG + Twitter) from one
 * title/description/path, so every route gets real OG/Twitter tags without
 * hand-duplicating that boilerplate 14+ times. Pages with their own
 * opengraph-image.tsx get its image automatically via Next's file-based
 * convention — this helper doesn't need to (and shouldn't) set og:image.
 */
export function buildMetadata({ title, description, path, noIndex }: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
