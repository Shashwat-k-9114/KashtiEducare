import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionLink({ href, label }: { href: string; label: string }) {
  return (
    <div className="mt-10 text-center">
      <Link
        href={href}
        className="group font-mono-label inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-kashti-green-deep uppercase"
      >
        {label}
        <ArrowRight size={13} strokeWidth={2.25} className="transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
