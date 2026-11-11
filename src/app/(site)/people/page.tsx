import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "People | Kashti Educare" },
  description:
    "The people behind Kashti Educare: Karan Kumar Singh, Dr. Rishi Mohan Bhatnagar, Dr. Ashok Kumar Thakur and Coach Aditya Sisodia.",
  alternates: { canonical: "/people" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Kashti Educare",
    title: "People | Kashti Educare",
    description:
      "The people behind Kashti Educare: Karan Kumar Singh, Dr. Rishi Mohan Bhatnagar, Dr. Ashok Kumar Thakur and Coach Aditya Sisodia.",
  },
};

export default function PeoplePage() {
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
              <span aria-current="page">People</span>
            </nav>{" "}
            <p className="eyebrow">Our people</p>{" "}
            <h1 className="display">
              <span className="t1">The people</span>
              <span className="t2">behind the idea.</span>
            </h1>{" "}
            <p className="lede">
              Kashti is built by people who believe learning should not end at
              the classroom door. Meet the people who help shape every
              programme.
            </p>{" "}
            <div className="btn-row">
              <a className="btn btn-primary" href="#team">
                {"Meet the team "}
                <svg className="icon " aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </a>
              <a
                className="btn btn-outline"
                href="/contact?intent=institutional-partner"
              >
                Join the council
              </a>
            </div>{" "}
          </div>{" "}
          <div className="faces" data-render="people-faces" />{" "}
        </div>{" "}
      </section>{" "}
      <section className="section bg-wash" id="team">
        {" "}
        <div className="container">
          {" "}
          <div className="section-head">
            {" "}
            <p className="eyebrow">Our people</p>{" "}
            <h2 className="h2">
              <span className="t1">The force behind</span>
              <span className="t2">our vision.</span>
            </h2>{" "}
            <p className="lede">
              Leaders who guide Kashti's direction and how our programmes are
              designed.
            </p>{" "}
          </div>{" "}
          <div className="advisors" data-render="team" />{" "}
        </div>{" "}
      </section>{" "}
      <section className="section bg-sky-glow" id="council">
        {" "}
        <div className="container">
          {" "}
          <div className="section-head">
            {" "}
            <p className="eyebrow">How the council works</p>{" "}
            <h2 className="h2">
              <span className="t1">{"The Education &"}</span>
              <span className="t2">Experience Council.</span>
            </h2>{" "}
            <p className="lede">
              The collective structure behind how Kashti programmes are designed
              and delivered.
            </p>{" "}
          </div>{" "}
          <div className="council-row" data-render="council" />{" "}
        </div>{" "}
      </section>{" "}
      <section className="section bg-white" id="join">
        {" "}
        <div className="container">
          {" "}
          <div className="join-council">
            {" "}
            <span className="seat-ic" aria-hidden="true">
              <svg className="icon " aria-hidden="true">
                <use href="#i-user-plus" />
              </svg>
            </span>{" "}
            <div>
              {" "}
              <h2 className="h3">Want to be part of this?</h2>{" "}
              <p>
                Educators, researchers, industry leaders and institutions: we'd
                love to hear from you.
              </p>{" "}
            </div>{" "}
            <a
              className="btn btn-saffron"
              href="/contact?intent=institutional-partner"
            >
              {"Join the council "}
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
