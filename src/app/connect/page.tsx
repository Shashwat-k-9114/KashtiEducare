import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import type { Accent } from "@/components/AccentCard";
import { PrimaryLink, SocialButton, TileLink } from "@/components/connect/LinkButton";
import { Reveal, StaggerGrid, StaggerItem } from "@/components/motion";
import { destinations, primaryActions, socialLinks, visibleLinks } from "@/data/connect";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Connect",
  description: "All the ways to reach and follow Kashti Educare, in one place.",
  path: "/connect",
});

// Fully static — every link is hardcoded in src/data/connect.ts. No
// backend, no database, no revalidation. Change a link there and redeploy.

const PRIMARY_ACCENTS: Record<string, Accent> = {
  "Visit Website": "teal",
  WhatsApp: "green",
  Email: "gold",
};

const TILE_ACCENTS: Accent[] = ["coral", "gold", "teal", "green"];

export default function ConnectPage() {
  const primary = visibleLinks(primaryActions);
  const useful = visibleLinks(destinations);
  const socials = visibleLinks(socialLinks);

  return (
    <main className="min-h-screen bg-kashti-bg-tint px-6 py-14 sm:py-20">
      <div className="mx-auto w-full max-w-md">
        <div className="text-center">
          <Reveal>
            <Image
              src="/logo.jpeg"
              alt="Kashti Educare"
              width={80}
              height={80}
              priority
              className="mx-auto h-20 w-20 rounded-2xl object-cover shadow-[0_8px_28px_-8px_rgba(69,69,69,0.35)]"
            />
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="font-display mt-5 text-2xl font-semibold text-kashti-charcoal">
              Kashti<span className="text-kashti-gold-deep">.</span>{" "}
              <span className="font-normal text-kashti-charcoal/55">educare</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-2.5 max-w-xs text-sm leading-relaxed text-kashti-charcoal/65">
              Preparing learners for the world beyond the classroom. Reach us and follow along below.
            </p>
          </Reveal>
        </div>

        <StaggerGrid className="mt-9 flex flex-col gap-3" stagger={0.06}>
          {primary.map((link) => (
            <StaggerItem key={link.label}>
              <PrimaryLink link={link} accent={PRIMARY_ACCENTS[link.label] ?? "green"} />
            </StaggerItem>
          ))}
        </StaggerGrid>

        {useful.length > 0 ? (
          <section className="mt-10">
            <Reveal>
              <h2 className="font-mono-label text-[11px] tracking-widest text-kashti-charcoal/40 uppercase">
                Explore Kashti
              </h2>
            </Reveal>
            <StaggerGrid className="mt-3 flex flex-col gap-3" stagger={0.05}>
              {useful.map((link, i) => (
                <StaggerItem key={link.label}>
                  <TileLink link={link} accent={TILE_ACCENTS[i % TILE_ACCENTS.length]} />
                </StaggerItem>
              ))}
            </StaggerGrid>
          </section>
        ) : null}

        {socials.length > 0 ? (
          <section className="mt-10">
            <Reveal>
              <h2 className="font-mono-label text-[11px] tracking-widest text-kashti-charcoal/40 uppercase">
                Follow us
              </h2>
            </Reveal>
            <StaggerGrid className="mt-3 flex flex-wrap gap-3" stagger={0.05}>
              {socials.map((link) => (
                <StaggerItem key={link.label}>
                  <SocialButton link={link} />
                </StaggerItem>
              ))}
            </StaggerGrid>
          </section>
        ) : null}

        <Reveal delay={0.15} className="mt-12 text-center">
          <Link
            href="/"
            className="font-mono-label text-[10px] tracking-widest text-kashti-charcoal/35 uppercase transition-colors hover:text-kashti-green-deep"
          >
            kashtieducare.com
          </Link>
        </Reveal>
      </div>
    </main>
  );
}
