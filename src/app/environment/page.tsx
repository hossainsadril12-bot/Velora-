"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function EnvironmentPage() {
  return (
    <>
      <Header theme="light" />

      <motion.main
        initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full min-h-screen bg-[#FDFBF7] pt-[84px] sm:pt-[110px] lg:pt-[180px] pb-12 sm:pb-16 lg:pb-24 text-[#000000] flex flex-col items-center"
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

        <div className="w-full max-w-[1000px] mx-auto px-6 lg:px-12 flex flex-col items-center flex-grow">
          
          {/* Header Section */}
          <div className="flex flex-col items-center text-center mb-12">
            <h1 className="font-serif text-6xl md:text-7xl lg:text-[84px] font-thin text-dark-text tracking-wide mb-6 leading-none">
              Environment
            </h1>

            {/* Divider Ornament */}
            <div className="flex items-center gap-3 mb-0 justify-center text-tan/40">
              <div className="h-px w-20 bg-tan/40"></div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b09b78" strokeWidth="1.2">
                <rect x="5" y="5" width="14" height="14" transform="rotate(45 12 12)" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <div className="h-px w-20 bg-tan/40"></div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1 */}
            <div className="flex items-start md:items-center gap-6 p-6 lg:p-8 border border-tan/20 bg-[#FAF9F5] transition-colors hover:border-tan/40 hover:bg-white shadow-sm">
              <div className="shrink-0 w-[72px] h-[72px] rounded-full border border-tan flex items-center justify-center text-tan">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </svg>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-serif text-[24px] font-light text-dark-text tracking-wide leading-tight">
                  Green Practices
                </h3>
                <p className="font-sans text-[14px] leading-relaxed text-[#4A4A4A]">
                  Holistic sustainable practices in every aspect of construction.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex items-start md:items-center gap-6 p-6 lg:p-8 border border-tan/20 bg-[#FAF9F5] transition-colors hover:border-tan/40 hover:bg-white shadow-sm">
              <div className="shrink-0 w-[72px] h-[72px] rounded-full border border-tan flex items-center justify-center text-tan">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  {/* Sun */}
                  <circle cx="12" cy="7" r="3" />
                  <path d="M12 2v1" />
                  <path d="M12 11v1" />
                  <path d="M8.5 3.5l.7.7" />
                  <path d="M14.8 9.8l.7.7" />
                  <path d="M7 7h1" />
                  <path d="M16 7h1" />
                  <path d="M8.5 10.5l.7-.7" />
                  <path d="M14.8 4.2l.7-.7" />
                  {/* Solar Panel */}
                  <path d="M4 20h16l-2-6H6l-2 6z" />
                  <path d="M8 14v6" />
                  <path d="M12 14v6" />
                  <path d="M16 14v6" />
                  <path d="M5 17h14" />
                </svg>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-serif text-[24px] font-light text-dark-text tracking-wide leading-tight">
                  Smart Energy<br />Management System
                </h3>
                <p className="font-sans text-[14px] leading-relaxed text-[#4A4A4A]">
                  Energy-efficient systems designed to optimize performance and reduce unnecessary consumption.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex items-start md:items-center gap-6 p-6 lg:p-8 border border-tan/20 bg-[#FAF9F5] transition-colors hover:border-tan/40 hover:bg-white shadow-sm">
              <div className="shrink-0 w-[72px] h-[72px] rounded-full border border-tan flex items-center justify-center text-tan">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
                  <path d="M2 19c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
                </svg>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-serif text-[24px] font-light text-dark-text tracking-wide leading-tight">
                  Water Conservation<br />Strategy
                </h3>
                <p className="font-sans text-[14px] leading-relaxed text-[#4A4A4A]">
                  Responsible water conservation practices to reduce waste and protect the surrounding ecosystem.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="flex items-start md:items-center gap-6 p-6 lg:p-8 border border-tan/20 bg-[#FAF9F5] transition-colors hover:border-tan/40 hover:bg-white shadow-sm">
              <div className="shrink-0 w-[72px] h-[72px] rounded-full border border-tan flex items-center justify-center text-tan">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v12" />
                  <path d="M16 11l-4 4-4-4" />
                  <path d="M8 21h8" />
                  <path d="M12 18a3 3 0 0 1-3-3" />
                  <path d="M15 15a3 3 0 0 1-3 3" />
                  <path d="M4 8a12 12 0 0 0 16 0" />
                </svg>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-serif text-[24px] font-light text-dark-text tracking-wide leading-tight">
                  Waste Management<br />Policy
                </h3>
                <p className="font-sans text-[14px] leading-relaxed text-[#4A4A4A]">
                  Organized waste reduction, collection, and responsible disposal throughout construction and operations.
                </p>
              </div>
            </div>

          </div>

        </div>
      </motion.main>

      <Footer />
    </>
  );
}
