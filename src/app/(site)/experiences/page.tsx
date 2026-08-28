import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/programs/PageHeader";
import { HowWeDeliver } from "@/components/HowWeDeliver";
import { ExperienceModel } from "@/components/ExperienceModel";
import { Reveal } from "@/components/motion";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Experiences",
  description: "From orientation to transformation — how Kashti structures every experience, and what it builds in a learner.",
  path: "/experiences",
});

export default function ExperiencesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Experiences"
        title="The Kashti Experience Model"
        description="From exposure to capability to clarity, a journey that transforms. Two frameworks, one outcome: learners who leave more capable than they arrived."
        breadcrumbs={[{ label: "Experiences" }]}
      />

      <HowWeDeliver />
      <ExperienceModel />

      <section className="bg-kashti-bg-tint px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-kashti-charcoal sm:text-3xl">
              How the two frameworks fit together
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 text-base leading-relaxed text-kashti-charcoal/70">
              Orient → Immerse → Build → Transform is the pedagogy — how we structure a programme, session by session. See →
              Build → Become is the outcome journey it produces in a learner, from first encountering a real environment to
              walking away with genuine capability and career clarity. Every Kashti programme, regardless of format or
              duration, is built to move a learner through both.
            </p>
          </Reveal>
          <Reveal delay={0.16} className="mt-8">
            <Link
              href="/programs"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-kashti-green px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-kashti-green-soft"
            >
              See It Applied in Our Programs
              <ArrowRight size={16} strokeWidth={2.25} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
