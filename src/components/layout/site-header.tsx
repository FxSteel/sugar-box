import Link from "next/link"

import { Logo } from "@/components/brand/logo"
import { QuoteTrigger } from "@/components/layout/quote-trigger"

export const navLinks = [
  { href: "/#menu", label: "Menú" },
  { href: "/#temporada", label: "Temporada" },
  { href: "/#como-pedir", label: "Cómo pedir" },
  { href: "/#preguntas", label: "Preguntas" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/85 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" aria-label="The Sugar Box — inicio" className="shrink-0">
          <Logo />
        </Link>
        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-7 text-sm text-muted-foreground">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <QuoteTrigger />
      </div>
    </header>
  )
}
