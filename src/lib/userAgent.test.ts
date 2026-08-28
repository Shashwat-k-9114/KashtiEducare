import { describe, expect, it } from "vitest";

import { classifyBrowser, classifyDevice, classifyOS, classifyUserAgent } from "./userAgent";

const IPHONE_SAFARI =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1";
const ANDROID_CHROME =
  "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Mobile Safari/537.36";
const IPAD_SAFARI = "Mozilla/5.0 (iPad; CPU OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/604.1";
const WINDOWS_EDGE = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 Edg/123.0.0.0";
const MAC_CHROME = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36";
const MAC_SAFARI = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15";

describe("classifyDevice", () => {
  it("classifies phones as mobile", () => {
    expect(classifyDevice(IPHONE_SAFARI)).toBe("mobile");
    expect(classifyDevice(ANDROID_CHROME)).toBe("mobile");
  });
  it("classifies iPad as tablet", () => {
    expect(classifyDevice(IPAD_SAFARI)).toBe("tablet");
  });
  it("classifies desktop UAs as desktop", () => {
    expect(classifyDevice(WINDOWS_EDGE)).toBe("desktop");
    expect(classifyDevice(MAC_CHROME)).toBe("desktop");
  });
  it("returns unknown for empty input", () => {
    expect(classifyDevice("")).toBe("unknown");
  });
});

describe("classifyBrowser", () => {
  it("distinguishes Edge from Chrome despite shared tokens", () => {
    expect(classifyBrowser(WINDOWS_EDGE)).toBe("Edge");
    expect(classifyBrowser(MAC_CHROME)).toBe("Chrome");
  });
  it("distinguishes Safari from Chrome-on-iOS", () => {
    expect(classifyBrowser(MAC_SAFARI)).toBe("Safari");
    expect(classifyBrowser(IPHONE_SAFARI)).toBe("Safari");
  });
});

describe("classifyOS", () => {
  it("identifies major operating systems", () => {
    expect(classifyOS(IPHONE_SAFARI)).toBe("iOS");
    expect(classifyOS(ANDROID_CHROME)).toBe("Android");
    expect(classifyOS(WINDOWS_EDGE)).toBe("Windows");
    expect(classifyOS(MAC_CHROME)).toBe("macOS");
  });
});

describe("classifyUserAgent", () => {
  it("returns all three buckets together", () => {
    expect(classifyUserAgent(ANDROID_CHROME)).toEqual({
      deviceType: "mobile",
      browser: "Chrome",
      operatingSystem: "Android",
    });
  });
});
