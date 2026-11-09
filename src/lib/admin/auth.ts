// Admin password + session cookie. Uses Web Crypto only, so it runs in the proxy and in route handlers alike.

export const COOKIE = "kashti_admin";
export const SESSION_SECONDS = 60 * 60 * 12; // 12 hours

const enc = new TextEncoder();
const hex = (b: ArrayBuffer | Uint8Array) => Array.from(new Uint8Array(b), (x) => x.toString(16).padStart(2, "0")).join("");

/** Constant-time string comparison (length is not secret here: both sides are fixed-length digests). */
function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

function sessionSecret(): string | null {
  const s = process.env.ADMIN_SESSION_SECRET?.trim();
  return s && s.length >= 32 ? s : null;
}

export function adminConfigured() {
  return !!(process.env.ADMIN_PASSWORD?.trim() && sessionSecret());
}

async function hmac(message: string, secret: string) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return hex(await crypto.subtle.sign("HMAC", key, enc.encode(message)));
}

async function sha256(s: string) {
  return hex(await crypto.subtle.digest("SHA-256", enc.encode(s)));
}

export async function checkPassword(input: string) {
  const real = process.env.ADMIN_PASSWORD?.trim();
  if (!real) return false;
  return safeEqual(await sha256(input), await sha256(real));
}

export async function createSession() {
  const secret = sessionSecret();
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is missing or shorter than 32 characters");
  const exp = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  return `${exp}.${await hmac(`v1.${exp}`, secret)}`;
}

export async function verifySession(token?: string | null) {
  const secret = sessionSecret();
  if (!secret || !token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || !/^\d+$/.test(exp) || Number(exp) < Date.now() / 1000) return false;
  return safeEqual(sig, await hmac(`v1.${exp}`, secret));
}

export function cookieFromHeader(header: string | null, name = COOKIE) {
  if (!header) return null;
  for (const part of header.split(";")) {
    const i = part.indexOf("=");
    if (i > 0 && part.slice(0, i).trim() === name) return decodeURIComponent(part.slice(i + 1).trim());
  }
  return null;
}

/** For route handlers: returns a Response to send if the caller is not allowed, otherwise null. */
export async function guard(req: Request, opts: { write?: boolean } = {}): Promise<Response | null> {
  const json = (status: number, error: string) => Response.json({ ok: false, error }, { status, headers: { "Cache-Control": "no-store" } });
  if (!(await verifySession(cookieFromHeader(req.headers.get("cookie"))))) return json(401, "Not signed in.");
  if (opts.write) {
    // CSRF defence on top of SameSite=Strict: state-changing calls must come from this same origin and be JSON.
    const origin = req.headers.get("origin");
    if (!origin || origin !== new URL(req.url).origin) return json(403, "Bad origin.");
    if (!(req.headers.get("content-type") || "").includes("application/json")) return json(415, "Expected JSON.");
  }
  return null;
}
