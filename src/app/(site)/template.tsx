import { Announce } from "@/components/Announce";
import { Cookie } from "@/components/generated/Cookie";
import { Footer } from "@/components/generated/Footer";
import { Sprite } from "@/components/generated/Sprite";
import { Enhancer } from "@/components/Enhancer";
import { Header } from "@/components/Header";
import { getOverrides } from "@/lib/content";

/* A template (not a layout) so the whole chrome remounts on every navigation. That gives the page
   enhancer a fresh DOM each time, exactly like the original multi-page site.
   `overrides` = sections edited in the admin portal (Google Sheet); everything else is the built-in content. */
export default async function Template({ children }: { children: React.ReactNode }) {
  const overrides = await getOverrides();
  return (
    <>
      <Sprite />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Announce data={overrides.announcement as { text?: string; cta?: string; href?: string } | undefined} />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <Cookie />
      <Enhancer overrides={overrides} />
    </>
  );
}
