import type { MetadataRoute } from "next";

const PAGES = ["", "why-kashti", "people", "programs", "experiences", "formats", "institutions", "partners", "gallery", "read", "contact", "connect"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((p) => ({ url: `https://kashtieducare.com/${p}` }));
}
