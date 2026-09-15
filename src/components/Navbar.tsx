"use client";

import { motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { easeOutExpo, tapHover } from "./motion";

const navLinks = [
  { label: "Why Kashti", href: "/why-kashti" },
  { label: "Programs", href: "/programs" },
  { label: "Experiences", href: "/experiences" },
  { label: "Formats", href: "/formats" },
  { label: "Institutions", href: "/institutions" },
  { label: "Partners", href: "/partners" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const drawerId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close the mobile menu whenever navigation completes. Adjusting state
  // during render (rather than in an effect) in response to a changed prop
  // is the pattern React recommends for this — see "Storing information
  // from previous renders" in the React docs.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  const close = useCallback(() => setOpen(false), []);

  // Lock body scroll while the full-screen mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Move focus into the drawer on open, and back to the button that
  // triggered it on close — same pattern Lightbox.tsx already uses.
  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
    const trigger = menuButtonRef.current;
    return () => {
      trigger?.focus();
    };
  }, [open]);

  // Escape closes the drawer; Tab/Shift+Tab wrap focus inside it while open.
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key === "Tab") {
        const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, close]);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-kashti-border-light bg-kashti-bg-light/90 backdrop-blur"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3 lg:px-10">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.jpeg"
            alt="Kashti Educare"
            width={40}
            height={40}
            className="h-9 w-9 rounded-md object-cover"
            priority
          />
          <span className="font-display text-lg font-semibold text-kashti-charcoal">
            Kashti<span className="text-kashti-gold-deep">.</span>{" "}
            <span className="text-sm font-normal text-kashti-charcoal/50">educare</span>
          </span>
        </Link>

        {/* All six links + the CTA need `lg` (1024px), not the default
            `md` (768px): measured, the inline nav's own content
            (logo + 6 links + CTA) overflows its row from ~768px up to
            ~830px — right where `md` would have switched it on — so the
            collapse point is pushed out to where there's actually room. */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="group relative inline-block text-sm text-kashti-charcoal/70 transition-colors duration-200 hover:text-kashti-charcoal"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-kashti-green transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </Link>
            </li>
          ))}
        </ul>

        <motion.a
          href="/contact?intent=design-experience"
          {...tapHover}
          className="hidden items-center gap-1.5 rounded-full bg-kashti-gold px-5 py-2.5 text-sm font-semibold text-kashti-charcoal shadow-[0_4px_16px_-4px_rgba(238,178,80,0.5)] lg:inline-flex"
        >
          Design an Experience
          <ArrowRight size={15} strokeWidth={2.25} />
        </motion.a>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls={drawerId}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-kashti-border-light text-kashti-charcoal lg:hidden"
        >
          <Menu size={20} strokeWidth={2} />
        </button>
      </nav>

      {/* Rendered via a portal straight onto <body>, not nested under this
          header: the header's own `backdrop-blur` establishes a CSS
          containing block for any `position: fixed` descendant, which
          silently shrank this drawer down to the header's own box instead
          of the viewport. Portaling out from under it is what actually
          fixes that — `open` can only ever be true once we're mounted on
          the client, so `document.body` is always available here. */}
      {open
        ? createPortal(
            <div
              id={drawerId}
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-0 z-[60] flex flex-col bg-kashti-bg-light lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-kashti-border-light px-6 py-3">
                <Link href="/" className="flex items-center gap-2" onClick={close}>
                  <Image
                    src="/logo.jpeg"
                    alt="Kashti Educare"
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-md object-cover"
                  />
                  <span className="font-display text-lg font-semibold text-kashti-charcoal">
                    Kashti<span className="text-kashti-gold-deep">.</span>
                  </span>
                </Link>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={close}
                  aria-label="Close menu"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-kashti-border-light text-kashti-charcoal"
                >
                  <X size={20} strokeWidth={2} />
                </button>
              </div>

              <motion.ul
                className="flex flex-1 flex-col items-center justify-center gap-2 overflow-y-auto"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
              >
                {navLinks.map((link) => (
                  <motion.li
                    key={link.label}
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: easeOutExpo } },
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={close}
                      className="font-display flex min-h-11 items-center px-4 py-2.5 text-2xl font-semibold text-kashti-charcoal transition-colors hover:text-kashti-green-deep"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="border-t border-kashti-border-light px-6 py-6">
                <a
                  href="/contact?intent=design-experience"
                  onClick={close}
                  className="flex min-h-11 w-full items-center justify-center gap-1.5 rounded-full bg-kashti-gold px-5 py-3.5 text-sm font-semibold text-kashti-charcoal shadow-[0_4px_16px_-4px_rgba(238,178,80,0.5)]"
                >
                  Design an Experience
                  <ArrowRight size={15} strokeWidth={2.25} />
                </a>
              </div>
            </div>,
            document.body,
          )
        : null}
    </motion.header>
  );
}
