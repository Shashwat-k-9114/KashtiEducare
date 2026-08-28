import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";

import { BarList } from "@/components/admin/BarList";
import { DashboardSection } from "@/components/admin/DashboardSection";
import { LinkManager } from "@/components/admin/LinkManager";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { StatCard } from "@/components/admin/StatCard";
import { fetchAdminStats, fetchAllLinksForAdmin } from "@/lib/connectApi";

export const metadata: Metadata = {
  title: "Connect Dashboard",
  description: "Kashti Educare admin.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminConnectDashboard() {
  const [stats, links] = await Promise.all([fetchAdminStats(), fetchAllLinksForAdmin()]);

  return (
    <section className="min-h-screen bg-kashti-bg-tint px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono-label text-xs tracking-widest text-kashti-green-deep uppercase">Kashti Educare</p>
            <h1 className="font-display mt-1 text-2xl font-semibold text-kashti-charcoal">Connect Dashboard</h1>
          </div>
          <LogoutButton />
        </div>

        {!stats ? (
          <div
            className="mt-8 flex items-start gap-3 rounded-xl border border-kashti-gold/50 bg-kashti-gold/10 p-5 text-sm text-kashti-charcoal/75"
          >
            <AlertTriangle size={18} strokeWidth={1.75} className="mt-0.5 shrink-0 text-kashti-gold-deep" />
            <p>
              Analytics backend isn&apos;t reachable right now (or <code>CONNECT_APPS_SCRIPT_URL</code> /{" "}
              <code>CONNECT_STATS_SECRET</code> aren&apos;t configured yet). Link management below still works
              independently.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              <StatCard label="Total Scans" value={stats.overview.totalScans} />
              <StatCard label="Unique Visitors" value={stats.overview.estimatedUniqueVisitors} />
              <StatCard label="Returning" value={stats.overview.returningVisitors} />
              <StatCard label="Today" value={stats.overview.scansToday} />
              <StatCard label="Last 7 Days" value={stats.overview.scansLast7Days} />
              <StatCard label="Last 30 Days" value={stats.overview.scansLast30Days} />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <DashboardSection title="Scans Over Time (30d)">
                <BarList items={stats.scansOverTime.map((d) => ({ key: d.date, count: d.count }))} />
              </DashboardSection>

              <DashboardSection title="Links — Clicks & CTR">
                {stats.links.length === 0 ? (
                  <p className="text-sm text-kashti-charcoal/50">No clicks recorded yet.</p>
                ) : (
                  <ul className="flex flex-col gap-2 text-sm">
                    {stats.links
                      .slice()
                      .sort((a, b) => b.clicks - a.clicks)
                      .map((link) => (
                        <li key={link.id} className="flex items-center justify-between border-b py-1.5 last:border-0" style={{ borderColor: "var(--kashti-border-light)" }}>
                          <span className="truncate text-kashti-charcoal/80">{link.name}</span>
                          <span className="shrink-0 text-kashti-charcoal/50">
                            {link.clicks} clicks · {(link.ctr * 100).toFixed(1)}% CTR
                          </span>
                        </li>
                      ))}
                  </ul>
                )}
              </DashboardSection>

              <DashboardSection title="Location — Country">
                <BarList items={stats.location.countries} />
              </DashboardSection>
              <DashboardSection title="Location — Region / State">
                <BarList items={stats.location.regions} />
              </DashboardSection>
              <DashboardSection title="Location — City">
                <BarList items={stats.location.cities} />
              </DashboardSection>

              <DashboardSection title="Devices">
                <BarList items={stats.devices.deviceTypes} />
              </DashboardSection>
              <DashboardSection title="Browsers">
                <BarList items={stats.devices.browsers} />
              </DashboardSection>
              <DashboardSection title="Operating Systems">
                <BarList items={stats.devices.operatingSystems} />
              </DashboardSection>

              <DashboardSection title="Campaigns">
                {stats.campaigns.length === 0 ? (
                  <p className="text-sm text-kashti-charcoal/50">No campaign-tagged scans yet (use ?src=… on the QR/links).</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="font-mono-label text-[10px] tracking-widest text-kashti-charcoal/45 uppercase">
                          <th className="pb-2 font-medium">Source</th>
                          <th className="pb-2 font-medium">Scans</th>
                          <th className="pb-2 font-medium">Unique</th>
                          <th className="pb-2 font-medium">Clicks</th>
                          <th className="pb-2 font-medium">Conversion</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.campaigns.map((c) => (
                          <tr key={c.src} className="border-t" style={{ borderColor: "var(--kashti-border-light)" }}>
                            <td className="py-1.5 text-kashti-charcoal/80">{c.src || "(none)"}</td>
                            <td className="py-1.5">{c.scans}</td>
                            <td className="py-1.5">{c.uniqueVisitors}</td>
                            <td className="py-1.5">{c.clicks}</td>
                            <td className="py-1.5">{(c.conversionRate * 100).toFixed(1)}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </DashboardSection>
            </div>
          </>
        )}

        <div className="mt-6">
          <DashboardSection title="Manage Links">
            <LinkManager initialLinks={links} />
          </DashboardSection>
        </div>
      </div>
    </section>
  );
}
