import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { galleryPhotos } from "@/data/media";
import { Reveal, StaggerGrid, StaggerItem } from "./motion";

const teaserPhotos = galleryPhotos.slice(0, 8);

export function GalleryTeaser() {
  return (
    <section className="bg-kashti-bg-light px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <Reveal>
              <h2 className="font-display text-3xl font-semibold text-kashti-charcoal sm:text-4xl">
                From the <span className="text-kashti-gold-deep">Field</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-3 text-kashti-charcoal/60">Real moments from Kashti programmes and expeditions.</p>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <Link
              href="/gallery"
              className="group font-mono-label inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold tracking-wide text-kashti-green-deep uppercase"
            >
              View Full Gallery
              <ArrowRight size={14} strokeWidth={2.25} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <StaggerGrid className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4" stagger={0.06}>
          {teaserPhotos.map((photo) => (
            <StaggerItem key={photo.src}>
              <Link
                href="/gallery"
                className="block aspect-square overflow-hidden rounded-xl border bg-kashti-bg-tint"
                style={{ borderColor: "var(--kashti-border-light)" }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </Link>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
