import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal, StaggerGrid } from "@/components/motion";
import { CategoryCard } from "@/components/programs/CategoryCard";
import { PageHeader } from "@/components/programs/PageHeader";
import { ProgramsDirectory } from "@/components/programs/ProgramsDirectory";
import { FaqAccordion } from "@/components/programs/FaqAccordion";
import { portfolioCategories, programmes, siteFaq } from "@/data/programs";

export const metadata: Metadata = {
  title: "Programs | Kashti Educare",
  description:
    "Eight ways into the same real-world experience layer — browse the Kashti Portfolio by theme, or jump straight to School or Higher Education programmes.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHeader
          eyebrow="The Portfolio"
          title="Programs Built Around Every Learner"
          description="Different institutions, different needs. Browse by theme below, or go straight to the audience-specific roster."
        >
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#directory"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-kashti-green px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-kashti-green-soft sm:w-auto"
            >
              Browse the Full Catalogue
              <ArrowRight size={16} strokeWidth={2.25} className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <Link
              href="/programs/school"
              className="w-full rounded-full border border-kashti-green px-7 py-3 text-center text-sm font-semibold text-kashti-green transition-colors hover:bg-kashti-green/5 sm:w-auto"
            >
              School Programs
            </Link>
            <Link
              href="/programs/higher-education"
              className="w-full rounded-full border border-kashti-green px-7 py-3 text-center text-sm font-semibold text-kashti-green transition-colors hover:bg-kashti-green/5 sm:w-auto"
            >
              Higher Education Programs
            </Link>
          </div>
        </PageHeader>

        <section className="bg-kashti-bg-light px-6 pb-20 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <StaggerGrid className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
              {portfolioCategories.map((category) => (
                <CategoryCard
                  key={category.slug}
                  href={`/programs/${category.slug}`}
                  icon={category.icon}
                  title={category.title}
                  hook={category.hook}
                  description={category.description}
                  cta={category.cta}
                  accent={category.accent}
                  includes={category.includes}
                />
              ))}
            </StaggerGrid>
          </div>
        </section>

        <ProgramsDirectory programmes={programmes} portfolioCategories={portfolioCategories} />

        <section className="bg-kashti-bg-light px-6 py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <Reveal>
                <h2 className="font-display text-3xl font-semibold text-kashti-charcoal sm:text-4xl">
                  Frequently Asked <span className="text-kashti-gold-deep">Questions</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-3 text-kashti-charcoal/60">Everything institutions usually ask before booking.</p>
              </Reveal>
            </div>
            <Reveal delay={0.15} className="mt-12">
              <FaqAccordion faqs={siteFaq} defaultOpen={null} />
            </Reveal>
          </div>
        </section>
    </>
  );
}
