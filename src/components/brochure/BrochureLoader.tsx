"use client";

import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/Logo";

const EASE = [0.16, 1, 0.3, 1] as const;

type BrochureLoaderProps = {
  /** 0–1. */
  progress: number;
  done: boolean;
  reducedMotion: boolean;
};

/** Covers the viewer until the book and its first pages are ready. */
export default function BrochureLoader({ progress, done, reducedMotion }: BrochureLoaderProps) {
  const d = reducedMotion ? 0 : 1;
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          role="status"
          aria-live="polite"
          exit={{ opacity: 0, transition: { duration: 0.5 * d, ease: EASE } }}
          className="absolute inset-x-0 bottom-0 top-[70px] z-20 flex flex-col items-center justify-center gap-5 bg-brochure-stage lg:top-[100px]"
        >
          <Logo className="w-40 text-dark-text sm:w-48" />
          <p className="font-sans text-[14px] text-dark-text/70">Loading brochure…</p>
          <div
            role="progressbar"
            aria-label="Loading brochure"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
            className="h-[2px] w-40 overflow-hidden rounded-full bg-dark-text/10 sm:w-48"
          >
            <motion.div
              className="h-full origin-left bg-tan"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress }}
              transition={{ duration: 0.4 * d, ease: EASE }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
