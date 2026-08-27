import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { PageHeader } from "@/components/programs/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/motion";
import { accentDeepVar, accentTint, accentVar, type Accent } from "@/components/AccentCard";
import { buildMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Tell us about your institution and what you're looking for — our team will get back with a customised proposal.",
  path: "/contact",
});

const infoCards: { icon: typeof Mail; accent: Accent; label: string; value: string; href: string }[] = [
  { icon: Mail, accent: "gold", label: "Email", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
  { icon: Phone, accent: "teal", label: "Phone", value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phoneE164}` },
  { icon: MapPin, accent: "coral", label: "Location", value: siteConfig.contact.location, href: "" },
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ program?: string; intent?: string }>;
}) {
  const params = await searchParams;

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's Design Your Experience"
        description="Tell us about your institution, your students, and what you're looking for — our team will get back with a customised proposal."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <section className="bg-kashti-bg-light px-6 pb-24 lg:px-10">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <ContactForm defaultProgramme={params.program ?? ""} defaultIntent={params.intent ?? ""} />
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-4">
            {infoCards.map((card) => {
              const Content = (
                <div
                  className="rounded-xl border-t border-r border-b border-l-4 bg-kashti-bg-light p-5 shadow-[0_1px_2px_rgba(69,69,69,0.06)]"
                  style={{ borderColor: "var(--kashti-border-light)", borderLeftColor: accentVar[card.accent] }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ backgroundColor: accentTint[card.accent] }}
                    >
                      <card.icon size={18} strokeWidth={1.75} style={{ color: accentDeepVar[card.accent] }} />
                    </div>
                    <div>
                      <p className="font-mono-label text-[10px] tracking-widest text-kashti-charcoal/50 uppercase">{card.label}</p>
                      <p className="font-display text-sm font-semibold text-kashti-charcoal">{card.value}</p>
                    </div>
                  </div>
                </div>
              );
              return card.href ? (
                <a key={card.label} href={card.href}>
                  {Content}
                </a>
              ) : (
                <div key={card.label}>{Content}</div>
              );
            })}

            <div
              className="rounded-xl border p-5"
              style={{ borderColor: "var(--kashti-border-light)", backgroundColor: "var(--kashti-bg-tint)" }}
            >
              <p className="text-sm leading-relaxed text-kashti-charcoal/70">
                Submitting an enquiry with your institution details and preferred programme(s) is the fastest way to get a
                customised proposal from our team.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
