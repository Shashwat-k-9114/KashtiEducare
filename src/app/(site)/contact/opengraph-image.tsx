import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Contact Kashti Educare";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgImage({
    eyebrow: "Contact",
    title: "Let's Design Your Experience",
    subtitle: "Tell us about your institution — we'll get back with a customised proposal.",
  });
}
