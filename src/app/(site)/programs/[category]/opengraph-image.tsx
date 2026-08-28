import { getPortfolioCategoryBySlug, portfolioCategories } from "@/data/programs";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Kashti Educare Portfolio category";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return portfolioCategories.map((category) => ({ category: category.slug }));
}

export default async function Image({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = getPortfolioCategoryBySlug(slug);
  return renderOgImage({
    eyebrow: "The Portfolio",
    title: category?.title ?? "Kashti Educare",
    subtitle: category?.hook,
  });
}
