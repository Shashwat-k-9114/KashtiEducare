"use client";

import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

import { accentDeepVar, accentTint, accentVar } from "@/components/AccentCard";
import { Reveal } from "@/components/motion";
import { iconMap } from "@/components/programs/icon-map";
import { getPortfolioCategoryAudienceLabel, portfolioCategories } from "@/data/programs";

const cardWidth = 340;
const cardGap = 24;

export function ProgramsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollSettleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollByCards = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(portfolioCategories.length - 1, activeIndex + direction));
    setActiveIndex(next);
    // CSS scroll-behavior (see the `scroll-smooth` class on the track) handles the
    // easing; calling scrollTo with behavior:"smooth" here conflicts with
    // scroll-snap-type: mandatory in some browsers and silently no-ops the scroll.
    track.scrollTo({ left: next * (cardWidth + cardGap), behavior: "instant" });
  };

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    setActiveIndex(index);
    track.scrollTo({ left: index * (cardWidth + cardGap), behavior: "instant" });
  };

  // Debounced: only syncs activeIndex once scrolling has settled, so it
  // doesn't fight with the state update a button click already made while
  // the smooth-scroll animation is still mid-flight (e.g. a manual swipe).
  const handleScroll = () => {
    if (scrollSettleTimeout.current) clearTimeout(scrollSettleTimeout.current);
    scrollSettleTimeout.current = setTimeout(() => {
      const track = trackRef.current;
      if (!track) return;
      const index = Math.round(track.scrollLeft / (cardWidth + cardGap));
      setActiveIndex(Math.max(0, Math.min(portfolioCategories.length - 1, index)));
    }, 120);
  };

  return (
    <section className="bg-kashti-bg-tint px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
          <div className="text-center sm:text-left">
            <Reveal>
              <h2 className="font-display text-3xl font-semibold text-kashti-charcoal sm:text-4xl">
                What We <span className="text-kashti-gold-deep">Offer</span>, For Whom
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-3 text-kashti-charcoal/60">Eight ways in — pick a starting point, or browse the full Portfolio.</p>
            </Reveal>
          </div>

          <Reveal delay={0.14} className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous programme"
              onClick={() => scrollByCards(-1)}
              disabled={activeIndex === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-kashti-green text-kashti-green transition-colors hover:bg-kashti-green/5 disabled:opacity-30"
            >
              <ChevronLeft size={18} strokeWidth={2.25} />
            </button>
            <button
              type="button"
              aria-label="Next programme"
              onClick={() => scrollByCards(1)}
              disabled={activeIndex === portfolioCategories.length - 1}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-kashti-green text-kashti-green transition-colors hover:bg-kashti-green/5 disabled:opacity-30"
            >
              <ChevronRight size={18} strokeWidth={2.25} />
            </button>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="mt-10">
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="flex snap-x snap-mandatory scroll-smooth gap-6 overflow-x-auto pb-4"
            style={{ scrollbarWidth: "none" }}
          >
            {portfolioCategories.map((category, index) => {
              const Icon = iconMap[category.icon];
              const audienceLabel = getPortfolioCategoryAudienceLabel(category.slug);
              return (
                <div
                  key={category.slug}
                  className="flex shrink-0 snap-start flex-col rounded-xl border-t border-r border-b border-l-4 bg-kashti-bg-light p-6 shadow-[0_1px_2px_rgba(69,69,69,0.06)]"
                  style={{ width: cardWidth, borderColor: "var(--kashti-border-light)", borderLeftColor: accentVar[category.accent] }}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className="font-display text-4xl font-bold"
                      style={{ color: `color-mix(in srgb, ${accentVar[category.accent]} 35%, transparent)` }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-mono-label rounded-full border px-2.5 py-1 text-[10px] tracking-widest uppercase"
                      style={{ borderColor: `color-mix(in srgb, ${accentVar[category.accent]} 30%, transparent)`, color: accentDeepVar[category.accent] }}
                    >
                      {audienceLabel}
                    </span>
                  </div>

                  <div
                    className="mt-4 flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: accentTint[category.accent] }}
                  >
                    <Icon size={19} strokeWidth={1.75} style={{ color: accentDeepVar[category.accent] }} />
                  </div>

                  <h3 className="font-display mt-4 text-xl font-semibold text-kashti-charcoal">{category.title}</h3>
                  <p className="mt-1.5 text-sm font-medium italic text-kashti-charcoal/60">{category.hook}</p>

                  <ul className="mt-4 flex-1 space-y-2">
                    {category.includes.slice(0, 4).map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-kashti-charcoal/70">
                        <Check size={14} strokeWidth={2.5} className="mt-0.5 shrink-0" style={{ color: accentDeepVar[category.accent] }} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/programs/${category.slug}`}
                    className="mt-6 inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-150 hover:scale-[1.03] active:scale-[0.98]"
                    style={{ backgroundColor: accentDeepVar[category.accent] }}
                  >
                    Explore →
                  </Link>
                </div>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-6 flex items-center justify-center gap-1.5">
          {portfolioCategories.map((category, index) => (
            <button
              key={category.slug}
              type="button"
              aria-label={`Go to ${category.title}`}
              onClick={() => scrollToIndex(index)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: index === activeIndex ? "20px" : "8px",
                backgroundColor: index === activeIndex ? "var(--kashti-green)" : "var(--kashti-border-light)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
