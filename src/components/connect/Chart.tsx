"use client";

import { motion, useReducedMotion, useScroll } from "framer-motion";

/**
 * Thin scroll-progress bar pinned to the top of the viewport — the one
 * piece of the wayfinding system that needs JS. Everything else (the
 * dashed route, the waypoints, the buoy) is static CSS in Stage.tsx.
 */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-kashti-green via-kashti-green-soft to-kashti-gold"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
