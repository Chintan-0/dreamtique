"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useForm } from "react-hook-form";
import { Check, ChevronLeft, ChevronRight, Send } from "lucide-react";
import { company } from "@/data/company";
import { bookingSchema, bookingStepSchemas, destinationChoices, serviceTypes, type BookingValues } from "@/lib/validation";
import { ease } from "@/animations/transitions";
import { Button } from "@/components/ui/Button";
import { whatsappLink } from "@/lib/utils";

const labels = ["Where", "When and what", "Your details", "Review"];

const input = "min-h-[56px] w-full rounded-2xl border border-white/15 bg-white/5 px-5 text-white placeholder:text-white/45 focus:border-electric focus:bg-white/10 focus:outline-none";

type Draft = Partial<BookingValues>;

/** Multi-step enquiry journey: destination, dates and service, traveller details, review, confirmation. */
export function BookingWizard() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [v, setV] = useState<Draft>({ destination: "Dubai", service: "Full package", travellers: 2 });
  const { register, getValues, watch } = useForm<Draft>({ defaultValues: v });
  watch();

  const collect = () => ({ ...v, ...getValues() }) as Draft;

  const next = () => {
    const data = collect();
    if (step < 3) {
      const res = bookingStepSchemas[step].safeParse(data);
      if (!res.success) {
        const e: Record<string, string> = {};
        res.error.issues.forEach((i) => (e[String(i.path[0])] = i.message));
        setErrors(e);
        return;
      }
    }
    setErrors({});
    setV(data);
    setDir(1);
    setStep((s) => Math.min(3, s + 1));
  };
  const back = () => {
    setV(collect());
    setDir(-1);
    setStep((s) => Math.max(0, s - 1));
  };

  const submit = () => {
    const parsed = bookingSchema.safeParse({ ...collect(), travellers: Number(collect().travellers) });
    if (!parsed.success) return;
    const b = parsed.data;
    const place = b.destination === "Another destination" ? b.otherDestination || "Another destination" : b.destination;
    const body = [
      `Destination: ${place}`,
      `Service: ${b.service}`,
      `Travel dates: ${b.startDate}${b.endDate ? ` to ${b.endDate}` : ""}${b.time ? ` at ${b.time}` : ""}`,
      `Travellers: ${b.travellers}`,
      "",
      `Name: ${b.name}`,
      `Email: ${b.email}`,
      `Phone: ${b.phone}`,
      "",
      b.notes || "",
    ].join("\n");
    window.location.assign(`mailto:${company.email}?subject=${encodeURIComponent(`Journey enquiry: ${b.service} in ${place}`)}&body=${encodeURIComponent(body)}`);
    setV(b);
    setDone(true);
  };

  const err = (k: string) => (errors[k] ? <p role="alert" className="mt-2 text-sm font-medium text-[#ff8a90]">{errors[k]}</p> : null);

  if (done) {
    const place = v.destination === "Another destination" ? v.otherDestination || "your destination" : v.destination;
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease }} className="glass mx-auto max-w-[720px] rounded-[2rem] p-10 text-center shadow-glow">
        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5, delay: 0.2 }} className="mx-auto grid size-20 place-items-center rounded-full bg-electric text-midnight shadow-glow">
          <Check size={40} aria-hidden />
        </motion.span>
        <h2 className="mt-8 text-4xl font-bold tracking-[-0.03em]">Your enquiry is ready to send.</h2>
        <p className="mx-auto mt-4 max-w-[46ch] text-white/75">
          Your email app should now open with your journey to {place} written out. Send it and the Dreamtique team will follow up with availability and a quotation. If it did not open, write to {company.email} or message us on WhatsApp.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={whatsappLink(company.whatsapp, `Hello Dreamtique, I would like to plan a journey to ${place}.`)} external tone="electric" arrow={false}>WhatsApp us</Button>
          <Button href="/" tone="glass">Back to home</Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="glass mx-auto max-w-[860px] rounded-[2rem] p-6 shadow-glow md:p-10">
      <ol className="mb-10 grid grid-cols-4 gap-2" aria-label="Progress">
        {labels.map((l, i) => (
          <li key={l} aria-current={i === step ? "step" : undefined} className="min-w-0">
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full rounded-full bg-brand-red" initial={false} animate={{ width: i <= step ? "100%" : "0%" }} transition={{ duration: 0.5, ease }} />
            </div>
            <p className={`mt-2 truncate text-sm font-medium ${i === step ? "text-white" : "text-white/45"}`}>{l}</p>
          </li>
        ))}
      </ol>

      <AnimatePresence mode="wait" custom={dir}>
        <motion.div key={step} custom={dir} initial={{ opacity: 0, x: dir * 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir * -40 }} transition={{ duration: 0.4, ease }}>
          {step === 0 && (
            <fieldset>
              <legend className="text-3xl font-bold tracking-[-0.03em]">Where would you like to go?</legend>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {destinationChoices.map((d) => (
                  <label key={d} className={`flex min-h-[72px] cursor-pointer items-center justify-between rounded-2xl border px-5 text-xl font-medium transition-all ${watch("destination") === d ? "border-electric bg-electric/15 shadow-glow" : "border-white/15 hover:bg-white/5"}`}>
                    {d}
                    <input type="radio" value={d} className="sr-only" {...register("destination")} />
                    {watch("destination") === d && <Check size={20} aria-hidden />}
                  </label>
                ))}
              </div>
              {watch("destination") === "Another destination" && (
                <div className="mt-4">
                  <label htmlFor="b-other" className="sr-only">Which destination?</label>
                  <input id="b-other" className={input} placeholder="Which destination?" {...register("otherDestination")} />
                </div>
              )}
            </fieldset>
          )}

          {step === 1 && (
            <fieldset>
              <legend className="text-3xl font-bold tracking-[-0.03em]">When, and what do you need?</legend>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="b-start" className="mb-1.5 block text-sm text-white/70">Travel date</label>
                  <input id="b-start" type="date" className={input} {...register("startDate")} />
                  {err("startDate")}
                </div>
                <div>
                  <label htmlFor="b-end" className="mb-1.5 block text-sm text-white/70">Return date (optional)</label>
                  <input id="b-end" type="date" className={input} {...register("endDate")} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="b-time" className="mb-1.5 block text-sm text-white/70">Preferred time, for transfers and tours (optional)</label>
                  <input id="b-time" type="time" className={input} {...register("time")} />
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {serviceTypes.map((s) => (
                  <label key={s} className={`flex min-h-[60px] cursor-pointer items-center justify-center rounded-2xl border px-4 text-center font-medium transition-all ${watch("service") === s ? "border-electric bg-electric/15 shadow-glow" : "border-white/15 hover:bg-white/5"}`}>
                    {s}
                    <input type="radio" value={s} className="sr-only" {...register("service")} />
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {step === 2 && (
            <fieldset>
              <legend className="text-3xl font-bold tracking-[-0.03em]">Tell us about you.</legend>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="b-name" className="sr-only">Full name</label>
                  <input id="b-name" className={input} placeholder="Full name" autoComplete="name" {...register("name")} />
                  {err("name")}
                </div>
                <div>
                  <label htmlFor="b-email" className="sr-only">Email</label>
                  <input id="b-email" type="email" className={input} placeholder="Email" autoComplete="email" {...register("email")} />
                  {err("email")}
                </div>
                <div>
                  <label htmlFor="b-phone" className="sr-only">Phone</label>
                  <input id="b-phone" type="tel" className={input} placeholder="Phone (with country code)" autoComplete="tel" {...register("phone")} />
                  {err("phone")}
                </div>
                <div>
                  <label htmlFor="b-trav" className="mb-1.5 block text-sm text-white/70">Number of travellers</label>
                  <input id="b-trav" type="number" min={1} max={50} className={input} {...register("travellers")} />
                  {err("travellers")}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="b-notes" className="sr-only">Anything else we should know</label>
                  <textarea id="b-notes" className={`${input} min-h-[120px] py-4`} placeholder="Anything else we should know (interests, hotel preferences, special requests)" {...register("notes")} />
                </div>
              </div>
            </fieldset>
          )}

          {step === 3 && (() => {
            const d = collect();
            const rows: [string, string][] = [
              ["Destination", d.destination === "Another destination" ? d.otherDestination || "Another destination" : String(d.destination)],
              ["Service", String(d.service)],
              ["Travel date", `${d.startDate}${d.endDate ? ` to ${d.endDate}` : ""}${d.time ? ` at ${d.time}` : ""}`],
              ["Travellers", String(d.travellers)],
              ["Name", String(d.name)],
              ["Email", String(d.email)],
              ["Phone", String(d.phone)],
            ];
            return (
              <div>
                <h2 className="text-3xl font-bold tracking-[-0.03em]">Review your journey.</h2>
                <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl bg-white/10">
                  {rows.map(([k, val]) => (
                    <div key={k} className="grid grid-cols-[9rem_1fr] gap-4 bg-midnight/60 px-5 py-3.5">
                      <dt className="text-white/60">{k}</dt>
                      <dd className="font-medium">{val}</dd>
                    </div>
                  ))}
                </dl>
                {d.notes && <p className="mt-4 text-white/75">{d.notes}</p>}
                <p className="mt-5 text-sm text-white/60">This sends an enquiry, not a booking. The team replies with availability and a quotation.</p>
              </div>
            );
          })()}
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 flex items-center justify-between gap-4">
        <button type="button" onClick={back} disabled={step === 0} className="glass inline-flex min-h-[54px] items-center gap-2 rounded-full px-6 font-medium disabled:opacity-30">
          <ChevronLeft size={18} aria-hidden /> Back
        </button>
        {step < 3 ? (
          <button type="button" onClick={next} className="inline-flex min-h-[54px] items-center gap-2 rounded-full bg-brand-red px-8 font-medium shadow-glow-red transition-transform hover:-translate-y-0.5">
            Continue <ChevronRight size={18} aria-hidden />
          </button>
        ) : (
          <button type="button" onClick={submit} className="inline-flex min-h-[54px] items-center gap-2 rounded-full bg-brand-red px-8 font-medium shadow-glow-red transition-transform hover:-translate-y-0.5">
            <Send size={18} aria-hidden /> Send enquiry
          </button>
        )}
      </div>
    </div>
  );
}
