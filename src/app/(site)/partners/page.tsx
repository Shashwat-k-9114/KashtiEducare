import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Partners | Kashti Educare" },
  description:
    "Industries, universities, government bodies, communities and startups that make up the Kashti partner network, and why to join it.",
  alternates: { canonical: "/partners" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Kashti Educare",
    title: "Partners | Kashti Educare",
    description:
      "Industries, universities, government bodies, communities and startups that make up the Kashti partner network, and why to join it.",
  },
};

export default function PartnersPage() {
  return (
    <>
      {" "}
      <section className="page-hero">
        {" "}
        <div className="container page-hero-grid">
          {" "}
          <div>
            {" "}
            <nav className="crumbs" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <svg className="icon " aria-hidden="true">
                <use href="#i-chev-r" />
              </svg>
              <span aria-current="page">Partners</span>
            </nav>{" "}
            <p className="eyebrow">{"Our people & partners"}</p>{" "}
            <h1 className="display">
              <span className="t1">Partner</span>
              <span className="t2">with Kashti.</span>
            </h1>{" "}
            <p className="lede">
              Kashti experiences run on a network of institutions, industries
              and organisations that open their doors to learners.
            </p>{" "}
            <div className="btn-row">
              <a
                className="btn btn-primary"
                href="/contact?intent=institutional-partner"
              >
                {"Become a partner "}
                <svg className="icon " aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </a>
              <a className="btn btn-outline" href="#who">
                Who we partner with
              </a>
            </div>{" "}
          </div>{" "}
          <div className="hero-mosaic">
            {" "}
            <div
              className="ph ph-fit "
              data-label="A visit to O.P. Jindal Global University"
              style={{ "--c": "#C2560C" } as React.CSSProperties}
            >
              <img
                className="ph-fill"
                src="https://kashtieducare.com/images/gallery/opj-visit-2.jpeg"
                alt=""
                aria-hidden="true"
                fetchPriority="high"
                decoding="async"
              />
              <img
                className="ph-img"
                src="https://kashtieducare.com/images/gallery/opj-visit-2.jpeg"
                alt="A visit to O.P. Jindal Global University"
                fetchPriority="high"
                decoding="async"
              />
            </div>{" "}
            <div
              className="ph ph-fit "
              data-label="Receiving recognition from a government ministry"
              style={{ "--c": "#C98A00" } as React.CSSProperties}
            >
              <img
                className="ph-fill"
                src="https://kashtieducare.com/images/gallery/ministry-award.jpeg"
                alt=""
                aria-hidden="true"
                fetchPriority="high"
                decoding="async"
              />
              <img
                className="ph-img"
                src="https://kashtieducare.com/images/gallery/ministry-award.jpeg"
                alt="Receiving recognition from a government ministry"
                fetchPriority="high"
                decoding="async"
              />
            </div>{" "}
            <div
              className="ph ph-fit "
              data-label="A visit with a Nepal Member of Parliament"
              style={{ "--c": "#1584C7" } as React.CSSProperties}
            >
              <img
                className="ph-fill"
                src="https://kashtieducare.com/images/gallery/nepal-mp-visit.jpeg"
                alt=""
                aria-hidden="true"
                fetchPriority="high"
                decoding="async"
              />
              <img
                className="ph-img"
                src="https://kashtieducare.com/images/gallery/nepal-mp-visit.jpeg"
                alt="A visit with a Nepal Member of Parliament"
                fetchPriority="high"
                decoding="async"
              />
            </div>{" "}
            <p className="script hm-note">Real people. Real learning.</p>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="section bg-white" id="who">
        {" "}
        <div className="container">
          {" "}
          <div className="section-head">
            {" "}
            <p className="eyebrow">Who we partner with</p>{" "}
            <h2 className="h2">
              <span className="t1">A strong network</span>
              <span className="t2">for a richer tomorrow.</span>
            </h2>{" "}
          </div>{" "}
          <div className="eco">
            {" "}
            <article className="eco-card">
              <span
                className="ic ic-sm"
                style={{ "--c": "#0F3E9E" } as React.CSSProperties}
              >
                <svg className="icon " aria-hidden="true">
                  <use href="#i-factory" />
                </svg>
              </span>
              <div>
                <h3>Industry</h3>
                <p>
                  Manufacturers, corporates and businesses offering visits, job
                  shadowing and expert interactions.
                </p>
              </div>
            </article>{" "}
            <article className="eco-card">
              <span
                className="ic ic-sm"
                style={{ "--c": "#0E8F86" } as React.CSSProperties}
              >
                <svg className="icon " aria-hidden="true">
                  <use href="#i-cap" />
                </svg>
              </span>
              <div>
                <h3>Academia</h3>
                <p>
                  Universities, research centres and innovation hubs hosting
                  exposure visits and exchange placements.
                </p>
              </div>
            </article>{" "}
            <article className="eco-card">
              <span
                className="ic ic-sm"
                style={{ "--c": "#C98A00" } as React.CSSProperties}
              >
                <svg className="icon " aria-hidden="true">
                  <use href="#i-landmark" />
                </svg>
              </span>
              <div>
                <h3>{"Government & Public"}</h3>
                <p>
                  Public institutions and missions supporting border tourism,
                  civic exposure and social-impact programmes.
                </p>
              </div>
            </article>{" "}
            <article className="eco-card">
              <span
                className="ic ic-sm"
                style={{ "--c": "#6544CC" } as React.CSSProperties}
              >
                <svg className="icon " aria-hidden="true">
                  <use href="#i-rocket" />
                </svg>
              </span>
              <div>
                <h3>{"Startups & Tech"}</h3>
                <p>
                  Founders, incubators and accelerators giving students
                  first-hand exposure to building new things.
                </p>
              </div>
            </article>{" "}
            <article className="eco-card">
              <span
                className="ic ic-sm"
                style={{ "--c": "#CF4A6E" } as React.CSSProperties}
              >
                <svg className="icon " aria-hidden="true">
                  <use href="#i-heart" />
                </svg>
              </span>
              <div>
                <h3>Communities</h3>
                <p>
                  Cultural, heritage and social-impact organisations anchoring
                  community-service and heritage programmes.
                </p>
              </div>
            </article>{" "}
            <article className="eco-card">
              <span
                className="ic ic-sm"
                style={{ "--c": "#1584C7" } as React.CSSProperties}
              >
                <svg className="icon " aria-hidden="true">
                  <use href="#i-globe" />
                </svg>
              </span>
              <div>
                <h3>Global Institutions</h3>
                <p>
                  International universities and organisations hosting exchange
                  programmes and global immersion trips.
                </p>
              </div>
            </article>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="section bg-wash">
        {" "}
        <div className="container">
          {" "}
          <div className="section-head">
            {" "}
            <p className="eyebrow">Why partner with us</p>{" "}
            <h2 className="h2">
              <span className="t1">More than</span>
              <span className="t2">a one-off CSR activity.</span>
            </h2>{" "}
          </div>{" "}
          <div className="icon-cards">
            {" "}
            <article className="icon-card">
              <span
                className="ic"
                style={{ "--c": "#0F3E9E" } as React.CSSProperties}
              >
                <svg className="icon " aria-hidden="true">
                  <use href="#i-users" />
                </svg>
              </span>
              <h3>Reach learners at decision time</h3>
              <p>
                Meet students and faculty across schools and higher education at
                a key point in their academic and career decisions.
              </p>
            </article>{" "}
            <article className="icon-card">
              <span
                className="ic"
                style={{ "--c": "#0E8F86" } as React.CSSProperties}
              >
                <svg className="icon " aria-hidden="true">
                  <use href="#i-check" />
                </svg>
              </span>
              <h3>Contribute to NEP 2020 learning</h3>
              <p>
                Be part of NEP 2020-aligned experiential learning that lasts
                beyond a single visit.
              </p>
            </article>{" "}
            <article className="icon-card">
              <span
                className="ic"
                style={{ "--c": "#C98A00" } as React.CSSProperties}
              >
                <svg className="icon " aria-hidden="true">
                  <use href="#i-sprout" />
                </svg>
              </span>
              <h3>Build a talent pipeline</h3>
              <p>
                Repeated exposure builds a long-term pipeline of learners who
                already know your world.
              </p>
            </article>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="section bg-sky-glow">
        {" "}
        <div className="container">
          {" "}
          <div
            className="panel partners-panel"
            style={{ marginTop: "0" } as React.CSSProperties}
            data-partners=""
          >
            {" "}
            <div className="pp-intro">
              {" "}
              <h3 className="h3">Our engagements</h3>{" "}
              <span className="bar" aria-hidden="true" />{" "}
              <p>
                Government bodies, universities and ecosystem partners who have
                hosted, co-designed or supported Kashti experiences.
              </p>{" "}
            </div>{" "}
            <div>
              {" "}
              <div
                className="ptabs"
                role="tablist"
                aria-label="Partner type"
              />{" "}
              <div className="logo-grid" role="tabpanel" />{" "}
            </div>{" "}
          </div>{" "}
          <div className="join-band">
            {" "}
            <span className="ic" aria-hidden="true">
              <svg className="icon " aria-hidden="true">
                <use href="#i-users" />
              </svg>
            </span>{" "}
            <h3>
              {"Join the network "}
              <span>
                {"of those who "}
                <em>make learning great.</em>
              </span>
            </h3>{" "}
            <p>
              We invite industry experts, educators, researchers and
              institutions to work with Kashti Educare as mentors, guest
              faculty, hosts and knowledge partners, and build transformative
              experiences for students together.
            </p>{" "}
            <a
              className="btn btn-saffron"
              href="/contact?intent=institutional-partner"
            >
              {"Become a partner "}
              <svg className="icon " aria-hidden="true">
                <use href="#i-arrow" />
              </svg>
            </a>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
    </>
  );
}
