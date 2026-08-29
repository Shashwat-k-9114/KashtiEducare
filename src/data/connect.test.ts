import { describe, expect, it } from "vitest";

import { destinations, primaryActions, socialLinks, visibleLinks, type ConnectLink } from "./connect";

const ALLOWED_SCHEMES = new Set(["http:", "https:", "mailto:", "tel:"]);

function isSafeHref(href: string): boolean {
  if (href.startsWith("/") && !href.startsWith("//")) return true; // internal
  try {
    return ALLOWED_SCHEMES.has(new URL(href).protocol);
  } catch {
    return false;
  }
}

const configuredGroups: [string, ConnectLink[]][] = [
  ["primaryActions", primaryActions],
  ["destinations", destinations],
];

describe.each(configuredGroups)("%s", (_name, links) => {
  it("has at least one link", () => {
    expect(links.length).toBeGreaterThan(0);
  });

  it("every link has a non-empty label", () => {
    for (const link of links) expect(link.label.trim().length).toBeGreaterThan(0);
  });

  it("every configured href is internal or an allowed scheme", () => {
    for (const link of links) {
      expect(link.href, link.label).not.toBeNull();
      expect(isSafeHref(link.href as string), `${link.label} -> ${link.href}`).toBe(true);
    }
  });

  it("priorities are unique", () => {
    const priorities = links.map((l) => l.priority);
    expect(new Set(priorities).size).toBe(priorities.length);
  });

  it("external links are absolute http(s) URLs", () => {
    for (const link of links) {
      if (link.external) expect((link.href as string).startsWith("http")).toBe(true);
    }
  });
});

describe("socialLinks", () => {
  it("covers the four expected networks", () => {
    expect(socialLinks.map((l) => l.label).sort()).toEqual(["Facebook", "Instagram", "LinkedIn", "YouTube"]);
  });

  it("any configured social href is an absolute https URL", () => {
    for (const link of socialLinks) {
      if (link.href) expect(link.href.startsWith("https://"), link.label).toBe(true);
    }
  });
});

describe("visibleLinks", () => {
  it("drops links with a null href and sorts by priority", () => {
    const input: ConnectLink[] = [
      { label: "b", href: "/b", icon: "about", priority: 2, external: false },
      { label: "hidden", href: null, icon: "about", priority: 0, external: false },
      { label: "a", href: "/a", icon: "about", priority: 1, external: false },
    ];
    expect(visibleLinks(input).map((l) => l.label)).toEqual(["a", "b"]);
  });
});
