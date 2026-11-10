"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { destinations } from "@/lib/content";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isCoarsePointer = () => window.matchMedia("(pointer: coarse)").matches;

export type GlobeMarker = { label: string; lat: number; lon: number };

const toVec = (lat: number, lon: number, r = 1) => {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
};

/** The rotation that brings a place to face the camera. */
const faceTo = (lat: number, lon: number) => {
  const p = toVec(lat, lon);
  return { x: (lat * Math.PI) / 180, y: -Math.atan2(p.x, p.z) };
};

const wrap = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));

const atmosphere = {
  vertex: "varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
  back: "varying vec3 vN; void main(){ float i = pow(0.72 - dot(vN, vec3(0.0,0.0,1.0)), 3.2); gl_FragColor = vec4(0.24,0.55,1.0,1.0) * i * 1.15; }",
  rim: "varying vec3 vN; void main(){ float i = pow(1.0 - abs(dot(vN, vec3(0.0,0.0,1.0))), 3.0); gl_FragColor = vec4(0.45,0.72,1.0,1.0) * i * 0.75; }",
};

/**
 * Realistic Earth with an electric-blue atmosphere. Place markers are real buttons laid over the canvas,
 * so they are easy to tap and reachable by keyboard. The 3D only runs while it is on screen.
 */
function EarthGlobe({
  markers,
  active,
  onSelect,
  interactive = true,
  onlyActiveLabel = false,
  className = "",
}: {
  markers: GlobeMarker[];
  active: number | null;
  onSelect?: (i: number) => void;
  interactive?: boolean;
  onlyActiveLabel?: boolean;
  className?: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const pins = useRef<(HTMLElement | null)[]>([]);
  const activeRef = useRef(active);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const root: HTMLDivElement = el;
    const reduce = prefersReducedMotion();
    const coarse = isCoarsePointer();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !coarse, alpha: true, powerPreference: "low-power" });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarse ? 1.5 : 2));
    renderer.domElement.style.cssText = "position:absolute;inset:0;display:block;width:100%;height:100%;touch-action:pan-y;opacity:0;transition:opacity .9s ease";
    renderer.domElement.setAttribute("aria-hidden", "true");
    el.prepend(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
    camera.position.z = 4.5;

    const globe = new THREE.Group();
    scene.add(globe);

    const texture = new THREE.TextureLoader().load("/earth/day.jpg", () => {
      renderer.domElement.style.opacity = "1";
      setReady(true);
    });
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;

    const segs = coarse ? [64, 48] : [96, 64];
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(1, segs[0], segs[1]),
      new THREE.MeshPhongMaterial({ map: texture, specular: new THREE.Color(0x1d3a6b), shininess: 14 }),
    );
    globe.add(earth);

    scene.add(new THREE.AmbientLight(0x6f8fd0, 1.25));
    const sun = new THREE.DirectionalLight(0xffffff, 2.4);
    sun.position.set(-3, 2, 4);
    scene.add(sun);

    const glowMats: THREE.ShaderMaterial[] = [];
    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(1.16, 48, 32),
      new THREE.ShaderMaterial({ vertexShader: atmosphere.vertex, fragmentShader: atmosphere.back, side: THREE.BackSide, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }),
    );
    glowMats.push(halo.material);
    scene.add(halo);
    const rim = new THREE.Mesh(
      new THREE.SphereGeometry(1.012, 48, 32),
      new THREE.ShaderMaterial({ vertexShader: atmosphere.vertex, fragmentShader: atmosphere.rim, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }),
    );
    glowMats.push(rim.material);
    scene.add(rim);

    // start tilted slightly north, turned toward the Middle East
    const start = faceTo(22, 40);
    const rot = { x: start.x * 0.6, y: start.y - 0.9 };
    const aim = { x: rot.x, y: rot.y };
    let idleSpin = true;
    let dragging = false;
    let lastX = 0;
    let moved = 0;
    let lastTouch = 0;

    const resize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    const down = (e: PointerEvent) => {
      if (!interactive) return;
      dragging = true;
      moved = 0;
      lastX = e.clientX;
      idleSpin = false;
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      moved += Math.abs(dx);
      if (moved > 4) {
        rot.y += dx * 0.006;
        aim.y = rot.y;
        el.setPointerCapture?.(e.pointerId);
      }
    };
    const up = () => {
      dragging = false;
      lastTouch = performance.now();
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);

    let visible = true;
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(frame);
    }, { rootMargin: "120px" });
    io.observe(el);

    const v = new THREE.Vector3();
    let lastKey = -2;
    function frame(t: number) {
      raf = 0;
      if (!visible || document.hidden) return;

      const a = activeRef.current;
      const key = a ?? -1;
      if (key !== lastKey) {
        lastKey = key;
        if (a !== null) {
          const m = markers[a];
          const f = faceTo(m.lat, m.lon);
          aim.x = f.x * 0.85;
          aim.y = f.y;
          idleSpin = false;
        } else if (!dragging) {
          idleSpin = true;
        }
      }
      if (!dragging && !idleSpin && a === null && t - lastTouch > 4000) idleSpin = true;

      if (idleSpin && !reduce) {
        aim.y += 0.0016;
        aim.x += (0.28 - aim.x) * 0.02;
      }
      const k = reduce ? 1 : 0.06;
      rot.x += (aim.x - rot.x) * k;
      rot.y += wrap(aim.y - rot.y) * k;
      aim.y = rot.y + wrap(aim.y - rot.y);
      globe.rotation.set(rot.x, rot.y, 0);

      // keep the place buttons glued to the surface
      pins.current.forEach((pin, i) => {
        if (!pin) return;
        const m = markers[i];
        v.copy(toVec(m.lat, m.lon, 1.01));
        globe.localToWorld(v);
        const facing = v.clone().normalize().dot(new THREE.Vector3(0, 0, 1));
        v.project(camera);
        const show = facing > 0.18;
        pin.style.transform = `translate3d(${((v.x + 1) / 2) * root.clientWidth}px, ${((1 - v.y) / 2) * root.clientHeight}px, 0) translate(-50%, -50%)`;
        pin.style.opacity = show ? "1" : "0";
        pin.style.pointerEvents = show && interactive ? "auto" : "none";
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      earth.geometry.dispose();
      (earth.material as THREE.Material).dispose();
      halo.geometry.dispose();
      rim.geometry.dispose();
      glowMats.forEach((m) => m.dispose());
      texture.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [markers, interactive]);

  return (
    <div ref={host} className={`relative isolate aspect-square select-none ${className}`}>
      {/* a still of the planet shows first and whenever 3D is unavailable */}
      <div
        aria-hidden
        className={`absolute left-1/2 top-1/2 aspect-square w-[77%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[url('/earth/day.jpg')] bg-[length:260%_130%] bg-[position:62%_38%] shadow-[0_0_80px_rgba(61,139,255,0.55),inset_-28px_-12px_60px_rgba(2,8,28,0.75)] transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}
      />
      {markers.map((m, i) => {
        const on = active === i;
        const inner = (
          <>
            <span className="relative grid size-4 place-items-center">
              <span aria-hidden className="absolute inline-flex size-full animate-ping rounded-full bg-[#d4202c]/70" />
              <span className={`relative size-3.5 rounded-full border-2 border-white bg-[#d4202c] shadow-[0_0_14px_rgba(212,32,44,0.8)] transition-transform ${on ? "scale-125" : ""}`} />
            </span>
            <span hidden={onlyActiveLabel && !on} style={{ translate: `0 ${[0, -14, 14][i % 3]}px` }} className={`px-3 py-1.5 text-[0.9375rem] font-semibold transition-colors ${on ? "bg-white text-[#0b1b33]" : "bg-[#0b1b33]/80 text-white"}`}>{m.label}</span>
          </>
        );
        const cls = `absolute left-0 top-0 flex items-center gap-2 opacity-0 transition-opacity duration-300 will-change-transform ${i % 3 === 1 ? "flex-row-reverse" : ""}`;
        return interactive ? (
          <button
            key={m.label}
            ref={(n) => {
              pins.current[i] = n;
            }}
            type="button"
            aria-label={`Show ${m.label}`}
            aria-pressed={on}
            onClick={() => onSelect?.(i)}
            className={`${cls} min-h-[44px] min-w-[44px] -m-1 p-1`}
          >
            {inner}
          </button>
        ) : (
          <span
            key={m.label}
            ref={(n) => {
              pins.current[i] = n;
            }}
            aria-hidden
            className={cls}
          >
            {inner}
          </span>
        );
      })}
    </div>
  );
}

const markers = destinations.map((d) => ({ label: d.name, lat: d.lat, lon: d.lon }));

/** A realistic Earth that turns to the destination chosen in the picker, on a deep-navy disc so the atmosphere glows. */
export function Globe({ active }: { active: number }) {
  return (
    <div className="aspect-square overflow-hidden rounded-full bg-[#0b1b33]">
      <EarthGlobe markers={markers} active={active} interactive={false} onlyActiveLabel />
    </div>
  );
}
