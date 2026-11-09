const PAGES = ["why-kashti", "people", "programs", "experiences", "formats", "gallery", "read", "institutions", "partners", "contact"];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The page enhancer (src/legacy/engine.js) is imperative DOM code. It cleans up on route changes,
  // but StrictMode's dev-only double mount would initialise it twice, so StrictMode is off.
  reactStrictMode: false,
  poweredByHeader: false,
  async redirects() {
    // Keep every old *.html URL (links, bookmarks, search results) working. Query strings are preserved.
    return [
      { source: "/index.html", destination: "/", permanent: true },
      ...PAGES.map((p) => ({ source: `/${p}.html`, destination: `/${p}`, permanent: true })),
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
