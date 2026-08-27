import { higherEdCategories, portfolioCategories } from "@/data/programs";
import { absoluteUrl, siteConfig, statsSummary } from "@/lib/seo";

/**
 * llms.txt — a plain-text summary aimed at LLM-based tools (emerging
 * convention, similar intent to robots.txt but read by machines, not
 * browsed by people). Generated from the same data sources as the rest of
 * the site so it can't drift out of sync with what's actually live.
 */
export async function GET() {
  const lines: string[] = [];

  lines.push(`# ${siteConfig.name}`);
  lines.push("");
  lines.push(siteConfig.description);
  lines.push("");
  lines.push(`${statsSummary()}.`);
  lines.push("");

  lines.push("## Portfolio categories (cross-cutting, audience-agnostic)");
  for (const category of portfolioCategories) {
    lines.push(`- ${category.title}: ${category.description} ${absoluteUrl(`/programs/${category.slug}`)}`);
  }
  lines.push("");

  lines.push("## Higher Education Programs (7 categories)");
  lines.push(`Hub: ${absoluteUrl("/programs/higher-education")}`);
  for (const category of higherEdCategories) {
    lines.push(`- ${category.title}: ${category.description} ${absoluteUrl(`/programs/higher-education/${category.slug}`)}`);
  }
  lines.push("");

  lines.push("## School Programs");
  lines.push(`Flat roster of 12 programmes for school-age learners: ${absoluteUrl("/programs/school")}`);
  lines.push("");

  lines.push("## Other pages");
  lines.push(`- Why Kashti: ${absoluteUrl("/why-kashti")}`);
  lines.push(`- About: ${absoluteUrl("/about")}`);
  lines.push(`- Experiences (pedagogy model): ${absoluteUrl("/experiences")}`);
  lines.push(`- Formats (engagement lengths): ${absoluteUrl("/formats")}`);
  lines.push(`- Institutions (learning ecosystem & council): ${absoluteUrl("/institutions")}`);
  lines.push(`- Partners: ${absoluteUrl("/partners")}`);
  lines.push(`- Contact: ${absoluteUrl("/contact")}`);
  lines.push(`- Full Programs directory: ${absoluteUrl("/programs")}`);
  lines.push(`- Sitemap: ${absoluteUrl("/sitemap.xml")}`);

  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
