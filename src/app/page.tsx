import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ImpactSection } from "@/components/ImpactSection";
import { StatementBanner } from "@/components/StatementBanner";
import { HowWeDeliver } from "@/components/HowWeDeliver";
import { ExperienceModel } from "@/components/ExperienceModel";
import { LearningEcosystem } from "@/components/LearningEcosystem";
import { ProgramFormats } from "@/components/ProgramFormats";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ImpactSection />
        <StatementBanner />
        <HowWeDeliver />
        <ExperienceModel />
        <LearningEcosystem />
        <ProgramFormats />
      </main>
      <Footer />
    </>
  );
}
