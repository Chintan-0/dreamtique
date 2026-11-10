"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { company, faq, mission, story, vision, welcome, whyChoose } from "@/data/company";
import { packageCollections } from "@/data/packages";
import { Button } from "@/components/ui/Button";
import { PinMark } from "@/components/ui/PinMark";
import { Heading, ImageReveal, Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Particles } from "@/components/hero/Particles";
import { item, stagger } from "@/animations/transitions";

/** Inner-page hero: dark cinematic header with a photograph, the pin and a large title. */
export function PageHero({ title, lead, image, alt }: { title: string; lead: string; image: string; alt: string }) {
  return (
    <section className="relative isolate flex min-h-[64svh] items-end overflow-hidden pb-14 pt-36">
      <Image src={image} alt={alt} fill priority sizes="100vw" className="-z-30 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/35" />
      <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-to-r from-midnight/80 to-transparent" />
      <Particles className="absolute inset-0 -z-10" density={0.5} />
      <div className="gutter w-full">
        <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="max-w-[14em] text-[clamp(2.5rem,7vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-glow">
          {title}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }} className="mt-6 max-w-[44ch] text-[clamp(1.125rem,1.6vw,1.5rem)] leading-snug text-white/80">
          {lead}
        </motion.p>
      </div>
    </section>
  );
}

/** Three photographs in a row: where we travel. */
export function PhotoStrip() {
  const shots = [
    { src: "/images/georgia/narikala.jpg", alt: "Narikala fortress above Tbilisi" },
    { src: "/images/armenia/tatev.jpg", alt: "Tatev monastery on a cliff above a green gorge" },
    { src: "/images/dubai/marina.jpg", alt: "The towers of Dubai Marina rising above the water" },
  ];
  return (
    <section aria-label="Where we travel" className="bg-midnight pb-[clamp(56px,8vw,120px)]">
      <div className="gutter grid gap-4 md:grid-cols-3">
        {shots.map((s, i) => (
          <ImageReveal key={s.src} src={s.src} alt={s.alt} sizes="(min-width: 768px) 33vw, 100vw" className={`aspect-[4/5] ${i === 1 ? "md:mt-12" : ""}`} rounded="rounded-[2rem]" />
        ))}
      </div>
    </section>
  );
}

/** Bright editorial section: who Dreamtique is. */
export function AboutPreview() {
  return (
    <section aria-labelledby="about-h" className="relative overflow-hidden bg-ivory text-ink section-y">
      <div className="gutter grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Heading id="about-h">Travel made easy, luxurious and personal.</Heading>
          <Reveal as="p" delay={0.1} className="mt-8 max-w-[52ch] text-ink/80">{welcome}</Reveal>
          <Reveal as="p" delay={0.18} className="mt-5 max-w-[52ch] text-ink/80">{story}</Reveal>
          <Reveal delay={0.26} className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="/about" tone="ink">Our story</Button>
            <span className="text-ink/60">Founded in {company.founded}</span>
          </Reveal>
        </div>
        <div className="relative lg:col-span-6">
          <ImageReveal src="/images/dubai/burj-al-arab.jpg" alt="The Burj Al Arab hotel on the Dubai coast" sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/5] shadow-[0_40px_80px_-30px_rgba(10,22,51,0.5)]" rounded="rounded-[2rem]" />
          <motion.div initial={{ opacity: 0, scale: 0.6, rotate: -12 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ type: "spring", bounce: 0.4, delay: 0.5 }} className="absolute -bottom-8 -left-4 w-24 md:-left-10 md:w-32">
            <PinMark className="w-full" draw={false} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const steps = [
  { name: "Tell us", text: "Share where you want to go, when, and what kind of trip you imagine." },
  { name: "We plan", text: "A personalized itinerary with expert recommendations and destination guidance." },
  { name: "We prepare", text: "Hotels are booked, visas and documents are handled, and your plan updates in real time." },
  { name: "You arrive", text: "A professional chauffeur meets you, and 24/7 support stays with you until you are home." },
];

/** From idea to arrival: a map-pin travels the route as you scroll and lights each stage. */
export function Process() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });
  const left = useTransform(p, [0, 1], ["0%", "100%"]);
  const fill = useTransform(p, [0, 1], ["0%", "100%"]);
  return (
    <section ref={ref} aria-labelledby="process-h" className="relative overflow-hidden bg-ivory-deep text-ink section-y">
      <div className="gutter">
        <Heading id="process-h" className="max-w-[10em]">From idea to arrival.</Heading>
        <div className="relative mt-24 hidden md:block">
          <div className="h-[3px] w-full rounded-full bg-ink/15">
            <motion.div style={{ width: fill }} className="h-full rounded-full bg-brand-red" />
          </div>
          <motion.div style={{ left }} className="absolute -top-14 w-10 -translate-x-1/2">
            <PinMark draw={false} glow={false} className="w-full" />
          </motion.div>
        </div>
        <motion.ol variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -10% 0px" }} className="mt-12 grid gap-10 md:mt-10 md:grid-cols-4 md:gap-6">
          {steps.map((s, i) => (
            <motion.li key={s.name} variants={item}>
              <p aria-hidden className="text-[clamp(3.5rem,6vw,5.5rem)] font-bold leading-none text-ink/10">{i + 1}</p>
              <h3 className="mt-1 text-2xl font-bold tracking-[-0.02em]">{s.name}</h3>
              <p className="mt-2 max-w-[28ch] text-ink/75">{s.text}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

export function PackagesPreview() {
  return (
    <section aria-labelledby="pk-h" className="relative bg-midnight section-y">
      <div className="gutter">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading id="pk-h" className="max-w-[9em]">Journeys, in three moods.</Heading>
          <Reveal><Button href="/packages" tone="glass">All packages</Button></Reveal>
        </div>
        <motion.ul variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -10% 0px" }} className="mt-14 grid gap-5 lg:grid-cols-3">
          {packageCollections.map((c) => (
            <motion.li key={c.slug} variants={item}>
              <Link href="/packages" className="group block rounded-[2rem]">
                <TiltCard className="aspect-[3/4] rounded-[2rem]" glow="rgba(61,139,255,0.35)">
                  <Image src={c.image} alt={c.imageAlt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="-z-10 object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                  <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-midnight via-midnight/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <h3 className="text-[2.25rem] font-bold leading-none tracking-[-0.03em]">{c.name}</h3>
                    <p className="mt-2 text-white/80">{c.line}</p>
                    <ul className="mt-4 grid gap-1 text-[0.95rem] text-white/75">
                      {c.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                    <span className="mt-5 inline-flex items-center gap-2 font-medium">Enquire <ArrowUpRight size={18} aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                  </div>
                </TiltCard>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/** Reserved for verified customer reviews: nothing is invented. */
export function Testimonials() {
  return (
    <section aria-labelledby="rev-h" className="bg-ivory text-ink section-y">
      <div className="gutter grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Heading id="rev-h" className="max-w-[9em]">Traveler stories.</Heading>
        </div>
        <Reveal className="rounded-[2rem] border border-ink/10 bg-white/60 p-8 lg:col-span-6 lg:p-10">
          <p className="text-[clamp(1.25rem,2vw,1.75rem)] font-medium leading-snug">Reviews from verified Dreamtique travelers will appear here.</p>
          <p className="mt-3 max-w-[44ch] text-ink/70">We publish only genuine reviews, with the traveler&apos;s permission. Traveled with us? We would love to hear how it went.</p>
          <div className="mt-6"><Button href="/contact" tone="ink">Share your experience</Button></div>
        </Reveal>
      </div>
    </section>
  );
}

export function Faq({ dark = true }: { dark?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" aria-labelledby="faq-h" className={`${dark ? "bg-midnight" : "bg-ivory text-ink"} section-y`}>
      <div className="gutter grid gap-12 lg:grid-cols-12">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <Heading id="faq-h">Questions, answered.</Heading>
        </div>
        <div className="grid gap-3 lg:col-span-8">
          {faq.map((f, i) => {
            const on = open === i;
            return (
              <motion.div key={f.q} layout initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: (i % 4) * 0.05 }} className={`rounded-2xl transition-colors duration-300 ${dark ? (on ? "glass shadow-glow" : "glass") : on ? "bg-ink text-ivory" : "bg-white/70"}`}>
                <h3>
                  <button type="button" aria-expanded={on} aria-controls={`faq-${i}`} onClick={() => setOpen(on ? null : i)} className="flex min-h-[72px] w-full items-center justify-between gap-6 px-6 py-4 text-left text-xl font-medium">
                    {f.q}
                    <motion.span animate={{ rotate: on ? 180 : 0 }} className="shrink-0">{on ? <Minus size={20} aria-hidden /> : <Plus size={20} aria-hidden />}</motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div id={`faq-${i}`} role="region" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                      <p className="max-w-[58ch] px-6 pb-6 opacity-85">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FinalCta({ heading = "Your journey starts with a conversation." }: { heading?: string }) {
  return (
    <section className="relative isolate overflow-hidden section-y">
      <Image src="/images/armenia/tatev.jpg" alt="" fill sizes="100vw" className="-z-30 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-20 bg-midnight/75" />
      <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-to-b from-midnight via-transparent to-midnight" />
      <Particles className="absolute inset-0 -z-10" density={0.8} />
      <div className="gutter text-center">
        <Reveal as="h2" className="mx-auto max-w-[12em] text-[clamp(2.5rem,6.4vw,6rem)] font-bold leading-[0.95] tracking-[-0.04em] text-glow">{heading}</Reveal>
        <Reveal delay={0.1} className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/booking">{company.cta}</Button>
          <Button href={company.whatsapp} external tone="glass" arrow={false}>WhatsApp us</Button>
        </Reveal>
      </div>
    </section>
  );
}

export function VisionMission() {
  return (
    <section className="grid lg:grid-cols-2" aria-label="Vision and mission">
      <div className="bg-deep px-[clamp(20px,4vw,64px)] py-[clamp(56px,7vw,110px)]">
        <Heading className="!text-[clamp(2rem,3.6vw,3.5rem)]">Our vision</Heading>
        <Reveal as="p" delay={0.1} className="mt-6 max-w-[52ch] text-white/80">{vision}</Reveal>
      </div>
      <div className="bg-ivory px-[clamp(20px,4vw,64px)] py-[clamp(56px,7vw,110px)] text-ink">
        <Heading className="!text-[clamp(2rem,3.6vw,3.5rem)]">Our mission</Heading>
        <Reveal as="p" delay={0.1} className="mt-6 max-w-[52ch] text-ink/80">{mission.intro}</Reveal>
        <ul className="mt-5 grid gap-2.5">
          {mission.promises.map((m, i) => (
            <Reveal as="li" key={m} delay={0.05 * i} className="flex items-center gap-3 text-lg font-medium">
              <span aria-hidden className="size-2 rounded-full bg-brand-red" />
              {m}
            </Reveal>
          ))}
        </ul>
        <Reveal as="p" delay={0.2} className="mt-6 max-w-[52ch] text-ink/70">{mission.outro}</Reveal>
      </div>
    </section>
  );
}

export function WhyChoose() {
  return (
    <section aria-labelledby="why-h" className="bg-midnight section-y">
      <div className="gutter">
        <Heading id="why-h" className="max-w-[10em]">Why choose Dreamtique Tourism?</Heading>
        <motion.ul variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -10% 0px" }} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyChoose.map((w) => (
            <motion.li key={w.title} variants={item}>
              <TiltCard className="glass h-full rounded-[1.75rem] p-7">
                <span aria-hidden className="mb-6 block h-1 w-10 rounded-full bg-brand-red shadow-glow-red" />
                <h3 className="text-2xl font-bold tracking-[-0.02em]">{w.title}</h3>
                <p className="mt-3 text-white/75">{w.text}</p>
              </TiltCard>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
