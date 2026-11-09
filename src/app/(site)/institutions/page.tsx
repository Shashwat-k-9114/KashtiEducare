import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Institutions | Kashti Educare" },
  description:
    "Our learning ecosystem (industry, academia, government, experts, communities and startups) and the Education & Experience Council behind every Kashti programme.",
  alternates: { canonical: "/institutions" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Kashti Educare",
    title: "Institutions | Kashti Educare",
    description:
      "Our learning ecosystem (industry, academia, government, experts, communities and startups) and the Education & Experience Council behind every Kashti programme.",
  },
};

export default function InstitutionsPage() {
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
              <span aria-current="page">Institutions</span>
            </nav>{" "}
            <p className="eyebrow">Institutions</p>{" "}
            <h1 className="display">
              <span className="t1">Our learning</span>
              <span className="t2">ecosystem.</span>
            </h1>{" "}
            <p className="lede">
              Learning takes place across industries, academia and communities.
              Here is the collective expertise behind every Kashti experience.
            </p>{" "}
            <div className="btn-row">
              <a
                className="btn btn-primary"
                href="/contact?intent=design-experience"
              >
                {"Design an experience "}
                <svg className="icon " aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </a>
              <a className="btn btn-outline" href="#council">
                Meet the council
              </a>
            </div>{" "}
          </div>{" "}
          <div className="hero-mosaic">
            {" "}
            <div
              className="ph ph-fit "
              data-label="Kashti in collaboration discussions at IILM"
              style={{ "--c": "#6544CC" } as React.CSSProperties}
            >
              <img
                className="ph-fill"
                src="https://kashtieducare.com/images/gallery/iilm-collab.jpeg"
                alt=""
                aria-hidden="true"
                fetchPriority="high"
                decoding="async"
              />
              <img
                className="ph-img"
                src="https://kashtieducare.com/images/gallery/iilm-collab.jpeg"
                alt="Kashti in collaboration discussions at IILM"
                fetchPriority="high"
                decoding="async"
              />
            </div>{" "}
            <div
              className="ph ph-fit "
              data-label="A visit to Maharaja Surajmal Institute of Technology"
              style={{ "--c": "#0F3E9E" } as React.CSSProperties}
            >
              <img
                className="ph-fill"
                src="https://kashtieducare.com/images/gallery/msit-visit.jpeg"
                alt=""
                aria-hidden="true"
                fetchPriority="high"
                decoding="async"
              />
              <img
                className="ph-img"
                src="https://kashtieducare.com/images/gallery/msit-visit.jpeg"
                alt="A visit to Maharaja Surajmal Institute of Technology"
                fetchPriority="high"
                decoding="async"
              />
            </div>{" "}
            <div
              className="ph ph-fit "
              data-label="A session with Muni International"
              style={{ "--c": "#1584C7" } as React.CSSProperties}
            >
              <img
                className="ph-fill"
                src="https://kashtieducare.com/images/gallery/muni-international-1.jpeg"
                alt=""
                aria-hidden="true"
                fetchPriority="high"
                decoding="async"
              />
              <img
                className="ph-img"
                src="https://kashtieducare.com/images/gallery/muni-international-1.jpeg"
                alt="A session with Muni International"
                fetchPriority="high"
                decoding="async"
              />
            </div>{" "}
            <p className="script hm-note">Real people. Real industries.</p>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="section bg-white">
        {" "}
        <div className="container">
          {" "}
          <div className="section-head">
            {" "}
            <p className="eyebrow">Our learning ecosystem</p>{" "}
            <h2 className="h2">
              <span className="t1">Six worlds</span>
              <span className="t2">learners step into.</span>
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
                <p>Real-world industries, startups and tech ecosystems.</p>
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
                <p>Universities, research centres and innovation hubs.</p>
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
                <p>Public institutions, missions and social impact.</p>
              </div>
            </article>{" "}
            <article className="eco-card">
              <span
                className="ic ic-sm"
                style={{ "--c": "#6544CC" } as React.CSSProperties}
              >
                <svg className="icon " aria-hidden="true">
                  <use href="#i-bulb" />
                </svg>
              </span>
              <div>
                <h3>{"Experts & Innovation"}</h3>
                <p>Advisors, researchers and thought leaders.</p>
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
                <p>Culture, heritage and social-impact ecosystems.</p>
              </div>
            </article>{" "}
            <article className="eco-card">
              <span
                className="ic ic-sm"
                style={{ "--c": "#1584C7" } as React.CSSProperties}
              >
                <svg className="icon " aria-hidden="true">
                  <use href="#i-rocket" />
                </svg>
              </span>
              <div>
                <h3>{"Startups & Tech"}</h3>
                <p>Emerging ventures, innovation and future skills.</p>
              </div>
            </article>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="section bg-sky-glow" id="council">
        {" "}
        <div className="container">
          {" "}
          <div className="section-head">
            {" "}
            <p className="eyebrow">Our people</p>{" "}
            <h2 className="h2">
              <span className="t1">{"The Education &"}</span>
              <span className="t2">Experience Council.</span>
            </h2>{" "}
            <p className="lede">
              The collective structure behind how Kashti programmes are designed
              and delivered.
            </p>{" "}
            <a className="link-arrow" href="/people">
              {"Meet the founder and advisors "}
              <svg className="icon " aria-hidden="true">
                <use href="#i-arrow" />
              </svg>
            </a>{" "}
          </div>{" "}
          <div className="council-row" data-render="council" />{" "}
          <div className="panel partners-panel" data-partners="">
            {" "}
            <div className="pp-intro">
              {" "}
              <h3 className="h3">Institutions we've worked with</h3>{" "}
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
        </div>{" "}
      </section>{" "}
      <section className="section bg-white">
        {" "}
        <div className="container">
          {" "}
          <div className="cta-panel">
            {" "}
            <div>
              {" "}
              <p className="eyebrow on-dark">Let's build together</p>{" "}
              <h2 className="h2">
                <span className="t1">Ready to bring this</span>
                <span className="t2">to your institution?</span>
              </h2>{" "}
              <p>
                Tell us about your institution, your learners and your goals.
                We'll reply with a customised proposal.
              </p>{" "}
              <div className="btn-row">
                {" "}
                <a
                  className="btn btn-saffron"
                  href="/contact?intent=design-experience"
                >
                  {"Design an experience "}
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-arrow" />
                  </svg>
                </a>{" "}
                <a className="btn btn-ghost-light" href="/programs">
                  Explore programs
                </a>{" "}
              </div>{" "}
            </div>{" "}
            <div className="desk">
              {" "}
              <h3>Direct institutional desk</h3>{" "}
              <p>For schools, colleges, universities and partners.</p>{" "}
              <ul>
                {" "}
                <li>
                  <a href="mailto:engage@kashtieducare.com">
                    <span className="d-i">
                      <svg className="icon " aria-hidden="true">
                        <use href="#i-mail" />
                      </svg>
                    </span>
                    <span>
                      <small>Email</small>
                      <b>engage@kashtieducare.com</b>
                    </span>
                  </a>
                </li>{" "}
                <li>
                  <a href="tel:+918307039685">
                    <span className="d-i">
                      <svg className="icon " aria-hidden="true">
                        <use href="#i-phone" />
                      </svg>
                    </span>
                    <span>
                      <small>Phone</small>
                      <b>+91 8307039685</b>
                    </span>
                  </a>
                </li>{" "}
                <li>
                  <div>
                    <span className="d-i">
                      <svg className="icon " aria-hidden="true">
                        <use href="#i-pin" />
                      </svg>
                    </span>
                    <span>
                      <small>Location</small>
                      <b>India</b>
                    </span>
                  </div>
                </li>{" "}
              </ul>{" "}
            </div>{" "}
            <svg className="cta-mtn" viewBox="0 0 600 200" aria-hidden="true">
              <path
                d="M0 200 120 80l70 60 110-120 120 110 60-40 120 110z"
                fill="#fff"
              />
            </svg>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
    </>
  );
}
