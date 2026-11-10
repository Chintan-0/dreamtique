"use client";

import { motion } from "motion/react";

const PIN = "M50 124 C34 102 2 75 2 45 C2 20 23 1 50 1 C77 1 98 20 98 45 C98 75 66 102 50 124 Z";

/** Clip path used to cut photographs and video to the map-pin shape. Rendered once in the layout. */
export function PinDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
      <defs>
        <clipPath id="pin-shape" clipPathUnits="objectBoundingBox">
          <path d="M0.5 1 C0.34 0.82 0.02 0.6 0.02 0.36 C0.02 0.16 0.23 0 0.5 0 C0.77 0 0.98 0.16 0.98 0.36 C0.98 0.6 0.66 0.82 0.5 1 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

/** The Dreamtique map-pin as an animated SVG: the outline draws itself, then the globe inside turns on. */
export function PinMark({ className = "", draw = true, glow = true }: { className?: string; draw?: boolean; glow?: boolean }) {
  return (
    <svg viewBox="0 0 100 126" className={className} role="img" aria-label="Dreamtique map pin" style={glow ? { filter: "drop-shadow(0 0 18px rgba(224,38,47,0.55))" } : undefined}>
      <motion.path
        d={PIN}
        fill="#e0262f"
        initial={draw ? { pathLength: 0, fillOpacity: 0 } : false}
        animate={draw ? { pathLength: 1, fillOpacity: 1 } : undefined}
        stroke="#ff6a72"
        strokeWidth="1.5"
        transition={{ pathLength: { duration: 1.4, ease: "easeInOut" }, fillOpacity: { delay: 1.1, duration: 0.6 } }}
      />
      <motion.g initial={draw ? { scale: 0, opacity: 0 } : false} animate={draw ? { scale: 1, opacity: 1 } : undefined} transition={{ delay: 1.4, duration: 0.7, type: "spring", bounce: 0.35 }} style={{ transformOrigin: "50px 45px" }}>
        <circle cx="50" cy="45" r="27" fill="#0d2150" />
        <path d="M35 33 C42 28 52 30 55 37 C57 43 49 45 47 52 C45 58 38 56 34 50 C30 44 30 38 35 33 Z" fill="#7be28e" />
        <path d="M58 52 C64 49 71 52 69 58 C67 63 60 63 58 59 Z" fill="#7be28e" />
        <circle cx="50" cy="45" r="27" fill="none" stroke="#8fb9ff" strokeOpacity="0.5" strokeWidth="1.2" />
      </motion.g>
    </svg>
  );
}
