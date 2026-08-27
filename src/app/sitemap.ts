import type { MetadataRoute } from "next";

import { higherEdCategories, portfolioCategories, programmes } from "@/data/programs";
import { absoluteUrl } from "@/lib/seo";

/**
 * Generated entirely from the live data sources in src/data/ — every
 * category and programme page is included automatically and stays in sync
 * as programmes are added or removed. Nothing here is a hand-maintained
 * list.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/programs"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/programs/school"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/programs/higher-education"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/why-kashti"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/experiences"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/formats"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/institutions"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/partners"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/gallery"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];

  const portfolioCategoryPages: MetadataRoute.Sitemap = portfolioCategories.map((category) => ({
    url: absoluteUrl(`/programs/${category.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const higherEdCategoryPages: MetadataRoute.Sitemap = higherEdCategories.map((category) => ({
    url: absoluteUrl(`/programs/higher-education/${category.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const programmePages: MetadataRoute.Sitemap = programmes.map((programme) => ({
    url: absoluteUrl(`/programs/experience/${programme.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...portfolioCategoryPages, ...higherEdCategoryPages, ...programmePages];
}
