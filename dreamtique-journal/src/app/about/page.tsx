import type { Metadata } from "next";
import { FinalCta, PageHero, PhotoStrip, VisionMission, WhyChoose } from "@/components/sections/sections";
import { Heading, Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { story, values, valuesInAction, welcome } from "@/data/company";

export const metadata: Metadata = {
  title: "About Us",
  description: "Founded in 2024, Dreamtique Tourism crafts unforgettable journeys and chauffeur services with ease, luxury and personalized attention.",
};

export default function About() {
  return (
    <>
      <PageHero title="Welcome to Dreamtique Tourism." lead="Founded in 2024, built on a passion for travel and a commitment to excellence." image="/images/dubai/burj-al-arab.jpg" alt="The Burj Al Arab hotel on the Dubai coast" />

      <section aria-labelledby="story-h" className="bg-ivory text-ink section-y">
        <div className="gutter grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5"><Heading id="story-h">Our story.</Heading></div>
          <div className="grid content-start gap-6 lg:col-span-7">
            <Reveal as="p" className="text-[clamp(1.35rem,2.2vw,2.1rem)] font-medium leading-[1.3]">{welcome}</Reveal>
            <Reveal as="p" delay={0.1} className="max-w-[56ch] text-ink/80">{story}</Reveal>
          </div>
        </div>
      </section>

      <VisionMission />
      <WhyChoose />

      <section aria-labelledby="values-h" className="bg-ivory text-ink section-y">
        <div className="gutter">
          <Heading id="values-h" className="max-w-[10em]">Ten values we live by.</Heading>
          <ul className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={(i % 3) * 0.06}>
                <TiltCard className="h-full rounded-[1.75rem] bg-white p-7 shadow-[0_20px_50px_-30px_rgba(10,22,51,0.4)]" glow="rgba(224,38,47,0.18)">
                  <span aria-hidden className="block h-1.5 w-10 rounded-full bg-brand-red" />
                  <h3 className="mt-4 text-2xl font-bold tracking-[-0.02em]">{v.title}</h3>
                  <ul className="mt-3 grid gap-2 text-ink/75">
                    {v.points.map((p) => (
                      <li key={p} className="flex gap-3"><span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-brand-red" />{p}</li>
                    ))}
                  </ul>
                </TiltCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="action-h" className="bg-midnight section-y">
        <div className="gutter grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5"><Heading id="action-h">Our values in action.</Heading></div>
          <ul className="grid gap-3 lg:col-span-7">
            {valuesInAction.map((t, i) => (
              <Reveal as="li" key={t} delay={i * 0.06} className="glass flex items-center gap-4 rounded-2xl px-6 py-5 text-xl font-medium">
                <span aria-hidden className="size-2.5 rounded-full bg-electric shadow-glow" />
                {t}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <PhotoStrip />
      <FinalCta heading="Explore the world with us." />
    </>
  );
}
