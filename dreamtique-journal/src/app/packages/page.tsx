import type { Metadata } from "next";
import Image from "next/image";
import { FinalCta, PageHero } from "@/components/sections/sections";
import { Button } from "@/components/ui/Button";
import { Heading, Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { packageCollections, packageIncludes } from "@/data/packages";

export const metadata: Metadata = {
  title: "Packages",
  description: "Luxury, cultural and adventure packages, or create your own. Package enquiries are answered by the Dreamtique team.",
};

export default function Packages() {
  return (
    <>
      <PageHero title="Packages." lead="Luxury, cultural and adventure journeys, or one made entirely for you." image="/images/georgia/ushguli.jpg" alt="Stone towers of Ushguli in the Svaneti mountains" />

      <section aria-label="Package collections" className="bg-midnight section-y">
        <div className="gutter grid gap-5 lg:grid-cols-3">
          {packageCollections.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.08}>
              <TiltCard className="aspect-[3/4] rounded-[2rem]">
                <Image src={c.image} alt={c.imageAlt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="-z-10 object-cover" />
                <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-midnight via-midnight/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <h2 className="text-5xl font-bold leading-none tracking-[-0.04em]">{c.name}</h2>
                  <p className="mt-2 text-white/80">{c.line}</p>
                  <ul className="mt-4 grid gap-1 text-white/80">{c.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
                  <div className="mt-6"><Button href="/booking">Enquire</Button></div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <p className="gutter mt-8 text-white/60">Package prices are shared on request, once we know your destination, dates and group.</p>
      </section>

      <section aria-labelledby="own-h" className="bg-ivory text-ink section-y">
        <div className="gutter grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Heading id="own-h">Create your own package.</Heading>
            <Reveal as="p" delay={0.1} className="mt-6 max-w-[44ch] text-ink/80">Choose a destination, pick your travel dates, and tell us what matters. We design the itinerary, and the hotels, visas and chauffeurs that go with it.</Reveal>
            <Reveal delay={0.18} className="mt-8"><Button href="/booking" tone="ink">Start your custom itinerary</Button></Reveal>
          </div>
          <div className="lg:col-span-6">
            <h3 className="mb-5 text-sm font-medium tracking-[0.3em] text-ink/60">WHAT&apos;S INCLUDED IN A PACKAGE</h3>
            <ul className="grid gap-3">
              {packageIncludes.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 0.06} className="rounded-2xl bg-white p-6 shadow-[0_20px_50px_-30px_rgba(10,22,51,0.4)]">
                  <b className="text-xl">{p.title}</b>
                  <p className="mt-1 text-ink/75">{p.text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FinalCta heading="Tell us what you have in mind." />
    </>
  );
}
