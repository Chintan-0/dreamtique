"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, Heart, Car, MapPin } from "lucide-react";
import type { Experience } from "@/data/experiences";
import { destinationInfo } from "@/data/experiences";
import { useSaved } from "@/lib/saved";
import { enquiryHref } from "@/lib/enquiry";

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -8% 0px" }} transition={{ duration: 0.65, delay, ease: [0.2, 0.7, 0.2, 1] }}>
      {children}
    </motion.div>
  );
}

export function SectionHead({ title, sub, action }: { title: string; sub?: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="text-[clamp(1.75rem,3.2vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.025em]">{title}</h2>
        {sub && <p className="mt-2 max-w-[56ch] text-ink-soft">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function ExperienceCard({ e, index = 0 }: { e: Experience; index?: number }) {
  const saved = useSaved();
  const on = saved.has(e.slug);
  const dest = destinationInfo[e.destination];
  return (
    <motion.article
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card transition-shadow duration-300 hover:shadow-lift"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.06 }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={e.image} alt={e.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 85vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
        <button type="button" onClick={() => saved.toggle(e.slug)} aria-pressed={on} aria-label={`${on ? "Remove" : "Save"} ${e.title}`} className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-white/90 shadow-card transition-transform hover:scale-110">
          <Heart size={20} aria-hidden className={on ? "fill-brand text-brand" : "text-ink"} />
        </button>
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-sm font-semibold"><MapPin size={14} aria-hidden className="text-brand" />{dest.name}</span>
        <span className="absolute bottom-3 right-3 rounded-full bg-sun px-3 py-1 text-sm font-semibold">{e.type}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[1.25rem] font-semibold leading-snug tracking-[-0.01em]">{e.title}</h3>
        <p className="mt-2 line-clamp-2 text-ink-soft">{e.blurb}</p>
        {e.chauffeur && <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-leaf"><Car size={16} aria-hidden /> Chauffeur transfer available</p>}
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="font-semibold">Price on request</span>
          <Link href={enquiryHref({ service: "Experience", destination: dest.name, note: e.title })} className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-ink px-5 font-semibold text-white transition-colors hover:bg-brand">
            Enquire <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

/** A horizontal rail of cards with snap scrolling and arrow buttons. */
export function Rail({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const go = (dir: number) => ref.current?.scrollBy({ left: dir * (ref.current.clientWidth * 0.8), behavior: "smooth" });
  return (
    <div className="relative">
      <div ref={ref} role="region" aria-label={label} tabIndex={0} className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 pt-1 sm:-mx-0 sm:px-0">
        {children}
      </div>
      <div className="mt-1 hidden justify-end gap-2 md:flex">
        <button type="button" onClick={() => go(-1)} aria-label="Previous" className="grid size-12 place-items-center rounded-full border border-line bg-white shadow-card hover:bg-sand"><ChevronLeft aria-hidden /></button>
        <button type="button" onClick={() => go(1)} aria-label="Next" className="grid size-12 place-items-center rounded-full border border-line bg-white shadow-card hover:bg-sand"><ChevronRight aria-hidden /></button>
      </div>
    </div>
  );
}
