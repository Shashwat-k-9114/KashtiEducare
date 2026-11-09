"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { GROUPS, SECTIONS } from "@/lib/admin/schema";
import { Icon } from "./Icon";

export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  useEffect(() => setMenu(false), [path]);

  const cur = (href: string, exact = false) => ((exact ? path === href : path === href || path.startsWith(href + "/")) ? ("page" as const) : undefined);

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
    location.href = "/admin/login";
  };

  return (
    <div className={`a-shell ${menu ? "menu" : ""}`}>
      <div className="a-mtop">
        <button type="button" onClick={() => setMenu(true)} aria-label="Open menu"><Icon name="a-menu" /></button>
        <b>Kashti admin</b>
      </div>
      <div className="a-scrim" onClick={() => setMenu(false)} />
      <aside className="a-side" aria-label="Admin navigation">
        <a className="a-brand" href="/admin" aria-label="Kashti Educare admin home">
          <img src="/brand/logo.jpg" alt="Kashti Educare" width={740} height={360} />
        </a>
        <p className="a-brand-tag">Admin portal</p>
        <nav className="a-nav">
          <a href="/admin" aria-current={cur("/admin", true)}><Icon name="a-home" />Dashboard</a>
          <a href="/admin/submissions" aria-current={cur("/admin/submissions")}><Icon name="a-inbox" />Submissions</a>
          {GROUPS.map((g) => (
            <div key={g.id}>
              <div className="a-nav-h">{g.title}</div>
              {SECTIONS.filter((s) => s.group === g.id).map((s) => (
                <a key={s.key} href={`/admin/content/${s.key}`} aria-current={cur(`/admin/content/${s.key}`)}>
                  <Icon name={s.icon} />{s.title}
                </a>
              ))}
            </div>
          ))}
        </nav>
        <div className="a-side-foot">
          <a href="/" target="_blank" rel="noreferrer"><Icon name="a-ext" />View live site</a>
          <button type="button" onClick={logout}><Icon name="a-out" />Sign out</button>
        </div>
      </aside>
      <main className="a-main">
        <div className="a-wrap">{children}</div>
      </main>
    </div>
  );
}
