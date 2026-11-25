"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { motion } from "motion/react"
import { ArrowRightIcon, ShoppingBagIcon, XIcon } from "lucide-react"

import { ProductMedia } from "@/components/product/product-media"
import { categoryName, type Product } from "@/data/products"
import { formatPrice } from "@/lib/format"
import { addToQuote } from "@/lib/quote-store"

const spring = { type: "spring", stiffness: 300, damping: 34 } as const

/**
 * Vista rápida: la imagen de la tarjeta "se transforma" en el diálogo
 * gracias a que ambas comparten el mismo `layoutId`.
 */
export function QuickView({
  product,
  layoutId,
  flavor,
  onClose,
}: {
  product: Product
  layoutId: string
  flavor?: string
  onClose: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const size = product.sizes?.[0]
  const price = size?.price ?? product.price

  useEffect(() => {
    closeRef.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [onClose])

  return createPortal(
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <motion.div
        className="absolute inset-0 bg-brand-night/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${layoutId}-title`}
        className="relative grid max-h-full w-full max-w-3xl gap-3 overflow-y-auto md:grid-cols-2"
      >
        <motion.div
          layoutId={`${layoutId}-media`}
          transition={spring}
          style={{ borderRadius: 24 }}
          className="relative aspect-square overflow-hidden shadow-2xl"
        >
          <ProductMedia product={product} sizes="(min-width: 768px) 384px, 100vw" />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar vista rápida"
            className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-white/90 text-foreground shadow backdrop-blur transition hover:bg-white"
          >
            <XIcon className="size-4" />
          </button>
        </motion.div>

        <motion.div
          className="flex flex-col rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
          initial={{ opacity: 0, x: -24, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1, transition: { delay: 0.12, ...spring } }}
          exit={{ opacity: 0, x: -16, transition: { duration: 0.15 } }}
        >
          <p className="eyebrow text-muted-foreground">{categoryName(product.category)}</p>
          <h2 id={`${layoutId}-title`} className="mt-2 text-3xl font-semibold">
            {product.name}
          </h2>
          <p className="mt-3 text-muted-foreground">{product.description}</p>
          <p className="mt-5 text-2xl font-semibold">
            <span className="mr-1 text-sm font-normal text-muted-foreground">desde</span>
            {formatPrice(price)}
          </p>
          <div className="mt-auto flex flex-col gap-2 pt-6">
            <button
              type="button"
              onClick={() => {
                addToQuote({
                  slug: product.slug,
                  name: product.name,
                  flavor: flavor || undefined,
                  size: size?.label,
                  unitPrice: price,
                  quantity: 1,
                })
                onClose()
              }}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition hover:bg-primary/85"
            >
              <ShoppingBagIcon className="size-4" /> Agregar a mi cotización
            </button>
            <Link
              href={`/productos/${product.slug}`}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border text-sm font-medium transition hover:bg-muted"
            >
              Ver detalles <ArrowRightIcon className="size-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>,
    document.body
  )
}
