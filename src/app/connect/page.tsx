import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { connectIconMap } from "@/components/connect/BrandIcons";
import {
  ActionLink,
  ContactTile,
  InlineCta,
  NeedCard,
  SaveContactButton,
  SocialButton,
} from "@/components/connect/LinkButton";
import { Reveal, StaggerGrid, StaggerItem } from "@/components/motion";
import {
  closing,
  contactActions,
  conversation,
  exploreLinks,
  experiencesInAction,
  hero,
  needShortcuts,
  needsHeading,
  primaryOfferings,
  saveContact,
  visibleSocials,
  type Offering,
} from "@/data/connect";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Connect",
  description:
    "Kashti Educare — experiences that expand exposure, perspective and resilience. Explore what's possible for your students, and start the conversation.",
  path: "/connect",
});

// Fully static — every destination is a real route, asset, or a deep-link
// into the existing /contact flow. No backend, no data fetching. See
// src/data/connect.ts for the single source of truth.

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono-label text-[11px] tracking-[0.2em] text-kashti-charcoal/40 uppercase">{children}</p>
  );
}

function OfferingCard({ offering }: { offering: Offering }) {
  const Icon = connectIconMap[offering.icon];
  return (
    <div
      className="rounded-2xl border-t border-r border-b border-l-4 bg-kashti-bg-light p-5 shadow-[0_1px_2px_rgba(69,69,69,0.06)]"
      style={{ borderColor: "var(--kashti-border-light)", borderLeftColor: `var(--kashti-${offering.accent === "green" ? "green-soft" : offering.accent})` }}
    >
      <div className="flex items-start gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: `color-mix(in srgb, var(--kashti-${offering.accent === "green" ? "green-soft" : offering.accent}) 14%, transparent)` }}
        >
          <Icon size={19} strokeWidth={1.8} style={{ color: `var(--kashti-${offering.accent}-deep)` }} />
        </span>
        <div className="min-w-0 flex-1">
          <span className="font-mono-label text-[10px] tracking-[0.2em] text-kashti-charcoal/35 uppercase">
            {offering.number}
            {offering.brand ? <span className="text-kashti-gold-deep"> · {offering.brand}</span> : null}
          </span>
          <h3 className="font-display mt-1 text-lg leading-snug font-semibold text-kashti-charcoal">{offering.title}</h3>
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-kashti-charcoal/70">{offering.copy}</p>

      {offering.themes ? (
        <ul className="mt-3.5 flex flex-wrap gap-1.5">
          {offering.themes.map((theme) => (
            <li
              key={theme}
              className="rounded-md border px-2 py-1 text-[11px] leading-none text-kashti-charcoal/65"
              style={{ borderColor: "var(--kashti-border-light)" }}
            >
              {theme}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-4">
        {offering.cta ? (
          <InlineCta href={offering.cta.href} label={offering.cta.label} accent={offering.accent} external={offering.cta.external} />
        ) : (
          <span className="font-mono-label inline-flex items-center rounded-lg border border-dashed px-3 py-2 text-[11px] tracking-widest text-kashti-charcoal/45 uppercase"
            style={{ borderColor: "color-mix(in srgb, var(--kashti-charcoal) 25%, transparent)" }}
          >
            {offering.note}
          </span>
        )}
      </div>
    </div>
  );
}

export default function ConnectPage() {
  const socials = visibleSocials();

  return (
    <main className="min-h-screen bg-kashti-bg-tint px-5 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-lg">
        {/* ---- Section 1 — Hero / digital visiting card ---- */}
        <header className="text-center">
          <Reveal>
            <Image
              src="/logo.jpeg"
              alt="Kashti Educare"
              width={76}
              height={76}
              priority
              className="mx-auto h-[72px] w-[72px] rounded-2xl object-cover shadow-[0_10px_30px_-10px_rgba(69,69,69,0.4)]"
            />
          </Reveal>
          <Reveal delay={0.05}>
            <p className="font-mono-label mt-4 text-[11px] tracking-[0.28em] text-kashti-green-deep uppercase">
              {hero.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display mt-3 text-[26px] leading-[1.2] font-semibold text-kashti-charcoal sm:text-[30px]">
              {hero.heading}
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-3 max-w-sm text-[13px] leading-relaxed text-kashti-charcoal/60">
              {hero.supporting}
            </p>
          </Reveal>
        </header>

        <StaggerGrid className="mt-7 flex flex-col gap-2.5" stagger={0.06}>
          {hero.actions.map((action) => (
            <StaggerItem key={action.label}>
              <ActionLink
                href={action.href}
                label={action.label}
                sublabel={action.sublabel}
                icon={action.icon}
                accent={action.tone === "primary" ? "green" : "teal"}
                tone={action.tone}
                external={action.external}
              />
            </StaggerItem>
          ))}
        </StaggerGrid>

        {/* ---- Section 2 — What does your school need right now? ---- */}
        <section className="mt-14">
          <Reveal>
            <SectionLabel>Start Here</SectionLabel>
            <h2 className="font-display mt-1.5 text-xl leading-snug font-semibold text-kashti-charcoal">
              {needsHeading}
            </h2>
          </Reveal>
          <StaggerGrid className="mt-4 grid grid-cols-2 gap-2.5" stagger={0.05}>
            {needShortcuts.map((need, i) => {
              const isLoneLast = i === needShortcuts.length - 1 && needShortcuts.length % 2 !== 0;
              return (
                <StaggerItem key={need.label} className={isLoneLast ? "col-span-2" : undefined}>
                  <NeedCard href={need.href} label={need.label} icon={need.icon} accent={need.accent} />
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </section>

        {/* ---- Section 3 — Primary offerings ---- */}
        <section className="mt-14">
          <Reveal>
            <SectionLabel>What Kashti Can Do</SectionLabel>
          </Reveal>
          <StaggerGrid className="mt-4 flex flex-col gap-3.5" stagger={0.06}>
            {primaryOfferings.map((offering) => (
              <StaggerItem key={offering.number}>
                <OfferingCard offering={offering} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </section>

        {/* ---- Section 4 — Explore more (lighter) ---- */}
        <section className="mt-14">
          <Reveal>
            <SectionLabel>Explore More</SectionLabel>
          </Reveal>
          <Reveal delay={0.05} className="mt-4">
            <div
              className="rounded-2xl border bg-kashti-bg-light p-5 shadow-[0_1px_2px_rgba(69,69,69,0.06)]"
              style={{ borderColor: "var(--kashti-border-light)" }}
            >
              <h3 className="font-display text-base font-semibold text-kashti-charcoal">{experiencesInAction.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-kashti-charcoal/65">{experiencesInAction.copy}</p>
              <div className="mt-3.5">
                <InlineCta href={experiencesInAction.cta.href} label={experiencesInAction.cta.label} accent="teal" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2">
            {exploreLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono-label text-[11px] tracking-widest text-kashti-charcoal/50 uppercase transition-colors hover:text-kashti-green-deep"
              >
                {link.label}
              </Link>
            ))}
          </Reveal>
        </section>

        {/* ---- Section 5 — School-leader conversation ---- */}
        <section className="mt-14">
          <Reveal>
            <div
              className="rounded-2xl border p-5"
              style={{ borderColor: "var(--kashti-border-light)", backgroundColor: "var(--kashti-bg-light)" }}
            >
              <h2 className="font-display text-lg leading-snug font-semibold text-kashti-charcoal">
                {conversation.heading}
              </h2>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {conversation.modes.map((mode) => (
                  <li
                    key={mode}
                    className="rounded-md px-2 py-1 text-[11px] leading-none text-kashti-charcoal/65"
                    style={{ backgroundColor: "var(--kashti-bg-tint)" }}
                  >
                    {mode}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-col gap-2.5">
                <ActionLink
                  href={conversation.primary.href}
                  label={conversation.primary.label}
                  icon="calendar"
                  accent="green"
                  tone="primary"
                  external={conversation.primary.external}
                />
                <ActionLink
                  href={conversation.secondary.href}
                  label={conversation.secondary.label}
                  icon="whatsapp"
                  accent="teal"
                  tone="secondary"
                  external={conversation.secondary.external}
                />
              </div>
            </div>
          </Reveal>
        </section>

        {/* ---- Section 6 — Closing / digital contact card ---- */}
        <section className="mt-14 text-center">
          <Reveal>
            <SectionLabel>{closing.heading}</SectionLabel>
            <p className="font-display mx-auto mt-2 max-w-xs text-lg leading-snug font-semibold text-kashti-charcoal">
              {closing.statement}
            </p>
          </Reveal>

          <StaggerGrid className="mt-5 grid grid-cols-3 gap-2.5" stagger={0.05}>
            {contactActions.map((action) => (
              <StaggerItem key={action.label}>
                <ContactTile
                  href={action.href}
                  label={action.label}
                  value={action.value}
                  icon={action.icon}
                  accent={action.label === "Email" ? "gold" : action.label === "Call" ? "teal" : "green"}
                  external={action.external}
                />
              </StaggerItem>
            ))}
          </StaggerGrid>

          <Reveal delay={0.1} className="mt-2.5">
            <SaveContactButton href={saveContact.href} label={saveContact.label} />
          </Reveal>

          {socials.length > 0 ? (
            <Reveal delay={0.15} className="mt-5 flex justify-center gap-2.5">
              {socials.map((social) => (
                <SocialButton key={social.label} href={social.href as string} label={social.label} icon={social.icon} />
              ))}
            </Reveal>
          ) : null}

          <Reveal delay={0.2} className="mt-10">
            <Link
              href="/"
              className="font-mono-label text-[10px] tracking-[0.22em] text-kashti-charcoal/35 uppercase transition-colors hover:text-kashti-green-deep"
            >
              kashtieducare.com
            </Link>
          </Reveal>
        </section>
      </div>
    </main>
  );
}
