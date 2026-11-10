import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Car, CheckCircle2, Clock, FileCheck2, Headset, Sparkles } from "lucide-react";
import { categories, why } from "@/data/site";
import { destinationInfo, destinationList, experiences, packageCollections } from "@/data/experiences";
import { Finder } from "./Finder";
import { Faq } from "./Faq";
import { ExperienceCard, Rail, Reveal, SectionHead } from "./ui";
import { enquiryHref } from "@/lib/enquiry";

export function Hero() {
  return (
    <section className="wrap pt-5">
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink text-white lg:col-span-8">
          <Image src="/images/marina.jpg" alt="" fill priority sizes="(min-width: 1024px) 66vw, 100vw" className="-z-20 object-cover" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />
          <div className="flex min-h-[560px] flex-col justify-between gap-12 p-6 sm:p-10">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur"><Sparkles size={16} aria-hidden className="text-sun" /> Dubai · Georgia · Armenia</p>
              <h1 className="mt-6 max-w-[14em] text-[clamp(2.25rem,5.4vw,4.75rem)] font-bold leading-[0.98] tracking-[-0.035em]">Unforgettable journeys, crafted with passion.</h1>
              <p className="mt-5 max-w-[46ch] text-[1.2rem] text-white/85">Experiences, hotels, visas and chauffeur-driven transfers, planned around you.</p>
            </div>
            <Finder />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1 lg:grid-rows-2">
          {[destinationInfo.georgia, destinationInfo.armenia].map((d) => (
            <Link key={d.slug} href={`/destinations/${d.slug}`} className="group relative isolate flex min-h-[260px] items-end overflow-hidden rounded-[2rem] p-6 text-white">
              <Image src={d.image} alt={d.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="-z-20 object-cover transition-transform duration-700 group-hover:scale-110" />
              <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <div>
                <p className="text-3xl font-bold tracking-[-0.02em]">{d.name}</p>
                <p className="mt-1 max-w-[26ch] text-white/85">{d.tagline}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 font-semibold">Explore <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          [Headset, "24/7 support", "Help while you travel"],
          [FileCheck2, "Visa assistance", "Applications and documents"],
          [Car, "Chauffeur transfers", "Airport, hourly, city-to-city"],
          [BadgeCheck, "Personalized plans", "Built around you"],
        ].map(([Icon, t, s]) => {
          const I = Icon as typeof Headset;
          return (
            <li key={t as string} className="flex items-center gap-4 rounded-2xl bg-sand px-5 py-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white shadow-card"><I size={22} aria-hidden className="text-brand" /></span>
              <div><b className="block font-semibold">{t as string}</b><span className="text-[0.95rem] text-ink-soft">{s as string}</span></div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function CityTiles() {
  const layout = ["lg:col-span-6 lg:row-span-2 min-h-[420px]", "lg:col-span-6 min-h-[200px]", "lg:col-span-6 min-h-[200px]"];
  return (
    <section className="wrap section-y" aria-labelledby="cities-h">
      <SectionHead title="Best cities to visit" sub="Start with a destination, then pick what to do there." />
      <h2 id="cities-h" className="sr-only">Destinations</h2>
      <div className="grid gap-4 lg:grid-cols-12">
        {destinationList.map((d, i) => (
          <Reveal key={d.slug} delay={i * 0.08} className={layout[i]}>
            <Link href={`/destinations/${d.slug}`} className="group relative isolate flex h-full min-h-[inherit] items-end overflow-hidden rounded-[2rem] p-7 text-white">
              <Image src={d.image} alt={d.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="-z-20 object-cover transition-transform duration-700 group-hover:scale-105" />
              <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />
              <div className="flex w-full items-end justify-between gap-4">
                <div>
                  <p className="text-[clamp(1.75rem,3vw,2.75rem)] font-bold leading-none tracking-[-0.03em]">{d.name}</p>
                  <p className="mt-2 text-white/85">{d.country} · {experiences.filter((e) => e.destination === d.slug).length} experiences</p>
                </div>
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-ink transition-colors group-hover:bg-sun"><ArrowRight aria-hidden /></span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function DestinationRails() {
  return (
    <>
      {destinationList.map((d, i) => (
        <section key={d.slug} aria-labelledby={`rail-${d.slug}`} className={`${i % 2 === 0 ? "bg-sand" : ""} section-y`}>
          <div className="wrap">
            <SectionHead
              title={`Things to do in ${d.name}`}
              sub={d.tagline}
              action={<Link href={`/experiences?destination=${d.slug}`} className="inline-flex items-center gap-1.5 font-semibold underline underline-offset-4 hover:text-brand">See all in {d.name} <ArrowRight size={16} aria-hidden /></Link>}
            />
            <span id={`rail-${d.slug}`} className="sr-only">Things to do in {d.name}</span>
            <Rail label={`Experiences in ${d.name}`}>
              {experiences.filter((e) => e.destination === d.slug).map((e, k) => (
                <div key={e.slug} className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[31.5%] xl:w-[24%]"><ExperienceCard e={e} index={k} /></div>
              ))}
            </Rail>
          </div>
        </section>
      ))}
    </>
  );
}

export function CategoryGrid() {
  return (
    <section className="wrap section-y" aria-labelledby="cat-h">
      <SectionHead title="Everything for the trip, in one place" sub="Six services from the first idea to the ride home." />
      <h2 id="cat-h" className="sr-only">Services</h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c, i) => (
          <Reveal key={c.key} delay={(i % 3) * 0.07}>
            <Link href={c.href} className={`group flex h-full min-h-[240px] flex-col justify-between gap-8 rounded-[2rem] p-7 transition-transform duration-300 hover:-translate-y-1.5 ${c.tone}`}>
              <div>
                <h3 className="text-2xl font-bold tracking-[-0.02em]">{c.label}</h3>
                <p className="mt-2 max-w-[30ch] opacity-85">{c.blurb}</p>
              </div>
              <ul className="grid gap-1.5 text-[0.98rem]">
                {c.items.slice(0, 3).map((t) => <li key={t} className="flex items-center gap-2"><CheckCircle2 size={16} aria-hidden className="shrink-0" />{t}</li>)}
              </ul>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

export function PackagesRow() {
  return (
    <section className="wrap section-y" aria-labelledby="pk-h">
      <SectionHead title="Packages for every mood" sub="Pre-designed or built just for you. Prices are shared on request." action={<Link href="/packages" className="font-semibold underline underline-offset-4 hover:text-brand">All packages</Link>} />
      <h2 id="pk-h" className="sr-only">Packages</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {packageCollections.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08}>
            <Link href={enquiryHref({ service: "Package", note: p.name })} className="group relative isolate flex min-h-[380px] items-end overflow-hidden rounded-[2rem] p-7 text-white">
              <Image src={p.image} alt={p.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="-z-20 object-cover transition-transform duration-700 group-hover:scale-110" />
              <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
              <div>
                <h3 className="text-3xl font-bold tracking-[-0.02em]">{p.name}</h3>
                <ul className="mt-3 grid gap-1 text-white/85">{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
                <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-sun px-4 py-2 font-semibold text-ink">Enquire <ArrowRight size={16} aria-hidden /></span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function VisaBanner() {
  return (
    <section className="wrap pb-[clamp(48px,6vw,96px)]">
      <Reveal>
        <div className="grid items-center gap-6 overflow-hidden rounded-[2rem] bg-brand p-8 text-white sm:p-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-[clamp(1.75rem,3.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]">Visa paperwork, taken care of.</h2>
            <p className="mt-3 max-w-[46ch] text-white/90">Visa application assistance and document processing, with global visa expertise.</p>
            <Link href={enquiryHref({ service: "Visa" })} className="mt-6 inline-flex min-h-[52px] items-center gap-2 rounded-full bg-white px-7 font-semibold text-ink transition-colors hover:bg-sun">Ask about a visa <ArrowRight size={18} aria-hidden /></Link>
          </div>
          <ul className="grid gap-3 text-lg font-medium">
            {["Visa application assistance", "Document processing", "Global visa expertise"].map((t) => <li key={t} className="flex items-center gap-3 rounded-2xl bg-white/15 px-5 py-3"><CheckCircle2 aria-hidden size={22} />{t}</li>)}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    ["Tell us", "Where, when and what kind of trip. Use the finder or send an enquiry."],
    ["We plan", "A personalized itinerary with expert recommendations. We follow up with availability and a quotation."],
    ["We prepare", "Hotels, visas and transfers are arranged and your plan updates in real time."],
    ["You travel", "A professional chauffeur meets you, and 24/7 support stays with you."],
  ];
  return (
    <section className="bg-sand section-y" aria-labelledby="how-h">
      <div className="wrap">
        <SectionHead title="From idea to arrival" sub="Four simple steps." />
        <h2 id="how-h" className="sr-only">How it works</h2>
        <ol className="grid gap-4 md:grid-cols-4">
          {steps.map(([t, s], i) => (
            <Reveal key={t} delay={i * 0.08}>
              <li className="relative h-full rounded-[1.75rem] bg-white p-6 shadow-card">
                <span aria-hidden className="grid size-12 place-items-center rounded-full bg-sun text-xl font-bold">{i + 1}</span>
                <h3 className="mt-5 text-xl font-bold">{t}</h3>
                <p className="mt-2 text-ink-soft">{s}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function WhySection() {
  return (
    <section className="wrap section-y" aria-labelledby="why-h">
      <SectionHead title="Why choose Dreamtique Tourism?" />
      <h2 id="why-h" className="sr-only">Why choose Dreamtique Tourism</h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {why.map((w, i) => (
          <Reveal key={w.title} delay={i * 0.06}>
            <li className="h-full rounded-[1.75rem] border border-line bg-white p-6">
              <Clock aria-hidden className="text-brand" />
              <h3 className="mt-4 text-xl font-bold">{w.title}</h3>
              <p className="mt-2 text-ink-soft">{w.text}</p>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="wrap section-y" id="faq" aria-labelledby="faq-h">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4"><h2 id="faq-h" className="text-[clamp(1.75rem,3.2vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.025em]">Questions, answered</h2></div>
        <div className="lg:col-span-8"><Faq /></div>
      </div>
    </section>
  );
}

export function CtaBand({ heading = "Ready to plan your journey?" }: { heading?: string }) {
  return (
    <section className="wrap pb-[clamp(48px,6vw,96px)]">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink p-8 text-center text-white sm:p-14">
        <Image src="/images/tatev.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover opacity-40" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-ink/60" />
        <h2 className="mx-auto max-w-[16em] text-[clamp(2rem,4.4vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.03em]">{heading}</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="inline-flex min-h-[54px] items-center rounded-full bg-brand px-8 font-semibold hover:bg-brand-dark">Plan Your Journey</Link>
          <a href="https://wa.me/971544909184" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[54px] items-center rounded-full bg-white px-8 font-semibold text-ink hover:bg-sun">WhatsApp us</a>
        </div>
      </div>
    </section>
  );
}

export function PageBanner({ title, lead, image, alt, crumb }: { title: string; lead: string; image: string; alt: string; crumb: string }) {
  return (
    <section className="wrap pt-5">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink text-white">
        <Image src={image} alt={alt} fill priority sizes="100vw" className="-z-20 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/10" />
        <div className="flex min-h-[320px] flex-col justify-end p-6 sm:p-12">
          <nav aria-label="Breadcrumb" className="mb-3 text-sm text-white/80"><Link href="/" className="hover:underline">Home</Link> / <span aria-current="page">{crumb}</span></nav>
          <h1 className="max-w-[14em] text-[clamp(2.25rem,5vw,4.25rem)] font-bold leading-[1] tracking-[-0.035em]">{title}</h1>
          <p className="mt-3 max-w-[48ch] text-[1.15rem] text-white/85">{lead}</p>
        </div>
      </div>
    </section>
  );
}
