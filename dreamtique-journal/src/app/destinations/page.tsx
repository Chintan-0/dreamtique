import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DestinationExplorer } from "@/components/destination/DestinationExplorer";
import { FinalCta, PageHero } from "@/components/sections/sections";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";
import { destinations } from "@/data/destinations";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Dubai, Georgia and Armenia, with more destinations on request. Overviews, must-see attractions and recommended activities.",
};

export default function Destinations() {
  return (
    <>
      <PageHero title="Destinations." lead="Dubai, Georgia and Armenia, with more on request." image="/images/georgia/peace-bridge.jpg" alt="The Peace Bridge over the Kura river in Tbilisi" />
      <DestinationExplorer heading="Choose a place." />
      {destinations.map((d, i) => (
        <section key={d.slug} aria-labelledby={`${d.slug}-h`} className={`${i % 2 ? "bg-ivory text-ink" : "bg-midnight"} section-y`}>
          <div className="gutter grid items-center gap-12 lg:grid-cols-12">
            <div className={`lg:col-span-5 ${i % 2 ? "lg:order-2" : ""}`}>
              <Reveal as="p" className="text-lg font-medium text-electric">{d.region}</Reveal>
              <Reveal as="h2" delay={0.05} className="mt-3 text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[0.92] tracking-[-0.045em]"><span id={`${d.slug}-h`}>{d.name}</span></Reveal>
              <Reveal as="p" delay={0.1} className="mt-5 max-w-[36ch] text-[clamp(1.125rem,1.8vw,1.5rem)] leading-snug opacity-80">{d.tagline}</Reveal>
              <Reveal delay={0.15}>
                <Link href={`/destinations/${d.slug}`} className="mt-8 inline-flex items-center gap-2 font-medium underline underline-offset-[6px]">
                  Explore {d.name} <ArrowUpRight size={18} aria-hidden />
                </Link>
              </Reveal>
            </div>
            <div className={`grid gap-4 sm:grid-cols-2 lg:col-span-7 ${i % 2 ? "lg:order-1" : ""}`}>
              {d.gallery.slice(0, 2).map((g, k) => (
                <ImageReveal key={g.src} src={g.src} alt={g.alt} sizes="(min-width: 1024px) 28vw, 100vw" className={`${k ? "aspect-[4/5] sm:mt-12" : "aspect-[4/5]"}`} rounded="rounded-[2rem]" />
              ))}
            </div>
          </div>
        </section>
      ))}
      <FinalCta heading="Somewhere else in mind? Tell us." />
    </>
  );
}
