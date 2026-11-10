import type { MetadataRoute } from "next";
import { destinations, services, site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/services", "/destinations", "/packages", "/contact", ...services.map((s) => `/services/${s.slug}`), ...destinations.map((d) => `/destinations/${d.slug}`)];
  return paths.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));
}
