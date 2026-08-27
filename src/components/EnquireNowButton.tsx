"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { trackEvent } from "@/lib/analytics";

export function EnquireNowButton({ programmeTitle }: { programmeTitle: string }) {
  return (
    <Link
      href={`/contact?program=${encodeURIComponent(programmeTitle)}`}
      onClick={() => trackEvent("enquire_now_click", { programme: programmeTitle })}
      className="group mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-kashti-gold px-7 py-3 text-sm font-semibold text-kashti-charcoal shadow-[0_4px_16px_-4px_rgba(238,178,80,0.5)]"
    >
      Enquire Now
      <ArrowRight size={16} strokeWidth={2.25} className="transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}
