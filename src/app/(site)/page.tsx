import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Kashti Educare | Experiential learning for schools & colleges",
  },
  description:
    "Kashti Educare prepares learners for the world beyond the classroom with NEP 2020-aligned STEM tours, industry exposure, leadership camps and global immersion programmes for schools and higher education in India.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Kashti Educare",
    title: "Kashti Educare | Experiential learning for schools & colleges",
    description:
      "Kashti Educare prepares learners for the world beyond the classroom with NEP 2020-aligned STEM tours, industry exposure, leadership camps and global immersion programmes for schools and higher education in India.",
  },
};

export default function IndexPage() {
  return (
    <>
      {" "}
      <section
        className="hero hero-cine is-intro"
        data-stage=""
        aria-label="Kashti Educare: a year of real-world learning"
      >
        {" "}
        <div className="stage-bg" aria-hidden="true">
          {" "}
          <div className="st-sky" />{" "}
          <div className="st-clouds">
            <i />
            <i />
            <i />
          </div>{" "}
          <svg
            className="land land-far"
            viewBox="0 0 1440 360"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className="l-far"
              d="M0 196 92 120l70 46 120-104 96 82 70-44 120 96 104-70 92 54 126-118 108 92 92-52 150 104 100-56V360H0Z"
            />
            <path
              className="l-cap"
              d="M282 62l-30 28 14-4 16 12 14-12 18 6zM838 106l-28 26 14-2 14 10 14-8 16 4zM1094 30l-30 30 16-6 14 12 14-10 18 4z"
            />
          </svg>{" "}
          <svg
            className="land land-mid"
            viewBox="0 0 1440 360"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className="l-mid"
              d="M0 250 120 206l110 30 140-62 120 54 110-30 150 50 120-40 140 34 130-58 150 44 150-26V360H0Z"
            />
          </svg>{" "}
          <svg
            className="land land-near"
            viewBox="0 0 1440 360"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className="l-near"
              d="M0 300 160 268l140 18 170-30 160 22 190-26 170 24 150-20 300 26V360H0Z"
            />
            <g className="l-trees">
              <path d="M64 300l14-42 14 42zM90 304l10-30 10 30zM1310 296l14-44 14 44zM1336 300l10-30 10 30zM612 292l10-30 10 30z" />
            </g>
          </svg>{" "}
          <canvas className="st-fx" />{" "}
          <p className="st-ghost">
            <span data-ghost-a="">2026–27</span>
            <span data-ghost-b="" />
          </p>{" "}
          <div className="st-scrim" /> <div className="st-grain" />{" "}
        </div>{" "}
        <div className="container hero-grid">
          {" "}
          <div className="hero-copy">
            {" "}
            <p className="eyebrow on-dark">
              Real world · Real learning · Real impact
            </p>{" "}
            <h1 className="display">
              <span className="t1">We help institutions make</span>
              <span className="t2">curriculum enrichment</span>
              <span className="t1">calendar</span>
            </h1>{" "}
            <div className="btn-row">
              {" "}
              <a
                className="btn btn-saffron"
                href="/contact?intent=design-experience"
              >
                {"Design your experience "}
                <svg className="icon " aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </a>{" "}
              <a className="btn btn-glass" href="/programs">
                {"Explore programs "}
                <svg className="icon " aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </a>{" "}
            </div>{" "}
            <ul className="hero-proof">
              {" "}
              <li>
                <svg className="icon " aria-hidden="true">
                  <use href="#i-check" />
                </svg>
                NEP 2020 aligned
              </li>{" "}
              <li>
                <svg className="icon " aria-hidden="true">
                  <use href="#i-school" />
                </svg>
                {"Schools & higher education"}
              </li>{" "}
              <li>
                <svg className="icon " aria-hidden="true">
                  <use href="#i-handshake" />
                </svg>
                {"Industry & academia connect"}
              </li>{" "}
              <li>
                <svg className="icon " aria-hidden="true">
                  <use href="#i-globe" />
                </svg>
                Global immersion
              </li>{" "}
            </ul>{" "}
          </div>{" "}
          <div className="cal-stage" data-calendar="">
            {" "}
            <div className="st-corona" aria-hidden="true" />{" "}
            <div className="st-rays" aria-hidden="true" />{" "}
            <div className="halo" aria-hidden="true">
              {" "}
              <svg
                className="halo-layer halo-static"
                viewBox="-380 -380 760 760"
              >
                <defs>
                  <radialGradient id="hGlow">
                    <stop offset="0" stopColor="#FFE7A8" stopOpacity=".0" />
                    <stop offset=".62" stopColor="#FFE7A8" stopOpacity=".0" />
                    <stop offset=".8" stopColor="#FFD27A" stopOpacity=".22" />
                    <stop offset="1" stopColor="#FFD27A" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle r="372" fill="url(#hGlow)" />
                <circle r="356" className="h-ring faint" />
                <circle r="296" className="h-ring" />
                <circle r="286" className="h-ring dots" />
                <circle r="250" className="h-ring faint" />
              </svg>{" "}
              <svg className="halo-layer h-dial" viewBox="-380 -380 760 760">
                <line
                  transform="rotate(5)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(10)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(15)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(20)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(25)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(35)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(40)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(45)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(50)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(55)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(65)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(70)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(75)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(80)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(85)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(95)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(100)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(105)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(110)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(115)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(125)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(130)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(135)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(140)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(145)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(155)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(160)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(165)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(170)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(175)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(185)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(190)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(195)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(200)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(205)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(215)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(220)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(225)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(230)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(235)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(245)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(250)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(255)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(260)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(265)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(275)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(280)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(285)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(290)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(295)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(305)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(310)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(315)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(320)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(325)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(335)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(340)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(345)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(350)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <line
                  transform="rotate(355)"
                  x1="0"
                  y1="-312"
                  x2="0"
                  y2="-304"
                  className="h-minor"
                />
                <g transform="rotate(0)">
                  <line
                    x1="0"
                    y1="-318"
                    x2="0"
                    y2="-300"
                    className="h-tick"
                    data-h="0"
                  />
                  <text y="-330" className="h-lbl" data-h="0">
                    APR
                  </text>
                </g>
                <g transform="rotate(30)">
                  <line
                    x1="0"
                    y1="-318"
                    x2="0"
                    y2="-300"
                    className="h-tick"
                    data-h="1"
                  />
                  <text y="-330" className="h-lbl" data-h="1">
                    MAY
                  </text>
                </g>
                <g transform="rotate(60)">
                  <line
                    x1="0"
                    y1="-318"
                    x2="0"
                    y2="-300"
                    className="h-tick"
                    data-h="2"
                  />
                  <text y="-330" className="h-lbl" data-h="2">
                    JUN
                  </text>
                </g>
                <g transform="rotate(90)">
                  <line
                    x1="0"
                    y1="-318"
                    x2="0"
                    y2="-300"
                    className="h-tick"
                    data-h="3"
                  />
                  <text y="-330" className="h-lbl" data-h="3">
                    JUL
                  </text>
                </g>
                <g transform="rotate(120)">
                  <line
                    x1="0"
                    y1="-318"
                    x2="0"
                    y2="-300"
                    className="h-tick"
                    data-h="4"
                  />
                  <text y="-330" className="h-lbl" data-h="4">
                    AUG
                  </text>
                </g>
                <g transform="rotate(150)">
                  <line
                    x1="0"
                    y1="-318"
                    x2="0"
                    y2="-300"
                    className="h-tick"
                    data-h="5"
                  />
                  <text y="-330" className="h-lbl" data-h="5">
                    SEP
                  </text>
                </g>
                <g transform="rotate(180)">
                  <line
                    x1="0"
                    y1="-318"
                    x2="0"
                    y2="-300"
                    className="h-tick"
                    data-h="6"
                  />
                  <text y="-330" className="h-lbl" data-h="6">
                    OCT
                  </text>
                </g>
                <g transform="rotate(210)">
                  <line
                    x1="0"
                    y1="-318"
                    x2="0"
                    y2="-300"
                    className="h-tick"
                    data-h="7"
                  />
                  <text y="-330" className="h-lbl" data-h="7">
                    NOV
                  </text>
                </g>
                <g transform="rotate(240)">
                  <line
                    x1="0"
                    y1="-318"
                    x2="0"
                    y2="-300"
                    className="h-tick"
                    data-h="8"
                  />
                  <text y="-330" className="h-lbl" data-h="8">
                    DEC
                  </text>
                </g>
                <g transform="rotate(270)">
                  <line
                    x1="0"
                    y1="-318"
                    x2="0"
                    y2="-300"
                    className="h-tick"
                    data-h="9"
                  />
                  <text y="-330" className="h-lbl" data-h="9">
                    JAN
                  </text>
                </g>
                <g transform="rotate(300)">
                  <line
                    x1="0"
                    y1="-318"
                    x2="0"
                    y2="-300"
                    className="h-tick"
                    data-h="10"
                  />
                  <text y="-330" className="h-lbl" data-h="10">
                    FEB
                  </text>
                </g>
                <g transform="rotate(330)">
                  <line
                    x1="0"
                    y1="-318"
                    x2="0"
                    y2="-300"
                    className="h-tick"
                    data-h="11"
                  />
                  <text y="-330" className="h-lbl" data-h="11">
                    MAR
                  </text>
                </g>
              </svg>{" "}
              <svg className="halo-layer h-spin" viewBox="-380 -380 760 760">
                <circle r="340" className="h-ring dash" />
              </svg>{" "}
            </div>{" "}
            <svg className="motifs" viewBox="0 0 260 300" aria-hidden="true">
              <g className="motif" data-motif="tents">
                <path d="M0 300c50-34 160-46 260-24v24z" />
                <path d="M24 286l42-66 42 66z" />
                <path d="M122 280l34-52 34 52z" />
                <path d="M212 282l14-44 14 44z" />
                <path d="M232 288l10-30 10 30z" />
                <path
                  className="m-glow"
                  d="M60 286l6-14 6 14z"
                  fill="#FFC46B"
                />
              </g>
              <g className="motif" data-motif="temple">
                <path d="M130 52c10 30 46 58 46 112v18h22v118H62V182h22v-18c0-54 36-82 46-112z" />
                <path d="M130 52V24" strokeWidth="3" className="m-line" />
                <path
                  className="m-flag"
                  d="M131 24l26 8-26 8z"
                  fill="#FF9933"
                />
                <path d="M20 300v-56l20-22 20 22v56zM200 300v-56l20-22 20 22v56z" />
                <path d="M40 300h180v-10H40z" />
              </g>
              <g className="motif" data-motif="tower">
                <path d="M50 300l22-150h44l22 150h-12l-15-112h-34L62 300z" />
                <path d="M60 150h68v-36H60z" />
                <path d="M52 114l42-22 42 22z" />
                <rect x="196" y="70" width="5" height="230" />
                <path
                  className="m-flag wave"
                  d="M201 72c14-7 28 7 44 0v28c-16 7-30-7-44 0z"
                  fill="#F4B321"
                />
              </g>
              <g className="motif" data-motif="gears">
                <path d="M154.0 228.0L167.6 235.0L165.2 247.2L150.0 248.5L145.4 257.2L153.1 270.4L144.5 279.4L131.0 272.2L122.4 277.1L121.8 292.4L109.7 295.3L102.2 282.0L92.3 281.5L83.5 294.0L71.8 289.9L72.6 274.6L64.6 268.8L50.4 274.5L42.8 264.8L51.8 252.4L48.2 243.2L33.1 240.4L32.0 228.0L46.3 222.5L48.2 212.8L37.1 202.2L42.8 191.2L57.8 194.3L64.6 187.2L61.0 172.3L71.8 166.1L82.7 176.8L92.3 174.5L97.3 160.1L109.7 160.7L113.1 175.6L122.4 178.9L134.4 169.4L144.5 176.6L139.4 191.0L145.4 198.8L160.7 197.3L165.2 208.8L153.1 218.2Z" />
                <circle cx="100" cy="228" r="20" className="m-cut" />
                <path d="M220.0 262.0L229.6 267.6L227.0 277.3L215.8 277.3L211.2 283.2L214.0 294.0L205.3 299.0L197.5 291.1L190.0 292.0L184.4 301.6L174.7 299.0L174.7 287.8L168.8 283.2L158.0 286.0L153.0 277.3L160.9 269.5L160.0 262.0L150.4 256.4L153.0 246.7L164.2 246.7L168.8 240.8L166.0 230.0L174.7 225.0L182.5 232.9L190.0 232.0L195.6 222.4L205.3 225.0L205.3 236.2L211.2 240.8L222.0 238.0L227.0 246.7L219.1 254.5Z" />
                <circle cx="190" cy="262" r="10" className="m-cut" />
                <path d="M0 300h260v-8H0z" />
              </g>
              <g className="motif" data-motif="factory">
                <path d="M10 300V172l52 32v-32l52 32v-32l52 32V110h22V60h18v50h20v190z" />
                <g className="m-smoke">
                  <circle cx="206" cy="44" r="10" />
                  <circle cx="218" cy="24" r="13" />
                  <circle cx="236" cy="6" r="15" />
                </g>
                <path
                  className="m-glow"
                  d="M30 230h16v14H30zM82 230h16v14H82zM134 230h16v14h-16z"
                  fill="#FFC46B"
                />
              </g>
              <g className="motif" data-motif="campus">
                <path d="M20 300v-70h220v70z" />
                <path d="M10 232l120-50 120 50z" />
                <path d="M88 184a42 42 0 0 1 84 0z" />
                <rect x="126" y="122" width="8" height="24" />
                <path d="M130 122V98" className="m-line" strokeWidth="2.5" />
                <path
                  className="m-flag wave"
                  d="M131 98l22 7-22 7z"
                  fill="#F4B321"
                />
                <path
                  className="m-cut-soft"
                  d="M44 300v-56h12v56zM80 300v-56h12v56zM116 300v-56h12v56zM152 300v-56h12v56zM188 300v-56h12v56z"
                />
              </g>
              <g className="motif" data-motif="rocket">
                <path d="M34 300V70h4v230zM58 300V70h4v230z" />
                <path
                  className="m-line"
                  d="M36 90l24 20M60 90l-24 20M36 130l24 20M60 130l-24 20M36 170l24 20M60 170l-24 20M36 210l24 20M60 210l-24 20M36 250l24 20M60 250l-24 20"
                  strokeWidth="3"
                />
                <rect x="60" y="124" width="40" height="6" />
                <path d="M128 34c16 20 20 44 20 76v152h-40V110c0-32 4-56 20-76z" />
                <path d="M108 222l-18 44h18zM148 222l18 44h-18z" />
                <circle cx="128" cy="96" r="7" className="m-cut-soft" />
                <path
                  className="m-flame"
                  d="M112 264c4 18 10 28 16 36 6-8 12-18 16-36z"
                  fill="#FFB347"
                />
                <path d="M14 300h160v-10H14z" />
              </g>
              <g className="motif" data-motif="campfire">
                <path d="M0 300c60-36 170-44 260-22v22z" />
                <path d="M30 284l34-54 34 54z" />
                <path d="M178 280l28-44 28 44z" />
                <circle
                  className="m-glow pulse"
                  cx="130"
                  cy="272"
                  r="40"
                  fill="#FFB347"
                  opacity=".35"
                />
                <path
                  d="M104 292l52-14M104 278l52 14"
                  className="m-line"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                <path
                  className="m-flame"
                  d="M130 280c-18-16-8-36 6-52 0 14 12 18 14 8 12 14 14 30 0 44z"
                  fill="#FFB347"
                />
                <path
                  className="m-flame"
                  d="M130 280c-8-8-4-20 4-28 0 8 6 10 8 4 6 8 6 16-2 24z"
                  fill="#FFE29A"
                />
              </g>
              <g className="motif" data-motif="pagoda">
                <path d="M84 300v-48h92v48z" />
                <path d="M58 252l72-26 72 26z" />
                <path d="M92 226v-26h76v26z" />
                <path d="M68 200l62-22 62 22z" />
                <path d="M100 178v-22h60v22z" />
                <path d="M80 156l50-20 50 20z" />
                <rect x="127" y="104" width="6" height="34" />
                <path
                  className="m-snow"
                  d="M58 252l72-26 72 26-14 0-58-18-58 18zM68 200l62-22 62 22-12 0-50-16-50 16zM80 156l50-20 50 20-10 0-40-14-40 14z"
                  fill="#EEF4FF"
                />
                <g className="m-plane">
                  <path d="M196 48l40-12-8 8 14 4-14 4 8 8z" />
                  <path
                    d="M110 70c30-6 58-14 86-22"
                    className="m-line dash"
                    strokeWidth="2"
                    fill="none"
                  />
                </g>
              </g>
              <g className="motif" data-motif="tricolour">
                <rect x="120" y="54" width="5" height="246" />
                <g className="wave">
                  <path
                    d="M125 56c18-6 36 6 56 0v14c-20 6-38-6-56 0z"
                    fill="#FF9933"
                  />
                  <path
                    d="M125 70c18-6 36 6 56 0v14c-20 6-38-6-56 0z"
                    fill="#FFFFFF"
                  />
                  <path
                    d="M125 84c18-6 36 6 56 0v14c-20 6-38-6-56 0z"
                    fill="#138808"
                  />
                  <circle cx="153" cy="77" r="4" fill="#0B3A8F" />
                </g>
                <path d="M20 300v-62h48v62z" />
                <path d="M14 240l30-18 30 18z" />
                <path d="M0 300h260v-6H0zM150 300v-40h4v40zM190 300v-40h4v40zM230 300v-40h4v40z" />
                <path
                  className="m-line"
                  d="M150 270h84M150 284h84"
                  strokeWidth="2"
                />
              </g>
              <g className="motif" data-motif="summit">
                <path d="M0 300l90-170 34 44 46-96 90 222z" />
                <path
                  className="m-snow"
                  d="M170 78l-22 46 10-4 12 10 12-10 10 6z"
                  fill="#F4F8FF"
                />
                <path d="M170 78V46" className="m-line" strokeWidth="3" />
                <path
                  className="m-flag wave"
                  d="M171 46l26 9-26 9z"
                  fill="#F4B321"
                />
                <g className="m-people">
                  <circle cx="58" cy="226" r="5" />
                  <path d="M53 234h10l3 24h-5l-3-12-3 12h-5z" />
                  <circle cx="80" cy="212" r="5" />
                  <path d="M75 220h10l3 24h-5l-3-12-3 12h-5z" />
                </g>
              </g>
              <g className="motif" data-motif="skyline">
                <path d="M0 300V200h34v-40h30v140zM70 300V120h40v180zM116 300V160h30v-30h26v170zM178 300V90h36v210zM220 300V180h40v120z" />
                <path
                  className="m-glow lit"
                  d="M80 140h8v8h-8zM94 160h8v8h-8zM80 200h8v8h-8zM94 230h8v8h-8zM188 110h8v8h-8zM202 140h8v8h-8zM188 180h8v8h-8zM202 220h8v8h-8zM126 180h8v8h-8zM154 200h8v8h-8zM10 220h8v8h-8zM40 180h8v8h-8z"
                  fill="#FFD27A"
                />
              </g>
            </svg>{" "}
            <div className="cal-wrap">
              {" "}
              <div className="cal-back cal-back-1" aria-hidden="true" />{" "}
              <div className="cal-back cal-back-2" aria-hidden="true" />{" "}
              <article
                className="cal"
                aria-label="A sample school year, April 2026 to March 2027"
              >
                {" "}
                <span className="cal-hanger" aria-hidden="true" />{" "}
                <div className="cal-rings" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>{" "}
                <div className="cal-page" aria-live="polite">
                  {" "}
                  <div className="cov-top">
                    {" "}
                    <a
                      className="brand"
                      href="/"
                      aria-label="Kashti Educare home"
                    >
                      {" "}
                      <img
                        className="brand-img"
                        src="https://kashtieducare.com/logo.png"
                        alt="Kashti Educare"
                        width="150"
                        height="56"
                        decoding="async"
                      />{" "}
                      <span className="brand-word" aria-hidden="true">
                        <span className="b-k">
                          KASHTI
                          <svg
                            className="pin"
                            viewBox="0 0 24 30"
                            aria-hidden="true"
                          >
                            <path
                              d="M12 0C5.4 0 0 5.2 0 11.7 0 20.5 12 30 12 30s12-9.5 12-18.3C24 5.2 18.6 0 12 0z"
                              fill="currentColor"
                            />
                            <circle cx="12" cy="11.5" r="4.4" fill="#fff" />
                          </svg>
                        </span>{" "}
                        <span className="b-e">educare</span>
                      </span>{" "}
                    </a>{" "}
                    <div className="cov-year">
                      <strong>2026–27</strong>
                      <span>A year of possibilities</span>
                    </div>{" "}
                  </div>{" "}
                  <p className="script cov-tag">Learning beyond boundaries</p>{" "}
                  <div className="glance" data-glance="" />{" "}
                  <div className="cov-foot">
                    {" "}
                    <span style={{ "--sc": "#0F3E9E" } as React.CSSProperties}>
                      <b>12</b>months
                    </span>{" "}
                    <span style={{ "--sc": "#0E8F86" } as React.CSSProperties}>
                      <b>12</b>experiences
                    </span>{" "}
                    <span style={{ "--sc": "#C98A00" } as React.CSSProperties}>
                      <b>4</b>stages
                    </span>{" "}
                  </div>{" "}
                </div>{" "}
              </article>{" "}
              <div className="cal-stand" aria-hidden="true" />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="container">
          {" "}
          <div
            className="player"
            role="group"
            aria-label="Play the sample school year"
          >
            {" "}
            <div className="pl-controls">
              {" "}
              <button
                type="button"
                className="pl-btn"
                data-prev=""
                aria-label="Previous month"
              >
                <svg className="icon " aria-hidden="true">
                  <use href="#i-chev-l" />
                </svg>
              </button>{" "}
              <button
                type="button"
                className="pl-btn pl-play"
                data-tour=""
                aria-pressed="true"
              >
                <span className="pl-ic-pause">
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-pause" />
                  </svg>
                </span>
                <span className="pl-ic-play">
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-play" />
                  </svg>
                </span>
                <span className="sr-only" data-tour-label="">
                  Pause the tour
                </span>
              </button>{" "}
              <button
                type="button"
                className="pl-btn"
                data-next=""
                aria-label="Next month"
              >
                <svg className="icon " aria-hidden="true">
                  <use href="#i-chev-r" />
                </svg>
              </button>{" "}
            </div>{" "}
            <div className="pl-now" aria-live="polite">
              {" "}
              <span className="pl-count" data-pl-count="">
                Prologue
              </span>{" "}
              <b data-pl-title="">A year of possibilities</b>{" "}
              <span data-pl-sub="">
                12 months · 12 experiences · press play or pick a month
              </span>{" "}
            </div>{" "}
            <div className="pl-track">
              {" "}
              <div className="pl-quarters" aria-hidden="true">
                {" "}
                <span style={{ "--qc": "#18B3A2" } as React.CSSProperties}>
                  Orient<small>Apr–Jun</small>
                </span>{" "}
                <span style={{ "--qc": "#5B8DEF" } as React.CSSProperties}>
                  Immerse<small>Jul–Sep</small>
                </span>{" "}
                <span style={{ "--qc": "#9B7BF0" } as React.CSSProperties}>
                  Build<small>Oct–Dec</small>
                </span>{" "}
                <span style={{ "--qc": "#F4B321" } as React.CSSProperties}>
                  Transform<small>Jan–Mar</small>
                </span>{" "}
              </div>{" "}
              <div
                className="month-strip"
                role="group"
                aria-label="Pick a month of the sample year"
              />{" "}
              <div className="pl-progress" aria-hidden="true">
                <i data-pl-fill="" />
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section
        className="partner-strip"
        aria-label="Our engagements"
      >
        {" "}
        <div className="ps-inner">
          {" "}
          <p className="ps-label">
            Our engagements
          </p>{" "}
          <div className="ps-viewport">
            <div className="ps-track" data-render="partner-marquee" />
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="section bg-sky-glow" id="visionaries">
        {" "}
        <div className="container">
          {" "}
          <div className="network-grid">
            {" "}
            <div>
              {" "}
              <p className="eyebrow">{"Our people & partners"}</p>{" "}
              <h2 className="h2">
                <span className="t1">Led by</span>
                <span className="t2">the visionaries.</span>
              </h2>{" "}
              <p
                className="lede"
                style={{ marginTop: "20px" } as React.CSSProperties}
              >
                We work with industries, universities, government bodies,
                communities and startups that open their doors to learners, and
                with the experts who design and deliver every experience.
              </p>{" "}
            </div>{" "}
            <div>
              {" "}
              <ul
                className="feature-row"
                style={{ marginTop: "0" } as React.CSSProperties}
              >
                {" "}
                <li>
                  <span
                    className="ic"
                    style={{ "--c": "#0F3E9E" } as React.CSSProperties}
                  >
                    <svg className="icon " aria-hidden="true">
                      <use href="#i-factory" />
                    </svg>
                  </span>
                  <span className="f-label">
                    {"Industry &"}
                    <br />
                    corporates
                  </span>
                </li>{" "}
                <li>
                  <span
                    className="ic"
                    style={{ "--c": "#0E8F86" } as React.CSSProperties}
                  >
                    <svg className="icon " aria-hidden="true">
                      <use href="#i-cap" />
                    </svg>
                  </span>
                  <span className="f-label">
                    {"Universities &"}
                    <br />
                    research
                  </span>
                </li>{" "}
                <li>
                  <span
                    className="ic"
                    style={{ "--c": "#C98A00" } as React.CSSProperties}
                  >
                    <svg className="icon " aria-hidden="true">
                      <use href="#i-landmark" />
                    </svg>
                  </span>
                  <span className="f-label">
                    {"Government &"}
                    <br />
                    public bodies
                  </span>
                </li>{" "}
                <li>
                  <span
                    className="ic"
                    style={{ "--c": "#1584C7" } as React.CSSProperties}
                  >
                    <svg className="icon " aria-hidden="true">
                      <use href="#i-bulb" />
                    </svg>
                  </span>
                  <span className="f-label">
                    {"Startups &"}
                    <br />
                    communities
                  </span>
                </li>{" "}
              </ul>{" "}
              <div
                className="btn-row"
                style={{ marginTop: "30px" } as React.CSSProperties}
              >
                {" "}
                <a className="btn btn-primary" href="/people">
                  {"Meet the people "}
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-arrow" />
                  </svg>
                </a>{" "}
                <a className="btn btn-outline" href="/partners">
                  {"Explore our partner network "}
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-arrow" />
                  </svg>
                </a>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="visionaries" data-render="visionaries" />{" "}
        </div>{" "}
      </section>{" "}
      <section className="section bg-white" id="pathways">
        {" "}
        <div className="container">
          {" "}
          <div className="section-head split">
            {" "}
            <div>
              {" "}
              <p className="eyebrow">Our learning experiences</p>{" "}
              <h2 className="h2">
                <span className="t1">One partner.</span>
                <span className="t2">Eight learning pathways.</span>
              </h2>{" "}
            </div>{" "}
            <a className="link-arrow" href="/programs#catalogue">
              {"Browse all 53 programmes "}
              <svg className="icon " aria-hidden="true">
                <use href="#i-arrow" />
              </svg>
            </a>{" "}
          </div>{" "}
          <ol className="pathway-list" data-render="pathway-list" />{" "}
        </div>{" "}
      </section>{" "}
      <section className="section bg-white week-section" id="week" data-week="">
        {" "}
        <div className="container">
          {" "}
          <div className="section-head split">
            {" "}
            <div>
              {" "}
              <p className="eyebrow">A model experiential learning week</p>{" "}
              <h2 className="h2">
                <span className="t1">A week at</span>
                <span className="t2">Kashti Educare.</span>
              </h2>{" "}
              <ul
                className="wk-words"
                aria-label="Explore, experience, learn, lead"
              >
                {" "}
                <li style={{ "--c": "#0B2A66" } as React.CSSProperties}>
                  Explore
                </li>
                <li style={{ "--c": "#1584C7" } as React.CSSProperties}>
                  Experience
                </li>
                <li style={{ "--c": "#0E8F86" } as React.CSSProperties}>
                  Learn
                </li>
                <li style={{ "--c": "#F4B321" } as React.CSSProperties}>
                  Lead
                </li>{" "}
              </ul>{" "}
            </div>{" "}
            <div className="wk-ctrl">
              {" "}
              <button
                type="button"
                className="wk-play"
                data-wk-play=""
                aria-pressed="true"
              >
                <span className="pl-ic-pause">
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-pause" />
                  </svg>
                </span>
                <span className="pl-ic-play">
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-play" />
                  </svg>
                </span>
                <span data-wk-play-label="">Pause the week</span>
              </button>{" "}
              <p className="wk-now" aria-live="polite">
                <span>Now playing</span>
                <b data-wk-now="">Monday</b>
              </p>{" "}
            </div>{" "}
          </div>{" "}
          <div className="wk-rail" aria-hidden="true">
            {" "}
            <span className="wk-rail-line">
              <i data-wk-fill="" />
            </span>{" "}
            <span className="wk-sun" data-wk-sun="">
              <svg className="icon " aria-hidden="true">
                <use href="#i-sun" />
              </svg>
            </span>{" "}
          </div>{" "}
          <div
            className="wk-tabs"
            role="tablist"
            aria-label="Pick a day"
            data-wk-tabs=""
          />{" "}
          <ol className="week" data-render="week" />{" "}
          <div className="wk-notes">
            {" "}
            <p className="wk-notes-label">
              Program
              <br />
              notes
            </p>{" "}
            <ul data-render="week-notes" />{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="section bg-wash" id="formats">
        {" "}
        <div className="container">
          {" "}
          <div className="section-head split">
            {" "}
            <div>
              {" "}
              <p className="eyebrow">Program formats</p>{" "}
              <h2 className="h2">
                <span className="t1">Flexible by design,</span>
                <span className="t2">
                  from a single session to a year-long journey.
                </span>
              </h2>{" "}
            </div>{" "}
            <a className="link-arrow" href="/formats">
              {"Which format fits? "}
              <svg className="icon " aria-hidden="true">
                <use href="#i-arrow" />
              </svg>
            </a>{" "}
          </div>{" "}
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
          </div>{" "}
          <div className="panel journey-strip">
            {" "}
            <div className="js-intro">
              {" "}
              <h3 className="h3">
                Customise a learning journey for your institution
              </h3>{" "}
              <p>
                Every institution is different. We design a mix of experiences
                around your academic calendar, learner levels and goals.
              </p>{" "}
              <a
                className="btn btn-primary"
                href="/contact?intent=design-experience"
              >
                {"Design an experience "}
                <svg className="icon " aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </a>{" "}
            </div>{" "}
            <ul className="js-feats">
              {" "}
              <li className="js-feat">
                <span
                  className="ic ic-sm"
                  style={{ "--c": "#0F3E9E" } as React.CSSProperties}
                >
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-calendar" />
                  </svg>
                </span>
                <div>
                  <b>Flexible formats</b>
                  <span>90 minutes to a full academic year</span>
                </div>
              </li>{" "}
              <li className="js-feat">
                <span
                  className="ic ic-sm"
                  style={{ "--c": "#0E8F86" } as React.CSSProperties}
                >
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-users" />
                  </svg>
                </span>
                <div>
                  <b>For every learner</b>
                  <span>{"School students, UG & PG, faculty and alumni"}</span>
                </div>
              </li>{" "}
              <li className="js-feat">
                <span
                  className="ic ic-sm"
                  style={{ "--c": "#C98A00" } as React.CSSProperties}
                >
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-target" />
                  </svg>
                </span>
                <div>
                  <b>Aligned to your goals</b>
                  <span>Curriculum, NEP 2020 and career readiness</span>
                </div>
              </li>{" "}
              <li className="js-feat">
                <span
                  className="ic ic-sm"
                  style={{ "--c": "#1584C7" } as React.CSSProperties}
                >
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-shield" />
                  </svg>
                </span>
                <div>
                  <b>Planned end to end</b>
                  <span>Design, safety policy and on-ground delivery</span>
                </div>
              </li>{" "}
            </ul>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="section bg-sky-glow" id="planner">
        {" "}
        <div className="container">
          {" "}
          <div className="section-head center">
            {" "}
            <p className="eyebrow">Plan your year</p>{" "}
            <h2 className="h2">
              <span className="t1">Design your custom</span>
              <span className="t2">academic calendar in 3 steps.</span>
            </h2>{" "}
            <p className="lede">
              Pick your learners, focus areas and pace. The preview builds
              itself from our programme catalogue. Send it to us and a programme
              manager turns it into a proposal.
            </p>{" "}
          </div>{" "}
          <div className="panel planner" data-planner="">
            {" "}
            <form className="planner-form" noValidate>
              {" "}
              <div className="p-step">
                {" "}
                <span className="p-no">1</span>{" "}
                <h3>{"Your institution & learners"}</h3>{" "}
                <div className="p-body">
                  {" "}
                  <div
                    className="seg"
                    role="group"
                    aria-label="Institution type"
                    data-p-aud=""
                  >
                    {" "}
                    <button type="button" aria-pressed="true" data-v="school">
                      School
                    </button>{" "}
                    <button type="button" aria-pressed="false" data-v="he">
                      Higher education
                    </button>{" "}
                  </div>{" "}
                  <div className="p-row">
                    {" "}
                    <label className="field">
                      <span>Institution name</span>
                      <input
                        className="input"
                        name="inst"
                        placeholder="e.g. Heritage Valley World School"
                        autoComplete="organization"
                      />
                    </label>{" "}
                    <label className="field">
                      <span>City</span>
                      <input
                        className="input"
                        name="city"
                        placeholder="e.g. Gurugram"
                        autoComplete="address-level2"
                      />
                    </label>{" "}
                  </div>{" "}
                  <div className="field">
                    <span className="field-label">Learners</span>
                    <div className="chips" data-p-levels="" />
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              <div className="p-step">
                {" "}
                <span className="p-no">2</span> <h3>Focus areas</h3>{" "}
                <div className="p-body">
                  {" "}
                  <div className="ms" data-p-themes="">
                    {" "}
                    <button
                      type="button"
                      className="select ms-btn"
                      aria-haspopup="true"
                      aria-expanded="false"
                      data-ms-btn=""
                    >
                      All focus areas (a balanced mix)
                    </button>{" "}
                    <div
                      className="ms-pop"
                      role="group"
                      aria-label="Focus areas"
                      data-ms-pop=""
                      hidden
                    />{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              <div className="p-step">
                {" "}
                <span className="p-no">3</span> <h3>Preferred pace</h3>{" "}
                <div className="p-body">
                  {" "}
                  <div className="pace" data-p-pace="">
                    {" "}
                    <button type="button" aria-pressed="false" data-v="3">
                      <b>Once a term</b>
                      <span>3 experiences across the year</span>
                    </button>{" "}
                    <button type="button" aria-pressed="true" data-v="6">
                      <b>Every other month</b>
                      <span>6 experiences across the year</span>
                    </button>{" "}
                    <button type="button" aria-pressed="false" data-v="12">
                      <b>Every month</b>
                      <span>12 experiences, one per month</span>
                    </button>{" "}
                  </div>{" "}
                  <label className="toggle">
                    <input type="checkbox" data-p-intl="" defaultChecked />
                    {" Include international programmes"}
                  </label>{" "}
                </div>{" "}
              </div>{" "}
            </form>{" "}
            <aside className="planner-preview" aria-label="Calendar preview">
              {" "}
              <div className="pv-card">
                {" "}
                <div className="pv-head">
                  {" "}
                  <span className="pv-live">
                    <i />
                    Live calendar preview
                  </span>{" "}
                  <h3 data-pv-title="">
                    Your 2026–27 experiential calendar
                  </h3>{" "}
                  <p data-pv-sub="">School · 6 experiences</p>{" "}
                </div>{" "}
                <ol
                  className="pv-list"
                  data-pv-list=""
                  tabIndex={0}
                  aria-label="Planned experiences"
                />{" "}
                <div className="pv-foot">
                  {" "}
                  <a
                    className="btn btn-primary"
                    href="/contact?intent=design-experience"
                    data-pv-send=""
                  >
                    {"Send this plan for a proposal "}
                    <svg className="icon " aria-hidden="true">
                      <use href="#i-arrow" />
                    </svg>
                  </a>{" "}
                  <p>
                    Indicative only. Dates, group sizes and inclusions are
                    confirmed with a programme manager.
                  </p>{" "}
                </div>{" "}
              </div>{" "}
            </aside>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="section sbb-section" id="model">
        {" "}
        <div className="container">
          {" "}
          <div className="sbb-head">
            {" "}
            <p className="eyebrow on-dark">The Kashti experience model</p>{" "}
            <h2 className="h2">
              <span className="t1">See. Build.</span>
              <span className="t2">Become.</span>
            </h2>{" "}
            <p className="lede">
              From exposure to capability to clarity: a journey that transforms.
            </p>{" "}
          </div>{" "}
          <ol className="sbb">
            {" "}
            <li
              className="sbb-step"
              style={{ "--c": "#0F3E9E" } as React.CSSProperties}
            >
              {" "}
              <div className="sbb-photo">
                <div
                  className="ph ph-fit "
                  data-label="Students watching a robotics demonstration in an industry lab"
                  style={{ "--c": "#0F3E9E" } as React.CSSProperties}
                >
                  <img
                    className="ph-fill"
                    src="/images/hero/step-see.jpg"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    className="ph-img"
                    src="/images/hero/step-see.jpg"
                    alt="Students watching a robotics demonstration in an industry lab"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span className="sbb-ic">
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-eye" />
                  </svg>
                </span>
              </div>{" "}
              <span className="sbb-no">Step 01 · Exposure</span> <h3>See</h3>{" "}
              <p>
                Learners encounter real environments, industries, institutions,
                experts and ideas.
              </p>{" "}
              <p className="sbb-out">
                <b>Learner takeaway</b>Curiosity and context: what the world
                beyond the classroom actually looks like.
              </p>{" "}
            </li>{" "}
            <li
              className="sbb-step"
              style={{ "--c": "#0E8F86" } as React.CSSProperties}
            >
              {" "}
              <div className="sbb-photo">
                <div
                  className="ph ph-fit "
                  data-label="Indian and Japanese students building a robot together"
                  style={{ "--c": "#0E8F86" } as React.CSSProperties}
                >
                  <img
                    className="ph-fill"
                    src="/images/hero/step-build.jpg"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    className="ph-img"
                    src="/images/hero/step-build.jpg"
                    alt="Indian and Japanese students building a robot together"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span className="sbb-ic">
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-wrench" />
                  </svg>
                </span>
              </div>{" "}
              <span className="sbb-no">Step 02 · Capability</span>{" "}
              <h3>Build</h3>{" "}
              <p>
                Strengthens critical thinking, communication, collaboration,
                leadership and problem-solving.
              </p>{" "}
              <p className="sbb-out">
                <b>Learner takeaway</b>Skills that transfer, practised in real
                settings and not memorised.
              </p>{" "}
            </li>{" "}
            <li
              className="sbb-step"
              style={{ "--c": "#C98A00" } as React.CSSProperties}
            >
              {" "}
              <div className="sbb-photo">
                <div
                  className="ph ph-fit "
                  data-label="Learners dressed for different careers"
                  style={{ "--c": "#C98A00" } as React.CSSProperties}
                >
                  <img
                    className="ph-fill"
                    src="/images/hero/step-become.jpg"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    className="ph-img"
                    src="/images/hero/step-become.jpg"
                    alt="Learners dressed for different careers"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span className="sbb-ic">
                  <svg className="icon " aria-hidden="true">
                    <use href="#i-compass" />
                  </svg>
                </span>
              </div>{" "}
              <span className="sbb-no">Step 03 · Clarity</span> <h3>Become</h3>{" "}
              <p>
                Helps learners explore interests, career pathways and
                higher-education options.
              </p>{" "}
              <p className="sbb-out">
                <b>Learner takeaway</b>Direction: a clearer sense of where
                learning leads next.
              </p>{" "}
            </li>{" "}
          </ol>{" "}
          <div className="sbb-foot">
            <a className="btn btn-saffron" href="/experiences">
              {"See how every experience is structured "}
              <svg className="icon " aria-hidden="true">
                <use href="#i-arrow" />
              </svg>
            </a>
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="section bg-wash" id="notices">
        {" "}
        <div className="container">
          {" "}
          <div className="section-head split">
            {" "}
            <div>
              {" "}
              <p className="eyebrow">Notice board</p>{" "}
              <h2 className="h2">
                <span className="t1">What's new</span>
                <span className="t2">at Kashti.</span>
              </h2>{" "}
            </div>{" "}
            <a className="link-arrow" href="/gallery">
              {"See moments from the field "}
              <svg className="icon " aria-hidden="true">
                <use href="#i-arrow" />
              </svg>
            </a>{" "}
          </div>{" "}
          <div className="panel newsdesk" data-newsdesk="">
            {" "}
            <div className="nd-tabs" role="tablist" aria-label="Notice board">
              {" "}
              <button
                type="button"
                role="tab"
                aria-selected="true"
                aria-controls="nd-updates"
                id="ndt-updates"
              >
                <svg className="icon " aria-hidden="true">
                  <use href="#i-megaphone" />
                </svg>
                Latest updates
              </button>{" "}
              <button
                type="button"
                role="tab"
                aria-selected="false"
                aria-controls="nd-expeditions"
                id="ndt-expeditions"
              >
                <svg className="icon " aria-hidden="true">
                  <use href="#i-route" />
                </svg>
                Recent expeditions
              </button>{" "}
              <button
                type="button"
                role="tab"
                aria-selected="false"
                aria-controls="nd-downloads"
                id="ndt-downloads"
              >
                <svg className="icon " aria-hidden="true">
                  <use href="#i-download" />
                </svg>
                {"Resources & downloads"}
              </button>{" "}
            </div>{" "}
            <ul
              className="nd-list"
              role="tabpanel"
              id="nd-updates"
              aria-labelledby="ndt-updates"
              data-render="nd-updates"
            />{" "}
            <ul
              className="nd-list"
              role="tabpanel"
              id="nd-expeditions"
              aria-labelledby="ndt-expeditions"
              data-render="nd-expeditions"
              hidden
            />{" "}
            <ul
              className="nd-list"
              role="tabpanel"
              id="nd-downloads"
              aria-labelledby="ndt-downloads"
              data-render="nd-downloads"
              hidden
            />{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="section bg-white" id="read">
        {" "}
        <div className="container">
          {" "}
          <div className="section-head split">
            {" "}
            <div>
              {" "}
              <p className="eyebrow">Read and follow</p>{" "}
              <h2 className="h2">
                <span className="t1">Blogs, newsletter</span>
                <span className="t2">and magazine.</span>
              </h2>{" "}
            </div>{" "}
            <a className="link-arrow" href="/read">
              {"Everything to read "}
              <svg className="icon " aria-hidden="true">
                <use href="#i-arrow" />
              </svg>
            </a>{" "}
          </div>{" "}
          <div className="read-trio" data-render="read-trio" />{" "}
        </div>{" "}
      </section>{" "}
      <section className="section bg-white" id="testimonials">
        {" "}
        <div className="container">
          {" "}
          <div className="section-head split">
            {" "}
            <div>
              {" "}
              <p className="eyebrow">Testimonials</p>{" "}
              <h2 className="h2">
                <span className="t1">In their words:</span>
                <span className="t2">students and teachers.</span>
              </h2>{" "}
            </div>{" "}
            <div
              className="tabs"
              role="tablist"
              aria-label="Show testimonials from"
              data-tm-tabs=""
            >
              {" "}
              <button
                type="button"
                role="tab"
                aria-selected="true"
                data-who="all"
              >
                All
              </button>{" "}
              <button
                type="button"
                role="tab"
                aria-selected="false"
                data-who="student"
              >
                Students
              </button>{" "}
              <button
                type="button"
                role="tab"
                aria-selected="false"
                data-who="teacher"
              >
                Teachers
              </button>{" "}
            </div>{" "}
          </div>{" "}
          <div className="tm-track" data-render="testimonials" />{" "}
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
