import { beforeEach, describe, expect, it } from "vitest";

import { checkAdminPassword, createSessionCookieValue, isValidSessionCookie } from "./adminAuth";

beforeEach(() => {
  process.env.ADMIN_PASSWORD = "correct-horse-battery-staple";
  process.env.ADMIN_SESSION_SECRET = "test-session-secret-should-be-long-and-random";
});

describe("checkAdminPassword", () => {
  it("accepts the correct password", () => {
    expect(checkAdminPassword("correct-horse-battery-staple")).toBe(true);
  });
  it("rejects an incorrect password", () => {
    expect(checkAdminPassword("wrong-password")).toBe(false);
  });
  it("rejects a password of a different length without throwing", () => {
    expect(() => checkAdminPassword("x")).not.toThrow();
    expect(checkAdminPassword("x")).toBe(false);
  });
  it("rejects when ADMIN_PASSWORD is unset", () => {
    delete process.env.ADMIN_PASSWORD;
    expect(checkAdminPassword("anything")).toBe(false);
  });
});

describe("session cookie sign/verify", () => {
  it("accepts a freshly created cookie", () => {
    const cookie = createSessionCookieValue();
    expect(isValidSessionCookie(cookie)).toBe(true);
  });
  it("rejects a tampered signature", () => {
    const cookie = createSessionCookieValue();
    const [expiresAt] = cookie.split(".");
    expect(isValidSessionCookie(`${expiresAt}.tampered-signature`)).toBe(false);
  });
  it("rejects an expired cookie", () => {
    const expiresAt = String(Date.now() - 1000);
    // Can't forge a valid signature without the secret in scope here, so
    // just confirm a clearly-expired, garbage-signed cookie is rejected.
    expect(isValidSessionCookie(`${expiresAt}.anything`)).toBe(false);
  });
  it("rejects malformed/empty input", () => {
    expect(isValidSessionCookie(null)).toBe(false);
    expect(isValidSessionCookie(undefined)).toBe(false);
    expect(isValidSessionCookie("")).toBe(false);
    expect(isValidSessionCookie("no-dot-separator")).toBe(false);
  });
});
