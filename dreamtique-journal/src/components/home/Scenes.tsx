"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, BedDouble, BookOpen, Car, Compass, FileCheck2, Landmark, Check } from "lucide-react";
import { company, mission, welcome } from "@/data/company";
import { destinations } from "@/data/destinations";
import { packageCollections } from "@/data/packages";
import { services } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { Heading, ImageReveal, Reveal } from "@/components/ui/Reveal";

/* ---------- Scene 03: full-width editorial photographs with oversized names ---------- */
function ShowcasePanel({ i }: { i: number }) {
  const d = destinations[i];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <section ref={ref} aria-label={d.name} className="relative isolate flex min-h-[88svh] items-end overflow-hidden lg:min-h-[100svh]">
      <motion.div style={{ y }} className="absolute -inset-y-[10%] inset-x-0 -z-20">
        <Image src={d.image} alt={d.imageAlt} fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-midnight via-midnight/25 to-midnight/10" />
      <div className="gutter w-full pb-14 lg:pb-20">
        <Reveal as="p" className="text-[0.9375rem] font-medium tracking-[0.25em] text-electric-soft">{String(i + 1).padStart(2, "0")} / {d.region.toUpperCase()}</Reveal>
        <Reveal as="h2" className="mt-3 text-[clamp(3rem,15vw,12rem)] font-bold leading-[0.88] tracking-[-0.05em]">{d.name.toUpperCase()}.</Reveal>
        <Reveal as="p" delay={0.1} className="mt-5 max-w-[30ch] text-[clamp(1.125rem,2vw,1.6rem)] text-white/85">{d.tagline}</Reveal>
        <Reveal delay={0.15} className="mt-7">
          <Button href={`/destinations/${d.slug}`} tone="ivory">Explore {d.name}</Button>
        </Reveal>
      </div>
    </section>
  );
}

export function Showcase() {
  return (
    <div className="bg-midnight">
      {destinations.map((_, i) => (
        <ShowcasePanel key={i} i={i} />
      ))}
    </div>
  );
}

/* ---------- Scene 04: our story, on warm ivory ---------- */
export function Story() {
  return (
    <section aria-labelledby="story-h" className="bg-ivory text-ink section-y">
      <div className="gutter mx-auto grid max-w-[1500px] items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:order-2 lg:col-span-6">
          <ImageReveal src="/images/georgia/narikala.jpg" alt="Narikala fortress above Tbilisi" className="aspect-[4/5] w-[82%]" rounded="rounded-[2rem]" sizes="(min-width: 1024px) 40vw, 80vw" />
          <ImageReveal src="/images/dubai/burj-al-arab.jpg" alt="The Burj Al Arab hotel on the Dubai coast" className="absolute -bottom-8 right-0 aspect-square w-[50%] border-[6px] border-ivory" rounded="rounded-[2rem]" sizes="(min-width: 1024px) 20vw, 45vw" />
        </div>
        <div className="mt-6 lg:order-1 lg:col-span-6 lg:mt-0">
          <Reveal as="p" className="text-[0.9375rem] font-medium tracking-[0.25em] text-brand-red">OUR STORY / SINCE {company.founded}</Reveal>
          <Heading id="story-h" className="mt-4 max-w-[11em]">Travel is more than reaching a destination.</Heading>
          <Reveal as="p" delay={0.1} className="mt-6 max-w-[48ch] text-ink/80">{welcome}</Reveal>
          <Reveal delay={0.2} className="mt-8"><Button href="/about" tone="ink">Discover Our Story</Button></Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Scene 05: six services as a vertical editorial list ---------- */
const serviceVisual: Record<string, { image?: string; alt: string; Icon: typeof Compass }> = {
  "hotel-bookings": { image: "/images/dubai/burj-al-arab.jpg", alt: "A landmark luxury hotel on the Dubai coast", Icon: BedDouble },
  "tourism-packages": { image: "/images/georgia/ushguli.jpg", alt: "Stone towers in the mountains of Svaneti", Icon: Compass },
  "attractions-experiences": { image: "/images/sulfur-baths.jpg", alt: "The domed sulfur baths of old Tbilisi", Icon: Landmark },
  "itinerary-planning": { image: "/images/sevan.jpg", alt: "Lake Sevan in Armenia", Icon: BookOpen },
  "visa-services": { alt: "Travel documents with entry stamps", Icon: FileCheck2 },
  "chauffeur-services": { image: "/images/dubai/marina.jpg", alt: "Dubai Marina towers along a waterfront road", Icon: Car },
};

function Passport() {
  return (
    <div aria-hidden className="absolute inset-0 grid place-items-center bg-[#12285a]">
      <svg viewBox="0 0 400 300" className="size-full" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="300" fill="#12285a" />
        <rect x="70" y="30" width="260" height="240" rx="14" fill="#f7f2e8" />
        {[
          { cx: 150, cy: 100, t: "DXB", c: "#e0262f" },
          { cx: 250, cy: 130, t: "TBS", c: "#3d8bff" },
          { cx: 170, cy: 195, t: "EVN", c: "#0a1633" },
        ].map((s) => (
          <g key={s.t} transform={`rotate(${s.t === "TBS" ? 8 : -9} ${s.cx} ${s.cy})`}>
            <circle cx={s.cx} cy={s.cy} r="44" fill="none" stroke={s.c} strokeWidth="4" />
            <circle cx={s.cx} cy={s.cy} r="36" fill="none" stroke={s.c} strokeWidth="1.5" />
            <text x={s.cx} y={s.cy + 9} textAnchor="middle" fontSize="26" fontWeight="700" fill={s.c} fontFamily="Jost, sans-serif">{s.t}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function ServicesList() {
  return (
    <section aria-labelledby="svc-h" className="bg-ivory-deep text-ink section-y">
      <div className="gutter mx-auto max-w-[1500px]">
        <Heading id="svc-h" className="max-w-[10em]">Six services, six experiences.</Heading>
        <ol className="mt-12 grid gap-14 lg:gap-24">
          {services.map((s, i) => {
            const v = serviceVisual[s.slug];
            return (
              <li key={s.slug} className="grid items-center gap-6 lg:grid-cols-12 lg:gap-14">
                <div className={`lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`}>
                  {v.image ? (
                    <ImageReveal src={v.image} alt={v.alt} className="aspect-[4/3] w-full" rounded="rounded-[2rem]" sizes="(min-width: 1024px) 55vw, 100vw" />
                  ) : (
                    <div role="img" aria-label={v.alt} className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem]">
                      <Passport />
                    </div>
                  )}
                </div>
                <div className={`lg:col-span-5 ${i % 2 ? "lg:order-1" : ""}`}>
                  <p className="flex items-center gap-3 text-[0.9375rem] font-medium tracking-[0.25em] text-brand-red">
                    <v.Icon size={22} aria-hidden /> {String(i + 1).padStart(2, "0")}
                  </p>
                  <Reveal as="h3" className="mt-3 text-[clamp(1.9rem,4.4vw,3.4rem)] font-bold leading-[1] tracking-[-0.03em]">{s.name}</Reveal>
                  <Reveal as="p" delay={0.05} className="mt-3 text-ink/80">{s.short} {s.detail}</Reveal>
                  <Reveal delay={0.1} className="mt-6">
                    <Link href="/booking" className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-ink px-6 font-medium text-ivory transition-colors hover:bg-deep">
                      Enquire <ArrowUpRight size={18} aria-hidden />
                    </Link>
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Scene 06: from idea to arrival ---------- */
const stages = [
  { name: "Dream", text: "Share your travel vision." },
  { name: "Design", text: "We plan your personalized itinerary." },
  { name: "Prepare", text: "Organize travel documents and services." },
  { name: "Discover", text: "Enjoy your journey." },
];

export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  return (
    <section aria-labelledby="jr-h" className="relative overflow-hidden bg-midnight section-y">
      <div className="gutter mx-auto max-w-[1500px]">
        <Heading id="jr-h" className="max-w-[10em]">From idea to arrival.</Heading>
        <div ref={ref} className="relative mt-14 lg:mt-20">
          {/* the line that fills as you scroll: vertical on a phone, horizontal on a laptop */}
          <div aria-hidden className="absolute bottom-3 left-[19px] top-3 w-[3px] rounded-full bg-white/15 lg:inset-x-0 lg:bottom-auto lg:left-0 lg:top-[19px] lg:h-[3px] lg:w-auto">
            <motion.div style={{ scaleY: p }} className="size-full origin-top rounded-full bg-gradient-to-b from-electric to-brand-red lg:hidden" />
            <motion.div style={{ scaleX: p }} className="hidden size-full origin-left rounded-full bg-gradient-to-r from-electric to-brand-red lg:block" />
          </div>
          <ol className="grid gap-12 lg:grid-cols-4 lg:gap-8">
            {stages.map((s, i) => (
              <li key={s.name} className="relative pl-16 lg:pl-0 lg:pt-16">
                <motion.span initial={{ scale: 0.6, opacity: 0.4 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true, margin: "0px 0px -30% 0px" }} className="absolute left-0 top-0 grid size-10 place-items-center rounded-full bg-brand-red text-lg font-bold shadow-glow-red">
                  {i + 1}
                </motion.span>
                <Reveal as="h3" delay={0.05} className="text-[clamp(1.9rem,3.4vw,2.8rem)] font-bold tracking-[-0.03em]">{s.name}</Reveal>
                <Reveal as="p" delay={0.1} className="mt-2 max-w-[26ch] text-white/80">{s.text}</Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------- Scene 07: three package collections and the custom journey ---------- */
export function Packages() {
  return (
    <section aria-labelledby="pk-h" className="bg-ivory text-ink section-y">
      <div className="mx-auto max-w-[1500px]">
        <div className="gutter">
          <Heading id="pk-h" className="max-w-[10em]">Three ways to travel.</Heading>
          <Reveal as="p" className="mt-4 max-w-[44ch] text-ink/75">Every package is built around your dates and group. Prices are shared with your quotation.</Reveal>
        </div>
        <ul className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:px-[clamp(20px,4vw,64px)] lg:grid lg:grid-cols-3 lg:overflow-visible">
          {packageCollections.map((c) => (
            <li key={c.slug} className="w-[82%] shrink-0 snap-center sm:w-[56%] lg:w-auto">
              <article className="relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[2rem] p-6 text-white">
                <Image src={c.image} alt={c.imageAlt} fill sizes="(min-width: 1024px) 30vw, 80vw" className="-z-20 object-cover" />
                <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-midnight via-midnight/40 to-transparent" />
                <h3 className="text-[clamp(1.9rem,3vw,2.6rem)] font-bold leading-none tracking-[-0.03em]">{c.line}</h3>
                <ul className="mt-4 grid gap-2">
                  {c.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-white/90"><Check size={18} aria-hidden className="mt-1 shrink-0 text-electric-soft" />{h}</li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>

        <div className="gutter mt-10">
          <Reveal className="relative isolate overflow-hidden rounded-[2rem] bg-midnight p-8 text-white sm:p-12 lg:p-16">
            <div aria-hidden className="absolute -right-24 -top-24 -z-10 size-80 rounded-full bg-electric/25 blur-3xl" />
            <p className="text-[0.9375rem] font-medium tracking-[0.25em] text-electric-soft">CUSTOM PACKAGE</p>
            <h3 className="mt-3 max-w-[12em] text-[clamp(2.2rem,6vw,4.6rem)] font-bold leading-[0.98] tracking-[-0.04em]">Your journey. Your way.</h3>
            <p className="mt-4 max-w-[40ch] text-white/80">Choose the destination, the pace and the extras. We shape the rest around you.</p>
            <div className="mt-8"><Button href="/booking">Create Your Journey</Button></div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Scene 08: our promise ---------- */
export function PromiseScene() {
  return (
    <section aria-labelledby="pr-h" className="bg-midnight section-y">
      <div className="gutter mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Heading id="pr-h" className="max-w-[8em]">Our promise.</Heading>
          <Reveal as="p" className="mt-4 max-w-[34ch] text-white/75">{mission.outro}</Reveal>
        </div>
        <ol className="lg:col-span-7">
          {mission.promises.map((t, i) => (
            <Reveal as="li" key={t} delay={i * 0.05} className="flex items-baseline gap-5 border-t border-white/15 py-6 first:border-t-0 first:pt-0">
              <span className="text-[1.125rem] font-medium text-brand-red">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[clamp(1.4rem,3vw,2.3rem)] font-medium leading-tight tracking-[-0.02em]">{t}.</span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
