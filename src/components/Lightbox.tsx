"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

import type { GalleryPhoto } from "@/data/media";

type LightboxProps = {
  photos: GalleryPhoto[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

/**
 * Full-screen lightbox: Escape closes, Left/Right navigate, focus is
 * trapped inside while open and returns to the trigger element on close.
 * Plain conditional mount (no AnimatePresence wrapping the overlay itself)
 * so it never lingers as a click-blocking layer after closing — the same
 * bug pattern hit earlier in this project with other full-screen overlays.
 */
export function Lightbox({ photos, index, onClose, onNavigate }: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerElement = useRef<Element | null>(null);

  const goPrev = useCallback(() => onNavigate((index - 1 + photos.length) % photos.length), [index, photos.length, onNavigate]);
  const goNext = useCallback(() => onNavigate((index + 1) % photos.length), [index, photos.length, onNavigate]);

  useEffect(() => {
    triggerElement.current = document.activeElement;
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      if (triggerElement.current instanceof HTMLElement) triggerElement.current.focus();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        goPrev();
        return;
      }
      if (event.key === "ArrowRight") {
        goNext();
        return;
      }
      if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, goPrev, goNext]);

  const photo = photos[index];

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 px-4 py-8"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X size={20} strokeWidth={2} />
      </button>

      {photos.length > 1 ? (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous photo"
            className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
          >
            <ChevronLeft size={22} strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next photo"
            className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
          >
            <ChevronRight size={22} strokeWidth={2} />
          </button>
        </>
      ) : null}

      <AnimatePresence mode="wait">
        <motion.div
          key={photo.src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="flex max-h-full max-w-4xl flex-col items-center"
        >
          <div className="relative max-h-[75vh] max-w-full">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              className="max-h-[75vh] w-auto rounded-md object-contain"
              sizes="90vw"
              priority
            />
          </div>
          <p className="mt-4 text-center text-sm text-white/70">
            {photo.alt}
            <span className="ml-2 text-white/40">
              ({index + 1} / {photos.length})
            </span>
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
