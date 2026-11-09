import { Icon } from "@/components/admin/Icon";
import { GROUPS, SECTIONS } from "@/lib/admin/schema";
import { scriptCall } from "@/lib/sheet";

export const metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

type Row = { row: number; received: string; role: string; name: string; org: string; email: string; programme: string; status: string };
type Dash = {
  counts: { enquiries: number; newEnquiries: number; newsletter: number; enquiries7: number; newsletter7: number };
  recent: Row[];
  log: { time: string; action: string; section: string; by: string; summary: string }[];
  edited: Record<string, string>;
};

const ago = (iso: string) => {
  const s = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  if (s < 3600) return `${Math.max(1, Math.round(s / 60))} min ago`;
  if (s < 86400) return `${Math.round(s / 3600)} h ago`;
  return `${Math.round(s / 86400)} d ago`;
};

export default async function Dashboard() {
  let d: Dash | null = null;
  let error = "";
  try {
    d = (await scriptCall<Dash>({ action: "admin.dash" }, { fresh: true })) as unknown as Dash;
  } catch (e) {
    error = (e as Error).message;
  }
  const edited = d?.edited || {};

  return (
    <>
      <header className="a-head">
        <span className="a-script">Namaste!</span>
        <span className="a-eyebrow">Dashboard</span>
        <h1>Everything about the site, in one place</h1>
        <p>Follow new enquiries, then edit any part of the website. Changes go live within seconds.</p>
      </header>

      {error ? (
        <div className="a-alert warn" role="alert" style={{ marginBottom: 18 }}>
          <Icon name="info" />
          <div>
            <b>The Google Sheet isn&apos;t answering yet.</b> {error}
            <ul>
              <li>Paste the latest <code>google-apps-script/Code.gs</code> into Apps Script.</li>
              <li>Deploy → Manage deployments → pencil → Version: <b>New version</b> → Deploy.</li>
            </ul>
          </div>
        </div>
      ) : null}

      <div className="a-stats">
        <a className="a-stat" href="/admin/submissions" style={{ ["--c" as string]: "#C98A00" }}>
          <span className="ic"><Icon name="a-inbox" /></span>
          <div><b>{d?.counts.newEnquiries ?? "–"}</b><span>New enquiries to follow up</span></div>
        </a>
        <a className="a-stat" href="/admin/submissions" style={{ ["--c" as string]: "#0F3E9E" }}>
          <span className="ic"><Icon name="mail" /></span>
          <div><b>{d?.counts.enquiries ?? "–"}</b><span>Enquiries in total ({d?.counts.enquiries7 ?? 0} this week)</span></div>
        </a>
        <a className="a-stat" href="/admin/submissions?tab=newsletter" style={{ ["--c" as string]: "#0E8F86" }}>
          <span className="ic"><Icon name="users" /></span>
          <div><b>{d?.counts.newsletter ?? "–"}</b><span>Newsletter subscribers ({d?.counts.newsletter7 ?? 0} this week)</span></div>
        </a>
        <div className="a-stat" style={{ ["--c" as string]: "#1B3B7E" }}>
          <span className="ic"><Icon name="layers" /></span>
          <div><b>{Object.keys(edited).length}</b><span>of {SECTIONS.length} content sections edited</span></div>
        </div>
      </div>

      <div className="a-cols">
        <section className="a-card" aria-labelledby="recent">
          <div className="a-card-h">
            <h2 id="recent">Latest enquiries</h2>
            <a className="a-btn o sm" href="/admin/submissions">See all</a>
          </div>
          {d?.recent.length ? (
            <ul className="a-feed">
              {d.recent.map((r) => (
                <li key={r.row}>
                  <span className={`a-st ${r.status}`}>{r.status}</span>
                  <div>
                    <b>{r.name}</b> · {r.org}
                    <div style={{ color: "var(--muted)", fontSize: ".85rem" }}>{r.role}{r.programme ? ` · ${r.programme}` : ""}</div>
                  </div>
                  <span className="when">{ago(r.received)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="a-empty">No enquiries yet. They will appear here the moment someone submits the contact form.</div>
          )}
        </section>
        <section className="a-card" aria-labelledby="act">
          <div className="a-card-h"><h2 id="act">Recent activity</h2></div>
          {d?.log.length ? (
            <ul className="a-feed">
              {d.log.map((l, i) => (
                <li key={i}>
                  <div><b>{l.action}</b> {l.section}<div style={{ color: "var(--muted)", fontSize: ".82rem" }}>{l.summary}</div></div>
                  <span className="when">{ago(l.time)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="a-empty">Edits made in the portal are logged here (and in the Changelog tab of the sheet).</div>
          )}
        </section>
      </div>

      {GROUPS.map((g) => (
        <section className="a-group" key={g.id}>
          <h2>{g.title}</h2>
          <p>{g.blurb}</p>
          <div className="a-tiles">
            {SECTIONS.filter((s) => s.group === g.id).map((s) => (
              <a className="a-tile" key={s.key} href={`/admin/content/${s.key}`}>
                <span className="ic"><Icon name={s.icon} /></span>
                <div><b>{s.title}</b><span>{s.desc}</span></div>
                {edited[s.key] ? <span className="ed">EDITED</span> : null}
              </a>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
