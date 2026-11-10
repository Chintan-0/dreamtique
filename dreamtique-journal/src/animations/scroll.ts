"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/** Runs `build` only when the visitor has not asked for reduced motion; returns the cleanup. */
export function whenMotionOk(build: () => void | (() => void)) {
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", build);
  return () => mm.revert();
}
