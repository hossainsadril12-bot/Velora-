"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type IntroContextType = {
  /** True once the homepage cinematic intro has finished (logo docked into navbar). */
  introDone: boolean;
  setIntroDone: (value: boolean) => void;
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
  const [introDone, setIntroDone] = useState(false);

  return (
    <IntroContext.Provider value={{ introDone, setIntroDone }}>
      {children}
    </IntroContext.Provider>
  );
}
