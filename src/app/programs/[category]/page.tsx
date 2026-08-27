import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StaggerGrid } from "@/components/motion";
import { PageHeader } from "@/components/programs/PageHeader";
import { ProgrammeCard } from "@/components/programs/ProgrammeCard";
import { getPortfolioCategoryBySlug, getProgrammesByPortfolioCategory, portfolioCategories } from "@/data/programs";

export function generateStaticParams() {
  return portfolioCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getPortfolioCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.title} | Kashti Educare`,
    description: category.description,
  };
}

export default async function PortfolioCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = getPortfolioCategoryBySlug(slug);
  if (!category) notFound();

  const categoryProgrammes = getProgrammesByPortfolioCategory(category.slug);

  return (
    <>
      <PageHeader
          eyebrow="The Portfolio"
          title={category.title}
          description={category.description}
          breadcrumbs={[{ label: "Programs", href: "/programs" }, { label: category.title }]}
        />
        <section className="bg-kashti-bg-light px-6 pb-20 lg:px-10">
          <div className="mx-auto max-w-6xl">
            {categoryProgrammes.length > 0 ? (
              <StaggerGrid className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
                {categoryProgrammes.map((programme, index) => (
                  <ProgrammeCard key={programme.slug} programme={programme} index={index} />
                ))}
              </StaggerGrid>
            ) : (
              <p className="text-center text-kashti-charcoal/50">Programmes for this category are being finalised.</p>
            )}
          </div>
        </section>
    </>
  );
}
