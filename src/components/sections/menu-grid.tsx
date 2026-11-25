import { Reveal } from "@/components/motion/reveal"
import { ProductCard } from "@/components/product/product-card"
import { products } from "@/data/products"

export function MenuGrid() {
  return (
    <section id="menu" aria-labelledby="menu-title" className="mx-auto max-w-7xl scroll-mt-20 px-4 pt-20 sm:px-6">
      <Reveal>
        <p className="eyebrow text-brand-indigo">Nuestro menú</p>
        <h2 id="menu-title" className="mt-2 text-3xl font-semibold sm:text-4xl">
          Antojos hechos a mano
        </h2>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 4) * 0.08} className="h-full">
            <ProductCard product={p} className="h-full" />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
