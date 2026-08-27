import { Hero } from "@/components/Hero";
import { NoticeBoard } from "@/components/NoticeBoard";
import { ImpactSection } from "@/components/ImpactSection";
import { StatementBanner } from "@/components/StatementBanner";
import { HowWeDeliver } from "@/components/HowWeDeliver";
import { ProgramsCarousel } from "@/components/ProgramsCarousel";
import { LearningEcosystem } from "@/components/LearningEcosystem";
import { ProgramFormats } from "@/components/ProgramFormats";
import { SectionLink } from "@/components/SectionLink";

export default function Home() {
  return (
    <>
      <Hero />
      <NoticeBoard />
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
