"use client";

import { usePathname } from "next/navigation";

const NAV: [string, string][] = [
  ["/why-kashti", "Why Kashti"],
  ["/people", "People"],
  ["/programs", "Programs"],
  ["/experiences", "Experiences"],
  ["/formats", "Formats"],
  ["/gallery", "Gallery"],
  ["/read", "Read"],
];

const Icon = ({ id }: { id: string }) => (
  <svg className="icon " aria-hidden="true">
    <use href={`#${id}`} />
  </svg>
);

function Brand() {
  return (
    <a className="brand" href="/" aria-label="Kashti Educare home">
      <img className="brand-img" src="https://kashtieducare.com/logo.jpeg" alt="Kashti Educare" width={150} height={56} decoding="async" />
      <span className="brand-word" aria-hidden="true">
        <span className="b-k">
          KASHTI
          <svg className="pin" viewBox="0 0 24 30" aria-hidden="true">
            <path d="M12 0C5.4 0 0 5.2 0 11.7 0 20.5 12 30 12 30s12-9.5 12-18.3C24 5.2 18.6 0 12 0z" fill="currentColor" />
            <circle cx="12" cy="11.5" r="4.4" fill="#fff" />
          </svg>
        </span>{" "}
        <span className="b-e">educare</span>
      </span>
    </a>
  );
}

export function Header() {
  const path = usePathname();
  const cur = (href: string) => (path === href ? ("page" as const) : undefined);

  return (
    <>
      <header className="site-header" id="top">
        <div className="container">
          <Brand />
          <nav className="nav" aria-label="Main">
            <ul>
              {NAV.map(([href, label]) => (
                <li key={href}>
                  <a href={href} aria-current={cur(href)}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a className="btn btn-primary btn-sm header-cta" href="/contact?intent=design-experience">
            Design an Experience <Icon id="i-arrow" />
          </a>
          <button className="burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">
            <Icon id="i-menu" />
          </button>
        </div>
      </header>
      <nav className="mobile-nav" id="mobile-nav" aria-label="Mobile">
        <ul>
          {([["/", "Home"], ...NAV, ["/contact", "Contact"]] as [string, string][]).map(([href, label]) => (
            <li key={href}>
              <a href={href} aria-current={cur(href)}>
                {label} <Icon id="i-chev-r" />
              </a>
            </li>
          ))}
        </ul>
        <a className="btn btn-primary" href="/contact?intent=design-experience">
          Design an Experience <Icon id="i-arrow" />
        </a>
      </nav>
    </>
  );
}
