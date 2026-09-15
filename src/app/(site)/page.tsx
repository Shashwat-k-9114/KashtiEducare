import type { Metadata } from "next";

import { Hero } from "@/components/Hero";
import { HeroCarousel } from "@/components/HeroCarousel";
import { NoticeBoard } from "@/components/NoticeBoard";
import { GalleryTeaser } from "@/components/GalleryTeaser";
import { ImpactSection } from "@/components/ImpactSection";
import { StatementBanner } from "@/components/StatementBanner";
import { HowWeDeliver } from "@/components/HowWeDeliver";
import { ProgramsCarousel } from "@/components/ProgramsCarousel";
import { LearningEcosystem } from "@/components/LearningEcosystem";
import { ProgramFormats } from "@/components/ProgramFormats";
import { SectionLink } from "@/components/SectionLink";
import { absoluteUrl, siteConfig } from "@/lib/seo";

/**
 * The homepage sets its own title/description explicitly (rather than
 * inheriting the generic root-layout defaults) so the SERP snippet names
 * what Kashti actually runs. Canonical is the non-www apex "/"; index and
 * follow are left at their defaults — this page must be indexed.
 */
const homeTitle = "Kashti Educare | Experiential Learning Beyond the Classroom";
const homeDescription =
  "Kashti Educare designs experiential learning programmes for schools and students: STEM, AI, space, AR/VR, career and industry exposure, entrepreneurship and global immersion.";

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: homeDescription,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
  },
};

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <Hero />
      <NoticeBoard />
      <GalleryTeaser />
      <ImpactSection />
      <SectionLink href="/why-kashti" label="More on why Kashti" />
      <StatementBanner />
      <HowWeDeliver />
      <SectionLink href="/experiences" label="Go deeper into the experience model" />
      <ProgramsCarousel />
      <LearningEcosystem />
      <SectionLink href="/institutions" label="Meet our ecosystem & council" />
      <ProgramFormats />
      <SectionLink href="/formats" label="Compare formats in detail" />
    </>
  );
}
