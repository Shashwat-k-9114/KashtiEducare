import { NextResponse, type NextRequest } from "next/server";

import { ADMIN_SESSION_COOKIE, checkAdminPassword, createSessionCookieValue, SESSION_MAX_AGE_SECONDS } from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as { password?: string };

  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json({ status: "error", message: "Admin login is not configured." }, { status: 500 });
  }

  if (!body.password || !checkAdminPassword(body.password)) {
    // No rate-limit store exists (would need Redis/KV — real infra for a
    // single-admin password gate isn't worth adding). A fixed delay on
    // every failed attempt at least removes the incentive for fast
    // sequential brute-forcing; it doesn't stop a distributed attacker,
    // but combined with a long random ADMIN_PASSWORD that's a reasonable
    // tradeoff for this threat model.
    await new Promise((resolve) => setTimeout(resolve, 750));
    return NextResponse.json({ status: "error", message: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ status: "ok" });
  response.cookies.set(ADMIN_SESSION_COOKIE, createSessionCookieValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
  });
  return response;
}
