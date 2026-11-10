"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { company } from "@/data/company";

const destinations = ["Dubai", "Georgia", "Armenia", "Another destination"] as const;
const servicesList = ["Full package", "Hotel", "Tour or experience", "Visa", "Chauffeur"] as const;

const schema = z.object({
  destination: z.enum(destinations),
  service: z.enum(servicesList),
  startDate: z.string().optional(),
  travellers: z.coerce.number().int().min(1, "At least 1 traveller").max(50, "Please call us for larger groups"),
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().max(1500, "Please keep it under 1500 characters").optional(),
});
type Values = z.input<typeof schema>;

const field = "min-h-[56px] w-full border border-ink/30 bg-white px-4 focus:border-ink focus:outline-none";

export function EnquiryForm() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<Values, unknown, z.output<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { destination: "Dubai", service: "Full package", travellers: 2 },
  });

  const onSubmit = (v: z.output<typeof schema>) => {
    const body = [
      `Destination: ${v.destination}`,
      `Service: ${v.service}`,
      `Travel date: ${v.startDate || "-"}`,
      `Travellers: ${v.travellers}`,
      `Name: ${v.name}`,
      `Phone: ${v.phone || "-"}`,
      "",
      v.message || "",
      "",
      `From: ${v.email}`,
    ].join("\n");
    window.location.assign(`mailto:${company.email}?subject=${encodeURIComponent(`Enquiry: ${v.service}, ${v.destination}`)}&body=${encodeURIComponent(body)}`);
    setSent(true);
  };
  const err = (m?: string) => (m ? <p role="alert" className="mt-1.5 text-[0.9375rem] font-medium text-red-dark">{m}</p> : null);
  const lab = "label mb-2 block text-mute";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5" aria-labelledby="enq-h">
      <h2 id="enq-h" className="display text-[clamp(2.4rem,4.5vw,4rem)]">Plan your journey</h2>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="e-dest" className={lab}>Destination</label>
          <select id="e-dest" className={field} {...register("destination")}>
            {destinations.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="e-svc" className={lab}>Service</label>
          <select id="e-svc" className={field} {...register("service")}>
            {servicesList.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="e-date" className={lab}>Travel date</label>
          <input id="e-date" type="date" className={field} {...register("startDate")} />
        </div>
        <div>
          <label htmlFor="e-trav" className={lab}>Travellers</label>
          <input id="e-trav" type="number" min={1} inputMode="numeric" className={field} aria-invalid={!!errors.travellers} {...register("travellers")} />
          {err(errors.travellers?.message)}
        </div>
        <div>
          <label htmlFor="e-name" className={lab}>Full name</label>
          <input id="e-name" autoComplete="name" className={field} aria-invalid={!!errors.name} {...register("name")} />
          {err(errors.name?.message)}
        </div>
        <div>
          <label htmlFor="e-email" className={lab}>Email</label>
          <input id="e-email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} {...register("email")} />
          {err(errors.email?.message)}
        </div>
      </div>
      <div>
        <label htmlFor="e-phone" className={lab}>Phone (optional)</label>
        <input id="e-phone" type="tel" autoComplete="tel" className={field} {...register("phone")} />
      </div>
      <div>
        <label htmlFor="e-msg" className={lab}>Anything we should know</label>
        <textarea id="e-msg" className={`${field} min-h-[140px] py-3`} {...register("message")} />
        {err(errors.message?.message)}
      </div>
      <button type="submit" className="label min-h-[58px] border border-ink bg-ink px-8 text-white transition-colors hover:border-red hover:bg-red sm:justify-self-start">
        Send enquiry
      </button>
      <p role="status" aria-live="polite" className="min-h-[1.5em] text-mute">{sent ? "Your email app should open with your enquiry ready to send." : ""}</p>
    </form>
  );
}
