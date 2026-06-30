"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { easeJ } from "@/lib/motion";
import { useIntro } from "./IntroProvider";
import { lockScroll } from "@/lib/scroll";
import TransitionLink from "./TransitionLink";

const HERO_IMG = "/Inani Beach.png";

// Premium cubic-bezier for the merge animation
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

  // === Reset to top on every full page load ===
  // Browser scroll restoration would otherwise return the viewport to the
  // section the user was on before refresh, leaving the intro to play
  // off-screen above the locked scroll position. Force start at the top.
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Only on a fresh full load (intro about to play); on client-side nav the
    // intro is already "completed" and page.tsx owns scroll-to-section.
    if (introState !== "idle") return;
    const prev = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    window.__lenis?.scrollTo(0, { immediate: true });
    return () => {
      window.history.scrollRestoration = prev;
    };
  // Run once on mount; reads the initial introState intentionally.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // Lock body scroll until intro completes (Lenis-aware)
  useEffect(() => {
    lockScroll(!introDone);
    return () => lockScroll(false);
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
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: introDone ? "#F5F1E9" : "#FFF9ED" }}
    >
      {/* ──────────────────────────────────────────────────────
          SINGLE IMAGE LAYER
          Starts as centered 16:9 frame, expands to full viewport
          Remains mounted as the parallax background after expansion.
          ────────────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
        style={{
          // Once intro completes, apply parallax drift. Before that, stay 0.
          y: introDone ? bgY : "0%",
        }}
      >
        <motion.div
          className="relative overflow-hidden"
          style={{ borderRadius: introState === "idle" ? 8 : 0 }}
          initial={
            introDone
              ? {
                  // Client-nav back to home: intro already done — start full, no replay.
                  width: "100vw",
                  height: "120vh",
                  opacity: 1,
                  scale: 1,
                  borderRadius: 0,
                }
              : {
                  width: "min(80vw, 1200px)",
                  height: "min(65vh, 800px)",
                  opacity: 0,
                  scale: 0.9,
                }
          }
          animate={
            introState === "idle"
              ? {
                  width: "min(80vw, 1200px)",
                  height: "min(65vh, 800px)",
                  opacity: 1,
                  scale: 1,
                }
              : {
                  width: "100vw",
                  // Expand straight to parallax-ready height (120vh) in one move.
                  // No second height jump on completion → no zoom when components appear.
                  height: "120vh",
                  opacity: 1,
                  scale: 1,
                  borderRadius: 0,
                }
          }
          transition={
            introState === "idle"
              ? {
                  opacity: { duration: 0.8, ease: "easeOut" },
                  scale: { duration: 0.8, ease: "easeOut" },
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
      </motion.div>

      {/* ──────────────────────────────────────────────────────
          HERO CONTENT — fades + slides up after intro completes
          ────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex h-full w-full flex-col items-start justify-center px-4 text-cream pointer-events-none">
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
          <TransitionLink
            href="/about"
            className="inline-block uppercase font-sans font-bold text-[10px] tracking-[2.5px] px-[35px] py-[18px] border transition-all duration-300 cursor-pointer bg-cream text-dark-green border-cream hover:bg-transparent hover:text-cream"
          >
            About Us
          </TransitionLink>
        </motion.div>
      </motion.div>
    </section>
  );
}
