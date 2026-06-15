"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HERO_IMG = "/hero-bg.jpg";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Background scrolls at ~0.5x
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  // AUTHENTIC + TUSCAN scroll up faster than page
  const topY = useTransform(scrollYProgress, [0, 1], ["0%", "-160%"]);
  // SOUL emerges from bottom
  const soulY = useTransform(scrollYProgress, [0, 1], ["60%", "-20%"]);
  const descOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const reveal = {
    hidden: { opacity: 0, y: 60 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] as const },
    }),
  };

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden bg-dark-green">
      {/* Parallax background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 h-[120%] w-full">
        <Image
          src={HERO_IMG}
          alt="Aerial view of Borgo San Felice vineyard and estate in Tuscany"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(24,48,41,0.3)]" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-between py-28 text-cream">
        <motion.div style={{ y: topY }} className="flex flex-col items-center">
          <motion.h2
            custom={0}
            initial="hidden"
            animate="show"
            variants={reveal}
            className="font-serif uppercase leading-[0.9] text-[64px] sm:text-[96px] lg:text-[128px]"
          >
            Authentic
          </motion.h2>
          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={reveal}
            className="font-serif uppercase leading-[0.9] text-[64px] sm:text-[96px] lg:text-[128px]"
          >
            Tuscan
          </motion.h1>
        </motion.div>

        <motion.p
          style={{ opacity: descOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="max-w-[380px] text-center font-sans text-base leading-relaxed text-cream"
        >
          Discover &ldquo;Star Bene&rdquo;, the Italian way of feeling good by enjoying the
          beautiful things in life. Immerse yourself in the beauty of San Felice and unveil its
          world.
        </motion.p>

        <motion.h1
          style={{ y: soulY }}
          className="font-serif uppercase leading-[0.9] text-[64px] sm:text-[96px] lg:text-[128px]"
        >
          Soul
        </motion.h1>
      </div>
    </section>
  );
}
