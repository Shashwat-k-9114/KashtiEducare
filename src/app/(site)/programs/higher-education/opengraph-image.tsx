import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Higher Education Programs | Kashti Educare";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgImage({
    eyebrow: "Higher Education Programs",
    title: "Built for Campus Life, End to End",
    subtitle: "Seven categories covering the full Higher Education portfolio.",
  });
}
