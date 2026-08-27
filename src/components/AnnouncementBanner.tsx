"use client";

import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";

import { getActiveAnnouncements } from "@/data/announcements";

const DISMISSED_KEY = "kashti-dismissed-announcements";
const ROTATE_MS = 6000;

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

// localStorage isn't available during SSR, so the server snapshot is a
// fixed empty list — nothing is treated as dismissed until the client
// hydrates and reads the real value via useSyncExternalStore.
function getSnapshot() {
  return window.localStorage.getItem(DISMISSED_KEY) ?? "[]";
}

function getServerSnapshot() {
  return "[]";
}

function parseIds(raw: string): string[] {
  try {
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

export function AnnouncementBanner() {
  const dismissedRaw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  // Dismissals made in this render (before localStorage's "storage" event,
  // which only fires in *other* tabs, would reflect them) are tracked here
  // so the banner updates immediately in the same tab.
  const [sessionDismissed, setSessionDismissed] = useState<string[]>([]);

  const dismissedIds = new Set([...parseIds(dismissedRaw), ...sessionDismissed]);
  const visible = getActiveAnnouncements().filter((a) => !dismissedIds.has(a.id));

  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (visible.length < 2) return;
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % visible.length);
        setFading(false);
      }, 200);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [visible.length]);

  if (visible.length === 0) return null;

  const current = visible[Math.min(index, visible.length - 1)];

  const dismiss = () => {
    try {
      window.localStorage.setItem(DISMISSED_KEY, JSON.stringify([...parseIds(dismissedRaw), current.id]));
    } catch {
      // localStorage unavailable (private mode, etc.) — dismiss for this session only.
    }
    setSessionDismissed((prev) => [...prev, current.id]);
    setIndex(0);
  };

  return (
    <div
      className="relative overflow-hidden px-6 py-2.5 text-center lg:px-10"
      style={{ background: "linear-gradient(90deg, var(--kashti-green), var(--kashti-green-soft))" }}
    >
      <div
        className="mx-auto flex max-w-6xl items-center justify-center gap-3 transition-opacity duration-200"
        style={{ opacity: fading ? 0 : 1 }}
      >
        <p className="font-mono-label text-[11px] leading-snug tracking-wide text-white sm:text-xs">
          {current.message}
          {current.link ? (
            <Link
              href={current.link.href}
              className="ml-2 inline-flex items-center gap-1 underline decoration-white/40 underline-offset-2 hover:decoration-white"
            >
              {current.link.label}
              <ArrowRight size={11} strokeWidth={2.25} />
            </Link>
          ) : null}
        </p>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute top-1/2 right-3 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/15 hover:text-white lg:right-6"
      >
        <X size={13} strokeWidth={2.25} />
      </button>
    </div>
  );
}
