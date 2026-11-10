import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageTop } from "@/components/PageTop";
import { FinalPanel } from "@/components/Panels";
import { Pic } from "@/components/Pic";
import { Btn, Label } from "@/components/ui";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Hotel bookings, tourism packages, attractions and experiences, travel itinerary planning, visa services and chauffeur services.",
};

export default function Services() {
  return (
    <>
      <PageTop crumb="Services" title="Six services, one journey." lead="Everything a trip needs, planned by one team." image="/images/dubai/marina.jpg" alt="The towers of Dubai Marina rising above the water" />
      <div className="gutter mx-auto max-w-[1700px]">
        {services.map((s, i) => (
          <section key={s.slug} id={s.slug} aria-labelledby={`${s.slug}-h`} className="grid scroll-mt-32 items-center gap-8 border-b border-line py-14 lg:grid-cols-12 lg:gap-16 lg:py-24">
            <Pic slug={s.slug} sizes="(min-width: 1024px) 55vw, 100vw" className={`aspect-[4/3] w-full lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`} />
            <div className={`lg:col-span-5 ${i % 2 ? "lg:order-1" : ""}`}>
              <Label>{String(i + 1).padStart(2, "0")}</Label>
              <h2 id={`${s.slug}-h`} className="display mt-4 text-[clamp(2.6rem,5vw,4.6rem)]">{s.name}</h2>
              <p className="mt-4 text-mute">{s.detail}</p>
              <ul className="mt-6 border-t border-ink">
                {s.items.map((t) => (
                  <li key={t} className="flex items-start gap-3 border-b border-line py-3"><Check size={18} aria-hidden className="mt-1 shrink-0 text-red" />{t}</li>
                ))}
              </ul>
              <div className="mt-8"><Btn href="/contact#enquire">Enquire</Btn></div>
            </div>
          </section>
        ))}
      </div>
      <FinalPanel />
    </>
  );
}
