import { ArrowRight, GraduationCap, Hammer, Layers, Lightbulb } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal, StaggerGrid, StaggerItem } from "./motion";

/**
 * The asset is a self-contained "NEP 2020 Aligned" badge graphic (book +
 * stars crest with the text baked in) — not the state emblem of India or
 * any official Government of India / Ministry of Education mark, so it
 * carries none of the government-mark usage concerns that kept this
 * typographic-only earlier. Source is 1024x1536 (2:3), rendered well
 * below native resolution here so it stays crisp at badge size.
 */
function NepBadge() {
  return (
    <div className="shrink-0" style={{ width: 84, height: 126 }}>
      <Image
        src="/images/logos/nep-2020.png"
        alt="National Education Policy 2020 logo"
        width={1024}
        height={1536}
        className="h-full w-full object-contain"
      />
    </div>
  );
}

const alignmentPoints: { icon: typeof Layers; title: string; description: string }[] = [
  {
    icon: Layers,
    title: "Multidisciplinary & holistic",
    description: "Programmes cross industry, academia, government and community — never a single-subject track.",
  },
  {
    icon: Hammer,
    title: "Experiential & competency-based",
    description: "Every experience is hands-on and outcome-based, not lecture-delivered content to memorise.",
  },
  {
    icon: GraduationCap,
    title: "Early vocational exposure",
    description: "Direct exposure to real workplaces and vocations starts at the school stage, not just higher education.",
  },
  {
    icon: Lightbulb,
    title: "Application over content",
    description: "Built around applying what's learned in the field — critical thinking over content volume.",
  },
];

export function NepAlignmentBanner() {
  return (
    <div
      className="rounded-2xl border bg-kashti-bg-light p-6 sm:p-10"
      style={{ borderColor: "var(--kashti-border-light)" }}
    >
      <Reveal className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
        <NepBadge />
        <div>
          <p className="font-mono-label text-xs tracking-widest text-kashti-green-deep uppercase">
            Policy Alignment
          </p>
          <h2 className="font-display mt-1.5 text-2xl font-semibold text-kashti-charcoal sm:text-3xl">
            Aligned with India&apos;s National Education Policy 2020
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-kashti-charcoal/65 sm:text-base">
            Kashti&apos;s programme model was built around NEP 2020&apos;s core shift — from content delivery to
            real-world, applied learning.
          </p>
        </div>
      </Reveal>

      <StaggerGrid className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2" stagger={0.08}>
        {alignmentPoints.map((point) => (
          <StaggerItem key={point.title}>
            <div className="flex items-start gap-3">
              <div
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: "rgba(26, 168, 118, 0.14)" }}
              >
                <point.icon size={17} strokeWidth={1.75} className="text-kashti-green-deep" />
              </div>
              <div>
                <p className="text-sm font-semibold text-kashti-charcoal">{point.title}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-kashti-charcoal/65">{point.description}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerGrid>

      <Reveal delay={0.1} className="mt-8 text-center sm:text-left">
        <Link
          href="/experiences"
          className="group font-mono-label inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-kashti-green-deep uppercase"
        >
          See the experience model
          <ArrowRight size={14} strokeWidth={2.25} className="transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </div>
  );
}
