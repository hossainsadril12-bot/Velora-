"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Expose Lenis globally so the scroll utility can use lenis.scrollTo()
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Lenis smooth-scroll provider. Mounts once at the root, drives a single RAF
 * loop, and respects prefers-reduced-motion (skips smoothing entirely).
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      lerp: 0.05, // Lower lerp for much smoother, heavier, premium scroll
      smoothWheel: true,
      wheelMultiplier: 0.8, // Reduced speed for a more relaxed feel
      touchMultiplier: 1.5, // Slightly reduced touch speed
      infinite: false,
    });

    // Expose globally so scroll utility can use lenis.scrollTo()
    window.__lenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
