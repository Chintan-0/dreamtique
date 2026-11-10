import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { Cta, PageHead, Strip } from "@/components/sections";
import { ButtonLink, PinList } from "@/components/ui";
import { destinations } from "@/lib/content";

const heroKey = { dubai: "dubai", georgia: "georgia", armenia: "armenia" } as const;

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata(props: PageProps<"/destinations/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const d = destinations.find((x) => x.slug === slug);
  return d ? { title: `${d.name} travel guide`, description: `${d.tagline} ${d.blurb}`, openGraph: { images: [d.image] } } : {};
}

export default async function DestinationPage(props: PageProps<"/destinations/[slug]">) {
  const { slug } = await props.params;
  const d = destinations.find((x) => x.slug === slug);
  if (!d) notFound();
  return (
    <>
      <PageHead title={d.name} lead={d.tagline} image={heroKey[d.slug as keyof typeof heroKey]} />
      <section className="grid gap-8 px-[clamp(16px,2.2vw,32px)] py-[clamp(56px,6.5vw,100px)] lg:grid-cols-12 lg:gap-x-2.5">
        <div className="lg:col-span-5">
          <Reveal as="h2" className="display max-w-[7em] text-[length:var(--text-head)]">Overview</Reveal>
          <Reveal as="p" delay={0.08} className="mt-6 max-w-[36ch] text-[length:var(--text-lead)] leading-snug">{d.blurb}</Reveal>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
          <Reveal><h3 className="mb-3 text-xl font-medium">Must-see attractions</h3><PinList items={d.mustSee} /></Reveal>
          <Reveal delay={0.08}><h3 className="mb-3 text-xl font-medium">Recommended activities</h3><PinList items={d.activities} /></Reveal>
          <Reveal className="sm:col-span-2"><ButtonLink href="/contact">Plan a trip to {d.name}</ButtonLink></Reveal>
        </div>
      </section>
      <Strip keys={["dubai", "tbilisi", "armenia"]} />
      <Cta heading={`Ready for ${d.name}?`} />
    </>
  );
}
