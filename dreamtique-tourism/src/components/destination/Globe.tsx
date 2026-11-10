"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { destinations } from "@/data/destinations";
import { isCoarsePointer, prefersReducedMotion } from "@/lib/utils";

const toVec = (lat: number, lon: number, r = 1) => {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
};

/** An interactive 3D globe with glowing destination markers and flight arcs. Turns to the chosen destination and can be dragged. */
export function Globe({ active, onSelect }: { active: number; onSelect?: (i: number) => void }) {
  const host = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const activeRef = useRef(active);
  const onSelectRef = useRef(onSelect);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    activeRef.current = active;
    const d = destinations[active];
    const p = toVec(d.lat, d.lon);
    target.current = { x: (d.lat * Math.PI) / 180, y: -Math.atan2(p.x, p.z) };
  }, [active]);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const reduce = prefersReducedMotion();
    const small = isCoarsePointer();

    const renderer = new THREE.WebGLRenderer({ antialias: !small, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 2));
    renderer.domElement.style.cssText = "display:block;width:100%;height:100%;touch-action:pan-y";
    renderer.domElement.setAttribute("aria-hidden", "true");
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
    camera.position.z = 5.3;

    const globe = new THREE.Group();
    scene.add(globe);

    // glassy body and an atmosphere halo
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.99, 64, 48), new THREE.MeshBasicMaterial({ color: 0x0a1a45, transparent: true, opacity: 0.92 }));
    globe.add(body);
    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(1.14, 48, 32),
      new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        vertexShader: "varying vec3 n; void main(){ n = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
        fragmentShader: "varying vec3 n; void main(){ float i = pow(0.72 - dot(n, vec3(0.,0.,1.)), 3.0); gl_FragColor = vec4(0.24,0.55,1.0,1.0) * i; }",
      }),
    );
    scene.add(halo);

    // graticule rings
    const lineMat = new THREE.LineBasicMaterial({ color: 0x3d8bff, transparent: true, opacity: 0.22 });
    const ringGeos: THREE.BufferGeometry[] = [];
    for (let lat = -60; lat <= 60; lat += 30) {
      const pts: THREE.Vector3[] = [];
      for (let a = 0; a <= 64; a++) pts.push(toVec(lat, (a / 64) * 360 - 180, 1.002));
      const g = new THREE.BufferGeometry().setFromPoints(pts);
      ringGeos.push(g);
      globe.add(new THREE.Line(g, lineMat));
    }
    for (let lon = 0; lon < 360; lon += 30) {
      const pts: THREE.Vector3[] = [];
      for (let a = 0; a <= 64; a++) pts.push(toVec((a / 64) * 180 - 90, lon, 1.002));
      const g = new THREE.BufferGeometry().setFromPoints(pts);
      ringGeos.push(g);
      globe.add(new THREE.Line(g, lineMat));
    }

    // dots
    const n = small ? 900 : 1800;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = Math.PI * (3 - Math.sqrt(5)) * i;
      pos.set([Math.cos(t) * r * 1.004, y * 1.004, Math.sin(t) * r * 1.004], i * 3);
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const dotMat = new THREE.PointsMaterial({ color: 0x8fb9ff, size: 0.014, transparent: true, opacity: 0.85 });
    globe.add(new THREE.Points(dotGeo, dotMat));

    // markers (glowing pins) and arcs between destinations
    const markerMeshes: THREE.Mesh[] = [];
    const markerGeo = new THREE.SphereGeometry(0.035, 16, 12);
    const ringGeo = new THREE.RingGeometry(0.06, 0.075, 32);
    const redMat = new THREE.MeshBasicMaterial({ color: 0xe0262f });
    const rings: THREE.Mesh[] = [];
    destinations.forEach((d, i) => {
      const p = toVec(d.lat, d.lon, 1.01);
      const m = new THREE.Mesh(markerGeo, redMat);
      m.position.copy(p);
      m.userData.i = i;
      globe.add(m);
      markerMeshes.push(m);
      const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0xff6a72, transparent: true, opacity: 0.8, side: THREE.DoubleSide }));
      ring.position.copy(p);
      ring.lookAt(p.clone().multiplyScalar(2));
      globe.add(ring);
      rings.push(ring);
    });
    const arcMat = new THREE.LineBasicMaterial({ color: 0x8fb9ff, transparent: true, opacity: 0.75 });
    const arcGeos: THREE.BufferGeometry[] = [];
    [[0, 1], [1, 2]].forEach(([a, b]) => {
      const A = toVec(destinations[a].lat, destinations[a].lon, 1.01);
      const B = toVec(destinations[b].lat, destinations[b].lon, 1.01);
      const mid = A.clone().add(B).multiplyScalar(0.5).normalize().multiplyScalar(1.25);
      const curve = new THREE.QuadraticBezierCurve3(A, mid, B);
      const g = new THREE.BufferGeometry().setFromPoints(curve.getPoints(48));
      arcGeos.push(g);
      globe.add(new THREE.Line(g, arcMat));
    });

    const size = () => {
      const w = el.clientWidth || 300;
      const h = el.clientHeight || 300;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(el);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    // drag to turn, click a marker to choose it
    let dragging = false;
    let moved = 0;
    let last = { x: 0, y: 0 };
    let manual = 0;
    const down = (e: PointerEvent) => {
      dragging = true;
      moved = 0;
      last = { x: e.clientX, y: e.clientY };
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      moved += Math.abs(dx) + Math.abs(dy);
      globe.rotation.y += dx * 0.006;
      globe.rotation.x = Math.max(-1.1, Math.min(1.1, globe.rotation.x + dy * 0.004));
      last = { x: e.clientX, y: e.clientY };
      manual = performance.now();
    };
    const up = (e: PointerEvent) => {
      dragging = false;
      if (moved < 6 && onSelectRef.current) {
        const r = renderer.domElement.getBoundingClientRect();
        const ndc = new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
        const ray = new THREE.Raycaster();
        ray.setFromCamera(ndc, camera);
        const hit = ray.intersectObjects(markerMeshes, false)[0];
        if (hit) onSelectRef.current(hit.object.userData.i as number);
      }
    };
    renderer.domElement.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);

    globe.rotation.x = target.current.x;
    globe.rotation.y = target.current.y;

    let raf = 0;
    const clock = new THREE.Clock();
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const t = clock.getElapsedTime();
      if (!dragging && performance.now() - manual > 1500) {
        const k = reduce ? 1 : 0.05;
        globe.rotation.x += (target.current.x - globe.rotation.x) * k;
        let dy = target.current.y - globe.rotation.y;
        dy = Math.atan2(Math.sin(dy), Math.cos(dy));
        globe.rotation.y += dy * k;
      }
      markerMeshes.forEach((m, i) => {
        const on = i === activeRef.current;
        m.scale.setScalar(on ? 1.7 : 1);
        const ring = rings[i];
        const s = on ? 1 + (reduce ? 0.3 : (Math.sin(t * 2.6) * 0.5 + 0.5) * 1.2) : 0.001;
        ring.scale.setScalar(s);
        (ring.material as THREE.MeshBasicMaterial).opacity = on ? 0.85 - (reduce ? 0.3 : (Math.sin(t * 2.6) * 0.5 + 0.5) * 0.7) : 0;
      });
      renderer.render(scene, camera);
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      renderer.domElement.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      ro.disconnect();
      io.disconnect();
      [body.geometry, halo.geometry, dotGeo, markerGeo, ringGeo, ...ringGeos, ...arcGeos].forEach((g) => g.dispose());
      [lineMat, dotMat, redMat, arcMat, body.material as THREE.Material, halo.material as THREE.Material].forEach((m) => m.dispose());
      rings.forEach((r) => (r.material as THREE.Material).dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={host} role="img" aria-label="Interactive globe showing Dubai, Georgia and Armenia" className="aspect-square w-full cursor-grab active:cursor-grabbing" />;
}
