import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clip = (v: FormDataEntryValue | null, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const fail = (error: string, status: number) => NextResponse.json({ ok: false, error }, { status });

/**
 * Receives the Contact and Newsletter forms, validates them, and appends them to the Google Sheet
 * through the Apps Script web app in google-apps-script/Code.gs. The script URL and secret stay on the server.
 */
export async function POST(req: Request) {
  const url = process.env.GOOGLE_SCRIPT_URL;
  const secret = process.env.GOOGLE_SCRIPT_SECRET;
  if (!url || !secret) return fail("Form storage is not configured.", 503);

  let fd: FormData;
  try {
    fd = await req.formData();
  } catch {
    return fail("Invalid request.", 400);
  }

  // Honeypot: bots fill the hidden "website" field. Pretend success, store nothing.
  if (clip(fd.get("website"))) return NextResponse.json({ ok: true });

  const isNewsletter = clip(fd.get("form")) === "newsletter";
  let sheet: "Enquiries" | "Newsletter";
  let fields: Record<string, string>;

  if (isNewsletter) {
    const email = clip(fd.get("email"), 254);
    if (!EMAIL.test(email)) return fail("Please enter a valid email address.", 422);
    sheet = "Newsletter";
    fields = { email, role: clip(fd.get("role"), 100) };
  } else {
    const role = clip(fd.get("role"), 100);
    const name = clip(fd.get("name"), 200);
    const org = clip(fd.get("org"), 300);
    const email = clip(fd.get("email"), 254);
    const phone = clip(fd.get("phone"), 40);
    if (!role || name.length < 2 || org.length < 2 || !EMAIL.test(email) || phone.replace(/\D/g, "").length < 10) {
      return fail("Please check the required fields.", 422);
    }
    sheet = "Enquiries";
    fields = {
      role, name, org, email, phone,
      programme: clip(fd.get("programme"), 300),
      learners: clip(fd.get("learners"), 200),
      message: clip(fd.get("message"), 5000),
      consent: fd.get("consent") ? "Yes" : "No",
    };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" }, // avoids a CORS preflight style request; Apps Script reads the raw body
      body: JSON.stringify({ secret, sheet, fields, source: req.headers.get("referer") || "" }),
      redirect: "follow",
      cache: "no-store",
    });
    const out = await res.json().catch(() => null);
    if (!res.ok || !out?.ok) throw new Error(out?.error || `upstream ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[submit] sheet write failed:", err);
    return fail("Could not save your message.", 502);
  }
}
