"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { destinations } from "@/data/destinations";
import { LazyEarth } from "@/components/globe/LazyEarth";
import { Heading, Reveal } from "@/components/ui/Reveal";

const markers = destinations.map((d) => ({ label: d.name, lat: d.lat, lon: d.lon }));

/** Scene 02. Tap a place on the planet or a card below it: the globe turns and the panel tells you about it. */
export function GlobeScene() {
  const [active, setActive] = useState<number | null>(null);
  const d = destinations[active ?? 0];

  return (
    <section id="explore" aria-labelledby="globe-h" className="relative scroll-mt-24 overflow-hidden bg-deep section-y">
      <div className="gutter mx-auto max-w-[1500px]">
        <Heading id="globe-h" className="max-w-[11em]">Choose a place on the planet.</Heading>
        <Reveal as="p" className="mt-4 max-w-[40ch] text-white/75">Tap a marker or a card. Three destinations to begin with, more on request.</Reveal>

        <div className="mt-10 grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <LazyEarth markers={markers} active={active} onSelect={setActive} className="mx-auto w-full max-w-[560px] lg:max-w-[700px]" />
          </div>

          <div className="min-w-0 lg:col-span-6">
            <div className="glass overflow-hidden rounded-[2rem]" aria-live="polite">
              <div className="relative aspect-[16/10] w-full">
                <AnimatePresence mode="wait">
                  <motion.div key={d.slug} className="absolute inset-0" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
                    <Image src={d.image} alt={d.imageAlt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-midnight/80 to-transparent" />
                  </motion.div>
                </AnimatePresence>
                <p className="absolute bottom-4 left-5 text-[0.9375rem] font-medium tracking-[0.2em] text-white">{String((active ?? 0) + 1).padStart(2, "0")} / {d.region.toUpperCase()}</p>
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="text-[clamp(2rem,5vw,3rem)] font-bold leading-none tracking-[-0.03em]">{d.name}</h3>
                <p className="mt-3 text-[1.125rem] font-medium text-electric-soft">{d.tagline}</p>
                <p className="mt-3 text-white/80">{d.overview}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={`/destinations/${d.slug}`} className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-white px-6 font-medium text-midnight transition-colors hover:bg-electric-soft">
                    Explore {d.name} <ArrowUpRight size={18} aria-hidden />
                  </Link>
                  <Link href="/booking" className="inline-flex min-h-[52px] items-center rounded-full bg-brand-red px-6 font-medium shadow-glow-red transition-colors hover:bg-[#f23842]">
                    Plan Your Journey
                  </Link>
                </div>
              </div>
            </div>

            <ul className="no-scrollbar -mx-5 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0" aria-label="Destinations">
              {destinations.map((x, i) => {
                const on = active === i;
                return (
                  <li key={x.slug} className="w-[62%] shrink-0 snap-start sm:w-[31%]">
                    <button type="button" aria-pressed={on} onClick={() => setActive(i)} className={`group relative block aspect-[4/5] w-full overflow-hidden rounded-3xl text-left transition-all ${on ? "ring-2 ring-electric" : "ring-1 ring-white/15"}`}>
                      <Image src={x.image} alt="" fill sizes="(min-width: 640px) 12vw, 60vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-midnight/85 via-transparent to-transparent" />
                      <span className="absolute inset-x-4 bottom-4">
                        <span className="block text-xl font-bold leading-none">{x.name}</span>
                        <span className="mt-1 block text-[0.8125rem] text-white/75">{x.region}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
