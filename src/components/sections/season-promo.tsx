import Link from "next/link"
import { ArrowRightIcon, ClockIcon, GiftIcon, MessageCircleIcon, TruckIcon } from "lucide-react"

import { SparkleField } from "@/components/brand/decor"
import { ProductArt } from "@/components/brand/product-art"
import { Reveal } from "@/components/motion/reveal"
import { Countdown } from "@/components/sections/countdown"
import { site } from "@/config/site"

// TODO: confirmar condiciones reales (zona de entrega, montos, promos) con el cliente
const perks = [
  {
    icon: TruckIcon,
    title: "Entrega a domicilio",
    body: "Llevamos tu pedido recién hecho. Consulta tu zona al cotizar.",
    cta: "Ver zonas",
    href: "#preguntas",
  },
  {
    icon: GiftIcon,
    title: "Arma tu caja",
    body: "Mezcla churros, galletas y postres en una sola caja de regalo.",
    cta: "Armar mi caja",
    href: "#menu",
  },
  {
    icon: MessageCircleIcon,
    title: "Cotiza por WhatsApp",
    body: "Sin pagos en línea: te confirmamos precio y entrega en minutos.",
    cta: "Cómo pedir",
    href: "#como-pedir",
  },
]

export function SeasonPromo() {
  return (
    <section id="temporada" aria-labelledby="temporada-title" className="mx-auto max-w-7xl scroll-mt-20 px-4 pt-20 sm:px-6">
      <div className="relative isolate overflow-hidden rounded-2xl bg-linear-to-br from-brand-indigo to-brand-indigo-dark p-6 sm:p-10">
        <SparkleField />
        <div className="absolute inset-y-0 right-0 -z-10 hidden w-1/2 md:block">
          <ProductArt tone="pink" icon="gift" className="[mask-image:linear-gradient(to_right,transparent,black_35%)]" iconClassName="size-1/3" />
        </div>

        <div className="flex justify-end">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-white">
            <span className="size-1.5 rounded-full bg-white" /> Abierto
          </span>
        </div>

        <div className="mt-16 max-w-xl sm:mt-24">
          <p className="font-script text-3xl text-brand-cream">{site.slogan}</p>
          <h2 id="temporada-title" className="mt-2 text-5xl leading-none font-semibold text-white sm:text-7xl">
            Caja Navideña
          </h2>
          <p className="mt-4 text-lg text-white">Mini churros, galletas de jengibre y dulces de temporada.</p>
          <p className="mt-2 max-w-md text-white/75">
            Nuestra caja edición Navidad, lista para regalar. Cupos limitados por día de entrega.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              href="/productos/caja-navidena-sugar-box"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-brand-indigo-dark transition hover:bg-brand-cream"
            >
              Cotizar la caja <ArrowRightIcon className="size-4" />
            </Link>
            <Link href="#menu" className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:underline">
              ¿Qué incluye? <ArrowRightIcon className="size-4" />
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/15 pt-4 text-xs text-white/70">
            <ClockIcon className="size-3.5" />
            <span>
              Pedidos cierran en <Countdown target={site.seasonDeadline} />
            </span>
          </div>
        </div>
      </div>

      <ul className="mt-3 grid gap-3 md:grid-cols-3">
        {perks.map((p, i) => (
          <Reveal as="li" key={p.title} delay={i * 0.1} className="flex h-full flex-col rounded-2xl border p-5">
            <p.icon className="size-5 text-brand-indigo" strokeWidth={1.5} />
            <h3 className="mt-5 font-sans font-semibold">{p.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
            <Link href={p.href} className="mt-4 inline-flex items-center gap-1 text-sm font-medium hover:underline">
              {p.cta} <ArrowRightIcon className="size-3.5" />
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
