import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion";
import { exploreLinks, sightings, sightingsCta, sightingsHeading } from "@/data/connect";
import { InstagramStrip } from "./InstagramStrip";
import { CourseLink } from "./parts";

/**
 * Station 4 — sightings. A trail of real programme photography that runs
 * off the edge of the screen; scroll it sideways like a ship's log of
 * places visited. Native horizontal scroll, no JS.
 */
export function Sightings() {
  return (
    <div>
      <Reveal>
        <h2 className="font-display max-w-[16ch] text-[25px] leading-[1.12] font-semibold text-kashti-charcoal sm:text-[32px] lg:text-[40px]">
          {sightingsHeading}
        </h2>
      </Reveal>
      <Reveal delay={0.06}>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-kashti-charcoal/60">
          Real photographs — programmes, expeditions and institution visits, as they happened.
        </p>
      </Reveal>

      <div
        className="mt-9 -mr-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:-mr-8 lg:mr-0 lg:gap-6"
        style={{ scrollbarWidth: "thin" }}
      >
        {sightings.map((s, i) => (
          <figure key={s.photo.src} className="shrink-0 snap-start">
            <div className="relative aspect-[3/4] w-[68vw] overflow-hidden rounded-sm border border-kashti-charcoal/10 bg-kashti-bg-light sm:w-[288px] lg:w-[332px]">
              <Image
                src={s.photo.src}
                alt={s.photo.alt}
                width={s.photo.width}
                height={s.photo.height}
                sizes="(min-width: 1024px) 332px, (min-width: 640px) 288px, 68vw"
                loading={i < 2 ? "eager" : "lazy"}
                className="h-full w-full object-cover"
              />
              <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" aria-hidden="true" />
            </div>
            <figcaption className="font-mono-label mt-3 max-w-[68vw] text-[10px] leading-relaxed tracking-[0.14em] text-kashti-charcoal/45 uppercase sm:max-w-[288px] lg:max-w-[332px]">
              {s.caption}
            </figcaption>
          </figure>
        ))}
        <div className="flex w-[56vw] shrink-0 snap-start items-center sm:w-[200px]">
          <CourseLink href={sightingsCta.href} label={sightingsCta.label} external={sightingsCta.external} />
        </div>
      </div>

      <Reveal delay={0.08} className="mt-9 flex flex-wrap gap-x-7 gap-y-2">
        {exploreLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="font-mono-label rounded-sm text-[10px] tracking-[0.2em] text-kashti-charcoal/45 uppercase transition-colors hover:text-kashti-green-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kashti-green focus-visible:ring-offset-2 focus-visible:ring-offset-kashti-bg-tint"
          >
            {l.label}
          </Link>
        ))}
      </Reveal>

      <Reveal delay={0.1}>
        <InstagramStrip />
      </Reveal>
    </div>
  );
}
