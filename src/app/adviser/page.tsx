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
        className="relative w-full min-h-screen bg-velora-cream pt-[90px] lg:pt-[110px] pb-12 text-[#050505] overflow-hidden"
      >
        {/* Content Container */}
        <div className="relative z-10 mx-auto w-full max-w-[940px] px-4 sm:px-6 md:px-8">
          {/* Main Card */}
          <div className="bg-velora-cream p-6 sm:p-8 md:p-12">

            {/* Top Label Line */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px flex-1 bg-[#b09b78]/50" />

              <span className="font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[2.5px] text-[#b09b78] shrink-0">
                Honourable Adviser
              </span>

              <div className="h-px flex-1 bg-[#b09b78]/50" />
            </div>

            {/* Circular Image - Enlarged for Visual Attention */}
            <div className="mx-auto mb-8 flex h-[220px] w-[220px] sm:h-[240px] sm:w-[240px] md:h-[280px] md:w-[280px] items-center justify-center rounded-full border border-[#C9A45C]/60 p-[6px] transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(201,164,92,0.15)]">
              <div className="relative h-full w-full overflow-hidden rounded-full">
                <Image
                  src="/Shamim z Bosunia picture 2.jpeg"
                  alt="Prof. Dr. M. Shamim Z. Bosunia"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 220px, (max-width: 768px) 240px, 280px"
                />
              </div>
            </div>

            {/* Heading */}
            <div className="text-center">
              <h1 className="font-[var(--font-cormorant)] text-[32px] sm:text-[38px] md:text-[46px] leading-[1.15] font-light tracking-[0.01em] text-tan">
                Prof. Dr. M. Shamim Z. Bosunia
              </h1>

              {/* Small Ornament */}
              <div className="mt-4 mb-8 flex items-center justify-center gap-4 text-tan">
                <div className="h-px w-12 sm:w-20 bg-tan/40" />
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                  className="shrink-0"
                >
                  {/* Outer rotated square (diamond) */}
                  <rect
                    x="3"
                    y="3"
                    width="8"
                    height="8"
                    transform="rotate(45 7 7)"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    fill="none"
                  />
                  {/* Inner circle outline */}
                  <circle
                    cx="7"
                    cy="7"
                    r="1.8"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    fill="none"
                  />
                </svg>
                <div className="h-px w-12 sm:w-20 bg-tan/40" />
              </div>
            </div>

            {/* Paragraph Content */}
            <div className="mx-auto max-w-[700px] text-center font-sans text-[14px] sm:text-[15px] leading-[1.8] font-light tracking-[0.01em] text-dark-text">
              <p>
                Prof. Dr. M. Shamim Z. Bosunia is a prominent academician,
                leader, and structural engineering expert of Bangladesh. He earned
                his bachelor’s degree in civil engineering in 1965 from Bangladesh University of Engineering and Technology (BUET) and
                joined Dept. of Civil Engineering as a lecturer in 1969.
              </p>

              <p className="mt-0">
                He completed his master’s in civil engineering in 1972 from BUET.
                On a Commonwealth Scholarship, he earned his PhD in 1979 from the
                University of Strathclyde, UK. He became a professor of civil
                engineering in 1981. He retired from BUET in 2009 and is now
                serving as Emeritus Professor, Dept. of Civil Engineering,
                University of Asia Pacific (UAP), Dhaka.
              </p>
            </div>

            {/* Bottom Divider */}
            <div className="my-8 h-px w-full bg-[#C9A45C]/35" />

            {/* Achievement Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0">
              {/* Item 1 */}
              <div className="relative flex items-start gap-4 px-2 py-4 md:px-5">
                <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center text-tan">
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2.8l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.1 6.4 20l1.1-6.2L3 9.4l6.2-.9L12 2.8z" />
                  </svg>
                </div>

                <div className="flex-1">
                  <h3 className="font-sans text-[24px] sm:text-[28px] leading-none font-semibold text-tan">
                    40+
                  </h3>

                  <p className="mt-2 font-sans text-[11px] sm:text-[12px] leading-[1.5] font-light text-dark-text">
                    Years of national leadership
                    <br className="hidden sm:block" />
                    in Engineering Consultancy
                  </p>
                </div>

                <div className="hidden md:block absolute right-0 top-1/2 h-[70%] w-px -translate-y-1/2 bg-[#C9A45C]/35" />
              </div>

              {/* Item 2 */}
              <div className="relative flex items-start gap-4 px-2 py-4 md:px-5">
                <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center text-tan">
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 20h18" />
                    <path d="M5 20V10" />
                    <path d="M19 20V10" />
                    <path d="M4 10h16" />
                    <path d="M12 4L4 10" />
                    <path d="M12 4l8 6" />
                    <path d="M8 13v7" />
                    <path d="M12 13v7" />
                    <path d="M16 13v7" />
                  </svg>
                </div>

                <div className="flex-1">
                  <h3 className="font-sans text-[16px] sm:text-[17px] leading-snug font-semibold text-tan">
                    Chairman
                  </h3>

                  <p className="mt-2 font-sans text-[11px] sm:text-[12px] leading-[1.5] font-light text-dark-text">
                    Govt. appointed Panel of Experts

                    Padma Bridge & Karnaphuli Tunnel
                  </p>
                </div>

                <div className="hidden md:block absolute right-0 top-1/2 h-[70%] w-px -translate-y-1/2 bg-[#C9A45C]/35" />
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-4 px-2 py-4 md:px-5">
                <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center text-tan">
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <polyline points="16 11 18 13 22 9" />
                  </svg>
                </div>

                <div className="flex-1">
                  <h3 className="font-sans text-[16px] sm:text-[17px] leading-snug font-semibold text-tan">
                    President
                  </h3>

                  <p className="mt-2 font-sans text-[11px] sm:text-[12px] leading-[1.5] font-light text-dark-text">
                    Bangladesh Association of
                    <br className="hidden sm:block" />
                    Consulting Engineers (BACE)
                  </p>
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