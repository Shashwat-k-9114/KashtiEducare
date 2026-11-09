import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Contact | Kashti Educare" },
  description:
    "Share your institution's details and goals, and Kashti Educare will reply with a customised experiential-learning proposal.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Kashti Educare",
    title: "Contact | Kashti Educare",
    description:
      "Share your institution's details and goals, and Kashti Educare will reply with a customised experiential-learning proposal.",
  },
};

export default function ContactPage() {
  return (
    <>
      {" "}
      <section
        className="section bg-sky-glow"
        style={{ paddingTop: "clamp(40px,6vw,80px)" } as React.CSSProperties}
      >
        {" "}
        <div className="container contact-grid">
          {" "}
          <div className="contact-copy">
            {" "}
            <div>
              {" "}
              <nav className="crumbs" aria-label="Breadcrumb">
                <a href="/">Home</a>
                <svg className="icon " aria-hidden="true">
                  <use href="#i-chev-r" />
                </svg>
                <span aria-current="page">Contact</span>
              </nav>{" "}
              <p className="eyebrow">Let's build together</p>{" "}
              <h1 className="display">
                <span className="t1">Let's design</span>
                <span className="t2">your experience.</span>
              </h1>{" "}
              <p
                className="lede"
                style={{ marginTop: "20px" } as React.CSSProperties}
              >
                Tell us about your institution, your learners and your goals.
                Our team will reply with a tailored proposal: the right
                programmes, partners and experts.
              </p>{" "}
            </div>{" "}
            <div>
              {" "}
              <ul className="feature-row">
                {" "}
                <li>
                  <span
                    className="ic"
                    style={{ "--c": "#0F3E9E" } as React.CSSProperties}
                  >
                    <svg className="icon " aria-hidden="true">
                      <use href="#i-calendar" />
                    </svg>
                  </span>
                  <span className="f-label">
                    Customised for
                    <br />
                    your institution
                  </span>
                </li>{" "}
                <li>
                  <span
                    className="ic"
                    style={{ "--c": "#0E8F86" } as React.CSSProperties}
                  >
                    <svg className="icon " aria-hidden="true">
                      <use href="#i-users" />
                    </svg>
                  </span>
                  <span className="f-label">
                    Wide network of experts
                    <br />
                    {"& institutions"}
                  </span>
                </li>{" "}
                <li>
                  <span
                    className="ic"
                    style={{ "--c": "#C98A00" } as React.CSSProperties}
                  >
                    <svg className="icon " aria-hidden="true">
                      <use href="#i-layers" />
                    </svg>
                  </span>
                  <span className="f-label">
                    Flexible formats
                    <br />
                    and delivery
                  </span>
                </li>{" "}
                <li>
                  <span
                    className="ic"
                    style={{ "--c": "#1584C7" } as React.CSSProperties}
                  >
                    <svg className="icon " aria-hidden="true">
                      <use href="#i-bars" />
                    </svg>
                  </span>
                  <span className="f-label">
                    End-to-end planning
                    <br />
                    and delivery
                  </span>
                </li>{" "}
              </ul>{" "}
              <p className="script contact-note">
                Experiences today.<span>Greater leaders tomorrow.</span>
              </p>{" "}
            </div>{" "}
          </div>{" "}
          <div className="panel form-card">
            {" "}
            <h2 className="h3">Start your partnership</h2>{" "}
            <p>
              Share a few details and our team will get in touch with a
              customised recommendation.
            </p>{" "}
            <div className="intent-banner" data-intent-banner="" hidden>
              <svg className="icon " aria-hidden="true">
                <use href="#i-info" />
              </svg>
              <span />
            </div>{" "}
            <form data-contact="" noValidate>
              {" "}
              <div className="form-grid">
                {" "}
                <label className="field full">
                  <span>
                    {"I'm reaching out as "}
                    <span className="req">*</span>
                  </span>{" "}
                  <select className="select" name="role" required>
                    {" "}
                    <option value="">Select one</option> <option>School</option>{" "}
                    <option>Higher Education Institution</option>{" "}
                    <option>{"Industry & Corporate Partner"}</option>{" "}
                    <option>{"Advisor & Institutional Partner"}</option>{" "}
                    <option>Other</option>{" "}
                  </select>{" "}
                  <span className="err">
                    Choose who you're reaching out as.
                  </span>{" "}
                </label>{" "}
                <label className="field">
                  <span>
                    {"Full name "}
                    <span className="req">*</span>
                  </span>
                  <input
                    className="input"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                  />
                  <span className="err">Enter your name.</span>
                </label>{" "}
                <label className="field">
                  <span>
                    {"Institution / Organisation "}
                    <span className="req">*</span>
                  </span>
                  <input
                    className="input"
                    name="org"
                    required
                    autoComplete="organization"
                    placeholder="School, college or company"
                  />
                  <span className="err">
                    Enter your institution or organisation.
                  </span>
                </label>{" "}
                <label className="field">
                  <span>
                    {"Email "}
                    <span className="req">*</span>
                  </span>
                  <input
                    className="input"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="you@institution.edu"
                  />
                  <span className="err">Enter a valid email address.</span>
                </label>{" "}
                <label className="field">
                  <span>
                    {"Phone "}
                    <span className="req">*</span>
                  </span>
                  <input
                    className="input"
                    type="tel"
                    name="phone"
                    required
                    autoComplete="tel"
                    placeholder="+91"
                    inputMode="tel"
                  />
                  <span className="err">
                    Enter a phone number with at least 10 digits.
                  </span>
                </label>{" "}
                <label className="field">
                  <span>Programme of interest</span>
                  <select
                    className="select"
                    name="programme"
                    data-prog-select=""
                  >
                    <option value="">Not sure yet</option>
                  </select>
                </label>{" "}
                <label className="field">
                  <span>Learners / grades</span>
                  <input
                    className="input"
                    name="learners"
                    placeholder="e.g. Grades 9–12, 120 students"
                  />
                </label>{" "}
                <label className="field full">
                  <span>Message</span>
                  <textarea
                    className="textarea"
                    name="message"
                    placeholder="Share your goals, preferred months or any specific requirements."
                  />
                </label>{" "}
                <label className="hp" aria-hidden="true">
                  {"Website "}
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>{" "}
                <label className="consent full">
                  <input type="checkbox" name="consent" required />{" "}
                  <span>
                    I agree to be contacted by Kashti Educare about this
                    enquiry.
                  </span>
                </label>{" "}
                <p
                  className="err full"
                  data-consent-err=""
                  style={
                    {
                      display: "none",
                      color: "#B3322E",
                      fontSize: ".8rem",
                      fontWeight: "600",
                    } as React.CSSProperties
                  }
                >
                  Tick the box so we can reply to you.
                </p>{" "}
              </div>{" "}
              <div
                className="form-actions"
                style={{ marginTop: "20px" } as React.CSSProperties}
              >
                {" "}
                <p className="small">
                  The quickest route to a customised proposal: your institution
                  details and preferred programmes.
                </p>{" "}
                <button className="btn btn-primary" type="submit">
                  {"Send message "}
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-arrow" />
                  </svg>
                </button>{" "}
              </div>{" "}
              <div
                className="form-status"
                role="status"
                data-form-status=""
              />{" "}
            </form>{" "}
          </div>{" "}
          <div className="contact-side">
            {" "}
            <div className="side-photo">
              {" "}
              <div
                className="ph ph-fit "
                data-label="Kashti at the School Leaders' Summit"
                style={{ "--c": "#0E8F86" } as React.CSSProperties}
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
              <div className="side-band">
                {" "}
                <div>
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-school" />
                  </svg>
                  <b>{"Schools & colleges"}</b>
                  <span>we partner with</span>
                </div>{" "}
                <div>
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-factory" />
                  </svg>
                  <b>Industries</b>
                  <span>we collaborate with</span>
                </div>{" "}
                <div>
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-users" />
                  </svg>
                  <b>Experts</b>
                  <span>who co-create learning</span>
                </div>{" "}
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
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="section bg-white">
        {" "}
        <div className="container">
          {" "}
          <div className="section-head">
            {" "}
            <p className="eyebrow">Before you write</p>{" "}
            <h2 className="h2">
              <span className="t1">Frequently asked</span>
              <span className="t2">questions.</span>
            </h2>{" "}
          </div>{" "}
          <div className="faq" data-render="faq" />{" "}
        </div>{" "}
      </section>{" "}
    </>
  );
}
