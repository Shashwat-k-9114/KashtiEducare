import Image from "next/image";

import { Reveal, StaggerGrid, StaggerItem } from "@/components/motion";
import { legs, type Leg as LegData, type LegPhoto } from "@/data/connect";
import { MagazineCover } from "./MagazineCover";
import { CourseLink } from "./parts";

/**
 * Station 3 — the passage. Four legs, one system (a mono leg mark, an
 * oversized Fraunces title, one course-line CTA) but no two the same:
 * legs with a theme list open into a two-column "manifest"; Kashti Lens
 * is a magazine feature with a cover; the AR/VR leg carries an editorial
 * collage of real session photography; the rest carry a quiet drawn motif.
 */
export function Passage() {
  return (
    <div className="space-y-14 lg:space-y-20">
      {legs.map((leg, i) => (
        <Leg key={leg.title} leg={leg} index={i} />
      ))}
    </div>
  );
}

function LegMark({ index, brand }: { index: number; brand?: string }) {
  return (
    <p className="font-mono-label text-[11px] tracking-[0.24em] text-kashti-charcoal/40 uppercase">
      Leg {String(index + 1).padStart(2, "0")}
      {brand ? (
        <>
          {" · "}
          <span className="text-kashti-gold-deep">{brand}</span>
        </>
      ) : null}
    </p>
  );
}

function LegHead({ leg, index }: { leg: LegData; index: number }) {
  return (
    <>
      <LegMark index={index} brand={leg.brand} />
      <h3 className="font-display mt-3 text-[28px] leading-[1.08] font-semibold text-kashti-charcoal sm:text-[36px] lg:text-[44px]">
        {leg.title}
      </h3>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-kashti-charcoal/70">{leg.copy}</p>
      <div className="mt-7">
        {leg.cta ? (
          <CourseLink href={leg.cta.href} label={leg.cta.label} external={leg.cta.external} />
        ) : (
          <p className="font-mono-label inline-flex items-center gap-2.5 text-[11px] tracking-[0.2em] text-kashti-charcoal/40 uppercase">
            <span className="h-px w-6 bg-kashti-charcoal/25" aria-hidden="true" />
            {leg.note}
          </p>
        )}
      </div>
    </>
  );
}

function OrbitMotif() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" aria-hidden="true" className="w-32 lg:w-40">
      <circle cx="100" cy="100" r="78" stroke="var(--kashti-charcoal)" strokeOpacity="0.12" />
      <circle cx="100" cy="100" r="48" stroke="var(--kashti-charcoal)" strokeOpacity="0.12" />
      <path
        d="M22 118c26-16 40 12 60-4s34-26 62-8"
        stroke="var(--kashti-green-deep)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeDasharray="1 7"
      />
      <circle cx="100" cy="100" r="3.5" fill="var(--kashti-gold)" />
      <circle cx="178" cy="100" r="2.5" fill="var(--kashti-green)" />
    </svg>
  );
}

/**
 * One frame of the AR/VR collage. Same treatment as the Sightings
 * photography — hairline border, near-white base, faint inset ring, a
 * sharp `rounded-sm` — inside a fixed-ratio box so nothing shifts as it
 * loads. `object-position` is tuned per frame so headsets, faces and
 * controllers survive the crop.
 */
function CollageFrame({
  photo,
  ratio,
  position,
  sizes,
  className = "",
}: {
  photo: LegPhoto;
  ratio: string;
  position: string;
  sizes: string;
  className?: string;
}) {
  return (
    <StaggerItem className={className}>
      <div
        className={`relative ${ratio} overflow-hidden rounded-sm border border-kashti-charcoal/10 bg-kashti-bg-light`}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes={sizes}
          loading="lazy"
          className="h-full w-full object-cover"
          style={{ objectPosition: position }}
        />
        <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" aria-hidden="true" />
      </div>
    </StaggerItem>
  );
}

/**
 * The AR/VR proof panel — takes the place of the drawn orbit motif on this
 * leg only. Four real session photographs in an asymmetric editorial grid:
 * a dominant frame, a paired middle row, then a wide closing band. Reads
 * as one figure with a single quiet caption, and collapses to the same
 * shape (stacked, full-width) beneath the copy on tablet and mobile.
 */
function ImmersiveCollage({ photos, caption }: { photos: LegPhoto[]; caption?: string }) {
  const [hero, left, right, band] = photos;
  const wide = "(min-width: 1024px) 26vw, (min-width: 640px) 60vw, 92vw";
  const half = "(min-width: 1024px) 13vw, (min-width: 640px) 30vw, 45vw";

  return (
    <figure className="mt-9 lg:mt-0">
      <StaggerGrid className="grid grid-cols-2 gap-3 sm:gap-4" stagger={0.08} delayChildren={0.04}>
        <CollageFrame photo={hero} ratio="aspect-[16/10]" position="50% 28%" sizes={wide} className="col-span-2" />
        <CollageFrame photo={left} ratio="aspect-square" position="48% 38%" sizes={half} />
        <CollageFrame photo={right} ratio="aspect-square" position="50% 45%" sizes={half} />
        <CollageFrame photo={band} ratio="aspect-[16/9]" position="50% 62%" sizes={wide} className="col-span-2" />
      </StaggerGrid>
      {caption ? (
        <figcaption className="font-mono-label mt-4 text-[10px] tracking-[0.14em] text-kashti-charcoal/45 uppercase">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function Leg({ leg, index }: { leg: LegData; index: number }) {
  if (leg.gallery) {
    return (
      <Reveal>
        <article className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-10">
          <div>
            <LegHead leg={leg} index={index} />
          </div>
          <ImmersiveCollage photos={leg.gallery} caption={leg.galleryCaption} />
        </article>
      </Reveal>
    );
  }

  if (leg.magazine) {
    const { magazine } = leg;
    const canRead = magazine.status === "available" && magazine.href;
    return (
      <Reveal>
        <article className="lg:grid lg:grid-cols-[246px_minmax(0,1fr)] lg:items-center lg:gap-14">
          <div className="mx-auto w-[224px] max-w-full sm:w-[246px]">
            <MagazineCover magazine={magazine} />
          </div>
          <div className="mt-8 lg:mt-0">
            <LegMark index={index} brand={leg.brand} />
            <h3 className="font-display mt-3 text-[28px] leading-[1.08] font-semibold text-kashti-charcoal sm:text-[36px] lg:text-[44px]">
              {leg.title}
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-kashti-charcoal/70">{leg.copy}</p>
            {magazine.issueLabel ? (
              <p className="font-mono-label mt-4 text-[11px] tracking-[0.2em] text-kashti-charcoal/45 uppercase">
                {magazine.issueLabel}
              </p>
            ) : null}
            <div className="mt-6">
              {canRead ? (
                <CourseLink
                  href={magazine.href as string}
                  label="Read the Issue"
                  external={/^https?:\/\//.test(magazine.href as string)}
                />
              ) : (
                <p className="font-mono-label inline-flex items-center gap-2.5 text-[11px] tracking-[0.2em] text-kashti-charcoal/40 uppercase">
                  <span className="h-px w-6 bg-kashti-charcoal/25" aria-hidden="true" />
                  {magazine.placeholderNote}
                </p>
              )}
            </div>
          </div>
        </article>
      </Reveal>
    );
  }

  if (leg.themes) {
    return (
      <Reveal>
        <article className="lg:grid lg:grid-cols-[1fr_0.68fr] lg:items-center lg:gap-14">
          <div>
            <LegHead leg={leg} index={index} />
          </div>
          <ul className="mt-8 border-t border-kashti-charcoal/15 lg:mt-2 lg:border-t-0">
            {leg.themes.map((t) => (
              <li key={t} className="border-b border-kashti-charcoal/12 py-3 text-[13px] text-kashti-charcoal/70">
                {t}
              </li>
            ))}
          </ul>
        </article>
      </Reveal>
    );
  }

  return (
    <Reveal>
      <article className="lg:flex lg:items-center lg:gap-10">
        <div className="lg:max-w-lg lg:flex-1">
          <LegHead leg={leg} index={index} />
        </div>
        <div className="hidden lg:block lg:shrink-0">
          <OrbitMotif />
        </div>
      </article>
    </Reveal>
  );
}
