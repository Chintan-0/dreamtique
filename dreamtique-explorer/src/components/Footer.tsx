import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { nav, site } from "@/data/site";
import { Year } from "./Year";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="wrap grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-3xl font-bold tracking-[-0.02em]">DREAM<span className="text-brand">TIQUE</span> <span className="text-base font-medium tracking-[0.3em] text-white/60">TOURISM</span></p>
          <p className="mt-4 max-w-[38ch] text-white/70">Explore the world with us and experience the art of travel, redefined.</p>
          <Link href="/contact" className="mt-7 inline-flex min-h-[52px] items-center rounded-full bg-brand px-7 font-semibold hover:bg-brand-dark">Plan Your Journey</Link>
        </div>
        <nav aria-label="Pages" className="grid content-start gap-2.5 lg:col-span-3">
          <b className="font-semibold text-sun">Explore</b>
          {nav.map((l) => <Link key={l.href} href={l.href} className="text-white/75 hover:text-white">{l.label}</Link>)}
        </nav>
        <address className="grid content-start gap-3 not-italic lg:col-span-4">
          <b className="font-semibold text-sun">Contact</b>
          <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 text-white/75 hover:text-white"><Mail size={16} aria-hidden /> {site.email}</a>
          {site.phones.map((p) => <a key={p} href={`tel:${p.replace(/[^+\d]/g, "")}`} className="inline-flex items-center gap-2 text-white/75 hover:text-white"><Phone size={16} aria-hidden /> {p}</a>)}
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/75 hover:text-white"><MessageCircle size={16} aria-hidden /> WhatsApp</a>
          <span className="inline-flex items-start gap-2 text-white/75"><MapPin size={16} aria-hidden className="mt-1 shrink-0" /> {site.address}</span>
        </address>
      </div>
      <div className="wrap border-t border-white/10 py-8">
        <p className="mt-5 text-[0.9375rem] text-white/60">Copyright <Year /> Dreamtique Tourism. All rights reserved.</p>
      </div>
    </footer>
  );
}
