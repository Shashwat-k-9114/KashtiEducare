"use client";

import { Compass, Waves, Hammer, Wand2 } from "lucide-react";

import { AccentCard, type Accent } from "./AccentCard";
import { Reveal, StaggerGrid } from "./motion";

const steps: Array<{
  icon: typeof Compass;
  title: string;
  description: string;
  eyebrow: string;
  accent: Accent;
}> = [
  {
    icon: Compass,
    title: "Orient",
    description: "Spark curiosity through talks, panels and career conversations.",
    eyebrow: "Discovery",
    accent: "gold",
  },
  {
    icon: Waves,
    title: "Immerse",
    description: "Experience the real world through workshops, labs, and interactions.",
    eyebrow: "Exposure",
    accent: "teal",
  },
  {
    icon: Hammer,
    title: "Build",
    description: "Turn exposure into capability with multi-day journeys, challenges and projects.",
    eyebrow: "Capability",
    accent: "coral",
  },
  {
    icon: Wand2,
    title: "Transform",
    description: "Create deeper, lasting impact through leadership and capstones.",
    eyebrow: "Transformation",
    accent: "green",
  },
];

export function HowWeDeliver() {
  return (
    <section className="bg-kashti-bg-light px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-kashti-charcoal sm:text-4xl">
              How We <span className="text-kashti-gold-deep">Deliver</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 text-kashti-charcoal/60">
              From orientation to transformation: a structured pedagogy.
            </p>
          </Reveal>
        </div>

        <StaggerGrid className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {steps.map((step) => (
            <AccentCard key={step.title} {...step} />
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
