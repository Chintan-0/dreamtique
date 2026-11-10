"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { isCoarsePointer, prefersReducedMotion } from "@/lib/utils";

/** A soft blue light that follows the pointer on desktop. Off for touch devices and reduced motion. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || isCoarsePointer() || prefersReducedMotion()) return;
    el.style.display = "block";
    const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      x(e.clientX - 260);
      y(e.clientY - 260);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return <div ref={ref} aria-hidden style={{ display: "none" }} className="pointer-events-none fixed left-0 top-0 z-[5] size-[520px] rounded-full bg-electric/15 mix-blend-screen blur-[90px]" />;
}
