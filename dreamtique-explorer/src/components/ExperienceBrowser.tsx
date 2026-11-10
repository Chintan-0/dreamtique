"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Heart } from "lucide-react";
import { destinationList, experiences, experienceTypes, type Destination, type ExperienceType } from "@/data/experiences";
import { useSaved } from "@/lib/saved";
import { ExperienceCard } from "./ui";

const chip = "inline-flex min-h-[44px] items-center rounded-full border px-5 font-semibold transition-colors";

function Inner() {
  const params = useSearchParams();
  const saved = useSaved();
  const initialDest = destinationList.find((d) => d.slug === params.get("destination"))?.slug ?? "all";
  const [dest, setDest] = useState<Destination | "all">(initialDest as Destination | "all");
  const [type, setType] = useState<ExperienceType | "all">("all");
  const [onlySaved, setOnlySaved] = useState(params.get("saved") === "1");

  const list = experiences.filter((e) => (dest === "all" || e.destination === dest) && (type === "all" || e.type === type) && (!onlySaved || saved.has(e.slug)));

  return (
    <>
      <div className="sticky top-[150px] z-30 -mx-4 mb-8 bg-white/95 px-4 py-4 backdrop-blur sm:top-[142px]">
        <div role="group" aria-label="Destination" className="no-scrollbar flex gap-2 overflow-x-auto">
          <button type="button" aria-pressed={dest === "all"} onClick={() => setDest("all")} className={`${chip} ${dest === "all" ? "border-ink bg-ink text-white" : "border-line bg-white hover:bg-sand"}`}>All destinations</button>
          {destinationList.map((d) => (
            <button key={d.slug} type="button" aria-pressed={dest === d.slug} onClick={() => setDest(d.slug)} className={`${chip} ${dest === d.slug ? "border-ink bg-ink text-white" : "border-line bg-white hover:bg-sand"}`}>{d.name}</button>
          ))}
        </div>
        <div role="group" aria-label="Type of experience" className="no-scrollbar mt-2 flex gap-2 overflow-x-auto">
          <button type="button" aria-pressed={type === "all"} onClick={() => setType("all")} className={`${chip} ${type === "all" ? "border-sun bg-sun" : "border-line bg-white hover:bg-sand"}`}>Any type</button>
          {experienceTypes.map((t) => (
            <button key={t} type="button" aria-pressed={type === t} onClick={() => setType(t)} className={`${chip} ${type === t ? "border-sun bg-sun" : "border-line bg-white hover:bg-sand"}`}>{t}</button>
          ))}
          <button type="button" aria-pressed={onlySaved} onClick={() => setOnlySaved((s) => !s)} className={`${chip} gap-2 ${onlySaved ? "border-brand bg-brand text-white" : "border-line bg-white hover:bg-sand"}`}><Heart size={16} aria-hidden /> Saved ({saved.ids.length})</button>
        </div>
      </div>

      <p role="status" aria-live="polite" className="mb-5 font-medium text-ink-soft">{list.length} {list.length === 1 ? "experience" : "experiences"}</p>
      {list.length ? (
        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map((e, i) => (
              <motion.div layout key={e.slug} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.3 }}>
                <ExperienceCard e={e} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="rounded-3xl bg-sand p-10 text-center">
          <p className="text-xl font-semibold">Nothing matches those filters.</p>
          <p className="mt-2 text-ink-soft">Try another destination or type, or tell us what you have in mind and we will plan it.</p>
        </div>
      )}
    </>
  );
}

export function ExperienceBrowser() {
  return (
    <Suspense fallback={<div className="h-[500px] rounded-3xl bg-sand" aria-busy />}>
      <Inner />
    </Suspense>
  );
}
