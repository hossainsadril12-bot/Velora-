"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "./AudioProvider";

export default function MusicToggle() {
  const { isPlaying, toggle } = useAudio();
  const bars = [0, 0.15, 0.05, 0.2, 0.1];

  return (
    <button
      onClick={toggle}
      className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-white/50 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(1,86,63,0.2)] text-dark-green transition-all duration-300 hover:bg-white/70 hover:scale-105 focus:outline-none cursor-pointer"
      aria-label={isPlaying ? "Mute music" : "Play music"}
      title={isPlaying ? "Mute" : "Play music"}
    >
      {/* Ripple ring only while ACTUALLY playing */}
      <AnimatePresence>
        {isPlaying && (
          <>
            <motion.span
              key="ring1"
              className="pointer-events-none absolute inset-0 rounded-full border border-dark-green/30"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.7, opacity: 0 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span
              key="ring2"
              className="pointer-events-none absolute inset-0 rounded-full border border-dark-green/20"
              initial={{ scale: 1, opacity: 0.4 }}
              animate={{ scale: 2.1, opacity: 0 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Icon reflects ACTUAL playback, not intent */}
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.div
            key="playing"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="flex items-end gap-[2.5px] h-4"
            aria-hidden
          >
            {bars.map((delay, i) => (
              <motion.span
                key={i}
                className="block w-[2.5px] rounded-full bg-dark-green"
                animate={{
                  height: ["5px", "14px", "8px", "14px", "5px"],
                  opacity: [0.7, 1, 0.7, 1, 0.7],
                }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", delay }}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="muted"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            aria-hidden
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 opacity-80"
            >
              <path d="M11 5 6 9H2v6h4l5 4V5Z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
