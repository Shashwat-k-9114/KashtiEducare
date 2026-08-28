import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";

import { LinkButton } from "@/components/connect/LinkButton";
import { ScanTracker } from "@/components/connect/ScanTracker";
import { Reveal, StaggerGrid, StaggerItem } from "@/components/motion";
import { fetchLinks } from "@/lib/connectApi";
import { getVisibleLinks } from "@/lib/connectValidation";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Connect",
  description: "All the ways to reach and follow Kashti Educare, in one place.",
  path: "/connect",
});

// Links come from a Google Sheet via Apps Script (see src/lib/connectApi.ts)
// with a 30s cache — admin changes appear here within ~30s, no redeploy or
// QR regeneration ever needed.
export const revalidate = 30;

export default async function ConnectPage() {
  const links = await fetchLinks();
  const visibleLinks = getVisibleLinks(links);

  return (
    <section className="min-h-screen bg-kashti-bg-tint px-6 py-16 lg:px-10">
      <Suspense fallback={null}>
        <ScanTracker />
      </Suspense>

      <div className="mx-auto max-w-md text-center">
        <Reveal>
          <Image
            src="/logo.jpeg"
            alt="Kashti Educare"
            width={72}
            height={72}
            className="mx-auto h-16 w-16 rounded-2xl object-cover shadow-[0_4px_16px_-4px_rgba(69,69,69,0.25)]"
            priority
          />
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="font-display mt-4 text-2xl font-semibold text-kashti-charcoal">
            Kashti<span className="text-kashti-gold-deep">.</span> educare
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-2 text-sm leading-relaxed text-kashti-charcoal/65">
            Preparing learners for the world beyond the classroom. Connect with us below.
          </p>
        </Reveal>

        {visibleLinks.length > 0 ? (
          <StaggerGrid className="mt-8 flex flex-col gap-3" stagger={0.05}>
            {visibleLinks.map((link) => (
              <StaggerItem key={link.id}>
                <LinkButton link={link} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        ) : (
          <Reveal delay={0.15} className="mt-10 rounded-xl border bg-kashti-bg-light p-6 text-sm text-kashti-charcoal/60" >
            <p>Links are being updated — check back shortly.</p>
          </Reveal>
        )}

        <Reveal delay={0.2} className="mt-10">
          <p className="font-mono-label text-[10px] tracking-widest text-kashti-charcoal/35 uppercase">
            kashtieducare.com
          </p>
        </Reveal>
      </div>
    </section>
  );
}
