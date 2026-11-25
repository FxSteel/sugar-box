import {
  CakeIcon,
  CakeSliceIcon,
  CandyIcon,
  CookieIcon,
  DessertIcon,
  DonutIcon,
  GiftIcon,
  type LucideIcon,
} from "lucide-react"

import { Sparkle } from "@/components/brand/decor"
import type { ArtIcon, ArtTone } from "@/data/products"
import { cn } from "@/lib/utils"

const tones: Record<ArtTone, string> = {
  pink: "bg-brand-pink",
  sky: "bg-brand-sky",
  butter: "bg-brand-butter",
  cream: "bg-brand-cream",
}

function ChurroIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      {[-28, 0, 28].map((r, i) => (
        <g key={i} transform={`rotate(${r} 32 52)`}>
          <rect x="27" y="8" width="10" height="44" rx="5" fill="currentColor" />
          {[16, 24, 32, 40].map((y) => (
            <path key={y} d={`M29 ${y}h6`} stroke="var(--brand-cream)" strokeWidth="1.6" strokeLinecap="round" />
          ))}
        </g>
      ))}
    </svg>
  )
}

const icons: Record<Exclude<ArtIcon, "churro">, LucideIcon> = {
  cake: CakeIcon,
  slice: CakeSliceIcon,
  cookie: CookieIcon,
  donut: DonutIcon,
  gift: GiftIcon,
  candy: CandyIcon,
  cupcake: DessertIcon,
}

/**
 * Ilustración de marca usada mientras no hay fotos reales del producto.
 * TODO: reemplazar por fotografía profesional (product.images).
 */
export function ProductArt({
  tone,
  icon,
  className,
  iconClassName,
}: {
  tone: ArtTone
  icon: ArtIcon
  className?: string
  iconClassName?: string
}) {
  const Icon = icon === "churro" ? ChurroIcon : icons[icon]
  return (
    <div
      className={cn(
        "relative isolate grid size-full place-items-center overflow-hidden",
        tones[tone],
        className
      )}
    >
      <div className="absolute -top-1/4 -right-1/4 -z-10 size-3/4 rounded-full bg-white/35 blur-2xl" />
      <div className="absolute -bottom-1/3 -left-1/4 -z-10 size-3/4 rounded-full bg-brand-indigo/10 blur-2xl" />
      <Sparkle className="absolute top-[14%] left-[16%] size-4 text-white/80" />
      <Sparkle className="absolute right-[18%] bottom-[20%] size-3 text-white/70" />
      <Sparkle className="absolute top-[24%] right-[26%] size-2.5 text-brand-indigo/30" />
      <Icon
        strokeWidth={1.25}
        className={cn("size-2/5 text-brand-indigo drop-shadow-sm", iconClassName)}
      />
    </div>
  )
}
