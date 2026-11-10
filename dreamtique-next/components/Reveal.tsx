"use client";

import type { ElementType, ReactNode } from "react";
import { motion } from "motion/react";

const tags = { div: motion.div, p: motion.p, h1: motion.h1, h2: motion.h2, h3: motion.h3, li: motion.li, article: motion.article, figure: motion.figure, section: motion.section } as const;

/** Entrance for the parts of a section: rises 24px and fades in once, staggered by `delay`. */
export function Reveal({
  as = "div",
  delay = 0,
  className,
  children,
}: {
  as?: keyof typeof tags;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const Tag = tags[as] as ElementType;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </Tag>
  );
}
