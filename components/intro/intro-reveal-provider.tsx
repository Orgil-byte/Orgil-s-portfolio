"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { PortfolioIntro } from "@/components/intro/portfolio-intro";

export type IntroRevealPhase = "waiting" | "revealing" | "complete";

type IntroRevealContextValue = Readonly<{
  phase: IntroRevealPhase;
}>;

const IntroRevealContext = createContext<IntroRevealContextValue | null>(null);

export function IntroRevealProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [phase, setPhase] = useState<IntroRevealPhase>("waiting");

  const startReveal = useCallback(() => {
    setPhase((current) => (current === "waiting" ? "revealing" : current));
  }, []);

  const finishReveal = useCallback(() => {
    setPhase("complete");
  }, []);

  const value = useMemo(() => ({ phase }), [phase]);

  return (
    <IntroRevealContext.Provider value={value}>
      <PortfolioIntro onExitStart={startReveal} onExitComplete={finishReveal} />
      {children}
    </IntroRevealContext.Provider>
  );
}

export function useIntroReveal() {
  const context = useContext(IntroRevealContext);

  if (!context) {
    throw new Error("useIntroReveal must be used within IntroRevealProvider");
  }

  return context;
}
