"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { GlobeMarker } from "./EarthGlobe";

const EarthGlobe = dynamic(() => import("./EarthGlobe").then((m) => m.EarthGlobe), { ssr: false });

/** Loads the 3D code only when the globe is about to come on screen. */
export function LazyEarth(props: { markers: GlobeMarker[]; active: number | null; onSelect?: (i: number) => void; interactive?: boolean; className?: string; eager?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(!!props.eager);
  useEffect(() => {
    if (near || !ref.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "400px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [near]);
  return (
    <div ref={ref} className={props.className}>
      {near ? (
        <EarthGlobe markers={props.markers} active={props.active} onSelect={props.onSelect} interactive={props.interactive} className="w-full" />
      ) : (
        <div className="aspect-square w-full" aria-hidden />
      )}
    </div>
  );
}
