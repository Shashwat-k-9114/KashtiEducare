import type { Metadata } from "next";
import { Handshake, Landmark, Mic, ShieldCheck, Users2 } from "lucide-react";

import { PageHeader } from "@/components/programs/PageHeader";
import { LearningEcosystem } from "@/components/LearningEcosystem";
import { Reveal, StaggerGrid, StaggerItem } from "@/components/motion";
import { accentDeepVar, accentTint, accentVar, type Accent } from "@/components/AccentCard";

export const metadata: Metadata = {
  title: "Institutions | Kashti Educare",
  description: "The people and organisations behind Kashti's learning ecosystem — our Education & Experience Council.",
};

/**
 * Structural placeholder — describes what each group in the Council does,
 * not who's in it. Replace with a real roster (names, credentials, org
 * affiliations) once that information exists; don't fabricate specifics
 * in the meantime.
 */
const council: { title: string; description: string; accent: Accent; icon: typeof Landmark }[] = [
  {
    title: "Founding Council",
    description: "The senior leadership shaping Kashti's strategic direction and overall programme philosophy.",
    accent: "gold",
    icon: Landmark,
  },
  {
    title: "Advisors",
    description: "Subject-matter experts guiding curriculum design and learning outcomes across programme categories.",
    accent: "teal",
    icon: ShieldCheck,
  },
  {
    title: "Guest Faculty",
    description: "Practitioners and academics who lead sessions, workshops and masterclasses within specific programmes.",
    accent: "coral",
    icon: Mic,
  },
  {
    title: "Institutional Partners",
    description: "Universities, industry bodies and organisations that host, co-design or facilitate Kashti experiences.",
    accent: "green",
    icon: Handshake,
  },
  {
    title: "Expert Network",
    description: "The wider pool of professionals available for programme-specific interactions, panels and mentorship.",
    accent: "gold",
    icon: Users2,
  },
];

export default function InstitutionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Institutions"
        title="Our Learning Ecosystem"
        description="Learning happens everywhere, across industries, academia, and communities. Here's the collective intelligence behind every Kashti experience."
        breadcrumbs={[{ label: "Institutions" }]}
      />

      <LearningEcosystem />

      <section className="bg-kashti-bg-tint px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <Reveal>
              <h2 className="font-display text-3xl font-semibold text-kashti-charcoal sm:text-4xl">
                The Education &amp; Experience <span className="text-kashti-gold-deep">Council</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mx-auto mt-3 max-w-xl text-kashti-charcoal/60">
                The collective intelligence structure behind Kashti&apos;s programme design and delivery.
              </p>
            </Reveal>
          </div>

          <StaggerGrid className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {council.map((group) => (
              <StaggerItem key={group.title}>
                <div
                  className="h-full rounded-xl border-t border-r border-b border-l-4 bg-kashti-bg-light p-6 shadow-[0_1px_2px_rgba(69,69,69,0.06)]"
                  style={{ borderColor: "var(--kashti-border-light)", borderLeftColor: accentVar[group.accent] }}
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-lg"
                    style={{ backgroundColor: accentTint[group.accent] }}
                  >
                    <group.icon size={20} strokeWidth={1.75} style={{ color: accentDeepVar[group.accent] }} />
                  </div>
                  <h3 className="font-display mt-4 text-lg font-semibold text-kashti-charcoal">{group.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-kashti-charcoal/70">{group.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>
    </>
  );
}
