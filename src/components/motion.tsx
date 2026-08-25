"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const viewportOnce = { once: true, margin: "-100px" } as const;

/** Snappy, tactile press feedback for buttons/CTAs. */
export const tapHover = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.18 },
};

function useRevealVariants(offset: number, duration: number, delay: number): Variants {
  const reduce = useReducedMotion();
  return {
    hidden: { opacity: 0, y: reduce ? 0 : offset },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.01 : duration, ease: easeOutExpo, delay: reduce ? 0 : delay },
    },
  };
}

/**
 * Fades + translates a block up into place as it scrolls into view.
 * Fires once, a little before the element is fully visible.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  offset = 24,
  duration = 0.6,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  offset?: number;
  duration?: number;
}) {
  const variants = useRevealVariants(offset, duration, delay);
  return (
    <motion.div className={className} initial="hidden" whileInView="visible" viewport={viewportOnce} variants={variants}>
      {children}
    </motion.div>
  );
}

/** Orchestrates a staggered reveal across its motion-variant children. */
export function StaggerGrid({
  children,
  className,
  stagger = 0.1,
  delayChildren = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
}) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: reduce ? 0 : delayChildren },
    },
  };
  return (
    <motion.div className={className} initial="hidden" whileInView="visible" viewport={viewportOnce} variants={variants}>
      {children}
    </motion.div>
  );
}

/** A single staggered child within a StaggerGrid; inherits the parent's animation state. */
export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const variants = useRevealVariants(24, 0.5, 0);
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
