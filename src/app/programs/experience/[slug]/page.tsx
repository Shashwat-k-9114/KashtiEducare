import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/motion";
import { PageHeader } from "@/components/programs/PageHeader";
import { MetadataStrip } from "@/components/programs/MetadataStrip";
import { FaqAccordion } from "@/components/programs/FaqAccordion";
import { FeaturedExperiences } from "@/components/programs/FeaturedExperiences";
import { getProgrammeBySlug, programmes } from "@/data/programs";

export function generateStaticParams() {
  return programmes.map((programme) => ({ slug: programme.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const programme = getProgrammeBySlug(slug);
  if (!programme) return {};
  return {
    title: `${programme.title} | Kashti Educare`,
    description: programme.description,
  };
}

export default async function ProgrammeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const programme = getProgrammeBySlug(slug);
  if (!programme) notFound();

  const audienceLabel = programme.audience === "school" ? "School Programs" : "Higher Education Programs";
  const audienceHref = programme.audience === "school" ? "/programs/school" : "/programs/higher-education";

  return (
    <>
      <PageHeader
          eyebrow={audienceLabel}
          title={programme.title}
          description={programme.description}
          breadcrumbs={[
            { label: "Programs", href: "/programs" },
            { label: audienceLabel, href: audienceHref },
            { label: programme.title },
          ]}
        />

        <section className="bg-kashti-bg-light px-6 pb-16 lg:px-10">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <MetadataStrip metadata={programme.metadata} />
            </Reveal>
          </div>
        </section>

        <section className="bg-kashti-bg-tint px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="text-lg leading-relaxed text-kashti-charcoal/80">{programme.longDescription}</p>
            </Reveal>
          </div>
        </section>

        {programme.featuredExperiences && programme.featuredExperiences.length > 0 ? (
          <section className="bg-kashti-bg-light px-6 py-16 lg:px-10 lg:py-20">
            <div className="mx-auto max-w-5xl">
              <div className="text-center">
                <Reveal>
                  <h2 className="font-display text-2xl font-semibold text-kashti-charcoal sm:text-3xl">
                    Featured <span className="text-kashti-gold-deep">Experiences</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.08}>
                  <p className="mt-3 text-kashti-charcoal/60">Geo-circuits our institutions run most often for this programme.</p>
                </Reveal>
              </div>
              <Reveal delay={0.14} className="mt-10">
                <FeaturedExperiences experiences={programme.featuredExperiences} />
              </Reveal>
            </div>
          </section>
        ) : null}

        <section className="bg-kashti-bg-tint px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <Reveal>
                <h2 className="font-display text-2xl font-semibold text-kashti-charcoal sm:text-3xl">
                  Common <span className="text-kashti-gold-deep">Questions</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.08} className="mt-10">
              <FaqAccordion faqs={programme.faqs} />
            </Reveal>
          </div>
        </section>

        <section className="bg-kashti-bg-light px-6 py-16 text-center lg:px-10 lg:py-20">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-kashti-charcoal sm:text-3xl">
              Ready to bring this to your institution?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-3 max-w-xl text-kashti-charcoal/60">
              Tell us about your group and we&apos;ll come back with a customised proposal for {programme.title}.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <Link
              href={`/contact?program=${encodeURIComponent(programme.title)}`}
              className="group mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-kashti-gold px-7 py-3 text-sm font-semibold text-kashti-charcoal shadow-[0_4px_16px_-4px_rgba(238,178,80,0.5)]"
            >
              Enquire Now
              <ArrowRight size={16} strokeWidth={2.25} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </section>
    </>
  );
}
