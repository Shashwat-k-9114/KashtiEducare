import { Reveal } from "@/components/motion";
import { legs, type Leg as LegData } from "@/data/connect";
import { MagazineCover } from "./MagazineCover";
import { CourseLink } from "./parts";

/**
 * Station 3 — the passage. Four legs, one system (a mono leg mark, an
 * oversized Fraunces title, one course-line CTA) but no two the same:
 * legs with a theme list open into a two-column "manifest"; Kashti Lens
 * is a magazine feature with a cover; the rest carry a quiet drawn motif.
 * Type-led on purpose — the photography lives further down, at Sightings.
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

function Leg({ leg, index }: { leg: LegData; index: number }) {
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
