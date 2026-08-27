/**
 * Partner logos and activity photos, sourced from the WEBSITE IMAGES drop
 * at the repo root (hero images handled separately; one folder —
 * "INSIGHTFUL CREATIVE INSPIRATION" — was excluded entirely: those are
 * designed marketing graphics with stock photography, not real photos of
 * Kashti programmes, so including them in a gallery meant to show real
 * proof-of-work would misrepresent them as documentary photos).
 */

export type PartnerLogo = { src: string; alt: string };

export const partnerLogos: PartnerLogo[] = [
  { src: "/images/logos/ministry-of-tourism.png", alt: "Ministry of Tourism, Government of India" },
  { src: "/images/logos/dpiit.png", alt: "DPIIT — Department for Promotion of Industry and Internal Trade" },
  { src: "/images/logos/incredible-india.png", alt: "Incredible India" },
  { src: "/images/logos/startup-india.jpeg", alt: "Startup India" },
  { src: "/images/logos/msme.jpeg", alt: "MSME — Ministry of Micro, Small and Medium Enterprises" },
  { src: "/images/logos/du.jpeg", alt: "University of Delhi" },
  { src: "/images/logos/ggsipu.jpeg", alt: "Guru Gobind Singh Indraprastha University" },
  { src: "/images/logos/opjgu.jpeg", alt: "O.P. Jindal Global University" },
  { src: "/images/logos/iilm.jpeg", alt: "IILM" },
  { src: "/images/logos/iittm.png", alt: "IITTM — Indian Institute of Tourism and Travel Management" },
  { src: "/images/logos/msit.jpeg", alt: "Maharaja Surajmal Institute of Technology" },
  { src: "/images/logos/icosa.png", alt: "ICOSA — School Accreditation Worldwide" },
  { src: "/images/logos/ytf.png", alt: "Young Thinkers' Forum" },
  { src: "/images/logos/delhi-tourism.png", alt: "Delhi Tourism" },
  { src: "/images/logos/sewadham.png", alt: "Sewadham Ashram" },
  { src: "/images/logos/ncn-magazine.jpeg", alt: "National Computrade News (NCN)" },
  { src: "/images/logos/neon-light-pictures.jpeg", alt: "Neon Light Pictures" },
  { src: "/images/logos/futred.png", alt: "Futred" },
];

export type GalleryPhoto = { src: string; alt: string; width: number; height: number };

export const galleryPhotos: GalleryPhoto[] = [
  { src: "/images/gallery/expedition-group-1.jpg", alt: "Kashti group at the Sitabani buffer zone, Corbett National Park", width: 1170, height: 1406 },
  { src: "/images/gallery/expedition-group-2.jpg", alt: "Kashti group at the Sitabani buffer zone, Corbett National Park", width: 1170, height: 645 },
  { src: "/images/gallery/expedition-group-3.jpg", alt: "Kashti group at the Sitabani buffer zone, Corbett National Park", width: 1170, height: 629 },
  { src: "/images/gallery/field-moment-1.jpg", alt: "Kashti group at the Sitabani buffer zone, Corbett National Park", width: 1536, height: 2048 },
  { src: "/images/gallery/field-moment-2.jpg", alt: "Kashti group at the Sitabani buffer zone, Corbett National Park", width: 1536, height: 2048 },
  { src: "/images/gallery/field-moment-3.jpg", alt: "Kashti group at the Sitabani buffer zone, Corbett National Park", width: 2048, height: 1536 },
  { src: "/images/gallery/field-moment-4.jpg", alt: "Kashti team at an evening community gathering", width: 2048, height: 1536 },
  { src: "/images/gallery/giving-back-to-society.jpeg", alt: "Kashti team members at a community service initiative", width: 800, height: 597 },
  { src: "/images/gallery/iilm-collab.jpeg", alt: "Kashti in collaboration discussions at IILM", width: 2048, height: 1152 },
  { src: "/images/gallery/iilm-discussion.jpeg", alt: "A discussion session at IILM", width: 1280, height: 2274 },
  { src: "/images/gallery/iilm-session.jpeg", alt: "A programme session at IILM", width: 2048, height: 1152 },
  { src: "/images/gallery/noida-office-1.jpeg", alt: "Kashti Educare's Noida office", width: 2048, height: 1536 },
  { src: "/images/gallery/noida-office-2.jpeg", alt: "Kashti Educare's Noida office", width: 1152, height: 1536 },
  { src: "/images/gallery/noida-office-3.jpeg", alt: "Kashti Educare's Noida office", width: 1111, height: 1536 },
  { src: "/images/gallery/noida-office-4.jpeg", alt: "Kashti Educare's Noida office", width: 2048, height: 1536 },
  { src: "/images/gallery/opj-visit-1.jpeg", alt: "A visit to O.P. Jindal Global University", width: 1280, height: 960 },
  { src: "/images/gallery/opj-visit-2.jpeg", alt: "A visit to O.P. Jindal Global University", width: 960, height: 1280 },
  { src: "/images/gallery/leadership-session.jpeg", alt: "A leadership and mentorship session", width: 960, height: 1280 },
  { src: "/images/gallery/isro-visit-1.jpeg", alt: "A visit to ISRO — Indian Space Research Organisation", width: 1280, height: 2275 },
  { src: "/images/gallery/isro-visit-2.jpeg", alt: "A visit to ISRO — Indian Space Research Organisation", width: 1280, height: 2275 },
  { src: "/images/gallery/shimla-expedition.jpeg", alt: "An expedition to Shimla", width: 800, height: 1340 },
  { src: "/images/gallery/school-leaders-summit.jpeg", alt: "Kashti at the School Leaders' Summit", width: 1280, height: 1700 },
  { src: "/images/gallery/ministry-award.jpeg", alt: "Receiving recognition from a government ministry", width: 800, height: 360 },
  { src: "/images/gallery/msit-visit.jpeg", alt: "A visit to Maharaja Surajmal Institute of Technology", width: 1080, height: 1920 },
  { src: "/images/gallery/muni-international-1.jpeg", alt: "A session with Muni International", width: 800, height: 600 },
  { src: "/images/gallery/muni-international-2.jpeg", alt: "A session with Muni International", width: 1156, height: 867 },
  { src: "/images/gallery/nepal-mp-visit.jpeg", alt: "A visit with a Nepal Member of Parliament, hosted by Muni International", width: 800, height: 600 },
  { src: "/images/gallery/ntpc-activity.jpeg", alt: "An activity session at NTPC", width: 1204, height: 1600 },
  { src: "/images/gallery/scrap-uncle-meeting.jpeg", alt: "A meeting with Scrap Uncle", width: 963, height: 1280 },
  { src: "/images/gallery/youth-buzz.jpeg", alt: "A Youth Buzz programme session", width: 678, height: 452 },
];
