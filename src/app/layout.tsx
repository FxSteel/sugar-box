import type { Metadata, Viewport } from "next"
import { Dancing_Script, Fredoka, Jost } from "next/font/google"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { QuoteSheet } from "@/components/quote/quote-sheet"
import { MotionProvider } from "@/components/motion/motion-provider"
import { JsonLd } from "@/components/seo/json-ld"
import { isProduction, site } from "@/config/site"
import { bakerySchema } from "@/lib/schema"
import "./globals.css"

// TODO: confirmar tipografías oficiales con el brandbook (estas son equivalentes provisionales)
const fredoka = Fredoka({ variable: "--font-fredoka", subsets: ["latin"], weight: ["500", "600", "700"] })
const jost = Jost({ variable: "--font-jost", subsets: ["latin"] })
const dancing = Dancing_Script({ variable: "--font-dancing", subsets: ["latin"], weight: ["500", "600"] })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Pastelería, mini churros y postres`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es",
    siteName: site.name,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: isProduction ? { index: true, follow: true } : { index: false, follow: false },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={site.locale}
      className={`${fredoka.variable} ${jost.variable} ${dancing.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#contenido"
          className="sr-only z-50 rounded-lg bg-primary px-3 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Saltar al contenido
        </a>
        <MotionProvider>
          <SiteHeader />
          <main id="contenido" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <QuoteSheet />
        </MotionProvider>
        <JsonLd data={bakerySchema()} />
      </body>
    </html>
  )
}
