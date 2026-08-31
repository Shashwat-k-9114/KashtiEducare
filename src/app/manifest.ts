import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/seo";

/**
 * Web app manifest. Next auto-links this at /manifest.webmanifest and wires
 * it into <head>. Icons reference the real square brand mark already in
 * /public — no new assets are introduced. Colours match globals.css
 * (--kashti-bg-light / --kashti-green).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fdfdfd",
    theme_color: "#128b62",
    icons: [
      {
        src: "/logo.jpeg",
        sizes: "1000x1000",
        type: "image/jpeg",
        purpose: "any",
      },
    ],
  };
}
