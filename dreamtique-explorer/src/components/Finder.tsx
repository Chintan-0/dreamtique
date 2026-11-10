"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Building2, Car, Compass, FileCheck2, Package, Search } from "lucide-react";

const tabs = [
  { key: "Experience", label: "Experiences", icon: Compass, guests: "Travellers", date: "Date" },
  { key: "Hotel", label: "Hotels", icon: Building2, guests: "Guests", date: "Check-in" },
  { key: "Package", label: "Packages", icon: Package, guests: "Travellers", date: "Travel date" },
  { key: "Visa", label: "Visas", icon: FileCheck2, guests: "Applicants", date: "Travel date" },
  { key: "Chauffeur", label: "Chauffeur", icon: Car, guests: "Passengers", date: "Pick-up date" },
] as const;

const field = "min-h-[54px] w-full rounded-xl border border-line bg-white px-4 text-ink focus:border-sea focus:outline-none";

/** Hero finder: choose what you need, where and when. It opens the enquiry form with your choices filled in. */
export function Finder() {
  const router = useRouter();
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>("Experience");
  const t = tabs.find((x) => x.key === tab)!;

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const q = new URLSearchParams({ service: tab, destination: String(d.get("destination")), date: String(d.get("date") || ""), guests: String(d.get("guests") || "") });
    router.push(`/contact?${q.toString()}#enquire`);
  };

  return (
    <div className="rounded-3xl bg-white p-3 text-ink shadow-lift sm:p-4">
      <div role="tablist" aria-label="What do you need?" className="no-scrollbar flex gap-1 overflow-x-auto pb-3">
        {tabs.map((x) => (
          <button key={x.key} role="tab" aria-selected={tab === x.key} type="button" onClick={() => setTab(x.key)} className="relative inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 font-semibold text-ink-soft transition-colors hover:text-ink aria-selected:text-ink">
            {tab === x.key && <motion.span layoutId="finder-pill" className="absolute inset-0 rounded-full bg-sun" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
            <span className="relative inline-flex items-center gap-2"><x.icon size={18} aria-hidden /> {x.label}</span>
          </button>
        ))}
      </div>
      <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_0.8fr_auto]">
        <div>
          <label htmlFor="fd-dest" className="mb-1 block text-sm font-medium text-ink-soft">{tab === "Visa" ? "Travelling to" : tab === "Chauffeur" ? "City" : "Where to?"}</label>
          <select id="fd-dest" name="destination" className={field} defaultValue="Dubai">
            <option>Dubai</option><option>Georgia</option><option>Armenia</option><option>Another destination</option>
          </select>
        </div>
        <div>
          <label htmlFor="fd-date" className="mb-1 block text-sm font-medium text-ink-soft">{t.date}</label>
          <input id="fd-date" name="date" type="date" className={field} />
        </div>
        <div>
          <label htmlFor="fd-guests" className="mb-1 block text-sm font-medium text-ink-soft">{t.guests}</label>
          <input id="fd-guests" name="guests" type="number" min={1} max={50} defaultValue={2} className={field} />
        </div>
        <button type="submit" className="mt-auto inline-flex min-h-[54px] items-center justify-center gap-2 rounded-xl bg-brand px-7 font-semibold text-white transition-colors hover:bg-brand-dark sm:col-span-2 lg:col-span-1">
          <Search size={18} aria-hidden /> Enquire
        </button>
      </form>
    </div>
  );
}
