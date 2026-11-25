// Configuración central del negocio. Los valores marcados TODO deben venir del cliente.
export const site = {
  name: "The Sugar Box",
  tagline: "Mini churros • Felicidad en grande",
  slogan: "Momentos dulces, sonrisas más grandes",
  description:
    "Pastelería y repostería artesanal: mini churros, pasteles, postres y cajas de dulces para regalar. Cotiza tu pedido por WhatsApp.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "es",
  // TODO: confirmar moneda y país con el cliente
  currency: "USD",
  // Locale para formatear precios (es + USD muestra "8 US$"; en-US muestra "$8")
  priceLocale: "en-US",
  // TODO: número real en formato internacional, solo dígitos
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "",
  // TODO: datos NAP reales (deben coincidir con Google Business Profile)
  address: {
    street: "",
    city: "",
    region: "",
    postalCode: "",
    country: "",
  },
  phone: "",
  hours: [] as { days: string; opens: string; closes: string }[],
  social: {
    instagram: "",
    facebook: "",
    tiktok: "",
  },
  // Temporada activa: cambia textos del hero/promo y decoración
  season: "navidad" as "navidad" | "none",
  // TODO: fecha límite real de pedidos de temporada
  seasonDeadline: "2026-12-22T23:59:00",
} as const

export const isProduction = process.env.APP_ENV === "production"
