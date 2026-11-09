"use client";

import { useEffect, useMemo, useState } from "react";
import { normalize, validate } from "@/lib/admin/normalize";
import type { Field } from "@/lib/admin/schema";
import { FieldEditor, type Lookups } from "./FieldEditor";
import { Icon } from "./Icon";

/* eslint-disable @typescript-eslint/no-explicit-any */

type Props = {
  sectionKey: string;
  title: string;
  root: Field;
  initial: any;
  defaults: any;
  overridden: boolean;
  updated?: string;
  lookups: Lookups;
  viewHref: string;
};

export function SectionEditor({ sectionKey, title, root, initial, defaults, overridden: ov, updated, lookups, viewHref }: Props) {
  const [value, setValue] = useState<any>(initial);
  const [saved, setSaved] = useState<any>(initial);
  const [overridden, setOverridden] = useState(ov);
  const [when, setWhen] = useState(updated);
  const [busy, setBusy] = useState(false);
  const [problems, setProblems] = useState<string[]>([]);
  const [toast, setToast] = useState<{ ok: boolean; text: string } | null>(null);

  const dirty = useMemo(() => JSON.stringify(value) !== JSON.stringify(saved), [value, saved]);

  useEffect(() => {
    if (!dirty) return;
    const h = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(t);
  }, [toast]);

  const call = async (method: "PUT" | "DELETE", body?: unknown) => {
    const res = await fetch(`/api/admin/content/${sectionKey}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (res.status === 401) { location.href = "/admin/login"; throw new Error("Session expired"); }
    const out = await res.json().catch(() => ({ ok: false, error: "Unexpected response." }));
    return { res, out };
  };

  const save = async () => {
    const clean = normalize(root, value);
    const errs = validate(root, clean);
    setProblems(errs);
    if (errs.length) { setToast({ ok: false, text: "Please fix the highlighted problems first." }); return; }
    setBusy(true);
    try {
      const { res, out } = await call("PUT", { value: clean });
      if (!res.ok || !out.ok) {
        setProblems(out.problems || []);
        setToast({ ok: false, text: out.error || "Could not save." });
      } else {
        setValue(out.value); setSaved(out.value); setOverridden(true); setWhen(out.updated);
        setToast({ ok: true, text: "Saved. The live site updates within seconds." });
      }
    } catch (e) {
      setToast({ ok: false, text: (e as Error).message || "Network problem. Try again." });
    } finally { setBusy(false); }
  };

  const reset = async () => {
    if (!confirm(`Discard all your edits to “${title}” and go back to the original content on the live site?`)) return;
    setBusy(true);
    try {
      const { res, out } = await call("DELETE");
      if (!res.ok || !out.ok) setToast({ ok: false, text: out.error || "Could not reset." });
      else {
        setValue(defaults); setSaved(defaults); setOverridden(false); setWhen(undefined); setProblems([]);
        setToast({ ok: true, text: "Back to the original content." });
      }
    } catch (e) {
      setToast({ ok: false, text: (e as Error).message });
    } finally { setBusy(false); }
  };

  return (
    <div>
      {overridden ? (
        <div className="a-alert ok" style={{ marginBottom: 16 }}>
          <Icon name="check" />
          <span>This section has been edited{when ? <> (last saved <span suppressHydrationWarning>{new Date(when).toLocaleString()}</span>)</> : ""}. The live site shows your version.</span>
        </div>
      ) : (
        <div className="a-alert warn" style={{ marginBottom: 16 }}>
          <Icon name="info" />
          <span>Showing the original built-in content. Save a change to start overriding it. You can always go back to the original.</span>
        </div>
      )}

      {problems.length ? (
        <div className="a-alert err" role="alert" style={{ marginBottom: 16 }}>
          <Icon name="info" />
          <div>
            Please fix:
            <ul>{problems.map((p, i) => <li key={i}>{p}</li>)}</ul>
          </div>
        </div>
      ) : null}

      <div className="a-card">
        <FieldEditor field={root} value={value} onChange={setValue} lookups={lookups} />
      </div>

      <div className={`a-savebar ${dirty ? "dirty" : ""}`}>
        <span className="st"><i />{dirty ? "You have unsaved changes" : "All changes saved"}</span>
        <a className="a-btn o sm" href={viewHref} target="_blank" rel="noreferrer"><Icon name="a-ext" />View on site</a>
        {overridden ? <button type="button" className="a-btn o sm" onClick={reset} disabled={busy}><Icon name="a-undo" />Reset to original</button> : null}
        {dirty ? <button type="button" className="a-btn o sm" onClick={() => { setValue(saved); setProblems([]); }} disabled={busy}>Discard changes</button> : null}
        <button type="button" className="a-btn s" onClick={save} disabled={busy || !dirty}><Icon name="a-save" />{busy ? "Saving…" : "Save changes"}</button>
      </div>

      {toast ? <div className={`a-toast ${toast.ok ? "" : "err"}`} role="status"><Icon name={toast.ok ? "check" : "info"} />{toast.text}</div> : null}
    </div>
  );
}
