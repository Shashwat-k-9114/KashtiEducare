"use client";

import { Factory, GraduationCap, Landmark, MessageCircle, Globe, Rocket } from "lucide-react";

import { AccentCard, type Accent } from "./AccentCard";
import { Reveal, StaggerGrid } from "./motion";

const cards: Array<{
  icon: typeof Factory;
  title: string;
  description: string;
  accent: Accent;
}> = [
  {
    icon: Factory,
    title: "Industry",
    description: "Real-world industries, startups & tech ecosystems.",
    accent: "gold",
  },
  {
    icon: GraduationCap,
    title: "Academia",
    description: "Universities, research centres & innovation hubs.",
    accent: "teal",
  },
  {
    icon: Landmark,
    title: "Government & Public",
    description: "Public institutions, missions & social impact.",
    accent: "coral",
  },
  {
    icon: MessageCircle,
    title: "Experts & Innovation",
    description: "Advisors, researchers & thought leaders.",
    accent: "gold",
  },
  {
    icon: Globe,
    title: "Communities",
    description: "Culture, heritage & social impact ecosystems.",
    accent: "teal",
  },
  {
    icon: Rocket,
    title: "Startups & Tech",
    description: "Emerging ventures, innovation & future skills.",
    accent: "coral",
  },
];

export function LearningEcosystem() {
  return (
    <section id="ecosystem" className="bg-kashti-bg-light px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <Reveal>
            <Globe className="mx-auto mb-4 text-kashti-teal-deep" size={28} strokeWidth={1.75} />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-3xl font-semibold text-kashti-charcoal sm:text-4xl">
              Our Learning <span className="text-kashti-gold-deep">Ecosystem</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-3 max-w-xl text-kashti-charcoal/60">
              Learning happens everywhere, across industries, academia, and
              communities.
            </p>
          </Reveal>
        </div>

        <StaggerGrid className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {cards.map((card) => (
            <AccentCard key={card.title} {...card} />
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
