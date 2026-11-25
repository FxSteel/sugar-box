import { site } from "@/config/site"
import { formatPrice } from "@/lib/format"

export type QuoteLine = {
  slug: string
  name: string
  flavor?: string
  size?: string
  unitPrice: number
  quantity: number
}

export type QuoteContact = {
  name: string
  date?: string
  notes?: string
}

export const quoteTotal = (lines: QuoteLine[]) =>
  lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0)

export function buildQuoteMessage(lines: QuoteLine[], contact?: QuoteContact) {
  const items = lines.map((l) => {
    const variant = [l.size, l.flavor].filter(Boolean).join(" · ")
    return `• ${l.quantity} × ${l.name}${variant ? ` (${variant})` : ""} — ${formatPrice(l.unitPrice * l.quantity)}`
  })

  return [
    `¡Hola ${site.name}! 🍩 Quiero cotizar este pedido:`,
    "",
    ...items,
    "",
    `Total estimado: ${formatPrice(quoteTotal(lines))}`,
    contact?.name ? `Nombre: ${contact.name}` : "",
    contact?.date ? `Fecha deseada: ${contact.date}` : "",
    contact?.notes ? `Notas: ${contact.notes}` : "",
  ]
    .filter((line, i, all) => line !== "" || (all[i - 1] ?? "") !== "")
    .join("\n")
    .trim()
}

export const whatsappUrl = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`
