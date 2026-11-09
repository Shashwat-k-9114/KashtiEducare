"use client";

import { useState } from "react";
import { ICONS, type Field, type Opt, type OptSource } from "@/lib/admin/schema";
import { Icon } from "./Icon";

/* eslint-disable @typescript-eslint/no-explicit-any */

export type Lookups = Record<string, Opt[]>;
type P = { field: Field; value: any; onChange: (v: any) => void; lookups: Lookups };

const SITE = "https://kashtieducare.com";

function options(field: Field, lookups: Lookups): Opt[] {
  const o = field.options;
  if (!o) return [];
  if (Array.isArray(o)) return o;
  return lookups[(o as OptSource).from] || [];
}

/** An empty value of the right shape for a field (used by "Add"). */
export function blank(f: Field): any {
  switch (f.type) {
    case "list": return [];
    case "multiselect": return [];
    case "map": return {};
    case "object": return Object.fromEntries((f.fields || []).filter((c) => c.key).map((c) => [c.key!, blank(c)]));
    case "number": return "";
    default: return "";
  }
}

const wide = (f: Field) => f.type === "textarea" || f.type === "object" || f.type === "list" || f.type === "map" || f.type === "multiselect";

function Wrap({ field, children }: { field: Field; children: React.ReactNode }) {
  return (
    <label className="a-field">
      <span className="a-lbl">
        {field.label}
        {field.required ? <i title="Required">*</i> : null}
      </span>
      {children}
      {field.help ? <small className="a-help">{field.help}</small> : null}
    </label>
  );
}

export function FieldEditor({ field, value, onChange, lookups }: P) {
  const f = field;
  switch (f.type) {
    case "text":
    case "url":
    case "month":
      return (
        <Wrap field={f}>
          <input className="a-in" type="text" value={value ?? ""} placeholder={f.placeholder} onChange={(e) => onChange(e.target.value)} inputMode={f.type === "url" ? "url" : undefined} />
        </Wrap>
      );
    case "number":
      return (
        <Wrap field={f}>
          <input className="a-in" type="number" value={value ?? ""} placeholder={f.placeholder} onChange={(e) => onChange(e.target.value)} />
        </Wrap>
      );
    case "date":
      return (
        <Wrap field={f}>
          <input className="a-in" type="date" value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
        </Wrap>
      );
    case "textarea":
      return (
        <Wrap field={f}>
          <textarea className="a-ta" rows={f.rows || 3} value={value ?? ""} placeholder={f.placeholder} onChange={(e) => onChange(e.target.value)} />
        </Wrap>
      );
    case "image": {
      const src = value ? (String(value).startsWith("/") ? SITE + value : value) : "";
      return (
        <Wrap field={f}>
          <div className="a-imgpick">
            <input className="a-in" type="text" value={value ?? ""} placeholder="/images/… or https://…" onChange={(e) => onChange(e.target.value)} />
            <div className="th" style={src ? { backgroundImage: `url("${String(src).replace(/"/g, "%22")}")` } : undefined} aria-hidden="true" />
          </div>
        </Wrap>
      );
    }
    case "color":
      return (
        <Wrap field={f}>
          <div className="a-color">
            <input type="color" value={/^#[0-9a-f]{6}$/i.test(value || "") ? value : "#0F3E9E"} onChange={(e) => onChange(e.target.value.toUpperCase())} aria-label={`${f.label} picker`} />
            <input className="a-in" type="text" value={value ?? ""} placeholder="#0F3E9E" onChange={(e) => onChange(e.target.value)} />
          </div>
        </Wrap>
      );
    case "icon": {
      const list = value && !ICONS.includes(value) ? [value, ...ICONS] : ICONS;
      return (
        <Wrap field={f}>
          <div className="a-iconpick">
            <span className="pv">{value ? <Icon name={value} /> : null}</span>
            <select className="a-sel" value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
              <option value="">(none)</option>
              {list.map((i) => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
        </Wrap>
      );
    }
    case "select": {
      const opts = options(f, lookups);
      const has = opts.some((o) => o.value === value);
      return (
        <Wrap field={f}>
          <select className="a-sel" value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
            <option value="">{f.required ? "Choose…" : "(none)"}</option>
            {!has && value ? <option value={value}>{value} (current)</option> : null}
            {opts.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </Wrap>
      );
    }
    case "multiselect": {
      const opts = options(f, lookups);
      const cur: string[] = Array.isArray(value) ? value : [];
      const extra = cur.filter((c) => !opts.some((o) => o.value === c));
      const all = [...opts, ...extra.map((e) => ({ value: e, label: `${e} (current)` }))];
      const toggle = (v: string) => onChange(cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]);
      return (
        <div className="a-field">
          <span className="a-lbl">{f.label}</span>
          <div className="a-chips" role="group" aria-label={f.label}>
            {all.map((o) => (
              <button type="button" key={o.value} className="a-chip" aria-pressed={cur.includes(o.value)} onClick={() => toggle(o.value)}>
                {o.label}
              </button>
            ))}
          </div>
          {f.help ? <small className="a-help">{f.help}</small> : null}
        </div>
      );
    }
    case "object":
      return <ObjectEditor {...{ field: f, value, onChange, lookups }} />;
    case "list":
      return <ListEditor {...{ field: f, value, onChange, lookups }} />;
    case "map":
      return <MapEditor {...{ field: f, value, onChange, lookups }} />;
  }
}

function ObjectEditor({ field, value, onChange, lookups }: P) {
  const obj = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  const kids = (field.fields || []).filter((c) => c.key);
  const compact = kids.every((c) => !wide(c));
  const body = (
    <div className={`a-obj ${compact ? "cols" : ""}`}>
      {kids.map((c) => (
        <div key={c.key} className={wide(c) ? "a-wide" : undefined} style={wide(c) && !compact ? undefined : undefined}>
          <FieldEditor field={c} value={obj[c.key!]} lookups={lookups} onChange={(v) => onChange({ ...obj, [c.key!]: v })} />
        </div>
      ))}
    </div>
  );
  // A nested object (inside another field) gets a labelled frame; the section root does not.
  return field.key ? (
    <div className="a-sub">
      <span className="a-lbl">{field.label}</span>
      {field.help ? <small className="a-help" style={{ display: "block", marginBottom: 10 }}>{field.help}</small> : null}
      {body}
    </div>
  ) : (
    body
  );
}

function itemTitle(f: Field, item: any, i: number): { t: string; s: string } {
  const it = f.item as Field;
  if (it.type === "object") {
    const t = (f.titleKey && item?.[f.titleKey]) || "";
    const s = (f.subtitleKey && item?.[f.subtitleKey]) || "";
    return { t: String(t || `${it.label} ${i + 1}`), s: String(s || "") };
  }
  if (Array.isArray(item)) return { t: item.filter(Boolean).join(" · ") || `${it.label} ${i + 1}`, s: "" };
  return { t: String(item ?? "") || `${it.label} ${i + 1}`, s: "" };
}

function ListEditor({ field, value, onChange, lookups }: P) {
  const items: any[] = Array.isArray(value) ? value : [];
  const it = field.item as Field;
  const simple = it.type !== "object" && it.type !== "list";
  const [open, setOpen] = useState<Set<number>>(new Set());
  const [q, setQ] = useState("");

  const set = (next: any[]) => onChange(next);
  const upd = (i: number, v: any) => set(items.map((x, k) => (k === i ? v : x)));
  const shiftOpen = (fn: (n: number) => number | null) => setOpen(new Set([...open].map(fn).filter((n): n is number => n !== null)));

  const add = () => {
    const nv = blank(it);
    setQ(""); // otherwise an active search could hide the item that was just added
    if (field.prepend) {
      set([nv, ...items]);
      shiftOpen((n) => n + 1);
      setOpen((o) => new Set([...o, 0]));
    } else {
      set([...items, nv]);
      setOpen((o) => new Set([...o, items.length]));
    }
  };
  const del = (i: number) => {
    set(items.filter((_, k) => k !== i));
    shiftOpen((n) => (n === i ? null : n > i ? n - 1 : n));
  };
  const dup = (i: number) => {
    set([...items.slice(0, i + 1), JSON.parse(JSON.stringify(items[i])), ...items.slice(i + 1)]);
    shiftOpen((n) => (n > i ? n + 1 : n));
    setOpen((o) => new Set([...o, i + 1]));
  };
  const move = (i: number, d: -1 | 1) => {
    const j = i + d;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    set(next);
    shiftOpen((n) => (n === i ? j : n === j ? i : n));
  };
  const toggle = (i: number) => setOpen((o) => { const n = new Set(o); n.has(i) ? n.delete(i) : n.add(i); return n; });

  const head = (
    <div className="a-list-h">
      <h3>{field.label}<span className="a-count">{items.length}</span></h3>
      <div className="a-row">
        {!simple && items.length > 8 ? <input className="a-in a-search" type="search" placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} aria-label={`Search ${field.label}`} /> : null}
        {!simple && items.length > 1 ? (
          <button type="button" className="a-btn o sm" onClick={() => setOpen(open.size ? new Set() : new Set(items.map((_, i) => i)))}>{open.size ? "Collapse all" : "Expand all"}</button>
        ) : null}
        <button type="button" className="a-btn o sm" onClick={add}><Icon name="plus" />{field.addLabel || "Add"}</button>
      </div>
    </div>
  );

  if (simple) {
    return (
      <div className={field.key ? "a-sub" : "a-list"}>
        {head}
        {field.help ? <small className="a-help" style={{ display: "block", margin: "6px 0" }}>{field.help}</small> : null}
        <div className="a-list" style={{ marginTop: 10 }}>
          {items.map((x, i) => (
            <div className="a-simple" key={i}>
              <input className="a-in" type={it.type === "number" ? "number" : "text"} value={x ?? ""} placeholder={it.label} onChange={(e) => upd(i, e.target.value)} aria-label={`${field.label} ${i + 1}`} />
              <span className="a-row">
                <button type="button" className="a-icon-btn" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move up"><Icon name="a-up" /></button>
                <button type="button" className="a-icon-btn" disabled={i === items.length - 1} onClick={() => move(i, 1)} aria-label="Move down"><Icon name="a-down" /></button>
                <button type="button" className="a-icon-btn d" onClick={() => del(i)} aria-label="Remove"><Icon name="a-trash" /></button>
              </span>
            </div>
          ))}
          {!items.length ? <div className="a-empty">Nothing here yet.</div> : null}
        </div>
      </div>
    );
  }

  const ql = q.trim().toLowerCase();
  const shown = items.map((x, i) => ({ x, i })).filter(({ x }) => !ql || JSON.stringify(x).toLowerCase().includes(ql));

  return (
    <div className={field.key ? "a-sub" : "a-list"}>
      {head}
      {field.help ? <small className="a-help" style={{ display: "block", margin: "6px 0" }}>{field.help}</small> : null}
      <div className="a-list" style={{ marginTop: 12 }}>
        {shown.map(({ x, i }) => {
          const { t, s } = itemTitle(field, x, i);
          const isOpen = open.has(i);
          return (
            <div className={`a-item ${isOpen ? "open" : ""}`} key={i}>
              <div className="a-item-h">
                <button type="button" className="a-item-t" onClick={() => toggle(i)} aria-expanded={isOpen}>
                  <span className="n">{i + 1}</span>
                  <b>{t}</b>
                  {s ? <span className="s">{s}</span> : null}
                  <Icon name="a-down" className="chev" />
                </button>
                <span className="a-item-acts">
                  <button type="button" className="a-icon-btn" disabled={!!ql || i === 0} onClick={() => move(i, -1)} aria-label="Move up"><Icon name="a-up" /></button>
                  <button type="button" className="a-icon-btn" disabled={!!ql || i === items.length - 1} onClick={() => move(i, 1)} aria-label="Move down"><Icon name="a-down" /></button>
                  <button type="button" className="a-icon-btn" onClick={() => dup(i)} aria-label="Duplicate"><Icon name="a-copy" /></button>
                  <button type="button" className="a-icon-btn d" onClick={() => { if (confirm(`Remove “${t}”?`)) del(i); }} aria-label="Remove"><Icon name="a-trash" /></button>
                </span>
              </div>
              {isOpen ? (
                <div className="a-item-b">
                  <FieldEditor field={{ ...it, key: undefined }} value={x} lookups={lookups} onChange={(v) => upd(i, v)} />
                </div>
              ) : null}
            </div>
          );
        })}
        {!items.length ? <div className="a-empty">Nothing here yet. Use “{field.addLabel || "Add"}” to create the first one.</div> : null}
        {items.length && !shown.length ? <div className="a-empty">No matches for “{q}”.</div> : null}
      </div>
    </div>
  );
}

function MapEditor({ field, value, onChange }: P) {
  const obj: Record<string, string> = value && typeof value === "object" ? value : {};
  const entries = Object.entries(obj);
  const area = field.valueType === "textarea";
  // Rebuild in order so renaming a key keeps its position.
  const put = (list: [string, string][]) => onChange(Object.fromEntries(list));
  return (
    <div className={field.key ? "a-sub" : "a-list"}>
      <div className="a-list-h">
        <h3>{field.label}<span className="a-count">{entries.length}</span></h3>
        {!field.fixedKeys ? (
          <button type="button" className="a-btn o sm" onClick={() => put([...entries, [`new-${entries.length + 1}`, ""]])}><Icon name="plus" />Add</button>
        ) : null}
      </div>
      <div className="a-list" style={{ marginTop: 12 }}>
        <div className="a-map" aria-hidden="true">
          <span className="a-lbl">{field.keyLabel || "Name"}</span><span className="a-lbl">{field.valueLabel || "Value"}</span><span />
        </div>
        {entries.map(([k, v], i) => (
          <div className="a-map" key={i}>
            <input className="a-in" value={k} readOnly={field.fixedKeys} onChange={(e) => put(entries.map((en, n) => (n === i ? [e.target.value, en[1]] : en)) as [string, string][])} aria-label={field.keyLabel || "Name"} />
            {area ? (
              <textarea className="a-ta" style={{ minHeight: 60 }} value={v} onChange={(e) => put(entries.map((en, n) => (n === i ? [en[0], e.target.value] : en)) as [string, string][])} aria-label={field.valueLabel || "Value"} />
            ) : (
              <input className="a-in" value={v} onChange={(e) => put(entries.map((en, n) => (n === i ? [en[0], e.target.value] : en)) as [string, string][])} aria-label={field.valueLabel || "Value"} />
            )}
            {!field.fixedKeys ? (
              <button type="button" className="a-icon-btn d" onClick={() => put(entries.filter((_, n) => n !== i))} aria-label="Remove"><Icon name="a-trash" /></button>
            ) : <span />}
          </div>
        ))}
      </div>
    </div>
  );
}
