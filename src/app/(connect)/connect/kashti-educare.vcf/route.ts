import { getOverrides } from "@/lib/content";
import { KASHTI } from "@/lib/data";

export const revalidate = 300;

const esc = (s: string) => String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

/** "Save our contact": a vCard so the visitor can add Kashti Educare to their phone in one tap. */
export async function GET() {
  const ov = (await getOverrides()) as Record<string, any>;
  const cfg = { ...(KASHTI as any).config, ...(ov.config || {}) };
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Educare;Kashti;;;",
    "FN:Kashti Educare",
    "ORG:Kashti Educare",
    `TITLE:${esc("Real world · Real learning · Real impact")}`,
    `TEL;TYPE=WORK,VOICE:${cfg.phoneHref || cfg.phone}`,
    `EMAIL;TYPE=WORK:${cfg.email}`,
    "URL:https://kashtieducare.com",
    "URL;TYPE=Connect:https://kashtieducare.com/connect",
    `NOTE:${esc("Experiential learning for schools and higher education in India.")}`,
    "END:VCARD",
  ];
  return new Response(lines.join("\r\n") + "\r\n", {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="kashti-educare.vcf"',
      "Cache-Control": "public, max-age=300",
    },
  });
}
