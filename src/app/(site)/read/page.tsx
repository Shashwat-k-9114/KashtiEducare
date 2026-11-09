import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Read | Blogs, Newsletter and Magazine | Kashti Educare" },
  description:
    "Blogs, the Kashti newsletter and the Kashti magazine: stories, field notes and ideas on experiential learning.",
  alternates: { canonical: "/read" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Kashti Educare",
    title: "Read | Blogs, Newsletter and Magazine | Kashti Educare",
    description:
      "Blogs, the Kashti newsletter and the Kashti magazine: stories, field notes and ideas on experiential learning.",
  },
};

export default function ReadPage() {
  return (
    <>
      {" "}
      <section className="page-hero read-hero">
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
              <span aria-current="page">Read</span>
            </nav>{" "}
            <p className="eyebrow">Blogs · Newsletter · Magazine</p>{" "}
            <h1 className="display">
              <span className="t1">Stories, notes and</span>
              <span className="t2">ideas from the field.</span>
            </h1>{" "}
            <p className="lede">
              Field notes from expeditions, practical guides for schools and
              universities, and the thinking behind how Kashti designs learning.
            </p>{" "}
            <div className="btn-row">
              <a className="btn btn-primary" href="#blogs">
                {"Read the blog "}
                <svg className="icon " aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </a>
              <a className="btn btn-outline" href="#newsletter">
                Get the newsletter
              </a>
              <a className="btn btn-outline" href="#magazine">
                The magazine
              </a>
            </div>{" "}
          </div>{" "}
          <div className="rd-stage" aria-hidden="true">
            {" "}
            <div className="rd-card rd-blog">
              <div className="ph ph-fit " data-label="Students at ISRO">
                <img
                  className="ph-fill"
                  src="https://kashtieducare.comhttps://kashtieducare.com/images/gallery/isro-visit-1.jpeg"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                />
                <img
                  className="ph-img"
                  src="https://kashtieducare.comhttps://kashtieducare.com/images/gallery/isro-visit-1.jpeg"
                  alt="Students at ISRO"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span>Field notes</span>
            </div>{" "}
            <div className="rd-card rd-mag">
              <i>Issue 01</i>
              <b>Learning beyond boundaries</b>
              <em />
            </div>{" "}
            <div className="rd-card rd-mail">
              <span className="rd-plane">
                <svg className="icon " aria-hidden="true">
                  <use href="#i-plane" />
                </svg>
              </span>
              <b>Newsletter</b>
              <small>Openings, dates, resources</small>
            </div>{" "}
            <span className="rd-sun">
              <svg className="icon " aria-hidden="true">
                <use href="#i-sun" />
              </svg>
            </span>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="section bg-white" id="blogs">
        {" "}
        <div className="container">
          {" "}
          <div className="section-head split">
            {" "}
            <div>
              {" "}
              <p className="eyebrow">Blogs</p>{" "}
              <h2 className="h2">
                <span className="t1">Notes from the</span>
                <span className="t2">field.</span>
              </h2>{" "}
              <p className="lede">
                Short, practical reads from our expeditions, classrooms and
                councils.
              </p>{" "}
            </div>{" "}
            <a className="link-arrow" href="/contact?intent=write-for-us">
              {"Write for us "}
              <svg className="icon " aria-hidden="true">
                <use href="#i-arrow" />
              </svg>
            </a>{" "}
          </div>{" "}
          <div className="bl" data-render="blogs" />{" "}
        </div>{" "}
      </section>{" "}
      <section className="section nl-section" id="newsletter">
        {" "}
        <div className="nl-sky" aria-hidden="true">
          <i className="nl-dots" />
          <span className="nl-fly">
            <svg className="icon " aria-hidden="true">
              <use href="#i-plane" />
            </svg>
          </span>
          <span className="nl-moon" />
        </div>{" "}
        <div className="container nl-grid">
          {" "}
          <div>
            {" "}
            <p className="eyebrow on-dark">Newsletter</p>{" "}
            <h2 className="h2">
              <span className="t1">Learning beyond</span>
              <span className="t2">your inbox.</span>
            </h2>{" "}
            <p className="lede">
              A short note when there is something worth sharing. No spam, and
              you can leave any time.
            </p>{" "}
            <ul className="nl-points" data-render="nl-points" />{" "}
          </div>{" "}
          <form className="postcard" data-subscribe="" noValidate>
            {" "}
            <span className="stamp" aria-hidden="true">
              <svg className="icon " aria-hidden="true">
                <use href="#i-sun" />
              </svg>
            </span>{" "}
            <p className="pc-kicker">Kashti Educare · by air mail</p>{" "}
            <h3 className="pc-title">Put me on the list</h3>{" "}
            <label className="field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                placeholder="you@school.edu"
                autoComplete="email"
                required
              />
            </label>{" "}
            <label className="field">
              <span>I am a</span>
              <select name="role" data-render="nl-roles" />
            </label>{" "}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hp"
            />{" "}
            <button className="btn btn-saffron" type="submit">
              {"Subscribe "}
              <svg className="icon " aria-hidden="true">
                <use href="#i-plane" />
              </svg>
            </button>{" "}
            <p
              className="form-status"
              role="status"
              aria-live="polite"
              data-sub-status=""
            />{" "}
          </form>{" "}
        </div>{" "}
      </section>{" "}
      <section className="section bg-sky-glow mag-section" id="magazine">
        {" "}
        <div className="container">
          {" "}
          <div className="section-head split">
            {" "}
            <div>
              {" "}
              <p className="eyebrow">Magazine</p>{" "}
              <h2 className="h2">
                <span className="t1">The Kashti</span>
                <span className="t2">magazine.</span>
              </h2>{" "}
              <p className="lede">
                Flip through Issue 01: our model, the eight pathways, a week on
                tour and the latest from the field.
              </p>{" "}
            </div>{" "}
          </div>{" "}
          <div
            className="fb"
            data-render="mag-book"
            tabIndex={0}
            aria-label="Kashti magazine flipbook"
          />{" "}
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
                <span className="t1">Have a story</span>
                <span className="t2">worth telling?</span>
              </h2>{" "}
              <p>
                Educators, students and partners: share an experience, a lesson
                or a photo essay for the blog and the magazine.
              </p>{" "}
              <div className="btn-row">
                {" "}
                <a
                  className="btn btn-saffron"
                  href="/contact?intent=write-for-us"
                >
                  {"Write for us "}
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
