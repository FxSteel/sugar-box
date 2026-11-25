import { site } from "@/config/site"
import { categoryName, type Product } from "@/data/products"

const abs = (path: string) => new URL(path, site.url).toString()

// Omite campos vacíos para no publicar datos incompletos en el schema.
const compact = <T extends Record<string, unknown>>(obj: T) =>
  Object.fromEntries(
    Object.entries(obj).filter(([, v]) =>
      Array.isArray(v) ? v.length > 0 : v !== "" && v !== undefined && v !== null
    )
  )

export function bakerySchema() {
  const { address } = site
  const hasAddress = Object.values(address).some(Boolean)
  return compact({
    "@context": "https://schema.org",
    "@type": "Bakery",
    "@id": abs("/#negocio"),
    name: site.name,
    slogan: site.tagline,
    description: site.description,
    url: site.url,
    image: abs("/brand/caja-navidad.jpg"),
    telephone: site.phone,
    servesCuisine: ["Postres", "Repostería", "Pastelería"],
    address: hasAddress
      ? compact({
          "@type": "PostalAddress",
          streetAddress: address.street,
          addressLocality: address.city,
          addressRegion: address.region,
          postalCode: address.postalCode,
          addressCountry: address.country,
        })
      : undefined,
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: Object.values(site.social).filter(Boolean),
  })
}

export function productSchema(product: Product) {
  const prices = product.sizes?.map((s) => s.price) ?? [product.price]
  const reviews = product.reviews ?? []
  return compact({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: categoryName(product.category),
    image: product.images?.map(abs),
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: site.currency,
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: prices.length,
      availability: "https://schema.org/InStock",
    },
    aggregateRating:
      reviews.length > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1),
            reviewCount: reviews.length,
          }
        : undefined,
  })
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  }
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }
}
