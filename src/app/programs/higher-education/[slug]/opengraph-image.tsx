import { getHigherEdCategoryBySlug, higherEdCategories } from "@/data/programs";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Kashti Educare Higher Education category";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return higherEdCategories.map((category) => ({ slug: category.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getHigherEdCategoryBySlug(slug);
  return renderOgImage({
    eyebrow: category ? `Higher Education · ${category.number}` : "Higher Education",
    title: category?.title ?? "Kashti Educare",
    subtitle: category?.hook,
  });
}
