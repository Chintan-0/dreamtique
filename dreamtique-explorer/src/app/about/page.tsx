import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { CtaBand, PageBanner, WhySection } from "@/components/sections";
import { Reveal } from "@/components/ui";
import { mission, story, values, vision, welcome } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: "Founded in 2024, Dreamtique Tourism crafts unforgettable journeys and chauffeur services with ease, luxury and personalized attention.",
};

export default function About() {
  return (
    <>
      <PageBanner title="Welcome to Dreamtique Tourism" lead="Founded in 2024, built on a passion for travel and a commitment to excellence." image="/images/dubai-frame.jpg" alt="The Dubai Frame observation deck" crumb="About" />

      <section className="wrap section-y" aria-labelledby="story-h">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2 id="story-h" className="text-[clamp(1.75rem,3.2vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.025em] lg:col-span-4">Our story</h2>
          <div className="grid content-start gap-5 lg:col-span-8">
            <Reveal><p className="text-[clamp(1.3rem,2vw,1.75rem)] font-medium leading-snug">{welcome}</p></Reveal>
            <Reveal delay={0.08}><p className="max-w-[60ch] text-ink-soft">{story}</p></Reveal>
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-2" aria-label="Vision and mission">
        <div className="bg-ink px-[clamp(16px,4vw,64px)] py-[clamp(40px,6vw,88px)] text-white">
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold tracking-[-0.025em]">Our vision</h2>
          <p className="mt-4 max-w-[52ch] text-white/85">{vision}</p>
        </div>
        <div className="bg-sun px-[clamp(16px,4vw,64px)] py-[clamp(40px,6vw,88px)]">
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold tracking-[-0.025em]">Our mission</h2>
          <p className="mt-4 max-w-[52ch]">{mission.intro}</p>
          <ul className="mt-4 grid gap-2.5">{mission.promises.map((m) => <li key={m} className="flex items-center gap-3 font-medium"><CheckCircle2 size={20} aria-hidden />{m}</li>)}</ul>
        </div>
      </section>

      <WhySection />

      <section className="bg-sand section-y" aria-labelledby="val-h">
        <div className="wrap">
          <h2 id="val-h" className="mb-8 text-[clamp(1.75rem,3.2vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.025em]">Ten values we live by</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {values.map(([t, d], i) => (
              <Reveal key={t} delay={(i % 5) * 0.05}>
                <li className="h-full rounded-[1.5rem] bg-white p-5 shadow-card"><span aria-hidden className="mb-3 block h-1.5 w-8 rounded-full bg-brand" /><b className="text-lg">{t}</b><p className="mt-1 text-[0.98rem] text-ink-soft">{d}</p></li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <div className="pt-[clamp(48px,6vw,96px)]"><CtaBand heading="Explore the world with us." /></div>
    </>
  );
}
