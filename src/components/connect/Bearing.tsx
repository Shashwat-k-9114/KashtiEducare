import { ArrowRight } from "lucide-react";

import { connectIconMap } from "./icons";
import { Reveal, StaggerGrid, StaggerItem } from "@/components/motion";
import { bearingHeading, directions } from "@/data/connect";

/**
 * Station 2 — choose a direction. Not five equal cards: on phones a
 * column of headings you steer toward, on desktop five positions plotted
 * along one course. Each steers to the closest real Kashti destination.
 */
export function Bearing() {
  return (
    <div>
      <Reveal>
        <h2 className="font-display max-w-[17ch] text-[25px] leading-[1.12] font-semibold text-kashti-charcoal sm:text-[32px] lg:text-[37px]">
          {bearingHeading}
        </h2>
      </Reveal>
      <Reveal delay={0.06}>
        <p className="mt-3.5 max-w-lg text-sm leading-relaxed text-kashti-charcoal/60">
          Pick the heading that fits your school right now — each one opens the part of Kashti built for it.
        </p>
      </Reveal>

      {/* Phone: a column of headings to steer toward. */}
      <StaggerGrid className="mt-8 lg:hidden" stagger={0.05}>
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

      {/* Desktop: five positions plotted along one course. A deterministic
          5-column grid — bearing, node, icon, label stacked the same way in
          every column — so nothing drifts; the wave sits exactly on the
          node row, entering from the left edge and continuing off the right. */}
      <Reveal delay={0.1} className="mt-10 hidden lg:block">
        <div className="relative">
          <svg
            className="absolute inset-x-0 top-[32px] h-5 w-full -translate-y-1/2"
            viewBox="0 0 1000 24"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M0 12C110 3 170 21 280 12s170-14 280 0 170 12 280 0 150-12 260 -2"
              stroke="var(--kashti-charcoal)"
              strokeOpacity="0.22"
              strokeWidth="1"
            />
          </svg>
          {/* origin — the route departs from the main rail */}
          <span
            className="absolute top-[32px] left-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-kashti-charcoal/35"
            aria-hidden="true"
          />
          {/* terminus — the course carries on */}
          <svg
            className="absolute top-[32px] right-0 h-2.5 w-2.5 -translate-y-1/2 translate-x-1.5 text-kashti-charcoal/35"
            viewBox="0 0 10 10"
            fill="none"
            aria-hidden="true"
          >
            <path d="M2 2l4 3-4 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <div className="grid grid-cols-5">
            {directions.map((d) => {
              const Icon = connectIconMap[d.icon];
              return (
                <a
                  key={d.label}
                  href={d.href}
                  className="group flex flex-col items-center px-2 text-center focus-visible:outline-none"
                >
                  <span
                    className="font-mono-label text-[10px] tracking-[0.14em] text-kashti-charcoal/35"
                    aria-hidden="true"
                  >
                    {d.bearing}
                  </span>
                  <span className="mt-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-kashti-bg-tint ring-1 ring-kashti-charcoal/30 transition group-hover:ring-kashti-green group-focus-visible:ring-2 group-focus-visible:ring-kashti-green">
                    <span className="h-1.5 w-1.5 rounded-full bg-kashti-green/40 transition group-hover:bg-kashti-green" />
                  </span>
                  <Icon
                    size={17}
                    strokeWidth={1.75}
                    className="mt-4 text-kashti-green-deep/70 transition group-hover:text-kashti-green-deep"
                    aria-hidden="true"
                  />
                  <span className="font-display mt-2 flex min-h-[2.6em] max-w-[150px] items-start justify-center text-[14px] leading-[1.2] font-semibold text-kashti-charcoal transition-colors group-hover:text-kashti-green-deep">
                    {d.label}
                  </span>
                  <span className="mt-1 inline-flex items-center" aria-hidden="true">
                    <span className="connect-course-line block h-px bg-kashti-green-deep" />
                    <ArrowRight
                      size={13}
                      strokeWidth={2.5}
                      className="text-kashti-charcoal/30 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-kashti-green-deep"
                    />
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
