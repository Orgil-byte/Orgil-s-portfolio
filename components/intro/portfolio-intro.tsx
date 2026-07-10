"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { greetings } from "@/data/greetings";

const WORD_TRANSITION_SECONDS = 0.14;
const REDUCED_MOTION_HOLD_MS = 650;
const EXIT_EASE = [0.76, 0, 0.24, 1] as const;

export function PortfolioIntro() {
  const reduceMotion = useReducedMotion();
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [showGreeting, setShowGreeting] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [lockScroll, setLockScroll] = useState(true);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!lockScroll) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [lockScroll]);

  useEffect(() => {
    let nextTimeout: ReturnType<typeof setTimeout> | undefined;
    let exitTimeout: ReturnType<typeof setTimeout> | undefined;

    if (reduceMotion) {
      setGreetingIndex(greetings.length - 1);
    }

    const isLastGreeting =
      reduceMotion || greetingIndex === greetings.length - 1;
    const holdMs = reduceMotion
      ? REDUCED_MOTION_HOLD_MS
      : greetings[greetingIndex].holdMs;

    nextTimeout = setTimeout(() => {
      if (!mounted.current) return;

      if (!isLastGreeting) {
        setGreetingIndex((current) =>
          Math.min(current + 1, greetings.length - 1),
        );
        return;
      }

      setShowGreeting(false);
      exitTimeout = setTimeout(() => {
        if (mounted.current) setShowIntro(false);
      }, WORD_TRANSITION_SECONDS * 1000);
    }, holdMs);

    return () => {
      clearTimeout(nextTimeout);
      clearTimeout(exitTimeout);
    };
  }, [greetingIndex, reduceMotion]);

  const greeting = greetings[greetingIndex];

  return (
    <AnimatePresence onExitComplete={() => setLockScroll(false)}>
      {showIntro && (
        <motion.div
          className="fixed inset-0 z-[100] flex min-h-dvh w-full touch-none items-center justify-center overflow-visible bg-[#111111] px-5"
          exit={
            reduceMotion
              ? { opacity: 0 }
              : {
                  y: "-118dvh",
                  transition: { duration: 0.85, ease: EXIT_EASE },
                }
          }
          transition={
            reduceMotion
              ? { duration: 0.2, ease: "easeOut" }
              : { duration: 0.85, ease: EXIT_EASE }
          }
        >
          <span className="sr-only" role="status">
            Loading portfolio
          </span>

          <div
            aria-hidden="true"
            className="flex max-w-full items-center justify-center gap-3 whitespace-nowrap"
          >
            <span className="size-[7px] shrink-0 rounded-full bg-[#E4542F] md:size-2" />
            <AnimatePresence mode="wait">
              {showGreeting && (
                <motion.span
                  key={greeting.text}
                  className="font-sans text-[clamp(2rem,4vw,4rem)] leading-[1.1] font-normal text-[#F1EBDD]"
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{
                    duration: reduceMotion ? 0.2 : WORD_TRANSITION_SECONDS,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {greeting.text}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {!reduceMotion && (
            <motion.svg
              aria-hidden="true"
              className="absolute top-[calc(100%-1px)] left-0 h-[16dvh] w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="#111111"
            >
              <motion.path
                d="M0 0 H100 Q50 100 0 0 Z"
                exit={{
                  d: "M0 0 H100 Q50 0 0 0 Z",
                  transition: { duration: 0.85, ease: EXIT_EASE },
                }}
              />
            </motion.svg>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
