"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useIntro } from "./IntroProvider";

// Lottie container width at center — height follows 16:9 → ~270px at 480px wide
const CENTER_WIDTH = "min(60vw, 480px)";

export default function IntroOverlay() {
  const { introState, advance, introDone } = useIntro();
  const lottieRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lottieRef.current) return;
    let destroyed = false;

    // Fallback: force advance if Lottie stalls (8s)
    const fallback = setTimeout(() => {
      if (!destroyed) advance();
    }, 8000);

    import("lottie-web").then((mod) => {
      if (destroyed || !lottieRef.current) return;

      const anim = mod.default.loadAnimation({
        container: lottieRef.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        path: "/lottie/eiman-estates.json",
        rendererSettings: { preserveAspectRatio: "xMidYMid meet" },
      });

      anim.addEventListener("complete", () => {
        clearTimeout(fallback);
        if (!destroyed) advance(); // idle → transitioning
      });
    });

    return () => {
      destroyed = true;
      clearTimeout(fallback);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (introDone) return null;

  const isExiting = introState === "transitioning";

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden">

      {/* Blur + dark overlay — fades out when Lottie completes */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 1 }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ duration: 1.0, ease: "easeInOut", delay: isExiting ? 0.1 : 0 }}
        style={{
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          backgroundColor: "rgba(0, 0, 0, 0.35)",
        }}
      />

      {/*
        Lottie — plays at center during idle, then flies to nav position.
        Same div handles both phases. Framer Motion animates from current
        state when isExiting switches, so the transition is seamless.

        Geometry:
          y: "-50%" keeps the element's CENTER pinned to `top`.
          idle  → center = 50vh
          exit  → center = 30px (nav logo center, ~30px from top for a 60px header)
          scale → 0.15 shrinks 480×270 visually to ~72×40px (sm:h-10 equivalent)
      */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ left: "50%" }}
        initial={{ top: "50%", x: "-50%", y: "-50%", scale: 1, opacity: 0 }}
        animate={
          isExiting
            ? {
                top: "30px",
                x: "-50%",
                y: "-50%",
                scale: 0.15,
                opacity: 1,
              }
            : {
                top: "50%",
                x: "-50%",
                y: "-50%",
                scale: 1,
                opacity: 1,
              }
        }
        transition={
          isExiting
            ? {
                duration: 1.3,
                ease: [0.16, 1, 0.3, 1],
              }
            : {
                opacity: { duration: 0.7, ease: "easeOut", delay: 0.1 },
                top: { duration: 0 },
                x: { duration: 0 },
                y: { duration: 0 },
                scale: { duration: 0 },
              }
        }
        onAnimationComplete={isExiting ? () => advance() : undefined}
      >
        <div
          ref={lottieRef}
          style={{ width: CENTER_WIDTH, aspectRatio: "16/9" }}
        />
      </motion.div>
    </div>
  );
}
