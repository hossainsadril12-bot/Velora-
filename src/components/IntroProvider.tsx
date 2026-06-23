"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type IntroState = "idle" | "transitioning" | "completed";

type IntroContextType = {
  /** Current phase of the homepage cinematic intro. */
  introState: IntroState;
  /** Advance to the next phase. */
  advance: () => void;
  /** Legacy compat — true once the intro has fully completed. */
  introDone: boolean;
};

const IntroContext = createContext<IntroContextType | undefined>(undefined);

export function useIntro() {
  const ctx = useContext(IntroContext);
  if (!ctx) {
    throw new Error("useIntro must be used within an IntroProvider");
  }
  return ctx;
}

export default function IntroProvider({ children }: { children: ReactNode }) {
  const [introState, setIntroState] = useState<IntroState>("idle");

  const advance = useCallback(() => {
    setIntroState((prev) => {
      if (prev === "idle") return "transitioning";
      if (prev === "transitioning") return "completed";
      return prev;
    });
  }, []);

  const introDone = introState === "completed";

  return (
    <IntroContext.Provider value={{ introState, advance, introDone }}>
      {children}
    </IntroContext.Provider>
  );
}
