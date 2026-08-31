"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { easeJ } from "@/lib/motion";
import { useIntro } from "./IntroProvider";
import { useAudio } from "./AudioProvider";
import { lockScroll } from "@/lib/scroll";
import TransitionLink from "./TransitionLink";

// Each hero clip ships as VP9 webm (Chrome/Edge/Firefox — smaller) with an
// H.264 mp4 fallback (Safari/iOS + any browser/GPU without VP9). Poster shows a
// real still instantly so the hero is never black while the video buffers.
const HERO_OPENING_WEBM = "/hero-opening.webm";
const HERO_OPENING_MP4 = "/hero-opening.mp4";
const HERO_LOOPING_WEBM = "/hero-looping.webm";
const HERO_LOOPING_MP4 = "/hero-looping.mp4";
const HERO_POSTER = "/hero-poster.jpg";

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
  const { registerOpeningVideo, notifyOpeningPlaying, enterLooping } = useAudio();

  // ── Two-phase hero video ─────────────────────────────────────────────────
  // Phase "opening": OPENING HERO plays once. On end → dip through black →
  // Phase "looping": LOOPING HERO plays forever.
  const openingVid = useRef<HTMLVideoElement>(null);
  const loopingVid = useRef<HTMLVideoElement>(null);
  const transitionedRef = useRef(false);
  const [phase, setPhase] = useState<"opening" | "looping">("opening");
  const [darkDip, setDarkDip] = useState(false);

  // Begin the black dip this many seconds BEFORE the opening actually ends.
  const LEAD = 2.0;

  // Register the opening <video> so the audio controller can time-sync phase-1
  // music to it (read-only — the controller never plays/pauses/mutes the video).
  useEffect(() => {
    registerOpeningVideo(openingVid.current);
    return () => registerOpeningVideo(null);
  }, [registerOpeningVideo]);

  // Start the opening video the moment the intro begins revealing it. The video
  // is PURELY VISUAL and always muted — it is never coupled to the music. Muted
  // autoplay is allowed everywhere, so it never waits for a click. Self-heal: if
  // the browser ever pauses it before the planned transition, resume it so the
  // hero can never get stuck on a frozen frame.
  useEffect(() => {
    if (introState === "idle") return;
    const v = openingVid.current;
    if (!v) return;
    v.muted = true;
    const play = () => v.play().catch(() => {});
    play();
    // Phase 1: first video's own music starts (audible when permitted / on gesture).
    notifyOpeningPlaying();
    const onPause = () => {
      if (!transitionedRef.current && v.currentTime < (v.duration || Infinity) - 0.15) play();
    };
    v.addEventListener("pause", onPause);
    return () => v.removeEventListener("pause", onPause);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [introState]);

  const startTransition = () => {
    if (transitionedRef.current) return;
    transitionedRef.current = true;
    // Audio handoff: fade phase-1 music out, then start Loop.mp3 (phase 2) as the
    // 2nd video reveals. Touches only the <audio> elements, never the video.
    enterLooping();
    setDarkDip(true); // fade in to full black over 1.5s
    setTimeout(() => {
      loopingVid.current?.play().catch(() => {});
      setPhase("looping"); // swap while fully black
    }, 1500);
    setTimeout(() => setDarkDip(false), 3000); // hold 1.5s at black, then fade out over 1.5s
  };

  // Trigger the dip a bit before the opening finishes.
  const handleOpeningTime = () => {
    const v = openingVid.current;
    if (!v || !v.duration) return;
    if (v.duration - v.currentTime <= LEAD) startTransition();
  };

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
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-black"
        style={{ y: introDone ? bgY : "0%" }}
      >
        {/* Looping hero — underneath, revealed after opening ends */}
        <video
          ref={loopingVid}
          loop
          muted
          playsInline
          preload="auto"
          poster={HERO_POSTER}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
          style={{ opacity: phase === "looping" ? 1 : 0 }}
        >
          <source src={HERO_LOOPING_WEBM} type="video/webm" />
          <source src={HERO_LOOPING_MP4} type="video/mp4" />
        </video>

        {/* Opening hero — plays once on top, fades out through black.
            Always muted: purely visual, decoupled from the music. */}
        <video
          ref={openingVid}
          muted
          playsInline
          preload="auto"
          poster={HERO_POSTER}
          onTimeUpdate={handleOpeningTime}
          onEnded={startTransition}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
          style={{ opacity: phase === "opening" ? 1 : 0, zIndex: 1 }}
        >
          <source src={HERO_OPENING_WEBM} type="video/webm" />
          <source src={HERO_OPENING_MP4} type="video/mp4" />
        </video>

        {/* Dark dip — slow cross-through-black between opening and looping */}
        <div
          className="absolute inset-0 bg-black transition-opacity duration-[1500ms] ease-in-out"
          style={{ opacity: darkDip ? 1 : 0, zIndex: 2 }}
        />

        {/* Permanent green tint (design system) */}
        <div className="absolute inset-0 bg-[rgba(24,48,41,0.3)]" style={{ zIndex: 3 }} />
      </motion.div>

      {/* ──────────────────────────────────────────────────────────────────
          HERO CONTENT — fades + slides up after intro completes
          ────────────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center text-cream pointer-events-none">
        <motion.div
          style={{ y: topY }}
          className="flex flex-row items-baseline justify-center gap-[1.5em] text-center"
        >
          <span className="block overflow-hidden">
            <motion.h1
              custom={2}
              initial="hidden"
              animate={introDone ? "visible" : "hidden"}
              variants={wordMask}
              style={{ transformOrigin: "center bottom", display: "block" }}
              className="font-serif normal-case leading-none text-[64px] font-thin"
            >
              Own
            </motion.h1>
          </span>

          <span className="block overflow-hidden">
            <motion.h1
              custom={2}
              initial="hidden"
              animate={introDone ? "visible" : "hidden"}
              variants={wordMask}
              style={{ transformOrigin: "center bottom", display: "block" }}
              className="font-serif normal-case leading-none text-[64px] font-thin"
            >
              What
            </motion.h1>
          </span>

          <span className="block overflow-hidden">
            <motion.h1
              custom={2}
              initial="hidden"
              animate={introDone ? "visible" : "hidden"}
              variants={wordMask}
              style={{ transformOrigin: "center bottom", display: "block" }}
              className="font-serif normal-case leading-none text-[64px] font-thin"
            >
              Matters.
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
