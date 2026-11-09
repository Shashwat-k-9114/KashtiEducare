import type { Field } from "./schema";

/* eslint-disable @typescript-eslint/no-explicit-any */

const isEmpty = (v: any) =>
  v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0) || (typeof v === "object" && !Array.isArray(v) && Object.keys(v).length === 0);

/** Cleans what the editor produced: trims text, coerces numbers, drops empty optional values and blank rows. */
export function normalize(f: Field, v: any): any {
  switch (f.type) {
    case "number": {
      if (v === "" || v === null || v === undefined) return undefined;
      const n = Number(v);
      return Number.isFinite(n) ? n : undefined;
    }
    case "multiselect":
      return Array.isArray(v) ? v.filter((x) => typeof x === "string" && x) : [];
    case "object": {
      const src = v && typeof v === "object" && !Array.isArray(v) ? v : {};
      const out: Record<string, any> = { ...src }; // keep keys the editor does not know about (e.g. hidden settings)
      for (const c of f.fields || []) {
        if (!c.key) continue;
        const nv = normalize(c, src[c.key]);
        if (isEmpty(nv) && !c.required) delete out[c.key];
        else out[c.key] = nv;
      }
      return out;
    }
    case "list": {
      const arr = Array.isArray(v) ? v : [];
      const item = f.item as Field;
      return arr
        .map((x) => normalize(item, x))
        .filter((x) => !isEmpty(x) && !(item.type === "object" && Object.values(x).every((y) => isEmpty(y))));
    }
    case "map": {
      const out: Record<string, string> = {};
      for (const [k, val] of Object.entries(v && typeof v === "object" ? v : {})) {
        const key = k.trim();
        if (key) out[key] = String(val ?? "").trim();
      }
      return out;
    }
    default:
      return typeof v === "string" ? v.trim() : v === undefined || v === null ? "" : String(v);
  }
}

/**
 * normalize() drops empty optional values so the sheet stays tidy, but the site engine expects list-like
 * fields (e.g. a programme's `themes` / `formats`) to always be arrays. Put empty arrays back before use.
 */
export function hydrate(f: Field, v: any): any {
  switch (f.type) {
    case "object": {
      if (!v || typeof v !== "object" || Array.isArray(v)) return v;
      const out: Record<string, any> = { ...v };
      for (const c of f.fields || []) {
        if (!c.key) continue;
        if (out[c.key] === undefined || out[c.key] === null) {
          if (c.type === "multiselect" || c.type === "list") out[c.key] = [];
          // Optional text left blank in the editor must read as "" (not undefined) so templates never print "undefined".
          else if (c.type !== "object" && c.type !== "map" && c.type !== "number") out[c.key] = "";
        } else out[c.key] = hydrate(c, out[c.key]);
      }
      return out;
    }
    case "list":
      return Array.isArray(v) ? v.map((x) => hydrate(f.item as Field, x)) : v;
    default:
      return v;
  }
}

const URL_OK = /^(https?:\/\/\S+|mailto:\S+|tel:\S+|\/\S*|#\S*|[\w.-]+\/\S*|[\w-]+\.\w+\S*)$/i;

/** Returns human-readable problems; empty array means OK. Runs in the browser before saving and again on the server. */
export function validate(f: Field, v: any, path = ""): string[] {
  const errs: string[] = [];
  const where = (label: string) => (path ? `${path} › ${label}` : label);
  switch (f.type) {
    case "object":
      for (const c of f.fields || []) if (c.key) errs.push(...validate(c, v?.[c.key], path));
      break;
    case "list":
      (Array.isArray(v) ? v : []).forEach((item, i) => {
        const t = f.item as Field;
        const title = (f.titleKey && item?.[f.titleKey]) || `#${i + 1}`;
        errs.push(...validate(t, item, `${f.label} › ${title}`));
      });
      break;
    case "text": case "textarea":
      if (f.required && !String(v ?? "").trim()) errs.push(`${where(f.label)} is required`);
      break;
    case "url": case "image":
      if (f.required && !String(v ?? "").trim()) errs.push(`${where(f.label)} is required`);
      else if (v && (/^\s*javascript:/i.test(v) || /\s/.test(String(v).trim()) || !URL_OK.test(String(v).trim()))) errs.push(`${where(f.label)} is not a valid address`);
      break;
    case "color":
      if (v && !/^#[0-9a-f]{3,8}$/i.test(String(v))) errs.push(`${where(f.label)} must be a colour like #0F3E9E`);
      break;
    case "date":
      if (f.required && !v) errs.push(`${where(f.label)} is required`);
      else if (v && !/^\d{4}-\d{2}-\d{2}$/.test(String(v))) errs.push(`${where(f.label)} must be a date`);
      break;
    case "number":
      if (f.required && (v === undefined || v === null || v === "" || !Number.isFinite(Number(v)))) errs.push(`${where(f.label)} must be a number`);
      break;
    case "select":
      if (f.required && !v) errs.push(`${where(f.label)} is required`);
      break;
  }
  return errs;
}
