import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/**
 * Fetches the Fraunces webfont from Google Fonts for use inside
 * ImageResponse (which can't use next/font's CSS-variable output directly
 * — it needs raw font bytes). Falls back to Satori's default font on any
 * network hiccup so OG generation never hard-fails a build.
 *
 * Memoized at module scope: there are ~70 OG images across this site
 * (every category + every programme), and without this every single one
 * would trigger its own round-trip to Google Fonts at build time.
 */
let frauncesPromise: Promise<ArrayBuffer | null> | null = null;

function loadFraunces(weight: 600): Promise<ArrayBuffer | null> {
  if (!frauncesPromise) {
    frauncesPromise = (async () => {
      try {
        const cssRes = await fetch(
          `https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,${weight}&display=swap`,
        );
        const css = await cssRes.text();
        const fontUrl = css.match(/src: url\(([^)]+)\) format\('(?:woff2|truetype)'\)/)?.[1];
        if (!fontUrl) return null;
        const fontRes = await fetch(fontUrl);
        return await fontRes.arrayBuffer();
      } catch {
        return null;
      }
    })();
  }
  return frauncesPromise;
}

type OgTemplateProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

/** Kashti-branded OG template: ink-green gradient, gold accent, wake motif. */
export async function renderOgImage({ eyebrow, title, subtitle }: OgTemplateProps) {
  const frauncesBold = await loadFraunces(600);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          padding: "76px",
          background: "linear-gradient(135deg, #0b2e22 0%, #128b62 100%)",
          color: "#fdfdfd",
          fontFamily: frauncesBold ? "Fraunces" : "sans-serif",
        }}
      >
        {/* wake motif */}
        <svg
          width="360"
          height="90"
          viewBox="0 0 400 90"
          style={{ position: "absolute", top: 56, right: 56, opacity: 0.35 }}
        >
          <path
            d="M2 45 C40 15 60 75 100 45 C140 15 160 75 200 45 C240 15 260 75 300 45 C340 15 360 75 398 45"
            stroke="#eeb250"
            strokeWidth="4"
            fill="none"
          />
        </svg>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 16, height: 16, borderRadius: 999, background: "#eeb250", display: "flex" }} />
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: 1, display: "flex" }}>Kashti Educare</div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 980 }}>
          {eyebrow ? (
            <div
              style={{
                display: "flex",
                fontSize: 26,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#eeb250",
                marginBottom: 22,
                fontFamily: "sans-serif",
                fontWeight: 700,
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <div style={{ display: "flex", fontSize: 64, fontWeight: 600, lineHeight: 1.15 }}>{title}</div>
          {subtitle ? (
            <div
              style={{
                display: "flex",
                fontSize: 30,
                marginTop: 28,
                color: "rgba(253,253,253,0.78)",
                fontFamily: "sans-serif",
                lineHeight: 1.4,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "rgba(253,253,253,0.55)", fontFamily: "sans-serif" }}>
          Real World · Real Learning · Real Impact
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: frauncesBold ? [{ name: "Fraunces", data: frauncesBold, style: "normal", weight: 600 }] : undefined,
    },
  );
}
