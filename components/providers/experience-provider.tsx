"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import { usePathname, useRouter } from "next/navigation";
import type { NavigationHref } from "@/data/site";

const EASE = [0.76, 0, 0.24, 1] as const;
const HEADER_OFFSET = 92;

type TransitionOptions = Readonly<{
  label?: string;
  accent?: string;
}>;

type ExperienceContextValue = Readonly<{
  activeHref: NavigationHref;
  navigateHome: (href: NavigationHref) => void;
  pauseScroll: (paused: boolean) => void;
  transitionTo: (href: string, options?: TransitionOptions) => void;
}>;

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

type TransitionPhase = "idle" | "covering" | "covered" | "revealing";

function targetPath(href: string) {
  return href.split("#")[0] || "/";
}

export function ExperienceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const reduceMotion = Boolean(useReducedMotion());
  const lenisRef = useRef<Lenis | null>(null);
  const pendingHrefRef = useRef<string | null>(null);
  const coverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [homeActiveHref, setHomeActiveHref] = useState<NavigationHref>("#");
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const [transitionLabel, setTransitionLabel] = useState("Loading");
  const [transitionAccent, setTransitionAccent] = useState("#E4542F");

  const clearTimers = useCallback(() => {
    if (coverTimerRef.current) clearTimeout(coverTimerRef.current);
    if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
    coverTimerRef.current = null;
    fallbackTimerRef.current = null;
  }, []);

  const scrollToHash = useCallback(
    (hash: string, immediate = false) => {
      const target =
        hash === "#" ? null : document.querySelector<HTMLElement>(hash);
      const top = target
        ? target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
        : 0;

      if (reduceMotion || !lenisRef.current) {
        window.scrollTo({
          top: Math.max(0, top),
          behavior: immediate ? "auto" : reduceMotion ? "auto" : "smooth",
        });
        return;
      }

      lenisRef.current.scrollTo(Math.max(0, top), {
        duration: immediate ? 0 : 1.05,
        immediate,
        force: true,
      });
    },
    [reduceMotion],
  );

  const revealRoute = useCallback(() => {
    clearTimers();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        lenisRef.current?.resize();
        const pendingHref = pendingHrefRef.current;
        const hash = pendingHref?.includes("#")
          ? `#${pendingHref.split("#")[1]}`
          : "#";
        scrollToHash(hash, !pendingHref?.includes("#"));
        setPhase("revealing");
        pendingHrefRef.current = null;
      });
    });
  }, [clearTimers, scrollToHash]);

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({
      autoRaf: true,
      anchors: false,
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      stopInertiaOnNavigate: true,
    });
    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (phase !== "covered") return;
    const pendingHref = pendingHrefRef.current;
    if (!pendingHref || targetPath(pendingHref) !== pathname) return;
    revealRoute();
  }, [pathname, phase, revealRoute]);

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = ["profile", "projects", "contact"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible)
          setHomeActiveHref(`#${visible.target.id}` as NavigationHref);
      },
      { rootMargin: "-24% 0px -56% 0px", threshold: [0, 0.1, 0.4] },
    );
    sections.forEach((section) => observer.observe(section));

    const setHomeAtTop = () => {
      if (window.scrollY < window.innerHeight * 0.42) setHomeActiveHref("#");
    };
    window.addEventListener("scroll", setHomeAtTop, { passive: true });
    setHomeAtTop();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", setHomeAtTop);
    };
  }, [pathname]);

  useEffect(() => {
    const handleHistoryAnchor = () => {
      if (location.pathname !== "/") return;
      requestAnimationFrame(() => scrollToHash(location.hash || "#"));
    };
    window.addEventListener("hashchange", handleHistoryAnchor);
    window.addEventListener("popstate", handleHistoryAnchor);
    return () => {
      window.removeEventListener("hashchange", handleHistoryAnchor);
      window.removeEventListener("popstate", handleHistoryAnchor);
    };
  }, [scrollToHash]);

  useEffect(() => {
    if (pathname !== "/" || !location.hash || pendingHrefRef.current) {
      return;
    }
    requestAnimationFrame(() => scrollToHash(location.hash));
  }, [pathname, scrollToHash]);

  useEffect(() => clearTimers, [clearTimers]);

  const pauseScroll = useCallback((paused: boolean) => {
    if (paused) lenisRef.current?.stop();
    else if (!pendingHrefRef.current) lenisRef.current?.start();
  }, []);

  const navigateHome = useCallback(
    (href: NavigationHref) => {
      if (pathname !== "/") {
        pendingHrefRef.current = `/${href}`;
        setTransitionLabel(
          href === "#projects"
            ? "Projects"
            : href === "#profile"
              ? "Profile"
              : href === "#contact"
                ? "Contact"
                : "Home",
        );
        setTransitionAccent("#E4542F");
        setPhase("covering");
        lenisRef.current?.stop();
        coverTimerRef.current = setTimeout(
          () => {
            setPhase("covered");
            router.push(`/${href}`, { scroll: false });
            fallbackTimerRef.current = setTimeout(revealRoute, 2500);
          },
          reduceMotion ? 80 : 620,
        );
        return;
      }

      if (href === "#") history.replaceState(null, "", "/");
      else history.pushState(null, "", href);
      scrollToHash(href);
      setHomeActiveHref(href);
    },
    [pathname, reduceMotion, revealRoute, router, scrollToHash],
  );

  const transitionTo = useCallback(
    (href: string, options?: TransitionOptions) => {
      if (phase !== "idle" || href === pathname) return;
      pendingHrefRef.current = href;
      setTransitionLabel(options?.label ?? "Loading");
      setTransitionAccent(options?.accent ?? "#E4542F");
      setPhase("covering");
      lenisRef.current?.stop();

      coverTimerRef.current = setTimeout(
        () => {
          setPhase("covered");
          router.push(href, { scroll: false });
          fallbackTimerRef.current = setTimeout(revealRoute, 2500);
        },
        reduceMotion ? 80 : 620,
      );
    },
    [pathname, phase, reduceMotion, revealRoute, router],
  );

  const activeHref: NavigationHref = pathname.startsWith("/projects/")
    ? "#projects"
    : pathname.startsWith("/about/")
      ? "#profile"
      : pathname === "/"
        ? homeActiveHref
        : "#";

  const value = useMemo(
    () => ({ activeHref, navigateHome, pauseScroll, transitionTo }),
    [activeHref, navigateHome, pauseScroll, transitionTo],
  );

  return (
    <ExperienceContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {phase !== "idle" && (
          <motion.div
            aria-live="polite"
            aria-label={`Opening ${transitionLabel}`}
            className="fixed inset-0 z-[95] flex items-center justify-center overflow-hidden bg-[#111111] text-[#F1EBDD]"
            style={{ borderBottom: `8px solid ${transitionAccent}` }}
            initial={{ y: "100%" }}
            animate={{ y: phase === "revealing" ? "-105%" : "0%" }}
            exit={{ y: "-105%" }}
            transition={{ duration: reduceMotion ? 0.08 : 0.68, ease: EASE }}
            onAnimationComplete={() => {
              if (phase !== "revealing") return;
              setPhase("idle");
              lenisRef.current?.start();
            }}
          >
            <div className="flex items-center gap-4">
              <span
                className="size-2 rounded-full"
                style={{ background: transitionAccent }}
              />
              <span className="font-display text-[clamp(3rem,8vw,7rem)] leading-none font-semibold tracking-[-0.03em] uppercase">
                {transitionLabel}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ExperienceContext.Provider>
  );
}

export function useExperience() {
  const context = useContext(ExperienceContext);
  if (!context)
    throw new Error("useExperience must be used within ExperienceProvider");
  return context;
}
