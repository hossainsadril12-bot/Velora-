"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { easeJ } from "@/lib/motion";
import { useIntro } from "./IntroProvider";
import { lockScroll } from "@/lib/scroll";
import TransitionLink from "./TransitionLink";

const HERO_VIDEO = "/hero.webm";

const wordMask = {
  hidden: { y: "115%", rotate: 2 },
  visible: (i: number) => ({
    y: "0%",
    rotate: 0,
    transition: { duration: 1.4, ease: easeJ, delay: 0.3 + i * 0.18 },
  }),
};

export default function HeroSection() {
  const { introState, introDone } = useIntro();

  const vidA = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    vidA.current?.play().catch(() => {});
  }, []);

  // ── Reset to top on every full page load ─────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (introState !== "idle") return;
    const prev = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    window.__lenis?.scrollTo(0, { immediate: true });
    return () => {
      window.history.scrollRestoration = prev;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lock body scroll until intro completes (Lenis-aware)
  useEffect(() => {
    lockScroll(!introDone, "intro");
    return () => lockScroll(false, "intro");
  }, [introDone]);

  // ── Parallax (active after intro) ────────────────────────────────────────
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY          = useTransform(scrollYProgress, [0, 1],      ["0%",    "50%"]);
  const topY         = useTransform(scrollYProgress, [0, 1],      ["0%",    "-160%"]);
  const descOpacity  = useTransform(scrollYProgress, [0, 0.5],    [1,       0]);

  const discoverY          = useTransform(scrollYProgress, [0.55, 1.0], ["100vh", "0vh"]);
  const discoverOpacity    = useTransform(scrollYProgress, [0.55, 0.85], [0,      1]);
  const discoverH1Y        = useTransform(scrollYProgress, [0.62, 1.0], ["120%",  "0%"]);
  const discoverH2Y        = useTransform(scrollYProgress, [0.67, 1.0], ["120%",  "0%"]);
  const discoverBtnOpacity = useTransform(scrollYProgress, [0.75, 1.0], [0,       1]);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-cream"
    >
      {/* ──────────────────────────────────────────────────────────────────
          VIDEO BACKGROUND — always full screen.
          IntroOverlay handles the intro presentation above this layer.
          Two <video> elements crossfade for a seamless loop.
          ────────────────────────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        style={{ y: introDone ? bgY : "0%" }}
      >
        <video
          ref={vidA}
          src={HERO_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(24,48,41,0.3)]" style={{ zIndex: 2 }} />
      </motion.div>

      {/* ──────────────────────────────────────────────────────────────────
          HERO CONTENT — fades + slides up after intro completes
          ────────────────────────────────────────────────────────────────── */}
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
