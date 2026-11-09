import { ConnectExperience, type ConnectData } from "@/components/connect/ConnectExperience";
import { getOverrides } from "@/lib/content";
import { KASHTI } from "@/lib/data";

// Static, refreshed whenever the admin saves (cache tag "content") or at most every minute.
export const revalidate = 60;

const slug = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/\(.*?\)/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const firstSentence = (s: string) => {
  const m = String(s || "").match(/^.{40,200}?[.!?](\s|$)/);
  return (m ? m[0] : String(s || "").slice(0, 180)).trim();
};

type Raw = Record<string, any>;

export default async function ConnectPage() {
  const ov = (await getOverrides()) as Raw;
  const base = KASHTI as Raw;
  const pick = (k: string) => (ov[k] !== undefined ? ov[k] : base[k]);

  const connect = { ...base.connect, ...(ov.connect || {}) };
  const cfg = { ...base.config, ...(ov.config || {}) };
  const themes: Raw[] = pick("themes") || [];
  const programmes: Raw[] = pick("programmes") || [];
  const gallery: Raw[] = pick("gallery") || [];
  const img = (cfg.img || "") as string;
  const abs = (p: string) => (/^https?:/.test(p) ? p : p.startsWith("/") ? p : "/" + p);

  const data: ConnectData = {
    eyebrow: connect.eyebrow || "",
    headline: connect.headline || "",
    intro: connect.intro || "",
    socials: (connect.socials || []).filter((s: Raw) => s && s.url),
    paths: connect.paths || [],
    explore: connect.explore || [],
    contact: { email: cfg.email, phone: cfg.phone, phoneHref: cfg.phoneHref },
    themes: themes.map((t) => ({ id: t.id, name: t.name, tagline: t.tagline || "", color: t.color || "#0F3E9E", audience: t.audience || "" })),
    counts: {
      programmes: programmes.length,
      school: programmes.filter((p) => p.aud === "school").length,
      he: programmes.filter((p) => p.aud === "he").length,
      themes: themes.length,
    },
    spotlights: programmes.map((p) => ({
      id: `${slug(p.name)}-${p.aud}`,
      name: p.name,
      aud: p.aud === "he" ? "Higher education" : "School",
      text: firstSentence(p.desc),
    })),
    photos: gallery.slice(0, 10).map((g) => ({ src: abs(g.src), alt: g.alt || "" })),
    site: img || "https://kashtieducare.com",
  };

  return <ConnectExperience data={data} />;
}
