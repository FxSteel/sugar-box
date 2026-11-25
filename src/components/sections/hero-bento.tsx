import Link from "next/link"
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react"

import { SparkleField, Waves } from "@/components/brand/decor"
import { LogoMark } from "@/components/brand/logo"
import { Float } from "@/components/motion/float"
import { HeroProductTile } from "@/components/sections/hero-product-tile"
import { site } from "@/config/site"
import { getProduct } from "@/data/products"

// TODO: elegir con el cliente qué productos destacar en el hero
const tileSlugs = ["mini-churros-clasicos", "galletas-de-jengibre", "pastel-de-chocolate"]

export function HeroBento() {
  const [first, second, third] = tileSlugs.map((s) => getProduct(s)!)
  return (
    <section aria-labelledby="hero-title" className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:h-[600px] lg:grid-cols-4 lg:grid-rows-2">
        {/* Tile de campaña */}
        <div className="relative isolate flex min-h-[480px] flex-col justify-between overflow-hidden rounded-2xl bg-brand-indigo p-6 sm:col-span-2 sm:p-8 lg:row-span-2">
          <SparkleField />
          <Waves className="absolute inset-x-0 bottom-0 -z-10 h-24" />
          <Float className="absolute top-10 right-6 -z-10 max-sm:hidden lg:top-12 lg:right-10">
            <LogoMark className="size-40 text-[1.9rem] sm:size-52 sm:text-[2.4rem]" />
          </Float>

          <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-brand-cream">
            <span>Temporada 2026 · Edición Navidad</span>
            <span className="tracking-normal normal-case opacity-80">{site.tagline}</span>
          </p>

          <div className="max-w-md pb-10">
            <h1
              id="hero-title"
              className="text-4xl leading-[1.05] font-semibold text-balance text-white sm:text-5xl"
            >
              Mini churros y postres que endulzan tu Navidad.
            </h1>
            <p className="mt-4 text-white/80">
              Pastelería y repostería hecha a mano, al momento y con mucho azúcar. Arma tu caja y cotiza
              tu pedido por WhatsApp.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                href="#menu"
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-brand-indigo-dark transition hover:bg-brand-cream"
              >
                Arma tu caja <ArrowRightIcon className="size-4" />
              </Link>
              <Link
                href="#temporada"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:underline"
              >
                Ver edición Navidad <ArrowUpRightIcon className="size-4" />
              </Link>
            </div>
          </div>
        </div>

        <HeroProductTile product={first} delay={0.1} className="aspect-square lg:aspect-auto" />
        <HeroProductTile product={second} delay={0.2} className="aspect-square lg:aspect-auto" />
        <HeroProductTile product={third} delay={0.3} className="aspect-square lg:aspect-auto" />

        {/* Tile de promo */}
        <div className="flex aspect-square flex-col justify-between rounded-2xl bg-brand-cream p-6 text-brand-indigo-dark lg:aspect-auto">
          <div>
            <p className="eyebrow opacity-70">Por tiempo limitado</p>
            <p className="mt-3 font-heading text-4xl leading-none font-semibold">
              Caja Navideña
              <span className="mt-1 block text-brand-indigo">-20%</span>
            </p>
          </div>
          <div className="flex items-end justify-between gap-3 text-sm">
            <p className="opacity-70">Pedidos hasta el 22 de diciembre</p>
            <Link
              href="/productos/caja-navidena-sugar-box"
              className="inline-flex shrink-0 items-center gap-1 font-semibold hover:underline"
            >
              Cotizar <ArrowRightIcon className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
