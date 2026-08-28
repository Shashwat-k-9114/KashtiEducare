import { NextResponse, type NextRequest } from "next/server";

import { postClickEvent } from "@/lib/connectApi";
import { generateVisitorId, VISITOR_ID_COOKIE, VISITOR_ID_MAX_AGE_SECONDS } from "@/lib/visitorId";

export const runtime = "nodejs";

/**
 * Records one link click on /connect. Called fire-and-forget from
 * LinkButton.tsx with `keepalive: true` so the request survives the
 * browser navigating away immediately after — this handler must return
 * fast and never block the destination navigation, which happens
 * natively via the <a href> regardless of how this call resolves.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => ({}))) as { linkId?: string; campaign?: string };
    if (!body.linkId) return NextResponse.json({ status: "ok" });

    const existingVisitorId = request.cookies.get(VISITOR_ID_COOKIE)?.value;
    const visitorId = existingVisitorId || generateVisitorId();

    await postClickEvent({
      visitorId,
      linkId: body.linkId.slice(0, 128),
      campaign: (body.campaign ?? "").slice(0, 64),
    });

    const response = NextResponse.json({ status: "ok" });
    if (!existingVisitorId) {
      response.cookies.set(VISITOR_ID_COOKIE, visitorId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: VISITOR_ID_MAX_AGE_SECONDS,
        path: "/",
      });
    }
    return response;
  } catch {
    return NextResponse.json({ status: "ok" });
  }
}
