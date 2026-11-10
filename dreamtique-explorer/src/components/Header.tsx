"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Building2, Car, Compass, FileCheck2, Heart, Menu, MessageCircle, Package, Phone, Route, X } from "lucide-react";
import { categories, nav, site, type ServiceKey } from "@/data/site";
import { useSaved } from "@/lib/saved";

const icons: Record<ServiceKey, typeof Compass> = { hotels: Building2, packages: Package, experiences: Compass, itineraries: Route, visas: FileCheck2, chauffeur: Car };

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);
  const saved = useSaved();

  useEffect(() => {
    const on = () => setLifted(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow ${lifted ? "shadow-card" : ""}`}>
      <div className="bg-ink text-[0.9rem] text-white">
        <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2">
          <p>24/7 customer support while you travel</p>
          <div className="hidden items-center gap-5 sm:flex">
            <a href={`tel:${site.phones[0].replace(/[^+\d]/g, "")}`} className="inline-flex items-center gap-1.5 hover:text-sun"><Phone size={14} aria-hidden /> {site.phones[0]}</a>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-sun"><MessageCircle size={14} aria-hidden /> WhatsApp</a>
          </div>
        </div>
      </div>

      <div className="wrap flex min-h-[72px] items-center justify-between gap-4">
        <Link href="/" aria-label="Dreamtique Tourism, home" className="relative block h-[60px] w-[176px] shrink-0 overflow-hidden">
          <Image src="/brand/Final-Logo-1.webp" alt="Dreamtique Tourism" width={500} height={500} priority className="absolute -left-[30px] -top-[85px] h-auto w-[232px] max-w-none mix-blend-multiply" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
          {nav.map((l) => {
            const on = pathname.startsWith(l.href.split("/").slice(0, 2).join("/"));
            return (
              <Link key={l.href} href={l.href} aria-current={on ? "page" : undefined} className="relative rounded-full px-4 py-2 font-medium text-ink-soft transition-colors hover:bg-sand hover:text-ink aria-[current=page]:text-ink">
                {l.label}
                {on && <motion.span layoutId="nav-under" className="absolute inset-x-4 -bottom-0.5 h-[3px] rounded-full bg-brand" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/experiences?saved=1" aria-label={`Saved experiences, ${saved.ids.length}`} className="relative grid size-11 place-items-center rounded-full border border-line hover:bg-sand">
            <Heart size={20} aria-hidden className={saved.ids.length ? "fill-brand text-brand" : ""} />
            {saved.ids.length > 0 && <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-brand text-[0.7rem] font-bold text-white">{saved.ids.length}</span>}
          </Link>
          <Link href="/contact" className="hidden min-h-[46px] items-center rounded-full bg-brand px-6 font-semibold text-white transition-colors hover:bg-brand-dark sm:inline-flex">
            Plan Your Journey
          </Link>
          <button type="button" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((o) => !o)} className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-ink px-4 font-medium text-white xl:hidden">
            {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />} <span className="max-[400px]:sr-only">Menu</span>
          </button>
        </div>
      </div>

      {/* category pills, like a marketplace's top-level tabs */}
      <div className="border-t border-line">
        <nav aria-label="Browse by service" className="wrap no-scrollbar flex gap-2 overflow-x-auto py-3">
          {categories.map((c) => {
            const Icon = icons[c.key];
            return (
              <Link key={c.key} href={c.href} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-sand px-4 py-2 font-medium text-ink transition-all hover:-translate-y-0.5 hover:bg-sun">
                <Icon size={18} aria-hidden /> {c.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav id="mobile-nav" aria-label="Mobile" className="absolute inset-x-0 top-full overflow-hidden bg-white shadow-lift xl:hidden" initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.3 }}>
            <div className="wrap grid gap-1 py-4">
              {nav.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-xl font-semibold hover:bg-sand">{l.label}</Link>
              ))}
              <Link href="/contact" onClick={() => setOpen(false)} className="mt-2 inline-flex min-h-[52px] items-center justify-center rounded-full bg-brand font-semibold text-white">Plan Your Journey</Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
