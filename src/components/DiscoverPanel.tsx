"use client";

import { motion } from "framer-motion";
import { RevealText, ButtonReveal } from "./anim";
import TransitionLink from "./TransitionLink";

export default function DiscoverPanel() {
  return (
    <section className="bg-deep-green px-5 py-12 sm:py-16 lg:py-20 xl:py-24 text-center relative overflow-hidden">
      <div className="flex flex-col items-center">
        <RevealText
          as="h2"
          dir="fromBottom"
          className="font-serif tracking-wide text-white text-[22px] sm:text-[26px] lg:text-[32px] xl:text-[36px] leading-tight max-w-[900px]"
        >
          Where design excellence meets trusted leadership
        </RevealText>

        <ButtonReveal className="mt-10" delay={0.4}>
          <TransitionLink
            href="/about"
            className="inline-block uppercase font-sans font-bold text-[10px] tracking-[2.5px] px-[35px] py-[18px] border transition-all duration-300 cursor-pointer bg-cream text-dark-text border-cream hover:bg-transparent hover:text-white hover:border-white"
          >
            About Us
          </TransitionLink>
        </ButtonReveal>
      </div>
    </section>
  );
}
