import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StaggerGrid } from "@/components/motion";
import { PageHeader } from "@/components/programs/PageHeader";
import { ProgrammeCard } from "@/components/programs/ProgrammeCard";
import { getHigherEdCategoryBySlug, getProgrammesByHigherEdCategory, higherEdCategories } from "@/data/programs";

export function generateStaticParams() {
  return higherEdCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getHigherEdCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.title} | Kashti Educare`,
    description: category.description,
  };
}

export default async function HigherEdCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getHigherEdCategoryBySlug(slug);
  if (!category) notFound();

  const categoryProgrammes = getProgrammesByHigherEdCategory(category.slug);

  return (
    <>
      <PageHeader
          eyebrow={`Higher Education · ${category.number}`}
          title={category.title}
          description={category.description}
          breadcrumbs={[
            { label: "Programs", href: "/programs" },
            { label: "Higher Education", href: "/programs/higher-education" },
            { label: category.title },
          ]}
        />
        <section className="bg-kashti-bg-light px-6 pb-20 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <StaggerGrid className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
              {categoryProgrammes.map((programme, index) => (
                <ProgrammeCard key={programme.slug} programme={programme} index={index} />
              ))}
            </StaggerGrid>
          </div>
        </section>
    </>
  );
}
