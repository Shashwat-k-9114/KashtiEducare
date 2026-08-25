"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { tapHover } from "./motion";

const navLinks = [
  { label: "Why Kashti", href: "#impact" },
  { label: "Experiences", href: "#experience-model" },
  { label: "Formats", href: "#formats" },
  { label: "Institutions", href: "#ecosystem" },
  { label: "Partners", href: "#ecosystem" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-kashti-border-light bg-kashti-bg-light/90 backdrop-blur"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3 lg:px-10">
        <a href="#top" className="flex items-center gap-2">
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
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="group relative inline-block text-sm text-kashti-charcoal/70 transition-colors duration-200 hover:text-kashti-charcoal"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-kashti-green transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <motion.a
          href="#formats"
          {...tapHover}
          className="group inline-flex items-center gap-1.5 rounded-full bg-kashti-gold px-5 py-2.5 text-sm font-semibold text-kashti-charcoal shadow-[0_4px_16px_-4px_rgba(238,178,80,0.5)]"
        >
          Design an Experience
          <ArrowRight size={15} strokeWidth={2.25} className="transition-transform duration-200 group-hover:translate-x-1" />
        </motion.a>
      </nav>
    </motion.header>
  );
}
