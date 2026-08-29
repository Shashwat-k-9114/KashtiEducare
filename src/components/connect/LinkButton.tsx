"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";

import { accentDeepVar, accentTint, type Accent } from "@/components/AccentCard";
import { tapHover } from "@/components/motion";
import { connectIconMap } from "./BrandIcons";
import type { ConnectLink } from "@/data/connect";

function anchorRel(link: ConnectLink) {
  return link.external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};
}

/**
 * Large, filled call-to-action button for the top of /connect. Big tap
 * target (min 60px tall), high-contrast, one per row.
 */
export function PrimaryLink({ link, accent }: { link: ConnectLink; accent: Accent }) {
  const Icon = connectIconMap[link.icon];

  return (
    <motion.a
      href={link.href ?? "#"}
      {...anchorRel(link)}
      {...tapHover}
      className="flex min-h-[60px] items-center gap-4 rounded-xl px-5 py-3.5 text-left shadow-[0_6px_20px_-8px_rgba(69,69,69,0.35)]"
      style={{ backgroundColor: accentDeepVar[accent], color: "var(--kashti-bg-light)" }}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15">
        <Icon size={20} strokeWidth={1.9} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="font-display block text-base font-semibold">{link.label}</span>
        {link.description ? (
          <span className="block truncate text-xs text-white/85">{link.description}</span>
        ) : null}
      </span>
      <ArrowUpRight size={18} strokeWidth={2} className="shrink-0 text-white/70" aria-hidden="true" />
    </motion.a>
  );
}

/**
 * Bordered list tile — used for "useful destinations". Same visual
 * language as the site's AccentCard rows.
 */
export function TileLink({ link, accent }: { link: ConnectLink; accent: Accent }) {
  const Icon = connectIconMap[link.icon];

  return (
    <motion.a
      href={link.href ?? "#"}
      {...anchorRel(link)}
      {...tapHover}
      className="flex min-h-[60px] items-center gap-4 rounded-xl border bg-kashti-bg-light p-4 shadow-[0_1px_2px_rgba(69,69,69,0.06)] transition-colors hover:border-kashti-green/40"
      style={{ borderColor: "var(--kashti-border-light)" }}
    >
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: accentTint[accent] }}
      >
        <Icon size={20} strokeWidth={1.75} style={{ color: accentDeepVar[accent] }} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="font-display block text-base font-semibold text-kashti-charcoal">{link.label}</span>
        {link.description ? (
          <span className="block truncate text-sm text-kashti-charcoal/60">{link.description}</span>
        ) : null}
      </span>
      <ChevronRight size={18} strokeWidth={2} className="shrink-0 text-kashti-charcoal/30" aria-hidden="true" />
    </motion.a>
  );
}

/**
 * Square icon button for the social row. 56px tap target with a visible
 * accessible label (not a bare icon).
 */
export function SocialButton({ link }: { link: ConnectLink }) {
  const Icon = connectIconMap[link.icon];

  return (
    <motion.a
      href={link.href ?? "#"}
      {...anchorRel(link)}
      {...tapHover}
      aria-label={link.label}
      title={link.label}
      className="flex h-14 w-14 items-center justify-center rounded-xl border bg-kashti-bg-light text-kashti-charcoal shadow-[0_1px_2px_rgba(69,69,69,0.06)] transition-colors hover:border-kashti-green/40 hover:text-kashti-green-deep"
      style={{ borderColor: "var(--kashti-border-light)" }}
    >
      <Icon size={22} strokeWidth={1.75} />
    </motion.a>
  );
}
