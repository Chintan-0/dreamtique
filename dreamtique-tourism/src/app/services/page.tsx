import type { Metadata } from "next";
import { Check } from "lucide-react";
import { FinalCta, PageHero } from "@/components/sections/sections";
import { Button } from "@/components/ui/Button";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Hotel bookings, tourism packages, attractions and experiences, itinerary planning, visa services and chauffeur services.",
};

export default function Services() {
  return (
    <>
      <PageHero title="Six services. One seamless journey." lead="Each service is designed to work alone, and better together." image="/images/dubai/marina.jpg" alt="The towers of Dubai Marina rising above the water" />

      {services.map((s, i) => {
        const light = i % 2 === 1;
        return (
          <section key={s.slug} id={s.slug} aria-labelledby={`${s.slug}-h`} className={`relative isolate overflow-hidden scroll-mt-20 section-y ${light ? "bg-ivory text-ink" : "bg-midnight"}`}>
            <div aria-hidden className="absolute -z-10 size-[560px] rounded-full opacity-30 blur-[140px]" style={{ background: s.accent, [i % 2 ? "left" : "right"]: "-10%", top: "10%" }} />
            <div className="gutter grid items-center gap-12 lg:grid-cols-12">
              <div className={`lg:col-span-6 ${i % 2 ? "lg:order-2" : ""}`}>
                <span aria-hidden className="mb-5 block h-1.5 w-16 rounded-full" style={{ background: s.accent, boxShadow: `0 0 24px ${s.glow}` }} />
                <Reveal as="h2" delay={0.05} className="text-[clamp(2.25rem,4.8vw,4.5rem)] font-bold leading-[0.98] tracking-[-0.035em]">
                  <span id={`${s.slug}-h`}>{s.name}</span>
                </Reveal>
                <Reveal as="p" delay={0.1} className={`mt-5 max-w-[44ch] text-[clamp(1.125rem,1.6vw,1.4rem)] ${light ? "text-ink/75" : "text-white/75"}`}>{s.detail}</Reveal>
                <ul className="mt-8 grid gap-3">
                  {s.items.map((t, k) => (
                    <Reveal as="li" key={t} delay={0.15 + k * 0.05} className="flex items-center gap-3 text-lg font-medium">
                      <span className="grid size-7 place-items-center rounded-full" style={{ background: s.accent }}><Check size={16} aria-hidden className="text-midnight" /></span>
                      {t}
                    </Reveal>
                  ))}
                </ul>
                <Reveal delay={0.3} className="mt-10"><Button href="/booking" tone={light ? "ink" : "red"}>Enquire about {s.name.toLowerCase()}</Button></Reveal>
              </div>
              <div className={`lg:col-span-6 ${i % 2 ? "lg:order-1" : ""}`}>
                <ImageReveal src={s.image} alt={s.imageAlt} sizes="(min-width: 1024px) 48vw, 100vw" className="aspect-[5/4]" rounded="rounded-[2rem]" />
              </div>
            </div>
          </section>
        );
      })}

      <FinalCta heading="One team for the whole journey." />
    </>
  );
}
