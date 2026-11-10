"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Scrub-linked scale and lift as the element travels up the screen (GSAP ScrollTrigger). */
export function ScrollScale({ children, from = 0.72, className = "" }: { children: ReactNode; from?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tween = gsap.fromTo(
        el,
        { scale: from, rotate: -4, transformOrigin: "50% 100%" },
        { scale: 1, rotate: 0, ease: "none", scrollTrigger: { trigger: el, start: "top 95%", end: "top 45%", scrub: 0.6 } },
      );
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    return () => mm.revert();
  }, [from]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Gentle parallax drift on scroll for large shapes. */
export function Parallax({ children, distance = 60, className = "" }: { children: ReactNode; distance?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tween = gsap.to(el, {
        y: -distance,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    return () => mm.revert();
  }, [distance]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
