"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
        router.push("/admin/login");
        router.refresh();
      }}
      className="inline-flex items-center gap-1.5 rounded-full border border-kashti-border-light px-4 py-2 text-xs font-semibold text-kashti-charcoal/70 transition-colors hover:bg-kashti-charcoal/5"
    >
      <LogOut size={14} strokeWidth={2} />
      Sign Out
    </button>
  );
}
