import { ArrowRight } from "lucide-react";

import { connectIconMap } from "./icons";
import { Reveal, StaggerGrid, StaggerItem } from "@/components/motion";
import { bearingHeading, directions } from "@/data/connect";

/**
 * Station 2 — choose a direction. Not five equal cards: on phones a
 * column of headings you steer toward, on desktop five positions plotted
 * along a course. Each steers to the closest real Kashti destination.
 */
export function Bearing() {
  return (
    <div>
      <Reveal>
        <h2 className="font-display max-w-[18ch] text-[25px] leading-[1.12] font-semibold text-kashti-charcoal sm:text-[32px] lg:text-[40px]">
          {bearingHeading}
        </h2>
      </Reveal>
      <Reveal delay={0.06}>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-kashti-charcoal/60">
          Pick the heading that fits your school right now — each one opens the part of Kashti built for it.
        </p>
      </Reveal>

      {/* Phone: a column of headings to steer toward. */}
      <StaggerGrid className="mt-9 lg:hidden" stagger={0.05}>
        {directions.map((d) => {
          const Icon = connectIconMap[d.icon];
          return (
            <StaggerItem key={d.label}>
              <a
                href={d.href}
                className="group flex min-h-[68px] items-center gap-4 border-t border-kashti-charcoal/15 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kashti-green focus-visible:ring-offset-2 focus-visible:ring-offset-kashti-bg-tint"
              >
                <span
                  className="font-mono-label w-9 shrink-0 text-[11px] tracking-[0.12em] text-kashti-charcoal/35"
                  aria-hidden="true"
                >
                  {d.bearing}
                </span>
                <Icon size={19} strokeWidth={1.75} className="shrink-0 text-kashti-green-deep" aria-hidden="true" />
                <span className="font-display flex-1 text-[16.5px] leading-tight font-semibold text-kashti-charcoal transition-colors group-hover:text-kashti-green-deep">
                  {d.label}
                </span>
                <span className="inline-flex items-center" aria-hidden="true">
                  <span className="connect-course-line block h-px bg-kashti-green-deep" />
                  <ArrowRight
                    size={15}
                    strokeWidth={2.25}
                    className="text-kashti-charcoal/35 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-kashti-green-deep"
                  />
                </span>
              </a>
            </StaggerItem>
          );
        })}
      </StaggerGrid>

      {/* Desktop: positions plotted along a course. */}
      <Reveal delay={0.1} className="mt-8 hidden lg:block">
        <div className="relative">
          <svg
            className="absolute inset-x-0 top-1/2 h-8 w-full -translate-y-1/2"
            viewBox="0 0 400 40"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 20C40 4 60 36 100 20s60-16 100 0 60 16 100 0 58-16 98 0"
              stroke="var(--kashti-charcoal)"
              strokeOpacity="0.2"
              strokeWidth="1"
            />
          </svg>
          <div className="relative flex justify-between">
            {directions.map((d, i) => {
              const Icon = connectIconMap[d.icon];
              const below = i % 2 === 1;
              return (
                <a
                  key={d.label}
                  href={d.href}
                  className="group relative block h-32 w-[19%] focus-visible:outline-none"
                >
                  <span className="absolute top-1/2 left-1/2 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-kashti-bg-tint ring-1 ring-kashti-charcoal/30 transition group-hover:ring-kashti-green group-focus-visible:ring-2 group-focus-visible:ring-kashti-green">
                    <span className="h-2 w-2 rounded-full bg-kashti-green/35 transition group-hover:bg-kashti-green" />
                  </span>
                  <span
                    className={`absolute left-1/2 w-[170px] -translate-x-1/2 text-center ${
                      below ? "top-1/2 mt-8" : "bottom-1/2 mb-8"
                    }`}
                  >
                    <Icon
                      size={18}
                      strokeWidth={1.75}
                      className="mx-auto mb-2 text-kashti-green-deep/70 transition group-hover:text-kashti-green-deep"
                      aria-hidden="true"
                    />
                    <span className="font-display block text-[15px] leading-tight font-semibold text-kashti-charcoal transition-colors group-hover:text-kashti-green-deep">
                      {d.label}
                    </span>
                    <span className="font-mono-label mt-1.5 block text-[10px] tracking-[0.14em] text-kashti-charcoal/35" aria-hidden="true">
                      {d.bearing}
                    </span>
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
