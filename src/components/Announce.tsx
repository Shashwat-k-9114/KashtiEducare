import { KASHTI } from "@/lib/data";

type A = { text?: string; cta?: string; href?: string };

/** The bar above the header. Text comes from the "Announcement bar" section of the admin portal. */
export function Announce({ data }: { data?: A }) {
  const a = { ...KASHTI.announcement, ...(data || {}) };
  if (!a.text) return null;
  return (
    <div className="announce" role="region" aria-label="Announcement">
      {" "}
      <div className="container">
        <span className="dot" aria-hidden="true" />
        <span>{a.text}</span>
        {a.cta && a.href ? (
          <a href={a.href}>
            {a.cta + " "}
            <svg className="icon " aria-hidden="true">
              <use href="#i-arrow" />
            </svg>
          </a>
        ) : null}
      </div>{" "}
    </div>
  );
}
