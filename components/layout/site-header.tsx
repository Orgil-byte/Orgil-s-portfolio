"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useIntroReveal } from "@/components/intro/intro-reveal-provider";
import { MobileNavigationOverlay } from "@/components/layout/mobile-navigation-overlay";
import { desktopNavigationItems } from "@/components/layout/navigation-data";
import { navigationItemVariants } from "@/lib/motion/intro-reveal";

export function SiteHeader() {
  const [activeHref, setActiveHref] = useState("#");
  const [headerVisible, setHeaderVisible] = useState(true);
  const [menuMounted, setMenuMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const topMenuButtonRef = useRef<HTMLButtonElement>(null);
  const floatingButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const scrollLockRef = useRef<{
    bodyOverflow: string;
    rootOverflow: string;
    scrollY: number;
  } | null>(null);
  const restoreScrollRef = useRef(true);
  const pendingNavigationRef = useRef<string | null>(null);
  const reduceMotion = Boolean(useReducedMotion());
  const { phase } = useIntroReveal();
  const initial = phase === "complete" ? false : "hidden";
  const animate = phase === "waiting" ? "hidden" : "visible";
  const itemVariants = navigationItemVariants(reduceMotion);

  const lockScroll = useCallback(() => {
    if (scrollLockRef.current) return;

    scrollLockRef.current = {
      bodyOverflow: document.body.style.overflow,
      rootOverflow: document.documentElement.style.overflow,
      scrollY: window.scrollY,
    };
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  }, []);

  const unlockScroll = useCallback(() => {
    const lock = scrollLockRef.current;
    if (!lock) return;

    document.body.style.overflow = lock.bodyOverflow;
    document.documentElement.style.overflow = lock.rootOverflow;
    scrollLockRef.current = null;

    if (restoreScrollRef.current) window.scrollTo(0, lock.scrollY);
  }, []);

  const openMenu = useCallback(
    (trigger: HTMLButtonElement) => {
      openerRef.current = trigger;
      pendingNavigationRef.current = null;
      restoreScrollRef.current = true;
      lockScroll();
      setMenuMounted(true);
      setMenuOpen(true);
    },
    [lockScroll],
  );

  const closeMenu = useCallback((restoreScroll = true) => {
    restoreScrollRef.current = restoreScroll;
    setMenuOpen(false);
  }, []);

  const finishClosing = useCallback(() => {
    unlockScroll();
    setMenuMounted(false);
    openerRef.current?.focus({ preventScroll: true });

    const href = pendingNavigationRef.current;
    pendingNavigationRef.current = null;
    if (!href) return;

    requestAnimationFrame(() => {
      if (href === "#") {
        history.replaceState(
          null,
          "",
          `${location.pathname}${location.search}`,
        );
        window.scrollTo({
          top: 0,
          behavior: reduceMotion ? "auto" : "smooth",
        });
        return;
      }

      const target = document.querySelector<HTMLElement>(href);
      if (target) {
        target.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start",
        });
      } else {
        history.pushState(null, "", href);
      }
    });
  }, [reduceMotion, unlockScroll]);

  const navigateFromMenu = useCallback(
    (href: string) => {
      setActiveHref(href);
      pendingNavigationRef.current = href;
      closeMenu(false);
    },
    [closeMenu],
  );

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      closeMenu();
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [closeMenu, menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const frame = requestAnimationFrame(() =>
      floatingButtonRef.current?.focus(),
    );
    return () => cancelAnimationFrame(frame);
  }, [menuOpen]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHeaderVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(header);

    return () => observer.disconnect();
  }, []);

  useEffect(() => () => unlockScroll(), [unlockScroll]);

  return (
    <header
      ref={headerRef}
      className="relative z-50 h-(--header-height) shrink-0 border-b border-[rgba(17,17,17,0.42)] bg-[#F1EBDD]"
    >
      <nav
        aria-label="Primary navigation"
        aria-hidden={menuOpen || undefined}
        className="mx-auto flex h-full w-full items-center justify-between px-5 md:px-[clamp(32px,5vw,64px)]"
      >
        <motion.a
          href="#"
          custom={0}
          initial={initial}
          animate={animate}
          variants={itemVariants}
          className="font-editorial-mono min-w-0 text-[clamp(0.625rem,3.2vw,0.75rem)] leading-none font-medium tracking-[-0.055em] whitespace-nowrap uppercase focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E4542F] md:text-[0.8rem]"
        >
          {"{ OU } ORGIL ULZIITOGTOKH"}
        </motion.a>

        <ul className="hidden items-center gap-[clamp(28px,4vw,56px)] md:flex">
          {desktopNavigationItems.map((item, index) => (
            <motion.li
              key={item.href}
              custom={index + 1}
              initial={initial}
              animate={animate}
              variants={itemVariants}
            >
              <a
                href={item.href}
                className="font-editorial-mono relative block py-2 text-xs font-medium tracking-[0.12em] uppercase after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-[#E4542F] after:transition-transform hover:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E4542F]"
              >
                {item.label}
              </a>
            </motion.li>
          ))}
        </ul>

        <motion.button
          ref={topMenuButtonRef}
          type="button"
          custom={1}
          initial={initial}
          animate={animate}
          variants={itemVariants}
          className="font-editorial-mono h-9 shrink-0 text-[0.6875rem] font-medium tracking-[0.06em] text-[#111111] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E4542F] md:hidden"
          aria-label="Open navigation"
          aria-controls="site-navigation"
          aria-expanded={menuOpen}
          onClick={(event) => openMenu(event.currentTarget)}
        >
          • Menu
        </motion.button>
      </nav>

      <MobileNavigationOverlay
        activeHref={activeHref}
        closeButtonRef={floatingButtonRef}
        open={menuOpen}
        onClose={closeMenu}
        onExitComplete={finishClosing}
        onNavigate={navigateFromMenu}
      />

      <AnimatePresence>
        {(!headerVisible || menuMounted) && (
          <motion.button
            ref={floatingButtonRef}
            type="button"
            aria-label={menuMounted ? "Close navigation" : "Open navigation"}
            aria-controls="site-navigation"
            aria-expanded={menuOpen}
            onClick={(event) => {
              if (menuMounted) {
                if (menuOpen) closeMenu();
                return;
              }

              openMenu(event.currentTarget);
            }}
            onKeyDown={(event) => {
              if (!menuMounted || event.key !== "Tab") return;

              const links = document.querySelectorAll<HTMLElement>(
                "#site-navigation a[href]",
              );
              const target = event.shiftKey
                ? links.item(links.length - 1)
                : links.item(0);
              if (!target) return;

              event.preventDefault();
              target.focus();
            }}
            className="fixed top-4 right-4 z-[90] flex size-16 items-center justify-center rounded-full bg-[#E4542F] text-[#111111] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111] md:top-7 md:right-7 md:size-20"
            initial={
              reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.7, y: -10 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.7, y: -10 }
            }
            transition={{
              duration: reduceMotion ? 0.1 : 0.42,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            <span aria-hidden="true" className="relative block h-4 w-6">
              <motion.span
                className="absolute top-1/2 left-0 h-px w-6 bg-current"
                initial={false}
                animate={
                  menuMounted ? { y: 0, rotate: 45 } : { y: -3, rotate: 0 }
                }
                transition={{
                  duration: reduceMotion ? 0.1 : 0.36,
                  ease: [0.76, 0, 0.24, 1],
                }}
              />
              <motion.span
                className="absolute top-1/2 left-0 h-px w-6 bg-current"
                initial={false}
                animate={
                  menuMounted ? { y: 0, rotate: -45 } : { y: 3, rotate: 0 }
                }
                transition={{
                  duration: reduceMotion ? 0.1 : 0.36,
                  ease: [0.76, 0, 0.24, 1],
                }}
              />
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </header>
  );
}
