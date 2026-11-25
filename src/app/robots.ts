import type { MetadataRoute } from "next"

import { isProduction, site } from "@/config/site"

// Solo producción es indexable; staging/dev quedan bloqueados.
export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } }
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${site.url}/sitemap.xml`,
  }
}
