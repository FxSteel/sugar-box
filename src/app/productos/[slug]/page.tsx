import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { notFound } from "next/navigation"
import { ArrowRightIcon } from "lucide-react"

import { BuyBox } from "@/components/product/buy-box"
import { ProductCard } from "@/components/product/product-card"
import { ProductGallery } from "@/components/product/product-gallery"
import { ProductReviews } from "@/components/product/product-reviews"
import { JsonLd } from "@/components/seo/json-ld"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { categoryName, getProduct, products, relatedProducts } from "@/data/products"
import { breadcrumbSchema, productSchema } from "@/lib/schema"

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<"/productos/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return {}
  return {
    title: product.name,
    description: product.description.slice(0, 158),
    alternates: { canonical: `/productos/${product.slug}` },
    openGraph: { title: product.name, description: product.short, url: `/productos/${product.slug}` },
  }
}

export default function ProductPage({ params }: PageProps<"/productos/[slug]">) {
  // Los slugs conocidos se prerenderizan completos; el fallback solo aplica a URLs nuevas.
  return (
    <Suspense fallback={<div className="mx-auto min-h-[80vh] max-w-7xl px-4 pt-6 sm:px-6" />}>
      <ProductContent params={params} />
    </Suspense>
  )
}

async function ProductContent({ params }: { params: PageProps<"/productos/[slug]">["params"] }) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  const related = relatedProducts(product)

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/" />}>Inicio</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/#menu" />}>{categoryName(product.category)}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-6 grid items-start gap-10 lg:grid-cols-2">
        <ProductGallery product={product} />
        <BuyBox product={product} />
      </div>

      <section aria-labelledby="details-title" className="mt-16 border-t py-12">
        <h2 id="details-title" className="font-sans text-xl font-semibold">
          Detalles del producto
        </h2>
        <div className="mt-6 grid gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow text-muted-foreground">Sobre este antojo</p>
            <p className="mt-3 leading-relaxed">{product.description}</p>
          </div>
          <div>
            <p className="eyebrow text-muted-foreground">Especificaciones</p>
            <dl className="mt-3 divide-y text-sm">
              {product.specs.map((s) => (
                <div key={s.label} className="grid grid-cols-[8rem_1fr] gap-4 py-3">
                  <dt className="text-xs text-muted-foreground">{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <ProductReviews reviews={product.reviews ?? []} />

      <section aria-labelledby="related-title" className="border-t py-12">
        <div className="flex items-center justify-between">
          <h2 id="related-title" className="font-sans text-xl font-semibold">
            También te puede gustar
          </h2>
          <Link href="/#menu" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            Ver todo <ArrowRightIcon className="size-4" />
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <JsonLd data={productSchema(product)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: categoryName(product.category), path: "/#menu" },
          { name: product.name, path: `/productos/${product.slug}` },
        ])}
      />
    </div>
  )
}
