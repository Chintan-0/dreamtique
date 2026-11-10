"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { fadeUp, frameReveal, imageSettle } from "@/animations/transitions";
import { cn } from "@/lib/utils";

/** Text and blocks rise into view once. */
export function Reveal({ children, delay = 0, className, as = "div" }: { children: ReactNode; delay?: number; className?: string; as?: "div" | "p" | "h1" | "h2" | "h3" | "li" | "article" }) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={fadeUp} custom={delay} initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -10% 0px" }}>
      {children}
    </Tag>
  );
}

/** Photograph that opens like a shutter and settles from a larger scale. */
export function ImageReveal({
  src,
  alt,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className,
  priority,
  rounded = "rounded-3xl",
}: {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
  rounded?: string;
}) {
  return (
    <motion.div className={cn("relative overflow-hidden", rounded, className)} variants={frameReveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -10% 0px" }}>
      <motion.div className="absolute inset-0" variants={imageSettle}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </motion.div>
    </motion.div>
  );
}

/** Large-type heading with the display treatment used across the site. */
export function Heading({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <Reveal as="h2" className={cn("text-[clamp(2.25rem,5.2vw,5rem)] font-bold leading-[0.98] tracking-[-0.035em]", className)}>
      <span id={id}>{children}</span>
    </Reveal>
  );
}
