import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Reveal, StaggerGrid } from "@/components/motion";
import { PageHeader } from "@/components/programs/PageHeader";
import { MetadataStrip } from "@/components/programs/MetadataStrip";
import { FaqAccordion } from "@/components/programs/FaqAccordion";
import { FeaturedExperiences } from "@/components/programs/FeaturedExperiences";
import { ProgrammeCard } from "@/components/programs/ProgrammeCard";
import { EnquireNowButton } from "@/components/EnquireNowButton";
import { JsonLd } from "@/components/JsonLd";
import { getProgrammeBySlug, getRelatedProgrammes, programmes } from "@/data/programs";
import { breadcrumbJsonLd, courseJsonLd, faqPageJsonLd } from "@/lib/jsonld";
import { buildMetadata, programmeMetaDescription, shortHook } from "@/lib/seo";

export function generateStaticParams() {
  return programmes.map((programme) => ({ slug: programme.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const programme = getProgrammeBySlug(slug);
  if (!programme) return {};
  return buildMetadata({
    title: `${programme.title} — ${shortHook(programme.description)}`,
    description: programmeMetaDescription(programme),
    path: `/programs/experience/${programme.slug}`,
  });
}

export default async function ProgrammeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const programme = getProgrammeBySlug(slug);
  if (!programme) notFound();

  const audienceLabel = programme.audience === "school" ? "School Programs" : "Higher Education Programs";
  const audienceHref = programme.audience === "school" ? "/programs/school" : "/programs/higher-education";
  const relatedProgrammes = getRelatedProgrammes(programme);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Programs", path: "/programs" },
          { name: audienceLabel, path: audienceHref },
          { name: programme.title, path: `/programs/experience/${programme.slug}` },
        ])}
      />
      <JsonLd data={courseJsonLd(programme)} />
      <JsonLd data={faqPageJsonLd(programme.faqs)} />

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

        {relatedProgrammes.length > 0 ? (
          <section className="bg-kashti-bg-light px-6 py-16 lg:px-10 lg:py-20">
            <div className="mx-auto max-w-5xl">
              <div className="text-center">
                <Reveal>
                  <h2 className="font-display text-2xl font-semibold text-kashti-charcoal sm:text-3xl">
                    Related <span className="text-kashti-gold-deep">Programmes</span>
                  </h2>
                </Reveal>
              </div>
              <Reveal delay={0.08} className="mt-10">
                <StaggerGrid className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
                  {relatedProgrammes.map((related, index) => (
                    <ProgrammeCard key={related.slug} programme={related} index={index} />
                  ))}
                </StaggerGrid>
              </Reveal>
            </div>
          </section>
        ) : null}

        <section className="bg-kashti-bg-tint px-6 py-16 text-center lg:px-10 lg:py-20">
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
            <EnquireNowButton programmeTitle={programme.title} />
          </Reveal>
        </section>
    </>
  );
}
