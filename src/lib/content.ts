import { unstable_cache } from "next/cache";
import { scriptCall } from "@/lib/sheet";
import { SECTION_MAP } from "@/lib/admin/schema";
import { hydrate } from "@/lib/admin/normalize";

export type Overrides = Record<string, unknown>;

/**
 * Content edited in the admin portal lives in the Google Sheet ("Content" tab) as overrides on top of
 * the defaults in src/lib/data.js. Only the sections that were edited are returned.
 * Cached for 60 s and invalidated immediately (tag "content") whenever the admin saves.
 */
const cached = unstable_cache(
  async () => {
    const out = await scriptCall<{ content: Overrides }>({ action: "content.getAll" });
    const content = out.content ?? {};
    for (const [key, val] of Object.entries(content)) {
      const section = SECTION_MAP[key];
      if (section) content[key] = hydrate(section.root, val);
    }
    return content;
  },
  ["kashti-content-v1"],
  { tags: ["content"], revalidate: 60 },
);

/** Never throws: if the sheet is unreachable or not set up the site simply shows its built-in content. */
export async function getOverrides(): Promise<Overrides> {
  try {
    return await cached();
  } catch (err) {
    console.warn("[content] using built-in content:", (err as Error).message);
    return {};
  }
}
