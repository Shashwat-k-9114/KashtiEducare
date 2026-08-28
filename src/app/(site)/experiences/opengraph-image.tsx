import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "The Kashti Experience Model";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgImage({
    eyebrow: "Experiences",
    title: "The Kashti Experience Model",
    subtitle: "From exposure to capability to clarity — a journey that transforms.",
  });
}
