"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eye, Wrench, Sun } from "lucide-react";

import { accentVar, accentDeepVar, type Accent } from "./AccentCard";
import { Reveal, StaggerGrid, StaggerItem } from "./motion";
import { WakeLine } from "./WakeLine";

const steps: Array<{
  icon: typeof Eye;
  step: string;
  title: string;
  description: string;
  accent: Accent;
}> = [
  {
    icon: Eye,
    step: "Step 01",
    title: "See",
    description:
      "Learners encounter real environments, industries, institutions, experts, and ideas.",
    accent: "gold",
  },
  {
    icon: Wrench,
    step: "Step 02",
    title: "Build",
    description:
      "Strengthen critical thinking, communication, collaboration, leadership and problem-solving.",
    accent: "teal",
  },
  {
    icon: Sun,
    step: "Step 03",
    title: "Become",
    description:
      "Explore interests, career pathways and higher education opportunities with clarity and confidence.",
    accent: "coral",
  },
];

export function ExperienceModel() {
  const reduce = useReducedMotion();

  return (
    <section id="experience-model" className="bg-kashti-bg-tint px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-kashti-charcoal sm:text-4xl">
              The Kashti <span className="text-kashti-gold-deep">Experience</span> Model
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 text-kashti-charcoal/60">
              From exposure to capability to clarity: a journey that transforms.
            </p>
          </Reveal>
        </div>

        <StaggerGrid
          className="mt-14 flex flex-col items-stretch lg:flex-row lg:items-center"
          stagger={0.15}
        >
          {steps.map((step, index) => (
            <div key={step.title} className="flex flex-1 flex-col items-stretch lg:flex-row lg:items-center">
              <StaggerItem className="flex-1">
                <motion.div
                  whileHover={reduce ? undefined : { y: -6, boxShadow: "0 22px 40px -20px rgba(69,69,69,0.35)" }}
                  transition={{ duration: 0.18 }}
                  className="h-full rounded-xl border-t border-r border-b border-l-4 bg-kashti-bg-light p-7 shadow-[0_1px_2px_rgba(69,69,69,0.06)]"
                  style={{
                    borderColor: "var(--kashti-border-light)",
                    borderLeftColor: accentVar[step.accent],
                  }}
                >
                  <span
                    className="font-mono-label text-[11px] tracking-widest uppercase"
                    style={{ color: accentDeepVar[step.accent] }}
                  >
                    {step.step}
                  </span>
                  <div
                    className="mt-4 flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: "color-mix(in srgb, var(--kashti-charcoal) 6%, transparent)" }}
                  >
                    <step.icon size={22} strokeWidth={1.75} style={{ color: accentDeepVar[step.accent] }} />
                  </div>
                  <h3 className="font-display mt-4 text-xl font-semibold text-kashti-charcoal">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-kashti-charcoal/70">
                    {step.description}
                  </p>
                </motion.div>
              </StaggerItem>

              {index < steps.length - 1 ? (
                <>
                  <WakeLine
                    orientation="vertical"
                    tone="onLight"
                    className="mx-auto block h-10 w-6 shrink-0 lg:hidden"
                  />
                  <WakeLine
                    orientation="horizontal"
                    tone="onLight"
                    className="hidden h-6 w-10 shrink-0 lg:mx-3 lg:block"
                  />
                </>
              ) : null}
            </div>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
