"use client";

import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { company } from "@/data/company";
import { destinations } from "@/data/destinations";
import { LazyEarth } from "@/components/globe/LazyEarth";
import { PinMark } from "@/components/ui/PinMark";
import { Button } from "@/components/ui/Button";

const markers = destinations.map((d) => ({ label: d.name, lat: d.lat, lon: d.lon }));
const lines = ["Unforgettable Journeys,", "Crafted with Passion."];
const ease = [0.16, 1, 0.3, 1] as const;

/** Scene 01. On a phone the planet sits in the upper middle and the words follow it; on a laptop they sit side by side. */
export function Hero() {
  return (
    <section aria-labelledby="hero-h" className="relative isolate overflow-hidden bg-midnight pb-16 pt-32 lg:pb-24 lg:pt-36">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_45%_at_50%_28%,rgba(61,139,255,0.28),transparent_70%),radial-gradient(90%_60%_at_50%_100%,rgba(13,33,80,0.9),transparent)] lg:bg-[radial-gradient(45%_70%_at_72%_50%,rgba(61,139,255,0.3),transparent_70%),radial-gradient(90%_60%_at_20%_100%,rgba(13,33,80,0.9),transparent)]" />
      <div className="gutter mx-auto grid max-w-[1500px] items-center gap-2 lg:grid-cols-12 lg:gap-8">
        <div className="relative lg:order-2 lg:col-span-6">
          <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.6, ease }} className="mx-auto w-full max-w-[460px] lg:max-w-[720px]">
            <LazyEarth eager markers={markers} active={null} interactive={false} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1.1, ease }} className="absolute left-1/2 top-[7%] -translate-x-1/2 lg:left-[8%] lg:top-[4%] lg:translate-x-0">
            <PinMark className="h-14 w-auto lg:h-20" />
          </motion.div>
        </div>

        <div className="relative lg:order-1 lg:col-span-6">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.8 }} className="text-[0.9375rem] font-medium tracking-[0.35em] text-electric-soft">
            EXPLORE BEYOND
          </motion.p>
          <h1 id="hero-h" className="mt-4 text-[clamp(2.4rem,9.2vw,5.6rem)] font-bold leading-[0.98] tracking-[-0.04em]">
            {lines.map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.08em]">
                <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.7 + i * 0.18, duration: 1, ease }}>
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.9, ease }} className="mt-6 max-w-[34ch] text-[clamp(1.125rem,2vw,1.4rem)] text-white/80">
            Discover extraordinary destinations, personalized journeys and experiences beyond expectations.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.9, ease }} className="mt-8 flex flex-wrap gap-3">
            <Button href="#explore" tone="electric" arrow={false}>
              Explore Destinations <ArrowDown aria-hidden size={18} />
            </Button>
            <Button href="/booking" tone="glass">
              {company.cta}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
