"use client";

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

type TransitionContextType = {
  startTransition: (callback: () => void, direction?: "forward" | "backward") => void;
};

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function useTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
}

export default function TransitionProvider({ children }: { children: ReactNode }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const pathname = usePathname();
  const lastPathname = useRef(pathname);

  // When pathname changes, if we are animating, it means the new page has mounted!
  // We can now safely end the transition to trigger the fade-out exit.
  useEffect(() => {
    if (pathname !== lastPathname.current) {
      if (isAnimating) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsAnimating(false);
      }
      lastPathname.current = pathname;
    }
  }, [pathname, isAnimating]);



  const startTransition = (callback: () => void, dir: "forward" | "backward" = "forward") => {
    setDirection(dir);
    setIsAnimating(true);
    // Wait for the slide-in animation to complete (1.4s duration + 0.25s max delay = 1.65s)
    setTimeout(() => {
      callback(); // This will trigger the route change.
      // We DO NOT set isAnimating(false) here with a timer anymore. 
      // The useEffect above will handle it exactly when the new page mounts.
    }, 1650);
  };

  return (
    <TransitionContext.Provider value={{ startTransition }}>
      {children}
      <AnimatePresence>
        {isAnimating && (
          <>
            {/* BOTTOM LAYER */}
            <motion.div
              key="slide-door-bottom"
              initial={{ x: direction === "forward" ? "-100%" : "100%", opacity: 1 }}
              animate={{ 
                x: "0%", 
                opacity: 1,
                transition: { duration: 1.4, ease: [0.85, 0, 0.15, 1], delay: 0 } 
              }}
              exit={{ 
                opacity: 0, 
                transition: { duration: 0.8, ease: "easeInOut", delay: 0.1 } 
              }}
              className="fixed inset-0 z-[9998] pointer-events-none"
              style={{ backgroundColor: "#F5F1E9" }}
            />
            
            {/* TOP LAYER */}
            <motion.div
              key="slide-door-top"
              initial={{ x: direction === "forward" ? "-100%" : "100%", opacity: 1 }}
              animate={{ 
                x: "0%", 
                opacity: 1,
                transition: { duration: 1.4, ease: [0.85, 0, 0.15, 1], delay: 0.25 } 
              }}
              exit={{ 
                opacity: 0, 
                transition: { duration: 0.8, ease: "easeInOut", delay: 0 } 
              }}
              className="fixed inset-0 z-[9999] pointer-events-none"
              style={{ backgroundColor: "#01563f" }}
            />
          </>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
