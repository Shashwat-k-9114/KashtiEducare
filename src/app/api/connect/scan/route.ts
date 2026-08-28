import { geolocation } from "@vercel/functions";
import { NextResponse, type NextRequest } from "next/server";

import { postScanEvent } from "@/lib/connectApi";
import { classifyUserAgent } from "@/lib/userAgent";
import { generateVisitorId, VISITOR_ID_COOKIE, VISITOR_ID_MAX_AGE_SECONDS } from "@/lib/visitorId";

export const runtime = "nodejs";

/**
 * Records one scan/page-view of /connect. Called fire-and-forget from
 * ScanTracker.tsx — this handler is intentionally the *only* place that
 * reads geolocation (Vercel's edge-provided headers, via
 * @vercel/functions' `geolocation()` — no third-party GeoIP service, no
 * raw IP ever read or stored) and User-Agent, so those never need to
 * leave the client at all.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => ({}))) as { campaign?: string };
    const existingVisitorId = request.cookies.get(VISITOR_ID_COOKIE)?.value;
    const visitorId = existingVisitorId || generateVisitorId();

    const geo = geolocation(request);
    const { deviceType, browser, operatingSystem } = classifyUserAgent(request.headers.get("user-agent") ?? "");

    await postScanEvent({
      visitorId,
      campaign: (body.campaign ?? "").slice(0, 64),
      referrer: (request.headers.get("referer") ?? "").slice(0, 512),
      country: geo.country ?? "",
      region: geo.countryRegion ?? "",
      city: geo.city ?? "",
      deviceType,
      browser,
      operatingSystem,
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
    // Analytics must never surface as a user-facing error.
    return NextResponse.json({ status: "ok" });
  }
}
