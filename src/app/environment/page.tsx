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
          <div className="flex flex-col items-center text-center w-full mb-12">
            <h1 className="font-serif text-6xl md:text-7xl lg:text-[84px] font-thin text-dark-text tracking-wide leading-none">
              Environment
            </h1>
          </div>

          {/* List Section */}
          <div className="flex flex-col w-full">
            
            {/* Top Divider */}
            <div className="h-px w-full bg-tan/20"></div>

            {/* Item 1 */}
            <div className="flex flex-col items-center text-center py-6 md:py-8 w-full">
              <h3 className="font-serif text-[20px] md:text-[22px] font-light text-dark-text tracking-wide mb-2 md:mb-3">
                Green Practices
              </h3>
              <p className="font-sans text-[14px] md:text-[15px] leading-relaxed text-[#4A4A4A] max-w-lg">
                Holistic sustainable practices in every aspect of construction.
              </p>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-tan/20"></div>

            {/* Item 2 */}
            <div className="flex flex-col items-center text-center py-6 md:py-8 w-full">
              <h3 className="font-serif text-[20px] md:text-[22px] font-light text-dark-text tracking-wide mb-2 md:mb-3">
                Smart Energy Management System
              </h3>
              <p className="font-sans text-[14px] md:text-[15px] leading-relaxed text-[#4A4A4A] max-w-lg">
                Energy-efficient systems designed to optimize performance and reduce unnecessary consumption.
              </p>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-tan/20"></div>

            {/* Item 3 */}
            <div className="flex flex-col items-center text-center py-6 md:py-8 w-full">
              <h3 className="font-serif text-[20px] md:text-[22px] font-light text-dark-text tracking-wide mb-2 md:mb-3">
                Water Conservation Strategy
              </h3>
              <p className="font-sans text-[14px] md:text-[15px] leading-relaxed text-[#4A4A4A] max-w-lg">
                Responsible water conservation practices to reduce waste and protect the surrounding ecosystem.
              </p>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-tan/20"></div>

            {/* Item 4 */}
            <div className="flex flex-col items-center text-center py-6 md:py-8 w-full">
              <h3 className="font-serif text-[20px] md:text-[22px] font-light text-dark-text tracking-wide mb-2 md:mb-3">
                Waste Management Policy
              </h3>
              <p className="font-sans text-[14px] md:text-[15px] leading-relaxed text-[#4A4A4A] max-w-lg">
                Organized waste reduction, collection, and responsible disposal throughout construction and operations.
              </p>
            </div>
          </div>

        </div>
      </motion.main>

      <Footer />
    </>
  );
}
