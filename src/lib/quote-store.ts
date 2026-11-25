"use client"

import { createPersistentStore } from "@/lib/persistent-store"
import type { QuoteLine } from "@/lib/whatsapp"

const lineId = (l: Pick<QuoteLine, "slug" | "flavor" | "size">) =>
  [l.slug, l.size ?? "", l.flavor ?? ""].join("|")

const quote = createPersistentStore<QuoteLine[]>("sugarbox:quote", [])
const favorites = createPersistentStore<string[]>("sugarbox:favorites", [])
const sheet = createPersistentStore<boolean>(null, false)

export const useQuote = quote.useStore
export const useFavorites = favorites.useStore
export const useQuoteOpen = sheet.useStore

export const setQuoteOpen = (open: boolean) => sheet.set(() => open)

export function addToQuote(line: QuoteLine, { open = true } = {}) {
  quote.set((lines) => {
    const id = lineId(line)
    const existing = lines.find((l) => lineId(l) === id)
    if (existing) {
      return lines.map((l) =>
        lineId(l) === id ? { ...l, quantity: l.quantity + line.quantity } : l
      )
    }
    return [...lines, line]
  })
  if (open) setQuoteOpen(true)
}

export function updateQuantity(line: QuoteLine, quantity: number) {
  quote.set((lines) =>
    quantity <= 0
      ? lines.filter((l) => lineId(l) !== lineId(line))
      : lines.map((l) => (lineId(l) === lineId(line) ? { ...l, quantity } : l))
  )
}

export const clearQuote = () => quote.set(() => [])

export const toggleFavorite = (slug: string) =>
  favorites.set((list) =>
    list.includes(slug) ? list.filter((s) => s !== slug) : [...list, slug]
  )

export { lineId }
