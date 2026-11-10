"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { destinations } from "@/data/destinations";
import { company } from "@/data/company";
import { heroIntro } from "@/animations/hero";
import { gsap, whenMotionOk } from "@/animations/scroll";
import { Button } from "@/components/ui/Button";
import { Particles } from "./Particles";

const heroImages = ["/images/dubai/marina.jpg", "/images/georgia/peace-bridge.jpg", "/images/armenia/tatev.jpg"];

/** Full-screen cinematic hero: travel video with layered depth, particles, text reveal and the destination selector. */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const d = destinations[active];

  // the selected destination changes slowly on its own until the visitor chooses one
  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % destinations.length), 7000);
    return () => clearInterval(id);
  }, [auto, active]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    return whenMotionOk(() => {
      const intro = sessionStorage.getItem("dreamtique-intro-seen") || navigator.webdriver ? 0.1 : 3.2;
      const ctx = gsap.context(() => {
        heroIntro(el, intro);
        // layered depth: the layers drift at different speeds, with the pointer and with scroll
        const layers = el.querySelectorAll<HTMLElement>("[data-depth]");
        const setters = Array.from(layers).map((l) => ({
          x: gsap.quickTo(l, "x", { duration: 1, ease: "power3.out" }),
          y: gsap.quickTo(l, "y", { duration: 1, ease: "power3.out" }),
          depth: Number(l.dataset.depth),
        }));
        const move = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          setters.forEach((s) => {
            s.x(nx * s.depth * 40);
            s.y(ny * s.depth * 28);
          });
        };
        window.addEventListener("pointermove", move);
        gsap.to("[data-hero-bg]", { yPercent: 18, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
        gsap.to("[data-hero-content]", { yPercent: -12, opacity: 0.2, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
        return () => window.removeEventListener("pointermove", move);
      }, el);
      return () => ctx.revert();
    });
  }, []);

  return (
    <section ref={root} className="relative isolate flex min-h-[100svh] items-end overflow-hidden pb-16 pt-32 md:items-center md:pb-10">
      {/* background: video, with the destination photograph crossfading above it */}
      <div data-hero-bg className="absolute inset-[-6%] -z-30" data-depth="-0.4">
        <video className="absolute inset-0 size-full object-cover" autoPlay muted loop playsInline preload="metadata" poster="/videos/tbilisi-street-poster.jpg" aria-hidden>
          <source src="/videos/tbilisi-street.webm" type="video/webm" />
        </video>
        <AnimatePresence>
          <motion.div key={d.slug} className="absolute inset-0" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 0.88, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.6, ease: "easeOut" }}>
            <Image src={heroImages[active]} alt="" fill priority={active === 0} sizes="100vw" className="object-cover" />
          </motion.div>
        </AnimatePresence>
      </div>
      <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-to-t from-midnight via-midnight/55 to-midnight/25" />
      <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-to-r from-midnight/80 via-midnight/20 to-transparent" />
      <Particles className="absolute inset-0 -z-10" />

      <div data-hero-content className="gutter relative z-10 w-full">
        <div className="max-w-[1100px]">
          <h1 className="text-[clamp(2.5rem,7.4vw,7.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-glow">
            <span className="block overflow-hidden pb-[0.1em]" data-depth="0.5"><span data-hero-line className="block">Unforgettable Journeys,</span></span>
            <span className="block overflow-hidden pb-[0.1em]" data-depth="0.8"><span data-hero-line className="block text-electric-soft">Crafted with Passion.</span></span>
          </h1>
          <p data-hero-fade className="mt-8 max-w-[44ch] text-[clamp(1.125rem,1.6vw,1.5rem)] leading-snug text-white/80">
            Hotels, visas, experiences and chauffeur-driven transfers, planned around you, so you can enjoy the trip.
          </p>
          <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="/booking">{company.cta}</Button>
            <Button href="/destinations" tone="glass">Explore destinations</Button>
          </div>
        </div>

        {/* destination selector */}
        <div className="mt-14 flex flex-wrap items-center gap-3" role="group" aria-label="Choose a destination">
          <span data-hero-fade className="mr-2 text-base font-medium text-white/65">Now showing</span>
          {destinations.map((x, i) => (
            <button
              key={x.slug}
              data-hero-chip
              type="button"
              aria-pressed={active === i}
              onClick={() => {
                setAuto(false);
                setActive(i);
              }}
              className={`min-h-[46px] rounded-full px-6 font-medium transition-all duration-300 ${active === i ? "bg-white text-midnight shadow-glow" : "glass text-white hover:bg-white/15"}`}
            >
              {x.name}
            </button>
          ))}
          <AnimatePresence mode="wait">
            <motion.span key={d.slug} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="ml-2 hidden text-white/70 md:inline">
              {d.tagline}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <a href="#after-hero" aria-label="Scroll to content" className="absolute bottom-6 right-[clamp(20px,4vw,64px)] hidden size-12 place-items-center rounded-full glass md:grid">
        <ChevronDown aria-hidden className="animate-[float-y_2.2s_ease-in-out_infinite]" />
      </a>
    </section>
  );
}
