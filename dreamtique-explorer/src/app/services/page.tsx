import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { CtaBand, PageBanner } from "@/components/sections";
import { Reveal } from "@/components/ui";
import { enquiryHref } from "@/lib/enquiry";
import { categories } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Hotel bookings, tourism packages, attractions and experiences, itinerary planning, visa services and chauffeur services.",
};

const details: Record<string, string> = {
  hotels: "Stays chosen to suit the journey and the budget, with global coverage.",
  packages: "Pre-designed and customized packages, built around how you like to travel.",
  experiences: "The sights, tastes and outdoor days that make a destination worth the journey.",
  itineraries: "A plan designed around you, with expert recommendations and updates as things change.",
  visas: "Support with the paperwork, so a visa never stands between you and the trip.",
  chauffeur: "Professional chauffeurs and luxury vehicles for every leg of the journey.",
};
const serviceName: Record<string, string> = { hotels: "Hotel", packages: "Package", experiences: "Experience", itineraries: "Itinerary planning", visas: "Visa", chauffeur: "Chauffeur" };

export default function Services() {
  return (
    <>
      <PageBanner title="Services" lead="Six services that work alone, and better together." image="/images/burj-al-arab.jpg" alt="The Burj Al Arab hotel on the Dubai coast" crumb="Services" />
      <div className="wrap section-y grid gap-5">
        {categories.map((c) => (
          <Reveal key={c.key} delay={0.04}>
            <section id={c.key} aria-labelledby={`${c.key}-h`} className={`scroll-mt-44 rounded-[2rem] p-7 sm:p-10 ${c.tone}`}>
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-6">
                  <h2 id={`${c.key}-h`} className="text-[clamp(1.75rem,3.4vw,3rem)] font-bold leading-[1.02] tracking-[-0.03em]">{c.label === "Hotels" ? "Hotel bookings" : c.label === "Visas" ? "Visa services" : c.label === "Itineraries" ? "Travel itinerary planning" : c.label === "Chauffeur" ? "Chauffeur services" : c.label === "Packages" ? "Tourism packages" : "Attractions and experiences"}</h2>
                  <p className="mt-3 max-w-[44ch] text-[1.15rem] opacity-90">{details[c.key]}</p>
                  <Link href={enquiryHref({ service: serviceName[c.key] })} className={`mt-6 inline-flex min-h-[52px] items-center gap-2 rounded-full px-7 font-semibold ${c.key === "chauffeur" ? "bg-white text-ink hover:bg-sun" : "bg-ink text-white hover:bg-brand"}`}>Enquire <ArrowRight size={18} aria-hidden /></Link>
                </div>
                <ul className="grid gap-3 lg:col-span-6">
                  {c.items.map((t) => <li key={t} className={`flex items-center gap-3 rounded-2xl px-5 py-3.5 text-lg font-medium ${c.key === "chauffeur" ? "bg-white/10" : "bg-white/70"}`}><Check size={20} aria-hidden className="shrink-0" />{t}</li>)}
                </ul>
              </div>
            </section>
          </Reveal>
        ))}
      </div>
      <CtaBand heading="One team for the whole journey." />
    </>
  );
}
