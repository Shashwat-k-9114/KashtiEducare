/**
 * Single source of truth for every Kashti programme, plus the two
 * cross-cutting taxonomies that browse them (the audience-agnostic
 * Portfolio hub, and the audience-specific Higher Education / School
 * split). Both browsing paths, and the Phase 6 filter bar, all query
 * this file so content never drifts out of sync across pages.
 *
 * Content for `description` and `faqs` is verbatim from
 * Program_Descriptions_and_FAQs.md. `metadata` (Recommended For /
 * Suggested Length / Recommended Months / Group Size) is NOT sourced
 * from that doc — it does not specify these per programme. Values
 * below are estimated placeholders inferred from each programme's own
 * description where it states a duration/audience, or from sensible
 * category defaults otherwise. TODO: confirm every `metadata` block
 * with the ops team before treating it as published fact.
 */

import type { Accent } from "@/components/AccentCard";

export type Audience = "school" | "higher-education";
export type ProgramFormat = "one-day" | "multi-day" | "residential" | "international";

export const formatLabels: Record<ProgramFormat, string> = {
  "one-day": "One Day",
  "multi-day": "Multi-Day",
  residential: "Residential",
  international: "International",
};

export type Faq = { question: string; answer: string };

export type ProgrammeMetadata = {
  recommendedFor: string;
  suggestedLength: string;
  recommendedMonths: string;
  groupSize: string;
};

export type FeaturedExperience = { name: string; blurb: string };

export type PortfolioCategorySlug =
  | "future-stem-exploration"
  | "leadership-discipline-character"
  | "adventure-experiential-learning"
  | "career-industry-exposure"
  | "university-future-pathways"
  | "culture-wellness-social-development"
  | "global-international-immersion"
  | "entrepreneurship-innovation";

export type HigherEdCategorySlug =
  | "academic-industry-exposure"
  | "entrepreneurship-innovation"
  | "career-development"
  | "experiential-learning"
  | "global-learning"
  | "alumni-programs"
  | "faculty-programs";

export type IconName =
  | "FlaskConical"
  | "Flag"
  | "Mountain"
  | "Briefcase"
  | "GraduationCap"
  | "HeartHandshake"
  | "Globe2"
  | "Lightbulb"
  | "Factory"
  | "Rocket"
  | "Compass"
  | "Plane"
  | "Users2"
  | "ClipboardList";

export type PortfolioCategory = {
  slug: PortfolioCategorySlug;
  title: string;
  hook: string;
  description: string;
  cta: string;
  includes: string[];
  icon: IconName;
  accent: Accent;
};

export type HigherEdCategory = {
  slug: HigherEdCategorySlug;
  number: string;
  title: string;
  hook: string;
  description: string;
  cta: string;
  icon: IconName;
  accent: Accent;
};

export type Programme = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  audience: Audience;
  higherEdCategory?: HigherEdCategorySlug;
  portfolioCategories: PortfolioCategorySlug[];
  formats: ProgramFormat[];
  faqs: [Faq, Faq];
  metadata: ProgrammeMetadata;
  featuredExperiences?: FeaturedExperience[];
};

// ---------------------------------------------------------------------------
// Portfolio hub — 8 audience-agnostic category cards ("different
// institutions, different needs").
// ---------------------------------------------------------------------------

export const portfolioCategories: PortfolioCategory[] = [
  {
    slug: "future-stem-exploration",
    title: "Future & STEM Exploration",
    hook: "Where curiosity meets what's next.",
    description:
      "Hands-on exposure to science, technology, research and innovation — from live labs to future-facing industries — that turns curiosity about how things work into a head start on where they're headed.",
    cta: "EXPLORE STEM PROGRAMMES →",
    includes: [
      "STEM Tours",
      "Research & Innovation Centre Visits",
      "Innovation Labs",
      "Startup Ecosystem Visits",
    ],
    icon: "FlaskConical",
    accent: "teal",
  },
  {
    slug: "leadership-discipline-character",
    title: "Leadership, Discipline & Character",
    hook: "Build the person behind the performance.",
    description:
      "Structured residential and outdoor experiences designed to develop discipline, resilience, leadership, teamwork, decision-making and personal responsibility.",
    cta: "EXPLORE LEADERSHIP PROGRAMMES →",
    includes: [
      "Boot Camps & Discipline Programmes",
      "Skill Development Programmes",
      "Leadership-oriented experiential learning",
      "Character development",
    ],
    icon: "Flag",
    accent: "gold",
  },
  {
    slug: "adventure-experiential-learning",
    title: "Adventure & Experiential Learning",
    hook: "Learning through doing.",
    description:
      "Adventure, outdoor challenges, exploration and collaborative experiences that turn unfamiliar environments into opportunities for confidence, problem-solving, teamwork and discovery.",
    cta: "EXPLORE EXPERIENCES →",
    includes: [
      "Experiential & Adventure Learning",
      "Applied & Outdoor Learning",
      "Day Excursions",
      "Nature-based experiences",
    ],
    icon: "Mountain",
    accent: "coral",
  },
  {
    slug: "career-industry-exposure",
    title: "Career & Industry Exposure",
    hook: "Let students see where learning leads.",
    description:
      "Connect students with industries, professionals, workplaces and emerging careers through structured exposure designed around curiosity, application and career awareness.",
    cta: "EXPLORE INDUSTRY & CAREER PROGRAMMES →",
    includes: [
      "Industrial Visits",
      "Career Exposure",
      "Industry Connect",
      "Skill Development",
      "Expert interactions",
      "Workplace exposure",
    ],
    icon: "Briefcase",
    accent: "green",
  },
  {
    slug: "university-future-pathways",
    title: "University & Future Pathways",
    hook: "Turn aspiration into direction.",
    description:
      "Give students an opportunity to experience universities, academic environments, emerging disciplines and future pathways before they make important educational decisions.",
    cta: "EXPLORE UNIVERSITY PROGRAMMES →",
    includes: [
      "University Exposure Programmes",
      "Higher Education Awareness",
      "Career Discovery",
      "Academic ecosystem exposure",
    ],
    icon: "GraduationCap",
    accent: "teal",
  },
  {
    slug: "culture-wellness-social-development",
    title: "Culture, Wellness & Social Development",
    hook: "Develop perspective beyond the classroom.",
    description:
      "Cultural, heritage, wellness, community and national experiences that help students understand identity, responsibility, resilience and their relationship with the wider world.",
    cta: "EXPLORE CULTURE & WELLNESS →",
    includes: [
      "Spiritual & Wellness Retreats",
      "Heritage & Culture",
      "Social responsibility",
      "Community experiences",
      "Border & Patriotism",
      "Indian Knowledge Systems",
    ],
    icon: "HeartHandshake",
    accent: "gold",
  },
  {
    slug: "global-international-immersion",
    title: "Global & International Immersion",
    hook: "Expand the student's world.",
    description:
      "International experiences designed around cross-cultural understanding, global exposure, academic discovery, industry ecosystems and global citizenship.",
    cta: "EXPLORE GLOBAL PROGRAMMES →",
    includes: [
      "Global Immersion Programmes",
      "International exposure",
      "Cross-cultural learning",
      "International academic/industry exposure",
    ],
    icon: "Globe2",
    accent: "coral",
  },
  {
    slug: "entrepreneurship-innovation",
    title: "Entrepreneurship & Innovation",
    hook: "Go where ideas become ventures.",
    description:
      "Founder journeys, startup immersions, incubators and innovation ecosystems that show students how ventures actually get built — from first idea to funded venture.",
    cta: "EXPLORE ENTREPRENEURSHIP PROGRAMMES →",
    includes: [
      "Founder Learning Expeditions",
      "Startup Immersion Programs",
      "Innovation Labs",
      "Incubator & Accelerator Visits",
      "Social Entrepreneurship Programs",
    ],
    icon: "Lightbulb",
    accent: "green",
  },
];

// ---------------------------------------------------------------------------
// Higher Education Programs — 7 categories, taken directly from the
// Higher Education Product Portfolio structure in the source doc.
// ---------------------------------------------------------------------------

export const higherEdCategories: HigherEdCategory[] = [
  {
    slug: "academic-industry-exposure",
    number: "01",
    title: "Academic & Industry Exposure",
    hook: "Take academic learning into the real economy.",
    description:
      "Factory floors, corporate offices, industrial clusters, R&D centres and global trade fairs — structured visits that show students how entire industries actually run.",
    cta: "EXPLORE INDUSTRY EXPOSURE →",
    icon: "Factory",
    accent: "gold",
  },
  {
    slug: "entrepreneurship-innovation",
    number: "02",
    title: "Entrepreneurship & Innovation",
    hook: "Go where ideas become ventures.",
    description:
      "Founder interactions, startup immersions, innovation labs and incubator visits that put students inside the earliest stages of building a business.",
    cta: "EXPLORE ENTREPRENEURSHIP PROGRAMMES →",
    icon: "Rocket",
    accent: "teal",
  },
  {
    slug: "career-development",
    number: "03",
    title: "Career Development",
    hook: "Bridge the gap between campus and career.",
    description:
      "Career exposure, industry networking, leadership camps and placement-readiness retreats that prepare students for the transition from classroom to workplace.",
    cta: "EXPLORE CAREER PROGRAMMES →",
    icon: "Briefcase",
    accent: "coral",
  },
  {
    slug: "experiential-learning",
    number: "04",
    title: "Experiential Learning",
    hook: "Learn through experience, challenge and reflection.",
    description:
      "Adventure camps, treks, community service and heritage tours that build resilience, teamwork and perspective outside the classroom.",
    cta: "EXPLORE EXPERIENTIAL PROGRAMMES →",
    icon: "Compass",
    accent: "green",
  },
  {
    slug: "global-learning",
    number: "05",
    title: "Global Learning",
    hook: "Put students into a global context.",
    description:
      "Exchange placements, global immersion trips and international delegations that build cross-cultural competence and global academic exposure.",
    cta: "EXPLORE GLOBAL LEARNING →",
    icon: "Plane",
    accent: "gold",
  },
  {
    slug: "alumni-programs",
    number: "06",
    title: "Alumni Programs",
    hook: "Turn alumni networks into active communities.",
    description:
      "Reunion retreats, networking events and mentorship-driven leadership retreats that keep alumni connected to campus and to each other.",
    cta: "EXPLORE ALUMNI PROGRAMMES →",
    icon: "Users2",
    accent: "teal",
  },
  {
    slug: "faculty-programs",
    number: "07",
    title: "Faculty Programs",
    hook: "Develop the people who develop students.",
    description:
      "Faculty development programmes, research exposure visits, international immersions and wellness retreats built around the people teaching your students.",
    cta: "EXPLORE FACULTY PROGRAMMES →",
    icon: "ClipboardList",
    accent: "coral",
  },
];

// ---------------------------------------------------------------------------
// Site-wide FAQ (verbatim, 8 Q&As).
// ---------------------------------------------------------------------------

export const siteFaq: Faq[] = [
  {
    question: "How are these programs designed?",
    answer:
      "Every program is built around a clear learning or wellbeing outcome — industry exposure, leadership, skill-building, or immersion — and structured with age/audience-appropriate activities, safety protocols, and outcome debriefs.",
  },
  {
    question: "Can programs be customised for our institution?",
    answer:
      "Yes. Duration, destinations, group size, and itinerary depth can all be tailored to your academic calendar, batch size, and budget.",
  },
  {
    question: "Who conducts these programs?",
    answer:
      "Programs are delivered by our in-house program managers along with subject-matter facilitators, industry partners, and certified trip leaders, depending on the program type.",
  },
  {
    question: "What is included in the program fee?",
    answer:
      "Typically logistics, accommodation, entry/access fees, facilitator costs, and program material are included; travel and personal expenses may vary by package — confirmed at proposal stage.",
  },
  {
    question: "How is student safety managed?",
    answer:
      "All programs run with defined staff-to-student ratios, verified vendors/venues, on-ground coordinators, and emergency protocols; adventure-based programs additionally use certified safety gear and trained instructors.",
  },
  {
    question: "How far in advance should we book?",
    answer:
      "We recommend 6–8 weeks' lead time for domestic programs and 10–12 weeks for international programs, to allow for permissions, logistics, and customisation.",
  },
  {
    question: "Do you provide reports or documentation post-program?",
    answer:
      "Yes, most programs conclude with a summary report, photo/video documentation, and (where applicable) a feedback or learning-outcome summary for the institution.",
  },
  {
    question: "How do we get started?",
    answer:
      "Submit an enquiry through the contact form with your institution details, target audience, and preferred program(s) — our team will get back with a customised proposal.",
  },
];

// ---------------------------------------------------------------------------
// Programmes — one record per programme, tagged into both taxonomies.
// ---------------------------------------------------------------------------

export const programmes: Programme[] = [
  // ---- Higher Education / 01. Academic & Industry Exposure ----
  {
    slug: "industrial-visits",
    title: "Industrial Visits",
    description:
      "Guided visits to live factories and production units where students observe manufacturing processes, quality systems, and supply chains up close.",
    longDescription:
      "Students step onto the shop floor itself rather than reading about it — walking live production lines, seeing quality checkpoints in action, and hearing directly from the people running them.",
    audience: "higher-education",
    higherEdCategory: "academic-industry-exposure",
    portfolioCategories: ["career-industry-exposure"],
    formats: ["one-day"],
    faqs: [
      {
        question: "What will students see?",
        answer:
          "Shop-floor operations, quality control checkpoints, and interactions with plant personnel, tailored to the industry visited.",
      },
      {
        question: "Is prior technical knowledge required?",
        answer: "No — visits are briefed in advance and pitched to the students' academic level.",
      },
    ],
    metadata: {
      recommendedFor: "UG students, all streams",
      suggestedLength: "1 day",
      recommendedMonths: "Oct – Mar",
      groupSize: "30–45 students",
    },
  },
  {
    slug: "corporate-exposure-tours",
    title: "Corporate Exposure Tours",
    description:
      "Visits to corporate offices and headquarters that let students experience real workplace environments, functional departments, and professional culture.",
    longDescription:
      "Beyond the office tour, students sit in on a working department and put questions directly to the people in it, so the visit leaves them with a feel for the culture, not just the floor plan.",
    audience: "higher-education",
    higherEdCategory: "academic-industry-exposure",
    portfolioCategories: ["career-industry-exposure"],
    formats: ["one-day"],
    faqs: [
      {
        question: "Which sectors are covered?",
        answer: "IT, BFSI, FMCG, media, and more, depending on partner availability and student interest.",
      },
      {
        question: "Do students interact with employees?",
        answer: "Yes, sessions typically include a walkthrough plus a Q&A with department representatives.",
      },
    ],
    metadata: {
      recommendedFor: "UG & PG students",
      suggestedLength: "1 day",
      recommendedMonths: "Oct – Mar",
      groupSize: "25–40 students",
    },
  },
  {
    slug: "manufacturing-cluster-visits",
    title: "Manufacturing Cluster Visits",
    description:
      "Tours through industrial clusters — textile, auto-component, electronics, or similar hubs — to understand how ancillary industries and supply ecosystems function together.",
    longDescription:
      "Instead of one factory in isolation, students trace a single belt of linked units, seeing how raw material, ancillary supply and finished production actually connect across an ecosystem.",
    audience: "higher-education",
    higherEdCategory: "academic-industry-exposure",
    portfolioCategories: ["career-industry-exposure"],
    formats: ["one-day", "multi-day"],
    faqs: [
      {
        question: "How is this different from a single industrial visit?",
        answer:
          "It covers multiple linked units in one belt, showing how an entire ecosystem (not just one factory) operates.",
      },
      {
        question: "Is this suitable for management students?",
        answer: "Yes, it's especially useful for supply chain, operations, and economics learners.",
      },
    ],
    metadata: {
      recommendedFor: "UG students — operations, supply chain & economics",
      suggestedLength: "1–2 days",
      recommendedMonths: "Oct – Mar",
      groupSize: "30–40 students",
    },
  },
  {
    slug: "research-innovation-centre-visits",
    title: "Research & Innovation Centre Visits",
    description:
      "Visits to R&D labs, innovation centres, and science parks where students see applied research, prototyping, and technology-transfer in action.",
    longDescription:
      "Students see research as a working process rather than a finished paper — prototypes on the bench, technology mid-transfer, and researchers explaining the path from idea to application.",
    audience: "higher-education",
    higherEdCategory: "academic-industry-exposure",
    portfolioCategories: ["future-stem-exploration"],
    formats: ["one-day"],
    faqs: [
      {
        question: "What kind of centres are visited?",
        answer:
          "Government research labs, university-affiliated R&D units, or corporate innovation centres depending on the discipline.",
      },
      {
        question: "Can this be aligned to a specific course?",
        answer: "Yes, centres are selected to match the participating stream (engineering, biotech, agri-tech, etc.).",
      },
    ],
    metadata: {
      recommendedFor: "UG & PG students — science & engineering streams",
      suggestedLength: "1 day",
      recommendedMonths: "Oct – Mar",
      groupSize: "25–35 students",
    },
  },
  {
    slug: "business-smart-tours",
    title: "Business Smart Tours",
    description:
      "Curated multi-stop circuits covering a mix of businesses across sectors for broad, fast-paced exposure to different business models.",
    longDescription:
      "The pace is deliberate — several contrasting businesses back-to-back, so students build a comparative sense of scale and sector before they've had to pick a lane.",
    audience: "higher-education",
    higherEdCategory: "academic-industry-exposure",
    portfolioCategories: ["career-industry-exposure"],
    formats: ["one-day", "multi-day"],
    faqs: [
      {
        question: "How many businesses are covered in one tour?",
        answer: "Typically 3–5 stops over 1–2 days, chosen for contrast in scale and sector.",
      },
      {
        question: "Who is this best suited for?",
        answer: "Students early in their course who need breadth before choosing a specialisation.",
      },
    ],
    metadata: {
      recommendedFor: "UG students, early years",
      suggestedLength: "1–2 days",
      recommendedMonths: "Oct – Mar",
      groupSize: "30–40 students",
    },
  },
  {
    slug: "international-trade-fair-expo-tours",
    title: "International Trade Fair & Expo Tours",
    description:
      "Accompanied trips to major global trade fairs and expos, giving students first-hand insight into international sourcing, exhibitions, and market trends.",
    longDescription:
      "Students walk the same halls as the buyers and exporters actually doing the deals, with briefings that translate the noise of a trade fair into a readable map of how sourcing and markets move.",
    audience: "higher-education",
    higherEdCategory: "academic-industry-exposure",
    portfolioCategories: ["global-international-immersion"],
    formats: ["multi-day", "international"],
    faqs: [
      {
        question: "Which expos are typically covered?",
        answer:
          "Sector-relevant international expos across manufacturing, technology, and trade, based on the academic calendar.",
      },
      {
        question: "Is this only for business/commerce students?",
        answer: "No, it also benefits design, engineering, and international-relations students.",
      },
    ],
    metadata: {
      recommendedFor: "UG & PG students — business, design & engineering",
      suggestedLength: "4–6 days",
      recommendedMonths: "Aligned with the target expo's calendar",
      groupSize: "20–30 students",
    },
  },
  {
    slug: "canton-fair-business-tours",
    title: "Canton Fair Business Tours",
    description:
      "Specialised tours to the Canton Fair in China — one of the world's largest trade fairs — for hands-on exposure to global sourcing, negotiation, and trade networks.",
    longDescription:
      "This is a deeper, single-fair version of a trade tour — enough time at one of the world's largest sourcing events to actually practise reading a stall, not just walk past it.",
    audience: "higher-education",
    higherEdCategory: "academic-industry-exposure",
    portfolioCategories: ["global-international-immersion"],
    formats: ["multi-day", "international"],
    faqs: [
      {
        question: "What does the itinerary usually include?",
        answer:
          "Fair access across relevant sectors, briefings on sourcing/export practices, and often a factory or trade-hub visit.",
      },
      {
        question: "Is this open to all disciplines?",
        answer: "It's most relevant to commerce, international business, and entrepreneurship students.",
      },
    ],
    metadata: {
      recommendedFor: "Commerce, international business & entrepreneurship students",
      suggestedLength: "5–7 days",
      recommendedMonths: "Apr–May & Oct–Nov (fair sessions)",
      groupSize: "20–30 students",
    },
  },
  {
    slug: "startup-ecosystem-visits",
    title: "Startup Ecosystem Visits",
    description:
      "Visits to startup hubs and co-working spaces to see how early-stage companies operate and what support systems surround them.",
    longDescription:
      "Kept deliberately small so the visit is a real conversation with a founder, not a spectator tour of a co-working space.",
    audience: "higher-education",
    higherEdCategory: "academic-industry-exposure",
    portfolioCategories: ["entrepreneurship-innovation"],
    formats: ["one-day"],
    faqs: [
      {
        question: "Will students meet actual founders?",
        answer: "Yes, sessions are usually built around founder interactions or panel discussions.",
      },
      {
        question: "What's the typical group size?",
        answer: "Kept small (20–30 students) to allow meaningful interaction.",
      },
    ],
    metadata: {
      recommendedFor: "UG & PG students",
      suggestedLength: "1 day",
      recommendedMonths: "Oct – Mar",
      groupSize: "20–30 students",
    },
  },
  {
    slug: "msme-exposure-programs",
    title: "MSME Exposure Programs",
    description:
      "Visits to micro, small, and medium enterprises to understand grassroots entrepreneurship, local manufacturing, and the specific challenges MSMEs face.",
    longDescription:
      "A more relatable entry point than a large-corporate visit — the constraints, workarounds and grit of a small enterprise are all visible up close, not hidden behind scale.",
    audience: "higher-education",
    higherEdCategory: "academic-industry-exposure",
    portfolioCategories: ["career-industry-exposure"],
    formats: ["one-day", "multi-day"],
    faqs: [
      {
        question: "Why focus on MSMEs specifically?",
        answer: "They offer a more relatable, hands-on entry point to entrepreneurship than large corporates.",
      },
      {
        question: "Can this be combined with a rural/local economy module?",
        answer: "Yes, it pairs well with rural development or local economics coursework.",
      },
    ],
    metadata: {
      recommendedFor: "UG students — commerce, economics & entrepreneurship",
      suggestedLength: "1–2 days",
      recommendedMonths: "Oct – Mar",
      groupSize: "25–35 students",
    },
  },

  // ---- Higher Education / 02. Entrepreneurship & Innovation ----
  {
    slug: "entrepreneurship-exposure-tours",
    title: "Entrepreneurship Exposure Tours",
    description:
      "General tours introducing students to entrepreneurial ventures, founders, and diverse business journeys across industries.",
    longDescription:
      "Deliberately broad rather than deep — a mix of ventures and founder voices in one circuit, meant to widen what students think entrepreneurship can look like before they narrow in.",
    audience: "higher-education",
    higherEdCategory: "entrepreneurship-innovation",
    portfolioCategories: ["entrepreneurship-innovation"],
    formats: ["one-day", "multi-day"],
    faqs: [
      {
        question: "What's the format?",
        answer: "A mix of venture visits and short founder talks across a single day or multi-day circuit.",
      },
      {
        question: "Is this suitable for non-business streams?",
        answer: "Yes — entrepreneurship exposure is designed to be discipline-agnostic.",
      },
    ],
    metadata: {
      recommendedFor: "UG & PG students, all streams",
      suggestedLength: "1–2 days",
      recommendedMonths: "Oct – Mar",
      groupSize: "25–35 students",
    },
  },
  {
    slug: "founder-learning-expeditions",
    title: "Founder Learning Expeditions",
    description:
      "Direct, in-depth interactions with startup founders to hear their journeys, decisions, and setbacks first-hand.",
    longDescription:
      "Fewer founders, more time with each — the format trades breadth for candour, so students hear about the setbacks as honestly as the wins.",
    audience: "higher-education",
    higherEdCategory: "entrepreneurship-innovation",
    portfolioCategories: ["entrepreneurship-innovation", "career-industry-exposure"],
    formats: ["multi-day"],
    faqs: [
      {
        question: "How is this different from a standard exposure tour?",
        answer: "It goes deeper with fewer founders and longer, more candid conversations.",
      },
      {
        question: "Can we request founders from a specific sector?",
        answer: "Yes, subject to founder and schedule availability.",
      },
    ],
    metadata: {
      recommendedFor: "UG & PG students interested in entrepreneurship",
      suggestedLength: "2–3 days",
      recommendedMonths: "Oct – Mar",
      groupSize: "15–25 students",
    },
  },
  {
    slug: "startup-immersion-programs",
    title: "Startup Immersion Programs",
    description:
      "Multi-day immersive programs where students embed with a startup team and observe real day-to-day operations.",
    longDescription:
      "Students aren't visiting a startup, they're sitting inside one for several days — shadowing standups, sprints and decisions as they actually happen.",
    audience: "higher-education",
    higherEdCategory: "entrepreneurship-innovation",
    portfolioCategories: ["entrepreneurship-innovation"],
    formats: ["multi-day", "residential"],
    faqs: [
      {
        question: "How long does the immersion run?",
        answer: "Typically 3–5 days, depending on the host startup's capacity.",
      },
      {
        question: "Do students get assigned tasks?",
        answer: "In many cases yes, students shadow or assist on light real tasks under supervision.",
      },
    ],
    metadata: {
      recommendedFor: "UG & PG students",
      suggestedLength: "3–5 days",
      recommendedMonths: "May–Jun & Nov–Dec (semester breaks)",
      groupSize: "10–20 students",
    },
  },
  {
    slug: "innovation-labs",
    title: "Innovation Labs",
    description:
      "Visits to dedicated innovation labs and makerspaces to explore prototyping tools, design thinking spaces, and innovation workflows.",
    longDescription:
      "The tools stay accessible even without a technical background — students leave having actually run a short prototyping or ideation exercise, not just watched one.",
    audience: "higher-education",
    higherEdCategory: "entrepreneurship-innovation",
    portfolioCategories: ["future-stem-exploration", "entrepreneurship-innovation"],
    formats: ["one-day"],
    faqs: [
      {
        question: "What kind of activities happen here?",
        answer: "Guided tours plus, in many labs, a short hands-on prototyping or ideation exercise.",
      },
      {
        question: "Is any technical background needed?",
        answer: "No, labs are structured to be accessible to non-technical students too.",
      },
    ],
    metadata: {
      recommendedFor: "UG & PG students, all streams",
      suggestedLength: "1 day",
      recommendedMonths: "Oct – Mar",
      groupSize: "25–35 students",
    },
  },
  {
    slug: "incubator-accelerator-visits",
    title: "Incubator & Accelerator Visits",
    description:
      "Visits to startup incubators and accelerators to understand mentoring structures, funding pathways, and venture-building support.",
    longDescription:
      "As useful for a future VC analyst or consultant as it is for a future founder — the focus is the scaffolding around a venture, not just the venture itself.",
    audience: "higher-education",
    higherEdCategory: "entrepreneurship-innovation",
    portfolioCategories: ["entrepreneurship-innovation"],
    formats: ["one-day"],
    faqs: [
      {
        question: "Will students see actual portfolio startups?",
        answer: "Yes, most visits include interactions with a few resident startups.",
      },
      {
        question: "Is this relevant for aspiring entrepreneurs only?",
        answer: "It's equally useful for students interested in venture capital, consulting, or ecosystem-building roles.",
      },
    ],
    metadata: {
      recommendedFor: "UG & PG students interested in venture-building",
      suggestedLength: "1 day",
      recommendedMonths: "Oct – Mar",
      groupSize: "20–30 students",
    },
  },
  {
    slug: "business-leadership-journeys",
    title: "Business Leadership Journeys",
    description:
      "Curated trips built specifically around meeting business leaders and CXOs for direct leadership insight.",
    longDescription:
      "Leaders are matched to the group's field and the format kept intimate — a fireside chat or small-group Q&A, not a keynote from the back row.",
    audience: "higher-education",
    higherEdCategory: "entrepreneurship-innovation",
    portfolioCategories: ["leadership-discipline-character", "career-industry-exposure"],
    formats: ["multi-day"],
    faqs: [
      {
        question: "How are leaders selected?",
        answer: "Based on relevance to the student group's field and availability of partner networks.",
      },
      {
        question: "What format do these sessions take?",
        answer: "Usually fireside chats or small-group leadership Q&As.",
      },
    ],
    metadata: {
      recommendedFor: "Final-year UG & PG students",
      suggestedLength: "2–3 days",
      recommendedMonths: "Oct – Mar",
      groupSize: "20–30 students",
    },
  },
  {
    slug: "social-entrepreneurship-programs",
    title: "Social Entrepreneurship Programs",
    description:
      "Exposure to social enterprises tackling community problems, showing how impact-driven business models are built and sustained.",
    longDescription:
      "The exposure visits are often paired with a short volunteering or project element, so the impact model isn't just described — students help carry a small piece of it.",
    audience: "higher-education",
    higherEdCategory: "entrepreneurship-innovation",
    portfolioCategories: ["entrepreneurship-innovation", "culture-wellness-social-development"],
    formats: ["multi-day"],
    faqs: [
      {
        question: "What sectors are typically covered?",
        answer: "Livelihoods, sustainability, education, and healthcare-focused social enterprises.",
      },
      {
        question: "Is there a service component?",
        answer: "Some programs include a short volunteering or project element alongside the exposure visits.",
      },
    ],
    metadata: {
      recommendedFor: "UG & PG students",
      suggestedLength: "2–3 days",
      recommendedMonths: "Oct – Mar",
      groupSize: "20–30 students",
    },
  },

  // ---- Higher Education / 03. Career Development ----
  {
    slug: "career-exposure-programs",
    title: "Career Exposure Programs",
    description:
      "Structured programs introducing students to varied career paths across industries through site visits and professional interactions.",
    longDescription:
      "Best timed before a specialisation is locked in — the program is built to show three or four genuinely different paths side by side, while there's still room to choose between them.",
    audience: "higher-education",
    higherEdCategory: "career-development",
    portfolioCategories: ["career-industry-exposure"],
    formats: ["multi-day"],
    faqs: [
      {
        question: "At what stage of study is this best suited?",
        answer: "Ideal for early-to-mid course years, before students commit to a specialisation.",
      },
      {
        question: "How many career paths are typically covered?",
        answer: "Usually 3–4 distinct paths within one program.",
      },
    ],
    metadata: {
      recommendedFor: "UG students, early-to-mid course years",
      suggestedLength: "2–3 days",
      recommendedMonths: "Oct – Mar",
      groupSize: "25–40 students",
    },
  },
  {
    slug: "industry-connect-programs",
    title: "Industry Connect Programs",
    description:
      "Networking-focused sessions that connect students directly with industry professionals for mentorship and career insight.",
    longDescription:
      "Runs equally well as a single connect day or stretched into a structured mentorship series, depending on how deep the institution wants the relationship to go.",
    audience: "higher-education",
    higherEdCategory: "career-development",
    portfolioCategories: ["career-industry-exposure"],
    formats: ["one-day", "multi-day"],
    faqs: [
      {
        question: "Is this a one-time session or ongoing?",
        answer: "Can be run as a single connect day or structured as a multi-session mentorship series.",
      },
      {
        question: "Who are the professionals involved?",
        answer: "Mid-to-senior industry practitioners drawn from our partner network.",
      },
    ],
    metadata: {
      recommendedFor: "UG & PG students",
      suggestedLength: "1 day (or a multi-session series)",
      recommendedMonths: "Oct – Mar",
      groupSize: "30–50 students",
    },
  },
  {
    slug: "leadership-development-camps",
    title: "Leadership Development Camps",
    description:
      "Camps combining workshops, activities, and outdoor challenges to build practical leadership skills in students.",
    longDescription:
      "The residential format matters here — decision-making and accountability show up differently once a challenge runs into the evening and the group has to live with its own choices.",
    audience: "higher-education",
    higherEdCategory: "career-development",
    portfolioCategories: ["leadership-discipline-character"],
    formats: ["multi-day", "residential"],
    faqs: [
      {
        question: "What skills are the focus?",
        answer: "Decision-making, teamwork, communication, and accountability under real-time challenges.",
      },
      {
        question: "Is this residential?",
        answer: "Most camps run as a residential 2–4 day format for full immersion.",
      },
    ],
    metadata: {
      recommendedFor: "UG & PG students",
      suggestedLength: "2–4 days",
      recommendedMonths: "Oct – Mar",
      groupSize: "25–35 students",
    },
  },
  {
    slug: "skill-development-programs",
    title: "Skill Development Programs",
    description:
      "Hands-on programs teaching practical, employability-focused skills beyond the standard classroom curriculum.",
    longDescription:
      "Modules are pulled from whichever partner and sector best match the target roles, so the same program can flex from technical/vocational skills to communication and digital tools.",
    audience: "higher-education",
    higherEdCategory: "career-development",
    portfolioCategories: ["leadership-discipline-character", "career-industry-exposure"],
    formats: ["multi-day"],
    faqs: [
      {
        question: "What kind of skills are covered?",
        answer: "Varies by partner — ranging from technical/vocational skills to communication and digital tools.",
      },
      {
        question: "Can this be aligned to a specific job role?",
        answer: "Yes, modules can be tailored to target sectors or roles.",
      },
    ],
    metadata: {
      recommendedFor: "UG & PG students",
      suggestedLength: "1–3 days (or a modular series)",
      recommendedMonths: "Oct – Mar",
      groupSize: "25–40 students",
    },
  },
  {
    slug: "campus-to-corporate-programs",
    title: "Campus-to-Corporate Programs",
    description:
      "Transition-focused programs preparing final-year students for corporate life — workplace etiquette, communication, and readiness.",
    longDescription:
      "Role-plays and simulated workplace situations do the heavy lifting here, so students rehearse the awkward first weeks of a job before they're actually in one.",
    audience: "higher-education",
    higherEdCategory: "career-development",
    portfolioCategories: ["career-industry-exposure"],
    formats: ["multi-day"],
    faqs: [
      {
        question: "When should this be scheduled?",
        answer: "Ideally in the final year, ahead of placements or internships.",
      },
      {
        question: "Does this include mock scenarios?",
        answer: "Yes, most programs include role-plays or simulated workplace situations.",
      },
    ],
    metadata: {
      recommendedFor: "Final-year UG students",
      suggestedLength: "2–3 days",
      recommendedMonths: "Jul – Sep (ahead of placement season)",
      groupSize: "30–45 students",
    },
  },
  {
    slug: "placement-readiness-retreats",
    title: "Placement Readiness Retreats",
    description:
      "Retreats concentrated on interview preparation, resume building, and placement strategy ahead of recruitment season.",
    longDescription:
      "Resume clinics and group-discussion practice run alongside the mock interviews, so students leave the retreat with materials in hand, not just advice.",
    audience: "higher-education",
    higherEdCategory: "career-development",
    portfolioCategories: ["career-industry-exposure"],
    formats: ["multi-day", "residential"],
    faqs: [
      {
        question: "What's the typical duration?",
        answer: "1–3 days, timed a few weeks before placement season begins.",
      },
      {
        question: "Are mock interviews included?",
        answer: "Yes, along with resume clinics and group discussion practice.",
      },
    ],
    metadata: {
      recommendedFor: "Final-year UG & PG students",
      suggestedLength: "1–3 days",
      recommendedMonths: "Jul – Sep (pre-placement season)",
      groupSize: "30–45 students",
    },
  },

  // ---- Higher Education / 04. Experiential Learning ----
  {
    slug: "adventure-leadership-camps",
    title: "Adventure Leadership Camps",
    description: "Outdoor camps that combine adventure activities with structured leadership-building exercises.",
    longDescription:
      "Rope courses and team challenges are the vehicle; every activity is instructor-led with certified safety gear, so the leadership lesson lands without the risk being real.",
    audience: "higher-education",
    higherEdCategory: "experiential-learning",
    portfolioCategories: ["adventure-experiential-learning", "leadership-discipline-character"],
    formats: ["multi-day", "residential"],
    faqs: [
      {
        question: "What activities are typically included?",
        answer: "Rope courses, team challenges, and light adventure sports depending on terrain.",
      },
      {
        question: "Are these safe for beginners?",
        answer: "Yes, all activities are instructor-led with certified safety gear.",
      },
    ],
    metadata: {
      recommendedFor: "UG students, all streams",
      suggestedLength: "2–4 days",
      recommendedMonths: "Oct – Mar",
      groupSize: "25–35 students",
    },
  },
  {
    slug: "trekking-expeditions",
    title: "Trekking Expeditions",
    description:
      "Guided treks through natural or mountain terrain designed to build resilience, teamwork, and physical endurance.",
    longDescription:
      "Routes are graded, not one-size-fits-all, so a mixed-fitness group can trek together without the pace breaking anyone.",
    audience: "higher-education",
    higherEdCategory: "experiential-learning",
    portfolioCategories: ["adventure-experiential-learning"],
    formats: ["multi-day", "residential"],
    faqs: [
      {
        question: "What fitness level is required?",
        answer: "Routes are graded so groups of varying fitness levels can be accommodated.",
      },
      {
        question: "Is trekking gear provided?",
        answer: "Core safety gear is provided; personal gear requirements are shared in advance.",
      },
    ],
    metadata: {
      recommendedFor: "UG students, all fitness levels",
      suggestedLength: "3–5 days",
      recommendedMonths: "Oct – Mar (avoiding monsoon)",
      groupSize: "20–30 students",
    },
  },
  {
    slug: "outdoor-leadership-programs",
    title: "Outdoor Leadership Programs",
    description:
      "Structured outdoor programs that develop leadership qualities through hands-on experiential challenges.",
    longDescription:
      "Every challenge closes with a debrief that ties the activity back to a specific leadership lesson, which is what separates this from a straightforward adventure trip.",
    audience: "higher-education",
    higherEdCategory: "experiential-learning",
    portfolioCategories: ["adventure-experiential-learning", "leadership-discipline-character"],
    formats: ["multi-day", "residential"],
    faqs: [
      {
        question: "How is leadership assessed or reinforced here?",
        answer: "Through debrief sessions after each challenge, linking the activity back to a leadership lesson.",
      },
      {
        question: "Is this a one-day or multi-day format?",
        answer: "Typically multi-day for deeper skill reinforcement.",
      },
    ],
    metadata: {
      recommendedFor: "UG students",
      suggestedLength: "2–4 days",
      recommendedMonths: "Oct – Mar",
      groupSize: "25–35 students",
    },
  },
  {
    slug: "community-service-programs",
    title: "Community Service Programs",
    description: "Volunteering and service-based trips that engage students directly in social impact projects.",
    longDescription:
      "A structured reflection session follows the fieldwork itself, which is what turns a volunteering day into something students can actually articulate as learning.",
    audience: "higher-education",
    higherEdCategory: "experiential-learning",
    portfolioCategories: ["culture-wellness-social-development"],
    formats: ["multi-day"],
    faqs: [
      {
        question: "What kind of projects are typical?",
        answer: "Education support, environmental clean-ups, or community infrastructure projects.",
      },
      {
        question: "Is there a reflection component?",
        answer: "Yes, structured reflection sessions help translate the experience into learning.",
      },
    ],
    metadata: {
      recommendedFor: "UG & PG students",
      suggestedLength: "2–3 days",
      recommendedMonths: "Oct – Mar",
      groupSize: "25–40 students",
    },
  },
  {
    slug: "cultural-heritage-tours",
    title: "Cultural & Heritage Tours",
    description: "Tours to historical and cultural sites designed to build heritage appreciation and cultural understanding.",
    longDescription:
      "Local historians and heritage guides lead the way, and itineraries can be pointed at specific syllabus themes when a history or humanities course asks for it.",
    audience: "higher-education",
    higherEdCategory: "experiential-learning",
    portfolioCategories: ["culture-wellness-social-development"],
    formats: ["one-day", "multi-day"],
    faqs: [
      {
        question: "Are these guided by experts?",
        answer: "Yes, local historians or heritage guides typically lead these tours.",
      },
      {
        question: "Can this be linked to a history or humanities course?",
        answer: "Yes, itineraries can be aligned to specific syllabus themes.",
      },
    ],
    metadata: {
      recommendedFor: "UG students — humanities & general",
      suggestedLength: "1–2 days",
      recommendedMonths: "Oct – Mar",
      groupSize: "30–45 students",
    },
  },
  {
    slug: "border-tourism-tours",
    title: "Border Tourism Tours",
    description:
      "Trips to border areas and defence outposts that build patriotism, geographic awareness, and understanding of national security.",
    longDescription:
      "Our team manages the necessary clearances in advance, and itinerary depth is adjusted by academic level so the visit lands as intended at any age.",
    audience: "higher-education",
    higherEdCategory: "experiential-learning",
    portfolioCategories: ["culture-wellness-social-development"],
    formats: ["multi-day"],
    faqs: [
      {
        question: "Are permissions required for these visits?",
        answer: "Yes, and our team manages the necessary clearances in advance.",
      },
      {
        question: "Is this suitable for all age groups?",
        answer: "Yes, with itinerary depth adjusted by academic level.",
      },
    ],
    metadata: {
      recommendedFor: "UG students, all streams",
      suggestedLength: "2–4 days",
      recommendedMonths: "Oct – Mar",
      groupSize: "30–45 students",
    },
  },
  {
    slug: "educational-excursions",
    title: "Educational Excursions",
    description: "General academic excursions to museums, science centres, and similar destinations aligned with curriculum themes.",
    longDescription:
      "Destinations are chosen to reinforce whatever subject or theme the institution is teaching, keeping the trip tied to the syllabus rather than generic sightseeing.",
    audience: "higher-education",
    higherEdCategory: "experiential-learning",
    portfolioCategories: ["adventure-experiential-learning"],
    formats: ["one-day"],
    faqs: [
      {
        question: "How are destinations chosen?",
        answer: "Based on the subject or theme the institution wants to reinforce.",
      },
      {
        question: "Can this be a single-day trip?",
        answer: "Yes, most educational excursions run as single-day programs.",
      },
    ],
    metadata: {
      recommendedFor: "UG students, all streams",
      suggestedLength: "1 day",
      recommendedMonths: "Oct – Mar",
      groupSize: "30–45 students",
    },
  },

  // ---- Higher Education / 05. Global Learning ----
  {
    slug: "university-exchange-programs",
    title: "University Exchange Programs",
    description: "Semester-long or short-term exchange placements at partner universities abroad.",
    longDescription:
      "Where a formal MoU exists between institutions, credit transfer is confirmed case by case — the exchange is built around the partner university's own calendar, not ours.",
    audience: "higher-education",
    higherEdCategory: "global-learning",
    portfolioCategories: ["global-international-immersion", "university-future-pathways"],
    formats: ["multi-day", "international", "residential"],
    faqs: [
      {
        question: "How long do exchanges typically run?",
        answer: "From a few weeks to a full semester, based on the partner institution's calendar.",
      },
      {
        question: "Is credit transfer supported?",
        answer: "Where formal MoUs exist between institutions; this is confirmed case by case.",
      },
    ],
    metadata: {
      recommendedFor: "UG & PG students",
      suggestedLength: "2–16 weeks",
      recommendedMonths: "Aligned with the partner university's calendar",
      groupSize: "5–15 students",
    },
  },
  {
    slug: "global-immersion-programs",
    title: "Global Immersion Programs",
    description: "Short international immersion trips exposing students to global business, culture, and education systems.",
    longDescription:
      "University visits, business interactions and cultural experiences are woven into one itinerary, so the trip reads as one coherent journey rather than three separate ones stitched together.",
    audience: "higher-education",
    higherEdCategory: "global-learning",
    portfolioCategories: ["global-international-immersion"],
    formats: ["multi-day", "international"],
    faqs: [
      {
        question: "How long does a typical immersion run?",
        answer: "Usually 7–14 days.",
      },
      {
        question: "What's included in the itinerary?",
        answer: "A mix of university visits, business interactions, and cultural experiences.",
      },
    ],
    metadata: {
      recommendedFor: "UG & PG students",
      suggestedLength: "7–14 days",
      recommendedMonths: "May–Jun & Dec–Jan (academic breaks)",
      groupSize: "20–30 students",
    },
  },
  {
    slug: "international-business-delegations",
    title: "International Business Delegations",
    description: "Trips where student or faculty delegations engage directly with businesses and institutions abroad.",
    longDescription:
      "The outcome is relational, not just experiential — the trip is built to seed direct, ongoing ties with international academic or business counterparts.",
    audience: "higher-education",
    higherEdCategory: "global-learning",
    portfolioCategories: ["global-international-immersion"],
    formats: ["multi-day", "international"],
    faqs: [
      {
        question: "Who typically joins these delegations?",
        answer: "Senior students, faculty leads, or a mixed institutional delegation.",
      },
      {
        question: "What's the primary outcome?",
        answer: "Direct relationship-building with international academic or business counterparts.",
      },
    ],
    metadata: {
      recommendedFor: "Senior UG & PG students, faculty leads",
      suggestedLength: "5–8 days",
      recommendedMonths: "Oct – Mar",
      groupSize: "10–20 delegates",
    },
  },
  {
    slug: "cross-cultural-learning-programs",
    title: "Cross-Cultural Learning Programs",
    description: "Programs built to develop cross-cultural competence through structured international interactions.",
    longDescription:
      "No prior language skills are assumed — the program is built specifically around structured cultural-exchange activities rather than general sightseeing.",
    audience: "higher-education",
    higherEdCategory: "global-learning",
    portfolioCategories: ["global-international-immersion"],
    formats: ["multi-day", "international"],
    faqs: [
      {
        question: "How is this different from a general immersion trip?",
        answer: "It's built specifically around structured cultural-exchange activities rather than sightseeing.",
      },
      {
        question: "Is a foreign language requirement needed?",
        answer: "No, programs are designed to be accessible without prior language skills.",
      },
    ],
    metadata: {
      recommendedFor: "UG & PG students",
      suggestedLength: "5–10 days",
      recommendedMonths: "May–Jun & Dec–Jan (academic breaks)",
      groupSize: "20–30 students",
    },
  },

  // ---- Higher Education / 06. Alumni Programs ----
  {
    slug: "alumni-reunion-retreats",
    title: "Alumni Reunion Retreats",
    description: "Retreats organised around alumni reunions, blending nostalgia, networking, and reconnection with campus life.",
    longDescription:
      "Optional inter-generational sessions can be built in for institutions that want current students in the room, but the retreat stands on its own as a 1–2 day gathering of structured sessions and informal networking.",
    audience: "higher-education",
    higherEdCategory: "alumni-programs",
    portfolioCategories: [],
    formats: ["multi-day", "residential"],
    faqs: [
      {
        question: "Can this include current students too?",
        answer: "Optional inter-generational sessions can be built in if the institution wants it.",
      },
      {
        question: "What's a typical format?",
        answer: "A retreat-style 1–2 day gathering combining structured sessions and informal networking.",
      },
    ],
    metadata: {
      recommendedFor: "Alumni, with optional current-student sessions",
      suggestedLength: "1–2 days",
      recommendedMonths: "Dec – Feb (reunion season)",
      groupSize: "40–100 attendees",
    },
  },
  {
    slug: "networking-retreats",
    title: "Networking Retreats",
    description: "Retreats focused specifically on alumni networking, business connections, and collaboration opportunities.",
    longDescription:
      "The retreat can be organised by batch, department or industry vertical, whichever grouping is most likely to produce a tangible business or mentorship connection.",
    audience: "higher-education",
    higherEdCategory: "alumni-programs",
    portfolioCategories: [],
    formats: ["multi-day", "residential"],
    faqs: [
      {
        question: "What's the goal of these retreats?",
        answer: "Facilitating tangible business or mentorship connections among alumni.",
      },
      {
        question: "Are these industry-specific?",
        answer: "They can be organised by batch, department, or industry vertical as needed.",
      },
    ],
    metadata: {
      recommendedFor: "Alumni, organised by batch, department or industry",
      suggestedLength: "1–2 days",
      recommendedMonths: "Oct – Mar",
      groupSize: "30–60 attendees",
    },
  },
  {
    slug: "leadership-retreats",
    title: "Leadership Retreats",
    description: "Retreats designed for alumni leadership development and structured mentorship engagement with current students.",
    longDescription:
      "Senior alumni in leadership roles anchor the retreat, with select current students brought in where the mentorship pairing makes sense.",
    audience: "higher-education",
    higherEdCategory: "alumni-programs",
    portfolioCategories: ["leadership-discipline-character"],
    formats: ["multi-day", "residential"],
    faqs: [
      {
        question: "Do alumni mentor current students during this?",
        answer: "Yes, mentorship sessions are typically a core part of the format.",
      },
      {
        question: "Who typically attends?",
        answer: "Senior alumni in leadership roles, alongside select current students where relevant.",
      },
    ],
    metadata: {
      recommendedFor: "Senior alumni & select current students",
      suggestedLength: "2–3 days",
      recommendedMonths: "Oct – Mar",
      groupSize: "20–30 attendees",
    },
  },

  // ---- Higher Education / 07. Faculty Programs ----
  {
    slug: "faculty-development-programs",
    title: "Faculty Development Programs (FDPs)",
    description: "Structured programs to upskill faculty in pedagogy, curriculum design, or subject-specific expertise.",
    longDescription:
      "Depth, not just duration, drives the format — the program runs anywhere from a few days to a week depending on how much the pedagogy or subject-matter goal actually requires.",
    audience: "higher-education",
    higherEdCategory: "faculty-programs",
    portfolioCategories: [],
    formats: ["multi-day"],
    faqs: [
      {
        question: "How long do FDPs typically run?",
        answer: "From a few days to a week, depending on the depth required.",
      },
      {
        question: "Are these certified?",
        answer: "Certification can be arranged in partnership with the host institution or facilitator.",
      },
    ],
    metadata: {
      recommendedFor: "Faculty members",
      suggestedLength: "3–7 days",
      recommendedMonths: "May–Jun & Dec (academic breaks)",
      groupSize: "20–30 faculty",
    },
  },
  {
    slug: "academic-research-exposure-visits",
    title: "Academic & Research Exposure Visits",
    description: "Visits to research institutions and universities for faculty to observe academic best practices first-hand.",
    longDescription:
      "The visit can be structured to seed an actual future research collaboration, not just a study tour, when that's what the host institution wants out of it.",
    audience: "higher-education",
    higherEdCategory: "faculty-programs",
    portfolioCategories: ["future-stem-exploration"],
    formats: ["multi-day"],
    faqs: [
      {
        question: "What's the intended outcome?",
        answer: "Bringing back updated pedagogical or research practices to their home institution.",
      },
      {
        question: "Can this be tied to a research collaboration?",
        answer: "Yes, visits can be structured to seed future research partnerships.",
      },
    ],
    metadata: {
      recommendedFor: "Faculty members",
      suggestedLength: "2–3 days",
      recommendedMonths: "May–Jun & Dec (academic breaks)",
      groupSize: "15–25 faculty",
    },
  },
  {
    slug: "international-faculty-immersion-programs",
    title: "International Faculty Immersion Programs",
    description: "International trips giving faculty direct exposure to global education systems and teaching practices.",
    longDescription:
      "Itineraries are tailored by discipline where possible, covering multiple institutions across the trip so faculty see more than one system's version of how we teach this.",
    audience: "higher-education",
    higherEdCategory: "faculty-programs",
    portfolioCategories: ["global-international-immersion"],
    formats: ["multi-day", "international"],
    faqs: [
      {
        question: "How long do these programs typically run?",
        answer: "Usually 5–10 days, covering multiple institutions.",
      },
      {
        question: "Is this open to all departments?",
        answer: "Yes, itineraries are tailored by discipline where possible.",
      },
    ],
    metadata: {
      recommendedFor: "Faculty members, all departments",
      suggestedLength: "5–10 days",
      recommendedMonths: "May–Jun & Dec (academic breaks)",
      groupSize: "10–20 faculty",
    },
  },
  {
    slug: "wellness-spiritual-retreats",
    title: "Wellness & Spiritual Retreats",
    description: "Retreats focused on faculty wellbeing, mindfulness, and stress management.",
    longDescription:
      "Both individual and whole-department formats are available, built around guided mindfulness, light physical activity and reflective workshops.",
    audience: "higher-education",
    higherEdCategory: "faculty-programs",
    portfolioCategories: ["culture-wellness-social-development"],
    formats: ["multi-day", "residential"],
    faqs: [
      {
        question: "What activities are typically included?",
        answer: "Guided mindfulness sessions, light physical activity, and reflective workshops.",
      },
      {
        question: "Is this only for individual faculty or whole departments?",
        answer: "Both formats are available depending on institutional need.",
      },
    ],
    metadata: {
      recommendedFor: "Faculty — individual or department-wide",
      suggestedLength: "2–3 days",
      recommendedMonths: "Oct – Mar",
      groupSize: "15–30 faculty",
    },
  },
  {
    slug: "team-building-programs",
    title: "Team Building Programs",
    description: "Activities designed to strengthen collaboration, trust, and culture within faculty teams.",
    longDescription:
      "A mix of structured team challenges, workshops and informal bonding sessions, sized to run comfortably in 1–2 days.",
    audience: "higher-education",
    higherEdCategory: "faculty-programs",
    portfolioCategories: ["leadership-discipline-character"],
    formats: ["one-day", "multi-day", "residential"],
    faqs: [
      {
        question: "What kind of activities are used?",
        answer: "A mix of structured team challenges, workshops, and informal bonding sessions.",
      },
      {
        question: "How long does a typical program run?",
        answer: "Usually 1–2 days.",
      },
    ],
    metadata: {
      recommendedFor: "Faculty teams",
      suggestedLength: "1–2 days",
      recommendedMonths: "Oct – Mar",
      groupSize: "20–40 faculty",
    },
  },

  // ---- School Programs (flat, 12) ----
  {
    slug: "stem-tours",
    title: "STEM Tours",
    description:
      "Visits to science and technology centres, labs, and STEM-focused institutions designed to spark curiosity in science and technology.",
    longDescription:
      "Most STEM Tours build in an interactive or demonstration component, so students aren't just looking through glass at an exhibit — several of our routes below run as multi-city circuits for deeper, comparative exposure.",
    audience: "school",
    portfolioCategories: ["future-stem-exploration"],
    formats: ["one-day", "multi-day"],
    faqs: [
      {
        question: "What age group is this best suited for?",
        answer: "Adaptable across middle and senior school, with content pitched by grade level.",
      },
      {
        question: "Are hands-on activities included?",
        answer: "Yes, most STEM tours include an interactive or demonstration component.",
      },
    ],
    metadata: {
      recommendedFor: "Grades 6–12",
      suggestedLength: "1 day (single-site) or 2–3 days (circuit)",
      recommendedMonths: "Oct – Mar",
      groupSize: "30–45 students",
    },
    featuredExperiences: [
      {
        name: "Pune–Lonavala",
        blurb: "Research institutes and engineering campuses paired with the hill terrain around Lonavala.",
      },
      {
        name: "Bengaluru–Mysuru",
        blurb: "India's tech capital alongside Mysuru's science and planetarium circuit.",
      },
      {
        name: "Chennai–Sriharikota",
        blurb: "Space research and satellite launch infrastructure on the Tamil Nadu coast.",
      },
      {
        name: "Jaipur–Bhadla–Jaisalmer",
        blurb: "Solar power infrastructure at scale, from Bhadla's solar park to the Thar's desert edge.",
      },
      {
        name: "Indore–Pithampur–Ujjain",
        blurb: "Manufacturing and industrial clusters around Madhya Pradesh's auto and pharma hub.",
      },
      {
        name: "Ahmedabad–Sanand–Kevadia",
        blurb: "Automotive manufacturing at Sanand paired with large-scale infrastructure at Kevadia.",
      },
      {
        name: "Kochi–Munnar–Thekkady–Alleppey",
        blurb: "Backwater ecology and hill-station science across Kerala's western ghats.",
      },
      {
        name: "Coimbatore–Siruvani",
        blurb: "Manufacturing and precision-engineering exposure with the Siruvani hills as backdrop.",
      },
    ],
  },
  {
    slug: "boot-camps-discipline-programs",
    title: "Boot Camps & Discipline Programs",
    description: "Structured, often military-style camps that build discipline, routine, and resilience in students.",
    longDescription:
      "Activity levels are calibrated to the age group and adjusted for fitness needs, so the early routines and physical drills stay demanding without being unsafe.",
    audience: "school",
    portfolioCategories: ["leadership-discipline-character"],
    formats: ["multi-day", "residential"],
    faqs: [
      {
        question: "What does a typical day look like?",
        answer: "Early routines, physical drills, and structured group activities under trained instructors.",
      },
      {
        question: "Is this physically demanding?",
        answer: "Activity levels are calibrated to the age group and adjusted for fitness needs.",
      },
    ],
    metadata: {
      recommendedFor: "Grades 6–12",
      suggestedLength: "2–4 days",
      recommendedMonths: "Oct – Mar",
      groupSize: "30–50 students",
    },
  },
  {
    slug: "experiential-adventure-learning",
    title: "Experiential & Adventure Learning",
    description: "Outdoor, activity-based learning that combines adventure elements with structured experiential lessons.",
    longDescription:
      "Every activity is instructor-led and beginner-friendly, so age-appropriate options like rope courses, trekking or team challenges work even with no prior experience.",
    audience: "school",
    portfolioCategories: ["adventure-experiential-learning"],
    formats: ["multi-day", "residential"],
    faqs: [
      {
        question: "What kind of adventure activities are included?",
        answer: "Age-appropriate options such as rope courses, trekking, or team-based outdoor challenges.",
      },
      {
        question: "Is prior experience needed?",
        answer: "No, all activities are instructor-led and beginner-friendly.",
      },
    ],
    metadata: {
      recommendedFor: "Grades 6–12",
      suggestedLength: "2–3 days",
      recommendedMonths: "Oct – Mar",
      groupSize: "30–45 students",
    },
  },
  {
    slug: "border-patriotism-tours",
    title: "Border & Patriotism Tours",
    description:
      "Trips to border areas and defence-related sites that build patriotism, geographic understanding, and awareness of national security.",
    longDescription:
      "Special permissions are arranged by our team as part of the program, with content and depth adjusted for the specific grade level involved.",
    audience: "school",
    portfolioCategories: ["culture-wellness-social-development"],
    formats: ["multi-day"],
    faqs: [
      {
        question: "Are special permissions needed?",
        answer: "Yes, and these are arranged by our team as part of the program.",
      },
      {
        question: "Is this age-appropriate for younger students?",
        answer: "Content and depth are adjusted for the specific grade level involved.",
      },
    ],
    metadata: {
      recommendedFor: "Grades 8–12",
      suggestedLength: "2–4 days",
      recommendedMonths: "Oct – Mar",
      groupSize: "30–45 students",
    },
  },
  {
    slug: "spiritual-wellness-retreats",
    title: "Spiritual & Wellness Retreats",
    description: "Retreats focused on mindfulness, wellness, and inner development, tailored for school-age students.",
    longDescription:
      "Activities are adapted by age to stay engaging and appropriate, built around guided mindfulness or breathing exercises, light physical activity, and reflective discussions.",
    audience: "school",
    portfolioCategories: ["culture-wellness-social-development"],
    formats: ["one-day", "multi-day"],
    faqs: [
      {
        question: "What does a session typically include?",
        answer: "Guided mindfulness or breathing exercises, light physical activity, and reflective discussions.",
      },
      {
        question: "Is this suitable for all age groups?",
        answer: "Yes, activities are adapted by age to keep them engaging and appropriate.",
      },
    ],
    metadata: {
      recommendedFor: "Grades 6–12",
      suggestedLength: "1–2 days",
      recommendedMonths: "Oct – Mar",
      groupSize: "30–45 students",
    },
  },
  {
    slug: "career-exposure-industry-connect",
    title: "Career Exposure & Industry Connect",
    description: "Early exposure to different industries and careers through visits and interactions with working professionals.",
    longDescription:
      "Typically introduced from middle school onward, with a site visit or talk followed by an interactive Q&A, and depth increasing at senior levels.",
    audience: "school",
    portfolioCategories: ["career-industry-exposure"],
    formats: ["one-day"],
    faqs: [
      {
        question: "At what age should this start?",
        answer: "Typically introduced from middle school onward, with depth increasing at senior levels.",
      },
      {
        question: "What does a typical session look like?",
        answer: "A site visit or talk followed by an interactive Q&A with professionals.",
      },
    ],
    metadata: {
      recommendedFor: "Grades 8–12",
      suggestedLength: "1 day",
      recommendedMonths: "Oct – Mar",
      groupSize: "30–45 students",
    },
  },
  {
    slug: "applied-skill-outdoor-learning",
    title: "Applied Skill & Outdoor Learning",
    description: "Hands-on skill-building activities set in outdoor learning environments.",
    longDescription:
      "Practical, age-appropriate skills — basic craft, teamwork tasks, or nature-based learning — that can be aligned with specific classroom themes on request.",
    audience: "school",
    portfolioCategories: ["adventure-experiential-learning"],
    formats: ["one-day", "multi-day"],
    faqs: [
      {
        question: "What kind of skills are covered?",
        answer: "Practical, age-appropriate skills such as basic craft, teamwork tasks, or nature-based learning.",
      },
      {
        question: "Is this curriculum-linked?",
        answer: "It can be aligned with specific classroom themes on request.",
      },
    ],
    metadata: {
      recommendedFor: "Grades 4–10",
      suggestedLength: "1 day",
      recommendedMonths: "Oct – Mar",
      groupSize: "30–45 students",
    },
  },
  {
    slug: "university-exposure-programs",
    title: "University Exposure Programs",
    description: "Visits to universities and colleges that help school students understand higher-education pathways early.",
    longDescription:
      "Campus tours, interactions with current students, and an overview of course options — primarily aimed at senior school students beginning to weigh higher-education choices.",
    audience: "school",
    portfolioCategories: ["university-future-pathways"],
    formats: ["one-day", "multi-day"],
    faqs: [
      {
        question: "Which grade levels benefit most?",
        answer: "Primarily senior school students beginning to think about higher education choices.",
      },
      {
        question: "What's included in a typical visit?",
        answer: "Campus tours, interactions with current students, and an overview of course options.",
      },
    ],
    metadata: {
      recommendedFor: "Grades 10–12",
      suggestedLength: "1 day",
      recommendedMonths: "Oct – Mar",
      groupSize: "30–45 students",
    },
  },
  {
    slug: "industrial-visits-school",
    title: "Industrial Visits",
    description:
      "Age-appropriate visits to industries and factories that give school students early exposure to manufacturing and business operations.",
    longDescription:
      "A simplified walkthrough of processes, tailored to be engaging and easy to follow, with safety protocols suited specifically to younger visitors.",
    audience: "school",
    portfolioCategories: ["career-industry-exposure"],
    formats: ["one-day"],
    faqs: [
      {
        question: "Are these safe for school-age children?",
        answer: "Yes, visits follow strict safety protocols suited to younger visitors.",
      },
      {
        question: "What do students typically observe?",
        answer: "A simplified walkthrough of processes, tailored to be engaging and easy to follow.",
      },
    ],
    metadata: {
      recommendedFor: "Grades 6–10",
      suggestedLength: "1 day",
      recommendedMonths: "Oct – Mar",
      groupSize: "30–45 students",
    },
  },
  {
    slug: "day-excursions",
    title: "Day Excursions",
    description: "Single-day trips to educational or recreational destinations aligned with the school curriculum.",
    longDescription:
      "Destinations can be customised to the subject or theme the school wants to reinforce, running as a single school day including travel.",
    audience: "school",
    portfolioCategories: ["adventure-experiential-learning"],
    formats: ["one-day"],
    faqs: [
      {
        question: "How long do these trips run?",
        answer: "A single school day, including travel.",
      },
      {
        question: "Can destinations be customised?",
        answer: "Yes, based on the subject or theme the school wants to reinforce.",
      },
    ],
    metadata: {
      recommendedFor: "Grades 1–12",
      suggestedLength: "1 day",
      recommendedMonths: "Oct – Mar",
      groupSize: "30–50 students",
    },
  },
  {
    slug: "skill-development-programs-school",
    title: "Skill Development Programs",
    description: "Programs teaching practical, age-appropriate skills that go beyond the standard classroom curriculum.",
    longDescription:
      "Delivered as a single workshop or a structured multi-session module, ranging from basic life skills to introductory technical or creative skills by age group.",
    audience: "school",
    portfolioCategories: ["leadership-discipline-character"],
    formats: ["one-day", "multi-day"],
    faqs: [
      {
        question: "What kind of skills are taught?",
        answer: "Ranges from basic life skills to introductory technical or creative skills, based on age group.",
      },
      {
        question: "Is this a one-time program or ongoing?",
        answer: "Can be delivered as a single workshop or a structured multi-session module.",
      },
    ],
    metadata: {
      recommendedFor: "Grades 4–12",
      suggestedLength: "1 day (or a modular series)",
      recommendedMonths: "Oct – Mar",
      groupSize: "25–40 students",
    },
  },
  {
    slug: "global-immersion-programs-school",
    title: "Global Immersion Programs",
    description: "International trips that expose school students to global culture and education systems.",
    longDescription:
      "A mix of school and university visits, cultural experiences, and guided sightseeing, primarily for senior school students and subject to travel and guardian requirements.",
    audience: "school",
    portfolioCategories: ["global-international-immersion"],
    formats: ["multi-day", "international"],
    faqs: [
      {
        question: "What age group is this suited for?",
        answer: "Primarily senior school students, subject to travel and guardian requirements.",
      },
      {
        question: "What does the itinerary typically include?",
        answer: "A mix of school/university visits, cultural experiences, and guided sightseeing.",
      },
    ],
    metadata: {
      recommendedFor: "Grades 10–12 (guardian consent required)",
      suggestedLength: "7–10 days",
      recommendedMonths: "May–Jun & Dec–Jan (school breaks)",
      groupSize: "20–30 students",
    },
  },
];

// ---------------------------------------------------------------------------
// Lookup helpers — every page queries the catalog through these so the
// two browsing paths and the filter bar stay in sync.
// ---------------------------------------------------------------------------

export function getPortfolioCategoryBySlug(slug: string): PortfolioCategory | undefined {
  return portfolioCategories.find((c) => c.slug === slug);
}

export function getHigherEdCategoryBySlug(slug: string): HigherEdCategory | undefined {
  return higherEdCategories.find((c) => c.slug === slug);
}

export function getProgrammeBySlug(slug: string): Programme | undefined {
  return programmes.find((p) => p.slug === slug);
}

export function getProgrammesByPortfolioCategory(slug: PortfolioCategorySlug): Programme[] {
  return programmes.filter((p) => p.portfolioCategories.includes(slug));
}

export function getProgrammesByHigherEdCategory(slug: HigherEdCategorySlug): Programme[] {
  return programmes.filter((p) => p.higherEdCategory === slug);
}

export function getSchoolProgrammes(): Programme[] {
  return programmes.filter((p) => p.audience === "school");
}

export function getHigherEdProgrammes(): Programme[] {
  return programmes.filter((p) => p.audience === "higher-education");
}

/** Which audience(s) a Portfolio category actually serves, derived from its tagged programmes. */
export function getPortfolioCategoryAudienceLabel(slug: PortfolioCategorySlug): string {
  const tagged = getProgrammesByPortfolioCategory(slug);
  const hasSchool = tagged.some((p) => p.audience === "school");
  const hasHigherEd = tagged.some((p) => p.audience === "higher-education");
  if (hasSchool && hasHigherEd) return "School & Higher Ed";
  if (hasSchool) return "School";
  if (hasHigherEd) return "Higher Education";
  return "All Institutions";
}
