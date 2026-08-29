"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, Download } from "lucide-react";

import { accentDeepVar, accentTint, type Accent } from "@/components/AccentCard";
import { tapHover } from "@/components/motion";
import { connectIconMap } from "./BrandIcons";
import type { ConnectIconName } from "@/data/connect";

function anchorAttrs(external: boolean) {
  return external ? { target: "_blank" as const, rel: "noopener noreferrer" } : {};
}

/**
 * The main call-to-action link. `primary` = filled, high-contrast (hero +
 * conversion buttons). `secondary` = bordered surface button.
 */
export function ActionLink({
  href,
  label,
  sublabel,
  icon,
  accent = "green",
  tone = "primary",
  external = false,
}: {
  href: string;
  label: string;
  sublabel?: string;
  icon?: ConnectIconName;
  accent?: Accent;
  tone?: "primary" | "secondary";
  external?: boolean;
}) {
  const Icon = icon ? connectIconMap[icon] : null;
  const primary = tone === "primary";

  return (
    <motion.a
      href={href}
      {...anchorAttrs(external)}
      {...tapHover}
      className={`flex min-h-[58px] items-center gap-3.5 rounded-xl px-5 py-3 ${
        primary
          ? "shadow-[0_8px_24px_-10px_rgba(69,69,69,0.4)]"
          : "border bg-kashti-bg-light shadow-[0_1px_2px_rgba(69,69,69,0.06)]"
      }`}
      style={
        primary
          ? { backgroundColor: accentDeepVar[accent], color: "var(--kashti-bg-light)" }
          : { borderColor: "var(--kashti-border-light)", color: accentDeepVar[accent] }
      }
    >
      {Icon ? (
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
          style={primary ? { backgroundColor: "rgba(255,255,255,0.16)" } : { backgroundColor: accentTint[accent] }}
        >
          <Icon size={18} strokeWidth={1.9} />
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="font-display block text-[15px] leading-tight font-semibold">{label}</span>
        {sublabel ? (
          <span className={`block truncate text-xs ${primary ? "text-white/85" : "text-kashti-charcoal/55"}`}>
            {sublabel}
          </span>
        ) : null}
      </span>
      <ArrowUpRight size={17} strokeWidth={2} className={primary ? "text-white/75" : "opacity-45"} aria-hidden="true" />
    </motion.a>
  );
}

/** One guided-discovery shortcut in the "what does your school need" grid. */
export function NeedCard({
  href,
  label,
  icon,
  accent,
}: {
  href: string;
  label: string;
  icon: ConnectIconName;
  accent: Accent;
}) {
  const Icon = connectIconMap[icon];
  return (
    <motion.a
      href={href}
      {...tapHover}
      className="flex min-h-[92px] flex-col justify-between rounded-xl border bg-kashti-bg-light p-3.5 shadow-[0_1px_2px_rgba(69,69,69,0.06)] transition-colors hover:border-kashti-green/40"
      style={{ borderColor: "var(--kashti-border-light)" }}
    >
      <span
        className="flex h-9 w-9 items-center justify-center rounded-lg"
        style={{ backgroundColor: accentTint[accent] }}
      >
        <Icon size={18} strokeWidth={1.85} style={{ color: accentDeepVar[accent] }} />
      </span>
      <span className="mt-2 flex items-end justify-between gap-1">
        <span className="font-display text-[13.5px] leading-tight font-semibold text-kashti-charcoal">{label}</span>
        <ChevronRight size={15} strokeWidth={2.25} className="mb-0.5 shrink-0 text-kashti-charcoal/30" aria-hidden="true" />
      </span>
    </motion.a>
  );
}

/** Small inline CTA used inside offering cards and the conversation block. */
export function InlineCta({
  href,
  label,
  accent,
  external = false,
}: {
  href: string;
  label: string;
  accent: Accent;
  external?: boolean;
}) {
  return (
    <motion.a
      href={href}
      {...anchorAttrs(external)}
      {...tapHover}
      className="inline-flex min-h-[44px] items-center gap-1.5 self-start rounded-lg px-4 text-[13px] font-semibold"
      style={{ backgroundColor: accentDeepVar[accent], color: "var(--kashti-bg-light)" }}
    >
      {label}
      <ArrowUpRight size={15} strokeWidth={2.25} aria-hidden="true" />
    </motion.a>
  );
}

/** Call / WhatsApp / Email tile in the closing contact card. */
export function ContactTile({
  href,
  label,
  value,
  icon,
  accent,
  external = false,
}: {
  href: string;
  label: string;
  value: string;
  icon: ConnectIconName;
  accent: Accent;
  external?: boolean;
}) {
  const Icon = connectIconMap[icon];
  return (
    <motion.a
      href={href}
      {...anchorAttrs(external)}
      {...tapHover}
      aria-label={`${label} — ${value}`}
      className="flex min-h-[76px] flex-col items-center justify-center gap-1.5 rounded-xl border bg-kashti-bg-light px-2 py-3 text-center shadow-[0_1px_2px_rgba(69,69,69,0.06)] transition-colors hover:border-kashti-green/40"
      style={{ borderColor: "var(--kashti-border-light)" }}
    >
      <span
        className="flex h-9 w-9 items-center justify-center rounded-lg"
        style={{ backgroundColor: accentTint[accent] }}
      >
        <Icon size={18} strokeWidth={1.85} style={{ color: accentDeepVar[accent] }} />
      </span>
      <span className="font-mono-label text-[10px] tracking-widest text-kashti-charcoal/60 uppercase">{label}</span>
    </motion.a>
  );
}

/** "Save Our Contact" — downloads the static vCard from /public. */
export function SaveContactButton({ href, label }: { href: string; label: string }) {
  return (
    <motion.a
      href={href}
      download
      {...tapHover}
      className="flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-dashed px-5 text-[13px] font-semibold text-kashti-charcoal"
      style={{ borderColor: "color-mix(in srgb, var(--kashti-charcoal) 30%, transparent)" }}
    >
      <Download size={16} strokeWidth={2} aria-hidden="true" />
      {label}
    </motion.a>
  );
}

/** Square social icon button — only rendered when a real URL exists. */
export function SocialButton({ href, label, icon }: { href: string; label: string; icon: ConnectIconName }) {
  const Icon = connectIconMap[icon];
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...tapHover}
      aria-label={label}
      title={label}
      className="flex h-[52px] w-[52px] items-center justify-center rounded-xl border bg-kashti-bg-light text-kashti-charcoal shadow-[0_1px_2px_rgba(69,69,69,0.06)] transition-colors hover:border-kashti-green/40 hover:text-kashti-green-deep"
      style={{ borderColor: "var(--kashti-border-light)" }}
    >
      <Icon size={21} strokeWidth={1.75} />
    </motion.a>
  );
}
