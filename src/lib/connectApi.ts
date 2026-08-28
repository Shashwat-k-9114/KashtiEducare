import "server-only";

import type { ConnectLink, LinkInput } from "./connectValidation";

/**
 * Server-only network layer for the /connect system's backend — a single
 * Google Apps Script Web App (scripts/google-apps-script/connectSystem.gs)
 * fronting one Sheet with three tabs (Links, ScanEvents, ClickEvents).
 *
 * Every function here fails soft: a down/misconfigured Apps Script must
 * never break the public /connect page or throw an unhandled error into a
 * Server Component, so every call is wrapped and returns a safe fallback
 * (empty list / null / false) on any failure, and every request has a
 * short timeout so a hung Apps Script cold-start can't hang the page.
 */

const APPS_SCRIPT_URL = process.env.CONNECT_APPS_SCRIPT_URL;
const STATS_SECRET = process.env.CONNECT_STATS_SECRET;

const FETCH_TIMEOUT_MS = 8000;

async function callAppsScript(params: Record<string, string>): Promise<unknown> {
  if (!APPS_SCRIPT_URL) return null;
  const url = new URL(APPS_SCRIPT_URL);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(url.toString(), {
      signal: controller.signal,
      next: { revalidate: 30 },
    });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function postAppsScript(body: Record<string, unknown>): Promise<{ status: "ok" | "error"; message?: string; [key: string]: unknown } | null> {
  if (!APPS_SCRIPT_URL) return null;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      // text/plain avoids a CORS preflight against the Apps Script Web
      // App — same convention as the other two integrations. This call
      // is server-to-server anyway (no browser CORS involved), kept for
      // consistency and because Apps Script parses it as JSON regardless.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    const result = await response.json().catch(() => null);
    return result;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchLinks(): Promise<ConnectLink[]> {
  const result = (await callAppsScript({ action: "links" })) as { links?: ConnectLink[] } | null;
  return result?.links ?? [];
}

export type ScanEventInput = {
  visitorId: string;
  campaign: string;
  referrer: string;
  country: string;
  region: string;
  city: string;
  deviceType: string;
  browser: string;
  operatingSystem: string;
};

export async function postScanEvent(input: ScanEventInput): Promise<boolean> {
  const result = await postAppsScript({ action: "scan", ...input });
  return result?.status === "ok";
}

export type ClickEventInput = {
  visitorId: string;
  linkId: string;
  campaign: string;
};

export async function postClickEvent(input: ClickEventInput): Promise<boolean> {
  const result = await postAppsScript({ action: "click", ...input });
  return result?.status === "ok";
}

export type LinkMutation =
  | { type: "create"; input: LinkInput }
  | { type: "update"; id: string; input: Partial<LinkInput> & { enabled?: boolean } }
  | { type: "delete"; id: string }
  | { type: "reorder"; order: { id: string; position: number }[] };

export async function mutateLink(mutation: LinkMutation): Promise<{ ok: boolean; message?: string }> {
  if (!STATS_SECRET) return { ok: false, message: "CONNECT_STATS_SECRET is not configured." };
  const actionMap = { create: "link_create", update: "link_update", delete: "link_delete", reorder: "link_reorder" } as const;
  const body: Record<string, unknown> = { action: actionMap[mutation.type], secret: STATS_SECRET };
  if (mutation.type === "create") Object.assign(body, mutation.input);
  if (mutation.type === "update") Object.assign(body, { id: mutation.id, ...mutation.input });
  if (mutation.type === "delete") Object.assign(body, { id: mutation.id });
  if (mutation.type === "reorder") Object.assign(body, { order: mutation.order });

  const result = await postAppsScript(body);
  if (!result) return { ok: false, message: "Could not reach the backend. Try again." };
  return { ok: result.status === "ok", message: result.message };
}

export type AdminStats = {
  overview: {
    totalScans: number;
    estimatedUniqueVisitors: number;
    returningVisitors: number;
    scansToday: number;
    scansLast7Days: number;
    scansLast30Days: number;
  };
  scansOverTime: { date: string; count: number }[];
  location: {
    countries: { key: string; count: number }[];
    regions: { key: string; count: number }[];
    cities: { key: string; count: number }[];
  };
  devices: {
    deviceTypes: { key: string; count: number }[];
    browsers: { key: string; count: number }[];
    operatingSystems: { key: string; count: number }[];
  };
  links: { id: string; name: string; clicks: number; ctr: number }[];
  campaigns: { src: string; scans: number; uniqueVisitors: number; clicks: number; conversionRate: number }[];
};

export async function fetchAdminStats(): Promise<AdminStats | null> {
  if (!STATS_SECRET) return null;
  const result = (await callAppsScript({ action: "stats", secret: STATS_SECRET })) as AdminStats | null;
  return result;
}

export async function fetchAllLinksForAdmin(): Promise<ConnectLink[]> {
  if (!STATS_SECRET) return [];
  const result = (await callAppsScript({ action: "links_admin", secret: STATS_SECRET })) as { links?: ConnectLink[] } | null;
  return result?.links ?? [];
}
