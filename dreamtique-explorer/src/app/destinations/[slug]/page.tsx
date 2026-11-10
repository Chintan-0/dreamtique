import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { CtaBand, PageBanner } from "@/components/sections";
import { ExperienceCard, Reveal, SectionHead } from "@/components/ui";
import { enquiryHref } from "@/lib/enquiry";
import { destinationInfo, destinationList, experiences, type Destination } from "@/data/experiences";

export function generateStaticParams() {
  return destinationList.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata(props: PageProps<"/destinations/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const d = destinationInfo[slug as Destination];
  return d ? { title: `${d.name} travel`, description: `${d.tagline} ${d.overview}`, openGraph: { images: [d.image] } } : {};
}

export default async function DestinationPage(props: PageProps<"/destinations/[slug]">) {
  const { slug } = await props.params;
  const d = destinationInfo[slug as Destination];
  if (!d) notFound();
  const list = experiences.filter((e) => e.destination === d.slug);
  return (
    <>
      <PageBanner title={d.name} lead={d.tagline} image={d.image} alt={d.alt} crumb={d.name} />

      <section className="wrap section-y" aria-labelledby="ov-h">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="ov-h" className="text-[clamp(1.75rem,3.2vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.025em]">Overview</h2>
            <p className="mt-4 max-w-[58ch] text-[1.2rem] text-ink-soft">{d.overview}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={enquiryHref({ service: "Package", destination: d.name })} className="inline-flex min-h-[52px] items-center rounded-full bg-brand px-7 font-semibold text-white hover:bg-brand-dark">Plan a trip to {d.name}</Link>
              <Link href={`/experiences?destination=${d.slug}`} className="inline-flex min-h-[52px] items-center rounded-full border border-line px-7 font-semibold hover:bg-sand">Browse experiences</Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            <Reveal><div className="rounded-3xl bg-sand p-6"><h3 className="text-xl font-bold">Must-see attractions</h3><ul className="mt-3 grid gap-2">{d.mustSee.map((t) => <li key={t} className="flex gap-2"><Check size={18} aria-hidden className="mt-1 shrink-0 text-leaf" />{t}</li>)}</ul></div></Reveal>
            <Reveal delay={0.08}><div className="rounded-3xl bg-sky p-6"><h3 className="text-xl font-bold">Recommended activities</h3><ul className="mt-3 grid gap-2">{d.activities.map((t) => <li key={t} className="flex gap-2"><Check size={18} aria-hidden className="mt-1 shrink-0 text-sea" />{t}</li>)}</ul></div></Reveal>
          </div>
        </div>
      </section>

      <section className="bg-sand section-y" aria-labelledby="todo-h">
        <div className="wrap">
          <SectionHead title={`Things to do in ${d.name}`} />
          <h2 id="todo-h" className="sr-only">Experiences in {d.name}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((e, i) => <ExperienceCard key={e.slug} e={e} index={i} />)}
          </div>
        </div>
      </section>

      <div className="pt-[clamp(48px,6vw,96px)]"><CtaBand heading={`Ready for ${d.name}?`} /></div>
    </>
  );
}
