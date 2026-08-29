import type { CSSProperties, ReactNode } from "react";

import type { Station } from "@/data/connect";

/**
 * "The Charted Voyage" — one continuous plotted route runs down the page.
 * Each stage of the visitor's journey is a waypoint on it. The route is a
 * dashed hairline (charcoal, like a course laid on a chart); a solid
 * green segment below each waypoint marks the leg already travelled.
 * Entirely static CSS — no scroll listeners, safe under reduced motion,
 * and correct with JS disabled.
 */

const dashed =
  "repeating-linear-gradient(to bottom, color-mix(in srgb, var(--kashti-charcoal) 34%, transparent) 0 3px, transparent 3px 10px)";

function StageRail({ first, last }: { first?: boolean; last?: boolean }) {
  const topClass = first ? "top-10 lg:top-16" : "top-0";
  const mask: CSSProperties | undefined = last
    ? {
        WebkitMaskImage: "linear-gradient(to bottom, black 38%, transparent 94%)",
        maskImage: "linear-gradient(to bottom, black 38%, transparent 94%)",
      }
    : undefined;

  return (
    <div className="pointer-events-none absolute inset-0 flex justify-center" aria-hidden="true">
      <div className="relative h-full w-px">
        {/* the charted course */}
        <div className={`absolute inset-x-0 bottom-0 ${topClass}`} style={{ backgroundImage: dashed, ...mask }} />
        {/* leg already travelled: a solid green run just past the waypoint */}
        <div
          className={`absolute inset-x-0 h-20 ${first ? "top-10 lg:top-16" : "top-0"} bg-gradient-to-b from-kashti-green via-kashti-green-soft to-transparent`}
        />
        {/* the waypoint */}
        <span
          className={`absolute left-1/2 ${topClass} h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-kashti-green ring-4 ring-kashti-bg-tint`}
        />
      </div>
    </div>
  );
}

export function Stage({
  station,
  first,
  last,
  children,
}: {
  station: Station;
  first?: boolean;
  last?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      aria-label={`${station.name} — ${station.note}`}
      className="grid grid-cols-[24px_minmax(0,1fr)] gap-x-4 sm:grid-cols-[32px_minmax(0,1fr)] sm:gap-x-6 lg:grid-cols-[128px_28px_minmax(0,1fr)] lg:gap-x-6"
    >
      <div className={`hidden text-right lg:block ${first ? "lg:pt-16" : "lg:pt-3"}`}>
        <p className="font-display text-[15px] leading-tight font-semibold text-kashti-charcoal/80">{station.name}</p>
        <p className="font-mono-label mt-1 text-[10px] tracking-[0.18em] text-kashti-charcoal/40 uppercase">
          {station.note}
        </p>
      </div>

      <div className="relative">
        <StageRail first={first} last={last} />
      </div>

      <div className={`min-w-0 pb-14 lg:pb-16 ${first ? "pt-10 lg:pt-16" : "pt-2 lg:pt-3"}`}>
        <p className="font-mono-label mb-6 text-[10px] tracking-[0.24em] text-kashti-charcoal/40 uppercase lg:hidden">
          <span className="text-kashti-green-deep">{station.name}</span> — {station.note}
        </p>
        {children}
      </div>
    </section>
  );
}

/** Concentric harbour buoy — the route's terminus in the dark closing panel. */
export function Buoy() {
  return (
    <span className="relative flex h-3 w-3 items-center justify-center" aria-hidden="true">
      <span className="connect-buoy-ring absolute inset-0 rounded-full ring-1 ring-kashti-gold/70" />
      <span className="connect-buoy-ring connect-buoy-ring-2 absolute inset-0 rounded-full ring-1 ring-kashti-gold/70" />
      <span className="h-2 w-2 rounded-full bg-kashti-gold" />
    </span>
  );
}
