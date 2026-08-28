import { describe, expect, it } from "vitest";

import { getVisibleLinks, isValidLinkUrl, validateLinkInput, type ConnectLink } from "./connectValidation";

function makeLink(overrides: Partial<ConnectLink>): ConnectLink {
  return {
    id: "1",
    name: "Test Link",
    url: "https://example.com",
    icon: "link",
    description: "",
    category: "",
    position: 0,
    enabled: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

describe("isValidLinkUrl", () => {
  it("accepts https, mailto, and tel URLs", () => {
    expect(isValidLinkUrl("https://kashtieducare.com")).toBe(true);
    expect(isValidLinkUrl("http://kashtieducare.com")).toBe(true);
    expect(isValidLinkUrl("mailto:engage@kashtieducare.com")).toBe(true);
    expect(isValidLinkUrl("tel:+918307039685")).toBe(true);
  });
  it("rejects disallowed schemes (open-redirect / XSS surface)", () => {
    expect(isValidLinkUrl("javascript:alert(1)")).toBe(false);
    expect(isValidLinkUrl("data:text/html,<script>alert(1)</script>")).toBe(false);
    expect(isValidLinkUrl("file:///etc/passwd")).toBe(false);
  });
  it("rejects malformed input", () => {
    expect(isValidLinkUrl("")).toBe(false);
    expect(isValidLinkUrl("not a url")).toBe(false);
    expect(isValidLinkUrl("a".repeat(3000))).toBe(false);
  });
});

describe("getVisibleLinks", () => {
  it("filters out disabled links", () => {
    const links = [makeLink({ id: "a", enabled: true }), makeLink({ id: "b", enabled: false })];
    expect(getVisibleLinks(links).map((l) => l.id)).toEqual(["a"]);
  });
  it("sorts by position ascending", () => {
    const links = [makeLink({ id: "b", position: 2 }), makeLink({ id: "a", position: 1 }), makeLink({ id: "c", position: 0 })];
    expect(getVisibleLinks(links).map((l) => l.id)).toEqual(["c", "a", "b"]);
  });
});

describe("validateLinkInput", () => {
  it("passes for a well-formed input", () => {
    expect(validateLinkInput({ name: "WhatsApp", url: "https://wa.me/918307039685", icon: "whatsapp" })).toEqual({});
  });
  it("flags a missing name", () => {
    const errors = validateLinkInput({ name: "", url: "https://example.com", icon: "link" });
    expect(errors.name).toBeDefined();
  });
  it("flags an invalid url", () => {
    const errors = validateLinkInput({ name: "Bad", url: "not-a-url", icon: "link" });
    expect(errors.url).toBeDefined();
  });
  it("flags a missing icon", () => {
    const errors = validateLinkInput({ name: "No Icon", url: "https://example.com", icon: "" });
    expect(errors.icon).toBeDefined();
  });
});
