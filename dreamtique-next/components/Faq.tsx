"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus } from "lucide-react";
import { faq } from "@/lib/content";

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="grid gap-2">
      {faq.map((f, i) => {
        const on = open === i;
        return (
          <motion.div
            key={f.q}
            layout
            className={`${on ? "bg-accent text-white" : "bg-surface"} transition-colors duration-300`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -6% 0px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.05 }}
          >
            <h3>
              <button
                type="button"
                aria-expanded={on}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(on ? null : i)}
                className="flex min-h-[72px] w-full items-center justify-between gap-6 px-6 py-4 text-left text-xl font-medium"
              >
                {f.q}
                {on ? <Minus aria-hidden size={20} /> : <Plus aria-hidden size={20} />}
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  id={`faq-${i}`}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[56ch] px-6 pb-6">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
