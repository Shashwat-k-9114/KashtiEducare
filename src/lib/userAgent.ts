/**
 * Small, dependency-free User-Agent classifier. Buckets only — this is
 * deliberately not forensic-grade detection (no full UA string is ever
 * persisted, see src/app/api/connect/scan/route.ts), just enough to
 * answer "mobile vs desktop" / "which major browser" / "which major OS"
 * for the admin dashboard.
 */

export type DeviceType = "mobile" | "tablet" | "desktop" | "unknown";

export function classifyDevice(userAgent: string): DeviceType {
  const ua = userAgent.toLowerCase();
  if (!ua) return "unknown";
  if (/ipad|tablet|(android(?!.*mobile))/.test(ua)) return "tablet";
  if (/mobi|iphone|ipod|android/.test(ua)) return "mobile";
  return "desktop";
}

export function classifyBrowser(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (!ua) return "Unknown";
  // Order matters: many browsers include "safari"/"chrome" tokens in their
  // own UA string, so more specific tokens must be checked first.
  if (/edg\//.test(ua)) return "Edge";
  if (/opr\/|opera/.test(ua)) return "Opera";
  if (/samsungbrowser/.test(ua)) return "Samsung Internet";
  if (/firefox|fxios/.test(ua)) return "Firefox";
  if (/crios/.test(ua)) return "Chrome";
  if (/chrome/.test(ua)) return "Chrome";
  if (/safari/.test(ua)) return "Safari";
  return "Other";
}

export function classifyOS(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (!ua) return "Unknown";
  if (/iphone|ipad|ipod/.test(ua)) return "iOS";
  if (/android/.test(ua)) return "Android";
  if (/windows/.test(ua)) return "Windows";
  if (/mac os x|macintosh/.test(ua)) return "macOS";
  if (/linux/.test(ua)) return "Linux";
  return "Other";
}

export function classifyUserAgent(userAgent: string) {
  return {
    deviceType: classifyDevice(userAgent),
    browser: classifyBrowser(userAgent),
    operatingSystem: classifyOS(userAgent),
  };
}
