"use client"

import { useState } from "react"
import { CheckIcon, MessageCircleIcon, ShoppingBagIcon } from "lucide-react"

import { FavoriteButton } from "@/components/product/favorite-button"
import { FlavorSwatches } from "@/components/product/flavor-swatches"
import { QuantityStepper } from "@/components/quote/quantity-stepper"
import { Rating } from "@/components/reui/rating"
import { Button } from "@/components/ui/button"
import { site } from "@/config/site"
import { categoryName, type Product } from "@/data/products"
import { formatPrice } from "@/lib/format"
import { addToQuote } from "@/lib/quote-store"
import { sendQuote } from "@/lib/send-quote"
import { cn } from "@/lib/utils"

export function BuyBox({ product }: { product: Product }) {
  const [flavor, setFlavor] = useState(product.flavors?.[0]?.name ?? "")
  const [sizeLabel, setSizeLabel] = useState(product.sizes?.[0]?.label ?? "")
  const [quantity, setQuantity] = useState(1)

  const size = product.sizes?.find((s) => s.label === sizeLabel)
  const unitPrice = size?.price ?? product.price
  const compareAt = !size || size === product.sizes?.[0] ? product.compareAt : undefined
  const reviews = product.reviews ?? []
  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0

  const line = {
    slug: product.slug,
    name: product.name,
    flavor: flavor || undefined,
    size: size?.label,
    unitPrice,
    quantity,
  }

  return (
    <div>
      <p className="eyebrow flex items-center gap-2 text-muted-foreground">
        {site.name} <span className="size-1 rounded-full bg-current" /> {categoryName(product.category)}
      </p>
      <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">{product.name}</h1>

      {reviews.length > 0 && (
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <Rating rating={avg} size="sm" />
          <span>{avg.toFixed(1)}</span>
          <span>({reviews.length} reseñas)</span>
        </div>
      )}

      <div className="mt-5 flex items-center gap-3">
        <span className="text-3xl font-semibold tabular-nums">{formatPrice(unitPrice)}</span>
        {compareAt && compareAt > unitPrice && (
          <>
            <span className="text-2xl text-muted-foreground line-through">{formatPrice(compareAt)}</span>
            <span className="rounded-md bg-rose-500 px-2 py-0.5 text-xs font-semibold text-white">
              Ahorra {formatPrice(compareAt - unitPrice)}
            </span>
          </>
        )}
      </div>

      <ul className="mt-5 space-y-2 text-sm">
        {product.highlights.map((h) => (
          <li key={h} className="flex gap-2.5">
            <CheckIcon className="mt-0.5 size-4 shrink-0 text-brand-indigo" /> {h}
          </li>
        ))}
      </ul>

      {product.flavors && product.flavors.length > 0 && (
        <div className="mt-7">
          <p className="mb-3 text-sm">
            Sabor: <span className="text-muted-foreground">{flavor}</span>
          </p>
          <FlavorSwatches flavors={product.flavors} value={flavor} onChange={setFlavor} size="lg" label="Sabor" />
        </div>
      )}

      {product.sizes && product.sizes.length > 0 && (
        <div className="mt-7">
          <p className="mb-3 text-sm">
            Tamaño: <span className="text-muted-foreground">{sizeLabel}</span>
          </p>
          <div role="radiogroup" aria-label="Tamaño" className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {product.sizes.map((s) => {
              const selected = s.label === sizeLabel
              return (
                <button
                  key={s.label}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setSizeLabel(s.label)}
                  className={cn(
                    "rounded-xl border px-3 py-2.5 text-center transition focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none",
                    selected ? "border-primary bg-muted" : "hover:border-primary/40"
                  )}
                >
                  <span className="block text-sm font-medium">{s.label}</span>
                  <span className="block text-xs text-muted-foreground">{s.detail}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      <p className="mt-6 flex flex-wrap items-center gap-2 text-sm">
        <span className="size-1.5 rounded-full bg-emerald-500" />
        <span className="font-medium">Hecho al momento</span>
        <span className="text-muted-foreground">· Cotiza y te confirmamos entrega por WhatsApp</span>
      </p>

      <div className="mt-5 flex gap-2">
        <QuantityStepper value={quantity} onChange={setQuantity} label="Cantidad" className="h-10" />
        <Button size="lg" className="h-10 flex-1 text-sm" onClick={() => addToQuote(line)}>
          <ShoppingBagIcon /> Agregar a mi cotización
        </Button>
      </div>
      <div className="mt-2 flex gap-2">
        <Button
          size="lg"
          variant="outline"
          className="h-10 flex-1 bg-white text-sm"
          onClick={() => sendQuote([line])}
        >
          <MessageCircleIcon /> Pedir ahora por WhatsApp
        </Button>
        <FavoriteButton slug={product.slug} name={product.name} className="size-10 border bg-white text-foreground hover:bg-muted" />
      </div>
    </div>
  )
}
