"use client";

import Image from "next/image";
import { useState } from "react";

import { galleryPhotos } from "@/data/media";
import { Lightbox } from "./Lightbox";
import { StaggerGrid, StaggerItem } from "./motion";

/**
 * CSS-columns masonry (no JS layout library): each photo keeps its real
 * aspect ratio via next/image's width/height, so columns settle into a
 * natural Pinterest-style layout with zero measurement code.
 */
export function GalleryGrid() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <StaggerGrid className="columns-1 gap-4 sm:columns-2 lg:columns-3" stagger={0.04}>
        {galleryPhotos.map((photo, index) => (
          <StaggerItem key={photo.src} className="mb-4 break-inside-avoid">
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group block w-full overflow-hidden rounded-xl border bg-kashti-bg-tint focus:outline-none focus-visible:ring-2 focus-visible:ring-kashti-green"
              style={{ borderColor: "var(--kashti-border-light)" }}
              aria-label={`Open photo: ${photo.alt}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading={index < 6 ? "eager" : "lazy"}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="w-full transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </button>
          </StaggerItem>
        ))}
      </StaggerGrid>

      {openIndex !== null ? (
        <Lightbox photos={galleryPhotos} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
      ) : null}
    </>
  );
}
