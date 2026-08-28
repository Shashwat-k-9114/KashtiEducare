"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

import { accentDeepVar, accentTint, accentVar, type Accent } from "@/components/AccentCard";
import { tapHover } from "@/components/motion";
import { connectIconMap } from "./BrandIcons";
import type { ConnectLink } from "@/lib/connectValidation";

const CATEGORY_ACCENT: Record<string, Accent> = {
  social: "coral",
  contact: "green",
  programme: "gold",
  default: "teal",
};

function accentFor(category: string): Accent {
  return CATEGORY_ACCENT[category] ?? CATEGORY_ACCENT.default;
}

export function LinkButton({ link }: { link: ConnectLink }) {
  const searchParams = useSearchParams();
  const Icon = connectIconMap[link.icon] ?? connectIconMap.link;
  const accent = accentFor(link.category);

  const track = () => {
    try {
      const campaign = searchParams.get("src") ?? "";
      fetch("/api/connect/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ linkId: link.id, campaign }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // Tracking must never block or break navigation.
    }
  };

  return (
    <motion.a
      href={link.url}
      onClick={track}
      target={link.url.startsWith("http") ? "_blank" : undefined}
      rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
      {...tapHover}
      className="flex items-center gap-4 rounded-xl border bg-kashti-bg-light p-4 shadow-[0_1px_2px_rgba(69,69,69,0.06)] transition-colors hover:border-kashti-green/40"
      style={{ borderColor: "var(--kashti-border-light)" }}
    >
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: accentTint[accent] }}
      >
        <Icon size={20} strokeWidth={1.75} style={{ color: accentDeepVar[accent] }} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-display truncate text-base font-semibold text-kashti-charcoal">{link.name}</p>
        {link.description ? (
          <p className="truncate text-sm text-kashti-charcoal/60">{link.description}</p>
        ) : null}
      </div>
      <div
        className="h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: accentVar[accent] }}
        aria-hidden="true"
      />
    </motion.a>
  );
}
