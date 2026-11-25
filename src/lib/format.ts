import { site } from "@/config/site"

const formatter = new Intl.NumberFormat(site.priceLocale, {
  style: "currency",
  currency: site.currency,
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

export const formatPrice = (value: number) => formatter.format(value)
