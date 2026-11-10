"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { destinations } from "@/data/destinations";
import { ease } from "@/animations/transitions";
import { Button } from "@/components/ui/Button";
import { Particles } from "@/components/hero/Particles";
import { Globe } from "./Globe";

/** Destination exploration: choose a place, the photograph wipes to the next, the 3D globe turns to it. */
export function DestinationExplorer({ heading = "Where would you like to go?" }: { heading?: string }) {
  const [i, setI] = useState(0);
  const d = destinations[i];

  return (
    <section aria-labelledby="explore-h" className="relative isolate overflow-hidden bg-midnight section-y">
      <div aria-hidden className="absolute left-1/2 top-1/2 -z-10 size-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-deep/60 blur-[140px]" />
      <Particles className="absolute inset-0 -z-10 opacity-60" density={0.6} />
      <div className="gutter grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <h2 id="explore-h" className="text-[clamp(2.25rem,4.6vw,4.5rem)] font-bold leading-[0.98] tracking-[-0.035em]">
            {heading}
          </h2>
          <div role="group" aria-label="Choose a destination" className="mt-10 grid gap-2">
            {destinations.map((x, k) => (
              <motion.button
                key={x.slug}
                type="button"
                aria-pressed={i === k}
                onClick={() => setI(k)}
                whileHover={{ x: 8 }}
                className={`group flex items-baseline justify-between gap-4 rounded-2xl px-5 py-4 text-left transition-colors ${i === k ? "glass shadow-glow" : "hover:bg-white/5"}`}
              >
                <span className={`text-[clamp(1.75rem,3.2vw,3rem)] font-bold leading-none tracking-[-0.03em] ${i === k ? "text-white" : "text-white/45 group-hover:text-white/80"}`}>{x.name}</span>
                <span className="text-sm text-electric-soft">{x.region}</span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={d.slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="mt-8">
              <p className="max-w-[40ch] text-white/75">{d.overview}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href={`/destinations/${d.slug}`}>Explore {d.name}</Button>
                <Button href="/booking" tone="glass">Enquire</Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative lg:col-span-7">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-glow">
            <AnimatePresence initial={false}>
              <motion.div
                key={d.slug}
                className="absolute inset-0"
                initial={{ clipPath: "inset(0% 0% 0% 100%)", scale: 1.15 }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
                exit={{ opacity: 0.4 }}
                transition={{ duration: 1.1, ease }}
              >
                <Image src={d.image} alt={d.imageAlt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-6 text-lg font-medium">{d.tagline}</p>
          </div>
          <div className="glass absolute -bottom-10 -right-2 w-[min(46%,300px)] rounded-full p-2 md:-right-6">
            <Globe active={i} onSelect={setI} />
          </div>
        </div>
      </div>
    </section>
  );
}
