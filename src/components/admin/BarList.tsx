export function BarList({ items, emptyLabel = "No data yet" }: { items: { key: string; count: number }[]; emptyLabel?: string }) {
  if (items.length === 0) {
    return <p className="text-sm text-kashti-charcoal/50">{emptyLabel}</p>;
  }
  const max = Math.max(...items.map((item) => item.count), 1);
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item.key} className="flex items-center gap-3">
          <span className="w-28 shrink-0 truncate text-sm text-kashti-charcoal/75">{item.key || "Unknown"}</span>
          <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-kashti-bg-tint">
            <span
              className="absolute inset-y-0 left-0 rounded-full bg-kashti-green"
              style={{ width: `${Math.max((item.count / max) * 100, 4)}%` }}
            />
          </span>
          <span className="w-10 shrink-0 text-right text-sm font-semibold text-kashti-charcoal">{item.count}</span>
        </li>
      ))}
    </ul>
  );
}
