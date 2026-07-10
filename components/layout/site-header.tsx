"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIntroReveal } from "@/components/intro/intro-reveal-provider";
import { navigationItemVariants } from "@/lib/motion/intro-reveal";

const navigation = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = Boolean(useReducedMotion());
  const { phase } = useIntroReveal();
  const initial = phase === "complete" ? false : "hidden";
  const animate = phase === "waiting" ? "hidden" : "visible";
  const itemVariants = navigationItemVariants(reduceMotion);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <header className="relative z-50 h-(--header-height) shrink-0 border-b border-[rgba(17,17,17,0.42)] bg-[#F1EBDD]">
      <nav
        aria-label="Primary navigation"
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
          {navigation.map((item, index) => (
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
          ref={menuButtonRef}
          type="button"
          custom={1}
          initial={initial}
          animate={animate}
          variants={itemVariants}
          className="flex size-9 shrink-0 flex-col items-center justify-center gap-[5px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4542F] md:hidden"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="h-0.5 w-[18px] bg-[#111111]" />
          <span className="h-0.5 w-[18px] bg-[#111111]" />
          <span className="h-0.5 w-[18px] bg-[#111111]" />
        </motion.button>
      </nav>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="absolute top-full right-0 left-0 bg-[#111111] text-[#F1EBDD] md:hidden"
        >
          <ul>
            {navigation.map((item) => (
              <li key={item.href} className="border-b border-[#F1EBDD]/25">
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-editorial-mono block px-5 py-4 text-xs font-medium tracking-[0.12em] uppercase hover:bg-[#E4542F] hover:text-[#111111] focus-visible:bg-[#E4542F] focus-visible:text-[#111111] focus-visible:outline-none"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
