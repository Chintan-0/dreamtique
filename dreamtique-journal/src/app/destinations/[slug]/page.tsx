import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { FinalCta, PageHero } from "@/components/sections/sections";
import { Button } from "@/components/ui/Button";
import { Heading, ImageReveal, Reveal } from "@/components/ui/Reveal";
import { destinations } from "@/data/destinations";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata(props: PageProps<"/destinations/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const d = destinations.find((x) => x.slug === slug);
  return d ? { title: `${d.name} travel`, description: `${d.tagline} ${d.overview}`, openGraph: { images: [d.image] } } : {};
}

export default async function DestinationPage(props: PageProps<"/destinations/[slug]">) {
  const { slug } = await props.params;
  const d = destinations.find((x) => x.slug === slug);
  if (!d) notFound();
  return (
    <>
      <PageHero title={d.name} lead={d.tagline} image={d.image} alt={d.imageAlt} />

      <section aria-labelledby="ov-h" className="bg-ivory text-ink section-y">
        <div className="gutter grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5"><Heading id="ov-h">Overview.</Heading></div>
          <Reveal as="p" className="text-[clamp(1.35rem,2.2vw,2.1rem)] font-medium leading-[1.3] lg:col-span-7">{d.overview}</Reveal>
        </div>
      </section>

      <section aria-label="Photography" className="bg-ivory pb-[clamp(72px,10vw,160px)]">
        <div className="gutter grid gap-4 md:grid-cols-3">
          {d.gallery.map((g, i) => (
            <ImageReveal key={g.src} src={g.src} alt={g.alt} sizes="(min-width: 768px) 33vw, 100vw" className={`aspect-[4/5] ${i === 1 ? "md:mt-14" : ""}`} rounded="rounded-[2rem]" />
          ))}
        </div>
      </section>

      <section aria-label="Highlights" className="bg-midnight section-y">
        <div className="gutter grid gap-12 lg:grid-cols-2">
          <div>
            <Heading className="!text-[clamp(2rem,3.6vw,3.5rem)]">Must-see attractions.</Heading>
            <ul className="mt-8 grid gap-3">
              {d.mustSee.map((t, i) => (
                <Reveal as="li" key={t} delay={i * 0.06} className="glass flex items-center gap-4 rounded-2xl px-6 py-5 text-lg font-medium"><Check size={20} aria-hidden className="text-electric" />{t}</Reveal>
              ))}
            </ul>
          </div>
          <div>
            <Heading className="!text-[clamp(2rem,3.6vw,3.5rem)]">Recommended activities.</Heading>
            <ul className="mt-8 grid gap-3">
              {d.activities.map((t, i) => (
                <Reveal as="li" key={t} delay={i * 0.06} className="glass flex items-center gap-4 rounded-2xl px-6 py-5 text-lg font-medium"><Check size={20} aria-hidden className="text-brand-red" />{t}</Reveal>
              ))}
            </ul>
            <Reveal delay={0.2} className="mt-8"><Button href="/booking">Plan a trip to {d.name}</Button></Reveal>
          </div>
        </div>
      </section>

      <FinalCta heading={`Ready for ${d.name}?`} />
    </>
  );
}
