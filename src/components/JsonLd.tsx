import { jsonLdString } from "@/lib/jsonld";

// JSON-LD requires a raw <script> body; jsonLdString escapes "<" to prevent tag-injection.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(data) }} />;
}
