import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Kashti Educare — Preparing Learners for the World Beyond the Classroom";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgImage({
    title: "Preparing Learners for the World Beyond the Classroom",
    subtitle: "Real-world experiences connecting learners with industries, institutions and ideas.",
  });
}
