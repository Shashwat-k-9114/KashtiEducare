import type { Metadata } from "next";

import { StaggerGrid } from "@/components/motion";
import { PageHeader } from "@/components/programs/PageHeader";
import { ProgrammeCard } from "@/components/programs/ProgrammeCard";
import { JsonLd } from "@/components/JsonLd";
import { getSchoolProgrammes } from "@/data/programs";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "School Programs",
  description: "Twelve experiential programmes for school-age learners, from STEM tours to global immersion trips.",
  path: "/programs/school",
});

export default function SchoolProgramsPage() {
  const schoolProgrammes = getSchoolProgrammes();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Programs", path: "/programs" },
          { name: "School", path: "/programs/school" },
        ])}
      />

      <PageHeader
          eyebrow="School Programs"
          title="Real-World Learning for School Students"
          description="Twelve programmes spanning discipline, adventure, career exposure and global immersion — built for classrooms, not campuses."
          breadcrumbs={[{ label: "Programs", href: "/programs" }, { label: "School" }]}
        />
        <section className="bg-kashti-bg-light px-6 pb-20 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <StaggerGrid className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
              {schoolProgrammes.map((programme, index) => (
                <ProgrammeCard key={programme.slug} programme={programme} index={index} />
              ))}
            </StaggerGrid>
          </div>
        </section>
    </>
  );
}
