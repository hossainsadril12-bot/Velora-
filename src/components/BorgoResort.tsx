"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import CtaButton from "./CtaButton";
import { easeJ } from "@/lib/motion";

const SLIDES = [
  {
    src: "/photo-1554213808-9c5bab0f624e.jpg",
    alt: "Borgo San Felice interior/exterior layout view",
  },
  {
    src: "/Red_Ghost_Crab.jpg",
    alt: "Red Ghost Crab color reference view",
  },
];

export default function BorgoResort() {
  const [[i, dir], setI] = useState<[number, number]>([0, 1]);
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const sectionRef = useRef<HTMLElement>(null);

  // Natural Scroll Progress for the right panel
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "center center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 46,
    damping: 26,
    mass: 0.9,
  });

  const rightPanelWidth = useTransform(smoothProgress, [0, 0.6], ["100%", "50%"]);
  const imageScale = useTransform(smoothProgress, [0, 0.6], [1.1, 1]);

  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  const go = (d: number) => {
    setI(([p]) => [(p + d + SLIDES.length) % SLIDES.length, d]);
  };

  // Animation Variants for the Left Content
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  // Dedicated variant for the Header to create a masked slide-up effect
  const headerLineVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration: 0.85, ease: easeJ }
    },
  };

  // Standard fade-up for button and paragraph
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease: easeJ }
    },
  };

  const renderLeftContent = () => (
    <motion.div
      className="flex flex-1 flex-col items-center justify-center py-10 w-full max-w-[640px] mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {/* HEADING: Velora Enani on one line */}
      <div className="overflow-hidden pb-1 w-full flex justify-center">
        <motion.h1
          variants={headerLineVariants}
          className="m-0 font-serif text-[42px] sm:text-[56px] lg:text-[76px] uppercase leading-[0.95] text-[#183029] text-center tracking-tight"
        >
          Velora Enani
        </motion.h1>
      </div>

      {/* CTA BUTTON */}
      <motion.div variants={fadeUpVariants} className="mt-10 lg:mt-12">
        <CtaButton variant="tan" href="#" className="rounded-[2.5px] min-w-[183px]">
          Learn More
        </CtaButton>
      </motion.div>

      {/* PARAGRAPH */}
      <motion.p
        variants={fadeUpVariants}
        className="m-0 mt-12 max-w-[580px] font-sans text-base leading-relaxed text-[#000000] text-center lg:mt-16 font-medium"
      >
        Welcome to Velora Inani, the first of its kind &lsquo;Lifestyle Hotel&rsquo; in Cox&rsquo;s Bazar with world-class features and amenities for International &amp; Local tourists. Designed by HuaDu Architecture &amp; Urban Design, a Shanghai-based architecture firm that operates across three continents and holds a first-rate qualification from China&rsquo;s State Construction Ministry.
        <br />
        <br />
        <strong>Location:</strong> Nestled in the pristine land of Inani, Velora Inani will be an escape from the daily hustle and bustle of the beach town. A 5-minute ride along the Marine Drive will take you there &ndash; where the roar of the waves meets the murmur of the hills.
      </motion.p>
    </motion.div>
  );

  const renderRightSlider = () => (
    <>
      <AnimatePresence initial={false} custom={dir}>
        <motion.div
          key={i}
          custom={dir}
          variants={{
            enter: (d: number) => ({ x: d > 0 ? "100%" : "-70%" }),
            center: { x: "0%", transition: { duration: 1.1, ease: easeJ } },
            exit: (d: number) => ({ x: d > 0 ? "-70%" : "70%", transition: { duration: 1.1, ease: easeJ } }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 overflow-hidden"
        >
          <motion.div style={{ scale: isDesktop ? imageScale : 1 }} className="relative h-full w-full">
            <Image
              src={SLIDES[i].src}
              alt={SLIDES[i].alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority={i === 0}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* COUNTER */}
      <div className="absolute bottom-6 left-6 z-10 font-sans text-[11px] font-bold tracking-[1.5px] text-white mix-blend-difference">
        {String(i + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
      </div>

      {/* CONTROLS */}
      <div className="absolute bottom-6 right-6 z-10 flex gap-4">
        <button type="button" aria-label="Previous slide" onClick={() => go(-1)} className="flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-full bg-[#F5F1E9] border border-[#183029] text-[#183029] shadow-md transition-opacity duration-300 hover:opacity-80">
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none"><path d="M10 2L4 8l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button type="button" aria-label="Next slide" onClick={() => go(1)} className="flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-full bg-[#F5F1E9] border border-[#183029] text-[#183029] shadow-md transition-opacity duration-300 hover:opacity-80">
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none"><path d="M6 2l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </>
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#F5F1E9] flex flex-col lg:flex-row lg:h-[calc(100vh-70px)] lg:min-h-[640px] lg:max-h-[940px]"
    >
      {/* LEFT CONTENT */}
      <div className="w-full flex flex-col justify-center items-center px-8 py-20 sm:px-12 lg:absolute lg:left-0 lg:top-0 lg:bottom-0 lg:w-1/2 lg:h-full lg:px-20 lg:py-32 lg:z-0">
        {renderLeftContent()}
      </div>

      {/* RIGHT SLIDER */}
      <motion.div
        style={{ width: isDesktop ? rightPanelWidth : "100%" }}
        className="relative min-h-[400px] overflow-hidden bg-dark-green lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:h-full lg:z-10"
      >
        {renderRightSlider()}
      </motion.div>
    </section>
  );
}