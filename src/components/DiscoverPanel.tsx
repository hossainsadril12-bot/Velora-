"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RevealText, ButtonReveal } from "./anim";

export default function DiscoverPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="bg-deep-green px-5 py-12 sm:py-16 lg:py-20 text-center relative overflow-hidden">
      <div className="flex flex-col items-center">
        <RevealText
          as="h2"
          dir="fromBottom"
          className="font-serif tracking-wide text-white text-[28.8px] leading-tight"
        >
          Where Design Excellence Meets Trusted Leadership
        </RevealText>

        <ButtonReveal className="mt-10" delay={0.4}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-block uppercase font-sans font-bold text-[10px] tracking-[2.5px] px-[35px] py-[18px] border transition-all duration-300 cursor-pointer bg-cream text-dark-text border-cream hover:bg-transparent hover:text-white hover:border-white"
          >
            {isOpen ? "Close Philosophy" : "About Us"}
          </button>
        </ButtonReveal>
      </div>

      {/* Expandable Philosophy Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl mx-auto overflow-hidden"
          >
            <div className="pt-12 pb-6 px-4 md:px-8 text-cream/90 flex flex-col items-center">
              <div className="w-16 h-px bg-white/30 mb-8" />
              <p className="font-serif italic text-xl md:text-2xl text-white mb-6 max-w-xl leading-relaxed">
                &ldquo;Star Bene&rdquo; is the art of feeling good, an authentic Italian way of living centered around harmony, nature, and the celebration of life&apos;s finest details.
              </p>
              <p className="font-sans text-sm md:text-base leading-relaxed text-cream/70 max-w-lg mb-8">
                At San Felice, this philosophy guides everything we do. From the careful cultivation of our historic vineyards and native grape varietals to the slow, refined hospitality of our Relais &amp; Châteaux resort, we invite you to disconnect from the noise and connect with the timeless beauty of Tuscany.
              </p>
              <div className="grid grid-cols-3 gap-4 w-full max-w-md border-t border-cream/10 pt-8 mt-2">
                <div className="text-center">
                  <span className="block font-serif text-2xl text-white">714</span>
                  <span className="font-sans text-[9px] uppercase tracking-wider text-cream/50">Founded</span>
                </div>
                <div className="text-center border-x border-cream/10">
                  <span className="block font-serif text-2xl text-white">685 ha</span>
                  <span className="font-sans text-[9px] uppercase tracking-wider text-cream/50">Total Area</span>
                </div>
                <div className="text-center">
                  <span className="block font-serif text-2xl text-white">1992</span>
                  <span className="font-sans text-[9px] uppercase tracking-wider text-cream/50">Relais affiliation</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
