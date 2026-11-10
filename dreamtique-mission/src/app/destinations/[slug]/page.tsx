import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { PageTop } from "@/components/PageTop";
import { FinalPanel } from "@/components/Panels";
import { Btn, Label } from "@/components/ui";
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
      <PageTop crumb={d.region} title={d.name} lead={d.tagline} image={d.image} alt={d.imageAlt} />
      <section aria-labelledby="ov-h" className="section-y gutter mx-auto max-w-[1700px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Label>Overview</Label>
            <h2 id="ov-h" className="display mt-5 text-[clamp(2.6rem,5vw,4.6rem)]">The place.</h2>
          </div>
          <p className="text-[clamp(1.25rem,2vw,1.75rem)] leading-snug lg:col-span-8">{d.overview}</p>
        </div>
        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="display text-[clamp(2rem,3.4vw,3rem)]">Must-see</h3>
            <ul className="mt-4 border-t border-ink">
              {d.mustSee.map((t) => (
                <li key={t} className="flex items-start gap-3 border-b border-line py-4"><Check size={18} aria-hidden className="mt-1 shrink-0 text-red" />{t}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="display text-[clamp(2rem,3.4vw,3rem)]">Recommended activities</h3>
            <ul className="mt-4 border-t border-ink">
              {d.activities.map((t) => (
                <li key={t} className="flex items-start gap-3 border-b border-line py-4"><Check size={18} aria-hidden className="mt-1 shrink-0 text-red" />{t}</li>
              ))}
            </ul>
            <div className="mt-8"><Btn href="/contact#enquire">Plan a trip to {d.name}</Btn></div>
          </div>
        </div>
      </section>
      <section aria-label="Photography" className="gutter mx-auto max-w-[1700px] pb-[clamp(72px,9vw,150px)]">
        <div className="grid gap-4 md:grid-cols-3">
          {d.gallery.map((g) => (
            <div key={g.src} className="relative aspect-[4/5] overflow-hidden">
              <Image src={g.src} alt={g.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>
      <FinalPanel />
    </>
  );
}
