import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Factory, GraduationCap, Globe, Landmark, Rocket, Users } from "lucide-react";

import { PageHeader } from "@/components/programs/PageHeader";
import { Reveal, StaggerGrid, StaggerItem } from "@/components/motion";
import { accentDeepVar, accentTint, accentVar, type Accent } from "@/components/AccentCard";

export const metadata: Metadata = {
  title: "Partners | Kashti Educare",
  description: "Industries, universities, government bodies, communities and startups that make up the Kashti partner network.",
};

const partnerTypes: { title: string; description: string; accent: Accent; icon: typeof Factory }[] = [
  {
    title: "Industry",
    description: "Manufacturers, corporates and businesses that open their doors for visits, shadowing and expert interactions.",
    accent: "gold",
    icon: Factory,
  },
  {
    title: "Academia",
    description: "Universities, research centres and innovation hubs that host exposure visits and exchange placements.",
    accent: "teal",
    icon: GraduationCap,
  },
  {
    title: "Government & Public",
    description: "Public institutions and missions that support border tourism, civic exposure and social-impact programmes.",
    accent: "coral",
    icon: Landmark,
  },
  {
    title: "Startups & Tech",
    description: "Founders, incubators and accelerators that give students a first-hand look at building something new.",
    accent: "green",
    icon: Rocket,
  },
  {
    title: "Communities",
    description: "Cultural, heritage and social-impact organisations that anchor our community-service and heritage programmes.",
    accent: "gold",
    icon: Users,
  },
  {
    title: "Global Institutions",
    description: "International universities and organisations that host exchange programmes and global immersion trips.",
    accent: "teal",
    icon: Globe,
  },
];

const whyPartner = [
  "Reach students and faculty across schools and higher education, at the exact moment they're forming career and academic direction.",
  "Contribute directly to NEP 2020-aligned, experiential learning rather than a one-off CSR activity.",
  "Build a long-term talent pipeline through repeat exposure, not a single disconnected visit.",
];

export default function PartnersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Partners"
        title="Partner With Kashti"
        description="Kashti's experiences run on a network of institutions, industries and organisations willing to open their doors to learners."
        breadcrumbs={[{ label: "Partners" }]}
      />

      <section className="bg-kashti-bg-light px-6 pb-20 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-kashti-charcoal sm:text-3xl">Who We Partner With</h2>
            </Reveal>
          </div>
          <StaggerGrid className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {partnerTypes.map((type) => (
              <StaggerItem key={type.title}>
                <div
                  className="h-full rounded-xl border-t border-r border-b border-l-4 bg-kashti-bg-light p-6 shadow-[0_1px_2px_rgba(69,69,69,0.06)]"
                  style={{ borderColor: "var(--kashti-border-light)", borderLeftColor: accentVar[type.accent] }}
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-lg"
                    style={{ backgroundColor: accentTint[type.accent] }}
                  >
                    <type.icon size={20} strokeWidth={1.75} style={{ color: accentDeepVar[type.accent] }} />
                  </div>
                  <h3 className="font-display mt-4 text-lg font-semibold text-kashti-charcoal">{type.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-kashti-charcoal/70">{type.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section className="bg-kashti-bg-tint px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-kashti-charcoal sm:text-3xl">Why Partner With Us</h2>
          </Reveal>
          <StaggerGrid className="mx-auto mt-8 max-w-xl space-y-4 text-left" stagger={0.08}>
            {whyPartner.map((point) => (
              <StaggerItem key={point}>
                <p className="rounded-lg border bg-kashti-bg-light px-5 py-4 text-sm leading-relaxed text-kashti-charcoal/75" style={{ borderColor: "var(--kashti-border-light)" }}>
                  {point}
                </p>
              </StaggerItem>
            ))}
          </StaggerGrid>
          <Reveal delay={0.2} className="mt-9">
            <Link
              href="/contact?intent=institutional-partner"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-kashti-gold px-7 py-3 text-sm font-semibold text-kashti-charcoal shadow-[0_4px_16px_-4px_rgba(238,178,80,0.5)]"
            >
              Become a Partner
              <ArrowRight size={16} strokeWidth={2.25} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
