import type { ReactNode } from "react";

export function DashboardSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section
      className="rounded-xl border bg-kashti-bg-light p-5 shadow-[0_1px_2px_rgba(69,69,69,0.06)]"
      style={{ borderColor: "var(--kashti-border-light)" }}
    >
      <h2 className="font-display text-base font-semibold text-kashti-charcoal">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
