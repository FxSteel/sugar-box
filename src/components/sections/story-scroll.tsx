"use client"

import Image from "next/image"
import { useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react"

import { getProduct } from "@/data/products"
import { cn } from "@/lib/utils"

const img = (slug: string) => getProduct(slug)?.images?.[0] ?? "/brand/caja-navidad.jpg"

// TODO: reemplazar por fotos propias del proceso (cocina, decoración, empaque)
const steps = [
  {
    eyebrow: "01 · La masa",
    title: "Todo empieza temprano",
    body: "Preparamos la masa cada mañana con ingredientes frescos. Nada de mezclas de caja.",
    image: img("mini-churros-clasicos"),
  },
  {
    eyebrow: "02 · El horno",
    title: "Recién salidos",
    body: "Freímos y horneamos el día de tu pedido, para que llegue crujiente y suave.",
    image: img("pastel-de-chocolate"),
  },
  {
    eyebrow: "03 · El detalle",
    title: "Decoración con cariño",
    body: "Glaseados, sprinkles y salsas para dipear: cada pieza sale lista para la foto.",
    image: img("galletas-de-jengibre"),
  },
  {
    eyebrow: "04 · Tu caja",
    title: "Directo a tu Sugar Box",
    body: "Lo empacamos en nuestra caja de colores, lista para regalar o para consentirte.",
    image: "/brand/caja-navidad.jpg",
  },
]

export function StoryScroll() {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(steps.length - 1, Math.floor(v * steps.length)))
  })

  const step = steps[active]

  return (
    <section
      ref={ref}
      aria-labelledby="historia-title"
      className="relative mt-16"
      style={{ height: `${steps.length * 85}vh` }}
    >
      <div className="sticky top-16 flex h-[calc(100svh-4rem)] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 sm:px-6 md:grid-cols-2 md:gap-16">
          <div className="order-2 md:order-1">
            <p className="eyebrow text-brand-indigo">Así nace tu caja</p>
            <h2 id="historia-title" className="sr-only">
              Así nace tu caja
            </h2>

            <div className="relative mt-4 min-h-56 sm:min-h-64">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active}
                  className="absolute inset-0"
                  initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -24, filter: "blur(6px)", transition: { duration: 0.25 } }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-sm font-medium text-muted-foreground">{step.eyebrow}</p>
                  <p className="mt-2 font-heading text-4xl leading-tight font-semibold sm:text-6xl">
                    {step.title}
                  </p>
                  <p className="mt-4 max-w-md text-lg text-muted-foreground">{step.body}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progreso por pasos */}
            <div className="mt-8 flex gap-2" aria-hidden="true">
              {steps.map((s, i) => (
                <StepBar key={s.title} progress={scrollYProgress} index={i} />
              ))}
            </div>
          </div>

          <div className="relative order-1 aspect-[4/3] md:order-2 md:aspect-square">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                className={cn("absolute inset-0 overflow-hidden rounded-3xl", i === 3 && "bg-brand-indigo")}
                initial={false}
                animate={{
                  opacity: i === active ? 1 : 0,
                  scale: i === active ? 1 : i < active ? 0.92 : 1.08,
                  rotate: i === active ? 0 : i < active ? -4 : 4,
                }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className={cn("object-cover", i === 3 && "object-[50%_35%]")}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/** Barra del paso `index`: se llena 0→1 durante su tramo del scroll. */
function StepBar({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const scaleX = useTransform(progress, [index / steps.length, (index + 1) / steps.length], [0, 1])
  return (
    <span className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
      <motion.span className="block h-full origin-left rounded-full bg-primary" style={{ scaleX }} />
    </span>
  )
}
