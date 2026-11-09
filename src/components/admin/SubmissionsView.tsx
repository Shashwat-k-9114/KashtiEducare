"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { SUBMISSION_STATUSES } from "@/lib/admin/schema";
import { Icon } from "./Icon";

type Enq = { row: number; received: string; role: string; name: string; org: string; email: string; phone: string; programme: string; learners: string; message: string; consent: string; page: string; status: string; notes: string };
type Sub = { row: number; received: string; email: string; role: string; page: string };
type Tab = "enquiries" | "newsletter";

const PAGE = 25;
const fmt = (iso: string) => new Date(iso).toLocaleString(undefined, { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

function csv(rows: Record<string, string | number>[]) {
  if (!rows.length) return "";
  const cols = Object.keys(rows[0]);
  const q = (v: string | number) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return [cols.map(q).join(","), ...rows.map((r) => cols.map((c) => q(r[c])).join(","))].join("\n");
}
function download(name: string, text: string) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob(["﻿" + text], { type: "text/csv;charset=utf-8" }));
  a.download = name;
  a.click();
  URL.revokeObjectURL(a.href);
}

export function SubmissionsView() {
  const [enq, setEnq] = useState<Enq[] | null>(null);
  const [subs, setSubs] = useState<Sub[]>([]);
  const [err, setErr] = useState("");
  const [tab, setTab] = useState<Tab>("enquiries");
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState<Enq | null>(null);
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<{ ok: boolean; text: string } | null>(null);

  const load = useCallback(async () => {
    setErr("");
    try {
      const res = await fetch("/api/admin/submissions", { cache: "no-store" });
      if (res.status === 401) { location.href = "/admin/login"; return; }
      const out = await res.json();
      if (!res.ok || !out.ok) throw new Error(out.error || "Could not load submissions.");
      setEnq([...out.enquiries].reverse());
      setSubs([...out.newsletter].reverse());
    } catch (e) {
      setErr((e as Error).message);
      setEnq([]);
    }
  }, []);

  useEffect(() => {
    if (new URLSearchParams(location.search).get("tab") === "newsletter") setTab("newsletter");
    load();
  }, [load]);
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(null), 4500); return () => clearTimeout(t); } }, [toast]);
  useEffect(() => setPage(0), [tab, q, status]);

  const call = async (method: "PATCH" | "DELETE", body: unknown) => {
    const res = await fetch("/api/admin/submissions", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const out = await res.json().catch(() => ({ ok: false, error: "Unexpected response." }));
    if (!res.ok || !out.ok) throw new Error(out.error || "Request failed.");
  };

  const ql = q.trim().toLowerCase();
  const rowsE = useMemo(() => (enq || []).filter((r) => (status === "all" || r.status === status) && (!ql || [r.name, r.org, r.email, r.phone, r.programme, r.role, r.message].join(" ").toLowerCase().includes(ql))), [enq, status, ql]);
  const rowsS = useMemo(() => subs.filter((r) => !ql || [r.email, r.role].join(" ").toLowerCase().includes(ql)), [subs, ql]);
  const total = tab === "enquiries" ? rowsE.length : rowsS.length;
  const pages = Math.max(1, Math.ceil(total / PAGE));

  const openRow = (r: Enq) => { setOpen(r); setNotes(r.notes || ""); };

  const patch = async (r: Enq, change: { status?: string; notes?: string }) => {
    setBusy(true);
    try {
      await call("PATCH", { sheet: "Enquiries", row: r.row, expectEmail: r.email, ...change });
      const next = { ...r, ...change };
      setEnq((list) => (list || []).map((x) => (x.row === r.row ? next : x)));
      setOpen(next);
      setToast({ ok: true, text: change.status ? `Marked as ${change.status}.` : "Notes saved." });
    } catch (e) {
      setToast({ ok: false, text: (e as Error).message });
    } finally { setBusy(false); }
  };

  const remove = async (sheet: "Enquiries" | "Newsletter", row: number, email: string) => {
    if (!confirm(`Delete the submission from ${email}? This removes the row from the Google Sheet and cannot be undone.`)) return;
    setBusy(true);
    try {
      await call("DELETE", { sheet, row, expectEmail: email });
      setOpen(null);
      await load(); // row numbers shift after a delete, so reload
      setToast({ ok: true, text: "Deleted." });
    } catch (e) {
      setToast({ ok: false, text: (e as Error).message });
    } finally { setBusy(false); }
  };

  const exportCsv = () => {
    if (tab === "enquiries") download("kashti-enquiries.csv", csv(rowsE.map((r) => ({ Received: r.received, Status: r.status, Role: r.role, Name: r.name, Organisation: r.org, Email: r.email, Phone: r.phone, Programme: r.programme, Learners: r.learners, Message: r.message, Notes: r.notes, Page: r.page }))));
    else download("kashti-newsletter.csv", csv(rowsS.map((r) => ({ Received: r.received, Email: r.email, Role: r.role, Page: r.page }))));
  };

  const counts = useMemo(() => Object.fromEntries(SUBMISSION_STATUSES.map((s) => [s, (enq || []).filter((r) => r.status === s).length])), [enq]);

  return (
    <>
      {err ? <div className="a-alert err" role="alert" style={{ marginBottom: 16 }}><Icon name="info" /><span>{err}</span></div> : null}

      <div className="a-row" style={{ justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div className="a-tabs" role="group" aria-label="Submission type">
          <button type="button" aria-pressed={tab === "enquiries"} onClick={() => setTab("enquiries")}>Enquiries{enq ? ` (${enq.length})` : ""}</button>
          <button type="button" aria-pressed={tab === "newsletter"} onClick={() => setTab("newsletter")}>Newsletter ({subs.length})</button>
        </div>
        <div className="a-row">
          <button type="button" className="a-btn o sm" onClick={load}><Icon name="a-undo" />Refresh</button>
          <button type="button" className="a-btn o sm" onClick={exportCsv} disabled={!total}><Icon name="a-csv" />Export CSV</button>
        </div>
      </div>

      <div className="a-tools">
        <input className="a-in" type="search" placeholder={tab === "enquiries" ? "Search name, school, email, phone…" : "Search email…"} value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search" style={{ minWidth: 260 }} />
        {tab === "enquiries" ? (
          <select className="a-sel" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status">
            <option value="all">All statuses</option>
            {SUBMISSION_STATUSES.map((s) => <option key={s} value={s}>{s} ({counts[s] ?? 0})</option>)}
          </select>
        ) : null}
      </div>

      <div className="a-twrap">
        {enq === null ? (
          <div className="a-empty" style={{ border: 0 }}>Loading submissions…</div>
        ) : tab === "enquiries" ? (
          <table className="a-table">
            <thead><tr><th>Received</th><th>Who</th><th>Interested in</th><th>Contact</th><th>Status</th></tr></thead>
            <tbody>
              {rowsE.slice(page * PAGE, page * PAGE + PAGE).map((r) => (
                <tr key={r.row} onClick={() => openRow(r)} tabIndex={0} onKeyDown={(e) => e.key === "Enter" && openRow(r)}>
                  <td style={{ whiteSpace: "nowrap" }}>{fmt(r.received)}</td>
                  <td><div className="nm">{r.name}</div><div className="sub">{r.org} · {r.role}</div></td>
                  <td>{r.programme || <span className="sub">–</span>}<div className="sub">{r.learners}</div></td>
                  <td><div>{r.email}</div><div className="sub">{r.phone}</div></td>
                  <td><span className={`a-st ${r.status}`}>{r.status}</span></td>
                </tr>
              ))}
              {!rowsE.length ? <tr><td colSpan={5}><div className="a-empty" style={{ border: 0 }}>{enq.length ? "No enquiries match your filters." : "No enquiries yet."}</div></td></tr> : null}
            </tbody>
          </table>
        ) : (
          <table className="a-table" style={{ minWidth: 560 }}>
            <thead><tr><th>Subscribed</th><th>Email</th><th>They are a…</th><th /></tr></thead>
            <tbody>
              {rowsS.slice(page * PAGE, page * PAGE + PAGE).map((r) => (
                <tr key={r.row} style={{ cursor: "default" }}>
                  <td style={{ whiteSpace: "nowrap" }}>{fmt(r.received)}</td>
                  <td className="nm">{r.email}</td>
                  <td>{r.role || "–"}</td>
                  <td style={{ textAlign: "right" }}><button type="button" className="a-icon-btn d" onClick={() => remove("Newsletter", r.row, r.email)} aria-label={`Delete ${r.email}`} disabled={busy}><Icon name="a-trash" /></button></td>
                </tr>
              ))}
              {!rowsS.length ? <tr><td colSpan={4}><div className="a-empty" style={{ border: 0 }}>No subscribers yet.</div></td></tr> : null}
            </tbody>
          </table>
        )}
      </div>
      {total > PAGE ? (
        <div className="a-pager">
          <span>Showing {page * PAGE + 1}–{Math.min(total, page * PAGE + PAGE)} of {total}</span>
          <span className="a-row">
            <button type="button" className="a-btn o sm" disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</button>
            <button type="button" className="a-btn o sm" disabled={page >= pages - 1} onClick={() => setPage(page + 1)}>Next</button>
          </span>
        </div>
      ) : null}

      {open ? (
        <>
          <div className="a-drawer-bg" onClick={() => setOpen(null)} />
          <aside className="a-drawer" role="dialog" aria-modal="true" aria-label="Enquiry details">
            <div className="a-drawer-h">
              <div className="a-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                <div><h2>{open.name}</h2><p>{open.org} · {open.role}</p></div>
                <button type="button" className="a-icon-btn" onClick={() => setOpen(null)} aria-label="Close"><Icon name="x" /></button>
              </div>
            </div>
            <div className="a-drawer-b">
              <label className="a-field">
                <span className="a-lbl">Status</span>
                <select className="a-sel" value={open.status} disabled={busy} onChange={(e) => patch(open, { status: e.target.value })}>
                  {SUBMISSION_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </label>
              <dl className="a-kv">
                <dt>Received</dt><dd>{fmt(open.received)}</dd>
                <dt>Email</dt><dd><a href={`mailto:${open.email}`}>{open.email}</a></dd>
                <dt>Phone</dt><dd><a href={`tel:${open.phone}`}>{open.phone}</a></dd>
                {open.programme ? (<><dt>Programme</dt><dd>{open.programme}</dd></>) : null}
                {open.learners ? (<><dt>Learners</dt><dd>{open.learners}</dd></>) : null}
                <dt>Message</dt><dd>{open.message || "–"}</dd>
                <dt>Consent</dt><dd>{open.consent}</dd>
                {open.page ? (<><dt>Sent from</dt><dd>{open.page}</dd></>) : null}
              </dl>
              <label className="a-field">
                <span className="a-lbl">Private notes</span>
                <textarea className="a-ta" rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Calls, next steps, quotes sent…" />
                <small className="a-help">Only visible here and in the sheet. Never shown to the visitor.</small>
              </label>
              <button type="button" className="a-btn o sm" style={{ justifySelf: "start" }} disabled={busy || notes === (open.notes || "")} onClick={() => patch(open, { notes })}>Save notes</button>
            </div>
            <div className="a-drawer-f">
              <a className="a-btn s" href={`mailto:${open.email}?subject=${encodeURIComponent("Your enquiry with Kashti Educare")}`}><Icon name="mail" />Reply by email</a>
              <button type="button" className="a-btn d" disabled={busy} onClick={() => remove("Enquiries", open.row, open.email)}><Icon name="a-trash" />Delete</button>
            </div>
          </aside>
        </>
      ) : null}

      {toast ? <div className={`a-toast ${toast.ok ? "" : "err"}`} role="status" style={{ bottom: 24 }}><Icon name={toast.ok ? "check" : "info"} />{toast.text}</div> : null}
    </>
  );
}
