"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { easeJ } from "@/lib/motion";
import HeroLogo from "./HeroLogo";
import { useIntro } from "./IntroProvider";

/**
 * Hero — full-viewport parallax stack with cinematic intro.
 *
 * INTRO SEQUENCE:
 *   idle          → Dark bg, centered 16:9 image frame, gold logo top-center
 *   transitioning → Image expands to full screen, logo morphs (color+scale+position)
 *   completed     → Headline + CTA fade/slide up, navbar elements appear
 */
const HERO_IMG = "/Inani Beach.png";

/* Premium cubic-bezier for the merge animation */
const MERGE_EASE = [0.65, 0, 0.15, 1] as const;
const MERGE_DURATION = 1.6; // seconds for the image expansion

const wordMask = {
  hidden: { y: "115%", rotate: 2 },
  visible: (i: number) => ({
    y: "0%",
    rotate: 0,
    transition: { duration: 1.4, ease: easeJ, delay: 0.3 + i * 0.18 },
  }),
};

export default function HeroSection() {
  const { introState, advance, introDone } = useIntro();

  // === Intro timing ===
  // After mount: wait 1.0s in "idle" state, then advance to "transitioning"
  useEffect(() => {
    if (introState !== "idle") return;
    const t = setTimeout(() => advance(), 1000);
    return () => clearTimeout(t);
  }, [introState, advance]);

  // After the merge expansion finishes, advance to "completed"
  useEffect(() => {
    if (introState !== "transitioning") return;
    const t = setTimeout(() => advance(), MERGE_DURATION * 1000 + 200);
    return () => clearTimeout(t);
  }, [introState, advance]);

  // Lock body scroll until intro completes
  useEffect(() => {
    if (!introDone) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [introDone]);

  // === Parallax (active after intro) ===
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const topY = useTransform(scrollYProgress, [0, 1], ["0%", "-160%"]);
  const descOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Discover overlay
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
      {/* ──────────────────────────────────────────────────────
          CINEMATIC INTRO LAYER
          Fixed overlay with dark bg → centered 16:9 image frame
          that expands to fill the entire viewport.
          ────────────────────────────────────────────────────── */}
      {!introDone && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-[#0a0a0a]">
          {/* The expanding image frame */}
          <motion.div
            className="relative overflow-hidden"
            style={{ borderRadius: introState === "idle" ? 8 : 0 }}
            initial={{
              width: "min(82vw, 1100px)",
              height: "min(46vw, 620px)",
              opacity: 0,
              scale: 0.92,
            }}
            animate={
              introState === "idle"
                ? {
                    width: "min(82vw, 1100px)",
                    height: "min(46vw, 620px)",
                    opacity: 1,
                    scale: 1,
                  }
                : {
                    width: "100vw",
                    height: "100vh",
                    opacity: 1,
                    scale: 1,
                    borderRadius: 0,
                  }
            }
            transition={
              introState === "idle"
                ? {
                    opacity: { duration: 0.9, ease: "easeOut" },
                    scale: { duration: 0.9, ease: "easeOut" },
                  }
                : {
                    width: { duration: MERGE_DURATION, ease: MERGE_EASE },
                    height: { duration: MERGE_DURATION, ease: MERGE_EASE },
                    borderRadius: { duration: MERGE_DURATION * 0.6, ease: "easeInOut" },
                  }
            }
          >
            <Image
              src={HERO_IMG}
              alt="Velora Inani — Premium Beachfront Living"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[rgba(24,48,41,0.3)]" />
          </motion.div>

          {/* Intro logo — centered at top, morphs color from gold → white */}
          <motion.div
            layoutId="brand-logo"
            className="pointer-events-none fixed inset-x-0 top-0 z-[10001] flex justify-center"
            style={{ paddingTop: introState === "idle" ? 48 : 30 }}
            initial={{ opacity: 0, color: "#b09b78" }}
            animate={{
              opacity: 1,
              color:
                introState === "idle"
                  ? "#b09b78"
                  : "#F5F1E9",
            }}
            transition={{
              opacity: { duration: 0.5, delay: 0.1 },
              color: { duration: MERGE_DURATION * 0.7, ease: MERGE_EASE },
              layout: { duration: MERGE_DURATION, ease: MERGE_EASE },
            }}
          >
            <HeroLogo
              className={`w-auto transition-all ${
                introState === "idle"
                  ? "h-14 sm:h-16"
                  : "h-8 sm:h-10"
              }`}
            />
          </motion.div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────
          HERO BACKGROUND (always present, revealed after intro)
          ────────────────────────────────────────────────────── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0 h-[120%] w-full"
      >
        <Image
          src={HERO_IMG}
          alt="Aerial view of Velora Inani beachfront estate"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(24,48,41,0.3)]" />
      </motion.div>

      {/* ──────────────────────────────────────────────────────
          HERO CONTENT — fades + slides up after intro completes
          ────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex h-full w-full flex-col items-start justify-center px-4 text-cream">
        <motion.div
          style={{ y: topY }}
          className="flex flex-col items-start text-left ml-2 sm:ml-12 md:ml-24 lg:ml-[400px]"
        >
          <span className="block overflow-hidden">
            <motion.h1
              custom={0}
              initial="hidden"
              animate={introDone ? "visible" : "hidden"}
              variants={wordMask}
              style={{ transformOrigin: "left bottom", display: "block" }}
              className="font-serif uppercase leading-[0.86] text-[14vw] sm:text-[15vw] lg:text-[128px] font-thin"
            >
              OWN
            </motion.h1>
          </span>

          <span className="block overflow-hidden">
            <motion.h1
              custom={1}
              initial="hidden"
              animate={introDone ? "visible" : "hidden"}
              variants={wordMask}
              style={{ transformOrigin: "left bottom", display: "block" }}
              className="font-serif uppercase leading-[0.86] text-[16vw] sm:text-[18vw] lg:text-[150px] font-thin"
            >
              WHAT
            </motion.h1>
          </span>

          <span className="block overflow-hidden">
            <motion.h1
              custom={2}
              initial="hidden"
              animate={introDone ? "visible" : "hidden"}
              variants={wordMask}
              style={{ transformOrigin: "left bottom", display: "block" }}
              className="font-serif uppercase leading-[0.86] text-[16vw] sm:text-[18vw] lg:text-[150px] font-thin"
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
    </section>
  );
}
