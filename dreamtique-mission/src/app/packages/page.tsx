import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { PageTop } from "@/components/PageTop";
import { FinalPanel } from "@/components/Panels";
import { Btn, Label } from "@/components/ui";
import { packageCollections, packageIncludes } from "@/data/packages";

export const metadata: Metadata = {
  title: "Packages",
  description: "Luxury getaways, cultural experiences and adventure travel, or a custom package built around you. Prices are shared with your quotation.",
};

export default function Packages() {
  return (
    <>
      <PageTop crumb="Packages" title="Your journey. Your way." lead="Pre-designed and customized packages, built around your dates and group. Prices are shared with your quotation." image="/images/georgia/ushguli.jpg" alt="Stone towers in the mountains of Svaneti" />
      <section aria-label="Collections" className="section-y gutter mx-auto max-w-[1700px]">
        <ul className="grid gap-12 lg:grid-cols-3 lg:gap-8">
          {packageCollections.map((c, i) => (
            <li key={c.slug}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image src={c.image} alt={c.imageAlt} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
              </div>
              <p className="label mt-5 text-mute">0{i + 1}</p>
              <h2 className="display mt-1 text-[clamp(2.4rem,3.8vw,3.4rem)]">{c.line}</h2>
              <ul className="mt-4 border-t border-line">
                {c.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 border-b border-line py-3"><Check size={18} aria-hidden className="mt-1 shrink-0 text-red" />{h}</li>
                ))}
              </ul>
              <div className="mt-6"><Btn href="/contact#enquire" tone="line">Ask about this package</Btn></div>
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="inc-h" className="section-y bg-mist">
        <div className="gutter mx-auto max-w-[1700px]">
          <Label>What can be included</Label>
          <h2 id="inc-h" className="display mt-5 text-[clamp(2.6rem,6vw,5.5rem)]">Built to your plan.</h2>
          <ul className="mt-10 grid border-l border-t border-line bg-white sm:grid-cols-2 lg:grid-cols-4">
            {packageIncludes.map((p) => (
              <li key={p.title} className="border-b border-r border-line p-7">
                <h3 className="display text-[clamp(1.8rem,2.4vw,2.3rem)]">{p.title}</h3>
                <p className="mt-2 text-mute">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FinalPanel />
    </>
  );
}
