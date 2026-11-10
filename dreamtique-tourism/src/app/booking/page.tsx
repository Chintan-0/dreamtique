import type { Metadata } from "next";
import Image from "next/image";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { Particles } from "@/components/hero/Particles";

export const metadata: Metadata = {
  title: "Plan Your Journey",
  description: "Tell Dreamtique Tourism where, when and what you need. We follow up with availability and a quotation.",
};

export default function Booking() {
  return (
    <section className="relative isolate min-h-svh overflow-hidden pb-24 pt-36">
      <Image src="/images/dubai/marina.jpg" alt="" fill priority sizes="100vw" className="-z-30 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-20 bg-midnight/80" />
      <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-to-b from-midnight/40 via-midnight/70 to-midnight" />
      <Particles className="absolute inset-0 -z-10" density={0.6} />
      <div className="gutter">
        <div className="mx-auto mb-12 max-w-[860px] text-center">
          <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-glow">Plan your journey.</h1>
          <p className="mx-auto mt-5 max-w-[44ch] text-white/75">Four short steps. We reply with availability and a quotation.</p>
        </div>
        <BookingWizard />
      </div>
    </section>
  );
}
