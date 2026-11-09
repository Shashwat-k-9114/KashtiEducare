import { revalidateTag } from "next/cache";
import { guard } from "@/lib/admin/auth";
import { normalize, validate } from "@/lib/admin/normalize";
import { SECTION_MAP } from "@/lib/admin/schema";
import { scriptCall } from "@/lib/sheet";

export const dynamic = "force-dynamic";

const MAX_BYTES = 400_000;
const fail = (status: number, error: string, extra: object = {}) => Response.json({ ok: false, error, ...extra }, { status, headers: { "Cache-Control": "no-store" } });

type Ctx = { params: Promise<{ key: string }> };

/** Save a section. The value is re-normalised and re-validated here: the browser is not trusted. */
export async function PUT(req: Request, { params }: Ctx) {
  const denied = await guard(req, { write: true });
  if (denied) return denied;
  const { key } = await params;
  const section = SECTION_MAP[key];
  if (!section) return fail(404, "Unknown section.");

  let value: unknown;
  try {
    value = (await req.json())?.value;
  } catch {
    return fail(400, "Invalid request.");
  }
  const kindOk = section.root.type === "list" ? Array.isArray(value) : !!value && typeof value === "object" && !Array.isArray(value);
  if (!kindOk) return fail(422, "The content has the wrong shape.");

  const clean = normalize(section.root, value);
  const problems = validate(section.root, clean);
  if (problems.length) return fail(422, "Please fix the highlighted problems.", { problems: problems.slice(0, 20) });
  const json = JSON.stringify(clean);
  if (new TextEncoder().encode(json).length > MAX_BYTES) return fail(413, "This section is too large to save.");

  try {
    await scriptCall({ action: "content.set", key, value: json, by: "admin", summary: `Edited ${section.title}` }, { fresh: true });
  } catch (e) {
    return fail(502, (e as Error).message);
  }
  revalidateTag("content", { expire: 0 }); // live site picks it up on the next request
  return Response.json({ ok: true, value: clean, updated: new Date().toISOString() }, { headers: { "Cache-Control": "no-store" } });
}

/** Remove the saved edits for a section, so the site falls back to the built-in content. */
export async function DELETE(req: Request, { params }: Ctx) {
  const denied = await guard(req, { write: true });
  if (denied) return denied;
  const { key } = await params;
  const section = SECTION_MAP[key];
  if (!section) return fail(404, "Unknown section.");
  try {
    await scriptCall({ action: "content.reset", key, by: "admin", summary: `Reset ${section.title} to the original` }, { fresh: true });
  } catch (e) {
    return fail(502, (e as Error).message);
  }
  revalidateTag("content", { expire: 0 });
  return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
