import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Static (server-rendered) building blocks for /connect. Hover/press
 * feedback is CSS-only so these stay off the client bundle.
 */

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kashti-green focus-visible:ring-offset-2";

function relAttrs(external?: boolean) {
  return external ? { target: "_blank" as const, rel: "noopener noreferrer" } : {};
}

/** The pill CTA — reserved for the few genuine primary actions. */
export function PrimaryAction({
  href,
  label,
  tone = "solid",
  external,
  download,
  full,
}: {
  href: string;
  label: string;
  tone?: "solid" | "outline" | "cream";
  external?: boolean;
  download?: boolean;
  /** full width until the sm breakpoint (used for the stacked hero actions). */
  full?: boolean;
}) {
  const toneClass =
    tone === "solid"
      ? "bg-kashti-green text-white hover:bg-kashti-green-soft"
      : tone === "cream"
        ? "bg-kashti-bg-light text-kashti-charcoal hover:bg-white"
        : "border border-kashti-green/45 text-kashti-green-deep hover:border-kashti-green hover:bg-kashti-green/5";

  return (
    <a
      href={href}
      download={download}
      {...relAttrs(external)}
      className={`group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-[background-color,border-color,transform] duration-200 active:scale-[0.98] focus-visible:ring-offset-kashti-bg-tint ${full ? "w-full sm:w-auto" : ""} ${focusRing} ${toneClass}`}
    >
      {label}
      <ArrowUpRight
        size={16}
        strokeWidth={2.25}
        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
    </a>
  );
}

/** Editorial text CTA: a short "course line" draws out before the arrow on hover. */
export function CourseLink({
  href,
  label,
  external,
  tone = "ink",
}: {
  href: string;
  label: string;
  external?: boolean;
  tone?: "ink" | "cream";
}) {
  const cream = tone === "cream";
  return (
    <a
      href={href}
      {...relAttrs(external)}
      className={`group font-mono-label inline-flex min-h-[44px] items-center gap-2.5 rounded-sm text-[11px] font-semibold tracking-[0.2em] uppercase ${focusRing} ${
        cream ? "text-kashti-bg-light" : "text-kashti-green-deep"
      }`}
    >
      {label}
      <span className="inline-flex items-center">
        <span
          className={`connect-course-line block h-px ${cream ? "bg-kashti-gold" : "bg-kashti-green-deep"}`}
          aria-hidden="true"
        />
        <ArrowRight
          size={14}
          strokeWidth={2.5}
          className="transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </a>
  );
}

/** Hairline tag used for theme / mode lists. */
export function Chip({ children, tone = "ink" }: { children: ReactNode; tone?: "ink" | "cream" }) {
  return (
    <li
      className={`rounded-full border px-3 py-1 text-[11px] leading-none ${
        tone === "cream" ? "border-white/20 text-kashti-bg-light/75" : "border-kashti-charcoal/20 text-kashti-charcoal/65"
      }`}
    >
      {children}
    </li>
  );
}
