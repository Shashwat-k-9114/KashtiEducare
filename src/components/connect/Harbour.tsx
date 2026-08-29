import { ArrowUpRight, Download } from "lucide-react";
import Link from "next/link";

import { closing, homeHref, homeLabel, manifest, visibleSocials, type ContactRow, type Station } from "@/data/connect";
import { socialGlyphMap } from "./icons";
import { Buoy } from "./Stage";

/**
 * Station 6 — harbour. The voyage arrives: the page inverts to deep ink,
 * the route ends at a buoy, and the contact details are laid out like a
 * ship's manifest. "Save Our Contact" is the elevated line — this page is
 * the digital half of a visiting card.
 */
export function Harbour({ station }: { station: Station }) {
  const socials = visibleSocials();
  return (
    <section
      aria-label={`${station.name} — ${station.note}`}
      className="bg-kashti-bg-dark text-kashti-bg-light"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="flex items-center gap-3">
          <Buoy />
          <p className="font-mono-label text-[10px] tracking-[0.28em] text-kashti-bg-light/45 uppercase">
            {station.name} — {station.note}
          </p>
        </div>

        <div className="mt-10 lg:grid lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div>
            <p className="font-mono-label text-[11px] tracking-[0.28em] text-kashti-gold uppercase">{closing.heading}</p>
            <p className="font-display mt-4 max-w-[14ch] text-[31px] leading-[1.08] font-semibold text-kashti-bg-light sm:text-[40px] lg:text-[52px]">
              {closing.statement}
            </p>
          </div>

          <div className="mt-10 lg:mt-2">
            <div className="divide-y divide-white/10">
              {manifest.map((row) => (
                <ManifestRow key={row.label} row={row} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-white/25" aria-hidden="true" />
            <Link
              href={homeHref}
              className="font-mono-label rounded-sm text-[10px] tracking-[0.24em] text-kashti-bg-light/40 uppercase transition-colors hover:text-kashti-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kashti-gold focus-visible:ring-offset-2 focus-visible:ring-offset-kashti-bg-dark"
            >
              {homeLabel}
            </Link>
          </div>

          {socials.length > 0 ? (
            <div className="flex items-center gap-5">
              <span className="font-mono-label text-[9px] tracking-[0.28em] text-kashti-bg-light/35 uppercase">Follow</span>
              {socials.map((s) => {
                const Glyph = socialGlyphMap[s.label];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Kashti Educare on ${s.label} (opens in a new tab)`}
                    className="group inline-flex items-center gap-2 rounded-sm text-kashti-bg-light/55 transition-colors hover:text-kashti-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kashti-gold focus-visible:ring-offset-2 focus-visible:ring-offset-kashti-bg-dark"
                  >
                    <Glyph size={16} aria-hidden="true" />
                    <span className="font-mono-label text-[10px] tracking-[0.18em] uppercase">{s.label}</span>
                  </a>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ManifestRow({ row }: { row: ContactRow }) {
  const rel = row.external ? { target: "_blank" as const, rel: "noopener noreferrer" } : {};
  const Glyph = row.download ? Download : ArrowUpRight;
  return (
    <a
      href={row.href}
      download={row.download}
      {...rel}
      className={`group flex items-center justify-between gap-4 rounded-sm py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kashti-gold focus-visible:ring-offset-4 focus-visible:ring-offset-kashti-bg-dark ${
        row.emphasis ? "-mx-4 mt-1 bg-kashti-gold/[0.07] px-4" : ""
      }`}
    >
      <span className="min-w-0">
        <span
          className={`font-mono-label block text-[10px] tracking-[0.24em] uppercase ${
            row.emphasis ? "text-kashti-gold" : "text-kashti-bg-light/45"
          }`}
        >
          {row.label}
        </span>
        <span className="mt-1.5 block truncate text-[15px] text-kashti-bg-light/90 transition-colors group-hover:text-white">
          {row.value}
        </span>
      </span>
      <Glyph
        size={17}
        strokeWidth={2}
        aria-hidden="true"
        className={`shrink-0 transition ${
          row.emphasis ? "text-kashti-gold" : "text-kashti-bg-light/40 group-hover:text-kashti-gold"
        } ${row.download ? "group-hover:translate-y-0.5" : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"}`}
      />
    </a>
  );
}
