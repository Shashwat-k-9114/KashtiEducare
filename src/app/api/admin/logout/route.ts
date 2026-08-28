import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE } from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function POST() {
  const response = NextResponse.json({ status: "ok" });
  response.cookies.delete(ADMIN_SESSION_COOKIE);
  return response;
}
