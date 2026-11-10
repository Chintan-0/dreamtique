import type { MetadataRoute } from "next";
import { company } from "@/data/company";
import { destinations } from "@/data/destinations";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/services", "/destinations", "/packages", "/journal", "/contact", "/booking", ...destinations.map((d) => `/destinations/${d.slug}`)];
  return paths.map((p) => ({ url: `${company.url}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));
}
