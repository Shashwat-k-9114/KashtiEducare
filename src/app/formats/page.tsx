import type { Metadata } from "next";
import { CalendarClock, Layers, Mountain, Sunrise, Trophy, Zap } from "lucide-react";

import { PageHeader } from "@/components/programs/PageHeader";
import { ProgramFormats } from "@/components/ProgramFormats";
import { Reveal, StaggerGrid, StaggerItem } from "@/components/motion";
import { accentDeepVar, accentTint, accentVar, type Accent } from "@/components/AccentCard";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Formats",
  description: "Flexible by design — from a single orientation session to a year-long institutional engagement.",
  path: "/formats",
});

const formatDetails: {
  duration: string;
  tag: string;
  accent: Accent;
  icon: typeof Zap;
  idealFor: string;
}[] = [
  {
    duration: "90 Minutes",
    tag: "Orientation · Discovery",
    accent: "gold",
    icon: Zap,
    idealFor:
      "A single session — a talk, panel or career conversation — designed to spark curiosity without asking for a full day. Works well as a first touchpoint before committing to a deeper programme.",
  },
  {
    duration: "1 Day",
    tag: "Immersion · Workshop",
    accent: "coral",
    icon: Sunrise,
    idealFor:
      "A focused, single-site visit or workshop: an industrial visit, a campus tour, a hands-on lab session. Enough time to actually see and do, without disrupting the academic calendar.",
  },
  {
    duration: "2-4 Days",
    tag: "Multi-location · Experiential",
    accent: "teal",
    icon: Layers,
    idealFor:
      "Multi-stop circuits and short residential camps — think STEM Tour geo-circuits or leadership camps. Long enough to build a narrative across locations, still a manageable break from term time.",
  },
  {
    duration: "5-7 Days",
    tag: "Deep Immersion · Leadership",
    accent: "green",
    icon: Mountain,
    idealFor:
      "Flagship programmes: startup immersions, treks, global immersion trips. This is where genuine capability-building happens — enough time for the debrief cycle to actually change how a learner thinks.",
  },
  {
    duration: "Annual",
    tag: "Aligned with Academic Calendar",
    accent: "gold",
    icon: Trophy,
    idealFor:
      "Institutional engagements spanning a full academic year — recurring industry connect sessions, ongoing mentorship, or a structured multi-programme roadmap built around your calendar.",
  },
];

export default function FormatsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Formats"
        title="Program Formats"
        description="Flexible by design — from a single session to a year-long journey. Every programme in our portfolio maps to one of these five formats."
        breadcrumbs={[{ label: "Formats" }]}
      />

      <ProgramFormats />

      <section className="bg-kashti-bg-light px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <Reveal>
              <CalendarClock className="mx-auto mb-4 text-kashti-gold-deep" size={28} strokeWidth={1.75} />
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-3xl font-semibold text-kashti-charcoal sm:text-4xl">
                Which Format <span className="text-kashti-gold-deep">Fits</span>?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-3 max-w-xl text-kashti-charcoal/60">
                A closer look at what each format is actually built for.
              </p>
            </Reveal>
          </div>

          <StaggerGrid className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2" stagger={0.08}>
            {formatDetails.map((format) => (
              <StaggerItem key={format.duration}>
                <div
                  className="flex h-full gap-4 rounded-xl border-t border-r border-b border-l-4 bg-kashti-bg-light p-6 shadow-[0_1px_2px_rgba(69,69,69,0.06)]"
                  style={{ borderColor: "var(--kashti-border-light)", borderLeftColor: accentVar[format.accent] }}
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: accentTint[format.accent] }}
                  >
                    <format.icon size={22} strokeWidth={1.75} style={{ color: accentDeepVar[format.accent] }} />
                  </div>
                  <div>
                    <p className="font-display text-lg font-semibold text-kashti-charcoal">{format.duration}</p>
                    <p
                      className="font-mono-label mt-0.5 text-[11px] tracking-wide uppercase"
                      style={{ color: accentDeepVar[format.accent] }}
                    >
                      {format.tag}
                    </p>
                    <p className="mt-2.5 text-sm leading-relaxed text-kashti-charcoal/70">{format.idealFor}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>
    </>
  );
}
