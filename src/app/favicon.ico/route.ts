// Same K-mark as the inline <link rel="icon"> in the original pages, also served at /favicon.ico
// so browsers that request it by default don't hit a 404.
const SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0B2A66"/><text x="32" y="44" text-anchor="middle" font-family="Arial" font-weight="800" font-size="34" fill="#38D1C2">K</text><circle cx="47" cy="14" r="6" fill="#F4B321"/></svg>`;

export const dynamic = "force-static";

export function GET() {
  return new Response(SVG, {
    headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=86400" },
  });
}
