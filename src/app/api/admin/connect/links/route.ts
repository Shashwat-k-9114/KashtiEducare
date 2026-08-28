import { NextResponse, type NextRequest } from "next/server";

import { fetchAllLinksForAdmin, mutateLink } from "@/lib/connectApi";
import { validateLinkInput, type LinkInput } from "@/lib/connectValidation";

export const runtime = "nodejs";

// Authorization for everything under /api/admin/** is enforced centrally
// in src/middleware.ts (checks the signed admin session cookie) — these
// handlers assume that gate has already run.

export async function GET() {
  const links = await fetchAllLinksForAdmin();
  return NextResponse.json({ links });
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as Partial<LinkInput>;
  const input: LinkInput = {
    name: body.name ?? "",
    url: body.url ?? "",
    icon: body.icon ?? "",
    description: body.description ?? "",
    category: body.category ?? "",
  };
  const errors = validateLinkInput(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ status: "error", errors }, { status: 400 });
  }
  const result = await mutateLink({ type: "create", input });
  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}

export async function PATCH(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as
    | { mode: "reorder"; order: { id: string; position: number }[] }
    | ({ mode: "update"; id: string } & Partial<LinkInput> & { enabled?: boolean });

  if (body.mode === "reorder") {
    if (!Array.isArray(body.order) || body.order.length === 0) {
      return NextResponse.json({ status: "error", message: "order must be a non-empty array." }, { status: 400 });
    }
    const result = await mutateLink({ type: "reorder", order: body.order });
    return NextResponse.json(result, { status: result.ok ? 200 : 502 });
  }

  if (body.mode === "update") {
    if (!body.id) return NextResponse.json({ status: "error", message: "id is required." }, { status: 400 });
    if (body.url !== undefined) {
      const errors = validateLinkInput({
        name: body.name ?? "placeholder",
        url: body.url,
        icon: body.icon ?? "placeholder",
      });
      if (errors.url) return NextResponse.json({ status: "error", errors: { url: errors.url } }, { status: 400 });
    }
    const { mode: _mode, id, ...rest } = body;
    void _mode;
    const result = await mutateLink({ type: "update", id, input: rest });
    return NextResponse.json(result, { status: result.ok ? 200 : 502 });
  }

  return NextResponse.json({ status: "error", message: "Unknown mode." }, { status: 400 });
}

export async function DELETE(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as { id?: string };
  if (!body.id) return NextResponse.json({ status: "error", message: "id is required." }, { status: 400 });
  const result = await mutateLink({ type: "delete", id: body.id });
  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}
