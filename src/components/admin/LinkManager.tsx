"use client";

import { AlertCircle, ArrowDown, ArrowUp, Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";

import { connectIconOptions } from "@/components/connect/BrandIcons";
import type { ConnectLink } from "@/lib/connectValidation";

const inputClasses =
  "w-full rounded-lg border bg-kashti-bg-light px-3.5 py-2 text-sm text-kashti-charcoal placeholder:text-kashti-charcoal/35 transition-colors focus:outline-none focus:ring-2 focus:ring-kashti-green/25";

type DraftLink = { name: string; url: string; icon: string; description: string; category: string };

const emptyDraft: DraftLink = { name: "", url: "", icon: connectIconOptions[0], description: "", category: "" };

async function apiCall(method: string, body: unknown) {
  const response = await fetch("/api/admin/connect/links", {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return response.json().catch(() => ({ status: "error", message: "Unexpected response." }));
}

export function LinkManager({ initialLinks }: { initialLinks: ConnectLink[] }) {
  const [links, setLinks] = useState<ConnectLink[]>(initialLinks);
  const [draft, setDraft] = useState<DraftLink>(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const sorted = [...links].sort((a, b) => a.position - b.position);

  const refresh = async () => {
    const response = await fetch("/api/admin/connect/links");
    const result = await response.json().catch(() => null);
    if (result?.links) setLinks(result.links);
  };

  const resetForm = () => {
    setDraft(emptyDraft);
    setEditingId(null);
    setShowForm(false);
    setError("");
  };

  const handleSubmit = async () => {
    setBusy(true);
    setError("");
    const result = editingId
      ? await apiCall("PATCH", { mode: "update", id: editingId, ...draft })
      : await apiCall("POST", draft);
    setBusy(false);
    if (result.status !== "ok" && !result.ok) {
      setError(result.message || Object.values(result.errors ?? {})[0] || "Could not save. Try again.");
      return;
    }
    await refresh();
    resetForm();
  };

  const toggleEnabled = async (link: ConnectLink) => {
    setBusy(true);
    await apiCall("PATCH", { mode: "update", id: link.id, enabled: !link.enabled });
    await refresh();
    setBusy(false);
  };

  const remove = async (link: ConnectLink) => {
    if (!confirm(`Delete "${link.name}"? This can't be undone from the dashboard.`)) return;
    setBusy(true);
    await fetch("/api/admin/connect/links", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: link.id }),
    });
    await refresh();
    setBusy(false);
  };

  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= sorted.length) return;
    const reordered = [...sorted];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    const order = reordered.map((link, i) => ({ id: link.id, position: i }));
    setBusy(true);
    await apiCall("PATCH", { mode: "reorder", order });
    await refresh();
    setBusy(false);
  };

  const startEdit = (link: ConnectLink) => {
    setEditingId(link.id);
    setDraft({ name: link.name, url: link.url, icon: link.icon, description: link.description, category: link.category });
    setShowForm(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-2">
        {sorted.map((link, index) => (
          <li
            key={link.id}
            className="flex items-center gap-3 rounded-lg border px-3 py-2.5"
            style={{ borderColor: "var(--kashti-border-light)" }}
          >
            <div className="flex shrink-0 flex-col">
              <button type="button" disabled={busy || index === 0} onClick={() => move(index, -1)} className="text-kashti-charcoal/40 hover:text-kashti-charcoal disabled:opacity-30" aria-label={`Move ${link.name} up`}>
                <ArrowUp size={13} strokeWidth={2} />
              </button>
              <button type="button" disabled={busy || index === sorted.length - 1} onClick={() => move(index, 1)} className="text-kashti-charcoal/40 hover:text-kashti-charcoal disabled:opacity-30" aria-label={`Move ${link.name} down`}>
                <ArrowDown size={13} strokeWidth={2} />
              </button>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-kashti-charcoal">{link.name}</p>
              <p className="truncate text-xs text-kashti-charcoal/50">{link.url}</p>
            </div>
            <button
              type="button"
              disabled={busy}
              onClick={() => toggleEnabled(link)}
              className="font-mono-label shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase"
              style={{
                backgroundColor: link.enabled ? "rgba(26, 168, 118, 0.14)" : "rgba(69,69,69,0.08)",
                color: link.enabled ? "var(--kashti-green-deep)" : "var(--kashti-charcoal)",
              }}
            >
              {link.enabled ? "Enabled" : "Disabled"}
            </button>
            <button type="button" disabled={busy} onClick={() => startEdit(link)} className="shrink-0 text-kashti-charcoal/40 hover:text-kashti-green-deep" aria-label={`Edit ${link.name}`}>
              <Pencil size={15} strokeWidth={1.75} />
            </button>
            <button type="button" disabled={busy} onClick={() => remove(link)} className="shrink-0 text-kashti-charcoal/40 hover:text-kashti-coral-deep" aria-label={`Delete ${link.name}`}>
              <Trash2 size={15} strokeWidth={1.75} />
            </button>
          </li>
        ))}
        {sorted.length === 0 ? <p className="text-sm text-kashti-charcoal/50">No links yet — add one below.</p> : null}
      </ul>

      {showForm ? (
        <div className="rounded-lg border p-4" style={{ borderColor: "var(--kashti-border-light)" }}>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-kashti-charcoal">{editingId ? "Edit link" : "New link"}</p>
            <button type="button" onClick={resetForm} className="text-kashti-charcoal/40 hover:text-kashti-charcoal" aria-label="Cancel">
              <X size={16} strokeWidth={2} />
            </button>
          </div>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input placeholder="Name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className={inputClasses} />
            <select value={draft.icon} onChange={(e) => setDraft({ ...draft, icon: e.target.value })} className={inputClasses}>
              {connectIconOptions.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </select>
            <input placeholder="https://... / mailto:... / tel:..." value={draft.url} onChange={(e) => setDraft({ ...draft, url: e.target.value })} className={`${inputClasses} sm:col-span-2`} />
            <input placeholder="Description (optional)" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} className={inputClasses} />
            <input placeholder="Category (optional, e.g. social)" value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} className={inputClasses} />
          </div>
          {error ? (
            <div className="mt-3 flex items-center gap-2 rounded-lg border border-kashti-coral/40 bg-kashti-coral/10 px-3 py-2 text-xs text-kashti-coral-deep">
              <AlertCircle size={14} strokeWidth={2} />
              {error}
            </div>
          ) : null}
          <button
            type="button"
            disabled={busy}
            onClick={handleSubmit}
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-kashti-green px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-kashti-green-soft disabled:opacity-60"
          >
            {busy ? <Loader2 size={14} className="animate-spin" /> : null}
            {editingId ? "Save Changes" : "Add Link"}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-1.5 self-start rounded-full border border-kashti-green/40 px-4 py-2 text-sm font-semibold text-kashti-green-deep transition-colors hover:bg-kashti-green/5"
        >
          <Plus size={15} strokeWidth={2.25} />
          Add Link
        </button>
      )}
    </div>
  );
}
