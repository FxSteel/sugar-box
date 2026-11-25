import type { MetadataRoute } from "next"

import { site } from "@/config/site"
import { products } from "@/data/products"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    ...products.map((p) => ({
      url: `${site.url}/productos/${p.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ]
}
