import { MessageCircleIcon, StarIcon } from "lucide-react"

import { Rating } from "@/components/reui/rating"
import type { Review } from "@/data/products"

/** Resumen de reseñas. Solo muestra reseñas reales; sin datos, invita a dejar la primera. */
export function ProductReviews({ reviews }: { reviews: Review[] }) {
  const total = reviews.length
  const avg = total ? reviews.reduce((s, r) => s + r.rating, 0) / total : 0
  const featured = reviews[0]

  return (
    <section aria-labelledby="reviews-title" className="border-t py-12">
      <h2 id="reviews-title" className="font-sans text-xl font-semibold">
        Lo que dicen nuestros clientes
      </h2>

      {total === 0 ? (
        <div className="mt-6 flex flex-col items-start gap-3 rounded-2xl border border-dashed p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <StarIcon className="size-5 text-brand-butter" />
            <p className="text-sm text-muted-foreground">
              Aún no hay reseñas de este producto. ¿Ya lo probaste? Cuéntanos qué te pareció.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium">
            <MessageCircleIcon className="size-4" /> Escríbenos por WhatsApp
          </span>
        </div>
      ) : (
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow text-muted-foreground">Calificación</p>
            <p className="mt-3 text-4xl font-semibold">
              {avg.toFixed(1)} <span className="text-base font-normal text-muted-foreground">/ 5</span>
            </p>
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Rating rating={avg} size="sm" /> {total} reseñas
            </div>
            <ul className="mt-5 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const n = reviews.filter((r) => Math.round(r.rating) === star).length
                return (
                  <li key={star} className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="w-6">{star}★</span>
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                      <span className="block h-full rounded-full bg-primary" style={{ width: `${(n / total) * 100}%` }} />
                    </span>
                    <span className="w-6 text-right tabular-nums">{n}</span>
                  </li>
                )
              })}
            </ul>
          </div>
          {featured && (
            <figure>
              <p className="eyebrow text-muted-foreground">Reseña destacada</p>
              <Rating rating={featured.rating} size="sm" className="mt-3" />
              <p className="mt-3 font-semibold">{featured.title}</p>
              <blockquote className="mt-3 border-l-2 pl-4 text-sm text-muted-foreground">{featured.body}</blockquote>
              <figcaption className="mt-4 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{featured.author}</span> · {featured.date}
              </figcaption>
            </figure>
          )}
        </div>
      )}
    </section>
  )
}
