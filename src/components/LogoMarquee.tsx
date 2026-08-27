import Image from "next/image";

import { partnerLogos } from "@/data/media";

/**
 * Continuous CSS-only marquee (no JS carousel library). The track is the
 * logo list rendered twice back to back; the keyframe in globals.css
 * scrolls it exactly 50% (one copy-width) left, which loops seamlessly.
 * `aria-hidden` on the duplicate copy keeps screen readers from announcing
 * every logo twice.
 */
export function LogoMarquee() {
  return (
    <div>
      <p className="font-mono-label text-center text-xs tracking-widest text-kashti-charcoal/45 uppercase">
        Institutions we&apos;ve worked with
      </p>
      <div
        className="marquee-container mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        role="group"
        aria-label="Institutions we've worked with"
      >
        <div className="marquee-track flex w-max items-center gap-12">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-12" aria-hidden={copy === 1}>
              {partnerLogos.map((logo) => (
                <div key={`${copy}-${logo.src}`} className="flex h-12 w-28 shrink-0 items-center justify-center">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={112}
                    height={48}
                    className="max-h-12 w-auto object-contain grayscale transition-all duration-300 hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
