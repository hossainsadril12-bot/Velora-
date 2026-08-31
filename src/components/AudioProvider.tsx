"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "velora-music-off";
const OPENING_SRC = "/hero-opening-audio.mp3"; // phase 1 — first video's own music
const LOOP_SRC = "/hero-loop.mp3"; // phase 2 — ambient loop for the second video
const OPENING_VOLUME = 0.6;
const LOOP_VOLUME = 0.20; // decreased 50% from 0.40
const FADE = 1000; // ms crossfade
const LOOP_START_DELAY = 1200; // matches the black hold before the 2nd video reveals

const ACTIVATION_EVENTS = [
  "pointerdown",
  "pointerup",
  "click",
  "keydown",
  "touchend",
] as const;

function fadeVolume(el: HTMLMediaElement, target: number, ms: number, onDone?: () => void) {
  const steps = 30;
  const interval = ms / steps;
  const start = el.volume;
  let step = 0;
  const id = setInterval(() => {
    step++;
    el.volume = Math.min(1, Math.max(0, start + (target - start) * (step / steps)));
    if (step >= steps) {
      clearInterval(id);
      onDone?.();
    }
  }, interval);
  return () => clearInterval(id);
}

type Phase = "opening" | "looping";

type Impl = {
  startOpening: () => Promise<boolean>;
  startLoop: () => Promise<boolean>;
  applyForPhase: () => Promise<boolean>;
  arm: () => void;
  isOff: () => boolean;
};

type AudioCtx = {
  /** ACTUAL audible playback (phase-1 opening music OR phase-2 loop). Drives the icon. */
  isPlaying: boolean;
  /** Button handler: mute if playing, else start the current phase now (trusted gesture). */
  toggle: () => void;
  /** Hero registers the opening <video> so phase-1 audio can be time-synced to it (read-only). */
  registerOpeningVideo: (el: HTMLVideoElement | null) => void;
  /** Hero calls this once the opening video starts (phase 1). */
  notifyOpeningPlaying: () => void;
  /** Hero calls this when the opening video ends → fade phase-1 out, start the loop (phase 2). */
  enterLooping: () => void;
};

const Ctx = createContext<AudioCtx | undefined>(undefined);

export function useAudio() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAudio must be used within an AudioProvider");
  return c;
}

/**
 * Two-stage hero music, fully decoupled from the <video>:
 *   phase 1  — the first video's own music (hero-opening-audio.mp3), roughly synced to it
 *   phase 2  — Loop.mp3 on loop, starts when the first video finishes
 * This controller only ever touches its own <audio> elements — it NEVER plays,
 * pauses, mutes or unmutes the video. The video stays a muted, independent visual.
 */
export default function AudioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const pathname = usePathname();

  const videoRef = useRef<HTMLVideoElement | null>(null); // read-only, for time sync
  const openRef = useRef<HTMLAudioElement | null>(null);
  const loopRef = useRef<HTMLAudioElement | null>(null);
  const phaseRef = useRef<Phase>(pathname === "/" ? "opening" : "looping");
  const disarmRef = useRef<(() => void) | null>(null);
  const fadeOpen = useRef<(() => void) | null>(null);
  const fadeLoop = useRef<(() => void) | null>(null);
  const loopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const impl = useRef<Impl | null>(null);

  useEffect(() => {
    const open = new Audio(OPENING_SRC);
    open.loop = false;
    open.volume = 0;
    open.preload = "auto";
    openRef.current = open;

    const loop = new Audio(LOOP_SRC);
    loop.loop = true;
    loop.volume = 0;
    loop.preload = "auto";
    loopRef.current = loop;

    // isPlaying = either element audibly playing (stays true across the handoff).
    const sync = () => setIsPlaying(!open.paused || !loop.paused);
    ["play", "playing", "pause", "ended"].forEach((e) => {
      open.addEventListener(e, sync);
      loop.addEventListener(e, sync);
    });

    // Auto-transition to loop when opening audio finishes naturally
    const onOpenEnded = () => {
      phaseRef.current = "looping";
      startLoop();
    };
    open.addEventListener("ended", onOpenEnded);

    const isOff = () => {
      try {
        return localStorage.getItem(STORAGE_KEY) === "true";
      } catch {
        return false;
      }
    };

    const startOpening = () => {
      const el = openRef.current;
      if (!el) return Promise.resolve(false);
      if (!el.paused && el.volume > 0.01) return Promise.resolve(true);

      const v = videoRef.current;
      if (v && Number.isFinite(v.currentTime) && v.currentTime > 0) {
        try {
          el.currentTime = v.currentTime;
        } catch {}
      }
      fadeOpen.current?.();
      el.volume = 0.05;
      return el
        .play()
        .then(() => {
          fadeOpen.current = fadeVolume(el, OPENING_VOLUME, FADE);
          return true;
        })
        .catch(() => false);
    };

    const startLoop = () => {
      const el = loopRef.current;
      if (!el) return Promise.resolve(false);
      if (!el.paused && el.volume > 0.01) return Promise.resolve(true);

      fadeLoop.current?.();
      el.volume = 0.05;
      return el
        .play()
        .then(() => {
          fadeLoop.current = fadeVolume(el, LOOP_VOLUME, FADE);
          return true;
        })
        .catch(() => false);
    };

    const applyForPhase = () =>
      phaseRef.current === "looping" ? startLoop() : startOpening();

    const arm = () => {
      if (disarmRef.current) return;
      const handler = () => {
        if (isOff()) {
          disarm();
          return;
        }
        applyForPhase().then((ok) => {
          if (ok) disarm();
        });
      };
      const disarm = () => {
        ACTIVATION_EVENTS.forEach((e) =>
          window.removeEventListener(e, handler, { capture: true }),
        );
        disarmRef.current = null;
      };
      ACTIVATION_EVENTS.forEach((e) =>
        window.addEventListener(e, handler, { capture: true, passive: true }),
      );
      disarmRef.current = disarm;
    };

    impl.current = { startOpening, startLoop, applyForPhase, arm, isOff };

    // ── Auto-start audio immediately when the website opens ──
    if (!isOff()) {
      applyForPhase().then((ok) => {
        if (!ok) {
          arm();
        }
      });
      // Also arm immediately so that the first user interaction starts it instantly if cold-blocked
      arm();
    }

    return () => {
      ["play", "playing", "pause", "ended"].forEach((e) => {
        open.removeEventListener(e, sync);
        loop.removeEventListener(e, sync);
      });
      open.removeEventListener("ended", onOpenEnded);
      fadeOpen.current?.();
      fadeLoop.current?.();
      disarmRef.current?.();
      if (loopTimer.current) clearTimeout(loopTimer.current);
      open.pause();
      open.src = "";
      loop.pause();
      loop.src = "";
    };
  }, []);

  // Update phase when navigating between homepage and subpages
  useEffect(() => {
    if (pathname !== "/") {
      phaseRef.current = "looping";
      const m = impl.current;
      if (m && !m.isOff()) {
        const open = openRef.current;
        if (open && !open.paused) {
          fadeOpen.current?.();
          fadeOpen.current = fadeVolume(open, 0, FADE / 2, () => {
            open.pause();
            m.startLoop();
          });
        } else {
          m.startLoop().then((ok) => {
            if (!ok) m.arm();
          });
        }
      }
    }
  }, [pathname]);

  const registerOpeningVideo = useCallback((el: HTMLVideoElement | null) => {
    videoRef.current = el;
  }, []);

  const notifyOpeningPlaying = useCallback(() => {
    phaseRef.current = "opening";
    const m = impl.current;
    if (!m) return;
    if (m.isOff()) {
      setIsPlaying(false);
      return;
    }
    m.startOpening().then((ok) => {
      if (!ok) m.arm();
    });
  }, []);

  const enterLooping = useCallback(() => {
    // Stop phase-1 music: fade it out under the incoming black, then pause it.
    const el = openRef.current;
    if (el && !el.paused) {
      fadeOpen.current?.();
      fadeOpen.current = fadeVolume(el, 0, FADE, () => el.pause());
    }
    if (loopTimer.current) clearTimeout(loopTimer.current);
    // Start Loop.mp3 exactly when the 2nd video reveals (after the black hold).
    loopTimer.current = setTimeout(() => {
      phaseRef.current = "looping";
      const m = impl.current;
      if (!m) return;
      if (m.isOff()) {
        setIsPlaying(false);
        return;
      }
      m.startLoop().then((ok) => {
        if (!ok) m.arm();
      });
    }, LOOP_START_DELAY);
  }, []);

  const toggle = useCallback(() => {
    const m = impl.current;
    if (!m) return;
    if (isPlaying) {
      // Mute both — persist so it stays off across visits.
      try {
        localStorage.setItem(STORAGE_KEY, "true");
      } catch {}
      disarmRef.current?.();
      const open = openRef.current;
      const loop = loopRef.current;
      if (open && !open.paused) {
        fadeOpen.current?.();
        fadeOpen.current = fadeVolume(open, 0, FADE / 2, () => open.pause());
      }
      if (loop && !loop.paused) {
        fadeLoop.current?.();
        fadeLoop.current = fadeVolume(loop, 0, FADE / 2, () => loop.pause());
      }
      setIsPlaying(false);
    } else {
      // Turn on — this click is a valid gesture, so the current phase will play.
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
      m.applyForPhase();
    }
  }, [isPlaying]);

  return (
    <Ctx.Provider
      value={{ isPlaying, toggle, registerOpeningVideo, notifyOpeningPlaying, enterLooping }}
    >
      {children}
    </Ctx.Provider>
  );
}
