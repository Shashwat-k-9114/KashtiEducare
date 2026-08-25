"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";

import { easeOutExpo, tapHover } from "./motion";

const trustSignals = [
  "NEP 2020 Aligned",
  "Beyond Textbooks",
  "Real Connections",
  "Practical Exposure",
  "Future Ready",
];

export function Hero() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: reduce ? 0 : 0.1 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0.01 : 0.65, ease: easeOutExpo } },
  };

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-kashti-bg-light px-6 pt-20 pb-16 text-center lg:px-10 lg:pt-28 lg:pb-20"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, var(--kashti-green) 0%, transparent 70%)",
        }}
        initial={{ opacity: 0.08, scale: 1 }}
        animate={reduce ? { opacity: 0.08 } : { opacity: [0.06, 0.11, 0.06], scale: [1, 1.08, 1] }}
        transition={reduce ? undefined : { duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div className="relative mx-auto max-w-4xl" initial="hidden" animate="visible" variants={container}>
        <motion.span
          variants={item}
          className="font-mono-label inline-flex items-center gap-2 rounded-full border-2 border-kashti-gold/50 bg-kashti-gold/10 px-5 py-2 text-[11px] tracking-widest text-kashti-gold-deep uppercase shadow-[0_2px_12px_-4px_rgba(238,178,80,0.35)]"
        >
          <Compass size={13} strokeWidth={2.25} />
          Real World · Real Learning · Real Impact
        </motion.span>

        <motion.h1
          variants={item}
          className="font-display mt-6 text-4xl leading-tight font-semibold text-kashti-charcoal sm:text-5xl lg:text-6xl"
        >
          Preparing Learners for the World Beyond the Classroom
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-kashti-charcoal/70 sm:text-lg"
        >
          We connect learners with people, institutions, industries and ideas
          shaping the real world through meaningful, transformative
          experiences.
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <motion.a
            href="#formats"
            {...tapHover}
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-kashti-green px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-kashti-green-soft sm:w-auto"
          >
            Design Your Experience
            <ArrowRight size={16} strokeWidth={2.25} className="transition-transform duration-200 group-hover:translate-x-1" />
          </motion.a>
          <motion.a
            href="#formats"
            {...tapHover}
            className="w-full rounded-full border border-kashti-green px-7 py-3 text-sm font-semibold text-kashti-green transition-colors hover:bg-kashti-green/5 sm:w-auto"
          >
            Explore Programs
          </motion.a>
        </motion.div>

        <motion.ul variants={item} className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {trustSignals.map((signal) => (
            <li
              key={signal}
              className="font-mono-label text-[11px] tracking-wide text-kashti-charcoal/55 uppercase"
            >
              {signal}
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
