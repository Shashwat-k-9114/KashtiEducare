import { Compass, FlaskConical, Flag, Layers, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SVGProps } from "react";

import type { DirectionIcon } from "@/data/connect";

/** The five "bearing" directions map to a lucide glyph each. */
export const connectIconMap: Record<DirectionIcon, LucideIcon> = {
  participation: Users,
  exposure: Compass,
  stem: FlaskConical,
  leadership: Flag,
  experiential: Layers,
};

/**
 * lucide ships no brand marks. These are minimal hand-built glyphs in the
 * same 24×24 / currentColor / stroke-first convention as the lucide icons
 * used elsewhere, so they sit consistently beside them.
 */
type GlyphProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 18, ...rest }: GlyphProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...rest,
  };
}

export function InstagramGlyph(props: GlyphProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedInGlyph(props: GlyphProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <line x1="7.4" y1="10.5" x2="7.4" y2="16.5" />
      <circle cx="7.4" cy="7.3" r="0.95" fill="currentColor" stroke="none" />
      <path d="M11 16.5v-3.5c0-1.4 1-2.5 2.4-2.5s2.3 1.1 2.3 2.5v3.5" />
    </svg>
  );
}

export const socialGlyphMap: Record<"Instagram" | "LinkedIn", (p: GlyphProps) => React.ReactElement> = {
  Instagram: InstagramGlyph,
  LinkedIn: LinkedInGlyph,
};
