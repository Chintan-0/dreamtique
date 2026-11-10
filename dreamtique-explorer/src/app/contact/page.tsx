import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/EnquiryForm";
import { FaqSection, PageBanner } from "@/components/sections";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact and enquiries",
  description: "Send an enquiry to Dreamtique Tourism in Dubai, or reach us by email, phone or WhatsApp.",
};

export default function Contact() {
  return (
    <>
      <PageBanner title="Plan your journey" lead="Tell us where, when and what. We reply with availability and a quotation." image="/images/burj-al-arab.jpg" alt="The Burj Al Arab hotel on the Dubai coast" crumb="Contact" />
      <section id="enquire" className="wrap section-y scroll-mt-40" aria-label="Enquiry">
        <div className="grid gap-6 lg:grid-cols-12">
          <aside className="grid content-start gap-5 rounded-3xl bg-sand p-7 lg:col-span-4">
            <h2 className="text-2xl font-bold">Dreamtique Tourism</h2>
            <address className="grid gap-4 not-italic">
              <a href={`mailto:${site.email}`} className="flex items-start gap-3 [overflow-wrap:anywhere] hover:text-brand"><Mail aria-hidden className="mt-1 shrink-0 text-brand" />{site.email}</a>
              {site.phones.map((p) => <a key={p} href={`tel:${p.replace(/[^+\d]/g, "")}`} className="flex items-start gap-3 hover:text-brand"><Phone aria-hidden className="mt-1 shrink-0 text-brand" />{p}</a>)}
              <span className="flex items-start gap-3"><MapPin aria-hidden className="mt-1 shrink-0 text-brand" />{site.address}</span>
            </address>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-leaf px-6 font-semibold text-white hover:opacity-90"><MessageCircle size={18} aria-hidden /> WhatsApp</a>
          </aside>
          <div className="lg:col-span-8"><EnquiryForm /></div>
        </div>
      </section>
      <FaqSection />
    </>
  );
}
