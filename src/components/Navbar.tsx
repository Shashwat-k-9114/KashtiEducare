"use client";

import { motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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

  // Close the mobile menu whenever navigation completes. Adjusting state
  // during render (rather than in an effect) in response to a changed prop
  // is the pattern React recommends for this — see "Storing information
  // from previous renders" in the React docs.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // Lock body scroll while the full-screen mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

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

        <ul className="hidden items-center gap-8 md:flex">
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
          className="hidden items-center gap-1.5 rounded-full bg-kashti-gold px-5 py-2.5 text-sm font-semibold text-kashti-charcoal shadow-[0_4px_16px_-4px_rgba(238,178,80,0.5)] md:inline-flex"
        >
          Design an Experience
          <ArrowRight size={15} strokeWidth={2.25} />
        </motion.a>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-kashti-border-light text-kashti-charcoal md:hidden"
        >
          <Menu size={20} strokeWidth={2} />
        </button>
      </nav>

      {open ? (
          // Plain conditional mount/unmount (no AnimatePresence): this is a
          // full-screen, click-capturing overlay, so it must disappear from
          // the DOM the instant `open` goes false — an exit animation that
          // fails to complete (e.g. if the completion callback doesn't fire)
          // would otherwise leave an invisible layer blocking every tap.
          <div className="fixed inset-0 z-[60] flex flex-col bg-kashti-bg-light md:hidden">
            <div className="flex items-center justify-between border-b border-kashti-border-light px-6 py-3">
              <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
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
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-kashti-border-light text-kashti-charcoal"
              >
                <X size={20} strokeWidth={2} />
              </button>
            </div>

            <motion.ul
              className="flex flex-1 flex-col items-center justify-center gap-2"
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
                    onClick={() => setOpen(false)}
                    className="font-display px-4 py-2.5 text-2xl font-semibold text-kashti-charcoal transition-colors hover:text-kashti-green-deep"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <div className="border-t border-kashti-border-light px-6 py-6">
              <a
                href="/contact?intent=design-experience"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-1.5 rounded-full bg-kashti-gold px-5 py-3.5 text-sm font-semibold text-kashti-charcoal shadow-[0_4px_16px_-4px_rgba(238,178,80,0.5)]"
              >
                Design an Experience
                <ArrowRight size={15} strokeWidth={2.25} />
              </a>
            </div>
          </div>
      ) : null}
    </motion.header>
  );
}
