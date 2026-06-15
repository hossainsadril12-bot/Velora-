"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const getNavItem = (scrolled: boolean) =>
  `font-sans font-bold text-[15px] hover:opacity-70 transition-colors duration-300 cursor-pointer ${
    scrolled ? "text-dark-green" : "text-cream"
  }`;

function Emblem({ className = "" }: { className?: string }) {
  // Decorative snowflake/sun motif between SAN and FELICE
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={i}
            x1="12"
            y1="12"
            x2="12"
            y2="2"
            transform={`rotate(${i * 45} 12 12)`}
          />
        ))}
      </g>
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [tastingOpen, setTastingOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };
  const fadeIn = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
  };

  const navItemClass = getNavItem(scrolled);
  const hamburgerClass = scrolled ? "bg-dark-green" : "bg-cream";

  return (
    <motion.header
      initial="hidden"
      animate="show"
      variants={container}
      className={`fixed top-0 left-0 z-[100] w-full border-b transition-colors duration-300 ${
        scrolled ? "bg-cream/95 backdrop-blur-sm border-dark-green/10" : "bg-transparent border-cream/15"
      }`}
    >
      <div className="mx-auto flex h-20 items-center justify-between px-6 lg:px-10">
        {/* LEFT */}
        <motion.nav variants={fadeIn} className="hidden items-center gap-6 lg:flex">
          <button className={`flex items-center gap-1 ${navItemClass}`}>
            En
            <Chevron />
          </button>
          <button className={`flex items-center gap-1.5 ${navItemClass}`}>
            <Search />
            Search
          </button>
          <Link href="#" className={`flex items-center gap-1 ${navItemClass}`}>
            E-Shop
            <Arrow />
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setTastingOpen(true)}
            onMouseLeave={() => setTastingOpen(false)}
          >
            <button className={`flex items-center gap-1 ${navItemClass}`}>
              Book A Tasting
              <Chevron />
            </button>
            {tastingOpen && (
              <div className={`absolute left-0 top-full w-64 border transition-colors duration-300 ${
                scrolled
                  ? "border-dark-green/10 bg-cream/95 text-dark-green backdrop-blur-sm"
                  : "border-cream/15 bg-dark-green/95 text-cream backdrop-blur-sm"
              }`}>
                <Link
                  href="#"
                  className={`block px-5 py-3 font-sans text-sm hover:bg-cream/10 transition-colors duration-300 ${
                    scrolled ? "text-dark-green hover:bg-dark-green/5" : "text-cream hover:bg-cream/10"
                  }`}
                >
                  San Felice Estate Tasting
                </Link>
                <Link
                  href="#"
                  className={`block px-5 py-3 font-sans text-sm hover:bg-cream/10 transition-colors duration-300 ${
                    scrolled ? "text-dark-green hover:bg-dark-green/5" : "text-cream hover:bg-cream/10"
                  }`}
                >
                  Campogiovanni Estate Tasting
                </Link>
              </div>
            )}
          </div>
        </motion.nav>

        {/* CENTER LOGO */}
        <motion.div
          variants={fadeIn}
          className={`flex flex-col items-center transition-colors duration-300 ${
            scrolled ? "text-dark-green" : "text-cream"
          }`}
        >
          <Link href="/" className="flex items-center gap-2 leading-none">
            <span className="font-serif text-2xl tracking-[0.3em] sm:text-3xl">SAN</span>
            <Emblem className="h-5 w-5" />
            <span className="font-serif text-2xl tracking-[0.3em] sm:text-3xl">FELICE</span>
          </Link>
          <span className={`mt-0.5 font-sans text-[9px] tracking-[3px] transition-colors duration-300 ${
            scrolled ? "text-dark-green/80" : "text-cream/80"
          }`}>
            TOSCANA A.D. 714
          </span>
        </motion.div>

        {/* RIGHT */}
        <motion.nav variants={fadeIn} className="hidden items-center gap-6 lg:flex">
          <Link href="#" className={navItemClass}>
            Borgo San Felice Resort
          </Link>
          <Link href="#" className={navItemClass}>
            Wine Estates
          </Link>
          <Link href="#" className={navItemClass}>
            Our Wines
          </Link>
          <button aria-label="Open menu" className="flex flex-col gap-[5px] cursor-pointer">
            <span className={`block h-[1.5px] w-6 transition-colors duration-300 ${hamburgerClass}`} />
            <span className={`block h-[1.5px] w-6 transition-colors duration-300 ${hamburgerClass}`} />
            <span className={`block h-[1.5px] w-6 transition-colors duration-300 ${hamburgerClass}`} />
          </button>
        </motion.nav>

        {/* Mobile hamburger only */}
        <button aria-label="Open menu" className="flex flex-col gap-[5px] lg:hidden cursor-pointer">
          <span className={`block h-[1.5px] w-6 transition-colors duration-300 ${hamburgerClass}`} />
          <span className={`block h-[1.5px] w-6 transition-colors duration-300 ${hamburgerClass}`} />
          <span className={`block h-[1.5px] w-6 transition-colors duration-300 ${hamburgerClass}`} />
        </button>
      </div>
    </motion.header>
  );
}

function Chevron() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Arrow() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M3 9L9 3M9 3H4M9 3v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Search() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
