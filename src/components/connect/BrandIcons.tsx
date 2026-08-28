import { FileText, Globe, GraduationCap, Link2, Mail, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SVGProps } from "react";

/**
 * lucide-react ships no brand/logo marks (confirmed: no Instagram,
 * Linkedin, Youtube, or Facebook export in the installed version —
 * lucide's policy excludes trademarked logos). Rather than add a new
 * icon-package dependency for five glyphs, these are small hand-built
 * SVGs in the same 24x24 / currentColor / stroke-first convention the
 * rest of the site's lucide icons use, so they sit visually consistent
 * next to lucide icons in the same tile.
 */

type IconProps = SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number };

function iconBase(props: IconProps) {
  const { size = 20, strokeWidth = 1.75, ...rest } = props;
  return { size, strokeWidth, rest };
}

export function WhatsAppIcon(props: IconProps) {
  const { size, strokeWidth, rest } = iconBase(props);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <path d="M4 20l1.3-3.8A8 8 0 1 1 8.6 19L4 20Z" />
      <path d="M9 10.2c0 3 2.6 5.6 5.6 5.6.5 0 1-.6.9-1.1l-.2-1a.8.8 0 0 0-.9-.6l-1.1.2a4.6 4.6 0 0 1-2.9-2.9l.2-1.1a.8.8 0 0 0-.6-.9l-1-.2c-.5-.1-1.1.4-1.1.9Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  const { size, strokeWidth, rest } = iconBase(props);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  const { size, strokeWidth, rest } = iconBase(props);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <line x1="7.5" y1="10.5" x2="7.5" y2="16.5" />
      <circle cx="7.5" cy="7.3" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11 16.5v-3.6c0-1.4 1-2.4 2.4-2.4s2.1 1 2.1 2.4v3.6" />
    </svg>
  );
}

export function YouTubeIcon(props: IconProps) {
  const { size, strokeWidth, rest } = iconBase(props);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <rect x="3" y="5.5" width="18" height="13" rx="4" />
      <path d="M10.5 9.3v5.4l4.7-2.7-4.7-2.7Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  const { size, strokeWidth, rest } = iconBase(props);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M13.8 20.3v-6.1h2l.3-2.4h-2.3V10.3c0-.7.2-1.2 1.2-1.2h1.3V7c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.1-3.2 3.3v1.8h-2.1v2.4h2.1v6.1" />
    </svg>
  );
}

/** Link "icon" values (stored on the Link record) map to a renderable component here. */
export const connectIconMap: Record<string, LucideIcon | ((props: IconProps) => React.ReactElement)> = {
  whatsapp: WhatsAppIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
  facebook: FacebookIcon,
  website: Globe,
  email: Mail,
  phone: Phone,
  brochure: FileText,
  admissions: GraduationCap,
  link: Link2,
};

export const connectIconOptions = Object.keys(connectIconMap);
