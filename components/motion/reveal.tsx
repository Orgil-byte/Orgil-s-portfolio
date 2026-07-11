"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1] as const;

export function FadeUp({
  children,
  className,
  delay = 0,
}: Readonly<{ children: ReactNode; className?: string; delay?: number }>) {
  const reduceMotion = Boolean(useReducedMotion());
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduceMotion ? 0.15 : 0.68, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function DividerReveal({ className }: Readonly<{ className?: string }>) {
  const reduceMotion = Boolean(useReducedMotion());
  return (
    <motion.div
      aria-hidden="true"
      className={className}
      initial={reduceMotion ? { opacity: 0 } : { scaleX: 0 }}
      whileInView={reduceMotion ? { opacity: 1 } : { scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: reduceMotion ? 0.15 : 0.82, ease: EASE }}
    />
  );
}

export function LineReveal({
  children,
  className,
  delay = 0,
}: Readonly<{ children: ReactNode; className?: string; delay?: number }>) {
  const reduceMotion = Boolean(useReducedMotion());
  return (
    <motion.span
      className={`block overflow-hidden ${className ?? ""}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      <motion.span
        className="block"
        variants={{
          hidden: reduceMotion ? { opacity: 0 } : { y: "110%", opacity: 0.4 },
          visible: { y: 0, opacity: 1 },
        }}
        transition={{ duration: reduceMotion ? 0.15 : 0.82, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
