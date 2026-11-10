import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Cta, PackageFields, PageHead, Steps, Strip } from "@/components/sections";

export const metadata: Metadata = {
  title: "Packages",
  description: "Pre-designed luxury, cultural and adventure packages, or a customized package created around you.",
};

const rows = [
  ["Stay", "Luxury hotels and resorts, budget-friendly options", "bg-blue text-white"],
  ["Experiences", "Guided tours, museums and landmarks, food and wine, outdoor activities", "bg-navy text-navy-ink"],
  ["Paperwork", "Visa application assistance and document processing", "bg-surface text-ink"],
  ["Transport", "Airport transfers, hourly chauffeurs, city-to-city transfers", "bg-accent text-white"],
] as const;

export default function Packages() {
  return (
    <>
      <PageHead title="Packages" lead="Choose a ready-made journey or create your own." image="armenia" />
      <PackageFields />
      <section aria-labelledby="inc-h" className="grid gap-2.5 pt-[clamp(56px,6.5vw,100px)]">
        <Reveal as="h2" className="display gutter pb-6 text-[clamp(2.25rem,8vw,4rem)] lg:text-[length:var(--text-head)]"><span id="inc-h">Inside a package</span></Reveal>
        {rows.map(([n, l, c]) => (
          <Reveal key={n} className={`${c} grid items-center gap-4 px-[clamp(16px,2.2vw,32px)] py-[clamp(24px,3vw,44px)] lg:grid-cols-12 lg:gap-x-2.5`}>
            <h3 className="display text-[clamp(1.875rem,3.2vw,3.25rem)] lg:col-span-5">{n}</h3>
            <p className="max-w-[30ch] text-[length:var(--text-lead)] leading-snug lg:col-span-6 lg:col-start-7">{l}</p>
          </Reveal>
        ))}
      </section>
      <Steps />
      <Strip keys={["dubai", "dhow", "tbilisi"]} />
      <Cta heading="Tell us what you have in mind" />
    </>
  );
}
