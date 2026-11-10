import type { Variants } from "motion/react";

export const ease = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: (delay: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.9, delay, ease } }),
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

/** Image reveal: the frame opens from the bottom while the picture settles from a larger scale. */
export const frameReveal: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.2, ease } },
};

export const imageSettle: Variants = {
  hidden: { scale: 1.35 },
  show: { scale: 1, transition: { duration: 1.6, ease } },
};
