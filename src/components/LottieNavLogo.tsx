"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  className?: string;
  autoplay?: boolean;
  onComplete?: () => void;
}

export default function LottieNavLogo({ className = "", autoplay = false, onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const onCompleteRef = useRef(onComplete);

  // Keep a fresh ref to onComplete to avoid re-running the effect when the function identity changes
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!containerRef.current) return;
    let destroyed = false;
    let fallback: NodeJS.Timeout;
    let anim: any;

    import("lottie-web").then((mod) => {
      if (destroyed || !containerRef.current) return;

      anim = mod.default.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: false,
        autoplay,
        path: "/lottie/eiman-estates.json",
        rendererSettings: { preserveAspectRatio: "xMidYMid meet" },
      });

      if (autoplay) {
        anim.addEventListener("DOMLoaded", () => {
          if (!destroyed) {
            const originalDuration = anim.totalFrames / anim.frameRate;
            anim.setSpeed(originalDuration / 4); // 4s playback
            setReady(true);

            // Force journey to start exactly at 2 seconds
            fallback = setTimeout(() => {
              if (!destroyed && onCompleteRef.current) onCompleteRef.current();
            }, 2000);
          }
        });
      } else {
        anim.addEventListener("DOMLoaded", () => {
          // Freeze on final frame
          anim.goToAndStop(anim.totalFrames - 1, true);
          if (!destroyed) setReady(true);
        });
      }
    });

    return () => {
      destroyed = true;
      clearTimeout(fallback);
      if (anim) anim.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={className}
      style={{
        aspectRatio: "16/9",
        opacity: ready ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
