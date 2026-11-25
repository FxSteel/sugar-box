"use client"

import { ShoppingBagIcon } from "lucide-react"

import { setQuoteOpen, useQuote } from "@/lib/quote-store"

export function QuoteTrigger() {
  const lines = useQuote()
  const count = lines.reduce((n, l) => n + l.quantity, 0)
  return (
    <button
      type="button"
      onClick={() => setQuoteOpen(true)}
      aria-label={`Abrir cotización (${count} productos)`}
      className="relative inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/85 focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none"
    >
      <ShoppingBagIcon className="size-4" />
      <span className="hidden sm:inline">Cotizar</span>
      {count > 0 && (
        <span className="grid min-w-5 place-items-center rounded-full bg-brand-pink px-1 text-xs text-brand-night tabular-nums">
          {count}
        </span>
      )}
    </button>
  )
}
