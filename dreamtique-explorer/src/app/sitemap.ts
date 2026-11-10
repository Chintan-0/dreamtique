import type { MetadataRoute } from "next";
import { destinationList } from "@/data/experiences";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/experiences", "/destinations", "/services", "/packages", "/about", "/contact", ...destinationList.map((d) => `/destinations/${d.slug}`)];
  return paths.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));
}
