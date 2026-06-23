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
        className="relative w-full min-h-screen bg-[#FDFBF7] pt-[100px] lg:pt-[160px] pb-24 text-[#000000] flex flex-col"
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

        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 flex-grow lg:items-center items-start">
          
          {/* Left Side: Context & Branding */}
          <div className="lg:col-span-5 flex flex-col items-center text-center lg:pr-12 pt-4 w-full">
            <div className="flex items-center mb-6 justify-center">
              <span className="font-sans text-[11px] font-bold uppercase tracking-[4px] text-tan">
                Regulatory Standards
              </span>
            </div>

            <h1 className="font-serif text-6xl md:text-7xl lg:text-[84px] font-thin text-dark-text tracking-wide mb-6 leading-none">
              Compliance
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

            <p className="max-w-[420px] font-sans text-[15px] md:text-[16px] font-light leading-[1.8] text-[#2B2B2B] text-center">
              At Eiman Estates, we are unwavering in our commitment to safe, lawful, and transparent development. We strictly adhere to all applicable laws, regulations, and industry standards to ensure the highest quality, safety, and trust in every aspect of our project.
            </p>
          </div>

          {/* Right Side: Regulatory Cards */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            
            {/* Card 1 */}
            <div className="flex items-start md:items-center gap-8 p-6 md:p-8 rounded-[12px] border border-tan/30 bg-[#FAF9F5] transition-colors hover:border-tan/60 hover:bg-white">
              <div className="shrink-0 text-tan w-[60px] flex justify-center">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
                  {/* Document */}
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="8" y1="13" x2="16" y2="13" />
                  <line x1="8" y1="17" x2="16" y2="17" />
                  {/* Scale */}
                  <path d="M12 2v6" />
                  <path d="M7 8h10" />
                  <path d="M7 8l-2 6" />
                  <path d="M17 8l2 6" />
                  <line x1="4" y1="14" x2="10" y2="14" />
                  <line x1="14" y1="14" x2="20" y2="14" />
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-[22px] font-light text-dark-text tracking-wide">
                  <span className="font-medium font-sans">1. </span>Legal Frameworks:
                </h3>
                <p className="font-sans text-[14px] leading-relaxed text-[#4A4A4A]">
                  BNBC 2020 (structural design, earthquake resistance, materials, plumbing), Building Construction Act (1952), Real Estate Development and Management Act (2010) compliant.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex items-start md:items-center gap-8 p-6 md:p-8 rounded-[12px] border border-tan/30 bg-[#FAF9F5] transition-colors hover:border-tan/60 hover:bg-white">
              <div className="shrink-0 text-tan w-[60px] flex justify-center">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                  <line x1="9" y1="3" x2="9" y2="18" />
                  <line x1="15" y1="6" x2="15" y2="21" />
                  <path d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z" />
                  <path d="M12 11v6" />
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-[22px] font-light text-dark-text tracking-wide">
                  <span className="font-medium font-sans">2. </span>Land Usage & Zoning Clearance:
                </h3>
                <p className="font-sans text-[14px] leading-relaxed text-[#4A4A4A]">
                  Obtained from the relevant authorities.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex items-start md:items-center gap-8 p-6 md:p-8 rounded-[12px] border border-tan/30 bg-[#FAF9F5] transition-colors hover:border-tan/60 hover:bg-white">
              <div className="shrink-0 text-tan w-[60px] flex justify-center">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M12 16c-2 0-3-1.5-3-3s1-3 3-3 3 1.5 3 3-1 3-3 3z" />
                  <path d="M12 16c-1-1-1.5-2.5-1.5-4a3.5 3.5 0 0 1 7 0" />
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-[22px] font-light text-dark-text tracking-wide">
                  <span className="font-medium font-sans">3. </span>Fire Safety Approval:
                </h3>
                <p className="font-sans text-[14px] leading-relaxed text-[#4A4A4A]">
                  Obtained NOC (No Objection Certificate) from FSCD (Fire Safety and Civil Defense).
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="flex items-start md:items-center gap-8 p-6 md:p-8 rounded-[12px] border border-tan/30 bg-[#FAF9F5] transition-colors hover:border-tan/60 hover:bg-white">
              <div className="shrink-0 text-tan w-[60px] flex justify-center">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
                  {/* House layout */}
                  <rect x="7" y="7" width="10" height="10" />
                  <path d="M10 7V4" />
                  <path d="M14 7V4" />
                  <path d="M7 10H4" />
                  <path d="M7 14H4" />
                  {/* Dimension arrows */}
                  <path d="M2 2v20" />
                  <path d="M2 12h2" />
                  <path d="M20 22H4" />
                  <path d="M12 20v2" />
                  <path d="M4 4l-2-2m2 0L2 4" />
                  <path d="M4 20l-2 2m2 0l-2-2" />
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-[22px] font-light text-dark-text tracking-wide">
                  <span className="font-medium font-sans">4. </span>Setbacks & Density:
                </h3>
                <p className="font-sans text-[14px] leading-relaxed text-[#4A4A4A]">
                  Adhered to Floor Area Ratios (FAR), Maximum Ground Coverage, and Perimeter Setbacks.
                </p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="flex items-start md:items-center gap-8 p-6 md:p-8 rounded-[12px] border border-tan/30 bg-[#FAF9F5] transition-colors hover:border-tan/60 hover:bg-white">
              <div className="shrink-0 text-tan w-[60px] flex justify-center">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  <path d="M8 11h8v4H8z" />
                  <rect x="14" y="14" width="7" height="9" rx="1" />
                  <line x1="16" y1="17" x2="19" y2="17" />
                  <line x1="16" y1="19" x2="19" y2="19" />
                  <line x1="16" y1="21" x2="19" y2="21" />
                  <path d="M17 14v-2" />
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-[22px] font-light text-dark-text tracking-wide">
                  <span className="font-medium font-sans">5. </span>Developer’s Responsibilities:
                </h3>
                <p className="font-sans text-[14px] leading-relaxed text-[#4A4A4A]">
                  Continuous site supervision by registered engineers, archiving of plans and permits on-site, notifying concerned customers and stakeholders upon completing different construction for inspections.
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
