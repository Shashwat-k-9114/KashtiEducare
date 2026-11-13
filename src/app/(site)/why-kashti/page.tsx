import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Why Kashti | Kashti Educare" },
  description:
    "We connect learners with people, institutions, industries and ideas shaping the real world through NEP 2020-aligned experiential learning for schools and higher education.",
  alternates: { canonical: "/why-kashti" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Kashti Educare",
    title: "Why Kashti | Kashti Educare",
    description:
      "We connect learners with people, institutions, industries and ideas shaping the real world through NEP 2020-aligned experiential learning for schools and higher education.",
  },
};

export default function WhyKashtiPage() {
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
              <span aria-current="page">Why Kashti</span>
            </nav>{" "}
            <p className="eyebrow">Why Kashti</p>{" "}
            <h1 className="display">
              <span className="t1">Preparing learners</span>
              <span className="t1">for the world</span>
              <span className="t2">beyond the classroom.</span>
            </h1>{" "}
            <p className="lede">
              We connect learners with people, institutions, industries and
              ideas shaping the real world: on shop floors, campuses and
              expedition trails, not just in textbooks.
            </p>{" "}
            <div className="btn-row">
              <a className="btn btn-primary" href="/programs">
                {"Explore programs "}
                <svg className="icon " aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </a>
              <a className="btn btn-outline" href="/contact">
                {"Talk to us "}
                <svg className="icon " aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </a>
            </div>{" "}
          </div>{" "}
          <div className="hero-mosaic">
            {" "}
            <div
              className="ph ph-fit "
              data-label="ICOSA School Conclave 2026"
              style={{ "--c": "#0F3E9E" } as React.CSSProperties}
            >
              <img
                className="ph-fill"
                src="/images/gallery/icosa-school-conclave.jpg"
                alt=""
                aria-hidden="true"
                fetchPriority="high"
                decoding="async"
              />
              <img
                className="ph-img"
                src="/images/gallery/icosa-school-conclave.jpg"
                alt="ICOSA School Conclave 2026"
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
              data-label="Kashti at the School Leaders' Summit"
              style={{ "--c": "#CF4A6E" } as React.CSSProperties}
            >
              <img
                className="ph-fill"
                src="https://kashtieducare.com/images/gallery/school-leaders-summit.jpeg"
                alt=""
                aria-hidden="true"
                fetchPriority="high"
                decoding="async"
              />
              <img
                className="ph-img"
                src="https://kashtieducare.com/images/gallery/school-leaders-summit.jpeg"
                alt="Kashti at the School Leaders' Summit"
                fetchPriority="high"
                decoding="async"
              />
            </div>{" "}
            <p className="script hm-note">Beyond textbooks.</p>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="section bg-white">
        {" "}
        <div className="container">
          {" "}
          <div className="section-head center">
            {" "}
            <p className="eyebrow">What we stand for</p>{" "}
            <h2 className="h2">
              <span className="t1">Six commitments</span>
              <span className="t2">behind every programme.</span>
            </h2>{" "}
          </div>{" "}
          <div className="icon-cards cols-3" data-render="standfor" />{" "}
        </div>{" "}
      </section>{" "}
      <section className="section bg-wash">
        {" "}
        <div className="container">
          {" "}
          <div className="section-head">
            {" "}
            <p className="eyebrow">Our reach</p>{" "}
            <h2 className="h2">
              <span className="t1">What institutions gain:</span>
              <span className="t2">measurable, meaningful outcomes.</span>
            </h2>{" "}
          </div>{" "}
          <div className="gain-grid">
            {" "}
            <div className="gain-photos">
              {" "}
              <div
                className="ph ph-fit "
                data-label="Dr. Om Pathak addressing the ICOSA School Conclave"
                style={{ "--c": "#6544CC" } as React.CSSProperties}
              >
                <img
                  className="ph-fill"
                  src="/images/gallery/om-pathak.jpg"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                />
                <img
                  className="ph-img"
                  src="/images/gallery/om-pathak.jpg"
                  alt="Dr. Om Pathak addressing the ICOSA School Conclave"
                  loading="lazy"
                  decoding="async"
                />
              </div>{" "}
              <div
                className="ph ph-fit "
                data-label="Kashti team at the Embassy of Mexico"
                style={{ "--c": "#3D8B33" } as React.CSSProperties}
              >
                <img
                  className="ph-fill"
                  src="/images/gallery/mexico-embassy.jpg"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                />
                <img
                  className="ph-img"
                  src="/images/gallery/mexico-embassy.jpg"
                  alt="Kashti team at the Embassy of Mexico"
                  loading="lazy"
                  decoding="async"
                />
              </div>{" "}
              <div
                className="ph ph-fit "
                data-label="Kashti session with Furusawa Language Academy at Bharati Vidyapeeth"
                style={{ "--c": "#0F3E9E" } as React.CSSProperties}
              >
                <img
                  className="ph-fill"
                  src="/images/gallery/bvp-1.jpg"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                />
                <img
                  className="ph-img"
                  src="/images/gallery/bvp-1.jpg"
                  alt="Kashti session with Furusawa Language Academy at Bharati Vidyapeeth"
                  loading="lazy"
                  decoding="async"
                />
              </div>{" "}
              <div
                className="ph ph-fit "
                data-label="Kashti learning experience"
                style={{ "--c": "#0F3E9E" } as React.CSSProperties}
              >
                <img className="ph-fill" src="/images/gallery/gain-4.jpg" alt="" aria-hidden="true" loading="lazy" decoding="async" />
                <img className="ph-img" src="/images/gallery/gain-4.jpg" alt="Kashti learning experience" loading="lazy" decoding="async" />
              </div>{" "}
              <div
                className="ph ph-fit "
                data-label="Kashti on campus"
                style={{ "--c": "#0F3E9E" } as React.CSSProperties}
              >
                <img className="ph-fill" src="/images/gallery/gain-5.jpg" alt="" aria-hidden="true" loading="lazy" decoding="async" />
                <img className="ph-img" src="/images/gallery/gain-5.jpg" alt="Kashti on campus" loading="lazy" decoding="async" />
              </div>{" "}
              <div
                className="ph ph-fit "
                data-label="Kashti at O.P. Jindal Global University"
                style={{ "--c": "#0F3E9E" } as React.CSSProperties}
              >
                <img className="ph-fill" src="/images/gallery/gain-6.jpg" alt="" aria-hidden="true" loading="lazy" decoding="async" />
                <img className="ph-img" src="/images/gallery/gain-6.jpg" alt="Kashti at O.P. Jindal Global University" loading="lazy" decoding="async" />
              </div>{" "}
            </div>{" "}
            <div
              className="icon-cards cols-2"
              data-render="values-cards"
            />{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="section bg-white" id="nep">
        {" "}
        <div className="container nep">
          {" "}
          <div>
            {" "}
            <p className="eyebrow">Policy alignment</p>{" "}
            <h2 className="h2">
              <span className="t1">Aligned with India's</span>
              <span className="t2">National Education Policy 2020.</span>
            </h2>{" "}
            <p
              className="lede"
              style={{ marginTop: "20px" } as React.CSSProperties}
            >
              Our programme model is built around NEP 2020's shift from content
              delivery to applied, real-world learning.
            </p>{" "}
            <div className="nep-badge">
              {" "}
              <div className="logo-tile" data-logo="">
                <img
                  src="https://kashtieducare.com/images/logos/nep-2020.png"
                  alt="National Education Policy 2020"
                  loading="lazy"
                />
                <span className="lt-name">NEP 2020</span>
              </div>{" "}
              <p>
                Kashti Educare was featured in NEP 2020 experiential-learning
                case studies in July 2026.
              </p>{" "}
            </div>{" "}
            <div
              className="btn-row"
              style={{ marginTop: "26px" } as React.CSSProperties}
            >
              <a className="link-arrow" href="/experiences">
                {"See the experience model "}
                <svg className="icon " aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </a>
            </div>{" "}
          </div>{" "}
          <div>
            {" "}
            <figure className="nep-photo">
              <div
                className="ph ph-fit "
                data-label="Aligned with India's National Education Policy 2020"
                style={{ "--c": "#0F3E9E" } as React.CSSProperties}
              >
                <img
                  className="ph-fill"
                  src="/images/gallery/nep-2020-infographic.jpg"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                />
                <img
                  className="ph-img"
                  src="/images/gallery/nep-2020-infographic.jpg"
                  alt="Aligned with India's National Education Policy 2020: holistic development, experiential learning, skill development, multidisciplinary learning, Indian knowledge systems, inclusion and equity, technology integration, career awareness and vocational exposure"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </figure>{" "}
            {" "}
            <div className="principles">
              {" "}
              <article className="principle">
                <h3>
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-layers" />
                  </svg>
                  {"Multidisciplinary & holistic"}
                </h3>
                <p>
                  Programmes span industry, academia, government and community.
                </p>
              </article>{" "}
              <article className="principle">
                <h3>
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-wrench" />
                  </svg>
                  {"Experiential & competency-based"}
                </h3>
                <p>
                  Every experience is hands-on and outcome-based, not
                  lecture-delivered content to memorise.
                </p>
              </article>{" "}
              <article className="principle">
                <h3>
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-briefcase" />
                  </svg>
                  Early vocational exposure
                </h3>
                <p>
                  Workplace exposure starts at school level, long before a
                  career decision.
                </p>
              </article>{" "}
              <article className="principle">
                <h3>
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-target" />
                  </svg>
                  Application over content
                </h3>
                <p>The emphasis is on applying learning in the field.</p>
              </article>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="section bg-wash" id="in-action">
        {" "}
        <div className="container">
          {" "}
          <div className="action-grid">
            {" "}
            <div>
              {" "}
              <h2 className="h2">
                <span className="t1">Learning in action.</span>
                <span className="t2">Experiences that stay.</span>
              </h2>{" "}
              <p
                className="lede"
                style={{ marginTop: "20px" } as React.CSSProperties}
              >
                From research labs to industry floors to mountain trails: Kashti
                programmes, institution visits and expeditions as they actually
                happened.
              </p>{" "}
              <ul className="stat-row" data-render="stats" />{" "}
            </div>{" "}
            <div className="collage">
              {" "}
              <figure
                className="polaroid"
                style={
                  { "--r": "-2deg", "--c": "#2150C2" } as React.CSSProperties
                }
              >
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
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    className="ph-img"
                    src="https://kashtieducare.com/images/gallery/isro-visit-1.jpeg"
                    alt="A visit to ISRO"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <figcaption>
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-rocket" />
                  </svg>
                  {"ISRO & science exposure"}
                </figcaption>
              </figure>{" "}
              <figure
                className="polaroid"
                style={
                  { "--r": "1.5deg", "--c": "#C2560C" } as React.CSSProperties
                }
              >
                <div
                  className="ph ph-fit "
                  data-label="A visit to O.P. Jindal Global University"
                  style={{ "--c": "#C2560C" } as React.CSSProperties}
                >
                  <img
                    className="ph-fill"
                    src="https://kashtieducare.com/images/gallery/opj-visit-1.jpeg"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    className="ph-img"
                    src="https://kashtieducare.com/images/gallery/opj-visit-1.jpeg"
                    alt="A visit to O.P. Jindal Global University"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <figcaption>
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-cap" />
                  </svg>
                  University visit, O.P. Jindal
                </figcaption>
              </figure>{" "}
              <figure
                className="polaroid"
                style={
                  { "--r": "-1deg", "--c": "#0E8C84" } as React.CSSProperties
                }
              >
                <div
                  className="ph ph-fit "
                  data-label="An activity session at NTPC"
                  style={{ "--c": "#0E8C84" } as React.CSSProperties}
                >
                  <img
                    className="ph-fill"
                    src="https://kashtieducare.com/images/gallery/ntpc-activity.jpeg"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    className="ph-img"
                    src="https://kashtieducare.com/images/gallery/ntpc-activity.jpeg"
                    alt="An activity session at NTPC"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <figcaption>
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-factory" />
                  </svg>
                  Industry activity at NTPC
                </figcaption>
              </figure>{" "}
              <figure
                className="polaroid"
                style={
                  { "--r": "2deg", "--c": "#3D8B33" } as React.CSSProperties
                }
              >
                <div
                  className="ph ph-fit "
                  data-label="Kashti group at the Sitabani buffer zone, Corbett National Park"
                  style={{ "--c": "#3D8B33" } as React.CSSProperties}
                >
                  <img
                    className="ph-fill"
                    src="https://kashtieducare.com/images/gallery/expedition-group-1.jpg"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    className="ph-img"
                    src="https://kashtieducare.com/images/gallery/expedition-group-1.jpg"
                    alt="Kashti group at the Sitabani buffer zone, Corbett National Park"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <figcaption>
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-mountain" />
                  </svg>
                  Corbett National Park
                </figcaption>
              </figure>{" "}
              <figure
                className="polaroid"
                style={
                  { "--r": "-1.5deg", "--c": "#6544CC" } as React.CSSProperties
                }
              >
                <div
                  className="ph ph-fit "
                  data-label="A programme session at IILM"
                  style={{ "--c": "#6544CC" } as React.CSSProperties}
                >
                  <img
                    className="ph-fill"
                    src="https://kashtieducare.com/images/gallery/iilm-session.jpeg"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    className="ph-img"
                    src="https://kashtieducare.com/images/gallery/iilm-session.jpeg"
                    alt="A programme session at IILM"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <figcaption>
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-users" />
                  </svg>
                  Programme session at IILM
                </figcaption>
              </figure>{" "}
              <figure
                className="polaroid"
                style={
                  { "--r": "1deg", "--c": "#1584C7" } as React.CSSProperties
                }
              >
                <div
                  className="ph ph-fit "
                  data-label="An expedition to Shimla"
                  style={{ "--c": "#1584C7" } as React.CSSProperties}
                >
                  <img
                    className="ph-fill"
                    src="https://kashtieducare.com/images/gallery/shimla-expedition.jpeg"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    className="ph-img"
                    src="https://kashtieducare.com/images/gallery/shimla-expedition.jpeg"
                    alt="An expedition to Shimla"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <figcaption>
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-route" />
                  </svg>
                  Expedition to Shimla
                </figcaption>
              </figure>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="section bg-sky-glow">
        {" "}
        <div className="container voices">
          {" "}
          <div>
            {" "}
            <p className="eyebrow">From the field</p>{" "}
            <h2 className="h2">
              <span className="t1">Real experiences.</span>
              <span className="t2">Real impact.</span>
            </h2>{" "}
            <figure className="quote-card" data-render="testimonial">
              {" "}
              <span className="qm" aria-hidden="true">
                “
              </span>{" "}
              <blockquote>
                The founders didn't just talk about failure. They walked us
                through the actual decision, live.
              </blockquote>{" "}
              <figcaption className="q-by">
                <b>Founder Learning Expeditions</b>
                <span>Pune cohort</span>
              </figcaption>{" "}
            </figure>{" "}
          </div>{" "}
          <div>
            <div
              className="panel partners-panel"
              style={
                {
                  marginTop: "0",
                  gridTemplateColumns: "minmax(0,1fr)",
                } as React.CSSProperties
              }
              data-partners=""
            >
              {" "}
              <div className="pp-intro">
                {" "}
                <h3 className="h3">Our engagements</h3>{" "}
                <span className="bar" aria-hidden="true" />{" "}
                <p>
                  Government bodies, universities and ecosystem partners who
                  have hosted, co-designed or supported Kashti experiences.
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
            </div>
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
                <span className="t1">See it</span>
                <span className="t2">for yourself.</span>
              </h2>{" "}
              <p>
                Explore the programme portfolio, or talk to us about what your
                learners need.
              </p>{" "}
              <div className="btn-row">
                {" "}
                <a className="btn btn-saffron" href="/programs">
                  {"Explore programs "}
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-arrow" />
                  </svg>
                </a>{" "}
                <a className="btn btn-ghost-light" href="/contact">
                  Talk to us
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
