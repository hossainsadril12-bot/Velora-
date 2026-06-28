"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";

type Person = {
  name: string;
  role: string;
  image: string;
};

const PEOPLE: Person[] = [
  {
    name: "Paul Venables",
    role: "Chairman",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80&sat=-100",
  },
  {
    name: "Will McGinness",
    role: "MD",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80&sat=-100",
  },
  {
    name: "Paul Birks-Hay",
    role: "Director",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=700&q=80&sat=-100",
  },
  {
    name: "Kate Jeffers",
    role: "Director",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80&sat=-100",
  },
  {
    name: "Michael Davidson",
    role: "Director",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80&sat=-100",
  },
  {
    name: "Lee Einhorn",
    role: "Director",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=700&q=80&sat=-100",
  },
  {
    name: "Gary Brown",
    role: "Director",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=700&q=80&sat=-100",
  },
  {
    name: "Mary Johnstone",
    role: "Director",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=700&q=80&sat=-100",
  },
];

export default function PeoplePage() {
  return (
    <>
      <Header theme="light" />

      <motion.main
        initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full min-h-screen bg-velora-cream pt-[90px] lg:pt-[110px] pb-20 lg:pb-28 text-dark-text overflow-hidden"
      >
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-16 pt-8 sm:pt-12">
          {/* Title */}
          <div className="text-center">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[64px] font-extralight tracking-wide text-dark-text">
              People
            </h1>
          </div>

          {/* Intro */}
          <p className="mx-auto mt-8 max-w-[760px] text-center font-sans text-[18px] font-extralight leading-[26px] text-dark-text">
            Eiman Estates Ltd. is formed and governed by an eclectic mix of
            industry dignitaries. Their collective years of experience and
            profound sense of judgement are always there to guide you through
            this journey of investment partnership.
          </p>

          {/* People Grid */}
          <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {PEOPLE.map((person) => (
              <article
                key={person.name}
                className="group relative aspect-[4/5] w-full overflow-hidden bg-dark-text/5"
              >
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  className="object-cover grayscale transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Bottom gradient for text legibility */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Designation only */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-sans text-[24px] font-light tracking-[1.5px] text-white/85">
                    {person.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </motion.main>

      <Footer />
    </>
  );
}
