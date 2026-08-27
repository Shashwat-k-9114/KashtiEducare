import type { Metadata } from "next";

import { AdvisorIntakeForm } from "@/components/AdvisorIntakeForm";
import { PageHeader } from "@/components/programs/PageHeader";

/**
 * Deliberately unlisted: not in nav, footer, or sitemap.ts, and not
 * Disallow-ed in robots.ts either — a Disallow entry is publicly
 * readable and would announce this path to anyone who checks
 * robots.txt, defeating the point. noindex + zero inbound links is the
 * correct combination for "not publicly announced yet."
 */
export const metadata: Metadata = {
  title: "Advisor Application",
  description: "Kashti Educare advisor intake.",
  robots: { index: false, follow: false },
};

export default function AdvisorIntakePage() {
  return (
    <>
      <PageHeader
        eyebrow="Kashti Educare"
        title="Advisor Application"
        description="Tell us about yourself and your institution — we review every application personally."
      />

      <section className="bg-kashti-bg-light px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-2xl">
          <AdvisorIntakeForm />
        </div>
      </section>
    </>
  );
}
