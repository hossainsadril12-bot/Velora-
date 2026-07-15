"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const STORAGE_KEY = "velora-music-off";
// Any of these count as the "first user gesture" browsers require to unlock audio.
const GESTURE_EVENTS = [
  "pointerdown",
  "click",
  "keydown",
  "touchstart",
  "wheel",
  "scroll",
] as const;

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const audio = new Audio("/audio/mixkit-sea-waves-loop-1196.wav");
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = "auto";
    audioRef.current = audio;

    const userTurnedOff = localStorage.getItem(STORAGE_KEY) === "true";

    // Keep local UI state in sync if the media element pauses/plays for any reason.
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    const startPlayback = () => {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    };

    const armGestureUnlock = () => {
      const handler = () => {
        // Only start if the user hasn't explicitly muted since load.
        if (localStorage.getItem(STORAGE_KEY) !== "true") startPlayback();
        disarm();
      };
      const disarm = () => {
        GESTURE_EVENTS.forEach((e) =>
          window.removeEventListener(e, handler, { capture: true }),
        );
      };
      GESTURE_EVENTS.forEach((e) =>
        window.addEventListener(e, handler, { capture: true, passive: true }),
      );
      return disarm;
    };

    if (!userTurnedOff) {
      // Try immediate playback (works for returning visitors / high engagement).
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Blocked by autoplay policy — start on the very first user gesture.
          cleanupRef.current = armGestureUnlock();
        });
    }

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.pause();
      audio.src = "";
      cleanupRef.current?.();
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      localStorage.setItem(STORAGE_KEY, "true");
    } else {
      localStorage.removeItem(STORAGE_KEY);
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        // Extremely rare (button click IS a gesture) — ignore.
      }
    }
  };

  return (
    <button
      onClick={toggle}
      className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white/50 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(1,86,63,0.2)] text-dark-green transition-transform hover:scale-105 focus:outline-none cursor-pointer"
      aria-label={isPlaying ? "Mute background music" : "Play background music"}
    >
      {isPlaying && (
        <span className="pointer-events-none absolute inset-0 rounded-full border border-white/40 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-50" />
      )}

      <motion.div
        key={isPlaying ? "on" : "off"}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center"
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M11 5 6 9H2v6h4l5 4V5Z" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M11 5 6 9H2v6h4l5 4V5Z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </motion.div>
    </button>
  );
}
