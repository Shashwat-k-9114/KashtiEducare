import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Kashti's Learning Ecosystem";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgImage({
    eyebrow: "Institutions",
    title: "Our Learning Ecosystem",
    subtitle: "Learning happens everywhere — across industries, academia, and communities.",
  });
}
