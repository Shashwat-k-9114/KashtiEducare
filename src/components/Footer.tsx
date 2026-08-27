"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal, StaggerGrid, StaggerItem, tapHover } from "./motion";

const exploreLinks = [
  { label: "Why Kashti", href: "/why-kashti" },
  { label: "Programs", href: "/programs" },
  { label: "Experiences", href: "/experiences" },
  { label: "Formats", href: "/formats" },
  { label: "Institutions", href: "/institutions" },
  { label: "Partners", href: "/partners" },
];

export function Footer() {
  // Intentional exception: kept dark (with StatementBanner) as the page's
  // two anchor points, bookending the otherwise light-themed sections.
  return (
    <footer className="border-t border-white/10 bg-kashti-bg-dark px-6 pt-16 pb-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <StaggerGrid className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          <StaggerItem>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.jpeg"
                alt="Kashti Educare"
                width={36}
                height={36}
                className="h-9 w-9 rounded-md object-cover"
              />
              <span className="font-display text-lg font-semibold text-white">
                Kashti<span className="text-kashti-gold">.</span>{" "}
                <span className="text-sm font-normal text-white/50">educare</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              Preparing learners for the world beyond the classroom: real
              world, real learning, real impact.
            </p>
          </StaggerItem>

          <StaggerItem>
            <h4 className="font-mono-label text-xs tracking-widest text-white/40 uppercase">
              Explore
            </h4>
            <ul className="mt-4 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-kashti-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem>
            <h4 className="font-mono-label text-xs tracking-widest text-white/40 uppercase">
              Framework
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li>See → Build → Become</li>
              <li>Orient → Immerse → Build → Transform</li>
            </ul>
          </StaggerItem>

          <StaggerItem>
            <h4 className="font-mono-label text-xs tracking-widest text-white/40 uppercase">
              Get in touch
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li>
                <a href="mailto:hello@kashtieducare.com" className="flex items-center gap-2 transition-colors hover:text-kashti-gold">
                  <Mail size={16} className="text-kashti-green-soft" strokeWidth={1.75} />
                  hello@kashtieducare.com
                </a>
              </li>
              <li>
                <a href="tel:+910000000000" className="flex items-center gap-2 transition-colors hover:text-kashti-gold">
                  <Phone size={16} className="text-kashti-green-soft" strokeWidth={1.75} />
                  +91 00000 00000
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-kashti-green-soft" strokeWidth={1.75} />
                India
              </li>
              <li>
                <Link href="/contact" className="text-kashti-gold-soft transition-colors hover:text-kashti-gold">
                  Contact form →
                </Link>
              </li>
            </ul>
          </StaggerItem>
        </StaggerGrid>

        <Reveal delay={0.1} className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Kashti Educare. All rights reserved.
          </p>
          <motion.a
            href="/contact?intent=design-experience"
            {...tapHover}
            className="group inline-flex items-center gap-1.5 rounded-full bg-kashti-gold px-5 py-2 text-xs font-semibold text-kashti-charcoal shadow-[0_4px_16px_-4px_rgba(238,178,80,0.5)]"
          >
            Design an Experience
            <ArrowRight size={13} strokeWidth={2.25} className="transition-transform duration-200 group-hover:translate-x-1" />
          </motion.a>
        </Reveal>
      </div>
    </footer>
  );
}
