import Image from "next/image"

import { Sparkle } from "@/components/brand/decor"
import { products } from "@/data/products"
import { cn } from "@/lib/utils"

// Máscaras de formas mezcladas para el ticker de fotos
const shapes = [
  "size-36 rounded-full sm:size-44",
  "h-44 w-36 rounded-t-full rounded-b-3xl sm:h-52 sm:w-44",
  "h-36 w-56 rounded-full sm:h-44 sm:w-72",
  "size-36 rounded-[38%_62%_55%_45%/48%_40%_60%_52%] sm:size-44",
  "size-36 rounded-[2.5rem] sm:size-44",
  "h-44 w-36 rounded-b-full rounded-t-3xl sm:h-52 sm:w-44",
]

const words = ["Mini churros", "Pasteles", "Galletas", "Cheesecakes", "Cupcakes", "Brownies", "Donas", "Cajas de regalo"]

export function PhotoMarquee() {
  const photos = products.filter((p) => p.images?.[0])
  const row = photos.map((p, i) => ({ p, shape: shapes[i % shapes.length] }))

  return (
    <section aria-label="Nuestros antojos" className="overflow-hidden pt-16 pb-4">
      {/* Fila de fotos con máscaras de formas */}
      <div className="group flex [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <ul className="flex shrink-0 animate-marquee items-center gap-5 pr-5 [--marquee-duration:55s] group-hover:[animation-play-state:paused]">
          {[...row, ...row].map(({ p, shape }, i) => (
            <li
              key={`${p.slug}-${i}`}
              aria-hidden={i >= row.length || undefined}
              className={cn("relative shrink-0 overflow-hidden", shape)}
            >
              <Image
                src={p.images![0]}
                alt={i >= row.length ? "" : p.name}
                fill
                sizes="288px"
                className="object-cover transition-transform duration-700 hover:scale-110"
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Texto en dirección contraria */}
      <div className="mt-8 flex border-y bg-brand-butter/30 py-4" aria-hidden="true">
        <div className="flex shrink-0 animate-marquee-reverse items-center [--marquee-duration:35s]">
          {[...words, ...words, ...words, ...words].map((w, i) => (
            <span key={i} className="flex items-center gap-6 px-6 font-heading text-2xl font-semibold whitespace-nowrap sm:text-3xl">
              {w}
              <Sparkle className="size-4 text-brand-indigo" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
