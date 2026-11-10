"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company } from "@/data/company";
import { destinations } from "@/data/destinations";
import { media } from "@/data/media";
import { Btn, Label, Reveal } from "./ui";

const ease = [0.16, 1, 0.3, 1] as const;

type MediaProps = { video?: string; poster?: string; image?: string; alt?: string };

/** Full-bleed footage, or a photograph with a slow camera drift so it still feels filmed. */
function Media({ video, poster, image, alt = "" }: MediaProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (reduce) v.pause();
    else v.play().catch(() => {});
  }, [reduce]);

  if (video) {
    return <video ref={ref} className="absolute inset-0 size-full object-cover" src={video} poster={poster ?? image} autoPlay muted loop playsInline preload="metadata" aria-hidden />;
  }
  return (
    <motion.div className="absolute inset-0" animate={reduce ? undefined : { scale: [1, 1.14] }} transition={{ duration: 22, ease: "linear", repeat: Infinity, repeatType: "reverse" }}>
      <Image src={image!} alt={alt} fill sizes="100vw" className="object-cover" />
    </motion.div>
  );
}

/** A launch-site screen: one full screen of picture, a small label, a huge title, two outlined buttons. */
function Screen({
  media,
  label,
  title,
  text,
  actions,
  right,
  titleSize = "text-[clamp(3.6rem,13vw,12rem)]",
  labelledBy,
}: {
  media: MediaProps;
  label: React.ReactNode;
  title: React.ReactNode;
  text?: string;
  actions: React.ReactNode;
  right?: boolean;
  titleSize?: string;
  labelledBy?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  return (
    <section ref={ref} aria-labelledby={labelledBy} className="relative isolate flex min-h-[100svh] snap-start items-end overflow-hidden bg-ink text-white">
      <motion.div style={{ y }} className="absolute -inset-y-[6%] inset-x-0 -z-20">
        <Media {...media} />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.18)_45%,rgba(0,0,0,0.3)_100%)]" />
      <div className={`gutter mx-auto flex w-full max-w-[1700px] pb-14 pt-36 lg:pb-24 ${right ? "lg:justify-end" : ""}`}>
        <div className="max-w-[46rem]">
          <Reveal>{label}</Reveal>
          <Reveal as="h2" delay={0.05} className={`display mt-4 ${titleSize}`}>
            {title}
          </Reveal>
          {text && (
            <Reveal as="p" delay={0.1} className="mt-5 max-w-[34ch] text-[clamp(1.125rem,1.8vw,1.4rem)] text-white/90">
              {text}
            </Reveal>
          )}
          <Reveal delay={0.15} className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
            {actions}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Opening screen: footage, the promise, two actions. */
export function Hero() {
  return (
    <section aria-labelledby="hero-h" className="relative isolate flex min-h-[100svh] snap-start items-end overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 -z-20">
        <Media {...media.hero} />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0.35)_100%)]" />
      <div className="gutter relative mx-auto w-full max-w-[1700px] pb-14 pt-40 lg:pb-24">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.9 }}>
          <Label light>Dreamtique Tourism</Label>
        </motion.div>
        <h1 id="hero-h" className="display mt-5 max-w-[8.6em] text-[clamp(3.4rem,8.4vw,8.5rem)]">
          {["Unforgettable journeys,", "crafted with passion."].map((l, i) => (
            <span key={l} className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.35 + i * 0.15, duration: 1, ease }}>
                {l}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.9, ease }} className="mt-6 max-w-[34ch] text-[clamp(1.125rem,1.8vw,1.4rem)] text-white/90">
          Discover extraordinary destinations, personalized journeys and experiences beyond expectations.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.9, ease }} className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
          <Btn href="/contact#enquire" tone="white">
            Plan your journey
          </Btn>
          <Btn href="/destinations" tone="ghost">
            Explore destinations
          </Btn>
        </motion.div>
      </div>
    </section>
  );
}

const placeMedia: Record<string, MediaProps> = { dubai: media.dubai, georgia: media.georgia, armenia: media.armenia };

export function DestinationPanels({ compact }: { compact?: boolean }) {
  return (
    <div>
      {destinations.map((d, i) => (
        <Screen
          key={d.slug}
          media={placeMedia[d.slug]}
          right={i % 2 === 1}
          labelledBy={`${d.slug}-h`}
          label={
            <Label light>
              {String(i + 1).padStart(2, "0")} / {d.region}
            </Label>
          }
          title={<span id={`${d.slug}-h`}>{d.name}</span>}
          text={d.tagline}
          actions={
            <>
              <Btn href={`/destinations/${d.slug}`} tone="white">
                Explore {d.name}
              </Btn>
              <Btn href="/contact#enquire" tone="ghost">
                Enquire
              </Btn>
            </>
          }
          titleSize={compact ? "text-[clamp(3.6rem,11vw,10rem)]" : undefined}
        />
      ))}
    </div>
  );
}

/** A full screen of footage that restates the brand's invitation. */
export function ExplorePanel() {
  return (
    <Screen
      media={media.explore}
      labelledBy="ex-h"
      label={<Label light>Explore beyond</Label>}
      title={<span id="ex-h">Explore the world with us.</span>}
      text="Experience the art of travel, redefined."
      titleSize="text-[clamp(3.4rem,10vw,9.5rem)]"
      actions={
        <>
          <Btn href="/services" tone="white">
            Our services
          </Btn>
          <Btn href="/about" tone="ghost">
            About us
          </Btn>
        </>
      }
    />
  );
}

/** The custom-package invitation, over footage. */
export function CustomPanel() {
  return (
    <Screen
      media={media.custom}
      labelledBy="cu-h"
      right
      label={<Label light>Custom package</Label>}
      title={<span id="cu-h">Your journey. Your way.</span>}
      text="Choose the destination, the pace and the extras. We shape the rest around you."
      titleSize="text-[clamp(3.4rem,10vw,9.5rem)]"
      actions={
        <Btn href="/contact#enquire" tone="white">
          Create your journey
        </Btn>
      }
    />
  );
}

/** Closing screen, then the ways to reach us on white. */
export function FinalPanel() {
  return (
    <>
      <Screen
        media={media.final}
        labelledBy="fin-h"
        label={<Label light>Where next</Label>}
        title={<span id="fin-h">The world is waiting. Where will you go next?</span>}
        titleSize="text-[clamp(3.2rem,9.4vw,8.8rem)]"
        actions={
          <>
            <Btn href="/contact#enquire" tone="white">
              Plan your journey
            </Btn>
            <Btn href={company.whatsapp} external tone="ghost">
              WhatsApp us
            </Btn>
          </>
        }
      />
      <address className="gutter mx-auto max-w-[1700px] border-t border-line not-italic">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {[
            { Icon: Mail, node: <a href={`mailto:${company.email}`} className="[overflow-wrap:anywhere] hover:text-red">{company.email}</a> },
            { Icon: Phone, node: <span className="grid">{company.phones.map((p) => <a key={p} href={`tel:${p.replace(/[^+\d]/g, "")}`} className="hover:text-red">{p}</a>)}</span> },
            { Icon: MessageCircle, node: <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-red">Message us on WhatsApp</a> },
            { Icon: MapPin, node: <span>{company.address}</span> },
          ].map(({ Icon, node }, k) => (
            <div key={k} className="flex items-start gap-4 border-b border-line py-7 sm:pr-6 lg:border-b-0">
              <Icon aria-hidden size={20} className="mt-1 shrink-0 text-red" />
              {node}
            </div>
          ))}
        </div>
      </address>
    </>
  );
}
