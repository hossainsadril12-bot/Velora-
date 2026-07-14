"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  className?: string;
}

export default function LottieNavLogo({ className = "" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    let destroyed = false;

    import("lottie-web").then((mod) => {
      if (destroyed || !containerRef.current) return;

      const anim = mod.default.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: "/lottie/eiman-estates.json",
        rendererSettings: { preserveAspectRatio: "xMidYMid meet" },
      });

      anim.addEventListener("DOMLoaded", () => {
        // Freeze on final frame
        anim.goToAndStop(anim.totalFrames - 1, true);
        if (!destroyed) setReady(true);
      });
    });

    return () => {
      destroyed = true;
    };
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
