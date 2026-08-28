import { NextResponse, type NextRequest } from "next/server";

import { ADMIN_SESSION_COOKIE, isValidSessionCookie } from "@/lib/adminAuth";

/**
 * Gates /admin/** and /api/admin/** behind the signed admin session
 * cookie set by /api/admin/login. Named `proxy.ts` (not `middleware.ts`)
 * per this project's Next.js 16 — `middleware` was renamed to `proxy` in
 * v16, see node_modules/next/dist/docs/.../file-conventions/proxy.md.
 * Defaults to the Node.js runtime, so Node's `crypto` (used by
 * isValidSessionCookie) works here without an edge-runtime workaround.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname === "/admin/login" || pathname === "/api/admin/login" || pathname === "/api/admin/logout";
  if (isAuthRoute) return NextResponse.next();

  const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (isValidSessionCookie(session)) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
