"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { accentVar, accentDeepVar, accentTint, type Accent } from "@/components/AccentCard";
import { easeOutExpo } from "@/components/motion";
import { iconMap } from "@/components/programs/icon-map";
import type { IconName } from "@/data/programs";

type CategoryCardProps = {
  href: string;
  icon: IconName;
  title: string;
  hook: string;
  description: string;
  cta: string;
  accent: Accent;
  number?: string;
  includes?: string[];
};

export function CategoryCard({ href, icon, title, hook, description, cta, accent, number, includes }: CategoryCardProps) {
  const Icon = iconMap[icon];
  const reduce = useReducedMotion();
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0.01 : 0.5, ease: easeOutExpo } },
  };

  return (
    <motion.div variants={itemVariants} className="h-full">
      <Link href={href} className="group block h-full">
        <motion.div
          whileHover={reduce ? undefined : { y: -6, boxShadow: "0 22px 40px -20px rgba(69,69,69,0.35)" }}
          transition={{ duration: 0.18 }}
          className="flex h-full flex-col rounded-xl border-t border-r border-b border-l-4 bg-kashti-bg-light p-6 shadow-[0_1px_2px_rgba(69,69,69,0.06)]"
          style={{ borderColor: "var(--kashti-border-light)", borderLeftColor: accentVar[accent] }}
        >
          <div className="flex items-center justify-between">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-lg border transition-transform duration-200 group-hover:scale-[1.08]"
              style={{ backgroundColor: accentTint[accent], borderColor: `color-mix(in srgb, ${accentVar[accent]} 25%, transparent)` }}
            >
              <Icon size={22} strokeWidth={1.75} style={{ color: accentDeepVar[accent] }} />
            </div>
            {number ? (
              <span
                className="font-mono-label text-xs font-semibold tracking-widest"
                style={{ color: accentDeepVar[accent] }}
              >
                {number}
              </span>
            ) : null}
          </div>

          <h3 className="font-display mt-4 text-xl font-semibold text-kashti-charcoal">{title}</h3>
          <p className="mt-1.5 text-sm font-medium italic text-kashti-charcoal/60">{hook}</p>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-kashti-charcoal/70">{description}</p>

          {includes && includes.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {includes.slice(0, 4).map((item) => (
                <li
                  key={item}
                  className="font-mono-label rounded-full border px-2.5 py-1 text-[10px] tracking-wide text-kashti-charcoal/55 uppercase"
                  style={{ borderColor: "var(--kashti-border-light)" }}
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : null}

          <span
            className="font-mono-label mt-5 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide"
            style={{ color: accentDeepVar[accent] }}
          >
            {cta.replace(/\s*→\s*$/, "")}
            <ArrowRight size={13} strokeWidth={2.25} className="transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </motion.div>
      </Link>
    </motion.div>
  );
}
