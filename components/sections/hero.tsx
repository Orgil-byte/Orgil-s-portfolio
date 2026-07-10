"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useIntroReveal } from "@/components/intro/intro-reveal-provider";
import {
  dividerVariants,
  headlineLineVariants,
  metadataVariants,
  orangeRuleVariants,
} from "@/lib/motion/intro-reveal";

const headline = ["I Build", "Useful", "Software"] as const;

const metadata = [
  { label: "[ ROLE ]", value: "SOFTWARE ENGINEER" },
  {
    label: "[ EXPERTISE ]",
    value: "FRONTEND / BACKEND / AI INTEGRATION",
  },
  {
    label: "[ LOCATION ]",
    value: "BASED IN ULAANBAATAR, MONGOLIA",
  },
] as const;

export function Hero() {
  const reduceMotion = Boolean(useReducedMotion());
  const { phase } = useIntroReveal();
  const initial = phase === "complete" ? false : "hidden";
  const animate = phase === "waiting" ? "hidden" : "visible";

  return (
    <section
      aria-labelledby="hero-heading"
      className="flex flex-1 bg-[#F1EBDD] px-5 pt-[clamp(48px,9svh,76px)] pb-10 md:px-[clamp(32px,5vw,64px)] md:pt-[clamp(64px,12svh,128px)] md:pb-14"
    >
      <div className="grid min-h-0 w-full flex-1 grid-cols-[3px_minmax(0,1fr)] gap-4 md:grid-cols-[4px_minmax(0,1fr)] md:gap-8 lg:gap-9">
        <motion.div
          aria-hidden="true"
          className="origin-bottom bg-[#E4542F]"
          initial={initial}
          animate={animate}
          variants={orangeRuleVariants(reduceMotion)}
        />

        <div className="grid min-w-0 grid-rows-[minmax(min-content,1fr)_auto] gap-[clamp(40px,8svh,72px)]">
          <h1
            id="hero-heading"
            className="font-display text-[clamp(3.625rem,18.2vw,6rem)] leading-[0.84] font-bold tracking-[-0.035em] text-[#111111] uppercase md:text-[clamp(6rem,11vw,7rem)] lg:text-[clamp(7rem,10.5vw,10rem)]"
          >
            {headline.map((line, index) => (
              <span
                key={line}
                className="block overflow-hidden whitespace-nowrap"
              >
                <motion.span
                  className="block whitespace-nowrap"
                  custom={index}
                  initial={initial}
                  animate={animate}
                  variants={headlineLineVariants(reduceMotion)}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <div className="relative">
            <motion.div
              aria-hidden="true"
              className="absolute top-0 left-0 h-px w-full origin-left bg-[rgba(17,17,17,0.42)]"
              initial={initial}
              animate={animate}
              variants={dividerVariants(reduceMotion)}
            />
            <dl className="font-editorial-mono grid gap-[18px] pt-4 text-right uppercase md:grid-cols-3 md:gap-6 md:pt-4">
              {metadata.map((item, index) => (
                <motion.div
                  key={item.label}
                  custom={index}
                  initial={initial}
                  animate={animate}
                  variants={metadataVariants(reduceMotion)}
                  className={
                    index === 0
                      ? "md:text-left"
                      : index === 1
                        ? "md:text-center"
                        : "md:text-right"
                  }
                >
                  <dt className="text-[0.625rem] leading-4 tracking-[0.08em] text-[#111111]/65 md:text-[0.65rem]">
                    {item.label}
                  </dt>
                  <dd className="ml-0 text-[0.6875rem] leading-[1.45] font-medium tracking-[-0.015em] md:text-[0.675rem] lg:text-[0.72rem]">
                    {item.value}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
