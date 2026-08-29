import Image from "next/image";

import { PrimaryAction } from "./parts";
import { hero, wordmark } from "@/data/connect";

/**
 * Station 1 — the visiting card "opens". Branding enters, a wake begins,
 * the headline and the two primary actions settle in. The entry sequence
 * is pure CSS (`connect-enter*` / `connect-wake-draw` in globals.css) so
 * the first screen animates with no JS and degrades to fully visible.
 */
export function Departure() {
  return (
    <div className="lg:grid lg:grid-cols-[1.55fr_1fr] lg:items-center lg:gap-12">
      <div>
        <div className="connect-enter connect-enter-1 flex items-center gap-3">
          <Image
            src="/logo.jpeg"
            alt="Kashti Educare"
            width={44}
            height={44}
            priority
            className="h-10 w-10 rounded-xl object-cover shadow-[0_6px_20px_-8px_rgba(69,69,69,0.4)]"
          />
          <span className="font-display text-lg font-semibold text-kashti-charcoal">
            {wordmark.primary}
            <span className="text-kashti-gold-deep">.</span>{" "}
            <span className="font-normal text-kashti-charcoal/50">{wordmark.secondary}</span>
          </span>
        </div>

        <div className="connect-enter connect-enter-2 mt-8 flex items-center gap-3">
          <svg width="26" height="8" viewBox="0 0 26 8" fill="none" aria-hidden="true" className="shrink-0">
            <path
              className="connect-wake-draw"
              pathLength={1}
              d="M1 4c5-4 8 4 12 0s8-4 12 0"
              stroke="var(--kashti-green-deep)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <p className="font-mono-label text-[11px] tracking-[0.3em] text-kashti-green-deep uppercase">{hero.eyebrow}</p>
        </div>

        <h1 className="connect-enter connect-enter-3 font-display mt-4 max-w-[13ch] text-[33px] leading-[1.08] font-semibold text-kashti-charcoal sm:max-w-[16ch] sm:text-[46px] lg:max-w-[19ch] lg:text-[54px]">
          {hero.heading}
        </h1>

        <p className="connect-enter connect-enter-4 mt-5 max-w-md text-sm leading-relaxed text-kashti-charcoal/65">
          Kashti Educare ·{" "}
          <span className="text-kashti-charcoal/80">
            Experiences that expand{" "}
            <em className="font-display text-kashti-charcoal not-italic">Exposure, Perspective &amp; Resilience</em>
          </span>
        </p>

        <div className="connect-enter connect-enter-5 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {hero.actions.map((action) => (
            <PrimaryAction
              key={action.label}
              href={action.href}
              label={action.label}
              tone={action.tone === "primary" ? "solid" : "outline"}
              external={action.external}
              full
            />
          ))}
        </div>
      </div>

      {/* Desktop: an abstract plotted position — the point the voyage sets out from. */}
      <div className="connect-enter connect-enter-4 mt-14 hidden justify-self-end lg:block">
        <svg width="240" height="240" viewBox="0 0 240 240" fill="none" aria-hidden="true" className="opacity-70">
          <circle cx="120" cy="120" r="92" stroke="var(--kashti-charcoal)" strokeOpacity="0.14" />
          <circle cx="120" cy="120" r="58" stroke="var(--kashti-charcoal)" strokeOpacity="0.14" />
          <circle cx="120" cy="120" r="24" stroke="var(--kashti-green)" strokeOpacity="0.5" />
          <path d="M120 6v40M120 194v40M6 120h40M194 120h40" stroke="var(--kashti-charcoal)" strokeOpacity="0.2" />
          <path
            d="M40 150c30-18 46 14 70-4s40-30 74-10"
            stroke="var(--kashti-green-deep)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="1 7"
          />
          <circle cx="120" cy="120" r="4" fill="var(--kashti-gold)" />
        </svg>
      </div>
    </div>
  );
}
