"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { isCoarsePointer } from "@/lib/utils";
import { cn } from "@/lib/utils";

/** Subtle 3D card movement that follows the pointer, with a soft light on the surface. */
export function TiltCard({ children, className, glow = "rgba(61,139,255,0.35)" }: { children: ReactNode; className?: string; glow?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-9, 9]), { stiffness: 180, damping: 18 });
  const lightX = useTransform(mx, (v) => `${v * 100}%`);
  const lightY = useTransform(my, (v) => `${v * 100}%`);

  const move = (e: React.PointerEvent) => {
    if (isCoarsePointer() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const leave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <div style={{ perspective: 1100 }} className="h-full">
      <motion.div ref={ref} onPointerMove={move} onPointerLeave={leave} style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className={cn("relative h-full overflow-hidden", className)}>
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -z-10 size-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
          style={{ left: lightX, top: lightY, background: glow }}
        />
        {children}
      </motion.div>
    </div>
  );
}
