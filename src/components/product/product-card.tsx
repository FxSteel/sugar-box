"use client"

import Link from "next/link"
import { useCallback, useId, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { CheckIcon, PlusIcon } from "lucide-react"

import { FavoriteButton } from "@/components/product/favorite-button"
import { FlavorSwatches } from "@/components/product/flavor-swatches"
import { ProductMedia } from "@/components/product/product-media"
import { QuickView } from "@/components/product/quick-view"
import { categoryName, type Product } from "@/data/products"
import { formatPrice } from "@/lib/format"
import { addToQuote } from "@/lib/quote-store"
import { cn } from "@/lib/utils"

export function DiscountBadge({ price, compareAt }: { price: number; compareAt?: number }) {
  if (!compareAt || compareAt <= price) return null
  const pct = Math.round((1 - price / compareAt) * 100)
  return (
    <span className="rounded-full bg-rose-500 px-2 py-0.5 text-xs font-semibold text-white">
      -{pct}%
    </span>
  )
}

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const [flavor, setFlavor] = useState(product.flavors?.[0]?.name ?? "")
  const href = `/productos/${product.slug}`
  const size = product.sizes?.[0]
  const price = size?.price ?? product.price
  const layoutId = `product-${useId()}`
  const [quickView, setQuickView] = useState(false)
  const [added, setAdded] = useState(false)
  const closeQuickView = useCallback(() => setQuickView(false), [])

  function handleAdd() {
    addToQuote(
      { slug: product.slug, name: product.name, flavor: flavor || undefined, size: size?.label, unitPrice: price, quantity: 1 },
      { open: false }
    )
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-2xl border bg-muted/60 p-1.5 transition-colors hover:border-brand-indigo/25",
        className
      )}
    >
      <div className="relative aspect-square">
        <button
          type="button"
          onClick={() => setQuickView(true)}
          aria-label={`Vista rápida de ${product.name}`}
          className="absolute inset-0 cursor-zoom-in rounded-xl focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          {!quickView && (
            <motion.span
              layoutId={`${layoutId}-media`}
              transition={{ type: "spring", stiffness: 300, damping: 34 }}
              style={{ borderRadius: 12 }}
              className="absolute inset-0 overflow-hidden"
            >
              <ProductMedia
                product={product}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </motion.span>
          )}
        </button>
        <div className="pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between">
          <div className="flex gap-1.5">
            <DiscountBadge price={product.price} compareAt={product.compareAt} />
            {product.badge && (
              <span className="rounded-full bg-brand-night/80 px-2 py-0.5 text-xs font-medium text-white backdrop-blur">
                {product.badge}
              </span>
            )}
          </div>
          <FavoriteButton
            slug={product.slug}
            name={product.name}
            className="pointer-events-auto opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100 data-active:opacity-100 [@media(hover:none)]:opacity-100"
          />
        </div>
      </div>

      <div className="mt-1.5 flex flex-1 flex-col gap-3 rounded-xl border bg-card p-4">
        <p className="eyebrow text-muted-foreground">{categoryName(product.category)}</p>

        {product.flavors && product.flavors.length > 0 && (
          <div className="flex items-center justify-between gap-3">
            <FlavorSwatches
              flavors={product.flavors}
              value={flavor}
              onChange={setFlavor}
              label={`Sabor de ${product.name}`}
            />
            <span className="truncate text-xs text-muted-foreground">{flavor}</span>
          </div>
        )}

        <div className="space-y-1">
          <h3 className="font-sans text-base font-semibold">
            <Link href={href} className="hover:underline focus-visible:underline focus-visible:outline-none">
              {product.name}
            </Link>
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">{product.short}</p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2">
          <p className="flex items-baseline gap-2">
            <span className="text-lg font-semibold">
              {size ? <span className="mr-1 text-xs font-normal text-muted-foreground">desde</span> : null}
              {formatPrice(price)}
            </span>
            {product.compareAt && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.compareAt)}
              </span>
            )}
          </p>
          <motion.button
            layout
            type="button"
            onClick={handleAdd}
            aria-label={added ? `${product.name} agregado` : `Agregar ${product.name} a la cotización`}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
            style={{ borderRadius: 10 }}
            className={cn(
              "flex h-8 min-w-8 items-center justify-center gap-1.5 overflow-hidden px-2 text-xs font-semibold whitespace-nowrap transition-colors focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none",
              added ? "bg-emerald-500 text-white" : "bg-primary text-primary-foreground hover:bg-primary/85"
            )}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={added ? "ok" : "add"}
                className="flex items-center gap-1.5"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                {added ? (
                  <>
                    <CheckIcon className="size-4" /> Agregado
                  </>
                ) : (
                  <PlusIcon className="size-4" />
                )}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
      <AnimatePresence>
        {quickView && (
          <QuickView product={product} layoutId={layoutId} flavor={flavor} onClose={closeQuickView} />
        )}
      </AnimatePresence>
    </article>
  )
}
