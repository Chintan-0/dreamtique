import type { Metadata } from "next";
import { Cta, PageHead, ServiceTiles, Steps, Strip } from "@/components/sections";

export const metadata: Metadata = {
  title: "Services",
  description: "Hotel bookings, tourism packages, attractions, itinerary planning, visa services and chauffeur services from Dreamtique Tourism.",
};

export default function Services() {
  return (
    <>
      <PageHead title="Services for every step of the trip" lead="Hotels, packages, experiences, itineraries, visas and chauffeurs, planned together." image="dhow" />
      <ServiceTiles />
      <Steps />
      <Strip keys={["dubai", "tbilisi", "armenia"]} />
      <Cta heading="One team for the whole journey" />
    </>
  );
}
