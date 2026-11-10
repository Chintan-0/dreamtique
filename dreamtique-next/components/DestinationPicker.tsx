"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { destinations } from "@/lib/content";
import { Globe } from "./Globe";
import { ButtonLink, PinDot } from "./ui";

/** The live piece: choose a place and the pin changes picture and colour while the 3D globe turns to it. */
export function DestinationPicker({ heading = "Destinations" }: { heading?: string }) {
  const [i, setI] = useState(0);
  const d = destinations[i];

  return (
    <section aria-labelledby="dest-h" className="overflow-hidden bg-surface px-[clamp(16px,2.2vw,32px)] py-[clamp(48px,5vw,72px)]">
      <div className="grid gap-8 lg:min-h-[56svh] lg:grid-cols-12 lg:items-end lg:gap-x-2.5">
        <div className="flex flex-col justify-between gap-10 lg:col-span-5 lg:self-stretch">
          <h2 id="dest-h" className="text-[clamp(1.75rem,2.9vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em] text-muted">
            {heading}
          </h2>
          <div role="group" aria-label="Choose a destination" className="flex flex-wrap gap-x-6 gap-y-1 lg:grid lg:gap-1">
            {destinations.map((x, k) => (
              <motion.button
                key={x.slug}
                type="button"
                aria-pressed={i === k}
                onClick={() => setI(k)}
                whileHover={{ x: 6 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-4 text-left text-[clamp(1.75rem,3.2vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.03em] transition-colors ${i === k ? "text-ink" : "text-muted hover:text-ink"}`}
              >
                <PinDot className={`!h-[0.64em] !w-[0.5em] text-accent transition-opacity ${i === k ? "opacity-100" : "opacity-0"}`} />
                {x.name}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid items-center gap-6 sm:grid-cols-[0.8fr_1fr] lg:col-span-7">
          <motion.div className="pin-clip relative mx-auto aspect-[4/5] w-[min(78vw,380px)] sm:w-full" style={{ backgroundColor: destinations[0].color }} animate={{ backgroundColor: d.color }} transition={{ duration: 0.5 }}>
            {destinations.map((x, k) => (
              <motion.div
                key={x.slug}
                className="absolute left-[10%] top-[7%] aspect-square w-[80%] overflow-hidden rounded-full"
                initial={false}
                animate={{ opacity: i === k ? 1 : 0, scale: i === k ? 1 : 0.9 }}
                transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <Image src={x.image} alt={x.alt} fill sizes="(min-width: 1024px) 18vw, 60vw" className="object-cover" />
              </motion.div>
            ))}
          </motion.div>

          <div className="grid gap-5">
            <div className="mx-auto w-[min(60vw,260px)] sm:w-full sm:max-w-[280px]">
              <Globe active={i} />
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={d.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="mb-2.5 text-[1.375rem] font-medium">{d.name}</h3>
                <p className="max-w-[32ch]">{d.blurb}</p>
                <ButtonLink href={`/destinations/${d.slug}`} tone="ink" className="mt-6">
                  {d.name} guide
                </ButtonLink>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
