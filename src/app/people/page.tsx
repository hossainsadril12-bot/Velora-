"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PeoplePage() {
  return (
    <>
      <Header theme="light" />

      <motion.main
        initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full min-h-screen bg-velora-cream pt-[70px] lg:pt-[100px] text-[#000000] flex flex-col"
      >
        {/* Faded Shadow Animation Overlay */}
        <motion.div
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.8, delay: 0.2, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%)",
          }}
        />

        {/* Content Container */}
        <div className="relative z-20 flex-grow flex flex-col">
          {/* Main Grid: Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-[auto_1fr] lg:grid-rows-1 flex-grow w-full">

            {/* Left Side: Premium Full-bleed Image */}
            <div className="relative w-full h-[350px] lg:h-auto overflow-hidden group">
              <Image
                src="/Metro-Team-2026_3300_Website.jpg.jpeg"
                alt="Eiman Estates Collective Experience"
                fill
                priority
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:bg-black/5" />
            </div>

            {/* Right Side: Cream Background Content Card */}
            <div className="bg-white flex flex-col justify-center items-center px-8 py-12 md:px-16 lg:px-24 text-center">
              <span className="font-sans text-xs font-bold uppercase tracking-[3px] text-tan mb-3">
                Eiman Estates LTD.
              </span>

              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-dark-text uppercase tracking-wide mb-6">
                People
              </h1>

              {/* Divider Ornament */}
              <div className="flex items-center gap-3 mb-8 justify-center text-tan/40">
                <div className="h-px w-20 bg-tan/40"></div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b09b78" strokeWidth="1.2">
                  <rect x="5" y="5" width="14" height="14" transform="rotate(45 12 12)" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <div className="h-px w-20 bg-tan/40"></div>
              </div>

              <p className="max-w-[540px] font-sans text-sm md:text-base font-light leading-relaxed text-[#2B2B2B]">
                Eiman Estates Ltd. is formed and governed by an eclectic mix of industry dignitaries. Their collective years of experience and profound sense of judgement are always there to guide you through this journey of investment partnership.
              </p>
            </div>
          </div>
        </div>
      </motion.main>

      <Footer />
    </>
  );
}
