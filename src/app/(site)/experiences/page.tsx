import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Experiences | Kashti Educare" },
  description:
    "The Kashti Experience Model: how every programme moves learners from exposure to capability to clarity: Orient → Immerse → Build → Transform, and See → Build → Become.",
  alternates: { canonical: "/experiences" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Kashti Educare",
    title: "Experiences | Kashti Educare",
    description:
      "The Kashti Experience Model: how every programme moves learners from exposure to capability to clarity: Orient → Immerse → Build → Transform, and See → Build → Become.",
  },
};

export default function ExperiencesPage() {
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
              <span aria-current="page">Experiences</span>
            </nav>{" "}
            <p className="eyebrow">Experiences</p>{" "}
            <h1 className="display">
              <span className="t1">The Kashti</span>
              <span className="t2">experience model.</span>
            </h1>{" "}
            <p className="lede">
              From exposure to capability to clarity: a journey that transforms.
              This is how we structure every experience, and what it builds in a
              learner.
            </p>{" "}
            <div className="btn-row">
              <a className="btn btn-primary" href="/programs">
                {"See it applied in our programs "}
                <svg className="icon " aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </a>
              <a
                className="btn btn-outline"
                href="/contact?intent=design-experience"
              >
                Design an experience
              </a>
            </div>{" "}
          </div>{" "}
          <div className="hero-mosaic">
            {" "}
            <div
              className="ph ph-fit "
              data-label="Kashti group at Corbett National Park"
              style={{ "--c": "#3D8B33" } as React.CSSProperties}
            >
              <img
                className="ph-fill"
                src="https://kashtieducare.com/images/gallery/field-moment-1.jpg"
                alt=""
                aria-hidden="true"
                fetchPriority="high"
                decoding="async"
              />
              <img
                className="ph-img"
                src="https://kashtieducare.com/images/gallery/field-moment-1.jpg"
                alt="Kashti group at Corbett National Park"
                fetchPriority="high"
                decoding="async"
              />
            </div>{" "}
            <div
              className="ph ph-fit "
              data-label="A leadership and mentorship session"
              style={{ "--c": "#6544CC" } as React.CSSProperties}
            >
              <img
                className="ph-fill"
                src="https://kashtieducare.com/images/gallery/leadership-session.jpeg"
                alt=""
                aria-hidden="true"
                fetchPriority="high"
                decoding="async"
              />
              <img
                className="ph-img"
                src="https://kashtieducare.com/images/gallery/leadership-session.jpeg"
                alt="A leadership and mentorship session"
                fetchPriority="high"
                decoding="async"
              />
            </div>{" "}
            <div
              className="ph ph-fit "
              data-label="A visit to ISRO"
              style={{ "--c": "#2150C2" } as React.CSSProperties}
            >
              <img
                className="ph-fill"
                src="https://kashtieducare.com/images/gallery/isro-visit-1.jpeg"
                alt=""
                aria-hidden="true"
                fetchPriority="high"
                decoding="async"
              />
              <img
                className="ph-img"
                src="https://kashtieducare.com/images/gallery/isro-visit-1.jpeg"
                alt="A visit to ISRO"
                fetchPriority="high"
                decoding="async"
              />
            </div>{" "}
            <p className="script hm-note">See. Build. Become.</p>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="section bg-white" id="deliver">
        {" "}
        <div className="container">
          {" "}
          <div className="section-head center">
            {" "}
            <p className="eyebrow">How we deliver</p>{" "}
            <h2 className="h2">
              <span className="t1">A structured pedagogy,</span>
              <span className="t2">from orientation to transformation.</span>
            </h2>{" "}
            <p className="lede">
              Every Kashti programme moves through the same four stages, whether
              it runs for an afternoon or a full academic year.
            </p>{" "}
          </div>{" "}
          <ol className="stages">
            {" "}
            <li className="stage">
              {" "}
              <div className="st-top">
                <span className="st-no">01</span>
                <span
                  className="ic ic-sm"
                  style={{ "--c": "#0E8F86" } as React.CSSProperties}
                >
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-compass" />
                  </svg>
                </span>
              </div>{" "}
              <span className="st-tag">Discovery</span> <h3>Orient</h3>{" "}
              <p>
                Sparks curiosity through talks, panels and career conversations.
              </p>{" "}
              <div className="st-out">
                <svg className="icon " aria-hidden="true">
                  <use href="#i-clock" />
                </svg>
                Typical format: 90 minutes · orientation
              </div>{" "}
            </li>{" "}
            <li className="stage">
              {" "}
              <div className="st-top">
                <span className="st-no">02</span>
                <span
                  className="ic ic-sm"
                  style={{ "--c": "#0F3E9E" } as React.CSSProperties}
                >
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-eye" />
                  </svg>
                </span>
              </div>{" "}
              <span className="st-tag">Exposure</span> <h3>Immerse</h3>{" "}
              <p>
                Puts learners in the real world through workshops, labs and
                interactions.
              </p>{" "}
              <div className="st-out">
                <svg className="icon " aria-hidden="true">
                  <use href="#i-clock" />
                </svg>
                Typical format: 1 day · immersion or workshop
              </div>{" "}
            </li>{" "}
            <li className="stage">
              {" "}
              <div className="st-top">
                <span className="st-no">03</span>
                <span
                  className="ic ic-sm"
                  style={{ "--c": "#6544CC" } as React.CSSProperties}
                >
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-wrench" />
                  </svg>
                </span>
              </div>{" "}
              <span className="st-tag">Capability</span> <h3>Build</h3>{" "}
              <p>
                Turns exposure into capability through multi-day journeys,
                challenges and projects.
              </p>{" "}
              <div className="st-out">
                <svg className="icon " aria-hidden="true">
                  <use href="#i-clock" />
                </svg>
                Typical format: 2–4 days · multi-location
              </div>{" "}
            </li>{" "}
            <li className="stage">
              {" "}
              <div className="st-top">
                <span className="st-no">04</span>
                <span
                  className="ic ic-sm"
                  style={{ "--c": "#C98A00" } as React.CSSProperties}
                >
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-sparkles" />
                  </svg>
                </span>
              </div>{" "}
              <span className="st-tag">Transformation</span> <h3>Transform</h3>{" "}
              <p>
                Creates deeper, lasting impact through leadership experiences
                and capstones.
              </p>{" "}
              <div className="st-out">
                <svg className="icon " aria-hidden="true">
                  <use href="#i-clock" />
                </svg>
                Typical format: 5–7 days · deep immersion
              </div>{" "}
            </li>{" "}
          </ol>{" "}
        </div>{" "}
      </section>{" "}
      <section className="section bg-wash" id="model">
        {" "}
        <div className="container">
          {" "}
          <div className="section-head center">
            {" "}
            <p className="eyebrow">The Kashti experience model</p>{" "}
            <h2 className="h2">
              <span className="t1">See. Build.</span>
              <span className="t2">Become.</span>
            </h2>{" "}
            <p className="lede">
              From exposure to capability to clarity: a journey that transforms.
            </p>{" "}
          </div>{" "}
          <div className="model">
            {" "}
            <article
              className="model-card"
              style={{ "--c": "#0F3E9E" } as React.CSSProperties}
            >
              {" "}
              <span className="mc-step" aria-hidden="true">
                01
              </span>{" "}
              <h3>See</h3> <span className="mc-sub">Exposure</span>{" "}
              <p>
                Learners encounter real environments, industries, institutions,
                experts and ideas.
              </p>{" "}
              <div className="mc-out">
                <b>What the learner takes away</b>Curiosity and context: what
                the world beyond the classroom actually looks like.
              </div>{" "}
            </article>{" "}
            <article
              className="model-card"
              style={{ "--c": "#0E8F86" } as React.CSSProperties}
            >
              {" "}
              <span className="mc-step" aria-hidden="true">
                02
              </span>{" "}
              <h3>Build</h3> <span className="mc-sub">Capability</span>{" "}
              <p>
                Strengthens critical thinking, communication, collaboration,
                leadership and problem-solving.
              </p>{" "}
              <div className="mc-out">
                <b>What the learner takes away</b>Skills that transfer,
                practised in real settings and not memorised.
              </div>{" "}
            </article>{" "}
            <article
              className="model-card"
              style={{ "--c": "#C98A00" } as React.CSSProperties}
            >
              {" "}
              <span className="mc-step" aria-hidden="true">
                03
              </span>{" "}
              <h3>Become</h3> <span className="mc-sub">Clarity</span>{" "}
              <p>
                Helps learners explore interests, career pathways and
                higher-education options.
              </p>{" "}
              <div className="mc-out">
                <b>What the learner takes away</b>Direction: a clearer sense of
                where learning leads next.
              </div>{" "}
            </article>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="section bg-white">
        {" "}
        <div className="container">
          {" "}
          <div className="section-head">
            {" "}
            <p className="eyebrow">In practice</p>{" "}
            <h2 className="h2">
              <span className="t1">Each stage,</span>
              <span className="t2">and the format that carries it.</span>
            </h2>{" "}
            <p className="lede">
              The pedagogy lines up with our five programme formats, so a single
              session and a year-long engagement follow the same logic.
            </p>{" "}
          </div>{" "}
          <div className="matrix">
            {" "}
            <table>
              {" "}
              <thead>
                <tr>
                  <th scope="col">Stage</th>
                  <th scope="col">What happens</th>
                  <th scope="col">Typical format</th>
                  <th scope="col">Examples</th>
                </tr>
              </thead>{" "}
              <tbody>
                {" "}
                <tr>
                  <th scope="row">
                    Orient<small>Discovery</small>
                  </th>
                  <td>
                    Sparks curiosity through talks, panels and career
                    conversations.
                  </td>
                  <td>90 minutes · orientation</td>
                  <td>Talks, panels and career conversations.</td>
                </tr>{" "}
                <tr>
                  <th scope="row">
                    Immerse<small>Exposure</small>
                  </th>
                  <td>
                    Puts learners in the real world through workshops, labs and
                    interactions.
                  </td>
                  <td>1 day · immersion or workshop</td>
                  <td>
                    Industrial visits, campus tours, hands-on lab sessions.
                  </td>
                </tr>{" "}
                <tr>
                  <th scope="row">
                    Build<small>Capability</small>
                  </th>
                  <td>
                    Turns exposure into capability through multi-day journeys,
                    challenges and projects.
                  </td>
                  <td>2–4 days · multi-location</td>
                  <td>STEM Tour geo-circuits and leadership camps.</td>
                </tr>{" "}
                <tr>
                  <th scope="row">
                    Transform<small>Transformation</small>
                  </th>
                  <td>
                    Creates deeper, lasting impact through leadership
                    experiences and capstones.
                  </td>
                  <td>5–7 days · deep immersion</td>
                  <td>Startup immersions, treks and global immersion trips.</td>
                </tr>{" "}
                <tr>
                  <th scope="row">
                    All four<small>Annual</small>
                  </th>
                  <td>
                    A structured multi-programme roadmap built around your
                    academic calendar.
                  </td>
                  <td>Annual · institutional engagement</td>
                  <td>
                    Recurring industry connect, mentorship, a multi-programme
                    roadmap.
                  </td>
                </tr>{" "}
              </tbody>{" "}
            </table>{" "}
          </div>{" "}
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
                <span className="t1">See it applied</span>
                <span className="t2">in our programs.</span>
              </h2>{" "}
              <p>
                Tell us about your institution, your learners and your goals.
                We'll reply with a customised proposal.
              </p>{" "}
              <div className="btn-row">
                {" "}
                <a className="btn btn-saffron" href="/programs">
                  {"Explore programs "}
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-arrow" />
                  </svg>
                </a>{" "}
                <a
                  className="btn btn-ghost-light"
                  href="/contact?intent=design-experience"
                >
                  Design an experience
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
