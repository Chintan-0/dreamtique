"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send } from "lucide-react";
import { motion } from "motion/react";
import { site } from "@/lib/content";

const serviceOptions = ["Tourism package", "Hotel booking", "Tour or attraction", "Itinerary planning", "Visa service", "Chauffeur service"] as const;
const destinationOptions = ["Dubai", "Georgia", "Armenia", "Somewhere else"] as const;

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  service: z.enum(serviceOptions),
  destination: z.enum(destinationOptions),
  date: z.string().optional(),
  message: z.string().max(1500, "Please keep the message under 1500 characters").optional(),
});
type Values = z.infer<typeof schema>;

const field =
  "min-h-[52px] w-full rounded-none border-0 bg-[#ea5560] px-4 py-3 text-base text-white placeholder:text-white focus-visible:outline-white";

export function EnquiryForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { service: "Tourism package", destination: "Dubai" } });

  // No server yet: the enquiry opens in the visitor's email app, addressed to the company.
  const onSubmit = (v: Values) => {
    const body = [
      `Name: ${v.name}`,
      `Phone: ${v.phone || "-"}`,
      `Service: ${v.service}`,
      `Destination: ${v.destination}`,
      `Travel date: ${v.date || "-"}`,
      "",
      v.message || "",
      "",
      `From: ${v.email}`,
    ].join("\n");
    window.location.assign(`mailto:${site.email}?subject=${encodeURIComponent(`Enquiry: ${v.service} in ${v.destination}`)}&body=${encodeURIComponent(body)}`);
    setSent(true);
  };

  const err = (m?: string) => (m ? <p className="mt-1 text-sm font-medium text-white">{m}</p> : null);

  return (
    <motion.div
      className="relative mx-auto grid max-w-[1200px] overflow-hidden bg-accent text-white md:grid-cols-[0.9fr_1.1fr]"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {/* the coupon's cut-outs */}
      <span aria-hidden className="absolute -left-7 top-[38%] hidden size-14 rounded-full bg-bg max-md:block md:hidden" />
      <span aria-hidden className="absolute -right-7 top-[38%] hidden size-14 rounded-full bg-bg max-md:block md:hidden" />
      <span aria-hidden className="absolute -top-7 left-[46%] hidden size-14 -translate-x-1/2 rounded-full bg-bg md:block" />
      <span aria-hidden className="absolute -bottom-7 left-[46%] hidden size-14 -translate-x-1/2 rounded-full bg-bg md:block" />

      <div className="flex flex-col justify-between gap-10 border-b-[5px] border-dotted border-bg p-[clamp(28px,3.5vw,56px)] md:border-b-0 md:border-r-[5px]">
        <h2 id="enquire-h" className="display max-w-[7em] text-[clamp(1.625rem,2.5vw,2.5rem)]">
          Plan your journey
        </h2>
        <p className="max-w-[30ch]">Tell us where, when and what. We reply with a plan.</p>
        <div className="grid gap-1 font-medium">
          <a href={`mailto:${site.email}`} className="hover:underline">{site.email}</a>
          {site.phones.map((p) => (
            <a key={p} href={`tel:${p.replace(/[^+\d]/g, "")}`} className="hover:underline">{p}</a>
          ))}
          <span>{site.address}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid content-center gap-2.5 p-[clamp(28px,3.5vw,56px)]" aria-labelledby="enquire-h">
        <div>
          <label htmlFor="f-name" className="sr-only">Full name</label>
          <input id="f-name" className={field} placeholder="Full name" autoComplete="name" aria-invalid={!!errors.name} {...register("name")} />
          {err(errors.name?.message)}
        </div>
        <div className="grid gap-2.5 sm:grid-cols-2">
          <div>
            <label htmlFor="f-email" className="sr-only">Email</label>
            <input id="f-email" type="email" className={field} placeholder="Email" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} />
            {err(errors.email?.message)}
          </div>
          <div>
            <label htmlFor="f-phone" className="sr-only">Phone</label>
            <input id="f-phone" type="tel" className={field} placeholder="Phone" autoComplete="tel" {...register("phone")} />
          </div>
        </div>
        <div className="grid gap-2.5 sm:grid-cols-2">
          <div>
            <label htmlFor="f-service" className="sr-only">Service</label>
            <select id="f-service" className={field} {...register("service")}>
              {serviceOptions.map((o) => <option key={o} className="text-black">{o}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="f-dest" className="sr-only">Destination</label>
            <select id="f-dest" className={field} {...register("destination")}>
              {destinationOptions.map((o) => <option key={o} className="text-black">{o}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="f-date" className="sr-only">Travel date</label>
          <input id="f-date" type="date" className={field} {...register("date")} />
        </div>
        <div>
          <label htmlFor="f-msg" className="sr-only">Message</label>
          <textarea id="f-msg" className={`${field} min-h-[104px] resize-y`} placeholder="Your message" {...register("message")} />
          {err(errors.message?.message)}
        </div>
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.99 }}
          className="inline-flex min-h-[56px] items-center justify-center gap-3 bg-navy text-[1.0625rem] font-medium text-white hover:bg-[#1b3358]"
        >
          <Send size={18} aria-hidden /> Send enquiry
        </motion.button>
        <p role="status" aria-live="polite" className="min-h-[1.4em] text-sm">
          {sent ? "Your email app should open with your enquiry ready to send." : ""}
        </p>
      </form>
    </motion.div>
  );
}
