"use client";

import { useEffect, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Smooth scrolling (Lenis) wired to GSAP ScrollTrigger, and reduced-motion handling for Motion. */
export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    // smooth scroll stays off for reduced motion and for automated browsers
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || navigator.webdriver) return;

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
