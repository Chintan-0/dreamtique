"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { destinations } from "@/data/destinations";
import { gsap, whenMotionOk } from "@/animations/scroll";
import { Button } from "@/components/ui/Button";

/** Scroll storytelling: the section pins while Dubai, Georgia and Armenia wipe into each other as you scroll. */
export function ScrollStory() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    return whenMotionOk(() => {
      const ctx = gsap.context(() => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");
        const bar = el.querySelector("[data-bar]");
        const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: el, start: "top top", end: `+=${panels.length * 90}%`, pin: true, scrub: 0.8, anticipatePin: 1 } });
        panels.forEach((p, i) => {
          const img = p.querySelector("[data-img]");
          const text = p.querySelectorAll("[data-text]");
          if (i > 0) {
            tl.fromTo(p, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, `s${i}`);
            if (img) tl.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1 }, `s${i}`);
          }
          tl.fromTo(text, { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 }, i === 0 ? 0 : `s${i}+=0.4`);
          if (i < panels.length - 1) tl.to(text, { y: -40, opacity: 0, duration: 0.4 }, `s${i + 1}-=0.35`);
        });
        if (bar) tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: tl.duration() }, 0);
      }, el);
      return () => ctx.revert();
    });
  }, []);

  return (
    <>
      {/* pinned storytelling for motion-friendly visitors */}
      <div ref={root} className="relative h-[100svh] overflow-hidden bg-midnight motion-reduce:hidden">
        {destinations.map((d, i) => (
          <article key={d.slug} data-panel className="absolute inset-0">
            <div data-img className="absolute inset-0">
              <Image src={d.image} alt={d.imageAlt} fill sizes="100vw" className="object-cover" />
            </div>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/30 to-midnight/20" />
            <div className="gutter absolute inset-x-0 bottom-[12svh] z-10">
              <p data-text className="text-lg font-medium text-electric-soft">{d.region}</p>
              <h2 data-text className="mt-3 text-[clamp(3.5rem,13vw,13rem)] font-bold leading-[0.88] tracking-[-0.05em] text-glow">{d.name}</h2>
              <p data-text className="mt-4 max-w-[34ch] text-[clamp(1.125rem,1.8vw,1.75rem)] leading-snug text-white/85">{d.tagline}</p>
              <div data-text className="mt-8"><Button href={`/destinations/${d.slug}`}>Discover {d.name}</Button></div>
            </div>
          </article>
        ))}
        <div aria-hidden className="absolute inset-x-0 top-0 z-20 h-[3px] bg-white/10"><div data-bar className="h-full origin-left bg-brand-red" /></div>
      </div>

      {/* the same story, stacked, for reduced motion */}
      <div className="hidden motion-reduce:grid">
        {destinations.map((d) => (
          <article key={d.slug} className="relative isolate min-h-[70svh]">
            <Image src={d.image} alt={d.imageAlt} fill sizes="100vw" className="-z-10 object-cover" />
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-midnight via-midnight/40 to-transparent" />
            <div className="gutter flex min-h-[70svh] flex-col justify-end pb-12">
              <h2 className="text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.9] tracking-[-0.05em]">{d.name}</h2>
              <p className="mt-3 max-w-[34ch] text-xl">{d.tagline}</p>
              <div className="mt-6"><Button href={`/destinations/${d.slug}`}>Discover {d.name}</Button></div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
