import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF preferred where supported (smaller), WebP as the fallback —
    // the default is WebP-only. Matters most for the full-bleed hero
    // carousel images, which are the largest assets on the homepage.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
