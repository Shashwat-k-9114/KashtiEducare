import { Users, CalendarRange, Clock, GraduationCap } from "lucide-react";

import { accentDeepVar, accentTint, accentVar, type Accent } from "@/components/AccentCard";
import type { ProgrammeMetadata } from "@/data/programs";

const tiles: Array<{ key: keyof ProgrammeMetadata; label: string; icon: typeof Users; accent: Accent }> = [
  { key: "recommendedFor", label: "Recommended For", icon: GraduationCap, accent: "gold" },
  { key: "suggestedLength", label: "Suggested Length", icon: Clock, accent: "teal" },
  { key: "recommendedMonths", label: "Recommended Months", icon: CalendarRange, accent: "coral" },
  { key: "groupSize", label: "Group Size", icon: Users, accent: "green" },
];

export function MetadataStrip({ metadata }: { metadata: ProgrammeMetadata }) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((tile) => (
          <div
            key={tile.key}
            className="rounded-xl border-t border-r border-b border-l-4 bg-kashti-bg-light p-5 shadow-[0_1px_2px_rgba(69,69,69,0.06)]"
            style={{ borderColor: "var(--kashti-border-light)", borderLeftColor: accentVar[tile.accent] }}
          >
            <div
              className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg"
              style={{ backgroundColor: accentTint[tile.accent] }}
            >
              <tile.icon size={18} strokeWidth={1.75} style={{ color: accentDeepVar[tile.accent] }} />
            </div>
            <p className="font-mono-label text-[11px] tracking-widest text-kashti-charcoal/50 uppercase">{tile.label}</p>
            <p className="font-display mt-1 text-lg font-semibold text-kashti-charcoal">{metadata[tile.key]}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-kashti-charcoal/45 italic">
        Estimated for planning purposes — confirmed with your program manager at proposal stage.
      </p>
    </div>
  );
}
