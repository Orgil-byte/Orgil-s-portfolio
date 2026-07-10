"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useIntroReveal } from "@/components/intro/intro-reveal-provider";
import {
  dividerVariants,
  headlineLineVariants,
  identityMarkVariants,
  identityStatementVariants,
  metadataVariants,
  orangeRuleVariants,
} from "@/lib/motion/intro-reveal";

const headline = ["I Build", "Useful", "Software"] as const;
const monogram = ["{", "OU", "}"] as const;

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
  const markVariants = identityMarkVariants(reduceMotion);
  const statementVariants = identityStatementVariants(reduceMotion);

  return (
    <section
      aria-labelledby="hero-heading"
      className="flex flex-1 items-center bg-[#F1EBDD] px-5 py-[clamp(32px,6svh,56px)] md:px-[clamp(32px,5vw,64px)] md:py-[clamp(40px,7svh,72px)]"
    >
      <div className="grid w-full grid-cols-[3px_minmax(0,1fr)] gap-4 md:grid-cols-[4px_minmax(0,1fr)] md:gap-8 lg:gap-9">
        <motion.div
          aria-hidden="true"
          className="origin-bottom bg-[#E4542F]"
          initial={initial}
          animate={animate}
          variants={orangeRuleVariants(reduceMotion)}
        />

        <div className="min-w-0">
          <div className="grid min-w-0 gap-[clamp(28px,7vw,64px)] md:grid-cols-[minmax(0,1.15fr)_minmax(230px,0.85fr)] md:items-center md:gap-[clamp(32px,5vw,80px)]">
            <h1
              id="hero-heading"
              className="font-display min-w-0 text-[clamp(3.625rem,18.2vw,6rem)] leading-[0.84] font-bold tracking-[-0.035em] text-[#111111] uppercase md:text-[clamp(6rem,11vw,7rem)] lg:text-[clamp(7rem,10.5vw,9.375rem)]"
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

            <div className="min-w-0 md:self-center">
              <div
                aria-hidden="true"
                className="font-display ml-auto w-fit text-[clamp(5.5rem,25vw,7rem)] leading-[0.68] font-bold tracking-[-0.04em] md:ml-0 md:text-[clamp(7rem,10vw,12rem)]"
              >
                {monogram.map((character, index) => (
                  <span key={character} className="block overflow-hidden">
                    <motion.span
                      className={`block ${character === "OU" ? "text-[#111111]" : "text-[#E4542F]"}`}
                      custom={index}
                      initial={initial}
                      animate={animate}
                      variants={markVariants}
                    >
                      {character}
                    </motion.span>
                  </span>
                ))}
              </div>

              <div className="mt-6 text-left md:mt-7">
                <motion.p
                  className="font-display text-[clamp(1.75rem,7vw,2.25rem)] leading-none font-semibold tracking-[-0.02em] uppercase md:text-[clamp(1.75rem,3.4vw,2.75rem)]"
                  custom={0}
                  initial={initial}
                  animate={animate}
                  variants={statementVariants}
                >
                  SOFTWARE ENGINEER
                </motion.p>
                <div className="font-editorial-mono mt-4 text-[0.6875rem] leading-[1.55] font-medium tracking-[0.04em] uppercase md:mt-5 md:text-xs">
                  <motion.p
                    custom={1}
                    initial={initial}
                    animate={animate}
                    variants={statementVariants}
                  >
                    BUILDING WEB PRODUCTS
                  </motion.p>
                  <motion.p
                    custom={2}
                    initial={initial}
                    animate={animate}
                    variants={statementVariants}
                  >
                    + PRACTICAL AI SYSTEMS
                  </motion.p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-[clamp(36px,5svh,56px)]">
            <motion.div
              aria-hidden="true"
              className="absolute top-0 left-0 h-px w-full origin-left bg-[rgba(17,17,17,0.32)]"
              initial={initial}
              animate={animate}
              variants={dividerVariants(reduceMotion)}
            />
            <dl className="font-editorial-mono grid gap-[18px] pt-4 text-left uppercase md:grid-cols-2 md:gap-x-8 md:gap-y-5 md:pt-4 lg:grid-cols-3 lg:gap-6">
              {metadata.map((item, index) => (
                <motion.div
                  key={item.label}
                  custom={index}
                  initial={initial}
                  animate={animate}
                  variants={metadataVariants(reduceMotion)}
                  className={
                    index === 0
                      ? ""
                      : index === 1
                        ? "md:text-right lg:text-center"
                        : "md:col-span-2 lg:col-span-1 lg:text-right"
                  }
                >
                  <dt className="text-[0.6875rem] leading-4 tracking-[0.08em] text-[rgba(17,17,17,0.62)]">
                    {item.label}
                  </dt>
                  <dd className="ml-0 text-[0.6875rem] leading-[1.5] font-medium tracking-[-0.015em] lg:text-xs">
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
