import { describe, expect, it } from "vitest";

import {
  contactActions,
  contactUrl,
  conversation,
  exploreLinks,
  experiencesInAction,
  hero,
  needShortcuts,
  primaryOfferings,
  saveContact,
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

function collectCtas(): { where: string; cta: Cta }[] {
  const out: { where: string; cta: Cta }[] = [];
  hero.actions.forEach((a) => out.push({ where: `hero:${a.label}`, cta: a }));
  primaryOfferings.forEach((o) => {
    if (o.cta) out.push({ where: `offering:${o.number}`, cta: o.cta });
  });
  out.push({ where: "experiencesInAction", cta: experiencesInAction.cta });
  out.push({ where: "conversation:primary", cta: conversation.primary });
  out.push({ where: "conversation:secondary", cta: conversation.secondary });
  return out;
}

describe("connect config — every exposed href is real and safe", () => {
  it("hero CTAs", () => {
    for (const { where, cta } of collectCtas()) {
      expect(isSafeHref(cta.href), `${where} -> ${cta.href}`).toBe(true);
    }
  });

  it("need shortcuts point at internal routes", () => {
    for (const need of needShortcuts) {
      expect(need.href.startsWith("/"), need.label).toBe(true);
      expect(isSafeHref(need.href), need.label).toBe(true);
    }
  });

  it("explore links + gallery are internal routes", () => {
    for (const link of [...exploreLinks, experiencesInAction.cta]) {
      expect(link.href.startsWith("/"), link.href).toBe(true);
    }
  });

  it("contact actions use tel:/mailto:/https and carry a value", () => {
    for (const action of contactActions) {
      expect(isSafeHref(action.href), action.label).toBe(true);
      expect(action.value.length).toBeGreaterThan(0);
    }
  });

  it("save-contact points at the static vCard in /public", () => {
    expect(saveContact.href).toBe("/kashti-educare.vcf");
  });
});

describe("external-link flags", () => {
  it("https CTAs are marked external, internal/mailto/tel are not", () => {
    for (const { where, cta } of collectCtas()) {
      const expected = cta.href.startsWith("http");
      expect(cta.external, `${where} (${cta.href})`).toBe(expected);
    }
  });

  it("whatsapp deep-link is a wa.me URL with a digits-only number", () => {
    expect(whatsappUrl).toMatch(/^https:\/\/wa\.me\/\d{8,15}$/);
  });
});

describe("contactUrl()", () => {
  it("builds a /contact deep-link with intent + prefilled topic", () => {
    const url = contactUrl("a custom experience", "school");
    expect(url.startsWith("/contact?")).toBe(true);
    const qs = new URLSearchParams(url.split("?")[1]);
    expect(qs.get("intent")).toBe("school");
    expect(qs.get("program")).toBe("a custom experience");
  });

  it("defaults intent to school", () => {
    expect(new URLSearchParams(contactUrl("x").split("?")[1]).get("intent")).toBe("school");
  });
});

describe("offerings", () => {
  it("are numbered 01–04 with unique numbers", () => {
    const numbers = primaryOfferings.map((o) => o.number);
    expect(numbers).toEqual(["01", "02", "03", "04"]);
  });

  it("every offering has a CTA or an explanatory note (never a broken link)", () => {
    for (const o of primaryOfferings) {
      if (!o.cta) expect(o.note, o.number).toBeTruthy();
    }
  });
});

describe("social links", () => {
  it("covers the four networks and exposes none without a real URL", () => {
    expect(socialLinks.map((s) => s.label).sort()).toEqual(["Facebook", "Instagram", "LinkedIn", "YouTube"]);
    expect(visibleSocials()).toHaveLength(0);
  });

  it("any configured social href would be an absolute https URL", () => {
    for (const s of socialLinks) {
      if (s.href) expect(s.href.startsWith("https://"), s.label).toBe(true);
    }
  });
});
