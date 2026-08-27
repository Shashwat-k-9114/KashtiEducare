import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Eye, Sun, Wrench } from "lucide-react";

import { PageHeader } from "@/components/programs/PageHeader";
import { Reveal, StaggerGrid, StaggerItem } from "@/components/motion";
import { accentDeepVar, accentTint, accentVar, type Accent } from "@/components/AccentCard";

export const metadata: Metadata = {
  title: "About | Kashti Educare",
  description: "Kashti Educare is building the experience layer between education and the real world.",
};

const outcomeJourney: { step: string; title: string; description: string; accent: Accent; icon: typeof Eye }[] = [
  { step: "01", title: "See", description: "Learners encounter real environments, industries, institutions, experts, and ideas.", accent: "gold", icon: Eye },
  { step: "02", title: "Build", description: "Strengthen critical thinking, communication, collaboration, leadership and problem-solving.", accent: "teal", icon: Wrench },
  { step: "03", title: "Become", description: "Explore interests, career pathways and higher education opportunities with clarity and confidence.", accent: "coral", icon: Sun },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="About Kashti Educare"
        description="Kashti is building the experience layer between education and the real world."
        breadcrumbs={[{ label: "About" }]}
      />

      <section className="bg-kashti-bg-light px-6 pb-16 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="text-lg leading-relaxed text-kashti-charcoal/80">
              We connect learners with people, institutions, industries and ideas shaping the real world, through
              meaningful, transformative experiences. Preparing learners for the world beyond the classroom: real world,
              real learning, real impact.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-kashti-bg-tint px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <Reveal>
              <h2 className="font-display text-3xl font-semibold text-kashti-charcoal sm:text-4xl">
                How We <span className="text-kashti-gold-deep">Work</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mx-auto mt-3 max-w-xl text-kashti-charcoal/60">
                Every programme moves a learner through the same outcome journey, from first exposure to genuine capability.
              </p>
            </Reveal>
          </div>

          <StaggerGrid className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3" stagger={0.1}>
            {outcomeJourney.map((step) => (
              <StaggerItem key={step.step}>
                <div
                  className="h-full rounded-xl border-t border-r border-b border-l-4 bg-kashti-bg-light p-6 shadow-[0_1px_2px_rgba(69,69,69,0.06)]"
                  style={{ borderColor: "var(--kashti-border-light)", borderLeftColor: accentVar[step.accent] }}
                >
                  <span className="font-mono-label text-[11px] tracking-widest uppercase" style={{ color: accentDeepVar[step.accent] }}>
                    Step {step.step}
                  </span>
                  <div
                    className="mt-4 flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: accentTint[step.accent] }}
                  >
                    <step.icon size={22} strokeWidth={1.75} style={{ color: accentDeepVar[step.accent] }} />
                  </div>
                  <h3 className="font-display mt-4 text-xl font-semibold text-kashti-charcoal">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-kashti-charcoal/70">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>

          <div className="mt-6 text-center">
            <Link
              href="/experiences"
              className="font-mono-label inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-kashti-green-deep uppercase"
            >
              See the full experience model
              <ArrowRight size={13} strokeWidth={2.25} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-kashti-bg-light px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-kashti-charcoal sm:text-3xl">Who We Work With</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-3 max-w-xl text-kashti-charcoal/60">
              Industry, academia, government, communities and startups — our full ecosystem and Education &amp; Experience
              Council are on the Institutions page. Organisations looking to host or co-design a programme can find more on
              the Partners page.
            </p>
          </Reveal>
          <Reveal delay={0.14} className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/institutions"
              className="w-full rounded-full border border-kashti-green px-7 py-3 text-center text-sm font-semibold text-kashti-green transition-colors hover:bg-kashti-green/5 sm:w-auto"
            >
              Our Ecosystem
            </Link>
            <Link
              href="/partners"
              className="w-full rounded-full border border-kashti-green px-7 py-3 text-center text-sm font-semibold text-kashti-green transition-colors hover:bg-kashti-green/5 sm:w-auto"
            >
              Partners
            </Link>
            <Link
              href="/why-kashti"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-kashti-green px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-kashti-green-soft sm:w-auto"
            >
              Our Impact
              <ArrowRight size={16} strokeWidth={2.25} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
