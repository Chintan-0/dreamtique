"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import gsap from "gsap";
import { destinations } from "@/lib/content";
import { ButtonLink } from "./ui";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // the picture in the pin changes slowly between the destinations
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % destinations.length), 6000);
    return () => clearInterval(id);
  }, [paused, active]);

  // cinematic entrance and pointer parallax (GSAP)
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".hero-pin", { y: "-90vh", rotate: -14, scale: 0.7, opacity: 0, duration: 1.4, ease: "bounce.out" })
          .from(".hero-line", { yPercent: 115, duration: 0.9, stagger: 0.12 }, 0.25)
          .from(".hero-fade", { y: 24, opacity: 0, duration: 0.7, stagger: 0.1 }, 0.8)
          .from(".hero-chip", { scale: 0.6, opacity: 0, duration: 0.5, stagger: 0.08, ease: "back.out(2)" }, 1.1);

        // a slow float, and a small tilt that follows the pointer
        gsap.to(".hero-float", { y: -8, duration: 2.6, ease: "sine.inOut", repeat: -1, yoyo: true });
        const rx = gsap.quickTo(".hero-tilt", "rotationY", { duration: 0.8, ease: "power3.out" });
        const ry = gsap.quickTo(".hero-tilt", "rotationX", { duration: 0.8, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          rx(((e.clientX / window.innerWidth) - 0.5) * 14);
          ry(-((e.clientY / window.innerHeight) - 0.5) * 10);
        };
        window.addEventListener("pointermove", move);
        return () => window.removeEventListener("pointermove", move);
      }, root);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden lg:grid lg:min-h-[min(calc(100svh-76px),760px)] lg:items-center">
      <div className="gutter relative z-10 py-10 lg:max-w-[56vw] lg:py-12">
        <h1 className="display text-[length:clamp(1.75rem,7.3vw,3.5rem)] lg:max-w-[14em] lg:text-[length:var(--text-display)]">
          <span className="block overflow-hidden pb-[0.08em]"><span className="hero-line block">Unforgettable journeys,</span></span>
          <span className="block overflow-hidden pb-[0.08em]"><span className="hero-line block">crafted with passion</span></span>
        </h1>
        <p className="hero-fade mt-8 max-w-[34ch] text-[length:var(--text-lead)] leading-snug">
          Dreamtique Tourism plans your hotels, visas, experiences and chauffeur-driven transfers, so you can enjoy the trip.
        </p>
        <div className="hero-fade mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
          <ButtonLink href="/contact">Plan your journey</ButtonLink>
          <Link href="/destinations" className="font-medium underline underline-offset-[5px]">
            See destinations
          </Link>
        </div>
      </div>

      {/* the motif, enlarged: the logo's pin with a globe cut into it */}
      <div className="hero-tilt mx-auto mb-8 mt-2 aspect-[4/5] w-[min(64vw,340px)] [perspective:900px] lg:absolute lg:right-[3vw] lg:top-1/2 lg:m-0 lg:h-[min(84vh,47vw)] lg:w-auto lg:-translate-y-1/2">
        <div className="hero-pin h-full w-full">
          <div className="hero-float pin-clip relative h-full w-full bg-accent">
            <div className="absolute left-[19%] top-[4%] aspect-square w-[62%] overflow-hidden rounded-full bg-navy">
              {destinations.map((d, i) => (
                <motion.div
                  key={d.slug}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1.08 : 1 }}
                  transition={{ opacity: { duration: 1.4 }, scale: { duration: 7, ease: "linear" } }}
                >
                  <Image src={d.image} alt={d.alt} fill priority={i === 0} sizes="(min-width: 1024px) 30vw, 60vw" className="object-cover" />
                </motion.div>
              ))}
            </div>

            <div
              role="group"
              aria-label="Show a destination"
              className="absolute left-1/2 top-[55%] flex -translate-x-1/2 flex-col items-center gap-1 lg:gap-1.5"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {destinations.map((d, i) => (
                <button
                  key={d.slug}
                  type="button"
                  aria-pressed={active === i}
                  onClick={() => setActive(i)}
                  className={`hero-chip px-1 py-1.5 text-[0.9375rem] font-semibold transition-[background-color,color] duration-200 lg:py-2.5 lg:text-[1.25rem] ${["w-[6.5rem] lg:w-[10rem]", "w-[5.5rem] lg:w-[8.5rem]", "w-[4.75rem] lg:w-[7rem]"][i]} ${
                    active === i ? "bg-white text-ink" : "bg-[#9d1420] text-white hover:bg-[#7f101a]"
                  }`}
                >
                  {d.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
