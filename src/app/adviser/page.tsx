"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { useBooking } from "@/components/BookingProvider";

export default function AdviserPage() {
  const { openBooking } = useBooking();

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
            
            {/* Left Side: Premium Portrait Frame */}
            <div className="relative w-full h-[500px] lg:h-auto bg-[#F5F1E9] flex items-center justify-center p-8 md:p-12 lg:p-16 overflow-hidden">
              <div className="relative w-full h-full min-h-[350px] lg:min-h-[500px] bg-white rounded-xl shadow-xl border border-tan/10 overflow-hidden group">
                <Image
                  src="/Shamim Z Bosunia.jpeg"
                  alt="Prof. Dr. M. Shamim Z. Bosunia"
                  fill
                  priority
                  className="object-contain p-4 transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/[0.02] pointer-events-none" />
              </div>
            </div>

            {/* Right Side: Cream Background Content Card */}
            <div className="bg-white flex flex-col justify-center items-center px-8 py-12 md:px-16 lg:px-24 text-center">
              <span className="font-sans text-xs font-bold uppercase tracking-[3px] text-tan mb-3">
                Honourable Adviser
              </span>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-dark-text tracking-wide mb-6">
                Prof. Dr. M. Shamim Z. Bosunia
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
              
              <div className="max-w-[540px] font-sans text-sm md:text-base font-light leading-relaxed text-[#2B2B2B] text-center flex flex-col gap-4">
                <p>
                  Prof. Dr. M. Shamim Z. Bosunia is a prominent academician, leader, and structural engineering expert of Bangladesh. He earned his bachelor’s degree in civil engineering in 1965 from BUET and joined Dept. of Civil Engineering as a lecturer in 1969.
                </p>
                <p>
                  He completed his master’s in civil engineering in 1972 from BUET. On a Commonwealth Scholarship, he earned his PhD in 1979 from the University of Strathclyde, UK. He became a professor of civil engineering in 1981. He retired from BUET in 2009 and is now serving as Emeritus Professor, Dept. of Civil Engineering, University of Asia Pacific (UAP), Dhaka.
                </p>
              </div>

              {/* Achievements Box */}
              <div className="w-full max-w-[800px] mt-12 bg-[#F5F1E9] border border-tan/30 py-8 px-4 flex flex-col md:flex-row items-stretch justify-center gap-6 md:gap-0">
                {/* Column 1 */}
                <div className="flex-1 flex flex-col items-center text-center relative px-2 lg:px-4">
                  <div className="w-[60px] h-[60px] rounded-full border border-tan flex items-center justify-center mb-4 text-tan">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 15l-1.8 1.1.5-2.1-1.6-1.4 2.1-.2L12 10.5l.8 1.9 2.1.2-1.6 1.4.5 2.1z" />
                      <path d="M12 22a9 9 0 0 0 9-9c0-3.5-2-6.5-5-8" />
                      <path d="M12 22a9 9 0 0 1-9-9c0-3.5 2-6.5 5-8" />
                      <path d="M7 5a6 6 0 0 1 10 0" />
                    </svg>
                  </div>
                  <span className="font-serif text-[32px] leading-none text-dark-text mb-3">40+</span>
                  <span className="font-sans text-[13px] leading-snug text-[#2B2B2B]">Years of national leadership<br/>in Engineering Consultancy</span>
                  
                  {/* Divider */}
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-[70%] bg-tan/40"></div>
                </div>

                {/* Column 2 */}
                <div className="flex-1 flex flex-col items-center text-center relative px-2 lg:px-4">
                  <div className="w-[60px] h-[60px] rounded-full border border-tan flex items-center justify-center mb-4 text-tan">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 20L2 20" />
                      <path d="M4 20V10" />
                      <path d="M20 20V10" />
                      <path d="M4 10C4 10 9 6 12 6C15 6 20 10 20 10" />
                      <path d="M8 13.5V20" />
                      <path d="M16 13.5V20" />
                      <path d="M12 11V20" />
                    </svg>
                  </div>
                  <span className="font-sans text-[13px] leading-snug text-[#2B2B2B] mt-auto mb-auto">Chairman, Govt. appointed<br/>Panel of Experts, Padma<br/>Multipurpose Bridge and<br/>Karnaphuli Tunnel</span>
                  
                  {/* Divider */}
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-[70%] bg-tan/40"></div>
                </div>

                {/* Column 3 */}
                <div className="flex-1 flex flex-col items-center text-center px-2 lg:px-4">
                  <div className="w-[60px] h-[60px] rounded-full border border-tan flex items-center justify-center mb-4 text-tan">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <span className="font-sans text-[13px] leading-snug text-[#2B2B2B] mt-auto mb-auto">President, Bangladesh<br/>Association of Consulting<br/>Engineers (BACE)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.main>

      <Footer />
    </>
  );
}
