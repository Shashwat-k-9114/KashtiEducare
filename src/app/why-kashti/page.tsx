import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

import { PageHeader } from "@/components/programs/PageHeader";
import { ImpactSection } from "@/components/ImpactSection";
import { Reveal, StaggerGrid, StaggerItem } from "@/components/motion";

export const metadata: Metadata = {
  title: "Why Kashti | Kashti Educare",
  description:
    "We connect learners with people, institutions, industries and ideas shaping the real world, through meaningful, transformative experiences.",
};

const principles = [
  {
    title: "NEP 2020 Aligned",
    description: "Built around India's National Education Policy 2020 push for experiential, multidisciplinary learning.",
  },
  {
    title: "Beyond Textbooks",
    description: "Learning that happens on shop floors, campuses and expedition trails, not just inside a classroom.",
  },
  {
    title: "Real Connections",
    description: "Direct access to industry professionals, founders, faculty and institutions, not simulations of them.",
  },
  {
    title: "Practical Exposure",
    description: "Structured, hands-on exposure to real environments, real decisions and real consequences.",
  },
  {
    title: "Future Ready",
    description: "Every programme is built to develop awareness, skills and career clarity for what comes next.",
  },
];

export default function WhyKashtiPage() {
  return (
    <>
      <PageHeader
        eyebrow="Why Kashti"
        title="Preparing Learners for the World Beyond the Classroom"
        description="We connect learners with people, institutions, industries and ideas shaping the real world, through meaningful, transformative experiences."
        breadcrumbs={[{ label: "Why Kashti" }]}
      />

      <ImpactSection />

      <section className="bg-kashti-bg-tint px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <Reveal>
              <Compass className="mx-auto mb-4 text-kashti-green-deep" size={28} strokeWidth={1.75} />
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-3xl font-semibold text-kashti-charcoal sm:text-4xl">
                What We <span className="text-kashti-gold-deep">Stand For</span>
              </h2>
            </Reveal>
          </div>

          <StaggerGrid className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {principles.map((principle) => (
              <StaggerItem key={principle.title}>
                <div
                  className="h-full rounded-xl border p-6"
                  style={{ borderColor: "var(--kashti-border-light)", backgroundColor: "var(--kashti-bg-light)" }}
                >
                  <h3 className="font-mono-label text-xs font-semibold tracking-widest text-kashti-green-deep uppercase">
                    {principle.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-kashti-charcoal/70">{principle.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section className="bg-kashti-bg-light px-6 py-20 text-center lg:px-10 lg:py-24">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold text-kashti-charcoal sm:text-3xl">See it for yourself</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-3 max-w-xl text-kashti-charcoal/60">
            Browse the full programme portfolio, or talk to our team about what would work for your institution.
          </p>
        </Reveal>
        <Reveal delay={0.14} className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/programs"
            className="w-full rounded-full bg-kashti-green px-7 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-kashti-green-soft sm:w-auto"
          >
            Explore Programs
          </Link>
          <Link
            href="/contact"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-kashti-green px-7 py-3 text-sm font-semibold text-kashti-green transition-colors hover:bg-kashti-green/5 sm:w-auto"
          >
            Talk to Us
            <ArrowRight size={16} strokeWidth={2.25} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
