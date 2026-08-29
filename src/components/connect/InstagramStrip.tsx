import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { instagram } from "@/data/connect";
import { InstagramGlyph } from "./icons";
import { CourseLink } from "./parts";

/**
 * A curated three-post Instagram highlight — lightweight local preview
 * cards (no embed scripts, no iframes, no hotlinked CDN images) that link
 * straight to the real post. The cover area uses the page's own chart
 * motifs so it stays part of the voyage rather than a bolt-on feed.
 */
export function InstagramStrip() {
  return (
    <div className="mt-14">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div>
          <h3 className="font-display text-[19px] leading-tight font-semibold text-kashti-charcoal sm:text-[22px]">
            {instagram.heading}
          </h3>
          <p className="mt-2 max-w-md text-[13px] leading-relaxed text-kashti-charcoal/60">{instagram.intro}</p>
        </div>
        <CourseLink
          href={instagram.profileCta.href}
          label={instagram.profileCta.label}
          external={instagram.profileCta.external}
        />
      </div>

      <div className="mt-6 -mr-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 sm:mr-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:pb-0">
        {instagram.posts.map((post, i) => (
          <a
            key={post.id}
            href={post.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open Kashti Educare's Instagram post ${post.id} in a new tab`}
            className="group block w-[72vw] shrink-0 snap-start overflow-hidden rounded-sm border border-kashti-charcoal/12 bg-kashti-bg-light transition-colors hover:border-kashti-green/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kashti-green focus-visible:ring-offset-2 focus-visible:ring-offset-kashti-bg-tint sm:w-auto"
          >
            <div className="flex items-center gap-2.5 border-b border-kashti-charcoal/10 px-3.5 py-2.5">
              <Image
                src="/logo.jpeg"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6 rounded-full object-cover"
              />
              <span className="font-display text-[12.5px] font-semibold text-kashti-charcoal">{instagram.handle}</span>
              <InstagramGlyph
                size={15}
                className="ml-auto text-kashti-charcoal/40 transition-colors group-hover:text-kashti-green-deep"
              />
            </div>

            {post.image ? (
              <div className="relative aspect-square">
                <Image
                  src={post.image.src}
                  alt={post.image.alt}
                  width={post.image.width}
                  height={post.image.height}
                  sizes="(min-width: 640px) 32vw, 72vw"
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="relative aspect-square bg-kashti-bg-tint">
                <PostMotif variant={i} />
                <span className="font-mono-label absolute right-3 bottom-2 text-[8px] tracking-[0.16em] text-kashti-charcoal/35">
                  {post.id}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between px-3.5 py-3">
              <span className="font-mono-label text-[9px] tracking-[0.24em] text-kashti-charcoal/40 uppercase">
                Instagram
              </span>
              <span className="inline-flex items-center gap-1.5" aria-hidden="true">
                <span className="font-mono-label text-[9px] tracking-[0.2em] text-kashti-green-deep uppercase">
                  View post
                </span>
                <span className="connect-course-line block h-px bg-kashti-green-deep" />
                <ArrowUpRight
                  size={12}
                  strokeWidth={2.25}
                  className="text-kashti-green-deep transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

/** Three distinct chart motifs so the cards don't read as identical tiles. */
function PostMotif({ variant }: { variant: number }) {
  if (variant === 1) {
    return (
      <svg viewBox="0 0 200 200" fill="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {[54, 84, 114, 144].map((y, k) => (
          <path
            key={y}
            d={`M-4 ${y}c30-18 46 14 70-2s44-20 70-4 26 2 40 -6`}
            stroke="var(--kashti-green-deep)"
            strokeOpacity={0.5 - k * 0.1}
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        ))}
      </svg>
    );
  }
  if (variant === 2) {
    return (
      <svg viewBox="0 0 200 200" fill="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M40 0v200M100 0v200M160 0v200M0 60h200M0 120h200" stroke="var(--kashti-charcoal)" strokeOpacity="0.1" />
        <path d="M100 40v40M80 60h40" stroke="var(--kashti-green-deep)" strokeOpacity="0.55" strokeWidth="1.3" />
        <circle cx="100" cy="60" r="4" fill="var(--kashti-gold)" />
        <path
          d="M24 150c28-16 44 10 66-4s40-22 64-8"
          stroke="var(--kashti-green-deep)"
          strokeOpacity="0.45"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray="1 6"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 200" fill="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <circle cx="100" cy="100" r="66" stroke="var(--kashti-charcoal)" strokeOpacity="0.12" />
      <circle cx="100" cy="100" r="40" stroke="var(--kashti-charcoal)" strokeOpacity="0.12" />
      <path
        d="M28 118c26-16 40 12 60-4s34-24 62-8"
        stroke="var(--kashti-green-deep)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="100" cy="100" r="3.5" fill="var(--kashti-gold)" />
    </svg>
  );
}
