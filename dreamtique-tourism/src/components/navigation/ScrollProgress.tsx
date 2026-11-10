"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** A thin progress line across the top of the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  return <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-electric via-electric-soft to-brand-red" style={{ scaleX }} />;
}
