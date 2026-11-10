import type { Metadata } from "next";
import { Cta, PageHead, Strip } from "@/components/sections";
import { Reveal } from "@/components/Reveal";
import { PinDot, PinList } from "@/components/ui";
import { values } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "Founded in 2024, Dreamtique Tourism crafts unforgettable journeys and chauffeur services with ease, luxury and personalized attention.",
};

export default function About() {
  return (
    <>
      <PageHead title="Welcome to Dreamtique Tourism" lead="A travel company founded in 2024, built on a passion for travel and a commitment to excellence." image="dubai" />

      <section className="grid gap-10 px-[clamp(16px,2.2vw,32px)] py-[clamp(56px,6.5vw,100px)] lg:grid-cols-12 lg:gap-x-2.5">
        <Reveal as="h2" className="display max-w-[7em] text-[length:var(--text-head)] lg:col-span-5">Our story</Reveal>
        <div className="grid content-start gap-7 lg:col-span-6 lg:col-start-7">
          <Reveal as="p" className="max-w-[26ch] text-[clamp(1.25rem,2vw,2rem)] font-medium leading-[1.3]">
            Founded in 2024, Dreamtique Tourism is dedicated to crafting unforgettable journeys and providing exceptional chauffeur services.
          </Reveal>
          <Reveal as="p" delay={0.08} className="max-w-[52ch]">
            Our mission is to empower travelers to explore the world with ease, luxury and personalized attention. Dreamtique was born from a passion for travel and a commitment to excellence. Our team of experienced travel professionals and chauffeur experts came together to create a travel experience that combines fine accommodation, expert guidance and seamless transportation.
          </Reveal>
        </div>
      </section>

      <section className="on-dark grid lg:grid-cols-2" aria-label="Vision and mission">
        <div className="grid content-start gap-5 bg-navy px-[clamp(16px,2.2vw,32px)] py-[clamp(28px,3vw,48px)] text-navy-ink lg:min-h-[40svh]">
          <Reveal as="h2" className="display text-[clamp(1.75rem,2.6vw,2.75rem)]">Our vision</Reveal>
          <Reveal as="p" className="max-w-[48ch] text-[1.1875rem]">To become the leading provider of bespoke travel experiences, harmoniously blending luxury, culture and adventure. We aim to inspire a sense of wonder, fostering meaningful connections between people, places and cultures, and to create lifelong memories for our discerning clients.</Reveal>
        </div>
        <div className="grid content-start gap-5 bg-blue px-[clamp(16px,2.2vw,32px)] py-[clamp(28px,3vw,48px)] text-white lg:min-h-[40svh]">
          <Reveal as="h2" className="display text-[clamp(1.75rem,2.6vw,2.75rem)]">Our mission</Reveal>
          <Reveal as="p" className="max-w-[48ch] text-[1.1875rem]">To empower travelers to explore the world with confidence and style. We promise to:</Reveal>
          <Reveal><PinList items={["Deliver tailored travel itineraries", "Provide expert visa and travel documentation services", "Offer luxurious chauffeur-driven experiences", "Ensure 24/7 customer support"]} /></Reveal>
        </div>
      </section>

      <section aria-labelledby="val-h" className="px-[clamp(16px,2.2vw,32px)] py-[clamp(56px,6.5vw,100px)]">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-2.5">
          <div className="lg:col-span-4">
            <Reveal as="h2" className="display max-w-[7em] text-[length:var(--text-head)]"><span id="val-h">What we stand for</span></Reveal>
            <Reveal as="p" delay={0.08} className="mt-6 max-w-[30ch]">Ten values guide how we plan, travel and serve.</Reveal>
          </div>
          <div className="grid gap-x-2.5 gap-y-10 sm:grid-cols-2 lg:col-span-8">
            {values.map(([t, d], i) => (
              <Reveal key={t} delay={(i % 2) * 0.06}>
                <h3 className="mb-1.5 flex items-center gap-3 text-[1.375rem] font-medium"><PinDot className="text-accent" />{t}</h3>
                <p className="max-w-[38ch]">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Strip keys={["tbilisi", "armenia", "georgia"]} />
      <Cta heading="Explore the world with us" />
    </>
  );
}
