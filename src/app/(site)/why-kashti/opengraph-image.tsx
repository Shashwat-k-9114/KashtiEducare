import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { statsSummary } from "@/lib/seo";

export const alt = "Why Kashti Educare";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgImage({
    eyebrow: "Why Kashti",
    title: "Preparing Learners for the World Beyond the Classroom",
    subtitle: statsSummary(),
  });
}
