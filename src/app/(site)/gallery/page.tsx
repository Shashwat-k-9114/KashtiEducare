import type { Metadata } from "next";

import { GalleryGrid } from "@/components/GalleryGrid";
import { PageHeader } from "@/components/programs/PageHeader";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Gallery",
  description: "Photos from Kashti Educare programmes, institution visits and field expeditions.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Moments From the Field"
        description="A look at Kashti programmes, institution visits and expeditions as they actually happened."
        breadcrumbs={[{ label: "Gallery" }]}
      />

      <section className="bg-kashti-bg-light px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
