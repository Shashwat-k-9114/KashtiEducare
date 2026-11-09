import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE, verifySession } from "@/lib/admin/auth";

/**
 * Password gate for the whole admin portal and its API.
 * (Every admin route handler and the admin layout check the session again: defence in depth.)
 */
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const open = pathname === "/admin/login" || pathname === "/api/admin/login";
  const authed = await verifySession(req.cookies.get(COOKIE)?.value);

  let res: NextResponse;
  if (open || authed) {
    res = NextResponse.next();
  } else if (pathname.startsWith("/api/")) {
    res = NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  } else {
    res = NextResponse.redirect(new URL("/admin/login", req.url));
  }
  res.headers.set("Cache-Control", "no-store");
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };
