import { NextResponse } from "next/server";
import { COOKIE, SESSION_SECONDS, adminConfigured, checkPassword, createSession } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

// Best-effort brute-force brake (per server instance): 5 wrong passwords from one address = 15 minute lock.
const fails = new Map<string, { n: number; until: number }>();
const MAX = 5;
const LOCK_MS = 15 * 60 * 1000;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const reply = (status: number, error?: string) => NextResponse.json(error ? { ok: false, error } : { ok: true }, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin || origin !== new URL(req.url).origin) return reply(403, "Bad origin.");
  if (!adminConfigured()) return reply(503, "Admin portal is not configured yet (ADMIN_PASSWORD and ADMIN_SESSION_SECRET).");

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "local";
  const rec = fails.get(ip);
  if (rec && rec.until > Date.now()) return reply(429, "Too many attempts. Please wait 15 minutes and try again.");

  let password = "";
  try {
    password = String((await req.json())?.password ?? "");
  } catch {
    return reply(400, "Invalid request.");
  }

  if (!(await checkPassword(password))) {
    const n = (rec && rec.until === 0 ? rec.n : 0) + 1;
    fails.set(ip, n >= MAX ? { n: 0, until: Date.now() + LOCK_MS } : { n, until: 0 });
    await sleep(500);
    return reply(401, "That password is not correct.");
  }

  fails.delete(ip);
  const res = reply(200);
  res.cookies.set(COOKIE, await createSession(), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
  return res;
}
