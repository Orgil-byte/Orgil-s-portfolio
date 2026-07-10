import type { Variants } from "framer-motion";

export const INTRO_REVEAL_EASE = [0.76, 0, 0.24, 1] as const;

const REVEAL_DELAY = 0.14;
const REDUCED_DURATION = 0.15;

const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: REDUCED_DURATION } },
};

export function orangeRuleVariants(reduceMotion: boolean): Variants {
  if (reduceMotion) return reducedVariants;

  return {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        delay: REVEAL_DELAY,
        duration: 1,
        ease: INTRO_REVEAL_EASE,
      },
    },
  };
}

export function headlineLineVariants(reduceMotion: boolean): Variants {
  if (reduceMotion) return reducedVariants;

  return {
    hidden: { y: "115%" },
    visible: (index: number) => ({
      y: "0%",
      transition: {
        delay: REVEAL_DELAY + index * 0.1,
        duration: 0.9,
        ease: INTRO_REVEAL_EASE,
      },
    }),
  };
}

export function dividerVariants(reduceMotion: boolean): Variants {
  if (reduceMotion) return reducedVariants;

  return {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        delay: 0.48,
        duration: 0.75,
        ease: INTRO_REVEAL_EASE,
      },
    },
  };
}

export function metadataVariants(reduceMotion: boolean): Variants {
  if (reduceMotion) return reducedVariants;

  return {
    hidden: { y: 28, opacity: 0 },
    visible: (index: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.56 + index * 0.1,
        duration: 0.6,
        ease: INTRO_REVEAL_EASE,
      },
    }),
  };
}

export function navigationItemVariants(reduceMotion: boolean): Variants {
  if (reduceMotion) return reducedVariants;

  return {
    hidden: { y: 16, opacity: 0 },
    visible: (index: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: REVEAL_DELAY + index * 0.06,
        duration: 0.6,
        ease: INTRO_REVEAL_EASE,
      },
    }),
  };
}
