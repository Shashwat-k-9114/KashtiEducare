"use client";

import { useEffect, useRef, useState } from "react";

export type ConnectData = {
  eyebrow: string;
  headline: string;
  intro: string;
  socials: { label: string; handle?: string; url: string; icon: string }[];
  paths: { label: string; teaser: string; cta: string; href: string }[];
  explore: { label: string; note?: string; href: string }[];
  contact: { email: string; phone: string; phoneHref: string };
  themes: { id: string; name: string; tagline: string; color: string; audience: string }[];
  counts: { programmes: number; school: number; he: number; themes: number };
  spotlights: { id: string; name: string; aud: string; text: string }[];
  photos: { src: string; alt: string }[];
  site: string;
};

const ICONS: Record<string, React.ReactNode> = {
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />,
  mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></>,
  whatsapp: <><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.6-5.4A8.4 8.4 0 1 1 21 11.5z" /><path d="M9 9c0 3.5 3 6.5 6.5 6.5l1.2-1.4-2-1-.9.9a4 4 0 0 1-2.2-2.2l.9-.9-1-2z" /></>,
  instagram: <><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.5" cy="6.5" r="1" /></>,
  linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>,
  youtube: <><rect x="2" y="5" width="20" height="14" rx="4" /><path d="m10 9 6 3-6 3z" /></>,
  facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  x: <path d="M4 4l16 16M20 4 4 20" />,
  globe: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  download: <path d="M12 3v12m0 0-4-4m4 4 4-4M4 21h16" />,
  share: <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v14" />,
  shuffle: <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />,
  spark: <path d="m12 2 2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z" />,
  chat: <path d="M21 12a8 8 0 0 1-11.6 7.1L3 20.5l1.4-5A8 8 0 1 1 21 12z" />,
};

function Ic({ n, className = "" }: { n: string; className?: string }) {
  return (
    <svg className={`cx-ic ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      {ICONS[n] || ICONS.globe}
    </svg>
  );
}

const STAGES = [
  { n: "Orient", m: "Apr – Jun", d: "Spark the question." },
  { n: "Immerse", m: "Jul – Sep", d: "Step into the real thing." },
  { n: "Build", m: "Oct – Dec", d: "Make something of it." },
  { n: "Transform", m: "Jan – Mar", d: "Carry it forward." },
];

export function ConnectExperience({ data }: { data: ConnectData }) {
  const { contact, counts } = data;
  const tel = `tel:${contact.phoneHref || contact.phone.replace(/\s/g, "")}`;
  const wa = `https://wa.me/${(contact.phoneHref || contact.phone).replace(/\D/g, "")}?text=${encodeURIComponent("Hello Kashti Educare, I scanned your QR code and would like to know more.")}`;
  const mail = `mailto:${contact.email}`;

  const [door, setDoor] = useState<string | null>(null);
  const [path, setPath] = useState(0);
  const [spot, setSpot] = useState(0);
  const [flip, setFlip] = useState(0);
  const [toast, setToast] = useState("");
  const toastT = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Pick a different surprise on each visit (client only, so the server HTML stays stable).
  useEffect(() => {
    if (data.spotlights.length) setSpot(Math.floor(Math.random() * data.spotlights.length));
  }, [data.spotlights.length]);

  // Fade sections in as they arrive.
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  const say = (t: string) => {
    setToast(t);
    if (toastT.current) clearTimeout(toastT.current);
    toastT.current = setTimeout(() => setToast(""), 2600);
  };

  const share = async () => {
    const url = "https://kashtieducare.com/connect";
    try {
      if (navigator.share) { await navigator.share({ title: "Kashti Educare", text: "What if the classroom had no walls?", url }); return; }
      await navigator.clipboard.writeText(url);
      say("Link copied. Pass it on!");
    } catch { /* cancelled */ }
  };

  const another = () => {
    if (data.spotlights.length < 2) return;
    setFlip((f) => f + 1);
    setSpot((s) => {
      let n = s;
      while (n === s) n = Math.floor(Math.random() * data.spotlights.length);
      return n;
    });
  };

  const sp = data.spotlights[spot];
  const p = data.paths[path];

  return (
    <>
      <div className="cx-page">
        {/* ------------------------------------------------ HERO */}
        <header className="cx-hero">
          <div className="cx-stars" aria-hidden="true" />
          <div className="cx-hero-in">
            <a className="cx-logo" href="/" aria-label="Kashti Educare home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Kashti Educare" width={150} height={72} />
            </a>
            {data.eyebrow ? <p className="cx-eyebrow">{data.eyebrow}</p> : null}
            <h1 className="cx-h1">{data.headline}</h1>
            {data.intro ? <p className="cx-lede">{data.intro}</p> : null}

            <div className="cx-quick">
              <a className="cx-q call" href={tel}><Ic n="phone" /><span>Call</span></a>
              <a className="cx-q wa" href={wa} target="_blank" rel="noopener noreferrer"><Ic n="whatsapp" /><span>WhatsApp</span></a>
              <a className="cx-q mail" href={mail}><Ic n="mail" /><span>Email</span></a>
              <a className="cx-q vcf" href="/connect/kashti-educare.vcf" download><Ic n="download" /><span>Save contact</span></a>
            </div>
            <a className="cx-scrollhint" href="#doors">Go on, look around <Ic n="arrow" className="down" /></a>
          </div>
        </header>

        {/* ------------------------------------------------ DOORS */}
        <section className="cx-sec" id="doors" data-reveal>
          <p className="cx-kick">{counts.themes} doors</p>
          <h2 className="cx-h2">Pick a door. See what is behind it.</h2>
          <p className="cx-sub">Every Kashti experience belongs to one of these pathways. Tap one to peek inside.</p>
          <div className="cx-doors">
            {data.themes.map((t) => {
              const open = door === t.id;
              return (
                <div key={t.id} className={`cx-door${open ? " open" : ""}`} style={{ "--c": t.color } as React.CSSProperties}>
                  <button type="button" className="cx-door-b" aria-expanded={open} onClick={() => setDoor(open ? null : t.id)}>
                    <span className="cx-door-n">{String(data.themes.indexOf(t) + 1).padStart(2, "0")}</span>
                    <span className="cx-door-t">{t.name}</span>
                    <span className="cx-door-x" aria-hidden="true">{open ? "−" : "+"}</span>
                  </button>
                  <div className="cx-door-p" hidden={!open}>
                    <p>{t.tagline}</p>
                    <a href={`/programs?theme=${encodeURIComponent(t.id)}#catalogue`}>Step through <Ic n="arrow" /></a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ------------------------------------------------ SURPRISE */}
        {sp ? (
          <section className="cx-sec cx-surprise" data-reveal>
            <p className="cx-kick">{counts.programmes} programmes and counting</p>
            <h2 className="cx-h2">Not sure where to start? Let us surprise you.</h2>
            <div key={flip} className="cx-spot">
              <span className="cx-badge">{sp.aud}</span>
              <h3>{sp.name}</h3>
              <p>{sp.text}</p>
              <div className="cx-spot-a">
                <a className="cx-btn primary" href={`/programs?p=${encodeURIComponent(sp.id)}`}>See this programme <Ic n="arrow" /></a>
                <button type="button" className="cx-btn ghost" onClick={another}><Ic n="shuffle" /> Show me another</button>
              </div>
            </div>
          </section>
        ) : null}

        {/* ------------------------------------------------ WHICH SOUNDS LIKE YOU */}
        {data.paths.length ? (
          <section className="cx-sec" data-reveal>
            <p className="cx-kick">Made for you</p>
            <h2 className="cx-h2">Which one sounds like you?</h2>
            <div className="cx-chips" role="tablist" aria-label="Who are you?">
              {data.paths.map((x, i) => (
                <button key={x.label} type="button" role="tab" aria-selected={i === path} className={i === path ? "on" : ""} onClick={() => setPath(i)}>{x.label}</button>
              ))}
            </div>
            {p ? (
              <div key={path} className="cx-path" role="tabpanel">
                <p>{p.teaser}</p>
                <a className="cx-btn primary" href={p.href}>{p.cta} <Ic n="arrow" /></a>
              </div>
            ) : null}
          </section>
        ) : null}

        {/* ------------------------------------------------ JOURNEY */}
        <section className="cx-sec cx-journey" data-reveal>
          <p className="cx-kick">How it unfolds</p>
          <h2 className="cx-h2">One year. Four moves.</h2>
          <ol className="cx-stages">
            {STAGES.map((s, i) => (
              <li key={s.n} style={{ "--i": i } as React.CSSProperties}>
                <span className="cx-stage-m">{s.m}</span>
                <b>{s.n}</b>
                <span>{s.d}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------ PHOTOS */}
        {data.photos.length ? (
          <section className="cx-sec cx-wide" data-reveal>
            <div className="cx-pad">
              <p className="cx-kick">From the field</p>
              <h2 className="cx-h2">This is what it looks like.</h2>
            </div>
            <div className="cx-strip" tabIndex={0} aria-label="Photos from Kashti programmes, scroll sideways">
              {data.photos.map((ph) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={ph.src} src={ph.src} alt={ph.alt} loading="lazy" decoding="async" />
              ))}
              <a className="cx-strip-more" href="/gallery">All photos <Ic n="arrow" /></a>
            </div>
          </section>
        ) : null}

        {/* ------------------------------------------------ SOCIALS */}
        {data.socials.length ? (
          <section className="cx-sec" data-reveal>
            <p className="cx-kick">Follow along</p>
            <h2 className="cx-h2">Where the stories happen.</h2>
            <div className="cx-socials">
              {data.socials.map((s) => (
                <a key={s.url} className={`cx-social ${s.icon}`} href={s.url} target="_blank" rel="noopener noreferrer">
                  <span className="cx-social-i"><Ic n={s.icon} /></span>
                  <span className="cx-social-t"><b>{s.label}</b>{s.handle ? <small>{s.handle}</small> : null}</span>
                  <Ic n="arrow" className="go" />
                </a>
              ))}
            </div>
          </section>
        ) : null}

        {/* ------------------------------------------------ EXPLORE */}
        {data.explore.length ? (
          <section className="cx-sec" data-reveal>
            <p className="cx-kick">Keep exploring</p>
            <h2 className="cx-h2">The rest of kashtieducare.com</h2>
            <ul className="cx-explore">
              {data.explore.map((e) => (
                <li key={e.href}>
                  <a href={e.href}><span><b>{e.label}</b>{e.note ? <small>{e.note}</small> : null}</span><Ic n="arrow" /></a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* ------------------------------------------------ FINAL CTA */}
        <section className="cx-final" data-reveal>
          <p className="cx-script">Ready when you are</p>
          <h2>Let us design something your students will remember.</h2>
          <div className="cx-final-a">
            <a className="cx-btn gold" href="/contact">Design an experience <Ic n="arrow" /></a>
            <a className="cx-btn line" href={wa} target="_blank" rel="noopener noreferrer"><Ic n="whatsapp" /> Chat on WhatsApp</a>
          </div>
          <p className="cx-final-c">
            <a href={tel}>{contact.phone}</a> · <a href={mail}>{contact.email}</a>
          </p>
          <button type="button" className="cx-share" onClick={share}><Ic n="share" /> Share this page</button>
        </section>

        <footer className="cx-foot">
          <p>Kashti Educare · Real world · Real learning · Real impact</p>
          <p><a href="/">kashtieducare.com</a></p>
        </footer>
      </div>

      {/* Sticky thumb-reach bar on phones */}
      <nav className="cx-bar" aria-label="Quick contact">
        <a href={tel}><Ic n="phone" /><span>Call</span></a>
        <a href={wa} target="_blank" rel="noopener noreferrer"><Ic n="whatsapp" /><span>WhatsApp</span></a>
        <a className="main" href="/contact"><Ic n="chat" /><span>Enquire</span></a>
      </nav>

      {toast ? <div className="cx-toast" role="status">{toast}</div> : null}
    </>
  );
}
