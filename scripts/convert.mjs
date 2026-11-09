// One-off converter: legacy/*.html  ->  Next.js App Router pages (JSX, markup preserved 1:1).
// Run:  node scripts/convert.mjs
import fs from "node:fs";
import path from "node:path";
import { parse, NodeType } from "node-html-parser";

const ROOT = path.resolve(import.meta.dirname, "..");
const LEGACY = path.join(ROOT, "legacy");

const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);
const BOOL_ATTRS = new Set(["hidden", "disabled", "required", "checked", "selected", "readonly", "novalidate", "multiple", "autofocus", "open", "async", "defer", "controls", "autoplay", "loop", "muted", "inert"]);
const ATTR_MAP = {
  class: "className", for: "htmlFor", tabindex: "tabIndex", novalidate: "noValidate", colspan: "colSpan", rowspan: "rowSpan",
  maxlength: "maxLength", minlength: "minLength", autocomplete: "autoComplete", readonly: "readOnly", crossorigin: "crossOrigin",
  srcset: "srcSet", datetime: "dateTime", fetchpriority: "fetchPriority", enctype: "encType", autofocus: "autoFocus",
  frameborder: "frameBorder", allowfullscreen: "allowFullScreen", referrerpolicy: "referrerPolicy", inputmode: "inputMode",
  contenteditable: "contentEditable", spellcheck: "spellCheck", "accept-charset": "acceptCharset", "http-equiv": "httpEquiv",
  viewbox: "viewBox", "xlink:href": "xlinkHref", "xml:space": "xmlSpace", preserveaspectratio: "preserveAspectRatio",
};

const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

function href(v) {
  // legacy relative page links -> clean App Router paths (keeps ?query and #hash)
  const m = /^([a-z0-9-]+)\.html(.*)$/i.exec(v);
  if (!m) return v;
  const [, page, rest] = m;
  return (page === "index" ? "/" : "/" + page) + rest;
}

function styleObj(css) {
  const out = [];
  for (const decl of css.split(";")) {
    const i = decl.indexOf(":");
    if (i < 0) continue;
    const k = decl.slice(0, i).trim();
    const v = decl.slice(i + 1).trim();
    if (!k) continue;
    let key;
    if (k.startsWith("--")) key = JSON.stringify(k);
    else key = JSON.stringify(k.startsWith("-") ? camel(k).replace(/^[a-z]/, (c) => c.toUpperCase()).replace(/^Ms/, "ms") : camel(k));
    out.push(`${key}: ${JSON.stringify(v)}`);
  }
  return `{{ ${out.join(", ")} } as React.CSSProperties}`;
}

const NUM = new Set(["tabIndex", "colSpan", "rowSpan", "maxLength", "minLength", "rows", "cols", "size"]);
function attrStr(k, v) {
  if (NUM.has(k) && /^-?[0-9]+$/.test(v)) return `${k}={${v}}`;
  if (/^[\w:.-]+$/.test(v) && !/[&"\\]/.test(v)) return `${k}="${v}"`;
  if (!/[&"\\\n{}<>]/.test(v)) return `${k}="${v}"`;
  return `${k}={${JSON.stringify(v)}}`;
}

function attrs(node, inSvg) {
  const a = node.attributes; // decoded
  const tag = node.rawTagName;
  const parts = [];
  for (const [rawK, rawV] of Object.entries(a)) {
    const lk = rawK.toLowerCase();
    let v = rawV;
    if (lk === "style") { parts.push(`style=${styleObj(v)}`); continue; }
    let k;
    if (lk.startsWith("data-") || lk.startsWith("aria-")) k = lk;
    else if (ATTR_MAP[lk]) k = ATTR_MAP[lk];
    else if (inSvg && /-/.test(rawK)) k = camel(rawK);
    else k = rawK;
    if (tag === "input" && (lk === "checked")) { parts.push("defaultChecked"); continue; }
    if (tag === "input" && lk === "value") { parts.push(attrStr("defaultValue", v)); continue; }
    if (tag === "option" && lk === "selected") continue; // handled on <select>
    if (lk === "href" && tag === "a") v = href(v);
    if (v === "" && BOOL_ATTRS.has(lk)) { parts.push(k); continue; }
    parts.push(attrStr(k, v));
  }
  if (tag === "select") {
    const sel = node.querySelectorAll("option").find((o) => "selected" in o.attributes);
    if (sel) parts.push(attrStr("defaultValue", sel.getAttribute("value") ?? sel.text));
  }
  return parts.length ? " " + parts.join(" ") : "";
}

function text(node, parentTag) {
  const t = node.text; // entity-decoded, whitespace preserved
  if (t === "") return "";
  if (/^\s+$/.test(t)) {
    if (parentTag === "svg" || parentTag === "defs" || parentTag === "g" || parentTag === "symbol") return "";
    return `{" "}`;
  }
  if (/^[^\s{}<>&"\\][^\n{}<>&"\\]*[^\s{}<>&"\\]$|^[^\s{}<>&"\\]$/.test(t)) return t;
  return `{${JSON.stringify(t)}}`;
}

function walk(node, ctx = {}) {
  if (node.nodeType === NodeType.TEXT_NODE) return text(node, ctx.parent);
  if (node.nodeType === NodeType.COMMENT_NODE) return "";
  if (node.nodeType !== NodeType.ELEMENT_NODE) return "";
  const tag = node.rawTagName;
  const inSvg = ctx.inSvg || tag === "svg";
  const a = attrs(node, inSvg);
  const kids = node.childNodes.map((c) => walk(c, { inSvg, parent: tag })).join("");
  if (VOID.has(tag) || kids === "") return `<${tag}${a} />`;
  return `<${tag}${a}>${kids}</${tag}>`;
}

const fragment = (nodes) => nodes.map((n) => walk(n)).join("\n");

// ---------------------------------------------------------------- pages
const PAGES = ["index", "why-kashti", "people", "programs", "experiences", "formats", "institutions", "partners", "read", "gallery", "contact"];
const meta = {};
const outDir = (p) => (p === "index" ? path.join(ROOT, "src/app/(site)") : path.join(ROOT, "src/app/(site)", p));

for (const p of PAGES) {
  const html = fs.readFileSync(path.join(LEGACY, p + ".html"), "utf8");
  const doc = parse(html, { comment: false });
  const q = (s) => doc.querySelector(s);
  meta[p] = {
    title: q("title").text,
    description: q('meta[name="description"]').getAttribute("content"),
    ogTitle: q('meta[property="og:title"]').getAttribute("content"),
    ogDescription: q('meta[property="og:description"]').getAttribute("content"),
    canonical: new URL(q('link[rel="canonical"]').getAttribute("href")).pathname.replace(/\.html$/, "") || "/",
    dataPage: q("body").getAttribute("data-page"),
  };
  const main = q("main#main");
  const jsx = fragment(main.childNodes);
  const comp = p.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase()) + "Page";
  const dir = outDir(p);
  fs.mkdirSync(dir, { recursive: true });
  const m = meta[p];
  const file = `import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: ${JSON.stringify(m.title)} },
  description: ${JSON.stringify(m.description)},
  alternates: { canonical: ${JSON.stringify(m.canonical)} },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Kashti Educare",
    title: ${JSON.stringify(m.ogTitle)},
    description: ${JSON.stringify(m.ogDescription)},
  },
};

export default function ${comp}() {
  return (
    <>
${jsx}
    </>
  );
}
`;
  fs.writeFileSync(path.join(dir, "page.tsx"), file);
  console.log("wrote", path.relative(ROOT, path.join(dir, "page.tsx")), jsx.length);
}

// ---------------------------------------------------------------- shared chrome (from index.html)
const idx = parse(fs.readFileSync(path.join(LEGACY, "index.html"), "utf8"), { comment: false });
const gen = path.join(ROOT, "src/components/generated");
fs.mkdirSync(gen, { recursive: true });
const wrap = (name, jsx) => `// Generated from legacy/index.html by scripts/convert.mjs
export function ${name}() {
  return (
    <>
${jsx}
    </>
  );
}
`;
const sprite = idx.querySelector("body > svg");
fs.writeFileSync(path.join(gen, "Sprite.tsx"), wrap("Sprite", walk(sprite)));
fs.writeFileSync(path.join(gen, "Footer.tsx"), wrap("Footer", walk(idx.querySelector("footer.site-footer"))));
fs.writeFileSync(path.join(gen, "Cookie.tsx"), wrap("Cookie", walk(idx.querySelector("div.cookie"))));

fs.writeFileSync(path.join(ROOT, "scripts/meta.json"), JSON.stringify(meta, null, 2));
console.log("chrome done");
