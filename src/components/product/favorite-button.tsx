"use client"

import { HeartIcon } from "lucide-react"

import { toggleFavorite, useFavorites } from "@/lib/quote-store"
import { cn } from "@/lib/utils"

export function FavoriteButton({
  slug,
  name,
  className,
}: {
  slug: string
  name: string
  className?: string
}) {
  const favorites = useFavorites()
  const active = favorites.includes(slug)
  return (
    <button
      type="button"
      onClick={() => toggleFavorite(slug)}
      aria-pressed={active}
      aria-label={active ? `Quitar ${name} de favoritos` : `Agregar ${name} a favoritos`}
      data-active={active || undefined}
      className={cn(
        "grid size-8 place-items-center rounded-lg bg-brand-night/80 text-white backdrop-blur transition hover:bg-brand-night focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none",
        className
      )}
    >
      <HeartIcon className={cn("size-4", active && "fill-brand-pink text-brand-pink")} />
    </button>
  )
}
