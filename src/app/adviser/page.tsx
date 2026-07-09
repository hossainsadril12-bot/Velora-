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
        className="relative w-full min-h-screen lg:h-[100svh] lg:overflow-hidden bg-velora-cream pt-[80px] lg:pt-[92px] text-[#050505] flex flex-col"
      >
        <div className="relative z-10 mx-auto w-full max-w-[1600px] flex-1 min-h-0 flex flex-col px-6 sm:px-10 lg:px-16">
          {/* Title — fixed at top, never cut */}
          <div className="shrink-0 pt-4 lg:pt-5 pb-2 text-center">
            <h1 className="mt-9 font-serif text-4xl md:text-5xl lg:text-[54px] xl:text-[64px] font-extralight tracking-wide text-[#2B2B2B] leading-none">
              Honourable Adviser
            </h1>
          </div>

          {/* 3-Column Grid — fills remaining viewport height */}
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center pb-8 lg:pb-0">

            {/* Left Column */}
            <div className="lg:col-span-3 flex flex-col gap-6 text-dark-text order-2 lg:order-1 self-center">
              <div>
                <h2 className="font-serif text-[28px] font-light leading-tight mb-6 xl:mb-7 text-dark-text lg:whitespace-nowrap">
                  Prof. Dr. M Shamim Z Bosunia
                </h2>

                <div className="space-y-6 xl:space-y-7">
                  <div>
                    <h3 className="font-serif text-[20px] font-light leading-tight text-dark-text">
                      Former Professor and Dean
                    </h3>
                    <p className="font-serif text-[15px] xl:text-[16px] font-light text-dark-text leading-[24px] mt-1">
                      Civil Engineering, BUET
                    </p>
                  </div>

                  <div>
                    <h3 className="font-serif text-[20px] font-light leading-tight text-dark-text">President</h3>
                    <p className="font-serif text-[15px] xl:text-[16px] font-light text-dark-text leading-[24px] mt-1">
                      Bangladesh Association of Consulting Engineers (BACE)
                    </p>
                  </div>

                  <div>
                    <h3 className="font-serif text-[20px] font-light leading-tight text-dark-text">Chairman</h3>
                    <p className="font-serif text-[15px] xl:text-[16px] font-light text-dark-text leading-[24px] mt-1">
                      Government-appointed Panel of Experts<br />
                      Padma Multipurpose Bridge & Karnaphuli Tunnel
                    </p>
                  </div>

                  <div>
                    <h3 className="font-serif text-[20px] font-light leading-tight text-dark-text">40+ years</h3>
                    <p className="font-serif text-[15px] xl:text-[16px] font-light text-dark-text leading-[24px] mt-1">
                      of National leadership in engineering consultancy
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Column: Portrait — spans full grid height, anchored to bottom */}
            <div className="lg:col-span-6 order-1 lg:order-2 h-[55vh] lg:h-full lg:self-stretch flex justify-center items-center min-h-0">
              <div className="relative w-full h-full">
                <Image
                  src="/Dr. Buosunia.png"
                  alt="Prof. Dr. M. Shamim Z. Bosunia"
                  fill
                  priority
                  className="object-contain object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-3 flex flex-col gap-5 text-[#2B2B2B] order-3 self-center pl-0 lg:pl-6">
              <p className="font-serif text-[15px] xl:text-[16px] text-dark-text font-light leading-[24px]">
                Prof. Dr. M. Shamim Z. Bosunia is a prominent academician, leader, and structural engineering expert of Bangladesh. He earned his bachelor&apos;s degree in civil engineering in 1965 from Bangladesh University of Engineering and Technology (BUET) and joined Dept. of Civil Engineering as a lecturer in 1969.
              </p>
              <p className="font-serif text-[15px] xl:text-[16px] text-dark-text font-light leading-[24px]">
                He completed his master&apos;s in civil engineering in 1972 from BUET. On a Commonwealth Scholarship, he earned his PhD in 1979 from the University of Strathclyde, UK. He became a professor of civil engineering in 1981. He retired from BUET in 2009 and is now serving as Emeritus Professor, Dept. of Civil Engineering, University of Asia Pacific (UAP), Dhaka.
              </p>
            </div>

          </div>
        </div>
      </motion.main>

      <Footer />
    </>
  );
}