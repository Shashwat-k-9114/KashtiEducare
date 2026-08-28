import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Partner With Kashti Educare";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgImage({
    eyebrow: "Partners",
    title: "Partner With Kashti",
    subtitle: "Industries, universities, government bodies and communities that open their doors to learners.",
  });
}
