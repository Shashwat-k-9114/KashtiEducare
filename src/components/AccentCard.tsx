"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { easeOutExpo } from "./motion";

export type Accent = "gold" | "teal" | "coral" | "green";

const accentVar: Record<Accent, string> = {
  gold: "var(--kashti-gold)",
  teal: "var(--kashti-teal)",
  coral: "var(--kashti-coral)",
  green: "var(--kashti-green-soft)",
};

/** AA-safe text/icon-stroke shades for use directly on light surfaces. */
const accentDeepVar: Record<Accent, string> = {
  gold: "var(--kashti-gold-deep)",
  teal: "var(--kashti-teal-deep)",
  coral: "var(--kashti-coral-deep)",
  green: "var(--kashti-green-deep)",
};

const accentTint: Record<Accent, string> = {
  gold: "rgba(238, 178, 80, 0.14)",
  teal: "rgba(45, 156, 143, 0.14)",
  coral: "rgba(232, 102, 79, 0.14)",
  green: "rgba(26, 168, 118, 0.14)",
};

type AccentCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: Accent;
  eyebrow?: string;
  className?: string;
};

export function AccentCard({ icon: Icon, title, description, accent, eyebrow, className = "" }: AccentCardProps) {
  const reduce = useReducedMotion();
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0.01 : 0.5, ease: easeOutExpo } },
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={reduce ? undefined : { y: -6, boxShadow: "0 22px 40px -20px rgba(69,69,69,0.35)" }}
      transition={{ duration: 0.18 }}
      className={`group rounded-xl border-t border-r border-b border-l-4 bg-kashti-bg-light p-6 shadow-[0_1px_2px_rgba(69,69,69,0.06)] ${className}`}
      style={{
        borderColor: "var(--kashti-border-light)",
        borderLeftColor: accentVar[accent],
      }}
    >
      <div
        className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border transition-transform duration-200 group-hover:scale-[1.08]"
        style={{ backgroundColor: accentTint[accent], borderColor: `color-mix(in srgb, ${accentVar[accent]} 25%, transparent)` }}
      >
        <Icon size={22} strokeWidth={1.75} style={{ color: accentDeepVar[accent] }} />
      </div>
      <h3 className="font-display text-lg font-semibold text-kashti-charcoal">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-kashti-charcoal/70">{description}</p>
      {eyebrow ? (
        <span
          className="font-mono-label mt-4 inline-block text-[11px] tracking-widest uppercase"
          style={{ color: accentDeepVar[accent] }}
        >
          {eyebrow}
        </span>
      ) : null}
    </motion.div>
  );
}

export function AccentGlyph({ accent, children }: { accent: Accent; children: ReactNode }) {
  return (
    <div
      className="flex h-12 w-12 items-center justify-center rounded-full"
      style={{ backgroundColor: accentTint[accent], color: accentDeepVar[accent] }}
    >
      {children}
    </div>
  );
}

export { accentVar, accentDeepVar, accentTint };
