"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { item, stagger } from "@/animations/transitions";
import { TiltCard } from "@/components/ui/TiltCard";

/** Six interactive service cards: glass surfaces, a photograph that wakes on hover, 3D tilt and a glow in each service's own colour. */
export function ServiceCards() {
  return (
    <motion.ul variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -10% 0px" }} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s) => (
        <motion.li key={s.slug} variants={item}>
          <Link href={`/services#${s.slug}`} className="group block h-full rounded-[1.75rem] focus-visible:outline-offset-4">
            <TiltCard glow={s.glow} className="glass min-h-[340px] rounded-[1.75rem] p-7">
              <span aria-hidden className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <Image src={s.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
                <span className="absolute inset-0 bg-midnight/70" />
              </span>
              <span aria-hidden className="mb-8 block h-1 w-12 rounded-full transition-all duration-500 group-hover:w-24" style={{ background: s.accent, boxShadow: `0 0 18px ${s.glow}` }} />
              <div className="flex h-[calc(100%-2.5rem)] flex-col justify-between gap-10">
                <div>
                  <h3 className="flex items-start justify-between gap-3 text-[1.75rem] font-bold leading-[1.05] tracking-[-0.02em]">
                    {s.name}
                    <ArrowUpRight aria-hidden className="mt-1 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </h3>
                  <p className="mt-3 max-w-[30ch] text-white/75">{s.short}</p>
                </div>
                <ul className="grid gap-1.5 text-[0.95rem] text-white/80">
                  {s.items.slice(0, 3).map((t) => (
                    <li key={t} className="flex items-center gap-2.5">
                      <span aria-hidden className="size-1.5 rounded-full" style={{ background: s.accent }} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  );
}
