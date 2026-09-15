"use client";

import { motion, useAnimationControls, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type TouchEvent as ReactTouchEvent,
} from "react";

import { easeOutExpo } from "./motion";
import { HERO_IMAGE_HEIGHT, HERO_IMAGE_WIDTH, heroSlides, type HeroSlide } from "@/data/hero";

const SLIDE_MS = 6500;
const SWIPE_THRESHOLD = 48;
const HERO_ASPECT_RATIO = `${HERO_IMAGE_WIDTH} / ${HERO_IMAGE_HEIGHT}`;

/** A gentle double-wave, tiled once per slide — the hand-drawn "current"
 * motif, scaled down into a progress-bar segment. Shared by every
 * slide's dim track + bright fill path in the control strip. */
const WAKE_SEGMENT_PATH = "M1 8 C15 1 20 14 34 8 C48 1 53 14 67 8 C81 1 86 14 99 8";

type HeroSlideMediaProps = {
  slide: HeroSlide;
  isActive: boolean;
  isFirst: boolean;
  reduce: boolean;
};

/**
 * The photo itself, plus a slow 2–3% Ken-Burns drift while active.
 * Driven by imperative animation controls rather than a remounting key,
 * so the <Image> underneath never remounts and never re-fetches.
 *
 * Always `object-fit: contain`, never `cover`: every one of these
 * graphics runs its own baked-in text edge to edge (checked against
 * each source image — none has a safe margin top or bottom), so no
 * focal point can crop one without cutting real text. The stage this
 * sits in is sized to the image's own aspect ratio (see HeroCarousel
 * below) with no height cap, so `contain` fills it edge to edge with
 * zero letterbox in every case, not just the common one — `slide.bg`
 * is only ever a brief flash-of-load background, never a visible bar.
 */
function HeroSlideMedia({ slide, isActive, isFirst, reduce }: HeroSlideMediaProps) {
  const controls = useAnimationControls();

  useEffect(() => {
    if (!isActive) return;
    controls.set({ scale: 1 });
    if (reduce) return;
    controls.start({
      scale: 1.03,
      transition: { duration: SLIDE_MS / 1000 + 0.9, ease: "linear" },
    });
  }, [isActive, reduce, controls]);

  return (
    <motion.div
      className="absolute inset-0"
      animate={controls}
      style={{ willChange: "transform", backgroundColor: slide.bg }}
    >
      <Image src={slide.src} alt={slide.alt} fill priority={isFirst} sizes="100vw" className="object-contain" />
    </motion.div>
  );
}

type HeroWakeSegmentProps = {
  slide: HeroSlide;
  index: number;
  isActive: boolean;
  isPaused: boolean;
  tick: number;
  onSelect: (index: number) => void;
};

/** One slide's stretch of the wake-line progress bar: a dim track plus,
 * only while active, a bright fill that draws itself in over the
 * slide's dwell time — remounted (via `tick`) each time this slide
 * comes up again so the draw-in always restarts from empty. Doubles as
 * that slide's manual indicator/button. */
function HeroWakeSegment({ slide, index, isActive, isPaused, tick, onSelect }: HeroWakeSegmentProps) {
  const label = slide.alt.split(" — ").pop();
  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      aria-label={`Go to slide ${index + 1} of ${heroSlides.length}: ${label}`}
      aria-current={isActive ? "true" : undefined}
      className="group relative h-4 flex-1 focus-visible:outline-none"
    >
      <svg viewBox="0 0 100 14" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d={WAKE_SEGMENT_PATH} stroke="#fdfdfd" strokeOpacity={0.32} strokeWidth={2.5} fill="none" strokeLinecap="round" />
        {isActive ? (
          <path
            key={tick}
            d={WAKE_SEGMENT_PATH}
            pathLength={1}
            stroke="url(#hero-carousel-wake-gradient)"
            strokeWidth={2.75}
            fill="none"
            strokeLinecap="round"
            className={`hero-carousel-wake-fill${isPaused ? " is-paused" : ""}`}
            style={{ animationDuration: `${SLIDE_MS}ms` }}
          />
        ) : null}
      </svg>
      <span className="absolute inset-x-0 -bottom-1.5 h-px scale-x-0 bg-kashti-gold transition-transform duration-200 group-hover:scale-x-100" />
    </button>
  );
}

/**
 * Full-bleed cinematic image carousel that opens the homepage, above the
 * existing (untouched) Hero section. Every slide is a fully designed
 * graphic with its own baked-in typography, so this component adds no
 * text of its own. The stage is sized to the images' own aspect ratio
 * (all five share one native size) so `object-fit: contain` fills it
 * edge to edge with no letterbox in the common case, and all
 * interactive chrome lives in a reserved control strip flush against
 * the bottom of the image, never on top of it.
 */
export function HeroCarousel() {
  const reduce = !!useReducedMotion();
  const total = heroSlides.length;

  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [tick, setTick] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(false);
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0, 1 % total]));

  const isPaused = isHovered || isFocused || isTouching || isTabHidden;
  const touchStartX = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const stageScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 0.94]);
  const stageOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  useEffect(() => {
    const handleVisibility = () => setIsTabHidden(document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const next = ((index % total) + total) % total;
      setActiveIndex(next);
      setTick((t) => t + 1);
      setLoaded((prev) => {
        const upcoming = (next + 1) % total;
        if (prev.has(upcoming)) return prev;
        const nextLoaded = new Set(prev);
        nextLoaded.add(upcoming);
        return nextLoaded;
      });
    },
    [total],
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setTimeout(() => goTo(activeIndex + 1), SLIDE_MS);
    return () => clearTimeout(timer);
  }, [activeIndex, isPaused, goTo]);

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  const handleTouchStart = (event: ReactTouchEvent<HTMLElement>) => {
    setIsTouching(true);
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: ReactTouchEvent<HTMLElement>) => {
    setIsTouching(false);
    if (touchStartX.current === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    touchStartX.current = null;
    if (delta > SWIPE_THRESHOLD) goPrev();
    else if (delta < -SWIPE_THRESHOLD) goNext();
  };

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="Kashti Educare highlights"
      className="relative w-full overflow-hidden bg-kashti-bg-dark"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onKeyDown={handleKeyDown}
    >
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient id="hero-carousel-wake-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--kashti-green-soft)" />
            <stop offset="0.5" stopColor="var(--kashti-gold-soft)" />
            <stop offset="1" stopColor="var(--kashti-gold)" />
          </linearGradient>
        </defs>
      </svg>

      <div className="flex flex-col">
        <motion.div
          className="relative w-full overflow-hidden"
          style={{ scale: stageScale, opacity: stageOpacity, aspectRatio: HERO_ASPECT_RATIO }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {heroSlides.map((slide, index) => {
            if (!loaded.has(index)) return null;
            const isActive = index === activeIndex;
            return (
              <motion.div
                key={slide.id}
                className="absolute inset-0"
                style={{ zIndex: isActive ? 1 : 0 }}
                initial={false}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: reduce ? 0.4 : 1.05, ease: easeOutExpo }}
                aria-hidden={!isActive}
              >
                <HeroSlideMedia slide={slide} isActive={isActive} isFirst={index === 0} reduce={reduce} />
              </motion.div>
            );
          })}

          <p className="sr-only" role="status" aria-live="polite">
            {`Slide ${activeIndex + 1} of ${total}`}
          </p>
        </motion.div>

        <div className="flex shrink-0 items-center gap-3 bg-kashti-green/92 px-4 py-3 backdrop-blur-sm sm:gap-4 sm:px-6 sm:py-4">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous slide"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kashti-gold focus-visible:ring-offset-2 focus-visible:ring-offset-kashti-green sm:h-10 sm:w-10"
          >
            <ChevronLeft size={18} strokeWidth={2.25} />
          </button>

          <div className="flex flex-1 items-center gap-2 sm:gap-3">
            {heroSlides.map((slide, index) => (
              <HeroWakeSegment
                key={slide.id}
                slide={slide}
                index={index}
                isActive={index === activeIndex}
                isPaused={isPaused}
                tick={tick}
                onSelect={goTo}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next slide"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kashti-gold focus-visible:ring-offset-2 focus-visible:ring-offset-kashti-green sm:h-10 sm:w-10"
          >
            <ChevronRight size={18} strokeWidth={2.25} />
          </button>
        </div>
      </div>
    </section>
  );
}
