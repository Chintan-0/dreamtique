"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { ArrowUpRight, Check, Minus, Plus } from "lucide-react";
import { company, faq, mission, welcome } from "@/data/company";
import { packageCollections } from "@/data/packages";
import { services } from "@/data/services";
import { Btn, Label, Reveal } from "./ui";
import { Pic } from "./Pic";

/** Wide statement on white: who we are, in one sentence and a paragraph. */
export function Statement() {
  return (
    <section aria-labelledby="st-h" className="section-y gutter mx-auto max-w-[1700px]">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal>
            <Label>Our story / since {company.founded}</Label>
          </Reveal>
          <Reveal as="h2" delay={0.05} className="display mt-5 text-[clamp(3rem,8vw,7.5rem)]">
            <span id="st-h">Travel is more than reaching a destination.</span>
          </Reveal>
        </div>
        <div className="lg:col-span-5 lg:pt-24">
          <Reveal as="p" delay={0.1} className="max-w-[46ch] text-mute">
            {welcome}
          </Reveal>
          <Reveal delay={0.15} className="mt-8">
            <Btn href="/about" tone="line">
              Discover our story
            </Btn>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function ServicesIndex() {
  const [on, setOn] = useState(0);
  return (
    <section aria-labelledby="sv-h" className="section-y gutter mx-auto max-w-[1700px]">
      <Reveal>
        <Label>Services</Label>
      </Reveal>
      <Reveal as="h2" delay={0.05} className="display mt-5 max-w-[10em] text-[clamp(3rem,8vw,7.5rem)]">
        <span id="sv-h">Six services, six experiences.</span>
      </Reveal>
      <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <ol className="border-t border-ink lg:col-span-7">
          {services.map((s, i) => (
            <li key={s.slug} className="border-b border-line" onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)}>
              <Link href={`/services#${s.slug}`} className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 gap-y-3 py-6">
                <span className="label text-mute">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="display block text-[clamp(1.9rem,4.2vw,3.4rem)] transition-colors group-hover:text-red">{s.name}</span>
                  <span className="mt-1 block max-w-[44ch] text-mute">{s.short}</span>
                </span>
                <ArrowUpRight aria-hidden className="shrink-0 self-center text-mute transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-red" />
                <Pic slug={s.slug} sizes="100vw" className="col-span-3 mt-2 aspect-[16/10] w-full lg:hidden" />
              </Link>
            </li>
          ))}
        </ol>
        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-32 aspect-[4/5] overflow-hidden bg-mist">
            <AnimatePresence mode="wait">
              <motion.div key={on} className="absolute inset-0" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
                <Pic slug={services[on].slug} sizes="40vw" className="absolute inset-0" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Journey plan: four stages joined by a line that fills as you scroll ---------- */
const stages = [
  { name: "Dream", text: "Share your travel vision." },
  { name: "Design", text: "We plan your personalized itinerary." },
  { name: "Prepare", text: "Organize travel documents and services." },
  { name: "Discover", text: "Enjoy your journey." },
];

export function JourneyPlan() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  return (
    <section aria-labelledby="jp-h" className="section-y bg-mist">
      <div className="gutter mx-auto max-w-[1700px]">
        <Reveal>
          <Label>Journey plan</Label>
        </Reveal>
        <Reveal as="h2" delay={0.05} className="display mt-5 max-w-[10em] text-[clamp(3rem,8vw,7.5rem)]">
          <span id="jp-h">From idea to arrival.</span>
        </Reveal>
        <div ref={ref} className="relative mt-14 lg:mt-20">
          <div aria-hidden className="absolute bottom-2 left-[5px] top-2 w-[2px] bg-line lg:inset-x-0 lg:bottom-auto lg:left-0 lg:top-[5px] lg:h-[2px] lg:w-auto">
            <motion.div style={{ scaleY: p }} className="size-full origin-top bg-ink lg:hidden" />
            <motion.div style={{ scaleX: p }} className="hidden size-full origin-left bg-ink lg:block" />
          </div>
          <ol className="grid gap-12 lg:grid-cols-4 lg:gap-10">
            {stages.map((s, i) => (
              <li key={s.name} className="relative pl-10 lg:pl-0 lg:pt-12">
                <span aria-hidden className="absolute left-0 top-1 size-3 bg-red lg:top-0" />
                <p className="label text-mute">Stage {String(i + 1).padStart(2, "0")}</p>
                <Reveal as="h3" delay={0.05} className="display mt-2 text-[clamp(2.4rem,4.4vw,4rem)]">
                  {s.name}
                </Reveal>
                <Reveal as="p" delay={0.1} className="mt-2 max-w-[24ch] text-mute">
                  {s.text}
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------- Packages: three collections, then the custom journey ---------- */
export function PackagesRow() {
  return (
    <section aria-labelledby="pk-h" className="section-y">
      <div className="gutter mx-auto max-w-[1700px]">
        <Reveal>
          <Label>Packages</Label>
        </Reveal>
        <Reveal as="h2" delay={0.05} className="display mt-5 max-w-[10em] text-[clamp(3rem,8vw,7.5rem)]">
          <span id="pk-h">Three ways to travel.</span>
        </Reveal>
        <Reveal as="p" delay={0.1} className="mt-5 max-w-[44ch] text-mute">
          Every package is built around your dates and group. Prices are shared with your quotation.
        </Reveal>
      </div>
      <ul className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-px overflow-x-auto px-5 sm:px-[clamp(20px,4vw,72px)] lg:mx-auto lg:grid lg:max-w-[1700px] lg:grid-cols-3 lg:gap-6 lg:overflow-visible">
        {packageCollections.map((c, i) => (
          <li key={c.slug} className="w-[84%] shrink-0 snap-start pr-4 sm:w-[56%] lg:w-auto lg:pr-0">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image src={c.image} alt={c.imageAlt} fill sizes="(min-width: 1024px) 30vw, 80vw" className="object-cover" />
            </div>
            <p className="label mt-5 text-mute">0{i + 1}</p>
            <h3 className="display mt-1 text-[clamp(2.2rem,3.6vw,3.2rem)]">{c.line}</h3>
            <ul className="mt-4 border-t border-line">
              {c.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 border-b border-line py-3">
                  <Check size={18} aria-hidden className="mt-1 shrink-0 text-red" />
                  {h}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- Promise ---------- */
export function PromiseGrid() {
  return (
    <section aria-labelledby="pr-h" className="section-y gutter mx-auto max-w-[1700px]">
      <Reveal>
        <Label>Our promise</Label>
      </Reveal>
      <Reveal as="h2" delay={0.05} className="display mt-5 max-w-[9em] text-[clamp(3rem,8vw,7.5rem)]">
        <span id="pr-h">Four commitments.</span>
      </Reveal>
      <ol className="mt-12 grid border-l border-t border-line sm:grid-cols-2">
        {mission.promises.map((t, i) => (
          <Reveal as="li" key={t} delay={i * 0.05} className="border-b border-r border-line p-7 sm:p-10">
            <span className="label text-red">0{i + 1}</span>
            <p className="display mt-4 text-[clamp(1.9rem,3.4vw,3rem)]">{t}.</p>
          </Reveal>
        ))}
      </ol>
      <Reveal as="p" delay={0.1} className="mt-8 max-w-[52ch] text-mute">
        {mission.outro}
      </Reveal>
    </section>
  );
}

/* ---------- Reserved stories and FAQ ---------- */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" aria-labelledby="fq-h" className="section-y bg-mist">
      <div className="gutter mx-auto grid max-w-[1700px] gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <Label>Questions</Label>
          </Reveal>
          <Reveal as="h2" delay={0.05} className="display mt-5 text-[clamp(3rem,7vw,6.5rem)]">
            <span id="fq-h">Questions, answered.</span>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 max-w-[34ch] border-t border-ink pt-5">
            <p className="label">Traveler stories</p>
            <p className="mt-2 text-mute">Reviews from verified Dreamtique travelers will appear here. We publish only genuine reviews, with the traveler&apos;s permission.</p>
          </Reveal>
        </div>
        <ul className="border-t border-ink lg:col-span-7">
          {faq.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="border-b border-line">
                <h3>
                  <button type="button" aria-expanded={isOpen} aria-controls={`fq-${i}`} onClick={() => setOpen(isOpen ? null : i)} className="flex min-h-[68px] w-full items-center justify-between gap-6 py-4 text-left text-[1.25rem] font-medium">
                    {f.q}
                    {isOpen ? <Minus size={20} aria-hidden className="shrink-0" /> : <Plus size={20} aria-hidden className="shrink-0" />}
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div id={`fq-${i}`} role="region" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <p className="max-w-[56ch] pb-6 text-mute">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
