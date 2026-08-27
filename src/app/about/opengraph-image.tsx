import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "About Kashti Educare";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgImage({
    eyebrow: "About",
    title: "About Kashti Educare",
    subtitle: "Building the experience layer between education and the real world.",
  });
}
