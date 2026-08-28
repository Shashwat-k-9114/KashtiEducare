import { createHash, createHmac, timingSafeEqual } from "crypto";

/**
 * Lightest secure mechanism for a single-admin dashboard — no auth
 * library, just Node's built-in crypto. Session cookie is
 * `${expiresAt}.${hmac}`; `expiresAt` is a Unix-ms timestamp, `hmac` is
 * HMAC-SHA256(ADMIN_SESSION_SECRET, expiresAt) so the cookie can't be
 * forged or extended without knowing the server-only secret, and expiry
 * is enforced without needing a session store.
 */

export const ADMIN_SESSION_COOKIE = "kashti_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  return secret;
}

function sign(expiresAt: string): string {
  return createHmac("sha256", getSessionSecret()).update(expiresAt).digest("hex");
}

/** Constant-time digest comparison — avoids both timing leaks and the
 * length-mismatch throw that raw timingSafeEqual has on unequal-length
 * buffers (submitted vs. expected passwords are rarely the same length). */
function safeEqual(a: string, b: string): boolean {
  const digestA = createHash("sha256").update(a).digest();
  const digestB = createHash("sha256").update(b).digest();
  return timingSafeEqual(digestA, digestB);
}

export function checkAdminPassword(submitted: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return safeEqual(submitted, expected);
}

export function createSessionCookieValue(): string {
  const expiresAt = String(Date.now() + SESSION_TTL_MS);
  return `${expiresAt}.${sign(expiresAt)}`;
}

export function isValidSessionCookie(value: string | undefined | null): boolean {
  if (!value) return false;
  const [expiresAt, providedSignature] = value.split(".");
  if (!expiresAt || !providedSignature) return false;
  if (Number(expiresAt) < Date.now()) return false;
  return safeEqual(sign(expiresAt), providedSignature);
}

export const SESSION_MAX_AGE_SECONDS = SESSION_TTL_MS / 1000;
