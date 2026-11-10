import type { Metadata } from "next";
import { ExperienceBrowser } from "@/components/ExperienceBrowser";
import { CtaBand, PageBanner } from "@/components/sections";

export const metadata: Metadata = {
  title: "Experiences",
  description: "Guided tours, landmarks, food and wine, and outdoor activities in Dubai, Georgia and Armenia. Enquire for availability and a quotation.",
};

export default function Experiences() {
  return (
    <>
      <PageBanner title="Experiences" lead="Guided tours, landmarks, food and wine, and outdoor days. Save your favourites, then enquire." image="/images/dunes.jpg" alt="A car driving over a sand dune in the Dubai desert" crumb="Experiences" />
      <div className="wrap section-y !pt-8">
        <ExperienceBrowser />
      </div>
      <CtaBand heading="Not seeing what you want? We will plan it." />
    </>
  );
}
