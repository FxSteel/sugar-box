"use client"

import { useState } from "react"

import { ProductArt } from "@/components/brand/product-art"
import { ProductMedia } from "@/components/product/product-media"
import type { ArtTone, Product } from "@/data/products"
import { cn } from "@/lib/utils"

const allTones: ArtTone[] = ["pink", "sky", "butter", "cream"]

export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0)
  const photos = product.images ?? []
  // Sin fotos reales: variaciones de la ilustración para mostrar la galería
  const tones = [product.art.tone, ...allTones.filter((t) => t !== product.art.tone)]
  const count = photos.length > 0 ? photos.length : tones.length

  const renderSlide = (i: number, sizes: string, thumb = false) =>
    photos.length > 0 ? (
      <ProductMedia product={product} index={i} sizes={sizes} priority={i === 0 && !thumb} />
    ) : (
      <ProductArt tone={tones[i]} icon={product.art.icon} iconClassName={thumb ? "size-1/2" : undefined} />
    )

  return (
    <div className="lg:sticky lg:top-20">
      <div className="relative aspect-square overflow-hidden rounded-2xl">
        {renderSlide(active, "(min-width: 1024px) 50vw, 100vw")}
      </div>
      {count > 1 && (
      <div className="mt-3 grid grid-cols-4 gap-3" role="tablist" aria-label="Imágenes del producto">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-label={`Ver imagen ${i + 1}`}
            onClick={() => setActive(i)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-xl transition focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none",
              active === i ? "ring-2 ring-primary ring-offset-2" : "opacity-70 hover:opacity-100"
            )}
          >
            {renderSlide(i, "12vw", true)}
          </button>
        ))}
      </div>
      )}
    </div>
  )
}
