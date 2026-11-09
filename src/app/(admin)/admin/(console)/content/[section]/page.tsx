import { notFound } from "next/navigation";
import { Icon } from "@/components/admin/Icon";
import { SectionEditor } from "@/components/admin/SectionEditor";
import type { Lookups } from "@/components/admin/FieldEditor";
import { SECTION_MAP } from "@/lib/admin/schema";
import { KASHTI } from "@/lib/data";
import { scriptCall } from "@/lib/sheet";

export const dynamic = "force-dynamic";

// Where each section shows up, so "View on site" opens the right page.
const VIEW: Record<string, string> = {
  announcement: "/", config: "/contact", notices: "/#notices", downloads: "/#notices", featured: "/#notices",
  themes: "/programs", programmes: "/programs#catalogue", heGroups: "/programs", formatLabels: "/programs", roadmap: "/", modelWeek: "/#week",
  expeditions: "/#notices", people: "/people", peopleUpcoming: "/people", council: "/institutions", partners: "/partners", partnerTabs: "/partners",
  standFor: "/why-kashti", values: "/why-kashti", stats: "/why-kashti", testimonials: "/", faq: "/programs#faq", gallery: "/gallery", galleryCats: "/gallery", read: "/read",
};

type Ctx = { params: Promise<{ section: string }> };

export async function generateMetadata({ params }: Ctx) {
  const s = SECTION_MAP[(await params).section];
  return { title: s ? s.title : "Not found" };
}

export default async function SectionPage({ params }: Ctx) {
  const key = (await params).section;
  const section = SECTION_MAP[key];
  if (!section) notFound();

  let overrides: Record<string, unknown> = {};
  let updated: Record<string, string> = {};
  let error = "";
  try {
    const out = await scriptCall<{ content: Record<string, unknown>; updated: Record<string, string> }>({ action: "content.getAll" }, { fresh: true });
    overrides = out.content || {};
    updated = out.updated || {};
  } catch (e) {
    error = (e as Error).message;
  }

  const data = KASHTI as unknown as Record<string, unknown>;
  const defaults = data[key];
  const overridden = key in overrides;
  const initial = overridden ? overrides[key] : defaults;

  // Dropdown options that depend on other sections (e.g. a programme's themes).
  const effective = (k: string) => (k in overrides ? overrides[k] : data[k]);
  const lookups: Lookups = {
    themes: ((effective("themes") as { id: string; name: string }[]) || []).map((t) => ({ value: t.id, label: t.name })),
    galleryCats: Object.entries((effective("galleryCats") as Record<string, string>) || {}).map(([value, label]) => ({ value, label })),
  };

  return (
    <>
      <header className="a-head">
        <span className="a-eyebrow">Content · {section.where}</span>
        <h1 style={{ display: "flex", gap: 12, alignItems: "center" }}><Icon name={section.icon} />{section.title}</h1>
        <p>{section.desc}</p>
      </header>
      {error ? (
        <div className="a-alert err" role="alert" style={{ marginBottom: 16 }}>
          <Icon name="info" />
          <span>Couldn&apos;t reach the Google Sheet: {error} You can look around, but saving will fail until this is fixed.</span>
        </div>
      ) : null}
      <SectionEditor
        key={key}
        sectionKey={key}
        title={section.title}
        root={section.root}
        initial={initial}
        defaults={defaults}
        overridden={overridden}
        updated={updated[key]}
        lookups={lookups}
        viewHref={VIEW[key] || "/"}
      />
    </>
  );
}
