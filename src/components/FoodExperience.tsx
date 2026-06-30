"use client";

import React, { useState } from "react";
import Image from "next/image";
import CtaButton from "./CtaButton";
import { RevealText, ImageReveal, ButtonReveal, FadeUp } from "./anim";
import { motion, AnimatePresence } from "framer-motion";
import { easeJ } from "@/lib/motion";

const IMAGES = [
  "/Emporio - Main.webp",
  "/ethan-hansen-yiTJx4XCcFY-unsplash.jpg",
  "/lucas-kepner-Yn8D5B8C-eY-unsplash.jpg.jpeg",
];

export default function FoodExperience() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? IMAGES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === IMAGES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative w-full overflow-hidden bg-velora-cream lg:h-screen lg:min-h-[800px]">
      <div className="grid h-full grid-cols-1 lg:grid-cols-2">
        {/* LEFT COLUMN - IMAGE SLIDER */}
        <div className="relative h-[400px] sm:h-[500px] w-full lg:h-full">
          <ImageReveal scaleFrom={1.1} className="h-full w-full">
            <div className="relative h-full w-full">
              <AnimatePresence initial={false}>
                <motion.div
                  key={currentIndex}
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
                    <Image
                      src={IMAGES[currentIndex]}
                      alt={`Velora Emporio Architecture ${currentIndex + 1}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </ImageReveal>

          {/* Navigation Buttons - Bottom Left */}
          <div className="absolute bottom-8 left-8 z-[20] flex gap-3">
            <button
              onClick={handlePrev}
              className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-[#183029] bg-[#F5F1E9] text-[#183029] transition-all duration-300 hover:bg-[#183029] hover:text-[#F5F1E9] focus:outline-none shadow-md"
              aria-label="Previous image"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-[#183029] bg-[#F5F1E9] text-[#183029] transition-all duration-300 hover:bg-[#183029] hover:text-[#F5F1E9] focus:outline-none shadow-md"
              aria-label="Next image"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Image Counter - Bottom Right */}
          <div className="absolute bottom-11 right-8 z-[20] font-sans text-[11px] font-bold tracking-[1.5px] text-white mix-blend-difference">
            {String(currentIndex + 1).padStart(2, "0")} / {String(IMAGES.length).padStart(2, "0")}
          </div>
        </div>

        {/* RIGHT COLUMN - CONTENT */}
        <div className="flex h-full flex-col items-center justify-center px-6 py-20 sm:px-12 lg:px-20 lg:py-0">
          <FadeUp delay={0.2} className="flex flex-col items-center justify-center">
            {/* LOGO */}
            <div className="flex items-center justify-center">
              <img
                src="/Velora Emporio.png"
                alt="Velora Emporio Logo"
                className="w-[192.86px] h-[52px] sm:w-[259.63px] sm:h-[70px] lg:w-[341.27px] lg:h-[92px] object-contain"
              />
            </div>

            {/* PARAGRAPH */}
            <p className="mt-10 sm:mt-14 lg:mt-16 max-w-[540px] text-center font-sans text-[14px] sm:text-[15px] leading-[1.9] text-dark-text/80">
              Welcome to Velora Inani, the first of its kind 'Lifestyle Hotel'
              in Cox's Bazar with world-class features and amenities for International &
              Local tourists. Designed by HuaDu Architecture & Urban Design,
              a Shanghai-based architecture firm that operates across three continents
              and holds a first-rate qualification from China's
              State Construction Ministry.
            </p>

            {/* BUTTON */}
            <ButtonReveal className="mt-10 sm:mt-14 lg:mt-16">
              <CtaButton variant="tan" href="#" className="px-8 py-3 text-[11px] font-bold tracking-[0.2em]">
                LEARN MORE
              </CtaButton>
            </ButtonReveal>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
