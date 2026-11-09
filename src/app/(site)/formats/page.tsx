import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Formats | Kashti Educare" },
  description:
    "Flexible by design: from a single 90-minute orientation session to a year-long institutional engagement aligned with your academic calendar.",
  alternates: { canonical: "/formats" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Kashti Educare",
    title: "Formats | Kashti Educare",
    description:
      "Flexible by design: from a single 90-minute orientation session to a year-long institutional engagement aligned with your academic calendar.",
  },
};

export default function FormatsPage() {
  return (
    <>
      {" "}
      <section className="page-hero">
        {" "}
        <div className="container ">
          {" "}
          <div>
            {" "}
            <nav className="crumbs" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <svg className="icon " aria-hidden="true">
                <use href="#i-chev-r" />
              </svg>
              <span aria-current="page">Formats</span>
            </nav>{" "}
            <p className="eyebrow">Program formats</p>{" "}
            <h1 className="display">
              <span className="t1">Flexible</span>
              <span className="t2">by design.</span>
            </h1>{" "}
            <p className="lede">
              From a single 90-minute session to a year-long journey aligned
              with your academic calendar.
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="section-tight bg-white">
        {" "}
        <div className="container">
          <div className="panel ruler">
            {" "}
            <div className="ruler-track" aria-hidden="true" />{" "}
            <ol>
              {" "}
              <li>
                <span className="r-dot" aria-hidden="true" />
                <span className="r-dur">90 min</span>
                <span className="r-name">Orientation</span>
                <span className="r-kind">Discovery</span>
                <span className="r-ex">
                  Talks, panels and career conversations.
                </span>
              </li>{" "}
              <li>
                <span className="r-dot" aria-hidden="true" />
                <span className="r-dur">1 day</span>
                <span className="r-name">Immersion</span>
                <span className="r-kind">Workshop</span>
                <span className="r-ex">
                  Industrial visits, campus tours, hands-on lab sessions.
                </span>
              </li>{" "}
              <li>
                <span className="r-dot" aria-hidden="true" />
                <span className="r-dur">2–4 days</span>
                <span className="r-name">Multi-location</span>
                <span className="r-kind">Experiential</span>
                <span className="r-ex">
                  STEM Tour geo-circuits and leadership camps.
                </span>
              </li>{" "}
              <li>
                <span className="r-dot" aria-hidden="true" />
                <span className="r-dur">5–7 days</span>
                <span className="r-name">Deep immersion</span>
                <span className="r-kind">Leadership</span>
                <span className="r-ex">
                  Startup immersions, treks and global immersion trips.
                </span>
              </li>{" "}
              <li>
                <span className="r-dot" aria-hidden="true" />
                <span className="r-dur">Annual</span>
                <span className="r-name">Year-long</span>
                <span className="r-kind">
                  Aligned with your academic calendar
                </span>
                <span className="r-ex">
                  Recurring industry connect, mentorship, a multi-programme
                  roadmap.
                </span>
              </li>{" "}
            </ol>{" "}
          </div>
        </div>{" "}
      </section>{" "}
      <section className="section bg-wash">
        {" "}
        <div className="container">
          {" "}
          <div className="section-head">
            {" "}
            <p className="eyebrow">Which format fits?</p>{" "}
            <h2 className="h2">
              <span className="t1">A closer look at what</span>
              <span className="t2">each format is built for.</span>
            </h2>{" "}
          </div>{" "}
          <div className="formats-detail">
            {" "}
            <article className="fd-row">
              {" "}
              <div className="fd-dur">
                90 Minutes<small>Orientation · Discovery</small>
              </div>{" "}
              <div>
                <h3>A single session</h3>
                <p>
                  A talk, panel or career conversation, designed to spark
                  curiosity without needing a full day.
                </p>
                <p className="fd-best">
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-target" />
                  </svg>
                  <span>
                    Best for: A first touchpoint before committing to a deeper
                    programme.
                  </span>
                </p>
              </div>{" "}
              <a
                className="link-arrow"
                href="/contact?intent=design-experience"
              >
                {"Plan an orientation "}
                <svg className="icon " aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </a>{" "}
            </article>{" "}
            <article className="fd-row">
              {" "}
              <div className="fd-dur">
                1 Day<small>Immersion · Workshop</small>
              </div>{" "}
              <div>
                <h3>A focused, single-site visit or workshop</h3>
                <p>
                  An industrial visit, a campus tour or a hands-on lab session.
                  Enough time to see and do, without disrupting the academic
                  calendar.
                </p>
                <p className="fd-best">
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-target" />
                  </svg>
                  <span>
                    Best for: Hands-on exposure at one location during a normal
                    term.
                  </span>
                </p>
              </div>{" "}
              <a className="link-arrow" href="/programs?format=one#catalogue">
                {"See one-day programmes "}
                <svg className="icon " aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </a>{" "}
            </article>{" "}
            <article className="fd-row">
              {" "}
              <div className="fd-dur">
                2–4 Days<small>Multi-location · Experiential</small>
              </div>{" "}
              <div>
                <h3>Multi-stop circuits and short residential camps</h3>
                <p>
                  STEM Tour geo-circuits and leadership camps. Long enough to
                  build a narrative across locations.
                </p>
                <p className="fd-best">
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-target" />
                  </svg>
                  <span>
                    Best for: Learners who benefit from a multi-site story, with
                    manageable time away from term.
                  </span>
                </p>
              </div>{" "}
              <a className="link-arrow" href="/programs?format=multi#catalogue">
                {"See multi-day programmes "}
                <svg className="icon " aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </a>{" "}
            </article>{" "}
            <article className="fd-row">
              {" "}
              <div className="fd-dur">
                5–7 Days<small>Deep Immersion · Leadership</small>
              </div>{" "}
              <div>
                <h3>Flagship programmes</h3>
                <p>
                  Startup immersions, treks and global immersion trips. Enough
                  time for a full debrief cycle that changes how a learner
                  thinks.
                </p>
                <p className="fd-best">
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-target" />
                  </svg>
                  <span>
                    Best for: Capability-building and leadership development.
                  </span>
                </p>
              </div>{" "}
              <a className="link-arrow" href="/programs?format=res#catalogue">
                {"See residential programmes "}
                <svg className="icon " aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </a>{" "}
            </article>{" "}
            <article className="fd-row">
              {" "}
              <div className="fd-dur">
                Annual<small>Aligned with your academic calendar</small>
              </div>{" "}
              <div>
                <h3>Institutional engagements across a full academic year</h3>
                <p>
                  Recurring industry connect sessions, ongoing mentorship, or a
                  structured multi-programme roadmap built around your
                  institution's calendar.
                </p>
                <p className="fd-best">
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-target" />
                  </svg>
                  <span>
                    Best for: Institutions looking for sustained, year-long
                    engagement.
                  </span>
                </p>
              </div>{" "}
              <a className="link-arrow" href="/#planner">
                {"Sketch a year plan "}
                <svg className="icon " aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </a>{" "}
            </article>{" "}
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
                <span className="t1">Not sure which</span>
                <span className="t2">format fits?</span>
              </h2>{" "}
              <p>
                Tell us about your learners and your calendar. We'll suggest the
                right mix of formats in a customised proposal.
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
