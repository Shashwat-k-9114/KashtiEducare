/**
 * Hero carousel slides, sourced from the designed graphics dropped in
 * ./WEBSITE IMAGES/HERO SECTION IMAGE/ (converted to JPEG and optimized —
 * see public/images/hero/). Each graphic already carries its own
 * finished typography (headlines, stat call-outs, logos) baked in, so
 * the carousel adds no overlay text of its own — see HeroCarousel.tsx.
 *
 * All five share the same native pixel size — HeroCarousel sizes the
 * carousel stage to this exact ratio (via CSS `aspect-ratio`, uncapped)
 * so the image fills it edge to edge with zero letterbox and zero crop
 * at any viewport width. That sizing was chosen over a height cap +
 * `object-fit: cover` specifically because every one of these graphics
 * runs its own text the full height of the frame — there's no focal
 * point on any of them that crops without cutting real text.
 *
 * `bg` is that slide's own average tone (sampled from the source photo
 * itself) — only ever visible as a brief flash-of-load background
 * before the image paints, not a real letterbox.
 */

export const HERO_IMAGE_WIDTH = 1672;
export const HERO_IMAGE_HEIGHT = 941;

export type HeroSlide = {
  id: string;
  src: string;
  alt: string;
  bg: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "devdutt",
    src: "/images/hero/devdutt-record-to-role-model.jpg",
    alt: "Lt Cdr Devdutt Sharma swimming, cycling and running in a triathlon composite, marking his Guinness World Records for consecutive endurance distances — From Record to Role Model",
    bg: "#414342",
  },
  {
    id: "dwarka-conclave",
    src: "/images/hero/dwarka-future-conclave.jpg",
    alt: "Students wearing a VR headset beside a robot, with a skyline stretching from Dwarka to Delhi landmarks, Mount Fuji and beyond — From Dwarka to the World, Dwarka Education & Future Conclave 2026",
    bg: "#7e8796",
  },
  {
    id: "three-signature-experiences",
    src: "/images/hero/three-signature-experiences.jpg",
    alt: "Students in an AR/VR lab, a Japan cultural exchange beneath cherry blossoms, and a leadership panel discussion — Three Signature Experiences: Future Immersion, Japan Immersion, Education Samvaad",
    bg: "#b2a39d",
  },
  {
    id: "three-pathways",
    src: "/images/hero/three-pathways.jpg",
    alt: "Three pathway cards — Future Tech Immersion, International Immersion in Japan, and the School Leaders Conclave — Three Pathways, A Brighter Tomorrow",
    bg: "#c0bcbe",
  },
  {
    id: "annual-calendar",
    src: "/images/hero/annual-calendar.jpg",
    alt: "A twelve-month timeline of experiences, from session start in April through a showcase of impact in March — Learning Beyond the Classroom",
    bg: "#e7e8e3",
  },
];
