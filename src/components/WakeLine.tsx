"use client";

import { motion, useReducedMotion } from "framer-motion";

import { easeOutExpo, viewportOnce } from "./motion";

type WakeLineProps = {
  className?: string;
  orientation?: "horizontal" | "vertical";
  /**
   * "onDark" keeps the original light green→gold gradient (for the deep
   * Statement Banner anchor). "onLight" swaps to a charcoal→green-deep
   * stroke so the motif stays visible against light-theme sections.
   */
  tone?: "onDark" | "onLight";
};

const paths = {
  vertical: "M20 2 C34 16 6 28 20 42 C34 56 6 68 20 82",
  horizontal: "M2 20 C40 4 60 36 100 20 C140 4 160 36 200 20 C240 4 260 36 300 20 C340 4 360 36 398 20",
};

const arrowPath = "M13 76 L20 84 L27 76";

/**
 * Hand-drawn wake/current line motif (echoes the sailboat wake in the
 * Kashti logo). Draws itself on as it scrolls into view, rather than
 * appearing pre-rendered, since the "current" is the site's one motif
 * unique to this brand.
 */
export function WakeLine({ className = "", orientation = "horizontal", tone = "onLight" }: WakeLineProps) {
  const reduce = useReducedMotion();
  const gradientId = `kashti-wake-gradient-${orientation === "vertical" ? "v" : "h"}-${tone}`;
  const d = orientation === "vertical" ? paths.vertical : paths.horizontal;
  const viewBox = orientation === "vertical" ? "0 0 40 90" : "0 0 400 40";
  const stops =
    tone === "onDark" ? (
      <>
        <stop stopColor="var(--kashti-green-soft)" />
        <stop offset="0.5" stopColor="var(--kashti-gold-soft)" />
        <stop offset="1" stopColor="var(--kashti-gold)" />
      </>
    ) : (
      <>
        <stop stopColor="var(--kashti-green-deep)" />
        <stop offset="1" stopColor="var(--kashti-charcoal)" />
      </>
    );

  return (
    <svg viewBox={viewBox} fill="none" className={className} preserveAspectRatio="none" aria-hidden="true">
      <motion.path
        d={d}
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0.85 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: reduce ? 0 : 1.3, ease: easeOutExpo }}
      />
      <motion.path
        d={d}
        stroke={`url(#${gradientId})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="1 9"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        viewport={viewportOnce}
        transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.9 }}
      />
      {orientation === "vertical" ? (
        <motion.path
          d={arrowPath}
          stroke="var(--kashti-gold-deep)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : 1.3 }}
        />
      ) : null}
      <defs>
        <linearGradient
          id={gradientId}
          x1={orientation === "vertical" ? "20" : "0"}
          y1={orientation === "vertical" ? "0" : "20"}
          x2={orientation === "vertical" ? "20" : "400"}
          y2={orientation === "vertical" ? "90" : "20"}
          gradientUnits="userSpaceOnUse"
        >
          {stops}
        </linearGradient>
      </defs>
    </svg>
  );
}
