import { guard } from "@/lib/admin/auth";
import { SUBMISSION_STATUSES } from "@/lib/admin/schema";
import { scriptCall } from "@/lib/sheet";

export const dynamic = "force-dynamic";

const fail = (status: number, error: string) => Response.json({ ok: false, error }, { status, headers: { "Cache-Control": "no-store" } });
const SHEETS = ["Enquiries", "Newsletter"];

export async function GET(req: Request) {
  const denied = await guard(req);
  if (denied) return denied;
  try {
    const out = await scriptCall({ action: "subs.list" }, { fresh: true });
    return Response.json(out, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    return fail(502, (e as Error).message);
  }
}

async function body(req: Request) {
  const b = await req.json().catch(() => null);
  if (!b || !SHEETS.includes(b.sheet) || !Number.isInteger(b.row) || b.row < 2 || typeof b.expectEmail !== "string") return null;
  return b as { sheet: string; row: number; expectEmail: string; status?: string; notes?: string };
}

export async function PATCH(req: Request) {
  const denied = await guard(req, { write: true });
  if (denied) return denied;
  const b = await body(req);
  if (!b) return fail(400, "Invalid request.");
  if (b.status !== undefined && !(SUBMISSION_STATUSES as readonly string[]).includes(b.status)) return fail(422, "Unknown status.");
  if (b.notes !== undefined && (typeof b.notes !== "string" || b.notes.length > 5000)) return fail(422, "Notes are too long.");
  try {
    await scriptCall({ action: "subs.update", ...b, by: "admin" }, { fresh: true });
    return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    return fail(502, (e as Error).message);
  }
}

export async function DELETE(req: Request) {
  const denied = await guard(req, { write: true });
  if (denied) return denied;
  const b = await body(req);
  if (!b) return fail(400, "Invalid request.");
  try {
    await scriptCall({ action: "subs.delete", sheet: b.sheet, row: b.row, expectEmail: b.expectEmail, by: "admin" }, { fresh: true });
    return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    return fail(502, (e as Error).message);
  }
}
