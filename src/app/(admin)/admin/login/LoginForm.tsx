"use client";

import { useState } from "react";
import { Icon } from "@/components/admin/Icon";

export function LoginForm() {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pw }) });
      const out = await res.json().catch(() => ({}));
      if (res.ok && out.ok) { location.href = "/admin"; return; }
      setErr(out.error || "Could not sign in.");
    } catch {
      setErr("Network problem. Please try again.");
    }
    setBusy(false);
  };

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 16 }}>
      <label className="a-field">
        <span className="a-lbl">Password</span>
        <input className="a-in" type="password" autoComplete="current-password" autoFocus required value={pw} onChange={(e) => setPw(e.target.value)} />
      </label>
      {err ? <div className="a-alert err" role="alert">{err}</div> : null}
      <button className="a-btn p" type="submit" disabled={busy || !pw}><Icon name="a-lock" />{busy ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}
