import type { Metadata } from "next";
import { Suspense } from "react";

import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Sign In",
  description: "Kashti Educare admin.",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-kashti-bg-light px-6">
      <div className="w-full max-w-sm rounded-2xl border bg-kashti-bg-light p-8 shadow-[0_1px_2px_rgba(69,69,69,0.06)]" style={{ borderColor: "var(--kashti-border-light)" }}>
        <p className="font-mono-label text-center text-xs tracking-widest text-kashti-green-deep uppercase">Kashti Educare</p>
        <h1 className="font-display mt-2 text-center text-xl font-semibold text-kashti-charcoal">Admin Sign In</h1>
        <div className="mt-6">
          <Suspense fallback={null}>
            <AdminLoginForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
