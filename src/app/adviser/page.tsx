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
    <><motion.main
        initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full min-h-screen min-[1290px]:min-h-[100svh] bg-velora-cream pt-[80px] min-[1290px]:pt-[92px] pb-8 min-[1290px]:pb-0 text-[#050505] flex flex-col"
      >
        <div className="relative z-10 mx-auto w-full max-w-[1600px] flex-1 flex flex-col px-6 sm:px-10 min-[1290px]:px-16">
          {/* Title — fixed at top, never cut */}
          <div className="shrink-0 pt-4 min-[1290px]:pt-5 pb-2 text-center">
            <h1 className="mt-9 font-serif text-[clamp(2rem,4.5vw,4rem)] font-extralight tracking-wide text-[#2B2B2B] leading-none text-balance">
              Honourable Adviser
            </h1>
          </div>

          {/* 3-Column Grid — fills remaining viewport height */}
          <div className="flex-1 grid grid-cols-1 min-[1290px]:grid-cols-12 gap-8 min-[1290px]:gap-6 items-center min-[1290px]:items-start min-[1290px]:content-stretch pb-8 min-[1290px]:pb-0">

            {/* Left Column */}
            <div className="min-[1290px]:col-span-3 flex flex-col gap-6 text-dark-text order-2 min-[1290px]:order-1 self-center min-[1290px]:self-start min-[1290px]:mt-14">
              <div>
                <h2 className="font-serif text-[clamp(1.5rem,2.1vw,2rem)] font-light leading-tight mb-[clamp(1rem,2.2vh,1.75rem)] text-dark-text text-balance">
                  Prof. Dr.{" "}
                  <br className="hidden min-[1290px]:block" />
                  M Shamim Z Bosunia
                </h2>

                <div className="space-y-[clamp(1rem,2.2vh,1.75rem)]">
                  <div>
                    <h3 className="font-serif text-[clamp(1.05rem,1.35vw,1.25rem)] font-light leading-tight text-dark-text">
                      Former Professor and Dean
                    </h3>
                    <p className="font-serif text-[clamp(0.9rem,1.05vw,1rem)] font-light text-dark-text leading-[1.6] mt-1">
                      Civil Engineering, BUET
                    </p>
                  </div>

                  <div>
                    <h3 className="font-serif text-[clamp(1.05rem,1.35vw,1.25rem)] font-light leading-tight text-dark-text">President</h3>
                    <p className="font-serif text-[clamp(0.9rem,1.05vw,1rem)] font-light text-dark-text leading-[1.6] mt-1">
                      Bangladesh Association of Consulting Engineers (BACE)
                    </p>
                  </div>

                  <div>
                    <h3 className="font-serif text-[clamp(1.05rem,1.35vw,1.25rem)] font-light leading-tight text-dark-text">Chairman</h3>
                    <p className="font-serif text-[clamp(0.9rem,1.05vw,1rem)] font-light text-dark-text leading-[1.6] mt-1">
                      Government-appointed Panel of Experts<br />
                      Padma Multipurpose Bridge & Karnaphuli Tunnel
                    </p>
                  </div>

                  <div>
                    <h3 className="font-serif text-[clamp(1.05rem,1.35vw,1.25rem)] font-light leading-tight text-dark-text">40+ years</h3>
                    <p className="font-serif text-[clamp(0.9rem,1.05vw,1rem)] font-light text-dark-text leading-[1.6] mt-1">
                      of National leadership in engineering consultancy
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Column: Portrait — spans full grid height, anchored to bottom */}
            <div className="min-[1290px]:col-span-6 order-1 min-[1290px]:order-2 h-[55vh] min-[1290px]:h-full min-[1290px]:min-h-[600px] min-[1290px]:self-stretch flex justify-center items-end">
              <div className="relative w-full h-full">
                <Image
                  src="/Dr. Buosunia.png"
                  alt="Prof. Dr. M. Shamim Z. Bosunia"
                  fill
                  priority
                  className="object-contain object-center min-[1290px]:object-bottom"
                  sizes="(max-width: 1289px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="min-[1290px]:col-span-3 flex flex-col gap-5 text-[#2B2B2B] order-3 self-center min-[1290px]:self-start pl-0 min-[1290px]:pl-6 min-[1290px]:mt-14">
              <p className="font-serif text-[clamp(0.9rem,1.05vw,1rem)] text-dark-text font-light leading-[1.7] text-pretty">
                Prof. Dr. M. Shamim Z. Bosunia is a prominent academician, leader, and structural engineering expert of Bangladesh. He earned his bachelor&apos;s degree in civil engineering in 1965 from Bangladesh University of Engineering and Technology (BUET) and joined Dept. of Civil Engineering as a lecturer in 1969.
              </p>
              <p className="font-serif text-[clamp(0.9rem,1.05vw,1rem)] text-dark-text font-light leading-[1.7] text-pretty">
                He completed his master&apos;s in civil engineering in 1972 from BUET. On a Commonwealth Scholarship, he earned his PhD in 1979 from the University of Strathclyde, UK. He became a professor of civil engineering in 1981. He retired from BUET in 2009 and is now serving as Emeritus Professor, Dept. of Civil Engineering, University of Asia Pacific (UAP), Dhaka.
              </p>
            </div>

          </div>
        </div>
      </motion.main></>
  );
}