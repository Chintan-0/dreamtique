import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { Cta, PageHead, Strip } from "@/components/sections";
import { ButtonLink, PinList, toneClass } from "@/components/ui";
import { services } from "@/lib/content";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const s = services.find((x) => x.slug === slug);
  return s ? { title: s.name, description: `${s.summary} ${s.items.join(", ")}.` } : {};
}

const heroImage = ["dubai", "dhow", "tbilisi", "georgia", "armenia", "dubai"] as const;

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const i = services.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const s = services[i];
  return (
    <>
      <PageHead title={s.name} lead={s.summary} image={heroImage[i]} />
      <section className="grid gap-8 px-[clamp(16px,2.2vw,32px)] py-[clamp(56px,6.5vw,100px)] lg:grid-cols-12 lg:gap-x-2.5">
        <Reveal as="h2" className="display text-[clamp(2.25rem,8vw,4rem)] lg:col-span-4 lg:max-w-[7em] lg:text-[length:var(--text-head)]">What it includes</Reveal>
        <Reveal className={`p-[clamp(24px,3vw,48px)] text-xl lg:col-span-7 lg:col-start-6 ${toneClass[s.tone]}`}>
          <PinList items={s.items} className="gap-3" />
          <div className="mt-8"><ButtonLink href="/contact" tone="light">Ask about {s.name.toLowerCase()}</ButtonLink></div>
        </Reveal>
      </section>
      <Strip keys={["dubai", "georgia", "armenia"]} />
      <Cta heading="Tell us what you have in mind" />
    </>
  );
}
