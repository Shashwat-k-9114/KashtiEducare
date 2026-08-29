import type { Metadata } from "next";

import { Bearing } from "@/components/connect/Bearing";
import { ScrollProgress } from "@/components/connect/Chart";
import { Departure } from "@/components/connect/Departure";
import { Stage } from "@/components/connect/Stage";
import { Harbour } from "@/components/connect/Harbour";
import { Passage } from "@/components/connect/Passage";
import { Sightings } from "@/components/connect/Sightings";
import { Chip, PrimaryAction } from "@/components/connect/parts";
import { Reveal } from "@/components/motion";
import { conversation, journey } from "@/data/connect";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Connect",
  description:
    "Kashti Educare — experiences that expand exposure, perspective and resilience. Explore what's possible for your students, and start the conversation.",
  path: "/connect",
});

// Fully static — every destination is a real route, a real photo in
// /public, or a deep-link into the existing /contact flow. No backend, no
// data fetching. src/data/connect.ts is the single source of truth.

export default function ConnectPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-kashti-bg-tint text-kashti-charcoal">
      <ScrollProgress />

      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <Stage station={journey[0]} first>
          <Departure />
        </Stage>

        <Stage station={journey[1]}>
          <Bearing />
        </Stage>

        <Stage station={journey[2]}>
          <Passage />
        </Stage>

        <Stage station={journey[3]}>
          <Sightings />
        </Stage>

        <Stage station={journey[4]} last>
          <div>
            <Reveal>
              <h2 className="font-display max-w-[20ch] text-[25px] leading-[1.12] font-semibold text-kashti-charcoal sm:text-[32px] lg:text-[40px]">
                {conversation.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <ul className="mt-6 flex flex-wrap gap-2">
                {conversation.modes.map((mode) => (
                  <Chip key={mode}>{mode}</Chip>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-wrap gap-3">
                <PrimaryAction
                  href={conversation.primary.href}
                  label={conversation.primary.label}
                  tone="solid"
                  external={conversation.primary.external}
                />
                <PrimaryAction
                  href={conversation.secondary.href}
                  label={conversation.secondary.label}
                  tone="outline"
                  external={conversation.secondary.external}
                />
              </div>
            </Reveal>
          </div>
        </Stage>
      </div>

      <Harbour station={journey[5]} />
    </main>
  );
}
