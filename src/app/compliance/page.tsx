"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function CompliancePage() {
  return (
    <>
      <Header theme="light" />

      <motion.main
        initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full min-h-screen bg-[#FDFBF7] pt-[84px] sm:pt-[100px] lg:pt-[160px] pb-12 sm:pb-16 lg:pb-24 text-[#000000] flex flex-col"
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

        <div className="w-full max-w-[1000px] mx-auto px-6 lg:px-16 flex flex-col items-center flex-grow pt-4">

          {/* Heading Section */}
          <div className="flex flex-col items-center text-center w-full mb-12">
            <h1 className="font-serif text-6xl md:text-7xl lg:text-[84px] font-thin text-dark-text tracking-wide mb-6 leading-none">
              Compliance
            </h1>

            <p className="max-w-[700px] font-serif text-[15px] md:text-[16px] font-light leading-[1.8] text-[#2B2B2B] text-center">
              At Eiman Estates, we are unwavering in our commitment to safe, lawful, and transparent development. We strictly adhere to all applicable laws, regulations, and industry standards to ensure the highest quality, safety, and trust in every aspect of our project.
            </p>
          </div>

          {/* List Section */}
          <div className="flex flex-col w-full">
            
            {/* Top Divider */}
            <div className="h-px w-full bg-tan/20"></div>

            {/* Item 1 */}
            <div className="flex flex-col items-center text-center py-6 md:py-8 w-full">
              <h3 className="font-serif text-[20px] md:text-[22px] font-light text-dark-text tracking-wide mb-2 md:mb-3">
                Legal Frameworks
              </h3>
              <p className="font-serif text-[14px] md:text-[15px] font-light leading-relaxed text-[#4A4A4A] max-w-lg">
                BNBC 2020 (structural design, earthquake resistance, materials, plumbing), Building Construction Act (1952), Real Estate Development and Management Act (2010) compliant.
              </p>
            </div>
            
            {/* Divider */}
            <div className="h-px w-full bg-tan/20"></div>

            {/* Item 2 */}
            <div className="flex flex-col items-center text-center py-6 md:py-8 w-full">
              <h3 className="font-serif text-[20px] md:text-[22px] font-light text-dark-text tracking-wide mb-2 md:mb-3">
                Land Usage & Zoning Clearance
              </h3>
              <p className="font-serif text-[14px] md:text-[15px] font-light leading-relaxed text-[#4A4A4A] max-w-lg">
                Obtained from the relevant authorities.
              </p>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-tan/20"></div>

            {/* Item 3 */}
            <div className="flex flex-col items-center text-center py-6 md:py-8 w-full">
              <h3 className="font-serif text-[20px] md:text-[22px] font-light text-dark-text tracking-wide mb-2 md:mb-3">
                Fire Safety Approval
              </h3>
              <p className="font-serif text-[14px] md:text-[15px] font-light leading-relaxed text-[#4A4A4A] max-w-lg">
                Obtained NOC (No Objection Certificate) from FSCD (Fire Safety and Civil Defense).
              </p>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-tan/20"></div>

            {/* Item 4 */}
            <div className="flex flex-col items-center text-center py-6 md:py-8 w-full">
              <h3 className="font-serif text-[20px] md:text-[22px] font-light text-dark-text tracking-wide mb-2 md:mb-3">
                Setbacks & Density
              </h3>
              <p className="font-serif text-[14px] md:text-[15px] font-light leading-relaxed text-[#4A4A4A] max-w-lg">
                Adhered to Floor Area Ratios (FAR), Maximum Ground Coverage, and Perimeter Setbacks.
              </p>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-tan/20"></div>

            {/* Item 5 */}
            <div className="flex flex-col items-center text-center py-6 md:py-8 w-full">
              <h3 className="font-serif text-[20px] md:text-[22px] font-light text-dark-text tracking-wide mb-2 md:mb-3">
                Developer’s Responsibilities
              </h3>
              <p className="font-serif text-[14px] md:text-[15px] font-light leading-relaxed text-[#4A4A4A] max-w-lg">
                Continuous site supervision by registered engineers, archiving of plans and permits on-site, notifying concerned customers and stakeholders upon completing different construction for inspections.
              </p>
            </div>
          </div>
        </div>
      </motion.main>

      <Footer />
    </>
  );
}
