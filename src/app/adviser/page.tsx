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
        className="relative w-full min-h-screen bg-velora-cream pt-[90px] lg:pt-[110px] pb-0 text-[#050505] overflow-hidden"
      >
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-16 pt-8 sm:pt-12">
          {/* Title */}
          <div className="mt-[56px] mb-[28px] text-center">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-[64px] font-extralight tracking-wide text-[#2B2B2B]">
              Honourable Adviser
            </h1>
          </div>

          {/* 3-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-start">

            {/* Left Column */}
            <div className="lg:col-span-3 flex flex-col gap-6 text-dark-text order-2 lg:order-1 pt-0 lg:pt-[16vh]">
              <div>
                <h2 className="font-sans text-[32px] font-light leading-tight mb-7 whitespace-nowrap text-dark-text">
                  Prof. Dr. M Shamim Z Bosunia
                </h2>

                <div className="space-y-7">
                  <div>
                    <h3 className="font-sans text-[24px] font-extralight leading-tight text-dark-text whitespace-nowrap">
                      Former Professor and Dean
                    </h3>
                    <p className="font-sans text-[16px] font-extralight text-dark-text leading-[24px] mt-1">
                      Civil Engineering, BUET
                    </p>
                  </div>

                  <div>
                    <h3 className="font-sans text-[24px] font-extralight leading-tight text-dark-text whitespace-nowrap">President</h3>
                    <p className="font-sans text-[16px] font-extralight text-dark-text leading-[24px] mt-1">
                      Bangladesh Association of Consulting Engineers (BACE)
                    </p>
                  </div>

                  <div>
                    <h3 className="font-sans text-[24px] font-extralight leading-tight text-dark-text whitespace-nowrap">Chairman</h3>
                    <p className="font-sans text-[16px] font-extralight text-dark-text leading-[24px] mt-1">
                      Government-appointed Panel of Experts<br />
                      Padma Multipurpose Bridge & Karnaphuli Tunnel
                    </p>
                  </div>

                  <div>
                    <h3 className="font-sans text-[24px] font-extralight leading-tight text-dark-text whitespace-nowrap">40+ years</h3>
                    <p className="font-sans text-[16px] font-extralight text-dark-text leading-[24px] mt-1">
                      of National leadership in engineering consultancy
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Column: Portrait — tall, anchored to bottom internally */}
            <div className="lg:col-span-6 flex justify-center items-end order-1 lg:order-2 h-[65vh] sm:h-[78vh] lg:h-[calc(100vh-150px)]">
              <div className="relative w-full h-full">
                <Image
                  src="/Dr. Buosunia.png"
                  alt="Prof. Dr. M. Shamim Z. Bosunia"
                  fill
                  priority
                  className="object-contain object-bottom"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-3 flex flex-col gap-5 text-[#2B2B2B] order-3 pt-0 lg:pt-[16vh] pl-0 lg:pl-6">
              <p className="font-sans text-[16px] text-dark-text font-extralight leading-[24px]">
                Prof. Dr. M. Shamim Z. Bosunia is a<br />
                prominent academician, leader, and<br />
                structural engineering expert of<br />
                Bangladesh. He earned his bachelor&apos;s<br />
                degree in civil engineering in 1965 from<br />
                Bangladesh University of Engineering<br />
                and Technology (BUET) and joined<br />
                Dept. of Civil Engineering as a lecturer<br />
                in 1969.
              </p>
              <p className="font-sans text-[16px] text-dark-text font-extralight leading-[24px]">
                He completed his master&apos;s in civil<br />
                engineering in 1972 from BUET. On a<br />
                Commonwealth Scholarship, he earned<br />
                his PhD in 1979 from the University of<br />
                Strathclyde, UK. He became a<br />
                professor of civil engineering in 1981.<br />
                He retired from BUET in 2009 and is<br />
                now serving as Emeritus Professor,<br />
                Dept. of Civil Engineering, University of<br />
                Asia Pacific (UAP), Dhaka.
              </p>
            </div>

          </div>
        </div>
      </motion.main>

      <Footer />
    </>
  );
}