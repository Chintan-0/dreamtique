"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import { CheckCircle2, Send } from "lucide-react";
import { site } from "@/data/site";

const services = ["Experience", "Hotel", "Package", "Itinerary planning", "Visa", "Chauffeur", "Something else"] as const;
const places = ["Dubai", "Georgia", "Armenia", "Another destination"] as const;

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  service: z.enum(services),
  destination: z.enum(places),
  date: z.string().optional(),
  guests: z.coerce.number().int().min(1, "At least 1").max(50, "Please call us for larger groups"),
  message: z.string().max(1500, "Please keep it under 1500 characters").optional(),
});
type In = z.input<typeof schema>;
type Out = z.output<typeof schema>;

const field = "min-h-[54px] w-full rounded-xl border border-line bg-white px-4 text-ink placeholder:text-ink-soft/70 focus:border-sea focus:outline-none";

function Inner() {
  const params = useSearchParams();
  const [sent, setSent] = useState(false);
  const pick = <T extends readonly string[]>(list: T, v: string | null, fallback: T[number]) => (list.find((x) => x === v) ?? fallback) as T[number];
  const note = params.get("note");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<In, unknown, Out>({
    resolver: zodResolver(schema),
    defaultValues: {
      service: pick(services, params.get("service"), "Experience"),
      destination: pick(places, params.get("destination"), "Dubai"),
      date: params.get("date") ?? "",
      guests: Number(params.get("guests")) || 2,
      message: note ? `I would like to know more about: ${note}.` : "",
    },
  });

  const onSubmit = (v: Out) => {
    const body = [`Name: ${v.name}`, `Phone: ${v.phone || "-"}`, `Service: ${v.service}`, `Destination: ${v.destination}`, `Date: ${v.date || "-"}`, `Travellers: ${v.guests}`, "", v.message || "", "", `From: ${v.email}`].join("\n");
    window.location.assign(`mailto:${site.email}?subject=${encodeURIComponent(`Enquiry: ${v.service} in ${v.destination}`)}&body=${encodeURIComponent(body)}`);
    setSent(true);
  };
  const err = (m?: string) => (m ? <p role="alert" className="mt-1.5 text-sm font-medium text-brand">{m}</p> : null);

  if (sent) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="rounded-3xl bg-white p-10 text-center shadow-lift">
        <CheckCircle2 className="mx-auto text-leaf" size={56} aria-hidden />
        <h2 className="mt-5 text-3xl font-bold tracking-[-0.02em]">Your enquiry is ready to send.</h2>
        <p className="mx-auto mt-3 max-w-[46ch] text-ink-soft">Your email app should open with the details written out. Send it and the Dreamtique team follows up with availability and a quotation. If it did not open, write to {site.email} or message us on WhatsApp.</p>
        <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-[52px] items-center rounded-full bg-leaf px-7 font-semibold text-white hover:opacity-90">WhatsApp us</a>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4 rounded-3xl bg-white p-6 shadow-lift sm:grid-cols-2 sm:p-8" aria-labelledby="enquire-h">
      <h2 id="enquire-h" className="text-2xl font-bold tracking-[-0.02em] sm:col-span-2">Tell us about your trip</h2>
      <div className="sm:col-span-2">
        <label htmlFor="e-name" className="mb-1 block text-sm font-medium text-ink-soft">Full name</label>
        <input id="e-name" className={field} autoComplete="name" aria-invalid={!!errors.name} {...register("name")} />
        {err(errors.name?.message)}
      </div>
      <div>
        <label htmlFor="e-email" className="mb-1 block text-sm font-medium text-ink-soft">Email</label>
        <input id="e-email" type="email" className={field} autoComplete="email" aria-invalid={!!errors.email} {...register("email")} />
        {err(errors.email?.message)}
      </div>
      <div>
        <label htmlFor="e-phone" className="mb-1 block text-sm font-medium text-ink-soft">Phone (optional)</label>
        <input id="e-phone" type="tel" className={field} autoComplete="tel" {...register("phone")} />
      </div>
      <div>
        <label htmlFor="e-service" className="mb-1 block text-sm font-medium text-ink-soft">What do you need?</label>
        <select id="e-service" className={field} {...register("service")}>{services.map((s) => <option key={s}>{s}</option>)}</select>
      </div>
      <div>
        <label htmlFor="e-dest" className="mb-1 block text-sm font-medium text-ink-soft">Destination</label>
        <select id="e-dest" className={field} {...register("destination")}>{places.map((s) => <option key={s}>{s}</option>)}</select>
      </div>
      <div>
        <label htmlFor="e-date" className="mb-1 block text-sm font-medium text-ink-soft">Travel date</label>
        <input id="e-date" type="date" className={field} {...register("date")} />
      </div>
      <div>
        <label htmlFor="e-guests" className="mb-1 block text-sm font-medium text-ink-soft">Travellers</label>
        <input id="e-guests" type="number" min={1} max={50} className={field} {...register("guests")} />
        {err(errors.guests?.message)}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="e-msg" className="mb-1 block text-sm font-medium text-ink-soft">Anything else we should know?</label>
        <textarea id="e-msg" className={`${field} min-h-[130px] py-3`} {...register("message")} />
        {err(errors.message?.message)}
      </div>
      <motion.button type="submit" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="inline-flex min-h-[58px] items-center justify-center gap-2 rounded-full bg-brand px-8 text-lg font-semibold text-white hover:bg-brand-dark sm:col-span-2">
        <Send size={18} aria-hidden /> Send enquiry
      </motion.button>
      <p className="text-sm text-ink-soft sm:col-span-2">This sends an enquiry, not a booking. We reply with availability and a quotation.</p>
    </form>
  );
}

export function EnquiryForm() {
  return (
    <Suspense fallback={<div className="h-[600px] rounded-3xl bg-sand" aria-busy />}>
      <Inner />
    </Suspense>
  );
}
