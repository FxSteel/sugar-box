"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { PlusIcon } from "lucide-react"

import { ProductMedia } from "@/components/product/product-media"
import { DiscountBadge } from "@/components/product/product-card"
import type { Product } from "@/data/products"
import { formatPrice } from "@/lib/format"
import { addToQuote } from "@/lib/quote-store"
import { cn } from "@/lib/utils"

export function HeroProductTile({
  product,
  delay = 0,
  className,
}: {
  product: Product
  delay?: number
  className?: string
}) {
  const size = product.sizes?.[0]
  const price = size?.price ?? product.price
  return (
    <motion.article
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn("group relative isolate overflow-hidden rounded-2xl", className)}
    >
      <ProductMedia
        product={product}
        sizes="(min-width: 1024px) 25vw, 50vw"
        className="transition-transform duration-500 ease-out group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-brand-night/85 via-brand-night/10 to-transparent" />
      <div className="absolute top-3 left-3 flex gap-1.5">
        <DiscountBadge price={product.price} compareAt={product.compareAt} />
        {product.badge && (
          <span className="rounded-md bg-white px-2 py-0.5 text-xs font-medium text-brand-indigo-dark">
            {product.badge}
          </span>
        )}
      </div>
      <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
        <div>
          <h3 className="font-sans text-sm font-medium text-white">
            <Link href={`/productos/${product.slug}`} className="after:absolute after:inset-0 focus-visible:underline focus-visible:outline-none">
              {product.name}
            </Link>
          </h3>
          <p className="text-sm text-white/80">
            {formatPrice(price)}
            {product.compareAt && (
              <span className="ml-1.5 text-white/50 line-through">{formatPrice(product.compareAt)}</span>
            )}
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            addToQuote({
              slug: product.slug,
              name: product.name,
              flavor: product.flavors?.[0]?.name,
              size: size?.label,
              unitPrice: price,
              quantity: 1,
            })
          }
          aria-label={`Agregar ${product.name} a la cotización`}
          className="relative z-10 grid size-8 place-items-center rounded-lg bg-brand-night/80 text-white backdrop-blur transition hover:bg-brand-pink hover:text-brand-indigo-dark focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none"
        >
          <PlusIcon className="size-4" />
        </button>
      </div>
    </motion.article>
  )
}
