import { describe, expect, it } from "vitest";

import {
  contactUrl,
  conversation,
  directions,
  exploreLinks,
  hero,
  journey,
  legs,
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

  it("offers four legs, each with a CTA or an explanatory note", () => {
    expect(legs).toHaveLength(4);
    for (const leg of legs) {
      if (!leg.cta) expect(leg.note, leg.title).toBeTruthy();
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
  it("covers the four networks and exposes none without a real URL", () => {
    expect(socialLinks.map((s) => s.label).sort()).toEqual(["Facebook", "Instagram", "LinkedIn", "YouTube"]);
    expect(visibleSocials()).toHaveLength(0);
  });
});
