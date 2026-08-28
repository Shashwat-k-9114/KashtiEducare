import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "School Programs | Kashti Educare";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgImage({
    eyebrow: "School Programs",
    title: "Real-World Learning for School Students",
    subtitle: "Twelve programmes spanning discipline, adventure, career exposure and global immersion.",
  });
}
