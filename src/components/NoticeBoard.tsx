"use client";

import { useReducedMotion } from "framer-motion";
import { Camera, Download, FileText, Megaphone, Quote } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { accentDeepVar, accentTint, accentVar, type Accent } from "@/components/AccentCard";
import { Reveal, StaggerGrid, StaggerItem } from "@/components/motion";
import { getProgrammeBySlug } from "@/data/programs";

/**
 * Placeholder content — replace with real announcements once the
 * program/marketing calendar is finalised. Dates are illustrative only.
 */
const updates: { date: string; title: string }[] = [
  { date: "18 AUG 2026", title: "Winter cohort applications now open for Global Immersion Programmes" },
  { date: "05 AUG 2026", title: "New partnership: three additional Higher Education institutions onboarded" },
  { date: "27 JUL 2026", title: "STEM Tours adds a new Coimbatore–Siruvani circuit for the 2026–27 season" },
  { date: "14 JUL 2026", title: "Registration deadline: Placement Readiness Retreats, Batch 3" },
  { date: "02 JUL 2026", title: "Kashti Educare featured in NEP 2020 experiential-learning case studies" },
];

/** Placeholder downloads — swap for real, versioned files once available. */
const downloads: { title: string; meta: string }[] = [
  { title: "Higher Education Programme Brochure, 2026–27", meta: "PDF · 4.1 MB" },
  { title: "School Programs Catalogue, 2026–27", meta: "PDF · 3.6 MB" },
  { title: "Parent & Guardian Consent Form (Template)", meta: "PDF · 210 KB" },
  { title: "Safety & Risk Management Policy", meta: "PDF · 480 KB" },
  { title: "Partner Institution MOU (Template)", meta: "PDF · 190 KB" },
];

/** Placeholder field moments — replace with real photos/quotes per cohort. */
const fromTheField: { quote: string; attribution: string }[] = [
  {
    quote: "The founders didn't just talk about failure — they walked us through the actual decision, live.",
    attribution: "Founder Learning Expeditions · Pune cohort",
  },
  {
    quote: "Watching the launch pad up close made the physics chapter make sense in about four minutes.",
    attribution: "STEM Tours · Chennai–Sriharikota circuit",
  },
  {
    quote: "Nobody wanted the debrief circle to end on day three — that's when we knew it landed.",
    attribution: "Leadership Development Camps · Aravalli cohort",
  },
];

/** Placeholder cohort history — replace with real past-programme records once available. */
const recentExpeditions: { slug: string; date: string; location: string }[] = [
  { slug: "stem-tours", date: "Feb 2026", location: "Pune–Lonavala Circuit" },
  { slug: "leadership-development-camps", date: "Jan 2026", location: "Aravalli Hills, Rajasthan" },
  { slug: "global-immersion-programs", date: "Dec 2025", location: "Singapore & Malaysia" },
  { slug: "industrial-visits", date: "Nov 2025", location: "Pune Industrial Belt" },
  { slug: "trekking-expeditions", date: "Oct 2025", location: "Sahyadri Range" },
  { slug: "university-exposure-programs", date: "Sep 2025", location: "Bengaluru" },
];

function ColumnCard({ accent, icon: Icon, title, children }: { accent: Accent; icon: typeof Megaphone; title: string; children: React.ReactNode }) {
  return (
    <div
      className="flex h-full flex-col rounded-xl border-t border-r border-b border-l-4 bg-kashti-bg-light p-6 shadow-[0_1px_2px_rgba(69,69,69,0.06)]"
      style={{ borderColor: "var(--kashti-border-light)", borderLeftColor: accentVar[accent] }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          style={{ backgroundColor: accentTint[accent] }}
        >
          <Icon size={19} strokeWidth={1.75} style={{ color: accentDeepVar[accent] }} />
        </div>
        <h3 className="font-display text-lg font-semibold text-kashti-charcoal">{title}</h3>
      </div>
      <div className="mt-5 flex-1">{children}</div>
    </div>
  );
}

function FromTheFieldPanel() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % fromTheField.length);
        setVisible(true);
      }, 250);
    }, 5500);
    return () => clearInterval(id);
  }, [reduce]);

  const current = fromTheField[index];

  const goTo = (i: number) => {
    setVisible(false);
    setTimeout(() => {
      setIndex(i);
      setVisible(true);
    }, 200);
  };

  return (
    <div className="flex h-full flex-col">
      <div
        className="min-h-[128px] flex-1 transition-opacity duration-300"
        style={{ opacity: reduce ? 1 : visible ? 1 : 0 }}
      >
        <Quote size={20} strokeWidth={1.75} className="text-kashti-coral-deep/60" />
        <p className="font-display mt-3 text-base leading-relaxed text-kashti-charcoal">
          &ldquo;{current.quote}&rdquo;
        </p>
        <p className="font-mono-label mt-4 text-[11px] tracking-wide text-kashti-charcoal/50 uppercase">
          {current.attribution}
        </p>
      </div>
      <div className="mt-5 flex items-center gap-1.5">
        {fromTheField.map((entry, i) => (
          <button
            key={entry.attribution}
            type="button"
            aria-label={`Show field moment ${i + 1}`}
            onClick={() => goTo(i)}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === index ? "20px" : "8px",
              backgroundColor: i === index ? "var(--kashti-coral)" : "var(--kashti-border-light)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function NoticeBoard() {
  return (
    <section id="notice-board" className="bg-kashti-bg-light px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-kashti-charcoal sm:text-4xl">
              Notice <span className="text-kashti-gold-deep">Board</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-3 text-kashti-charcoal/60">What&apos;s new, what&apos;s downloadable, and what just happened in the field.</p>
          </Reveal>
        </div>

        <StaggerGrid className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3" stagger={0.1}>
          <StaggerItem className="h-full">
            <ColumnCard accent="gold" icon={Megaphone} title="Latest Updates">
              <ul className="divide-y" style={{ borderColor: "var(--kashti-border-light)" }}>
                {updates.map((update) => (
                  <li key={update.title} className="py-3 first:pt-0 last:pb-0">
                    <p className="font-mono-label text-[10px] tracking-widest text-kashti-gold-deep uppercase">{update.date}</p>
                    <p className="mt-1 text-sm leading-snug text-kashti-charcoal/80">{update.title}</p>
                  </li>
                ))}
              </ul>
              {/* TODO: route to a real updates archive once that page exists */}
              <a
                href="#"
                className="font-mono-label mt-5 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-kashti-gold-deep"
              >
                View All Updates →
              </a>
            </ColumnCard>
          </StaggerItem>

          <StaggerItem className="h-full">
            <ColumnCard accent="teal" icon={FileText} title="Resources & Downloads">
              <ul className="divide-y" style={{ borderColor: "var(--kashti-border-light)" }}>
                {downloads.map((file) => (
                  <li key={file.title} className="flex items-start gap-2.5 py-3 first:pt-0 last:pb-0">
                    <Download size={14} strokeWidth={2} className="mt-0.5 shrink-0 text-kashti-teal-deep/70" />
                    <div>
                      <p className="text-sm leading-snug text-kashti-charcoal/80">{file.title}</p>
                      <p className="font-mono-label mt-1 text-[10px] tracking-widest text-kashti-charcoal/45 uppercase">
                        {file.meta}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              {/* TODO: route to a real downloads archive once that page exists */}
              <a
                href="#"
                className="font-mono-label mt-5 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-kashti-teal-deep"
              >
                View All Downloads →
              </a>
            </ColumnCard>
          </StaggerItem>

          <StaggerItem className="h-full">
            <ColumnCard accent="coral" icon={Camera} title="From the Field">
              <FromTheFieldPanel />
            </ColumnCard>
          </StaggerItem>
        </StaggerGrid>

        <div className="mt-16">
          <Reveal>
            <h3 className="font-display text-xl font-semibold text-kashti-charcoal">Recent Expeditions</h3>
          </Reveal>
          <Reveal delay={0.06} className="mt-6">
            <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 lg:mx-0 lg:px-0">
              {recentExpeditions.map((entry) => {
                const programme = getProgrammeBySlug(entry.slug);
                if (!programme) return null;
                return (
                  <Link
                    key={entry.slug}
                    href={`/programs/experience/${entry.slug}`}
                    className="group w-64 shrink-0 snap-start overflow-hidden rounded-xl border bg-kashti-bg-light shadow-[0_1px_2px_rgba(69,69,69,0.06)] transition-transform duration-200 hover:-translate-y-1"
                    style={{ borderColor: "var(--kashti-border-light)" }}
                  >
                    <div
                      className="flex h-32 items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(135deg, color-mix(in srgb, var(--kashti-green) 18%, white), color-mix(in srgb, var(--kashti-gold) 22%, white))",
                      }}
                    >
                      {/* Placeholder visual — swap for a real cohort photo per entry */}
                      <Camera size={26} strokeWidth={1.5} className="text-white/70" />
                    </div>
                    <div className="p-4">
                      <p className="font-display text-sm font-semibold text-kashti-charcoal group-hover:text-kashti-green-deep">
                        {programme.title}
                      </p>
                      <p className="font-mono-label mt-1.5 text-[10px] tracking-widest text-kashti-charcoal/50 uppercase">
                        {entry.date} · {entry.location}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
