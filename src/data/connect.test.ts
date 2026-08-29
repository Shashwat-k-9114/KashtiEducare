import { describe, expect, it } from "vitest";

import {
  contactUrl,
  conversation,
  directions,
  exploreLinks,
  hero,
  instagram,
  journey,
  legs,
  magazine,
  manifest,
  sightings,
  sightingsCta,
  socialLinks,
  visibleSocials,
  whatsappUrl,
  type Cta,
} from "./connect";

const ALLOWED_SCHEMES = new Set(["http:", "https:", "mailto:", "tel:"]);

/** Internal path, or an absolute URL with an allowed scheme. */
function isSafeHref(href: string): boolean {
  if (href.startsWith("/") && !href.startsWith("//")) return true;
  try {
    return ALLOWED_SCHEMES.has(new URL(href).protocol);
  } catch {
    return false;
  }
}

function everyCta(): { where: string; cta: Cta }[] {
  const out: { where: string; cta: Cta }[] = [];
  hero.actions.forEach((a) => out.push({ where: `hero:${a.label}`, cta: a }));
  legs.forEach((l, i) => {
    if (l.cta) out.push({ where: `leg${i}`, cta: l.cta });
  });
  out.push({ where: "sightings", cta: sightingsCta });
  out.push({ where: "conversation:primary", cta: conversation.primary });
  out.push({ where: "conversation:secondary", cta: conversation.secondary });
  return out;
}

describe("every exposed link is real and safe", () => {
  it("CTAs resolve to an internal route or an allowed scheme", () => {
    for (const { where, cta } of everyCta()) {
      expect(isSafeHref(cta.href), `${where} -> ${cta.href}`).toBe(true);
    }
  });

  it("bearing directions point at internal routes", () => {
    for (const d of directions) {
      expect(d.href.startsWith("/"), d.label).toBe(true);
    }
  });

  it("explore links point at internal routes", () => {
    for (const l of exploreLinks) expect(l.href.startsWith("/"), l.href).toBe(true);
  });

  it("manifest rows use tel:/mailto:/https or the local vCard", () => {
    for (const row of manifest) {
      expect(isSafeHref(row.href), row.label).toBe(true);
      expect(row.value.length).toBeGreaterThan(0);
    }
    const save = manifest.find((r) => r.download);
    expect(save?.href).toBe("/kashti-educare.vcf");
    expect(save?.emphasis).toBe(true);
  });
});

describe("external-link flags", () => {
  it("https CTAs are external; internal / mailto / tel are not", () => {
    for (const { where, cta } of everyCta()) {
      expect(cta.external, `${where} (${cta.href})`).toBe(cta.href.startsWith("http"));
    }
  });

  it("whatsapp deep-link is a wa.me URL with a digits-only number", () => {
    expect(whatsappUrl).toMatch(/^https:\/\/wa\.me\/\d{8,15}$/);
  });
});

describe("contactUrl()", () => {
  it("builds a /contact deep-link with intent + prefilled topic", () => {
    const qs = new URLSearchParams(contactUrl("a custom experience", "school").split("?")[1]);
    expect(qs.get("intent")).toBe("school");
    expect(qs.get("program")).toBe("a custom experience");
  });

  it("defaults intent to school", () => {
    expect(new URLSearchParams(contactUrl("x").split("?")[1]).get("intent")).toBe("school");
  });
});

describe("voyage structure", () => {
  it("has the six ordered stations", () => {
    expect(journey.map((s) => s.id)).toEqual([
      "departure",
      "bearing",
      "passage",
      "sightings",
      "hail",
      "harbour",
    ]);
  });

  it("offers four legs, each with a CTA, an explanatory note, or the magazine feature", () => {
    expect(legs).toHaveLength(4);
    for (const leg of legs) {
      if (!leg.cta) expect(Boolean(leg.note || leg.magazine), leg.title).toBe(true);
    }
  });

  it("has five bearing directions with decorative compass readings", () => {
    expect(directions).toHaveLength(5);
    for (const d of directions) expect(d.bearing).toMatch(/^\d{3}°$/);
  });
});

describe("real imagery only", () => {
  it("every sighting resolves to a real file in /public/images/gallery", () => {
    expect(sightings.length).toBeGreaterThanOrEqual(6);
    for (const s of sightings) {
      expect(s.photo.src.startsWith("/images/gallery/")).toBe(true);
      expect(s.photo.width).toBeGreaterThan(0);
      expect(s.photo.height).toBeGreaterThan(0);
      expect(s.photo.alt.length).toBeGreaterThan(0);
      expect(s.caption.length).toBeGreaterThan(0);
    }
  });

  it("legs carry no imagery — the photography all lives at Sightings", () => {
    for (const leg of legs) {
      expect("image" in leg).toBe(false);
    }
  });
});

describe("social links", () => {
  it("carries Instagram + LinkedIn, and only exposes ones with a real URL", () => {
    expect(socialLinks.map((s) => s.label).sort()).toEqual(["Instagram", "LinkedIn"]);
    for (const s of socialLinks) {
      if (s.href) expect(s.href.startsWith("https://")).toBe(true);
    }
    const visible = visibleSocials();
    expect(visible.map((s) => s.label)).toEqual(["Instagram"]);
    expect(visible.every((s) => s.href.length > 0)).toBe(true);
  });
});

describe("magazine feature", () => {
  it("is wired to the Kashti Lens leg and is cover-image-ready", () => {
    const lens = legs.find((l) => l.brand === "Kashti Lens");
    expect(lens?.magazine).toBe(magazine);
    expect(magazine).toMatchObject({ coverImage: null, href: null, status: "in-preparation" });
    expect(magazine.placeholderNote.length).toBeGreaterThan(0);
  });

  it("shows no CTA and no download while an issue is not available", () => {
    const lens = legs.find((l) => l.brand === "Kashti Lens");
    expect(lens?.cta).toBeNull();
  });
});

describe("instagram highlights", () => {
  const shortcode = /^[A-Za-z0-9_-]{6,}$/;

  it("has exactly three curated posts, each linking to the real post URL", () => {
    expect(instagram.posts).toHaveLength(3);
    for (const p of instagram.posts) {
      expect(p.id).toMatch(shortcode);
      expect(p.href).toBe(`https://www.instagram.com/kashti_educare/p/${p.id}/`);
      expect(p.external).toBe(true);
    }
  });

  it("the profile CTA points at the real Kashti Educare Instagram", () => {
    expect(instagram.profileCta.href).toBe("https://www.instagram.com/kashti_educare/");
    expect(instagram.profileCta.external).toBe(true);
  });
});
