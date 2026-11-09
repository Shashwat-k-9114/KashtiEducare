import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Programs | Kashti Educare" },
  description:
    "53 experiential programmes across eight themes (STEM, leadership, adventure, careers, university pathways, culture, global immersion and entrepreneurship) for schools and higher education.",
  alternates: { canonical: "/programs" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Kashti Educare",
    title: "Programs | Kashti Educare",
    description:
      "53 experiential programmes across eight themes (STEM, leadership, adventure, careers, university pathways, culture, global immersion and entrepreneurship) for schools and higher education.",
  },
};

export default function ProgramsPage() {
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
              <span aria-current="page">Programs</span>
            </nav>{" "}
            <p className="eyebrow">Programs</p>{" "}
            <h1 className="display">
              <span className="t1">Programs built</span>
              <span className="t2">around every learner.</span>
            </h1>{" "}
            <p className="lede">
              Institutions have different needs. Browse by theme, or go straight
              to an audience-specific roster.
            </p>{" "}
            <div className="btn-row">
              <a className="btn btn-primary" href="#catalogue">
                {"Browse the full catalogue "}
                <svg className="icon " aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </a>
              <a
                className="btn btn-outline"
                href="/programs?audience=school#catalogue"
              >
                School programs
              </a>
              <a
                className="btn btn-outline"
                href="/programs?audience=he#catalogue"
              >
                Higher education programs
              </a>
            </div>{" "}
          </div>{" "}
          <div className="hero-mosaic">
            {" "}
            <div
              className="ph ph-fit "
              data-label="A visit to ISRO"
              style={{ "--c": "#2150C2" } as React.CSSProperties}
            >
              <img
                className="ph-fill"
                src="https://kashtieducare.com/images/gallery/isro-visit-2.jpeg"
                alt=""
                aria-hidden="true"
                fetchPriority="high"
                decoding="async"
              />
              <img
                className="ph-img"
                src="https://kashtieducare.com/images/gallery/isro-visit-2.jpeg"
                alt="A visit to ISRO"
                fetchPriority="high"
                decoding="async"
              />
            </div>{" "}
            <div
              className="ph ph-fit "
              data-label="Kashti group at Corbett National Park"
              style={{ "--c": "#3D8B33" } as React.CSSProperties}
            >
              <img
                className="ph-fill"
                src="https://kashtieducare.com/images/gallery/expedition-group-2.jpg"
                alt=""
                aria-hidden="true"
                fetchPriority="high"
                decoding="async"
              />
              <img
                className="ph-img"
                src="https://kashtieducare.com/images/gallery/expedition-group-2.jpg"
                alt="Kashti group at Corbett National Park"
                fetchPriority="high"
                decoding="async"
              />
            </div>{" "}
            <div
              className="ph ph-fit "
              data-label="A discussion session at IILM"
              style={{ "--c": "#6544CC" } as React.CSSProperties}
            >
              <img
                className="ph-fill"
                src="https://kashtieducare.com/images/gallery/iilm-discussion.jpeg"
                alt=""
                aria-hidden="true"
                fetchPriority="high"
                decoding="async"
              />
              <img
                className="ph-img"
                src="https://kashtieducare.com/images/gallery/iilm-discussion.jpeg"
                alt="A discussion session at IILM"
                fetchPriority="high"
                decoding="async"
              />
            </div>{" "}
            <p className="script hm-note">53 ways to learn.</p>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="section bg-white" id="themes">
        {" "}
        <div className="container">
          {" "}
          <div className="section-head">
            {" "}
            <p className="eyebrow">Eight themes</p>{" "}
            <h2 className="h2">
              <span className="t1">What we offer,</span>
              <span className="t2">for whom.</span>
            </h2>{" "}
            <p className="lede">
              Eight ways in. Pick a starting point, or browse the full
              portfolio.
            </p>{" "}
          </div>{" "}
          <div className="theme-rows" data-render="theme-rows" />{" "}
        </div>{" "}
      </section>{" "}
      <section className="section bg-wash" id="catalogue">
        {" "}
        <div className="container">
          {" "}
          <div className="section-head split">
            {" "}
            <div>
              {" "}
              <p className="eyebrow">Find the right programme</p>{" "}
              <h2 className="h2">
                <span className="t1">The full</span>
                <span className="t2">catalogue.</span>
              </h2>{" "}
            </div>{" "}
            <button
              className="btn btn-outline btn-sm filter-toggle"
              type="button"
              aria-expanded="false"
              aria-controls="filters"
            >
              <svg className="icon " aria-hidden="true">
                <use href="#i-filter" />
              </svg>
              {" Filters"}
            </button>{" "}
          </div>{" "}
          <div className="cat-layout" data-catalogue="">
            {" "}
            <aside
              className="panel filters"
              id="filters"
              aria-label="Filter programmes"
            >
              {" "}
              <div>
                {" "}
                <h3>I'm looking for</h3>{" "}
                <div
                  className="seg"
                  role="group"
                  aria-label="Audience"
                  data-f-aud=""
                >
                  {" "}
                  <button type="button" aria-pressed="true" data-v="all">
                    All
                  </button>{" "}
                  <button type="button" aria-pressed="false" data-v="school">
                    School
                  </button>{" "}
                  <button type="button" aria-pressed="false" data-v="he">
                    Higher Ed
                  </button>{" "}
                </div>{" "}
              </div>{" "}
              <div>
                {" "}
                <h3>Interest</h3> <div className="chips" data-f-theme="" />{" "}
              </div>{" "}
              <div>
                {" "}
                <h3>Format</h3> <div className="chips" data-f-format="" />{" "}
              </div>{" "}
              <div>
                {" "}
                <h3>
                  <label htmlFor="q">Search</label>
                </h3>{" "}
                <div className="search">
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-search" />
                  </svg>
                  <input
                    className="input"
                    id="q"
                    type="search"
                    placeholder="e.g. trek, ISRO, founders"
                    data-f-q=""
                  />
                </div>{" "}
              </div>{" "}
              <button className="reset" type="button" data-f-reset="">
                Clear all filters
              </button>{" "}
            </aside>{" "}
            <div>
              {" "}
              <div className="cat-top">
                {" "}
                <div>
                  {" "}
                  <h2 data-cat-title="">All programmes</h2>{" "}
                  <p
                    className="muted small"
                    data-cat-sub=""
                    style={{ marginTop: "4px" } as React.CSSProperties}
                  />{" "}
                </div>{" "}
                <p aria-live="polite" data-cat-count="" />{" "}
              </div>{" "}
              <div className="cat-grid" data-cat-grid="" />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="section bg-white" id="faq">
        {" "}
        <div className="container">
          {" "}
          <div className="section-head">
            {" "}
            <p className="eyebrow">Common questions</p>{" "}
            <h2 className="h2">
              <span className="t1">Frequently asked</span>
              <span className="t2">questions.</span>
            </h2>{" "}
          </div>{" "}
          <div className="faq" data-render="faq" />{" "}
        </div>{" "}
      </section>{" "}
      <section className="section bg-wash">
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
      <div className="modal" data-modal="" aria-hidden="true">
        {" "}
        <div className="modal-scrim" data-modal-close="" />{" "}
        <div
          className="modal-card"
          role="dialog"
          aria-modal="true"
          aria-labelledby="md-title"
          tabIndex={-1}
        >
          {" "}
          <button
            className="modal-close"
            type="button"
            aria-label="Close"
            data-modal-close=""
          >
            <svg className="icon " aria-hidden="true">
              <use href="#i-x" />
            </svg>
          </button>{" "}
          <div data-modal-body="" />{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
}
