"use client";

import type { RefObject } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  navigationItems,
  socialItems,
} from "@/components/layout/navigation-data";

const WIPE_EASE = [0.76, 0, 0.24, 1] as const;
const CLOSED_CLIP = "polygon(110% 0%, 110% 0%, 130% 100%, 130% 100%)";
const OPEN_CLIP = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

type MobileNavigationOverlayProps = Readonly<{
  activeHref: string;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  open: boolean;
  onClose: (restoreScroll?: boolean) => void;
  onExitComplete: () => void;
  onNavigate: (href: string) => void;
}>;

export function MobileNavigationOverlay({
  activeHref,
  closeButtonRef,
  open,
  onClose,
  onExitComplete,
  onNavigate,
}: MobileNavigationOverlayProps) {
  const reduceMotion = Boolean(useReducedMotion());

  const contentVariants = {
    hidden: reduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 34, clipPath: "inset(0 0 100% 0)" },
    visible: (index: number) =>
      reduceMotion
        ? { opacity: 1, transition: { duration: 0.1 } }
        : {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            transition: {
              delay: 0.16 + index * 0.075,
              duration: 0.52,
              ease: WIPE_EASE,
            },
          },
    exit: (index: number) =>
      reduceMotion
        ? { opacity: 0, transition: { duration: 0.08 } }
        : {
            opacity: 0,
            y: 12,
            transition: {
              delay: Math.max(0, 6 - index) * 0.018,
              duration: 0.16,
              ease: "easeOut" as const,
            },
          },
  };

  return (
    <AnimatePresence initial={false} onExitComplete={onExitComplete}>
      {open && (
        <motion.div
          id="site-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[80]"
          onClick={() => onClose()}
          onKeyDown={(event) => {
            if (event.key !== "Tab") return;

            const links =
              event.currentTarget.querySelectorAll<HTMLElement>("a[href]");
            const first = links.item(0);
            const last = links.item(links.length - 1);

            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              closeButtonRef.current?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              closeButtonRef.current?.focus();
            }
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 hidden bg-black/55 md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.35 }}
          />

          <motion.div
            className="mobile-nav-overlay absolute inset-0 overflow-hidden bg-[#1B1B1D] text-[#F5F5F3] md:inset-y-0 md:right-0 md:left-auto md:w-[min(460px,38vw)] md:min-w-[380px]"
            onClick={(event) => event.stopPropagation()}
            initial={
              reduceMotion
                ? { opacity: 0, clipPath: OPEN_CLIP }
                : { clipPath: CLOSED_CLIP }
            }
            animate={
              reduceMotion
                ? { opacity: 1, clipPath: OPEN_CLIP }
                : { clipPath: OPEN_CLIP }
            }
            exit={
              reduceMotion
                ? { opacity: 0, transition: { duration: 0.1 } }
                : {
                    clipPath: CLOSED_CLIP,
                    transition: {
                      delay: 0.05,
                      duration: 0.78,
                      ease: WIPE_EASE,
                    },
                  }
            }
            transition={
              reduceMotion
                ? { duration: 0.1 }
                : { duration: 0.85, ease: WIPE_EASE }
            }
          >
            <div className="flex h-full flex-col px-5 pt-[140px] pb-[calc(28px+env(safe-area-inset-bottom))] md:px-8">
              <nav aria-label="Primary menu">
                <motion.div
                  custom={0}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <p className="font-editorial-mono text-[0.6875rem] leading-4 tracking-[0.12em] text-white/45 uppercase">
                    Navigation
                  </p>
                  <div className="mt-3 h-px w-full bg-white/16" />
                </motion.div>

                <ul className="mt-5">
                  {navigationItems.map((item, index) => (
                    <motion.li
                      key={item.href}
                      custom={index + 1}
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <a
                        href={item.href}
                        onClick={(event) => {
                          event.preventDefault();
                          onNavigate(item.href);
                        }}
                        className="flex items-center justify-between py-0.5 font-sans text-[clamp(2.7rem,12vw,3.6rem)] leading-[1.08] font-normal tracking-[-0.035em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E4542F] md:text-[clamp(3rem,4vw,4rem)]"
                      >
                        <span>{item.label}</span>
                        {item.href === activeHref && (
                          <span
                            aria-hidden="true"
                            className="mr-1 size-2 rounded-full bg-[#F5F5F3]"
                          />
                        )}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="mt-auto">
                <motion.div
                  custom={5}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="h-px w-full bg-white/16" />
                  <p className="font-editorial-mono mt-4 text-[0.6875rem] leading-4 tracking-[0.12em] text-white/45 uppercase">
                    Socials
                  </p>
                </motion.div>

                <motion.ul
                  className="mt-3 flex flex-wrap gap-x-7 gap-y-2"
                  custom={6}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {socialItems.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base leading-6 underline decoration-white/35 underline-offset-4 hover:decoration-[#E4542F] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E4542F]"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </motion.ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
