import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { CtaBand, PageBanner } from "@/components/sections";
import { Reveal, SectionHead } from "@/components/ui";
import { enquiryHref } from "@/lib/enquiry";
import { packageCollections } from "@/data/experiences";

export const metadata: Metadata = {
  title: "Packages",
  description: "Luxury, cultural and adventure packages, or create your own. Package prices are shared on request.",
};

const includes = [
  ["Stay", "Luxury hotels and resorts, or budget-friendly options."],
  ["Experiences", "Guided tours, museums and landmarks, food and wine, outdoor activities."],
  ["Paperwork", "Visa application assistance and document processing."],
  ["Transport", "Airport transfers, hourly chauffeurs and city-to-city transfers."],
];

export default function Packages() {
  return (
    <>
      <PageBanner title="Packages" lead="Luxury, cultural and adventure journeys, or one made entirely for you." image="/images/ushguli.jpg" alt="Stone towers of Ushguli in the Svaneti mountains" crumb="Packages" />

      <section className="wrap section-y" aria-labelledby="pk-h">
        <SectionHead title="Ready-made packages" sub="Every package can be adjusted to your dates and group. Prices are shared on request." />
        <h2 id="pk-h" className="sr-only">Package collections</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {packageCollections.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <article className="flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-card">
                <div className="relative aspect-[4/3]"><Image src={p.image} alt={p.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" /></div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-2xl font-bold tracking-[-0.02em]">{p.name}</h3>
                  <ul className="mt-3 grid gap-2">{p.highlights.map((h) => <li key={h} className="flex gap-2"><Check size={18} aria-hidden className="mt-1 shrink-0 text-leaf" />{h}</li>)}</ul>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                    <span className="font-semibold">Price on request</span>
                    <Link href={enquiryHref({ service: "Package", note: p.name })} className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-ink px-5 font-semibold text-white hover:bg-brand">Enquire <ArrowRight size={16} aria-hidden /></Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-sand section-y" aria-labelledby="own-h">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="own-h" className="text-[clamp(1.75rem,3.2vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.025em]">Create your own package</h2>
            <p className="mt-4 max-w-[44ch] text-ink-soft">Choose a destination, pick your travel dates and tell us what matters. We design the itinerary, and the hotels, visas and chauffeurs that go with it.</p>
            <Link href={enquiryHref({ service: "Package", note: "A custom itinerary" })} className="mt-7 inline-flex min-h-[52px] items-center rounded-full bg-brand px-7 font-semibold text-white hover:bg-brand-dark">Start a custom itinerary</Link>
          </div>
          <div className="lg:col-span-7">
            <h3 className="mb-4 text-xl font-bold">What&apos;s included in a package</h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {includes.map(([t, s]) => <li key={t} className="rounded-2xl bg-white p-5 shadow-card"><b className="text-lg">{t}</b><p className="mt-1 text-ink-soft">{s}</p></li>)}
            </ul>
          </div>
        </div>
      </section>

      <div className="pt-[clamp(48px,6vw,96px)]"><CtaBand heading="Tell us what you have in mind." /></div>
    </>
  );
}
