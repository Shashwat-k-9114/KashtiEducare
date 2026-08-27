import type { Metadata } from "next";

import { StaggerGrid } from "@/components/motion";
import { CategoryCard } from "@/components/programs/CategoryCard";
import { PageHeader } from "@/components/programs/PageHeader";
import { JsonLd } from "@/components/JsonLd";
import { higherEdCategories } from "@/data/programs";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Higher Education Programs",
  description:
    "Seven categories covering the full Higher Education product portfolio — from academic & industry exposure to alumni and faculty programs.",
  path: "/programs/higher-education",
});

export default function HigherEducationProgramsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Programs", path: "/programs" },
          { name: "Higher Education", path: "/programs/higher-education" },
        ])}
      />

      <PageHeader
          eyebrow="Higher Education Programs"
          title="Built for Campus Life, End to End"
          description="Seven categories covering the full Higher Education portfolio — for students, alumni, and the faculty who teach them."
          breadcrumbs={[{ label: "Programs", href: "/programs" }, { label: "Higher Education" }]}
        />
        <section className="bg-kashti-bg-light px-6 pb-20 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <StaggerGrid className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
              {higherEdCategories.map((category) => (
                <CategoryCard
                  key={category.slug}
                  href={`/programs/higher-education/${category.slug}`}
                  icon={category.icon}
                  title={category.title}
                  hook={category.hook}
                  description={category.description}
                  cta={category.cta}
                  accent={category.accent}
                  number={category.number}
                />
              ))}
            </StaggerGrid>
          </div>
        </section>
    </>
  );
}
