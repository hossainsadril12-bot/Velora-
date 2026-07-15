"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIntro } from "./IntroProvider";

export default function IntroOverlay() {
  const { introState, advance, introDone } = useIntro();

  // If fully completed, unmount from DOM
  if (introDone) return null;

  const isExiting = introState === "transitioning";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        pointerEvents: "auto",
        touchAction: "none",
      }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 1 }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ duration: 1.0, ease: "easeInOut", delay: isExiting ? 0.1 : 0 }}
        onAnimationComplete={isExiting ? () => advance() : undefined}
        style={{
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          backgroundColor: "rgba(0, 0, 0, 0.35)",
        }}
      />
    </div>
  );
}
