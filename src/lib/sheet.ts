// Talks to the Apps Script web app (google-apps-script/Code.gs) that fronts the Google Sheet.

export class SheetError extends Error {}

type Opts = { fresh?: boolean };

/**
 * `fresh` bypasses every cache (admin screens). Without it the call is left to the caller's own caching,
 * which is how src/lib/content.ts wraps it.
 */
export async function scriptCall<T = Record<string, any>>(payload: Record<string, unknown>, { fresh = false }: Opts = {}): Promise<T & { ok: true }> {
  const url = process.env.GOOGLE_SCRIPT_URL?.trim();
  const secret = process.env.GOOGLE_SCRIPT_SECRET?.trim();
  if (!url || !secret) throw new SheetError("Google Sheet connection is not configured (GOOGLE_SCRIPT_URL / GOOGLE_SCRIPT_SECRET).");

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ secret, ...payload }),
    redirect: "follow",
    signal: AbortSignal.timeout(25000),
    ...(fresh ? { cache: "no-store" as const } : {}),
  });
  const out = await res.json().catch(() => null);
  if (!res.ok || !out) throw new SheetError(`Google Sheet did not answer correctly (HTTP ${res.status}). Has the latest Code.gs been deployed as a new version?`);
  if (!out.ok) throw new SheetError(out.error || "Google Sheet reported an error.");
  return out;
}
