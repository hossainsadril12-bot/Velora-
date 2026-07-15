"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "velora-music-off";

// Only "activation-triggering" events unlock audio playback per browser autoplay policy.
// scroll / wheel / touchstart do NOT grant user activation — audio.play() rejects on them.
const GESTURE_EVENTS = [
  "pointerdown",
  "pointerup",
  "click",
  "keydown",
  "touchend",
] as const;

const FADE_DURATION = 1800; // ms — how long the audio fades in / out

/** Smoothly ramp the audio volume from its current level to a target over `ms` ms. */
function fadeVolume(
  audio: HTMLAudioElement,
  target: number,
  ms: number,
  onDone?: () => void,
) {
  const steps = 60;
  const interval = ms / steps;
  const start = audio.volume;
  let step = 0;
  const id = setInterval(() => {
    step++;
    audio.volume = Math.min(
      1,
      Math.max(0, start + (target - start) * (step / steps)),
    );
    if (step >= steps) {
      clearInterval(id);
      onDone?.();
    }
  }, interval);
  return () => clearInterval(id);
}

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cleanupGestureRef = useRef<(() => void) | null>(null);
  const cancelFadeRef = useRef<(() => void) | null>(null);

  // ─── Setup audio element on mount ──────────────────────────────────────────
  useEffect(() => {
    const audio = new Audio("/audio/mixkit-sea-waves-loop-1196.wav");
    audio.loop = true;
    audio.volume = 0; // Always start silent; fade in on first play
    audio.preload = "auto";
    audioRef.current = audio;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    const userTurnedOff = localStorage.getItem(STORAGE_KEY) === "true";

    const startPlayback = () => {
      audio.volume = 0;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          cancelFadeRef.current = fadeVolume(audio, 0.35, FADE_DURATION);
        })
        .catch(() => {
          // Playback rejected — this can happen if startPlayback is
          // called before a user gesture. Arm gesture unlock instead.
        });
    };

    const armGestureUnlock = () => {
      const handler = () => {
        if (localStorage.getItem(STORAGE_KEY) !== "true") {
          startPlayback();
          disarm();
        } else {
          disarm();
        }
      };
      const disarm = () => {
        GESTURE_EVENTS.forEach((e) =>
          window.removeEventListener(e, handler, { capture: true }),
        );
        cleanupGestureRef.current = null;
      };
      GESTURE_EVENTS.forEach((e) =>
        window.addEventListener(e, handler, { capture: true, passive: true }),
      );
      return disarm;
    };

    if (!userTurnedOff) {
      // Attempt immediate autoplay (succeeds for users with high Media Engagement Index)
      audio.volume = 0;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          cancelFadeRef.current = fadeVolume(audio, 0.35, FADE_DURATION);
        })
        .catch(() => {
          // Blocked by autoplay policy — unlock on the very first gesture
          cleanupGestureRef.current = armGestureUnlock();
        });
    }

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      cancelFadeRef.current?.();
      audio.pause();
      audio.src = "";
      cleanupGestureRef.current?.();
    };
  }, []);

  // ─── Manual toggle ──────────────────────────────────────────────────────────
  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Cancel any in-progress fade
    cancelFadeRef.current?.();
    cancelFadeRef.current = null;

    if (isPlaying) {
      // Fade out, then pause
      cancelFadeRef.current = fadeVolume(audio, 0, FADE_DURATION / 2, () => {
        audio.pause();
      });
      localStorage.setItem(STORAGE_KEY, "true");
    } else {
      localStorage.removeItem(STORAGE_KEY);
      audio.volume = 0;
      try {
        await audio.play();
        cancelFadeRef.current = fadeVolume(audio, 0.35, FADE_DURATION);
      } catch {
        // Button click IS a gesture — this should essentially never happen
      }
    }
  }, [isPlaying]);

  // ─── Sound-wave bar animation delays ───────────────────────────────────────
  const bars = [0, 0.15, 0.05, 0.2, 0.1]; // stagger delays per bar

  return (
    <button
      onClick={toggle}
      className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-xl border border-white/30 shadow-[0_4px_24px_rgba(0,0,0,0.18)] text-white transition-all duration-300 hover:bg-white/30 hover:border-white/50 hover:scale-105 focus:outline-none cursor-pointer"
      aria-label={isPlaying ? "Mute background music" : "Play background music"}
      title={isPlaying ? "Mute" : "Play ambient sound"}
    >
      {/* Ripple ring when playing */}
      <AnimatePresence>
        {isPlaying && (
          <>
            <motion.span
              key="ring1"
              className="pointer-events-none absolute inset-0 rounded-full border border-white/30"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.7, opacity: 0 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span
              key="ring2"
              className="pointer-events-none absolute inset-0 rounded-full border border-white/20"
              initial={{ scale: 1, opacity: 0.4 }}
              animate={{ scale: 2.1, opacity: 0 }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.8,
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Icon */}
      <AnimatePresence mode="wait">
        {isPlaying ? (
          /* Sound-wave bars (playing state) */
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
                className="block w-[2.5px] rounded-full bg-white"
                animate={{
                  height: ["5px", "14px", "8px", "14px", "5px"],
                  opacity: [0.7, 1, 0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay,
                }}
              />
            ))}
          </motion.div>
        ) : (
          /* Muted speaker icon */
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
