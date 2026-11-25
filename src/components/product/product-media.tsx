import Image from "next/image"

import { ProductArt } from "@/components/brand/product-art"
import type { Product } from "@/data/products"
import { cn } from "@/lib/utils"

/** Foto real si existe; si no, la ilustración de marca. */
export function ProductMedia({
  product,
  index = 0,
  sizes,
  priority,
  className,
}: {
  product: Product
  index?: number
  sizes: string
  priority?: boolean
  className?: string
}) {
  const src = product.images?.[index]
  if (src) {
    return (
      <Image
        src={src}
        alt={product.name}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
      />
    )
  }
  return <ProductArt tone={product.art.tone} icon={product.art.icon} className={className} />
}
