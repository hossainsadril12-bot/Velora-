"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { useBooking } from "@/components/BookingProvider";

export default function AboutPage() {
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
          {/* Main Layout: Centered Single Column */}
          <div className="flex flex-col items-center justify-start flex-grow w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-0 pt-10 sm:pt-16 pb-24 text-center">
            
            <h1 className="font-serif text-5xl md:text-6xl lg:text-[64px] font-thin tracking-wide text-[#2B2B2B] mb-12">
              About
            </h1>

            <p className="font-sans text-[18px] font-extralight leading-[26px] text-dark-text mb-16 sm:mb-24 max-w-full lg:max-w-[1150px]">
              Eiman Estates Ltd., a new-generation real estate developer driven by the principles of ethical practices <br className="hidden lg:inline" />
              and fair business policies. Led by veteran professionals from different sectors, Eiman Estates Ltd. <br className="hidden lg:inline" />
              aspires to earn unwavering trust from its customers, stakeholders, authorities, and market peers. We <br className="hidden lg:inline" />
              are here to pave the way for investment opportunities where an investor earns more than mere profit, <br className="hidden lg:inline" />
              rather a peace of mind and true value for their hard-earned money.
            </p>

            <div className="relative w-full aspect-[2/1] sm:aspect-[21/9] overflow-hidden group">
              <Image
                src="/lucas-kepner-Yn8D5B8C-eY-unsplash.jpg.jpeg"
                alt="Eiman Estates Premium Property"
                fill
                priority
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 1000px"
              />
              <div className="absolute inset-0 bg-black/5 transition-opacity duration-500 group-hover:bg-transparent" />
            </div>

          </div>
        </div>
      </motion.main>

      <Footer />
    </>
  );
}
