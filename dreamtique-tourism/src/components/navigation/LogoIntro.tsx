"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PinMark } from "@/components/ui/PinMark";
import { ease } from "@/animations/transitions";

const KEY = "dreamtique-intro-seen";

/** First-visit brand reveal: the map-pin draws itself, the wordmark follows, then the curtain lifts. */
export function LogoIntro() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY) || window.matchMedia("(prefers-reduced-motion: reduce)").matches || navigator.webdriver) return;
      sessionStorage.setItem(KEY, "1");
    } catch {
      return;
    }
    const start = setTimeout(() => setShow(true), 0);
    const end = setTimeout(() => setShow(false), 3300);
    return () => {
      clearTimeout(start);
      clearTimeout(end);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[100] grid place-items-center bg-midnight"
          exit={{ clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 1, ease } }}
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
        >
          <div className="flex flex-col items-center gap-6">
            <PinMark className="h-28 w-auto" />
            <div className="overflow-hidden">
              <motion.p initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 1.6, duration: 0.9, ease }} className="text-3xl font-bold tracking-[-0.02em]">
                DREAM<span className="text-brand-red">TIQUE</span>
              </motion.p>
            </div>
            <motion.p initial={{ opacity: 0, letterSpacing: "0.2em" }} animate={{ opacity: 1, letterSpacing: "0.55em" }} transition={{ delay: 2, duration: 1 }} className="text-xs font-medium text-electric-soft">
              TOURISM
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
