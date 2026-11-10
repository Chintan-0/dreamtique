import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { destinations, images, services, steps, video } from "@/lib/content";
import { EnquiryForm } from "./EnquiryForm";
import { Faq } from "./Faq";
import { Reveal } from "./Reveal";
import { Parallax, ScrollScale } from "./motion-wrappers";
import { ButtonLink, PinImage, PinList, toneClass } from "./ui";

type ImgKey = keyof typeof images;

/** Opening banner of an inner page: navy field, big title, pin with a photograph. */
export function PageHead({ title, lead, image }: { title: string; lead: string; image: ImgKey }) {
  const img = images[image];
  return (
    <section className="on-dark relative overflow-hidden bg-navy text-navy-ink lg:grid lg:min-h-[40svh] lg:items-end">
      <div className="gutter relative z-10 pb-11 pt-14 lg:max-w-[60vw]">
        <Reveal as="h1" className="display max-w-[13em] text-[length:var(--text-display)]">{title}</Reveal>
        <Reveal as="p" delay={0.1} className="mt-6 max-w-[34ch] text-[length:var(--text-lead)] leading-snug">{lead}</Reveal>
      </div>
      <Parallax distance={50} className="mx-6 mb-0 ml-auto w-[48vw] max-w-[300px] lg:absolute lg:right-[6vw] lg:top-1/2 lg:m-0 lg:h-[86%] lg:w-auto lg:max-w-none lg:-translate-y-1/2">
        <PinImage src={img.src} alt={img.alt} bg="bg-navy" priority sizes="(min-width: 1024px) 30vw, 48vw" className="h-full w-full" />
      </Parallax>
    </section>
  );
}

export function Cta({ heading }: { heading: string }) {
  return (
    <section className="on-dark grid items-center gap-8 bg-navy px-[clamp(16px,2.2vw,32px)] py-[clamp(56px,6vw,96px)] text-navy-ink lg:grid-cols-12 lg:gap-x-2.5">
      <Reveal as="h2" className="display max-w-none text-[clamp(1.875rem,8.4vw,4.5rem)] lg:col-span-8 lg:max-w-[11em] lg:text-[clamp(1.875rem,3.4vw,3.5rem)]">{heading}</Reveal>
      <Reveal className="grid justify-items-start gap-5 lg:col-span-4">
        <ButtonLink href="/contact">Plan your journey</ButtonLink>
        <Link href="/destinations" className="font-medium underline underline-offset-[5px]">See destinations</Link>
      </Reveal>
    </section>
  );
}

export function Strip({ keys }: { keys: ImgKey[] }) {
  const labels: Record<ImgKey, string> = { dubai: "Dubai", dhow: "Dubai Creek", tbilisi: "Tbilisi, Georgia", armenia: "Khor Virap, Armenia", georgia: "Kazbegi, Georgia" };
  const bgs = ["bg-accent", "bg-blue", "bg-navy"];
  return (
    <section aria-label="Where we travel" className="grid grid-cols-3 items-end gap-2.5 px-[calc(clamp(16px,2.2vw,32px)+6vw)] py-[clamp(40px,4vw,64px)]">
      {keys.map((k, i) => (
        <figure key={k} className={i === 1 ? "pb-[clamp(32px,6vw,96px)]" : ""}>
          <ScrollScale from={0.7}>
            <PinImage src={images[k].src} alt={images[k].alt} bg={bgs[i % 3]} sizes="30vw" />
          </ScrollScale>
          <figcaption className="mt-3.5 text-center text-base font-medium md:text-xl">{labels[k]}</figcaption>
        </figure>
      ))}
    </section>
  );
}

export function AboutPanel() {
  return (
    <section aria-labelledby="about-h" className="px-[clamp(16px,2.2vw,32px)] py-5">
      <div className="on-dark relative grid min-h-[70svh] overflow-hidden bg-navy p-[clamp(28px,4.5vw,64px)] pb-0 text-navy-ink lg:grid-cols-12 lg:content-start lg:gap-x-2.5">
        <Reveal as="h2" className="display max-w-[13em] text-[clamp(1.875rem,2.9vw,3.25rem)] lg:col-span-7">
          <span id="about-h">Travel made easy and personal</span>
        </Reveal>
        <div className="mx-auto mt-10 w-full max-w-[380px] self-end lg:col-span-6 lg:mx-0 lg:mt-14 lg:w-[min(28vw,380px)]">
          <ScrollScale from={0.8} className="-mb-[14%]">
            <PinImage src={images.dhow.src} alt={images.dhow.alt} bg="bg-navy" sizes="30vw" />
          </ScrollScale>
        </div>
        <div className="order-first mb-8 grid content-start gap-10 pt-3 lg:order-none lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:mb-0">
          <Reveal>
            <h3 className="mb-2 text-[1.375rem] font-medium">Welcome to Dreamtique Tourism</h3>
            <p className="max-w-[44ch]">Founded in 2024, Dreamtique Tourism is a travel company dedicated to crafting unforgettable journeys and providing exceptional chauffeur services. We empower travelers to explore the world with ease, luxury and personalized attention.</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h3 className="mb-2 text-[1.375rem] font-medium">Our story</h3>
            <p className="max-w-[44ch]">Dreamtique was born from a passion for travel and a commitment to excellence. Experienced travel professionals and chauffeur experts came together to combine fine accommodation, expert guidance and seamless transportation.</p>
          </Reveal>
          <Reveal delay={0.16}><ButtonLink href="/about">About us</ButtonLink></Reveal>
        </div>
      </div>
    </section>
  );
}

export function ServiceTiles() {
  return (
    <section aria-labelledby="svc-h" className="px-[clamp(16px,2.2vw,32px)] py-[clamp(56px,6.5vw,100px)]">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-2.5">
        <div className="lg:col-span-4">
          <Reveal as="h2" className="display max-w-[7em] text-[length:var(--text-head)]"><span id="svc-h">Everything the trip needs</span></Reveal>
          <Reveal as="p" delay={0.08} className="mt-6 max-w-[30ch]">Six services, one team, from the first idea to the ride home.</Reveal>
        </div>
        <div className="grid gap-2.5 sm:grid-cols-2 lg:col-span-8">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 0.07} className={i === 0 || i === 5 ? "sm:col-span-2" : ""}>
              <Link
                href={`/services/${s.slug}`}
                id={s.slug}
                className={`group flex h-full min-h-[240px] flex-col justify-between gap-10 p-[clamp(20px,2.2vw,32px)] transition-transform duration-300 hover:-translate-y-1 ${toneClass[s.tone]} ${i === 0 || i === 5 ? "sm:min-h-[200px]" : ""}`}
              >
                <h3 className="flex items-start justify-between gap-4 text-[clamp(1.5rem,1.9vw,2.125rem)] font-bold leading-none tracking-[-0.02em]">
                  {s.name}
                  <ArrowUpRight aria-hidden className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </h3>
                <PinList items={s.items} />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function VideoBand() {
  return (
    <section aria-labelledby="mo-h" className="grid items-center gap-8 px-[clamp(16px,2.2vw,32px)] py-[clamp(48px,5vw,80px)] lg:grid-cols-12 lg:gap-x-2.5">
      <div className="mx-auto w-[min(78vw,380px)] lg:col-span-4 lg:col-start-2 lg:mx-0 lg:w-full">
        <ScrollScale from={0.6}>
          <div className="pin-clip relative aspect-[4/5] bg-blue">
            <video className="absolute inset-0 size-full object-cover" autoPlay muted loop playsInline preload="metadata" poster={video.poster} aria-label="Street life in Tbilisi, Georgia">
              <source src={video.src} type="video/webm" />
            </video>
          </div>
        </ScrollScale>
      </div>
      <div className="grid justify-items-start gap-7 lg:col-span-6 lg:col-start-7">
        <Reveal as="h2" className="display max-w-[8em] text-[clamp(1.875rem,3.2vw,3.25rem)]"><span id="mo-h">Tbilisi, in motion</span></Reveal>
        <Reveal as="p" delay={0.08} className="max-w-[34ch] text-[length:var(--text-lead)] leading-snug">Balconied streets, busy corners and mountain light. Georgia is one of the places we plan journeys to.</Reveal>
        <Reveal delay={0.14}><ButtonLink href="/destinations/georgia">Plan a trip to Georgia</ButtonLink></Reveal>
      </div>
    </section>
  );
}

export function Steps() {
  const tile = ["h-[22vh] bg-sky lg:col-span-3 lg:col-start-2", "h-[32vh] bg-blue lg:col-span-4", "h-[44vh] bg-accent lg:col-span-4"];
  return (
    <section aria-labelledby="how-h" className="px-[clamp(16px,2.2vw,32px)] py-[clamp(56px,6.5vw,100px)]">
      <Reveal as="h2" className="display max-w-[6em] text-[length:var(--text-head)]"><span id="how-h">From idea to arrival</span></Reveal>
      <div className="mt-12 grid items-end gap-8 md:grid-cols-3 lg:grid-cols-12 lg:gap-x-2.5">
        {steps.map((s, i) => (
          <Reveal key={s.name} as="article" delay={i * 0.1} className={`grid gap-4 ${i === 0 ? "lg:col-span-3 lg:col-start-2" : "lg:col-span-4"}`}>
            <div className={`relative grid place-items-center overflow-hidden ${tile[i].split(" lg:")[0]}`}>
              <ScrollScale from={0.5} className="h-[90%] aspect-[4/5]">
                <PinImage src={images[s.image].src} alt={images[s.image].alt} bg="bg-white" sizes="25vw" className="h-full w-full" />
              </ScrollScale>
            </div>
            <h3 className="text-[1.375rem] font-medium">{s.name}</h3>
            <p className="max-w-[36ch]">{s.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function PackageFields() {
  return (
    <section aria-label="Packages" className="grid lg:min-h-[64svh] lg:grid-cols-[5fr_7fr]">
      {[
        { cls: "bg-blue text-white", h: "Ready-made packages", who: "Pre-designed journeys, ready to book.", items: ["Luxury getaways", "Cultural experiences", "Adventure travel"], btn: "Ask about a package", note: "Every package can be adjusted to your dates and group." },
        { cls: "bg-accent text-white", h: "Made for you", who: "Tell us what you want. We build the whole journey around it.", items: ["Customized itineraries", "Hotels, visas and chauffeurs in one plan", "Romantic getaways, family trips, business travel"], btn: "Create my package", note: "Create your own package: choose the destination, the pace and the extras." },
      ].map((p) => (
        <div key={p.h} className={`${p.cls} flex min-h-[70svh] flex-col justify-between gap-7 px-[clamp(16px,2.2vw,32px)] py-[clamp(32px,4vw,64px)] lg:min-h-0`}>
          <div>
            <Reveal as="h2" className="display max-w-[7em] text-[clamp(1.875rem,3.2vw,3.5rem)]">{p.h}</Reveal>
            <Reveal as="p" delay={0.08} className="mt-5 max-w-[28ch] text-xl">{p.who}</Reveal>
          </div>
          <Reveal><PinList items={p.items} className="text-xl" /></Reveal>
          <Reveal className="flex flex-wrap items-center justify-between gap-5">
            <ButtonLink href="/contact" tone="light">{p.btn}</ButtonLink>
            <p className="max-w-[34ch]">{p.note}</p>
          </Reveal>
        </div>
      ))}
    </section>
  );
}

export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-h" className="px-[clamp(16px,2.2vw,32px)] py-[clamp(56px,6.5vw,100px)]">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-2.5">
        <div className="lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
          <Reveal as="h2" className="display text-[length:var(--text-head)]"><span id="faq-h">Questions</span></Reveal>
        </div>
        <div className="lg:col-span-8"><Faq /></div>
      </div>
    </section>
  );
}

export function EnquirySection() {
  return (
    <section id="enquire" aria-labelledby="enquire-h" className="px-[clamp(16px,2.2vw,32px)] py-[clamp(56px,6vw,96px)]">
      <EnquiryForm />
    </section>
  );
}

export function DestinationGuide({ slug }: { slug: string }) {
  const d = destinations.find((x) => x.slug === slug)!;
  return (
    <article className="grid items-center gap-8 px-[clamp(16px,2.2vw,32px)] py-[clamp(28px,3vw,48px)] lg:grid-cols-12 lg:gap-x-2.5">
      <div className="mx-auto w-[min(70vw,340px)] lg:col-span-3 lg:col-start-2 lg:mx-0 lg:w-full">
        <PinImage src={d.image} alt={d.alt} sizes="25vw" />
      </div>
      <div className="grid gap-5 lg:col-span-7 lg:col-start-6">
        <h2 className="display text-[clamp(1.875rem,3vw,3rem)]">{d.name}</h2>
        <p className="max-w-[34ch] text-[length:var(--text-lead)] leading-snug">{d.tagline}</p>
        <div className="grid gap-6 sm:grid-cols-2">
          <div><h3 className="mb-2 text-xl font-medium">Must-see</h3><PinList items={d.mustSee} /></div>
          <div><h3 className="mb-2 text-xl font-medium">Recommended activities</h3><PinList items={d.activities} /></div>
        </div>
        <div className="flex flex-wrap gap-4">
          <ButtonLink href={`/destinations/${d.slug}`} tone="ink">{d.name} guide</ButtonLink>
          <ButtonLink href="/contact">Plan a trip to {d.name}</ButtonLink>
        </div>
      </div>
    </article>
  );
}
