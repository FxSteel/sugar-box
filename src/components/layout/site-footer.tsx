import Link from "next/link"

import { Waves } from "@/components/brand/decor"
import { Logo } from "@/components/brand/logo"
import { navLinks } from "@/components/layout/site-header"
import { site } from "@/config/site"
import { categories } from "@/data/products"

export function SiteFooter() {
  const social = Object.entries(site.social).filter(([, url]) => url)
  return (
    <footer className="relative mt-24 bg-brand-indigo">
      <Waves className="absolute -top-px left-0 h-10 -translate-y-full sm:h-16" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="space-y-3 md:col-span-2">
          <Logo />
          <p className="font-script text-2xl text-brand-cream">{site.slogan}</p>
          <p className="max-w-sm text-sm text-white/75">{site.description}</p>
        </div>
        <div>
          <p className="eyebrow mb-4 text-brand-cream">Menú</p>
          <ul className="space-y-2 text-sm text-white/80">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/#menu`} className="hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4 text-brand-cream">The Sugar Box</p>
          <ul className="space-y-2 text-sm text-white/80">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
            {social.map(([name, url]) => (
              <li key={name}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="capitalize hover:text-white">
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-4 py-5 text-xs text-white/60 sm:flex-row sm:px-6">
          <p>© <CurrentYear /> {site.name}. Hecho con azúcar y cariño.</p>
          <p className="eyebrow">{site.tagline}</p>
        </div>
      </div>
    </footer>
  )
}

async function CurrentYear() {
  "use cache"
  return new Date().getFullYear()
}
