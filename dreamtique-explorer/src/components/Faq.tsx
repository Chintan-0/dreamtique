"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus } from "lucide-react";
import { faq } from "@/data/site";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="grid gap-3">
      {faq.map((f, i) => {
        const on = open === i;
        return (
          <div key={f.q} className={`rounded-2xl border transition-colors ${on ? "border-ink bg-sand" : "border-line bg-white"}`}>
            <h3>
              <button type="button" aria-expanded={on} aria-controls={`faq-${i}`} onClick={() => setOpen(on ? null : i)} className="flex min-h-[68px] w-full items-center justify-between gap-6 px-6 py-4 text-left text-lg font-semibold">
                {f.q}
                {on ? <Minus size={20} aria-hidden /> : <Plus size={20} aria-hidden />}
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div id={`faq-${i}`} role="region" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                  <p className="max-w-[60ch] px-6 pb-6 text-ink-soft">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
