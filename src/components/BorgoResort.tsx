"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CtaButton from "./CtaButton";

const SLIDES = [
  {
    src: "https://admin.sanfelice.com/app/uploads/2023/02/slider1.jpg",
    alt: "Borgo San Felice hamlet exterior with tower and gardens",
  },
  {
    src: "https://admin.sanfelice.com/app/uploads/2023/02/fe7.jpg",
    alt: "Borgo San Felice pool or courtyard",
  },
  {
    src: "https://admin.sanfelice.com/app/uploads/2023/04/DSC_6934-scaled.jpg",
    alt: "Borgo San Felice vineyard and garden view",
  },
];

export default function BorgoResort() {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((p) => (p + d + SLIDES.length) % SLIDES.length);

  return (
    <section className="grid grid-cols-1 bg-cream lg:grid-cols-2 lg:min-h-screen">
      {/* LEFT */}
      <div className="flex flex-col items-center justify-center bg-cream px-8 py-20 text-center sm:px-12 lg:px-20 lg:py-32">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif uppercase leading-[0.95] text-dark-green text-[48px] sm:text-[72px] lg:text-[96px]"
        >
          Borgo
          <br />
          San Felice
          <br />
          Resort
        </motion.h1>

        {/* CTA Button placed below title */}
        <div className="mt-10 lg:mt-12">
          <CtaButton variant="dark-filled" href="#">
            Discover More
          </CtaButton>
        </div>

        {/* Paragraph placed below button with more breathing room */}
        <p className="mt-16 lg:mt-24 max-w-[420px] font-sans text-base leading-[1.3] text-dark-green font-medium">
          Surrounded by vineyards, in the heart of our estate in the Chianti Classico region, lies
          our ancient hamlet, currently a luxury resort and part of the Relais &amp; Châteaux
          collection since 1992.
        </p>
      </div>

      {/* RIGHT — slider */}
      <div className="relative min-h-[400px] overflow-hidden bg-dark-green lg:min-h-screen lg:h-full">
        <AnimatePresence mode="sync">
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image
              src={SLIDES[i].src}
              alt={SLIDES[i].alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* counter */}
        <div className="absolute bottom-6 left-6 z-10 font-sans text-[11px] font-bold tracking-[1.5px] text-white/90">
          {String(i + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </div>

        {/* controls */}
        <div className="absolute bottom-6 right-6 z-10 flex gap-4">
          <button
            aria-label="Previous slide"
            onClick={() => go(-1)}
            className="flex h-12 w-12 lg:h-16 lg:w-16 items-center justify-center rounded-full bg-white text-dark-green shadow-md transition-all duration-300 hover:bg-cream cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 2L4 8l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            aria-label="Next slide"
            onClick={() => go(1)}
            className="flex h-12 w-12 lg:h-16 lg:w-16 items-center justify-center rounded-full bg-white text-dark-green shadow-md transition-all duration-300 hover:bg-cream cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 2l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
