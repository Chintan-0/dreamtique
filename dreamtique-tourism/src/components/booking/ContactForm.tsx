"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { motion } from "motion/react";
import { company } from "@/data/company";
import { contactSchema, type ContactValues } from "@/lib/validation";

const field = "min-h-[56px] w-full rounded-2xl border border-white/15 bg-white/5 px-5 text-white placeholder:text-white/45 focus:border-electric focus:bg-white/10 focus:outline-none";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = (v: ContactValues) => {
    const body = [`Name: ${v.name}`, `Phone: ${v.phone || "-"}`, "", v.message, "", `From: ${v.email}`].join("\n");
    window.location.assign(`mailto:${company.email}?subject=${encodeURIComponent("Message from the website")}&body=${encodeURIComponent(body)}`);
    setSent(true);
  };
  const err = (m?: string) => (m ? <p role="alert" className="mt-2 text-sm font-medium text-[#ff8a90]">{m}</p> : null);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="glass grid gap-3 rounded-[2rem] p-7 md:p-10" aria-labelledby="contact-form-h">
      <h2 id="contact-form-h" className="mb-3 text-3xl font-bold tracking-[-0.03em]">Send us a message</h2>
      <div>
        <label htmlFor="c-name" className="sr-only">Full name</label>
        <input id="c-name" className={field} placeholder="Full name" autoComplete="name" aria-invalid={!!errors.name} {...register("name")} />
        {err(errors.name?.message)}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="c-email" className="sr-only">Email</label>
          <input id="c-email" type="email" className={field} placeholder="Email" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} />
          {err(errors.email?.message)}
        </div>
        <div>
          <label htmlFor="c-phone" className="sr-only">Phone</label>
          <input id="c-phone" type="tel" className={field} placeholder="Phone" autoComplete="tel" {...register("phone")} />
        </div>
      </div>
      <div>
        <label htmlFor="c-msg" className="sr-only">Message</label>
        <textarea id="c-msg" className={`${field} min-h-[150px] py-4`} placeholder="How can we help?" aria-invalid={!!errors.message} {...register("message")} />
        {err(errors.message?.message)}
      </div>
      <motion.button type="submit" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="mt-2 inline-flex min-h-[58px] items-center justify-center gap-3 rounded-full bg-brand-red font-medium shadow-glow-red">
        <Send size={18} aria-hidden /> Send message
      </motion.button>
      <p role="status" aria-live="polite" className="min-h-[1.5em] text-sm text-white/75">{sent ? "Your email app should open with your message ready to send." : ""}</p>
    </form>
  );
}
