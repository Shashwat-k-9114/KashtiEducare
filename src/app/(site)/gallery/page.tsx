import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Gallery | Kashti Educare" },
  description:
    "Photos from Kashti Educare programmes, institution visits and field expeditions.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Kashti Educare",
    title: "Gallery | Kashti Educare",
    description:
      "Photos from Kashti Educare programmes, institution visits and field expeditions.",
  },
};

export default function GalleryPage() {
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
              <span aria-current="page">Gallery</span>
            </nav>{" "}
            <p className="eyebrow">Gallery</p>{" "}
            <h1 className="display">
              <span className="t1">Moments</span>
              <span className="t2">from the field.</span>
            </h1>{" "}
            <p className="lede">
              A look at Kashti programmes, institution visits and expeditions as
              they actually happened.
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section
        className="section bg-white"
        style={{ paddingTop: "clamp(40px,5vw,64px)" } as React.CSSProperties}
      >
        {" "}
        <div className="container">
          {" "}
          <div
            className="gal-filters chips"
            role="group"
            aria-label="Filter photos"
            data-gal-filters=""
          />{" "}
          <div className="gal-grid" data-render="gallery" />{" "}
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
                <span className="t1">Your learners</span>
                <span className="t2">could be next.</span>
              </h2>{" "}
              <p>
                Tell us about your institution and goals, and we'll design an
                experience worth photographing.
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
      <div
        className="lightbox"
        data-lightbox=""
        role="dialog"
        aria-modal="true"
        aria-label="Photo viewer"
      >
        {" "}
        <button
          className="lb-btn lb-close"
          type="button"
          aria-label="Close"
          data-lb-close=""
        >
          <svg className="icon " aria-hidden="true">
            <use href="#i-x" />
          </svg>
        </button>{" "}
        <button
          className="lb-btn lb-prev"
          type="button"
          aria-label="Previous photo"
          data-lb-prev=""
        >
          <svg className="icon " aria-hidden="true">
            <use href="#i-chev-l" />
          </svg>
        </button>{" "}
        <div className="ph" data-lb-ph="" data-label="">
          <img alt="" data-lb-img="" />
        </div>{" "}
        <p data-lb-cap="" />{" "}
        <button
          className="lb-btn lb-next"
          type="button"
          aria-label="Next photo"
          data-lb-next=""
        >
          <svg className="icon " aria-hidden="true">
            <use href="#i-chev-r" />
          </svg>
        </button>{" "}
      </div>{" "}
    </>
  );
}
