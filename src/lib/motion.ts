import type { Variants, Transition } from "framer-motion";

/* ──────────────────────────────────────────────────────────────────────────
   San Felice — global scroll-animation tokens
   Mirrors the JSON spec: easings + transition presets + reusable variants.
   ──────────────────────────────────────────────────────────────────────── */

/* Easings ----------------------------------------------------------------- */
export const easeJ = [0.59, 0.08, 0.17, 0.98] as const; // primary
export const easeQ = [0.12, 0, 0.48, 1] as const; // secondary (cubic)
export const easeDefault = [0.25, 0.1, 0.25, 1] as const;
export const easeSharp = [0.87, 0, 0.13, 1] as const;

/* Transition presets ------------------------------------------------------ */
export const transitionDefaultShort: Transition = { duration: 2.1, ease: easeJ };
export const transitionDefault: Transition = {
  duration: 2.5,
  ease: easeJ,
  staggerChildren: 0.2,
};
export const transitionDefaultDelayed: Transition = { duration: 2.5, ease: easeJ, delay: 1.0 };
export const transitionDefaultDelayedLong: Transition = { duration: 4.2, ease: easeJ, delay: 0.8 };
export const transitionCubicShort: Transition = { duration: 2.1, ease: easeQ };
export const transitionCubicShortDelay: Transition = { duration: 2.1, ease: easeQ, delay: 0.8 };
export const transitionCubic: Transition = { duration: 2.5, ease: easeQ };
export const transitionCubicDelay: Transition = { duration: 2.5, ease: easeQ, delay: 0.8 };
export const transitionDefaultLong: Transition = { duration: 4.2, ease: easeQ };
export const transitionBorgo: Transition = { duration: 2.0, ease: easeJ };
export const fadeInOut: Transition = { duration: 1.0, ease: easeSharp };

/* Shared viewport trigger ------------------------------------------------- */
export const viewportOnce = { once: true, margin: "0px 0px -20px 0px" } as const;

/* ──────────────────────────────────────────────────────────────────────────
   Heading clip reveal — text "emerges" from below an invisible mask line.
   Wrap text in an overflow-hidden block; apply these to the inner element.
   ──────────────────────────────────────────────────────────────────────── */
type HeadingDir = "fromBottom" | "fromTop" | "fromBottomRotated" | "fromTopRotated";

const headingHidden: Record<HeadingDir, { y: string; rotate: number }> = {
  fromBottom: { y: "120%", rotate: 0 },
  fromTop: { y: "-120%", rotate: 0 },
  fromBottomRotated: { y: "120%", rotate: -10 },
  fromTopRotated: { y: "-120%", rotate: 10 },
};

export function headingReveal(dir: HeadingDir = "fromBottom", delay = 0): Variants {
  return {
    hidden: headingHidden[dir],
    visible: {
      y: "0%",
      rotate: 0,
      transition: { duration: 2.5, ease: easeJ, delay },
    },
  };
}

/* Image clip-path wipe (container) + Ken Burns scale (inner) --------------- */
export const imageClipVariants: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  visible: { clipPath: "inset(0% 0% 0% 0%)", transition: transitionCubic },
};

export function imageInnerScale(from = 1.4): Variants {
  return {
    hidden: { scale: from },
    visible: { scale: 1, transition: transitionDefaultLong },
  };
}

/* CTA button clip-path reveal --------------------------------------------- */
export function buttonReveal(delay = 0.8): Variants {
  return {
    hidden: { clipPath: "inset(100% 0% 0% 0%)" },
    visible: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 2.4, ease: easeQ, delay } },
  };
}

/* Divider line — slides in from the left edge ----------------------------- */
export const dividerReveal: Variants = {
  hidden: { x: "-100vw" },
  visible: { x: "0vw", transition: transitionCubic },
};

/* Horizontal panel slides -------------------------------------------------- */
export const panelSlideLeft: Variants = {
  hidden: { x: "-100vw" },
  visible: { x: "0vw", transition: transitionBorgo },
};

export const panelSlideRight: Variants = {
  hidden: { x: "100%" },
  visible: { x: "0%", transition: transitionBorgo },
};

/* Floating element scale-in ----------------------------------------------- */
export function scaleIn(delay = 0.8): Variants {
  return {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 2.0, ease: easeQ, delay } },
  };
}
