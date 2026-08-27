"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { accentVar, accentDeepVar, type Accent } from "@/components/AccentCard";
import { easeOutExpo } from "@/components/motion";
import { formatLabels, type Programme } from "@/data/programs";

const accentCycle: Accent[] = ["gold", "teal", "coral", "green"];

export function ProgrammeCard({ programme, index = 0 }: { programme: Programme; index?: number }) {
  const reduce = useReducedMotion();
  const accent = accentCycle[index % accentCycle.length];
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0.01 : 0.45, ease: easeOutExpo } },
  };

  return (
    <motion.div variants={itemVariants} className="h-full">
      <Link href={`/programs/experience/${programme.slug}`} className="group block h-full">
        <motion.div
          whileHover={reduce ? undefined : { y: -5, boxShadow: "0 20px 36px -20px rgba(69,69,69,0.32)" }}
          transition={{ duration: 0.18 }}
          className="flex h-full flex-col rounded-xl border-t border-r border-b border-l-4 bg-kashti-bg-light p-5 shadow-[0_1px_2px_rgba(69,69,69,0.06)]"
          style={{ borderColor: "var(--kashti-border-light)", borderLeftColor: accentVar[accent] }}
        >
          <span
            className="font-mono-label text-[10px] font-semibold tracking-widest uppercase"
            style={{ color: accentDeepVar[accent] }}
          >
            {programme.audience === "school" ? "School" : "Higher Education"}
          </span>
          <h3 className="font-display mt-2 text-lg font-semibold text-kashti-charcoal">{programme.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-kashti-charcoal/70">{programme.description}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {programme.formats.map((format) => (
              <span
                key={format}
                className="font-mono-label rounded-full border px-2.5 py-1 text-[10px] tracking-wide text-kashti-charcoal/55 uppercase"
                style={{ borderColor: "var(--kashti-border-light)" }}
              >
                {formatLabels[format]}
              </span>
            ))}
          </div>

          <span
            className="font-mono-label mt-4 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide"
            style={{ color: accentDeepVar[accent] }}
          >
            View Programme
            <ArrowRight size={13} strokeWidth={2.25} className="transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </motion.div>
      </Link>
    </motion.div>
  );
}
