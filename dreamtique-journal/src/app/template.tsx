"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { ease } from "@/animations/transitions";

/** Page transition: a navy curtain lifts away and the page settles in after every navigation. */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[90] bg-midnight"
        initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 100% 0%)" }}
        transition={{ duration: 0.7, ease, delay: 0 }}
      />
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.05 }}>
        {children}
      </motion.div>
    </>
  );
}
