import type { Metadata } from "next";
import { PageTop } from "@/components/PageTop";
import { FinalPanel } from "@/components/Panels";
import { Label, Reveal } from "@/components/ui";
import { mission, story, values, valuesInAction, vision, whyChoose } from "@/data/company";

export const metadata: Metadata = {
  title: "About us",
  description: "Dreamtique Tourism was founded in 2024 to craft unforgettable journeys and chauffeur services. Our story, vision, mission and values.",
};

export default function About() {
  return (
    <>
      <PageTop crumb="About us" title="Crafted with passion." lead="A travel company dedicated to unforgettable journeys and exceptional chauffeur services." image="/images/georgia/peace-bridge.jpg" alt="The Peace Bridge over the Kura river in Tbilisi" />

      <section aria-labelledby="ab-story" className="section-y gutter mx-auto max-w-[1700px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Label>Our story</Label>
            <h2 id="ab-story" className="display mt-5 text-[clamp(2.6rem,5.5vw,5rem)]">Born from a passion for travel.</h2>
          </div>
          <div className="grid gap-8 lg:col-span-7">
            <Reveal as="p" className="text-[clamp(1.2rem,1.8vw,1.5rem)]">{story}</Reveal>
            <Reveal as="p" delay={0.05} className="text-mute">{vision}</Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="ab-mission" className="section-y bg-mist">
        <div className="gutter mx-auto max-w-[1700px]">
          <Label>Our mission</Label>
          <h2 id="ab-mission" className="display mt-5 max-w-[10em] text-[clamp(2.6rem,6vw,5.5rem)]">Travel with confidence and style.</h2>
          <p className="mt-5 max-w-[52ch] text-mute">{mission.intro}</p>
          <ol className="mt-10 grid border-l border-t border-line bg-white sm:grid-cols-2">
            {mission.promises.map((t, i) => (
              <li key={t} className="border-b border-r border-line p-7 sm:p-9">
                <span className="label text-red">0{i + 1}</span>
                <p className="display mt-3 text-[clamp(1.8rem,3vw,2.6rem)]">{t}.</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-[56ch] text-mute">{mission.outro}</p>
        </div>
      </section>

      <section aria-labelledby="ab-why" className="section-y gutter mx-auto max-w-[1700px]">
        <Label>Why choose us</Label>
        <h2 id="ab-why" className="display mt-5 text-[clamp(2.6rem,6vw,5.5rem)]">Four reasons.</h2>
        <ul className="mt-10 grid gap-x-10 border-t border-ink sm:grid-cols-2 lg:grid-cols-4">
          {whyChoose.map((w) => (
            <li key={w.title} className="border-b border-line py-7 lg:border-b-0">
              <h3 className="display text-[clamp(1.8rem,2.6vw,2.4rem)]">{w.title}</h3>
              <p className="mt-2 text-mute">{w.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="ab-values" className="section-y bg-mist">
        <div className="gutter mx-auto max-w-[1700px]">
          <Label>Our values</Label>
          <h2 id="ab-values" className="display mt-5 text-[clamp(2.6rem,6vw,5.5rem)]">Ten values we work by.</h2>
          <ul className="mt-10 grid border-l border-t border-line bg-white sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <li key={v.title} className="border-b border-r border-line p-7">
                <span className="label text-mute">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display mt-2 text-[clamp(1.7rem,2.4vw,2.2rem)]">{v.title}</h3>
                <ul className="mt-3 grid gap-2 text-mute">
                  {v.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <h3 className="display mt-14 text-[clamp(1.9rem,3vw,2.8rem)]">Our values in action</h3>
          <ul className="mt-4 border-t border-ink">
            {valuesInAction.map((t) => (
              <li key={t} className="border-b border-line py-4">{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <FinalPanel />
    </>
  );
}
