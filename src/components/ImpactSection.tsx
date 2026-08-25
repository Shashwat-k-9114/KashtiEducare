"use client";

import { BookOpen, Sparkles, Rocket, FileText, Trophy, Link2 } from "lucide-react";

import { AccentCard, type Accent } from "./AccentCard";
import { AnimatedCounter } from "./AnimatedCounter";
import { Reveal, StaggerGrid, StaggerItem } from "./motion";

const stats = [
  { value: 5000, label: "Learners Reached" },
  { value: 100, label: "Institutions Engaged" },
  { value: 500, label: "Experiential Programs" },
];

const cards: Array<{
  icon: typeof BookOpen;
  title: string;
  description: string;
  accent: Accent;
}> = [
  {
    icon: BookOpen,
    title: "Curriculum Enrichment",
    description: "Extend learning beyond the classroom.",
    accent: "gold",
  },
  {
    icon: Sparkles,
    title: "Student Engagement",
    description: "Create meaningful and memorable experiences.",
    accent: "teal",
  },
  {
    icon: Rocket,
    title: "Future Readiness",
    description: "Build awareness, skills and career clarity.",
    accent: "coral",
  },
  {
    icon: FileText,
    title: "NEP-Aligned Learning",
    description: "Support experiential, multidisciplinary and practical learning.",
    accent: "gold",
  },
  {
    icon: Trophy,
    title: "Institutional Differentiation",
    description: "Strengthen learning ecosystem and student experience.",
    accent: "gold",
  },
  {
    icon: Link2,
    title: "Industry-Academia Bridge",
    description: "Connect learners with real-world practitioners.",
    accent: "teal",
  },
];

export function ImpactSection() {
  return (
    <section id="impact" className="bg-kashti-bg-tint px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-kashti-charcoal sm:text-4xl">
              Our <span className="text-kashti-gold-deep">Impact</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 text-kashti-charcoal/60">
              What institutions gain: measurable, meaningful outcomes.
            </p>
          </Reveal>
        </div>

        <StaggerGrid
          className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-8 text-center sm:grid-cols-3"
          stagger={0.12}
          delayChildren={0.1}
        >
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <p className="font-display text-4xl font-bold text-kashti-gold-deep sm:text-5xl">
                <AnimatedCounter value={stat.value} suffix="+" />
              </p>
              <p className="font-mono-label mt-2 text-xs tracking-wide text-kashti-charcoal/55 uppercase">
                {stat.label}
              </p>
            </StaggerItem>
          ))}
        </StaggerGrid>

        <StaggerGrid className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {cards.map((card) => (
            <AccentCard key={card.title} {...card} />
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
