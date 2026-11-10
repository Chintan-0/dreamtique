import type { Metadata } from "next";
import { CityTiles, CtaBand, DestinationRails, PageBanner } from "@/components/sections";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Dubai, Georgia and Armenia, with more destinations on request.",
};

export default function Destinations() {
  return (
    <>
      <PageBanner title="Destinations" lead="Dubai, Georgia and Armenia, with more on request." image="/images/peace-bridge.jpg" alt="The Peace Bridge over the Kura river in Tbilisi" crumb="Destinations" />
      <CityTiles />
      <DestinationRails />
      <CtaBand heading="Somewhere else in mind? Tell us." />
    </>
  );
}
