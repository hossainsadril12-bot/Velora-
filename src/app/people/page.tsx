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
    name: "Akmal Hossain",
    role: "Director",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Abu Rasel\nMuhammad Masum",
    role: "Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Iqram Kabir Khan",
    role: "Director",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Prof. Dr. M Shamim\nZ Bosunia",
    role: "Chief Advisor",
    image: "/Dr. Buosunia.png",
  },
  {
    name: "Nabila Rahman",
    role: "Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Tariqul Islam",
    role: "Director",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Anisul Huq",
    role: "Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Kamrul Hasan",
    role: "Director",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Farhana Chowdhury",
    role: "Director",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=700&q=80",
  },
];

export default function PeoplePage() {
  const col0 = PEOPLE.filter((_, i) => i % 4 === 0);
  const col1 = PEOPLE.filter((_, i) => i % 4 === 1);
  const col2 = PEOPLE.filter((_, i) => i % 4 === 2);
  const col3 = PEOPLE.filter((_, i) => i % 4 === 3);

  const renderPersonCard = (person: Person) => (
    <article
      key={person.name}
      className="group flex flex-col w-[226px] text-left"
    >
      {/* Image Container */}
      <div className="relative w-[226px] h-[226px] overflow-hidden bg-[#F2EDE4]">
        <Image
          src={person.image}
          alt={person.name.replace("\n", " ")}
          width={500}
          height={500}
          className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* Text Info */}
      <div className="mt-6 flex flex-col">
        <h3 className="font-serif text-[21px] font-light leading-snug text-dark-text whitespace-pre-line">
          {person.name}
        </h3>
        <p className="font-serif text-[16px] font-[300] capitalize tracking-[2px] text-dark-green mt-2">
          {person.role}
        </p>
      </div>
    </article>
  );

  return (
    <>
      <Header theme="light" />

      <motion.main
        initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full min-h-screen bg-velora-cream pt-[90px] lg:pt-[110px] pb-20 lg:pb-32 text-dark-text overflow-hidden"
      >
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-8 pt-8 sm:pt-12">
          {/* Title */}
          <div className="text-center">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[64px] font-extralight tracking-wide text-dark-text">
              People
            </h1>
          </div>

          {/* Intro */}
          <p className="mx-auto mt-8 max-w-[760px] text-center font-serif text-[18px] font-light leading-[26px] text-dark-text">
            Eiman Estates Ltd. is formed and governed by an eclectic mix of
            industry dignitaries. Their collective years of experience and
            profound sense of judgement are always there to guide you through
            this journey of investment partnership.
          </p>

          {/* Staggered Desktop Layout */}
          <div className="hidden lg:flex lg:justify-center lg:gap-[112px] items-start mt-16">
            <div className="flex flex-col gap-[146px] pt-[180px]">
              {col0.map(renderPersonCard)}
            </div>
            <div className="flex flex-col gap-[146px] pt-[80px]">
              {col1.map(renderPersonCard)}
            </div>
            <div className="flex flex-col gap-[146px] pt-[260px]">
              {col2.map(renderPersonCard)}
            </div>
            <div className="flex flex-col gap-[146px] pt-0">
              {col3.map(renderPersonCard)}
            </div>
          </div>

          {/* Responsive Mobile/Tablet Layout (Flat grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[112px] gap-y-[146px] justify-items-center lg:hidden mt-12 sm:mt-16 mb-[24px]">
            {PEOPLE.map(renderPersonCard)}
          </div>
        </div>
      </motion.main>

      <Footer />
    </>
  );
}
