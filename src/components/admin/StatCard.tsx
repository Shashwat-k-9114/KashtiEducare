export function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div
      className="rounded-xl border bg-kashti-bg-light p-5 shadow-[0_1px_2px_rgba(69,69,69,0.06)]"
      style={{ borderColor: "var(--kashti-border-light)" }}
    >
      <p className="font-mono-label text-[10px] tracking-widest text-kashti-charcoal/50 uppercase">{label}</p>
      <p className="font-display mt-1.5 text-2xl font-bold text-kashti-charcoal">{value}</p>
    </div>
  );
}
