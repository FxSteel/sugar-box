"use client"

import {
  buildQuoteMessage,
  quoteTotal,
  whatsappUrl,
  type QuoteContact,
  type QuoteLine,
} from "@/lib/whatsapp"

/**
 * Abre WhatsApp con la cotización y, en paralelo, registra el lead en el servidor
 * (PostgreSQL + n8n). El registro nunca bloquea ni rompe el flujo hacia WhatsApp.
 */
export function sendQuote(lines: QuoteLine[], contact: QuoteContact = { name: "" }) {
  const text = buildQuoteMessage(lines, contact)

  try {
    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        type: "quote",
        name: contact.name,
        date: contact.date,
        message: contact.notes,
        products: lines,
        total: quoteTotal(lines),
        page: window.location.pathname,
      }),
    }).catch(() => {})
  } catch {}

  window.open(whatsappUrl(text), "_blank", "noopener,noreferrer")
}
