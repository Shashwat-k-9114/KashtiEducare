"use client";

import { X } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";

import { StaggerGrid } from "@/components/motion";
import {
  formatLabels,
  type Audience,
  type PortfolioCategory,
  type PortfolioCategorySlug,
  type ProgramFormat,
  type Programme,
} from "@/data/programs";

import { ProgrammeCard } from "./ProgrammeCard";

const audienceOptions: { value: Audience; label: string }[] = [
  { value: "school", label: "School" },
  { value: "higher-education", label: "Higher Education" },
];

const formatOptions: ProgramFormat[] = ["one-day", "multi-day", "residential", "international"];

function useToggleSet<T>() {
  const [set, setSet] = useState<Set<T>>(new Set());
  const toggle = (value: T) => {
    setSet((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };
  const clear = () => setSet(new Set());
  return { set, toggle, clear };
}

export function ProgramsDirectory({
  programmes,
  portfolioCategories,
}: {
  programmes: Programme[];
  portfolioCategories: PortfolioCategory[];
}) {
  const audience = useToggleSet<Audience>();
  const interest = useToggleSet<PortfolioCategorySlug>();
  const format = useToggleSet<ProgramFormat>();

  const filtered = useMemo(() => {
    return programmes.filter((p) => {
      if (audience.set.size > 0 && !audience.set.has(p.audience)) return false;
      if (interest.set.size > 0 && !p.portfolioCategories.some((c) => interest.set.has(c))) return false;
      if (format.set.size > 0 && !p.formats.some((f) => format.set.has(f))) return false;
      return true;
    });
  }, [programmes, audience.set, interest.set, format.set]);

  const hasFilters = audience.set.size + interest.set.size + format.set.size > 0;

  return (
    <section id="directory" className="bg-kashti-bg-tint px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="font-display text-3xl font-semibold text-kashti-charcoal sm:text-4xl">
            Find the Right <span className="text-kashti-gold-deep">Programme</span>
          </h2>
          <p className="mt-3 text-kashti-charcoal/60">
            Filter the full catalogue by audience, interest and format.
          </p>
        </div>

        <div
          className="mt-10 space-y-5 rounded-2xl border bg-kashti-bg-light p-6"
          style={{ borderColor: "var(--kashti-border-light)" }}
        >
          <FilterGroup label="I'm looking for">
            {audienceOptions.map((opt) => (
              <FilterPill key={opt.value} active={audience.set.has(opt.value)} onClick={() => audience.toggle(opt.value)}>
                {opt.label}
              </FilterPill>
            ))}
          </FilterGroup>

          <FilterGroup label="Interested in">
            {portfolioCategories.map((cat) => (
              <FilterPill key={cat.slug} active={interest.set.has(cat.slug)} onClick={() => interest.toggle(cat.slug)}>
                {cat.title}
              </FilterPill>
            ))}
          </FilterGroup>

          <FilterGroup label="Format">
            {formatOptions.map((f) => (
              <FilterPill key={f} active={format.set.has(f)} onClick={() => format.toggle(f)}>
                {formatLabels[f]}
              </FilterPill>
            ))}
          </FilterGroup>

          {hasFilters ? (
            <button
              type="button"
              onClick={() => {
                audience.clear();
                interest.clear();
                format.clear();
              }}
              className="font-mono-label inline-flex items-center gap-1.5 text-xs tracking-wide text-kashti-charcoal/50 uppercase transition-colors hover:text-kashti-charcoal"
            >
              <X size={13} /> Clear filters
            </button>
          ) : null}
        </div>

        <p className="mt-8 text-center text-sm text-kashti-charcoal/50">
          {filtered.length} programme{filtered.length === 1 ? "" : "s"}
          {hasFilters ? " match your filters" : " in the catalogue"}
        </p>

        {filtered.length > 0 ? (
          <StaggerGrid className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
            {filtered.map((p, i) => (
              <ProgrammeCard key={p.slug} programme={p} index={i} />
            ))}
          </StaggerGrid>
        ) : (
          <p className="mt-10 text-center text-kashti-charcoal/50">
            No programmes match this combination yet — try clearing a filter.
          </p>
        )}
      </div>
    </section>
  );
}

function FilterGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="font-mono-label text-[11px] tracking-widest text-kashti-charcoal/45 uppercase">{label}</p>
      <div className="mt-2.5 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`font-mono-label rounded-full border px-3.5 py-1.5 text-[11px] font-medium tracking-wide uppercase transition-colors duration-150 ${
        active
          ? "border-kashti-green bg-kashti-green text-white"
          : "border-kashti-border-light bg-kashti-bg-light text-kashti-charcoal/65 hover:border-kashti-green/50"
      }`}
    >
      {children}
    </button>
  );
}
