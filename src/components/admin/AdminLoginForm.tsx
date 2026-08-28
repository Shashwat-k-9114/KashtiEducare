"use client";

import { AlertCircle, ArrowRight, Loader2, Lock } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("submitting");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.status !== "ok") {
        setStatus("error");
        setErrorMessage(result?.message ?? "Something went wrong. Try again.");
        return;
      }
      router.push(searchParams.get("next") ?? "/admin/connect");
      router.refresh();
    } catch {
      setStatus("error");
      setErrorMessage("Could not reach the server. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label htmlFor="password" className="font-mono-label text-[11px] tracking-widest text-kashti-charcoal/55 uppercase">
          Admin password
        </label>
        <div className="relative mt-1.5">
          <Lock size={16} strokeWidth={1.75} className="absolute top-1/2 left-4 -translate-y-1/2 text-kashti-charcoal/35" />
          <input
            id="password"
            type="password"
            autoFocus
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            className="w-full rounded-lg border bg-kashti-bg-light py-2.5 pr-4 pl-11 text-sm text-kashti-charcoal transition-colors focus:outline-none focus:ring-2 focus:ring-kashti-green/25"
            style={{ borderColor: status === "error" ? "var(--kashti-coral)" : "var(--kashti-border-light)" }}
          />
        </div>
      </div>

      {status === "error" ? (
        <div className="flex items-center gap-2 rounded-lg border border-kashti-coral/40 bg-kashti-coral/10 px-4 py-3 text-sm text-kashti-coral-deep">
          <AlertCircle size={16} strokeWidth={2} />
          {errorMessage}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting" || password.length === 0}
        className="group inline-flex items-center justify-center gap-2 rounded-full bg-kashti-green px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-kashti-green-soft disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Signing in…
          </>
        ) : (
          <>
            Sign In
            <ArrowRight size={16} strokeWidth={2.25} className="transition-transform duration-200 group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}
