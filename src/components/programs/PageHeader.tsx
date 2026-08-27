import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Reveal } from "@/components/motion";

type Crumb = { label: string; href?: string };

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs?: Crumb[];
  children?: React.ReactNode;
};

export function PageHeader({ eyebrow, title, description, breadcrumbs, children }: PageHeaderProps) {
  return (
    <section className="bg-kashti-bg-light px-6 pt-14 pb-14 text-center lg:px-10 lg:pt-20 lg:pb-16">
      <div className="mx-auto max-w-3xl">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center justify-center gap-1.5">
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.label} className="flex items-center gap-1.5">
                {i > 0 ? <ChevronRight size={12} className="text-kashti-charcoal/30" /> : null}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="font-mono-label text-[11px] tracking-wide text-kashti-charcoal/50 uppercase transition-colors hover:text-kashti-green-deep"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-mono-label text-[11px] tracking-wide text-kashti-charcoal/70 uppercase">
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        ) : null}

        <Reveal>
          <span className="font-mono-label inline-flex items-center rounded-full border-2 border-kashti-gold/50 bg-kashti-gold/10 px-4 py-1.5 text-[11px] tracking-widest text-kashti-gold-deep uppercase">
            {eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="font-display mt-5 text-3xl leading-tight font-semibold text-kashti-charcoal sm:text-4xl lg:text-5xl">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-kashti-charcoal/70">{description}</p>
        </Reveal>
        {children ? (
          <Reveal delay={0.2} className="mt-7">
            {children}
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
