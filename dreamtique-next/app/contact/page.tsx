import type { Metadata } from "next";
import { Cta, EnquirySection, FaqSection, PageHead, Strip } from "@/components/sections";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Dreamtique Tourism to plan a journey: hotels, packages, visas, chauffeur services and more.",
};

export default function Contact() {
  return (
    <>
      <PageHead title="Get in touch" lead="Tell us where you want to go. We will take care of the rest." image="dhow" />
      <EnquirySection />
      <FaqSection />
      <Strip keys={["dubai", "georgia", "armenia"]} />
      <Cta heading="Ready when you are" />
    </>
  );
}
