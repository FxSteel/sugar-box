# The Sugar Box — Landing Page

@AGENTS.md

Sitio web oficial de **The Sugar Box**, tienda de postres, pastelería y repostería (pasteles, dulces, mini churros, cajas de regalo). La marca **nunca ha tenido website**: este es su primer sitio, así que debe verse moderno, cargar rápido y posicionar bien en Google desde el día uno.

- **Slogan principal (web):** "Mini churros • Felicidad en grande" (en la caja: "Mini churros • Big happiness")
- **Frase emocional (web):** "Momentos dulces, sonrisas más grandes" (en la caja: "Sweet moments, bigger smiles")
- **Idioma:** todo el sitio en **español**, sin mezclar inglés (incluidos slogans, `aria-label` y textos ocultos). Decisión del cliente.
- **Enfoque:** siempre comida, siempre lo dulce primero. Las fotos de producto son las protagonistas.
- **Referencia visual:** `docs/brand/caja-navidad.jpeg` (diseño de la caja, edición navideña).
- **Repositorio:** https://github.com/FxSteel/sugar-box (rama `main` = producción en Dokploy)

---

## Objetivos del proyecto

1. Landing page moderna, mobile-first, que transmita lo mismo que la caja: alegre, juguetona, golosa.
2. **Cotizador → WhatsApp**: el cliente arma su pedido y lo envía por WhatsApp. **No hay checkout ni pagos en línea.** Cada cotización se registra también en el servidor (PostgreSQL + n8n).
3. **SEO técnico impecable**: indexado en Google, verificado en Google Search Console, rich results (Bakery / LocalBusiness / Product), Core Web Vitals en verde.
4. Despliegue estable en producción con dominio propio y HTTPS.

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | **Next.js 16** (App Router, Turbopack, `cacheComponents` activo) + TypeScript. Leer `node_modules/next/dist/docs/` antes de usar APIs: hay breaking changes (params async, `proxy` en vez de `middleware`, `dynamicParams` no compatible con cacheComponents, `new Date()` en server components requiere `"use cache"`) |
| Estilos | **Tailwind CSS v4** con tokens de marca en CSS variables |
| Componentes | shadcn/ui estilo `base-nova` (**Base UI**, no Radix: se usa la prop `render` en vez de `asChild`) + registry libre de **ReUI** (`@reui/*`). `cn` viene del paquete `cn` re-exportado en `@/lib/utils` |
| Animación | Transiciones CSS (Motion instalado para casos puntuales) — sutil, respetando `prefers-reduced-motion` |
| Formularios | Zod en el servidor (`/api/lead`); formularios simples con estado de React |
| Automatización | **n8n** vía webhooks (llamados solo desde el servidor) |
| Imágenes | `next/image` (AVIF/WebP, `sizes` correctos, `priority` solo en el hero) |
| Base de datos | **PostgreSQL** propio (en nuestros servidores, gestionado desde Dokploy) + **Drizzle ORM** |
| Analítica | Google Analytics 4 + Google Search Console (+ Umami self-hosted en Dokploy, opcional) |
| Hosting | **Dokploy** en servidores propios (Docker + Traefik, HTTPS con Let's Encrypt) |
| Package manager | pnpm |

> **Infraestructura 100% propia.** Nada de Vercel, Supabase, Netlify ni otros SaaS de hosting/BaaS. App, base de datos y n8n viven en nuestros servidores. No agregar dependencias que asuman esas plataformas (`@vercel/*`, `@supabase/*`, `VERCEL_ENV`, Edge Runtime, etc.).

### Comandos

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # build de producción (debe pasar sin errores ni warnings de tipos)
pnpm lint
pnpm start
pnpm db:generate  # genera migraciones Drizzle a partir del schema
pnpm db:migrate   # aplica migraciones a la DB de DATABASE_URL
docker build -t sugar-box .   # probar localmente la misma imagen que construye Dokploy
```

Componentes shadcn se agregan con `pnpm dlx shadcn@latest add <componente>` y los libres de ReUI con `pnpm dlx shadcn@latest add @reui/<componente>` (ej. `@reui/rating` → `src/components/reui/`). No reescribir a mano componentes que ya existen.

---

## Identidad de marca

Extraída del diseño de la caja. **Valores hex aproximados — confirmar con el brandbook oficial** cuando llegue.

### Colores

| Token | Hex aprox. | Uso |
|---|---|---|
| `--brand-indigo` | `#3B2C9E` | Color principal. Fondos de hero, header, footer, secciones destacadas |
| `--brand-indigo-dark` | `#2A1F75` | Hover, sombras, texto sobre fondos claros |
| `--brand-pink` | `#F5B5C8` | Blob del logo, CTAs secundarios, acentos |
| `--brand-sky` | `#A9CDEB` | Olas/blobs decorativos, fondos de tarjetas |
| `--brand-butter` | `#F7C86A` | Olas/blobs, badges, destacados, estrellitas |
| `--brand-cream` | `#F8DCC8` | Texto sobre índigo (taglines, script), iconos lineales |
| `--brand-white` | `#FFFFFF` | Texto principal sobre índigo |

Reglas:
- **Fondo del sitio blanco** (decisión del cliente). El índigo se usa solo en superficies de marca: tile principal del hero, banner de temporada y footer. Botones principales oscuros (`--primary` = `--brand-night`, texto blanco).
- El resto de colores son acentos. No usar más de 2 acentos fuertes por sección.
- Contraste mínimo WCAG AA (4.5:1 en texto normal). Crema/blanco sobre índigo cumple; **rosa o amarillo sobre blanco no** para texto pequeño.
- Mapear estos tokens a las variables de shadcn/ReUI (`--primary`, `--secondary`, `--accent`, etc.) en `globals.css`, no hardcodear hex en componentes.

### Tipografías

Tres familias, como en la caja (confirmar nombres exactos con el brandbook; mientras tanto usar estas equivalentes de Google Fonts vía `next/font`):

| Rol | En la caja | Fuente provisional |
|---|---|---|
| Display / logo | "the Sugar box" — redondeada, gorda, bubbly | **Fredoka** (600–700) o similar redondeada |
| Etiquetas / UI | "MINI CHURROS • BIG HAPPINESS" — sans geométrica, mayúsculas, tracking amplio | **Jost** / **Josefin Sans** |
| Script / emocional | "Sweet moments, bigger smiles" — manuscrita monolínea | **Dancing Script** / **Caveat** |

Reglas: el script solo para frases cortas emocionales (nunca párrafos ni botones). Cuerpo de texto en la sans, ≥16px.

### Elementos gráficos

- **Olas/blobs** orgánicos en azul cielo y mantequilla en los bordes inferiores de las secciones (usar SVG, no imágenes).
- **Estrellitas, destellos y corazones** lineales en crema, dispersos con baja densidad.
- **Logo:** blob rosa que "chorrea" con el texto en índigo. *Pendiente: el cliente entregará los archivos (SVG preferido).* Guardar en `public/brand/`.
- **Ediciones temáticas:** la caja actual es navideña (gorro de Santa, árbol, bastones, galleta de jengibre, copos). El sitio debe permitir activar decoración de temporada (Navidad, San Valentín, etc.) sin tocar el layout base — p. ej. un flag `SEASON` en config.

### Tono de voz

Cálido, alegre, cercano, un poco travieso. Frases cortas. Hablar de momentos y antojos, no de "productos". Todo en español, sin anglicismos ni frases en inglés.

---

## Referencias de diseño (estilo del sitio)

Capturas en `docs/design/`. Estilo **e-commerce editorial**: fotos grandes con bordes redondeados, tipografía grande y limpia, badges de descuento, mucho aire, microinteracciones sutiles. Las referencias son oscuras/neutras: **se toma la estructura y el layout, no la paleta** — se adaptan a los colores de la marca (índigo como fondo base, rosa/mantequilla/cielo como acentos, crema para texto secundario).

| Captura | Uso en Sugar Box | Bloque ReUI base |
|---|---|---|
| `01-hero-bento-grid.png` | Hero principal: tile grande de campaña + productos con quick-add + tile de promo | `shop-hero-2` (Bento Shop Hero) |
| `02-promo-hero-con-perks.png` | Banner de oferta/temporada con cuenta regresiva + 3 tarjetas de beneficios (envío, combos, primer pedido) | `shop-hero-3` (Countdown Deal Hero) |
| `03-product-card.png` / `04-product-card-hover-favorito.png` | Tarjeta de producto: badge de descuento, categoría, variantes (sabores en vez de colores), precio con tachado. **Hover: zoom suave a la imagen + aparece botón de favorito** | `product-card-2` (Colorway Catalog), ajustada |
| `05-compact-buy-box.png` | Página de producto: galería con miniaturas + buy box (rating, precio, bullets, sabor, tamaño/porciones, cantidad, agregar, pedir ahora, favorito) | `product-detail-5` (Compact Buy Box) |
| `06-buy-box-scroll-detalles.png` | Al hacer scroll: "Detalles" (descripción + tabla de specs: porciones, ingredientes, alérgenos, conservación) | incluido en `product-detail-5` |
| `07-buy-box-scroll-reviews-relacionados.png` | Reseñas (promedio + barras por estrella + carrusel destacado) y "También te puede gustar" | `review-*` + `product-card-4` (Related Products) |

Reglas de adaptación:
- Hover de imagen: `scale-105` con `transition-transform duration-500`, contenedor con `overflow-hidden`; el favorito aparece con fade (`opacity-0 group-hover:opacity-100`) y en mobile siempre visible (no hay hover en touch).
- Variantes de producto = sabores / tamaños / porciones, no colores.
- Ratings y reseñas solo si son reales (y entonces con schema `AggregateRating`); si no hay, se oculta la sección.
- Los bloques de la tabla son Pro (licencia de pago, no disponible por ahora): **se construyeron a mano** replicando su layout con componentes base. Si se adquiere la licencia, se pueden instalar con `pnpm dlx shadcn@latest add @reui/<slug>` y adaptar.

### Implementación actual

| Referencia | Componente |
|---|---|
| Hero bento | `components/sections/hero-bento.tsx` + `hero-product-tile.tsx` |
| Promo + perks | `components/sections/season-promo.tsx` (+ `countdown.tsx`) |
| Product card | `components/product/product-card.tsx` (zoom + favorito en hover; en touch el favorito siempre visible) |
| Compact buy box | `components/product/product-gallery.tsx` + `buy-box.tsx` |
| Detalles / reseñas / relacionados | `app/productos/[slug]/page.tsx` + `product-reviews.tsx` |

**Fotos:** mientras no haya fotografía real se usa `ProductArt` (ilustración de marca con ícono y color por producto). Al llegar las fotos se agregan en `product.images` y `ProductMedia` usa `next/image` automáticamente.

### Animaciones (Motion, `motion/react`)

| Patrón | Dónde |
|---|---|
| UI morph / shared layout (`layoutId`) | Tarjeta de producto → vista rápida (`product/quick-view.tsx`); botón `+` → "✓ Agregado" |
| Tabs con indicador animado (`layoutId`) | `sections/occasions-tabs.tsx` — "Para cada ocasión" |
| Scrollytelling en sección fija | `sections/story-scroll.tsx` — "Así nace tu caja" (`useScroll` + `position: sticky`) |
| Marquee infinito con máscaras de formas | `sections/photo-marquee.tsx` (CSS `animate-marquee`, pausa en hover) |
| Entradas al hacer scroll / hero | `motion/reveal.tsx` (`as="li"` dentro de listas), `motion/float.tsx`, tiles del hero |

Reglas:
- `MotionProvider` (`reducedMotion="user"`) envuelve el layout: con `prefers-reduced-motion` se desactivan transformaciones y el marquee se detiene.
- No animar la opacidad del `h1` ni del texto del hero (afecta LCP).
- Diálogos que hacen morph se renderizan con `createPortal` (los `Reveal` aplican `transform`, que rompe `position: fixed`).

---

## Estructura de la landing

Una página principal (`/`) con secciones ancladas, más páginas de soporte para SEO:

1. **Header** sticky: logo, nav (Productos, Cajas, Nosotros, Pedidos, Contacto), CTA "Haz tu pedido".
2. **Hero** índigo con logo, slogan, foto/ilustración principal, CTA primario (pedido) y secundario (ver menú).
3. **Productos destacados**: grid de tarjetas (foto, nombre, descripción corta, precio "desde", badge).
4. **Categorías**: Pasteles · Postres · Dulces · Mini churros · Cajas de regalo.
5. **Arma tu caja / Cajas temáticas** (temporada actual).
6. **Por qué nosotros**: hecho a mano, ingredientes, frescura, entrega.
7. **Testimonios** (reales, nunca inventados).
8. **Cotizador** (sheet lateral) → WhatsApp + registro en `/api/lead`.
9. **FAQ** (con schema `FAQPage`).
10. **Ubicación y horario** (mapa embebido lazy, NAP consistente).
11. **Footer**: redes, WhatsApp, horario, dirección, links legales.

Páginas adicionales recomendadas: `/productos/[slug]`, `/nosotros`, `/contacto`, `/politica-de-privacidad`, `/terminos`. Contenido de productos en archivos locales tipados (`content/` o `src/data/`) hasta que exista un CMS.

### Estructura de carpetas (objetivo)

```
src/
  app/
    layout.tsx            # fuentes, metadata global, JSON-LD Organization/Bakery
    page.tsx              # landing
    productos/[slug]/page.tsx
    api/lead/route.ts     # guarda el lead en PostgreSQL y lo reenvía a n8n
    api/health/route.ts   # healthcheck para Dokploy
    sitemap.ts
    robots.ts
    opengraph-image.tsx
    manifest.ts
  components/
    ui/                   # ReUI / shadcn (generados por CLI)
    sections/             # Hero, Products, FAQ, OrderForm...
    brand/                # Logo, Waves, Sparkles, SeasonalDecor
  data/                   # productos, FAQs, testimonios
  db/                     # schema.ts y cliente Drizzle (PostgreSQL)
  lib/                    # seo.ts, schema.ts (JSON-LD), n8n.ts, validations.ts
drizzle/                  # migraciones SQL generadas (se commitean)
Dockerfile                # build multi-stage con output standalone
public/
  brand/                  # logo, favicon, assets de marca
docs/brand/               # referencias de diseño (caja, brandbook)
```

---

## Integración con n8n

### Flujo del cotizador (pedidos)

1. El cliente agrega productos (botón `+` o "Agregar a mi cotización"): estado en `lib/quote-store.ts`, persistido en `localStorage`.
2. En el sheet "Tu cotización" (`components/quote/quote-sheet.tsx`) ajusta cantidades y deja nombre, fecha y notas.
3. "Enviar cotización por WhatsApp" (`lib/send-quote.ts`) abre `wa.me/<NEXT_PUBLIC_WHATSAPP>` con el mensaje armado (`lib/whatsapp.ts`) y, en paralelo, hace `POST /api/lead` con `keepalive`. El registro **nunca** bloquea el paso a WhatsApp.
4. "Pedir ahora por WhatsApp" en la página de producto hace lo mismo con un solo producto.

Precios del sitio son **estimados**; el negocio confirma precio final por WhatsApp.

### Servidor

- El frontend **nunca** llama al webhook de n8n directamente. Flujo: formulario → `POST /api/lead` (Route Handler / Server Action) → valida con Zod → **guarda en PostgreSQL** → reenvía a n8n con un secreto en header.
- PostgreSQL es la fuente de verdad: el lead se persiste **antes** de llamar a n8n, para no perder pedidos si n8n está caído. La tabla `leads` guarda el estado del envío (`n8n_status`: `pending | sent | failed`) para poder reintentar.
- Variables de entorno (en `.env.local`, nunca commiteadas; en producción se cargan en la sección Environment de la app en Dokploy):

```bash
DATABASE_URL=             # postgres://user:pass@host:5432/sugarbox (host interno de Dokploy en prod)
APP_ENV=                  # production | staging | development (controla indexación)
N8N_WEBHOOK_URL=          # URL del webhook de producción de n8n
N8N_WEBHOOK_SECRET=       # se envía como header X-Webhook-Secret; n8n lo valida
NEXT_PUBLIC_SITE_URL=     # https://dominio-final.com (sin slash final)
NEXT_PUBLIC_GA_ID=        # G-XXXXXXX
NEXT_PUBLIC_WHATSAPP=     # número en formato internacional, solo dígitos
GOOGLE_SITE_VERIFICATION= # token de Search Console (meta tag)
```

- Payload estándar hacia n8n:

```json
{
  "type": "quote | contact | newsletter",
  "name": "", "phone": "", "email": "",
  "products": [{ "slug": "", "name": "", "flavor": "", "size": "", "unitPrice": 0, "quantity": 1 }],
  "total": 0, "date": "", "message": "",
  "source": "landing", "page": "/", "createdAt": "ISO-8601"
}
```

- Anti-spam: honeypot + rate limit por IP en el route handler (y Cloudflare Turnstile si aparece spam). Detrás de Traefik, tomar la IP real de `X-Forwarded-For`.
- Respuestas: el endpoint responde `ok` aunque falle n8n (el cliente ya va a WhatsApp); los errores se loguean en el servidor. Nunca exponer errores internos al usuario.
- **Estado actual:** validación, honeypot, rate limit y reenvío a n8n implementados. **Falta:** persistencia en PostgreSQL con Drizzle (marcado `TODO` en `api/lead/route.ts`).
- Flujos n8n esperados: notificar al negocio (WhatsApp/email), autorespuesta al cliente y, si hace falta, sincronizar con Google Sheets/CRM. n8n también puede leer/escribir directamente en el mismo PostgreSQL (usuario de DB con permisos mínimos).

---

## SEO (prioridad alta)

### Técnico
- Metadata con la Metadata API de Next (`metadata` / `generateMetadata`): `title` con template (`%s | The Sugar Box`), `description` única por página (140–160 caracteres), `alternates.canonical`, `openGraph`, `twitter`.
- `metadataBase` = `NEXT_PUBLIC_SITE_URL`.
- `app/sitemap.ts` y `app/robots.ts` generados dinámicamente; sitemap incluye todas las páginas de producto.
- `lang` correcto en `<html>`; si hay versión bilingüe, `hreflang` vía `alternates.languages`.
- Un solo `<h1>` por página; jerarquía de headings correcta; HTML semántico (`header`, `main`, `section`, `footer`, `nav`).
- Todas las imágenes con `alt` descriptivo (ej. "Caja de mini churros con chocolate"), nunca vacío salvo decorativas.
- URLs en minúsculas, con guiones, sin parámetros innecesarios.
- Favicon, apple-touch-icon y `manifest.ts`.
- OG image por defecto (1200×630) con marca, y por producto.

### Datos estructurados (JSON-LD)
- `Bakery` (subtipo de `LocalBusiness`) en el layout: nombre, logo, dirección, teléfono, horario (`openingHoursSpecification`), `geo`, `priceRange`, `sameAs` (redes), `servesCuisine`.
- `Product` + `Offer` en páginas de producto.
- `FAQPage` en la sección FAQ.
- `BreadcrumbList` en páginas internas.
- Validar con Rich Results Test antes de cada release.

### Performance (Core Web Vitals)
- Objetivo Lighthouse ≥ 95 en Performance, SEO, Accessibility y Best Practices (mobile).
- LCP < 2.5s (imagen del hero con `priority` y tamaño correcto), CLS < 0.1 (dimensiones fijas en imágenes y fuentes con `next/font`), INP < 200ms.
- Mínimo JS en cliente: Server Components por defecto, `"use client"` solo donde haya interacción.
- Scripts de terceros (GA4, mapas) con `next/script` `afterInteractive`/`lazyOnload`.

### Local SEO y Google
- **Google Search Console**: verificar dominio (DNS TXT preferido; meta tag como respaldo), enviar `sitemap.xml`, revisar cobertura e indexación tras el lanzamiento.
- **Google Business Profile**: crear/reclamar y enlazar al sitio. NAP (nombre, dirección, teléfono) idéntico en sitio, GBP y redes.
- Keywords objetivo (ajustar a la ciudad): "pastelería en [ciudad]", "postres a domicilio [ciudad]", "mini churros [ciudad]", "cajas de dulces para regalo", "pasteles personalizados [ciudad]".

---

## Despliegue

Todo se despliega con **Dokploy** en nuestros servidores.

- **App Next.js:** `output: "standalone"` en `next.config.ts` + `Dockerfile` multi-stage (deps → build → runner con `node server.js`, usuario no-root). Incluir `sharp` para que `next/image` optimice imágenes en self-hosting.
- **Variables de build:** las páginas se prerenderizan, así que `NEXT_PUBLIC_*`, `APP_ENV` y `GOOGLE_SITE_VERIFICATION` deben pasarse como **build args** en Dokploy (ver `Dockerfile` y `.env.example`); las de runtime (`N8N_*`, `DATABASE_URL`) van como env vars normales.
- **Flujo:** repo en GitHub (`FxSteel/sugar-box`) → Dokploy (auto-deploy por webhook). `main` = producción; rama `staging` (o preview deployments de Dokploy) para pruebas.
- **PostgreSQL:** servicio de base de datos en Dokploy, en la red interna (no exponer el puerto 5432 a internet). Backups automáticos programados desde Dokploy.
- **Migraciones:** se ejecutan al desplegar (`pnpm db:migrate` antes de arrancar, o como comando de pre-deploy), nunca a mano contra producción.
- **Dominio y HTTPS:** dominio configurado en Dokploy; Traefik emite certificados Let's Encrypt. Redirigir `www` ↔ raíz a una sola versión canónica (301).
- **Healthcheck:** `GET /api/health` (responde 200 y verifica conexión a la DB).
- **Staging con `noindex`:** `robots.ts` y la metadata devuelven `noindex` cuando `APP_ENV !== "production"`.
- **Caché/compresión:** assets estáticos (`/_next/static`) con `Cache-Control` inmutable; gzip/brotli en Traefik.
- Checklist de lanzamiento:
  - [ ] Variables de entorno de producción cargadas en Dokploy
  - [ ] Migraciones aplicadas y backup de PostgreSQL configurado
  - [ ] HTTPS activo y redirección canónica `www`/raíz
  - [ ] Webhook n8n de producción probado end-to-end
  - [ ] Search Console verificado + sitemap enviado
  - [ ] GA4 recibiendo eventos (`generate_lead`, clic en WhatsApp)
  - [ ] Rich Results Test sin errores
  - [ ] Lighthouse mobile ≥ 95
  - [ ] Páginas legales publicadas (privacidad por datos del formulario)

---

## Convenciones de código

- TypeScript estricto; nada de `any`.
- Componentes en PascalCase, un componente por archivo; secciones en `components/sections/`.
- Colores y fuentes solo vía tokens/clases de Tailwind, nunca hex sueltos en JSX.
- Textos del sitio centralizados en `src/data/` (facilita traducción y edición).
- Accesibilidad: foco visible, navegación por teclado, `aria-label` en botones de icono, contraste AA.
- No inventar datos del negocio (precios, dirección, testimonios, horarios): usar placeholders claramente marcados `TODO:` hasta que el cliente los entregue.

---

## Pendientes del cliente

- [ ] **Logo** en SVG (+ versiones monocromas)
- [ ] Brandbook: hex exactos y nombres de tipografías
- [ ] Dominio
- [ ] País/ciudad y zona de entrega → define idioma principal y keywords locales
- [ ] Catálogo: productos, descripciones, precios, fotos profesionales
- [ ] Datos NAP, horario, redes sociales, número de WhatsApp
- [ ] Modelo de pedidos: ¿solo formulario/WhatsApp o checkout con pago online a futuro?
- [ ] URL del webhook de n8n y flujos deseados
