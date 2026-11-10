import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/EnquiryForm";
import { PageTop } from "@/components/PageTop";
import { Faq } from "@/components/Sections";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Contact and enquiries",
  description: "Send an enquiry to Dreamtique Tourism in Dubai, or reach us by email, phone or WhatsApp.",
};

export default function Contact() {
  return (
    <>
      <PageTop crumb="Contact" title="Plan your journey." lead="Tell us where, when and what. We reply with availability and a quotation." image="/images/armenia/republic-square.jpg" alt="Republic Square in Yerevan" />
      <section id="enquire" aria-label="Enquiry" className="section-y gutter mx-auto max-w-[1700px] scroll-mt-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <address className="grid content-start gap-6 border-t border-ink pt-6 not-italic lg:col-span-4">
            <p className="display text-[clamp(1.9rem,3vw,2.6rem)]">Dreamtique Tourism</p>
            <a href={`mailto:${company.email}`} className="flex items-start gap-4 [overflow-wrap:anywhere] hover:text-red"><Mail aria-hidden size={20} className="mt-1 shrink-0 text-red" />{company.email}</a>
            {company.phones.map((p) => (
              <a key={p} href={`tel:${p.replace(/[^+\d]/g, "")}`} className="flex items-start gap-4 hover:text-red"><Phone aria-hidden size={20} className="mt-1 shrink-0 text-red" />{p}</a>
            ))}
            <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 hover:text-red"><MessageCircle aria-hidden size={20} className="mt-1 shrink-0 text-red" />WhatsApp</a>
            <span className="flex items-start gap-4"><MapPin aria-hidden size={20} className="mt-1 shrink-0 text-red" />{company.address}</span>
          </address>
          <div className="lg:col-span-8"><EnquiryForm /></div>
        </div>
      </section>
      <Faq />
    </>
  );
}
