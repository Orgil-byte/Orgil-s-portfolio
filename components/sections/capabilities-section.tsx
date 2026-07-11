"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FadeUp, LineReveal } from "@/components/motion/reveal";
import { capabilityGroups, type CapabilityCategory } from "@/data/site";

const EASE = [0.76, 0, 0.24, 1] as const;

function toolsFor(category: CapabilityCategory) {
  return category.groups.flatMap((group) => group.tools);
}

function CapabilitySummary({
  category,
}: Readonly<{ category: CapabilityCategory }>) {
  return (
    <ul className="space-y-3 text-lg leading-6">
      {toolsFor(category)
        .slice(0, category.summaryCount)
        .map((tool) => (
          <li key={tool} className="border-t border-[#111111]/25 pt-3">
            — {tool}
          </li>
        ))}
    </ul>
  );
}

function CapabilityDetails({
  category,
}: Readonly<{ category: CapabilityCategory }>) {
  return (
    <div className="grid border-t border-l border-[#111111] sm:grid-cols-2 lg:grid-cols-3">
      {category.groups.map((group) => (
        <section
          key={group.label}
          className="min-w-0 border-r border-b border-[#111111] p-5 md:p-6"
        >
          <h4 className="font-editorial-mono text-[0.6875rem] tracking-[0.09em] text-[#B83B1D] uppercase">
            {group.label}
          </h4>
          <ul className="mt-5 space-y-2.5 text-sm leading-6">
            {group.tools.map((tool) => (
              <li key={tool} className="min-w-0 [overflow-wrap:anywhere]">
                — {tool}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function DisclosureButton({
  category,
  controls,
  expanded,
  onClick,
}: Readonly<{
  category: CapabilityCategory;
  controls: string;
  expanded: boolean;
  onClick: () => void;
}>) {
  const hiddenCount = toolsFor(category).length - category.summaryCount;

  return (
    <button
      type="button"
      aria-expanded={expanded}
      aria-controls={controls}
      onClick={onClick}
      className="font-editorial-mono mt-8 flex min-h-12 w-full items-center justify-between gap-4 border-t border-[#111111] pt-4 text-left text-[0.6875rem] leading-5 font-medium tracking-[0.07em] uppercase focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E4542F]"
    >
      <span>
        {expanded ? "Close full stack" : `Explore full stack +${hiddenCount}`}
      </span>
      <ArrowUpRight
        aria-hidden="true"
        size={17}
        className={`shrink-0 transition-transform duration-300 ${expanded ? "rotate-90 text-[#E4542F]" : ""}`}
      />
    </button>
  );
}

export function CapabilitiesSection() {
  const reduceMotion = Boolean(useReducedMotion());
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeCategory =
    capabilityGroups.find((category) => category.id === activeId) ?? null;
  const toggle = (id: string) =>
    setActiveId((current) => (current === id ? null : id));

  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="scroll-mt-24 border-t border-[#111111] bg-[#F1EBDD] px-5 py-24 md:px-[clamp(32px,5vw,64px)] md:py-32"
    >
      <FadeUp>
        <p className="font-editorial-mono text-xs font-medium tracking-[0.12em] uppercase">
          04 / Capabilities
        </p>
      </FadeUp>
      <h2
        id="capabilities-heading"
        className="font-display mt-9 text-[clamp(3.6rem,9vw,8rem)] leading-[0.86] font-semibold tracking-[-0.035em] uppercase"
      >
        <LineReveal>Tools for useful</LineReveal>
        <LineReveal delay={0.08}>digital products.</LineReveal>
      </h2>
      <FadeUp className="font-editorial-mono mt-7 text-[0.6875rem] tracking-[0.09em] text-[#555249] uppercase">
        Technologies I use — select a category to explore the full stack.
      </FadeUp>

      <div className="mt-14 border-t border-l border-[#111111] md:hidden">
        {capabilityGroups.map((category, index) => {
          const expanded = activeId === category.id;
          const controls = `capability-${category.id}-mobile-details`;
          return (
            <FadeUp key={category.id} delay={index * 0.06}>
              <article
                className={`border-r border-b border-[#111111] p-6 transition-colors ${expanded ? "bg-[#E8E1D2]" : ""}`}
              >
                <header className="flex items-start justify-between gap-4">
                  <h3 className="font-editorial-mono text-xs tracking-[0.08em] uppercase">
                    <span className={expanded ? "text-[#E4542F]" : ""}>
                      {category.index}
                    </span>{" "}
                    / {`{ ${category.title} }`}
                  </h3>
                  <ArrowUpRight
                    aria-hidden="true"
                    size={18}
                    className={expanded ? "text-[#E4542F]" : ""}
                  />
                </header>
                <div className="mt-12">
                  <CapabilitySummary category={category} />
                </div>
                <DisclosureButton
                  category={category}
                  controls={controls}
                  expanded={expanded}
                  onClick={() => toggle(category.id)}
                />
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      id={controls}
                      key={controls}
                      initial={
                        reduceMotion
                          ? { opacity: 0 }
                          : { height: 0, opacity: 0 }
                      }
                      animate={
                        reduceMotion
                          ? { opacity: 1 }
                          : { height: "auto", opacity: 1 }
                      }
                      exit={
                        reduceMotion
                          ? { opacity: 0 }
                          : { height: 0, opacity: 0 }
                      }
                      transition={{
                        duration: reduceMotion ? 0.08 : 0.45,
                        ease: EASE,
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pt-7">
                        <CapabilityDetails category={category} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            </FadeUp>
          );
        })}
      </div>

      <div className="mt-20 hidden border-t border-l border-[#111111] md:block">
        <div className="grid grid-cols-3">
          {capabilityGroups.map((category, index) => {
            const expanded = activeId === category.id;
            const controls = `capability-${category.id}-desktop-details`;
            return (
              <FadeUp key={category.id} delay={index * 0.08} className="h-full">
                <article
                  className={`flex h-full min-h-[25rem] flex-col border-r border-b border-[#111111] p-8 transition-colors duration-300 focus-within:bg-[#DED7C9] hover:bg-[#DED7C9] ${expanded ? "bg-[#E8E1D2]" : ""}`}
                >
                  <header className="flex items-start justify-between gap-4">
                    <h3 className="font-editorial-mono text-xs tracking-[0.08em] uppercase">
                      <span className={expanded ? "text-[#E4542F]" : ""}>
                        {category.index}
                      </span>{" "}
                      / {`{ ${category.title} }`}
                    </h3>
                    <ArrowUpRight
                      aria-hidden="true"
                      size={18}
                      className={`shrink-0 transition-colors ${expanded ? "text-[#E4542F]" : ""}`}
                    />
                  </header>
                  <div className="mt-auto pt-14">
                    <CapabilitySummary category={category} />
                    <DisclosureButton
                      category={category}
                      controls={controls}
                      expanded={expanded}
                      onClick={() => toggle(category.id)}
                    />
                  </div>
                </article>
              </FadeUp>
            );
          })}
        </div>

        <AnimatePresence initial={false}>
          {activeCategory && (
            <motion.div
              id={`capability-${activeCategory.id}-desktop-details`}
              key="desktop-capability-tray"
              initial={
                reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }
              }
              animate={
                reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }
              }
              exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0.08 : 0.5, ease: EASE }}
              className="overflow-hidden border-r border-b border-[#111111]"
            >
              <div className="p-8 lg:p-10">
                <div className="mb-8 flex items-end justify-between gap-8">
                  <div>
                    <p className="font-editorial-mono text-[0.6875rem] tracking-[0.09em] text-[#555249] uppercase">
                      Technologies I use / {activeCategory.index}
                    </p>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.h3
                        key={activeCategory.id}
                        initial={
                          reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        exit={
                          reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }
                        }
                        transition={{
                          duration: reduceMotion ? 0.08 : 0.28,
                          ease: EASE,
                        }}
                        className="font-display mt-3 text-5xl leading-none font-semibold uppercase lg:text-6xl"
                      >
                        {activeCategory.title}
                      </motion.h3>
                    </AnimatePresence>
                  </div>
                  <span className="font-editorial-mono text-xs text-[#B83B1D] uppercase">
                    Full stack
                  </span>
                </div>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`${activeCategory.id}-groups`}
                    initial={
                      reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={{
                      duration: reduceMotion ? 0.08 : 0.26,
                      ease: EASE,
                    }}
                  >
                    <CapabilityDetails category={activeCategory} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
