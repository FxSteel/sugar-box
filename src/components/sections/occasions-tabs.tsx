"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRightIcon, CakeIcon, CheckIcon, GiftIcon, PartyPopperIcon, SnowflakeIcon } from "lucide-react"

import { getProduct } from "@/data/products"
import { cn } from "@/lib/utils"

const img = (slug: string) => getProduct(slug)?.images?.[0] ?? "/brand/caja-navidad.jpg"

// TODO: validar textos de ocasiones con el cliente
const occasions = [
  {
    id: "cumpleanos",
    label: "Cumpleaños",
    icon: CakeIcon,
    title: "El pastel que todos recuerdan",
    body: "Pasteles personalizados con mensaje, colores y tema de la fiesta.",
    bullets: ["Mensaje y decoración a tu gusto", "Desde 8 hasta 25 porciones", "Pedido con 48 h de anticipación"],
    href: "/productos/pastel-de-chocolate",
    image: img("pastel-de-chocolate"),
  },
  {
    id: "navidad",
    label: "Navidad",
    icon: SnowflakeIcon,
    title: "Dulces que saben a diciembre",
    body: "Galletas de jengibre, mini churros y nuestra caja edición Navidad.",
    bullets: ["Edición limitada de temporada", "Tarjeta con mensaje incluida", "Cupos por día de entrega"],
    href: "/productos/caja-navidena-sugar-box",
    image: img("galletas-de-jengibre"),
  },
  {
    id: "fiestas",
    label: "Fiestas",
    icon: PartyPopperIcon,
    title: "Mesa de postres sin estrés",
    body: "Cupcakes, mini donas y brownies para que nadie se quede sin su antojo.",
    bullets: ["Mezcla varios productos", "Precio por volumen", "Ideal para fiestas infantiles"],
    href: "/productos/cupcakes-surtidos",
    image: img("cupcakes-surtidos"),
  },
  {
    id: "regalos",
    label: "Regalos",
    icon: GiftIcon,
    title: "Un detalle que se come",
    body: "Arma una caja con sus favoritos y la entregamos lista para regalar.",
    bullets: ["Empaque de regalo", "Mensaje personalizado", "Entrega a domicilio"],
    href: "/productos/mini-churros-clasicos",
    image: img("donas-glaseadas"),
  },
]

export function OccasionsTabs() {
  const [activeId, setActiveId] = useState(occasions[0].id)
  const active = occasions.find((o) => o.id === activeId)!

  return (
    <section aria-labelledby="ocasiones-title" className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
      <div className="text-center">
        <p className="eyebrow text-brand-indigo">Para cada ocasión</p>
        <h2 id="ocasiones-title" className="mt-2 text-3xl font-semibold sm:text-4xl">
          ¿Qué celebramos hoy?
        </h2>
      </div>

      <div
        role="tablist"
        aria-label="Ocasiones"
        className="mx-auto mt-8 flex w-fit max-w-full gap-1 overflow-x-auto rounded-full border bg-muted/60 p-1"
      >
        {occasions.map((o) => {
          const selected = o.id === activeId
          return (
            <button
              key={o.id}
              type="button"
              role="tab"
              id={`tab-${o.id}`}
              aria-selected={selected}
              aria-controls={`panel-${o.id}`}
              onClick={() => setActiveId(o.id)}
              className={cn(
                "relative flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                selected ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {selected && (
                <motion.span
                  layoutId="occasion-indicator"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <o.icon className="relative size-4" />
              <span className="relative">{o.label}</span>
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${active.id}`}
        aria-labelledby={`tab-${active.id}`}
        className="mt-10 grid items-center gap-8 md:grid-cols-2 md:gap-14"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-muted">
          <AnimatePresence initial={false}>
            <motion.div
              key={active.id}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.08, clipPath: "inset(0 0 0 100% round 1.5rem)" }}
              animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0 0% round 1.5rem)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src={active.image} alt={active.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-3xl font-semibold sm:text-4xl">{active.title}</h3>
            <p className="mt-3 text-lg text-muted-foreground">{active.body}</p>
            <ul className="mt-6 space-y-3">
              {active.bullets.map((b, i) => (
                <motion.li
                  key={b}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07 }}
                >
                  <span className="grid size-6 place-items-center rounded-full bg-brand-butter text-brand-night">
                    <CheckIcon className="size-3.5" />
                  </span>
                  {b}
                </motion.li>
              ))}
            </ul>
            <Link
              href={active.href}
              className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary/85"
            >
              Cotizar para {active.label.toLowerCase()} <ArrowRightIcon className="size-4" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
