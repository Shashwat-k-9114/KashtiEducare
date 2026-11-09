// Describes every editable section of the site. The admin editor is generated from this, so adding a field
// here is all it takes to make it editable. Pure data (no functions) so it can be sent to client components.

export type Opt = { value: string; label: string };
export type OptSource = { from: string; value?: string; label?: string; keys?: boolean };

export type FieldType =
  | "text" | "textarea" | "url" | "image" | "date" | "month" | "number" | "color" | "icon"
  | "select" | "multiselect" | "object" | "list" | "map";

export interface Field {
  type: FieldType;
  key?: string;
  label: string;
  help?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  options?: Opt[] | OptSource;
  fields?: Field[]; // object
  item?: Field; // list
  titleKey?: string; // list: which child field names an item in the collapsed card
  subtitleKey?: string;
  addLabel?: string;
  prepend?: boolean; // list: new items go to the top (newest first)
  keyLabel?: string; // map
  valueLabel?: string;
  valueType?: "text" | "textarea";
  fixedKeys?: boolean; // map: keys cannot be added/removed
}

export type GroupId = "site" | "programmes" | "people" | "story" | "media";

export interface Section {
  key: string; // top-level key in src/lib/data.js
  title: string;
  group: GroupId;
  icon: string;
  desc: string;
  where: string; // where it shows on the site
  root: Field; // list | object | map
}

export const GROUPS: { id: GroupId; title: string; blurb: string }[] = [
  { id: "site", title: "Site-wide", blurb: "Announcement bar, contact details, notices and downloads." },
  { id: "programmes", title: "Programmes", blurb: "Themes, the 53-programme catalogue, the sample year and the model week." },
  { id: "people", title: "People & partners", blurb: "Founder, advisors, council and partner logos." },
  { id: "story", title: "Story & proof", blurb: "What Kashti stands for, numbers, testimonials and FAQs." },
  { id: "media", title: "Gallery & reading", blurb: "Field photos, blogs, newsletter and the magazine." },
];

export const ICONS = [
  "arrow", "calendar", "users", "gear", "bars", "cap", "bulb", "globe", "handshake", "school", "factory", "rocket", "mountain", "compass", "leaf", "flag",
  "mail", "phone", "pin", "download", "file", "megaphone", "star", "award", "check", "plane", "clock", "target", "book", "eye", "wrench", "sprout", "layers",
  "route", "landmark", "network", "sparkles", "shield", "image", "briefcase", "heart", "info", "bed", "bus", "sun", "link", "camera", "quote", "user-plus",
];

const text = (key: string, label: string, extra: Partial<Field> = {}): Field => ({ type: "text", key, label, ...extra });
const area = (key: string, label: string, extra: Partial<Field> = {}): Field => ({ type: "textarea", key, label, rows: 3, ...extra });
const url = (key: string, label: string, extra: Partial<Field> = {}): Field => ({ type: "url", key, label, ...extra });
const image = (key: string, label: string, extra: Partial<Field> = {}): Field => ({ type: "image", key, label, ...extra });
const color = (key: string, label = "Accent colour", extra: Partial<Field> = {}): Field => ({ type: "color", key, label, ...extra });
const icon = (key = "icon", label = "Icon"): Field => ({ type: "icon", key, label });
const strings = (key: string, label: string, extra: Partial<Field> = {}): Field => ({
  type: "list", key, label, item: { type: "text", label: "Item" }, addLabel: "Add item", ...extra,
});

const THEME_OPTS: OptSource = { from: "themes", value: "id", label: "name" };

export const SECTIONS: Section[] = [
  // ------------------------------------------------------------------ site-wide
  {
    key: "announcement", title: "Announcement bar", group: "site", icon: "megaphone",
    desc: "The thin bar above the header on every page.", where: "Top of every page",
    root: { type: "object", label: "Announcement", fields: [
      text("text", "Message", { required: true }),
      text("cta", "Link text", { required: true, help: "Short, e.g. View programmes" }),
      url("href", "Link address", { required: true, help: "Internal like /programs?theme=global#catalogue, or a full https:// address." }),
    ] },
  },
  {
    key: "connect", title: "Connect page (QR code)", group: "site", icon: "star",
    desc: "The page behind the QR code on brochures and visiting cards: headline, social links, audience paths and site links.", where: "kashtieducare.com/connect",
    root: { type: "object", label: "Connect page", fields: [
      text("eyebrow", "Small line above the headline"),
      text("headline", "Headline", { required: true, help: "The first thing people read after scanning. A question that sparks curiosity works well." }),
      area("intro", "Intro", { rows: 3 }),
      { type: "list", key: "socials", label: "Social links", titleKey: "label", subtitleKey: "handle", addLabel: "Add social link", help: "Only links with an address are shown on the page.", item: { type: "object", label: "Social link", fields: [
        { type: "select", key: "icon", label: "Network", required: true, options: [
          { value: "instagram", label: "Instagram" }, { value: "linkedin", label: "LinkedIn" }, { value: "youtube", label: "YouTube" },
          { value: "facebook", label: "Facebook" }, { value: "x", label: "X (Twitter)" }, { value: "whatsapp", label: "WhatsApp channel" }, { value: "globe", label: "Other website" },
        ] },
        text("label", "Name", { required: true, placeholder: "LinkedIn" }),
        text("handle", "Handle or tagline", { placeholder: "@kashti_educare" }),
        url("url", "Address", { required: true, help: "The full https:// link to the profile or page." }),
      ] } },
      { type: "list", key: "paths", label: "“Which sounds like you?” paths", titleKey: "label", addLabel: "Add path", item: { type: "object", label: "Path", fields: [
        text("label", "Label", { required: true, placeholder: "I lead a school" }),
        area("teaser", "What they see when they tap it", { required: true }),
        text("cta", "Button text", { required: true }),
        url("href", "Button link", { required: true }),
      ] } },
      { type: "list", key: "explore", label: "Explore the site links", titleKey: "label", subtitleKey: "note", addLabel: "Add link", item: { type: "object", label: "Link", fields: [
        text("label", "Name", { required: true }),
        text("note", "One-line description"),
        url("href", "Link", { required: true }),
      ] } },
    ] },
  },
  {
    key: "config", title: "Contact details", group: "site", icon: "phone",
    desc: "Email, phone and location used by forms and fallbacks.", where: "Forms, footer fallbacks",
    root: { type: "object", label: "Contact details", fields: [
      text("email", "Email", { required: true }),
      text("phone", "Phone (as shown)", { required: true, placeholder: "+91 8307039685" }),
      text("phoneHref", "Phone (digits for tap-to-call)", { required: true, placeholder: "+918307039685" }),
      text("location", "Location"),
    ] },
  },
  {
    key: "notices", title: "Notice board", group: "site", icon: "megaphone",
    desc: "Dated updates on the home page notice board. Newest first.", where: "Home: What's new at Kashti",
    root: { type: "list", label: "Notices", titleKey: "title", subtitleKey: "date", addLabel: "Add notice", prepend: true, item: { type: "object", label: "Notice", fields: [
      { type: "date", key: "date", label: "Date", required: true },
      text("tag", "Tag", { placeholder: "Applications, Partnerships, Recognition…" }),
      text("title", "Headline", { required: true }),
      url("href", "Link", { help: "Where the notice opens." }),
    ] } },
  },
  {
    key: "downloads", title: "Downloads", group: "site", icon: "download",
    desc: "Brochures and policy documents. Leave the link empty to make visitors request it by email.", where: "Home: notice board > downloads",
    root: { type: "list", label: "Downloads", titleKey: "title", subtitleKey: "meta", addLabel: "Add download", item: { type: "object", label: "Download", fields: [
      text("title", "Title", { required: true }),
      text("meta", "Details", { placeholder: "PDF · 2 MB" }),
      url("url", "File link", { help: "A full https:// address to the PDF. Empty = visitors request it by email." }),
    ] } },
  },
  {
    key: "featured", title: "Featured stories", group: "site", icon: "star",
    desc: "The large featured card on the home page.", where: "Home: notice board > featured",
    root: { type: "list", label: "Featured stories", titleKey: "title", addLabel: "Add story", item: { type: "object", label: "Story", fields: [
      image("img", "Photo", { required: true }),
      text("alt", "Photo description", { required: true }),
      text("kicker", "Small heading", { placeholder: "Featured story" }),
      text("title", "Title", { required: true }),
      area("text", "Text"),
    ] } },
  },

  // ------------------------------------------------------------------ programmes
  {
    key: "themes", title: "Learning themes", group: "programmes", icon: "layers",
    desc: "The eight pathways. Programmes are grouped under these.", where: "Home pathways, Programs page",
    root: { type: "list", label: "Themes", titleKey: "name", subtitleKey: "tagline", addLabel: "Add theme", item: { type: "object", label: "Theme", fields: [
      text("id", "Short id", { required: true, help: "Lowercase, no spaces (e.g. stem). Programmes refer to this, so change it with care." }),
      text("no", "Number", { placeholder: "01" }),
      text("name", "Name", { required: true }),
      text("tagline", "Tagline"),
      color("color"),
      icon(),
      text("audience", "Audience", { placeholder: "School & Higher Ed" }),
      area("desc", "Description", { rows: 4 }),
      strings("offers", "What it offers", { addLabel: "Add offer" }),
      image("img", "Photo"),
      text("imgAlt", "Photo description"),
    ] } },
  },
  {
    key: "programmes", title: "Programme catalogue", group: "programmes", icon: "book",
    desc: "Every programme in the catalogue, with its filters, details and circuits.", where: "Programs page, home planner, enquiry form",
    root: { type: "list", label: "Programmes", titleKey: "name", subtitleKey: "group", addLabel: "Add programme", item: { type: "object", label: "Programme", fields: [
      text("name", "Name", { required: true }),
      { type: "select", key: "aud", label: "For", required: true, options: [{ value: "school", label: "School" }, { value: "he", label: "Higher education" }] },
      text("group", "Higher-ed group", { help: "Higher-education programmes only (e.g. Career Development). Leave empty for school programmes." }),
      { type: "multiselect", key: "formats", label: "Formats", options: [
        { value: "one", label: "One day" }, { value: "multi", label: "Multi-day" }, { value: "res", label: "Residential" }, { value: "intl", label: "International" },
      ] },
      { type: "multiselect", key: "themes", label: "Themes", options: THEME_OPTS },
      area("desc", "Description", { rows: 5, required: true }),
      { type: "object", key: "details", label: "At a glance (optional)", fields: [
        text("Recommended for", "Recommended for"),
        text("Suggested length", "Suggested length"),
        text("Recommended months", "Recommended months"),
        text("Group size", "Group size"),
      ] },
      strings("circuits", "Circuits / locations (optional)", { addLabel: "Add circuit" }),
    ] } },
  },
  {
    key: "heGroups", title: "Higher-ed group blurbs", group: "programmes", icon: "cap",
    desc: "One-line description shown under each higher-education group heading.", where: "Programs page",
    root: { type: "map", label: "Groups", keyLabel: "Group name", valueLabel: "Blurb", valueType: "textarea" },
  },
  {
    key: "formatLabels", title: "Format labels", group: "programmes", icon: "clock",
    desc: "The names of the four programme formats used in filters and badges.", where: "Programs page, planner",
    root: { type: "map", label: "Formats", keyLabel: "Code", valueLabel: "Label shown", fixedKeys: true },
  },
  {
    key: "roadmap", title: "Sample year (hero calendar)", group: "programmes", icon: "calendar",
    desc: "One programme per month for the animated 2026–27 calendar at the top of the home page.", where: "Home hero",
    root: { type: "list", label: "Months", titleKey: "prog", subtitleKey: "m", addLabel: "Add month", item: { type: "object", label: "Month", fields: [
      text("m", "Month", { required: true, placeholder: "2026-04", help: "Year-month, e.g. 2026-04." }),
      text("prog", "Programme", { required: true }),
      { type: "select", key: "theme", label: "Theme", options: THEME_OPTS },
      text("fmt", "Format label", { placeholder: "1 day" }),
      { type: "list", key: "days", label: "Days", addLabel: "Add day", item: { type: "number", label: "Day of month" } },
      { type: "select", key: "stage", label: "Stage", options: ["Orient", "Immerse", "Build", "Transform"].map((v) => ({ value: v, label: v })) },
      text("note", "Note"),
    ] } },
  },
  {
    key: "modelWeek", title: "A week at Kashti", group: "programmes", icon: "sun",
    desc: "The Monday–Sunday model week and its program notes.", where: "Home: A week at Kashti",
    root: { type: "object", label: "Model week", fields: [
      { type: "list", key: "days", label: "Days", titleKey: "d", addLabel: "Add day", item: { type: "object", label: "Day", fields: [
        text("d", "Day name", { required: true }),
        color("c"),
        image("img", "Photo"),
        text("alt", "Photo description"),
        { type: "number", key: "at", label: "Photo focus (0–4)", help: "Which activity the day starts on." },
        { type: "list", key: "acts", label: "Activities", addLabel: "Add activity", item: { type: "list", label: "Activity", addLabel: "Add line", item: { type: "text", label: "Line" } } },
      ] } },
      { type: "list", key: "notes", label: "Program notes", titleKey: "t", addLabel: "Add note", item: { type: "object", label: "Note", fields: [
        text("t", "Title", { required: true }), text("d", "Detail"), icon(),
      ] } },
    ] },
  },
  {
    key: "expeditions", title: "Upcoming expeditions", group: "programmes", icon: "mountain",
    desc: "The expedition list on the home page notice board.", where: "Home: notice board",
    root: { type: "list", label: "Expeditions", titleKey: "title", subtitleKey: "when", addLabel: "Add expedition", item: { type: "object", label: "Expedition", fields: [
      text("title", "Programme", { required: true }),
      text("when", "When", { placeholder: "Feb 2026" }),
      text("where", "Where"),
      { type: "select", key: "theme", label: "Theme", options: THEME_OPTS },
      text("id", "Programme link id", { help: "Optional. Opens that programme, e.g. stem-tours-school." }),
    ] } },
  },

  // ------------------------------------------------------------------ people & partners
  {
    key: "people", title: "Founder & advisors", group: "people", icon: "users",
    desc: "People cards and full profiles.", where: "People page, home visionaries",
    root: { type: "list", label: "People", titleKey: "name", subtitleKey: "role", addLabel: "Add person", item: { type: "object", label: "Person", fields: [
      text("name", "Name", { required: true }),
      { type: "select", key: "group", label: "Group", required: true, options: [{ value: "founder", label: "Founder" }, { value: "advisor", label: "Advisor" }] },
      text("role", "Role"),
      text("initials", "Initials", { help: "Shown if there is no photo." }),
      color("color", "Card colour"),
      image("photo", "Photo", { help: "Square photo. Leave empty to show initials." }),
      text("headline", "Headline"),
      area("bio", "Biography", { rows: 6 }),
      strings("highlights", "Highlights", { addLabel: "Add highlight" }),
      strings("tags", "Tags", { addLabel: "Add tag" }),
      { type: "list", key: "links", label: "Links", titleKey: "label", addLabel: "Add link", item: { type: "object", label: "Link", fields: [text("label", "Label"), url("url", "Address")] } },
    ] } },
  },
  {
    key: "peopleUpcoming", title: "Open council seats", group: "people", icon: "user-plus",
    desc: "'Want to be part of this?' seats on the People page.", where: "People page",
    root: { type: "list", label: "Seats", titleKey: "t", addLabel: "Add seat", item: { type: "object", label: "Seat", fields: [text("t", "Title", { required: true }), area("d", "Description"), icon()] } },
  },
  {
    key: "council", title: "Council structure", group: "people", icon: "landmark",
    desc: "The Education & Experience Council tiers.", where: "Institutions page",
    root: { type: "list", label: "Council tiers", titleKey: "t", subtitleKey: "badge", addLabel: "Add tier", item: { type: "object", label: "Tier", fields: [
      text("t", "Title", { required: true }), text("badge", "Badge"), area("d", "Description"), icon(), color("c"),
    ] } },
  },
  {
    key: "partners", title: "Partner logos", group: "people", icon: "handshake",
    desc: "Logos in the partner strip, footer and the Partners page, by category.", where: "Home strip, footer, Partners page",
    root: { type: "object", label: "Partners", fields: (["government", "academia", "community"] as const).map((k) => ({
      type: "list" as const, key: k, label: { government: "Government & public", academia: "Universities & institutes", community: "Community, media & ecosystem" }[k],
      titleKey: "name", addLabel: "Add partner", item: { type: "object" as const, label: "Partner", fields: [
        text("name", "Short name", { required: true }), text("full", "Full name"), image("logo", "Logo image", { help: "Transparent PNG or SVG works best." }),
      ] },
    })) },
  },
  {
    key: "partnerTabs", title: "Partner category names", group: "people", icon: "network",
    desc: "The tab names for the three partner categories.", where: "Partners page",
    root: { type: "map", label: "Tabs", keyLabel: "Category", valueLabel: "Tab name", fixedKeys: true },
  },

  // ------------------------------------------------------------------ story & proof
  {
    key: "standFor", title: "What we stand for", group: "story", icon: "shield",
    desc: "The value cards on Why Kashti.", where: "Why Kashti",
    root: { type: "list", label: "Cards", titleKey: "t", addLabel: "Add card", item: { type: "object", label: "Card", fields: [text("t", "Title", { required: true }), area("d", "Description"), icon(), color("c")] } },
  },
  {
    key: "values", title: "Values", group: "story", icon: "heart",
    desc: "The shorter values list.", where: "Why Kashti, People",
    root: { type: "list", label: "Values", titleKey: "t", addLabel: "Add value", item: { type: "object", label: "Value", fields: [text("t", "Title", { required: true }), area("d", "Description"), icon()] } },
  },
  {
    key: "stats", title: "Numbers", group: "story", icon: "bars",
    desc: "The counted figures. Replace with verified numbers when you have them.", where: "Why Kashti, Programs",
    root: { type: "list", label: "Numbers", titleKey: "label", subtitleKey: "n", addLabel: "Add number", item: { type: "object", label: "Number", fields: [
      { type: "number", key: "n", label: "Number", required: true }, text("suffix", "Suffix", { placeholder: "+" }), text("label", "Label", { required: true }), icon(), color("c"),
    ] } },
  },
  {
    key: "testimonials", title: "Testimonials", group: "story", icon: "quote",
    desc: "Student and teacher feedback. Only add real quotes.", where: "Home, Why Kashti",
    root: { type: "list", label: "Testimonials", titleKey: "source", subtitleKey: "who", addLabel: "Add testimonial", item: { type: "object", label: "Testimonial", fields: [
      { type: "select", key: "who", label: "From", required: true, options: [{ value: "student", label: "Student" }, { value: "teacher", label: "Teacher" }] },
      area("quote", "Quote", { required: true, rows: 4 }), text("source", "Programme / source"), text("detail", "Detail", { placeholder: "Pune cohort" }),
    ] } },
  },
  {
    key: "faq", title: "FAQs", group: "story", icon: "info",
    desc: "Questions and answers on the Programs page.", where: "Programs: FAQ",
    root: { type: "list", label: "FAQs", titleKey: "q", addLabel: "Add question", item: { type: "object", label: "FAQ", fields: [text("q", "Question", { required: true }), area("a", "Answer", { rows: 4, required: true })] } },
  },

  // ------------------------------------------------------------------ gallery & reading
  {
    key: "gallery", title: "Gallery photos", group: "media", icon: "image",
    desc: "The field photos and their filter category.", where: "Gallery page",
    root: { type: "list", label: "Photos", titleKey: "alt", subtitleKey: "cat", addLabel: "Add photo", item: { type: "object", label: "Photo", fields: [
      image("src", "Photo", { required: true, help: "Path like /images/gallery/name.jpeg (live site) or a full https:// address." }),
      text("alt", "Description", { required: true }),
      { type: "select", key: "cat", label: "Category", required: true, options: { from: "galleryCats", keys: true } },
    ] } },
  },
  {
    key: "galleryCats", title: "Gallery categories", group: "media", icon: "filter",
    desc: "The filter names on the Gallery page. Keep the codes if photos use them.", where: "Gallery page",
    root: { type: "map", label: "Categories", keyLabel: "Code", valueLabel: "Name shown" },
  },
  {
    key: "read", title: "Blog, newsletter & magazine", group: "media", icon: "book",
    desc: "LinkedIn-style posts, the newsletter sign-up copy and magazine issues.", where: "Read page",
    root: { type: "object", label: "Read", fields: [
      { type: "list", key: "posts", label: "Blog posts", titleKey: "title", subtitleKey: "tag", addLabel: "Add post", prepend: true, item: { type: "object", label: "Post", fields: [
        { type: "select", key: "status", label: "Status", required: true, options: [{ value: "live", label: "Live" }, { value: "soon", label: "Coming soon" }] },
        text("tag", "Topic tag", { required: true, placeholder: "Workshops" }),
        icon(),
        text("title", "Title", { required: true }),
        area("blurb", "Summary"),
        url("url", "Link to the post"),
        image("img", "Image (optional)"),
        text("alt", "Image description"),
      ] } },
      { type: "object", key: "newsletter", label: "Newsletter sign-up", fields: [
        strings("points", "Selling points", { addLabel: "Add point" }),
        strings("roles", "'I am a…' options", { addLabel: "Add option" }),
      ] },
      { type: "list", key: "issues", label: "Magazine issues", titleKey: "title", subtitleKey: "n", addLabel: "Add issue", item: { type: "object", label: "Issue", fields: [
        text("n", "Issue number", { required: true, placeholder: "01" }), text("title", "Title", { required: true }), text("note", "Note"), url("url", "PDF link", { help: "When set, the button becomes Download PDF." }),
      ] } },
      strings("drafts", "Drafts to verify (internal notes)", { addLabel: "Add note", help: "Not shown on the site." }),
    ] },
  },
];

export const SECTION_MAP: Record<string, Section> = Object.fromEntries(SECTIONS.map((s) => [s.key, s]));

export const SUBMISSION_STATUSES = ["New", "Contacted", "In discussion", "Won", "Closed", "Spam"] as const;
