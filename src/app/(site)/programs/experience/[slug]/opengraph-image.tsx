import { getProgrammeBySlug, programmes } from "@/data/programs";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Kashti Educare programme";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return programmes.map((programme) => ({ slug: programme.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const programme = getProgrammeBySlug(slug);
  return renderOgImage({
    eyebrow: programme ? (programme.audience === "school" ? "School Programs" : "Higher Education Programs") : undefined,
    title: programme?.title ?? "Kashti Educare",
    subtitle: programme?.description,
  });
}
