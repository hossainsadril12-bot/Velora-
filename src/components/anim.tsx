"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  headingReveal,
  imageClipVariants,
  imageInnerScale,
  buttonReveal,
  dividerReveal,
  viewportOnce,
} from "@/lib/motion";

type Dir = "fromBottom" | "fromTop" | "fromBottomRotated" | "fromTopRotated";

/* ──────────────────────────────────────────────────────────────────────────
   RevealText — masked heading line. Text emerges from below an overflow-hidden
   clip line, sliding (and optionally rotating) into place.
   Render one per line. `as` picks the heading tag; styling via className.
   ──────────────────────────────────────────────────────────────────────── */
export function RevealText({
  children,
  as: Tag = "span",
  dir = "fromBottom",
  delay = 0,
  origin = "left top",
  className = "",
  wrapClassName = "",
}: {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "p" | "span" | "div";
  dir?: Dir;
  delay?: number;
  origin?: string;
  className?: string;
  wrapClassName?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, viewportOnce);
  const MotionTag = motion[Tag] as typeof motion.span;
  return (
    <span ref={ref} className={`block overflow-hidden ${wrapClassName}`}>
      <MotionTag
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={headingReveal(dir, delay)}
        style={{ transformOrigin: origin, display: "block" }}
        className={className}
      >
        {children}
      </MotionTag>
    </span>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   ImageReveal — clip-path wipe-up + inner Ken Burns scale-down.
   Pass the <Image>/<img> as children; it fills the container.
   ──────────────────────────────────────────────────────────────────────── */
export function ImageReveal({
  children,
  scaleFrom = 1.4,
  className = "",
}: {
  children: React.ReactNode;
  scaleFrom?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, viewportOnce);
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={imageClipVariants}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div
        variants={imageInnerScale(scaleFrom)}
        style={{ transformOrigin: "center center" }}
        className="relative h-full w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   ButtonReveal — clip-path wipe-up wrapper for any CTA.
   ──────────────────────────────────────────────────────────────────────── */
export function ButtonReveal({
  children,
  delay = 0.8,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, viewportOnce);
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={buttonReveal(delay)}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   DividerLine — horizontal rule that slides in from the left edge.
   ──────────────────────────────────────────────────────────────────────── */
export function DividerLine({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, viewportOnce);
  return (
    <div ref={ref} className={`w-full overflow-hidden ${className}`}>
      <motion.span
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={dividerReveal}
        className="block w-full border-t border-current"
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   FadeUp — subtle opacity + small translateY fade-in (headlines, dates).
   ──────────────────────────────────────────────────────────────────────── */
export function FadeUp({
  children,
  y = 10,
  delay = 0,
  duration = 0.8,
  className = "",
}: {
  children: React.ReactNode;
  y?: number;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, viewportOnce);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   InViewGroup — a section-level trigger that drives stagger/orchestration for
   variant-children that read parent state ("hidden"/"visible").
   ──────────────────────────────────────────────────────────────────────── */
export function InViewGroup({
  children,
  variants,
  className = "",
  amount,
}: {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { ...viewportOnce, amount });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
