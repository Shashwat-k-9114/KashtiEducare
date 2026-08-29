import {
  BookOpen,
  Calendar,
  Compass,
  FlaskConical,
  Flag,
  Globe,
  Images,
  Layers,
  Mail,
  Phone,
  Rocket,
  Sparkles,
  Users,
} from "lucide-react";
import type { SVGProps } from "react";

import type { ConnectIconName } from "@/data/connect";

/**
 * lucide-react ships no brand/logo marks (its policy excludes trademarked
 * logos — no Instagram/LinkedIn/YouTube/Facebook/WhatsApp export). Rather
 * than add an icon-package dependency for a handful of glyphs, these are
 * small hand-built SVGs in the same 24x24 / currentColor / stroke-first
 * convention as the lucide icons used elsewhere on the site.
 */

type IconProps = SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number };

function svgProps({ size = 20, strokeWidth = 1.75, ...rest }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...rest,
  };
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <path d="M4 20l1.3-3.8A8 8 0 1 1 8.6 19L4 20Z" />
      <path
        d="M9 10.2c0 3 2.6 5.6 5.6 5.6.5 0 1-.6.9-1.1l-.2-1a.8.8 0 0 0-.9-.6l-1.1.2a4.6 4.6 0 0 1-2.9-2.9l.2-1.1a.8.8 0 0 0-.6-.9l-1-.2c-.5-.1-1.1.4-1.1.9Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <line x1="7.5" y1="10.5" x2="7.5" y2="16.5" />
      <circle cx="7.5" cy="7.3" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11 16.5v-3.6c0-1.4 1-2.4 2.4-2.4s2.1 1 2.1 2.4v3.6" />
    </svg>
  );
}

export function YouTubeIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <rect x="3" y="5.5" width="18" height="13" rx="4" />
      <path d="M10.5 9.3v5.4l4.7-2.7-4.7-2.7Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M13.8 20.3v-6.1h2l.3-2.4h-2.3V10.3c0-.7.2-1.2 1.2-1.2h1.3V7c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.1-3.2 3.3v1.8h-2.1v2.4h2.1v6.1" />
    </svg>
  );
}

type ConnectIcon = (props: IconProps) => React.ReactElement;

/** Every `icon` value used in src/data/connect.ts resolves to a component here. */
export const connectIconMap: Record<ConnectIconName, ConnectIcon> = {
  calendar: Calendar as ConnectIcon,
  whatsapp: WhatsAppIcon,
  phone: Phone as ConnectIcon,
  email: Mail as ConnectIcon,
  participation: Users as ConnectIcon,
  exposure: Compass as ConnectIcon,
  stem: FlaskConical as ConnectIcon,
  leadership: Flag as ConnectIcon,
  experiential: Layers as ConnectIcon,
  rocket: Rocket as ConnectIcon,
  magazine: BookOpen as ConnectIcon,
  custom: Sparkles as ConnectIcon,
  gallery: Images as ConnectIcon,
  website: Globe as ConnectIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
  facebook: FacebookIcon,
};
