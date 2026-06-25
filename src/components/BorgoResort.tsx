"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
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
  const [[i], setI] = useState<[number, number]>([0, 1]);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    mass: 0.5,
  });

  // RIGHT PANEL (IMAGE) ANIMATION: Finishes at 0.85 (much slower)
  const rightPanelWidth = useTransform(smoothProgress, [0, 0.25, 0.65, 0.85], ["100%", "92%", "65%", "50%"]);
  const imageScale = useTransform(smoothProgress, [0, 0.25, 0.65, 0.85], [1.1, 1.07, 1.03, 1]);

  // LEFT PANEL (TEXT) ANIMATIONS: 
  // Adjusted to follow the three-phase smooth scrolling curve, now extended to match the slower image.

  const headerY = useTransform(smoothProgress, [0, 0.25, 0.60, 0.75], ["100%", "85%", "40%", "0%"]);
  const headerOpacity = useTransform(smoothProgress, [0, 0.25, 0.60, 0.75], [0, 0.15, 0.6, 1]);

  const buttonY = useTransform(smoothProgress, [0.05, 0.30, 0.65, 0.80], [40, 34, 15, 0]);
  const buttonOpacity = useTransform(smoothProgress, [0.05, 0.30, 0.65, 0.80], [0, 0.15, 0.6, 1]);

  const textY = useTransform(smoothProgress, [0.10, 0.35, 0.70, 0.85], [40, 34, 15, 0]);
  const textOpacity = useTransform(smoothProgress, [0.10, 0.35, 0.70, 0.85], [0, 0.15, 0.6, 1]);

  const go = (d: number) => {
    setI(([p]) => [(p + d + SLIDES.length) % SLIDES.length, d]);
  };

  const renderLeftContent = () => (
    <div className="flex flex-1 flex-col items-center justify-center py-4 sm:py-6 lg:py-10 w-full max-w-[640px] mx-auto">
      {/* HEADING: Velora Enani logo */}
      <div className="overflow-hidden pb-1 w-full flex justify-center">
        <motion.h1
          style={{ y: headerY, opacity: headerOpacity }}
          className="m-0 text-[#183029] flex justify-center items-center w-full"
          aria-label="Velora Enani"
        >
          <svg
            viewBox="0 0 500 134.79"
            className="h-[52px] sm:h-[70px] lg:h-[92px] w-auto"
            fill="none"
          >
            <g fill="currentColor">
              <path d="M370.56,78.56v-29.25h3.09v29.25h-3.09Z" />
              <path d="M383.18,78.56v-29.25h2.55l20.18,25.41h-1.34v-25.41h3.05v29.25h-2.55l-20.14-25.41h1.34v25.41h-3.09Z" />
              <path d="M412.47,78.56l13.37-29.25h3.05l13.37,29.25h-3.26l-12.28-27.45h1.25l-12.28,27.45h-3.22ZM417.74,70.74l.92-2.51h17.01l.92,2.51h-18.84Z" />
              <path d="M447.11,78.56v-29.25h2.55l20.18,25.41h-1.34v-25.41h3.05v29.25h-2.55l-20.14-25.41h1.34v25.41h-3.09Z" />
              <path d="M481.09,78.56v-29.25h3.09v29.25h-3.09Z" />
            </g>
            <g>
              <g fill="currentColor">
                <path d="M60.29,50.84l.81-.81c.36.18.84.73,1.42,1.63.59.91.95,1.72,1.09,2.44.14.73.2,1.4.2,2.04,0,2.44-.54,4.93-1.63,7.46l-26.05,54.27h-1.36L9.55,50.02h9.5l20.76,56.17,21.03-42.6c1.09-1.9,1.63-4.16,1.63-6.78s-.73-4.61-2.17-5.97Z" />
                <path d="M78.15,84.76c0,11.22,1.97,19.45,5.9,24.69,3.93,5.25,9.11,7.87,15.54,7.87,9.04,0,17.1-1.36,24.15-4.07l.41.95c-7.24,2.8-15.4,4.21-24.49,4.21s-16.49-2.71-22.18-8.14c-5.7-5.43-8.55-13.79-8.55-25.1s2.99-20.08,8.96-26.32c5.97-6.24,13.57-9.36,22.79-9.36,7.42,0,13.66,2.22,18.72,6.65,5.06,4.43,7.6,10.99,7.6,19.67v1.36h-48.44c-.27,2.44-.41,4.98-.41,7.6ZM112.75,56.81c-3.26-4.16-7.46-6.24-12.62-6.24s-9.75,2.26-13.77,6.78c-4.03,4.52-6.58,10.77-7.67,18.72h39.08c-.09-8.68-1.76-15.11-5.02-19.27Z" />
                <path d="M153.86,116.78h4.21v1.09h-4.21c-7.96,0-12.98-2.08-15.06-6.24-.45-.9-.68-1.72-.68-2.44V16.24h9.5v91.99c0,2.62.62,4.57,1.56,6.04,1.7,2.66,4.68,2.51,4.68,2.51Z" />
                <path d="M267.55,55.86v-2.85c-4.07,1.63-7.78,4.91-11.13,9.84-3.35,4.93-5.11,9.57-5.29,13.91v41.11h-9.5V50.02h9.5v21.57c1.45-5.25,4.21-10.2,8.28-14.86,4.07-4.66,8.68-7.08,13.84-7.26h.54c1.81,0,3.32.61,4.55,1.83,1.22,1.22,1.83,2.74,1.83,4.55s-.61,3.3-1.83,4.48c-1.22,1.18-2.74,1.76-4.55,1.76s-3.3-.59-4.48-1.76c-1.18-1.17-1.76-2.67-1.76-4.48Z" />
                <path d="M323.62,61.49c0-.79.02-1.76-.47-2.99-.5-1.22-1.15-2.42-1.97-3.6-.81-1.17-2.26-2.19-4.34-3.05-2.08-.86-4.8-1.29-8.14-1.29s-7.26.61-11.74,1.83c-4.48,1.22-7.76,2.42-9.84,3.6l-.54-.95c8.05-3.71,16.24-5.56,24.56-5.56,9.32,0,15.47,1.67,18.45,5.02,2.35,2.62,3.53,5.38,3.53,8.28v45.45c0,2.62.52,4.64,1.56,6.04,1.99,2.67,4.68,2.51,4.68,2.51h4.21v1.09h-4.21c-6.15,0-11-.74-13.26-3.09-2.08-1.99-2.48-4.15-2.48-5.59v-2.85c-4.43,8.05-11.53,12.08-21.3,12.08-11.4,0-17.87-5.16-19.4-15.47-.18-1.09-.27-2.19-.27-3.32s.18-2.37.54-3.73c.36-1.36,1.4-2.85,3.12-4.48,3.44-3.26,10.99-5.25,22.66-5.97,2.89-.27,5.56-.41,8.01-.41s4.66.09,6.65.27v-23.81ZM304.49,117.32c4.79,0,9.11-1.65,12.96-4.95,3.84-3.3,5.9-6.49,6.17-9.57v-16.42c-2.44-.18-4.91-.27-7.4-.27s-4.95.14-7.39.41c-6.88.81-11.35,2.35-13.43,4.61-2.08,2.26-3.12,5.38-3.12,9.36,0,.73.04,1.54.14,2.44.81,9.59,4.84,14.38,12.08,14.38Z" />
              </g>
              <g fill="#a3916d">
                <path d="M207.06,112.47c12.34-5.62,19.1-18.83,16.45-31.29-2.98-14.04-17.12-23.57-30.13-21.53-7.71,1.21-16.68,6.74-19.49,16.52-2.05,7.15-.42,15.18,4.57,21,5.97,6.96,15.8,9.66,24.95,6.83,7.49-2.75,4,2.6.29,5.36-2.73,2.15-5.94,3.16-8.92,4.39-1.31.92,1.47,1.29,2.3,1.4,2.16.26,4.65.04,5.35.73.19.17.27.38.21.62-1.37,2.56-7.94,2.07-10.68,1.89-16.48-1.5-30.15-15.66-31.05-32.16-1.64-23.74,21.12-42.29,44.03-35.69,21.86,6.09,31.95,31.83,20.22,51.19-1.68,2.64-3.55,5.48-6.14,7.32-.6.39-.95.31-.59-.34,1.47-2.25,4.89-5.48,5.95-8.22.66-1.45.79-2.55.14-2.03-1.38,1.42-2.55,3.52-3.92,5.08-2.38,2.93-4.82,5.32-7.89,7.19-1.91,1.09-4.27,2.58-6.46,2.75-.08-.01-.13-.04-.14-.08-.06-.14.26-.45.95-.93Z" />
                <path d="M209.96,115.46c-.61.27-1.83.02-.98-.8.94-.76,2.2-1.21,3.24-1.83.55-.31,2.14-1.14,2.12-.05-.14.47-.58.69-1.05.97-.89.46-2.36,1.33-3.25,1.68l-.09.03Z" />
              </g>
              <g fill="currentColor">
                <path d="M332.88,46.57v-5.61h-2.17v-.56h4.99v.56h-2.17v5.61h-.65Z" />
                <path d="M336.75,46.57v-6.17h.54l2.82,4.81h-.28l2.79-4.81h.54v6.17h-.63v-5.19h.15l-2.57,4.41h-.31l-2.59-4.41h.17v5.19h-.63Z" />
              </g>
            </g>
          </svg>
        </motion.h1>
      </div>

      {/* CTA BUTTON */}
      <motion.div style={{ y: buttonY, opacity: buttonOpacity }} className="mt-10 lg:mt-12">
        <CtaButton variant="tan" href="#" className="rounded-[2.5px] min-w-[183px]">
          Learn More
        </CtaButton>
      </motion.div>

      {/* PARAGRAPH */}
      <motion.p
        style={{ y: textY, opacity: textOpacity }}
        className="m-0 mt-12 max-w-[580px] font-sans text-base leading-relaxed text-[#000000] text-center lg:mt-16 font-medium"
      >
        Welcome to Velora Inani, the first of its kind &lsquo;Lifestyle Hotel&rsquo;
        <br />
        in Cox&rsquo;s Bazar with world-class features and amenities for International &amp; Local tourists.

        Designed by HuaDu Architecture &amp; Urban Design,
        <br />
        a Shanghai-based architecture firm that operates across three continents and holds a first-rate qualification from  China&rsquo;s <br />State Construction Ministry.
        <br />
        <br />

      </motion.p>
    </div>
  );

  const renderRightSlider = () => (
    <>
      <AnimatePresence initial={false}>
        <motion.div
          key={i}
          variants={{
            enter: { opacity: 0 },
            center: {
              opacity: 1,
              transition: { duration: 2.2, ease: easeJ },
            },
            exit: {
              opacity: 0,
              transition: { duration: 2.2, ease: easeJ },
            },
          }}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 overflow-hidden"
        >
          {/* Slow Ken Burns zoom on the active slide for a premium drift */}
          <motion.div
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 7, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full"
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
      <div className="w-full flex flex-col justify-center items-center px-8 py-12 sm:px-12 sm:py-16 lg:absolute lg:left-0 lg:top-0 lg:bottom-0 lg:w-1/2 lg:h-full lg:px-20 lg:py-32 lg:z-0">
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