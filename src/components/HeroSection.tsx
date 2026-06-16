"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { easeJ } from "@/lib/motion";
import Logo from "./Logo";
import HeroLogo from "./HeroLogo";

/**
 * Hero — full-viewport parallax stack.
 *  • Background: clip-path wipe-up reveal on page load + Lenis-driven parallax (0.5x).
 *  • Headline (AUTHENTIC / TUSCAN / SOUL): each word masked, slides up from below,
 *    transform-origin right bottom, staggered on load.
 *  • Body copy: fades up.
 *  • On scroll: top words drift up faster than the page, SOUL emerges from below.
 *
 * Replace HERO_IMG below with the real asset if needed (currently /public/hero-bg.jpg).
 */
const HERO_IMG = "/Inani Beach.png";

const wordMask = {
  hidden: { y: "115%", rotate: 2 },
  visible: (i: number) => ({
    y: "0%",
    rotate: 0,
    transition: { duration: 1.4, ease: easeJ, delay: 2.4 + i * 0.18 },
  }),
};

function Emblem({ className = "" }: { className?: string }) {
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

export default function HeroSection() {
  const [showIntro, setShowIntro] = useState(true);

  // Lock body scroll while intro is showing
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showIntro]);

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Background drifts at ~0.5x (parallax)
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  // AUTHENTIC + TUSCAN leave faster than the page
  const topY = useTransform(scrollYProgress, [0, 1], ["0%", "-160%"]);
  // SOUL emerges from below
  const soulY = useTransform(scrollYProgress, [0, 1], ["55%", "-25%"]);
  const descOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Discover overlay — hidden below viewport, slides up on scroll
  const discoverY = useTransform(scrollYProgress, [0.55, 1.0], ["100vh", "0vh"]);
  const discoverOpacity = useTransform(scrollYProgress, [0.55, 0.85], [0, 1]);
  const discoverH1Y = useTransform(scrollYProgress, [0.62, 1.0], ["120%", "0%"]);
  const discoverH2Y = useTransform(scrollYProgress, [0.67, 1.0], ["120%", "0%"]);
  const discoverBtnOpacity = useTransform(scrollYProgress, [0.75, 1.0], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-dark-green"
    >
      {/* Parallax background — shows immediately, no reveal wipe */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0 h-[120%] w-full"
      >
        <Image
          src={HERO_IMG}
          alt="Aerial view of Borgo San Felice vineyard and estate in Tuscany"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(24,48,41,0.3)]" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-start justify-center px-4 text-cream">
        {/* OWN WHAT MATTERS — parallax group */}
        <motion.div
          style={{ y: topY }}
          className="flex flex-col items-start text-left ml-[400px]"
        >
          <span className="block overflow-hidden">
            <motion.h1
              custom={0}
              initial="hidden"
              animate="visible"
              variants={wordMask}
              style={{ transformOrigin: "left bottom", display: "block" }}
              className="font-serif uppercase leading-[0.86] text-[16vw] sm:text-[15vw] lg:text-[128px]"
            >
              OWN
            </motion.h1>
          </span>

          <span className="block overflow-hidden">
            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={wordMask}
              style={{ transformOrigin: "left bottom", display: "block" }}
              className="font-serif uppercase leading-[0.86] text-[19vw] sm:text-[18vw] lg:text-[150px]"
            >
              WHAT
            </motion.h1>
          </span>

          <span className="block overflow-hidden">
            <motion.h1
              custom={2}
              initial="hidden"
              animate="visible"
              variants={wordMask}
              style={{ transformOrigin: "left bottom", display: "block" }}
              className="font-serif uppercase leading-[0.86] text-[19vw] sm:text-[18vw] lg:text-[150px]"
            >
              MATTERS
            </motion.h1>
          </span>
        </motion.div>
      </div>

      {/* Discover overlay — lives inside hero, slides up from translateY(100vh) */}
      <motion.div
        style={{ y: discoverY, opacity: discoverOpacity }}
        className="absolute inset-0 z-[6] flex flex-col items-center justify-evenly px-4 pointer-events-none"
      >
        <span className="overflow-hidden">
          <motion.h2
            style={{ y: discoverH1Y, display: "block" }}
            className="font-serif uppercase text-light-blue text-[28.8px] leading-tight tracking-wide"
          >
            Discover
          </motion.h2>
        </span>

        <span className="overflow-hidden">
          <motion.h2
            style={{ y: discoverH2Y, display: "block" }}
            className="font-serif uppercase text-light-blue text-[28.8px] leading-tight tracking-wide"
          >
            &ldquo;Star Bene&rdquo;
          </motion.h2>
        </span>

        <motion.div style={{ opacity: discoverBtnOpacity }} className="pointer-events-auto">
          <a
            href="/en/about-us"
            className="inline-block uppercase font-sans font-bold text-[10px] tracking-[2.5px] px-[35px] py-[18px] border transition-all duration-300 cursor-pointer bg-cream text-dark-green border-cream hover:bg-transparent hover:text-cream"
          >
            About Us
          </a>
        </motion.div>
      </motion.div>

      {/* Cinematic Intro Overlay */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro-overlay"
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FFF9ED]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 2.4, ease: "easeInOut" }}
            onAnimationComplete={() => setShowIntro(false)}
          >
            <motion.div
              className="absolute z-10 top-8 sm:top-12 flex flex-col items-center"
              initial={{ opacity: 0, color: "#050505" }}
              animate={{ opacity: 1, color: "#ffffff" }}
              transition={{
                opacity: { duration: 0.8, delay: 0.2 },
                color: { duration: 0.8, delay: 1.2, ease: "easeInOut" },
              }}
            >
              <HeroLogo className="h-12 sm:h-16 w-auto" />
            </motion.div>

            <motion.div
              className="relative overflow-hidden"
              initial={{
                width: "min(80vw, 1200px)",
                height: "min(65vh, 800px)",
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                width: "100vw",
                height: "100vh",
                opacity: 1,
                scale: 1,
              }}
              transition={{
                opacity: { duration: 0.8, delay: 0.4, ease: "easeOut" },
                scale: { duration: 0.8, delay: 0.4, ease: "easeOut" },
                width: { duration: 1.2, delay: 1.2, ease: easeJ },
                height: { duration: 1.2, delay: 1.2, ease: easeJ },
              }}
            >
              <Image
                src={HERO_IMG}
                alt="Velora Intro"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[rgba(24,48,41,0.3)]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
