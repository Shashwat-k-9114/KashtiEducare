import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Kashti Educare Programs";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgImage({
    eyebrow: "The Portfolio",
    title: "Programs Built Around Every Learner",
    subtitle: "Eight ways into the same real-world experience layer.",
  });
}
