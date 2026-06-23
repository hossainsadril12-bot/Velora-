"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CollaborationPage() {
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

        <div className="relative z-20 flex-grow flex flex-col items-center pb-24">
          
          {/* Top Images Section */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2">
            
            {/* Left Image Box */}
            <div className="w-full flex flex-col">
              <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px]">
                <Image
                  src="/hero-bg.jpg"
                  alt="Eiman Estate Ltd. Resort"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full bg-[#183029] py-4 px-6 flex items-center justify-center min-h-[80px]">
                <span className="font-serif text-white text-[18px] md:text-[22px] tracking-wide text-center uppercase">
                  Eiman Estate Ltd.
                </span>
              </div>
            </div>

            {/* Right Image Box */}
            <div className="w-full flex flex-col">
              <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px]">
                <Image
                  src="/you-le-hRWsD2ti-os-unsplash.jpg"
                  alt="HuaDu Architecture & Urban Design (HDD) Shanghai"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full bg-[#183029] py-4 px-6 flex items-center justify-center min-h-[80px]">
                <span className="font-serif text-white text-[18px] md:text-[22px] tracking-wide text-center uppercase">
                  HuaDu Architecture & Urban Design (HDD)
                </span>
              </div>
            </div>

          </div>

          {/* Content Section */}
          <div className="w-full max-w-[900px] mx-auto px-6 lg:px-12 mt-16 lg:mt-20 flex flex-col items-center text-center">
            
            <h1 className="font-serif text-5xl md:text-6xl lg:text-[72px] font-thin text-dark-text tracking-widest uppercase mb-8">
              Collaboration
            </h1>

            {/* Diamond Divider Ornament */}
            <div className="flex items-center gap-3 mb-10 justify-center text-tan/40">
              <div className="h-px w-20 bg-tan/40"></div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b09b78" strokeWidth="1.2">
                <rect x="5" y="5" width="14" height="14" transform="rotate(45 12 12)" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <div className="h-px w-20 bg-tan/40"></div>
            </div>

            <p className="font-sans text-[15px] md:text-[17px] font-light leading-relaxed text-[#2B2B2B]">
              Eiman Estate Ltd. onboarded HuaDu Architecture & Urban Design (HDD), a Shanghai-based architecture firm, to conceptualize and construct Velor Inani. HDD holds a first-rate qualification from China’s State Construction Ministry, the highest professional credential in China’s Construction Industry. HDD’s portfolio spans three continents, including Beijing Sunrise East Kempinsky Hotel.
            </p>

            {/* Small Divider */}
            <div className="w-24 h-px bg-tan/40 mx-auto my-10"></div>

            <p className="font-sans text-[15px] md:text-[17px] font-light text-[#2B2B2B]">
              HDD is responsible for the Architectural, Structural, MEP, and interior design of Velora Inani.
            </p>

          </div>
        </div>
      </motion.main>

      <Footer />
    </>
  );
}
