"use client";

import { Calendar } from "lucide-react";

import { accentDeepVar, accentVar, accentTint, type Accent } from "./AccentCard";
import { Reveal, StaggerGrid, StaggerItem } from "./motion";

const formats: Array<{ duration: string; tag: string; accent: Accent }> = [
  { duration: "90 Minutes", tag: "Orientation · Discovery", accent: "gold" },
  { duration: "1 Day", tag: "Immersion · Workshop", accent: "coral" },
  { duration: "2-4 Days", tag: "Multi-location · Experiential", accent: "teal" },
  { duration: "5-7 Days", tag: "Deep Immersion · Leadership", accent: "green" },
  { duration: "Annual", tag: "Aligned with Academic Calendar", accent: "gold" },
];

export function ProgramFormats() {
  return (
    <section id="formats" className="bg-kashti-bg-tint px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <Reveal>
            <Calendar className="mx-auto mb-4 text-kashti-gold-deep" size={28} strokeWidth={1.75} />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-3xl font-semibold text-kashti-charcoal sm:text-4xl">
              Program <span className="text-kashti-gold-deep">Formats</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-3 text-kashti-charcoal/60">
              Flexible by design, from a single session to a year-long journey.
            </p>
          </Reveal>
        </div>

        <StaggerGrid className="mt-12 flex flex-wrap items-stretch justify-center gap-5" stagger={0.08}>
          {formats.map((format) => (
            <StaggerItem key={format.duration}>
              <div
                className="min-w-[172px] rounded-full border-2 px-7 py-4 text-center transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_16px_28px_-16px_rgba(69,69,69,0.35)]"
                style={{
                  borderColor: accentVar[format.accent],
                  backgroundColor: accentTint[format.accent],
                }}
              >
                <p
                  className="font-mono-label text-sm font-bold tracking-wider uppercase"
                  style={{ color: accentDeepVar[format.accent] }}
                >
                  {format.duration}
                </p>
                <p className="mt-1.5 text-[11px] font-medium text-kashti-charcoal/65">
                  {format.tag}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
