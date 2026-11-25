"use client"

import type { Flavor } from "@/data/products"
import { cn } from "@/lib/utils"

export function FlavorSwatches({
  flavors,
  value,
  onChange,
  size = "sm",
  label,
}: {
  flavors: Flavor[]
  value: string
  onChange: (name: string) => void
  size?: "sm" | "lg"
  label: string
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap items-center gap-2">
      {flavors.map((f) => {
        const selected = f.name === value
        return (
          <button
            key={f.name}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={f.name}
            title={f.name}
            onClick={() => onChange(f.name)}
            className={cn(
              "rounded-full ring-offset-2 ring-offset-white transition focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none",
              size === "sm" ? "size-5" : "size-8",
              selected ? "ring-2 ring-brand-night" : "ring-1 ring-black/10 hover:ring-black/30"
            )}
            style={{ backgroundColor: f.swatch }}
          />
        )
      })}
    </div>
  )
}
