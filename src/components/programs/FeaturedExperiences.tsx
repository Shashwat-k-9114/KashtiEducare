import { MapPin } from "lucide-react";

import { accentDeepVar, accentTint, accentVar, type Accent } from "@/components/AccentCard";
import type { FeaturedExperience } from "@/data/programs";

const accentCycle: Accent[] = ["gold", "teal", "coral", "green"];

export function FeaturedExperiences({ experiences }: { experiences: FeaturedExperience[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {experiences.map((experience, index) => {
        const accent = accentCycle[index % accentCycle.length];
        return (
          <div
            key={experience.name}
            className="rounded-xl border-t border-r border-b border-l-4 bg-kashti-bg-light p-5 shadow-[0_1px_2px_rgba(69,69,69,0.06)]"
            style={{ borderColor: "var(--kashti-border-light)", borderLeftColor: accentVar[accent] }}
          >
            <div className="flex items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ backgroundColor: accentTint[accent] }}
              >
                <MapPin size={15} strokeWidth={1.75} style={{ color: accentDeepVar[accent] }} />
              </div>
              <h4 className="font-display text-base font-semibold text-kashti-charcoal">{experience.name}</h4>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-kashti-charcoal/70">{experience.blurb}</p>
          </div>
        );
      })}
    </div>
  );
}
