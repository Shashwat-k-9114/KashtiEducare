import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StaggerGrid } from "@/components/motion";
import { PageHeader } from "@/components/programs/PageHeader";
import { ProgrammeCard } from "@/components/programs/ProgrammeCard";
import { JsonLd } from "@/components/JsonLd";
import { getHigherEdCategoryBySlug, getProgrammesByHigherEdCategory, higherEdCategories } from "@/data/programs";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return higherEdCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getHigherEdCategoryBySlug(slug);
  if (!category) return {};
  return buildMetadata({
    title: `${category.title} Programmes`,
    description: category.description,
    path: `/programs/higher-education/${category.slug}`,
  });
}

export default async function HigherEdCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getHigherEdCategoryBySlug(slug);
  if (!category) notFound();

  const categoryProgrammes = getProgrammesByHigherEdCategory(category.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Programs", path: "/programs" },
          { name: "Higher Education", path: "/programs/higher-education" },
          { name: category.title, path: `/programs/higher-education/${category.slug}` },
        ])}
      />

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
