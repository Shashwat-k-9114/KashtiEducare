import Image from "next/image";

import type { MagazineIssue } from "@/data/connect";

/**
 * The Kashti Lens cover. Shows the real cover art when an issue exists,
 * otherwise a designed placeholder cover in the same frame — so the
 * section always reads as a publication feature, never a text note.
 */
export function MagazineCover({ magazine }: { magazine: MagazineIssue }) {
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[3px] border border-kashti-charcoal/15 bg-kashti-bg-light shadow-[0_16px_44px_-20px_rgba(69,69,69,0.3)]">
      {magazine.coverImage ? (
        <Image
          src={magazine.coverImage.src}
          alt={magazine.coverImage.alt}
          width={magazine.coverImage.width}
          height={magazine.coverImage.height}
          sizes="(min-width: 1024px) 300px, 260px"
          className="h-full w-full object-cover"
        />
      ) : (
        <PlaceholderCover label={magazine.placeholderNote} />
      )}
      <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" aria-hidden="true" />
    </div>
  );
}

function PlaceholderCover({ label }: { label: string }) {
  return (
    <div className="flex h-full flex-col justify-between p-6" aria-hidden="true">
      <div>
        <p className="font-mono-label text-[9px] tracking-[0.32em] text-kashti-charcoal/40 uppercase">Kashti Educare</p>
        <p className="font-display mt-2 text-[26px] leading-[0.95] font-semibold text-kashti-charcoal">
          Kashti
          <br />
          Lens
        </p>
      </div>

      <svg viewBox="0 0 180 120" fill="none" className="mx-auto w-4/5" aria-hidden="true">
        <circle cx="90" cy="60" r="44" stroke="var(--kashti-charcoal)" strokeOpacity="0.12" />
        <circle cx="90" cy="60" r="26" stroke="var(--kashti-charcoal)" strokeOpacity="0.12" />
        <path
          d="M16 74c22-14 34 10 52-4s34-22 56-6 26 2 40 -8"
          stroke="var(--kashti-green-deep)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M16 86c22-14 34 10 52-4s34-22 56-6 26 2 40 -8"
          stroke="var(--kashti-green-deep)"
          strokeOpacity="0.4"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray="1 6"
        />
        <circle cx="90" cy="60" r="3" fill="var(--kashti-gold)" />
      </svg>

      <div className="flex items-end justify-between">
        <span className="font-mono-label text-[9px] tracking-[0.24em] text-kashti-charcoal/40 uppercase">
          Vol. — · No. —
        </span>
        <span className="font-mono-label rounded-full border border-kashti-gold-deep/40 px-2 py-1 text-[8px] tracking-[0.18em] text-kashti-gold-deep uppercase">
          {label}
        </span>
      </div>
    </div>
  );
}
