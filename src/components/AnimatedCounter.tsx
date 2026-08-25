"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

import { easeOutExpo } from "./motion";

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

/** Counts up from 0 to `value` once, the moment it scrolls into view. */
export function AnimatedCounter({ value, suffix = "", duration = 1.8, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduce = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    if (!isInView) return;
    if (reduce) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, { duration, ease: easeOutExpo });
    return controls.stop;
  }, [isInView, reduce, value, duration, count]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
