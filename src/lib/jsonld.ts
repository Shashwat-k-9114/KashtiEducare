import type { Faq, Programme } from "@/data/programs";
import { absoluteUrl, siteConfig } from "@/lib/seo";

/**
 * JSON-LD builders. Every one of these is generated from the same typed
 * data that renders the visible page — never hand-duplicate FAQ/breadcrumb
 * text into schema separately, or the two will drift out of sync.
 */

type JsonLdObject = Record<string, unknown>;

export function organizationJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: siteConfig.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/logo.jpeg"),
    description: siteConfig.description,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: { "@type": "PostalAddress", addressCountry: "IN" },
    // Same sitewide "Our Reach" stats shown on-page (home, /why-kashti) —
    // emitted as additionalProperty (schema.org's mechanism for loosely
    // typed supplementary facts) so this schema doesn't drift from the UI.
    additionalProperty: siteConfig.stats.map((stat) => ({
      "@type": "PropertyValue",
      name: stat.label,
      value: `${stat.value}${stat.suffix}`,
    })),
    // Populated once real, active social profiles exist — see the TODO on
    // siteConfig.sameAs. Omitted entirely while empty rather than emitting
    // a fabricated or dead list.
    ...(siteConfig.sameAs.length > 0 ? { sameAs: siteConfig.sameAs } : {}),
  };
}

export function websiteJsonLd(): JsonLdObject {
  // No `potentialAction`/SearchAction here on purpose: the /programs filter
  // is categorical (multi-select checkboxes over client state), not a
  // URL-addressable text search with a `?q={term}` pattern, so a
  // SearchAction would describe functionality that doesn't actually exist
  // and could mislead a sitelinks searchbox. Add one if a real `?q=` text
  // search is ever built.
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl("/"),
  };
}

export type BreadcrumbEntry = { name: string; path: string };

export function breadcrumbJsonLd(items: BreadcrumbEntry[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqPageJsonLd(faqs: readonly Faq[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/**
 * Course schema for a programme page. `metadata` (Recommended For /
 * Suggested Length / Recommended Months / Group Size) is estimated
 * placeholder content — see the TODO on Programme.metadata in
 * src/data/programs.ts — so it's emitted as `additionalProperty`
 * (schema.org's mechanism for loosely-typed supplementary facts) rather
 * than forced into strictly-typed fields like an ISO 8601 `duration`,
 * which would misrepresent an estimated range as a confirmed fact.
 */
export function courseJsonLd(programme: Programme): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: programme.title,
    description: programme.description,
    url: absoluteUrl(`/programs/experience/${programme.slug}`),
    provider: {
      "@type": "EducationalOrganization",
      name: siteConfig.name,
      url: absoluteUrl("/"),
    },
    audience: {
      "@type": "EducationalAudience",
      audienceType: programme.metadata.recommendedFor,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Onsite",
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Recommended For", value: programme.metadata.recommendedFor },
      { "@type": "PropertyValue", name: "Suggested Length", value: programme.metadata.suggestedLength },
      { "@type": "PropertyValue", name: "Recommended Months", value: programme.metadata.recommendedMonths },
      { "@type": "PropertyValue", name: "Group Size", value: programme.metadata.groupSize },
    ],
  };
}

/** Safe serialization for a <script type="application/ld+json"> body. */
export function jsonLdString(data: JsonLdObject): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
