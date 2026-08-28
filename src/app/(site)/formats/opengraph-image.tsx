import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Kashti Program Formats";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgImage({
    eyebrow: "Formats",
    title: "Program Formats",
    subtitle: "Flexible by design — from a single session to a year-long journey.",
  });
}
