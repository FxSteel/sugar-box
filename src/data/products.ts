// TODO: catálogo provisional para maquetar. Nombres, precios, sabores y descripciones
// deben reemplazarse por los datos reales del cliente antes de publicar.

export type ArtTone = "pink" | "sky" | "butter" | "cream"
export type ArtIcon =
  | "churro"
  | "cake"
  | "slice"
  | "cookie"
  | "donut"
  | "gift"
  | "candy"
  | "cupcake"

export type CategorySlug =
  | "mini-churros"
  | "pasteles"
  | "postres"
  | "dulces"
  | "cajas-de-regalo"

export type Flavor = { name: string; swatch: string }
export type Size = { label: string; detail: string; price: number }

export type Review = {
  author: string
  rating: number
  title: string
  body: string
  date: string
}

export type Product = {
  slug: string
  name: string
  category: CategorySlug
  short: string
  description: string
  price: number
  compareAt?: number
  badge?: string
  featured?: boolean
  flavors?: Flavor[]
  sizes?: Size[]
  highlights: string[]
  specs: { label: string; value: string }[]
  art: { tone: ArtTone; icon: ArtIcon }
  /** Fotos reales en /public/products/<slug>/... — si no hay, se usa la ilustración */
  images?: string[]
  /** Solo reseñas reales */
  reviews?: Review[]
}

export const categories: { slug: CategorySlug; name: string }[] = [
  { slug: "mini-churros", name: "Mini churros" },
  { slug: "pasteles", name: "Pasteles" },
  { slug: "postres", name: "Postres" },
  { slug: "dulces", name: "Dulces" },
  { slug: "cajas-de-regalo", name: "Cajas de regalo" },
]

export const categoryName = (slug: CategorySlug) =>
  categories.find((c) => c.slug === slug)?.name ?? slug

const sauces: Flavor[] = [
  { name: "Chocolate", swatch: "#5b3a29" },
  { name: "Cajeta", swatch: "#c8843c" },
  { name: "Lechera", swatch: "#f4ead8" },
  { name: "Frutos rojos", swatch: "#c2334d" },
]

export const products: Product[] = [
  {
    slug: "mini-churros-clasicos",
    name: "Mini Churros Clásicos",
    category: "mini-churros",
    short: "Crujientes por fuera, suaves por dentro, con azúcar y canela.",
    description:
      "Nuestros mini churros recién hechos, espolvoreados con azúcar y canela y acompañados de tu salsa favorita para dipear. El antojo perfecto para compartir (o no).",
    price: 8,
    badge: "Favorito",
    featured: true,
    flavors: sauces,
    sizes: [
      { label: "12 pzas", detail: "1–2 personas", price: 8 },
      { label: "24 pzas", detail: "3–4 personas", price: 14 },
      { label: "36 pzas", detail: "Para compartir", price: 19 },
    ],
    highlights: [
      "Hechos al momento, nunca recalentados",
      "Incluye salsa para dipear a elegir",
      "Ideales para fiestas y mesas de postres",
    ],
    specs: [
      { label: "Porciones", value: "12 · 24 · 36 piezas" },
      { label: "Salsas", value: "Chocolate · Cajeta · Lechera · Frutos rojos" },
      { label: "Alérgenos", value: "Gluten · Lácteos" },
      { label: "Conservación", value: "Mejor el mismo día" },
    ],
    // TODO: reemplazar por fotografía propia del cliente
    images: ["https://i.pinimg.com/736x/01/9f/4b/019f4bbc9481fc047b820b3db086ea4e.jpg"],
    art: { tone: "butter", icon: "churro" },
  },
  {
    slug: "caja-navidena-sugar-box",
    name: "Caja Navideña Sugar Box",
    category: "cajas-de-regalo",
    short: "Mini churros, galletas de jengibre y dulces de temporada en nuestra caja edición Navidad.",
    description:
      "La caja más dulce de la temporada: mini churros, galletas de jengibre decoradas a mano y una selección de dulces navideños, todo en nuestra caja edición especial. Lista para regalar.",
    price: 24,
    compareAt: 30,
    badge: "Navidad",
    featured: true,
    flavors: sauces.slice(0, 3),
    sizes: [
      { label: "Mediana", detail: "2–3 personas", price: 24 },
      { label: "Grande", detail: "4–6 personas", price: 38 },
    ],
    highlights: [
      "Edición limitada de temporada",
      "Incluye tarjeta con mensaje personalizado",
      "Empaque listo para regalar",
    ],
    specs: [
      { label: "Incluye", value: "Mini churros · galletas de jengibre · dulces" },
      { label: "Tamaños", value: "Mediana · Grande" },
      { label: "Anticipación", value: "Pedido con 24 h" },
      { label: "Alérgenos", value: "Gluten · Lácteos · Huevo" },
    ],
    art: { tone: "pink", icon: "gift" },
  },
  {
    slug: "pastel-de-chocolate",
    name: "Pastel de Chocolate",
    category: "pasteles",
    short: "Bizcocho húmedo de chocolate con ganache y betún cremoso.",
    description:
      "Capas de bizcocho de chocolate húmedo, relleno de ganache y cubierto con betún de chocolate. Personalizable con mensaje y decoración.",
    price: 32,
    featured: true,
    flavors: [
      { name: "Chocolate", swatch: "#5b3a29" },
      { name: "Chocolate blanco", swatch: "#f4ead8" },
    ],
    sizes: [
      { label: "Chico", detail: "8 porciones", price: 32 },
      { label: "Mediano", detail: "15 porciones", price: 48 },
      { label: "Grande", detail: "25 porciones", price: 70 },
    ],
    highlights: [
      "Personalizable con mensaje",
      "Ideal para cumpleaños",
      "Hecho bajo pedido",
    ],
    specs: [
      { label: "Porciones", value: "8 · 15 · 25" },
      { label: "Relleno", value: "Ganache de chocolate" },
      { label: "Anticipación", value: "Pedido con 48 h" },
      { label: "Conservación", value: "Refrigerado, hasta 3 días" },
    ],
    // TODO: reemplazar por fotografía propia del cliente
    images: ["https://i.pinimg.com/1200x/65/dd/52/65dd523ce9ec1cf36d162a605071be5c.jpg"],
    art: { tone: "cream", icon: "cake" },
  },
  {
    slug: "cheesecake-frutos-rojos",
    name: "Cheesecake de Frutos Rojos",
    category: "postres",
    short: "Cremoso, con base de galleta y coulis de frutos rojos.",
    description:
      "Cheesecake horneado de textura cremosa sobre base de galleta, coronado con coulis casero de frutos rojos.",
    price: 6,
    flavors: [
      { name: "Frutos rojos", swatch: "#c2334d" },
      { name: "Maracuyá", swatch: "#f2b134" },
    ],
    sizes: [
      { label: "Individual", detail: "1 porción", price: 6 },
      { label: "Entero", detail: "10 porciones", price: 28 },
    ],
    highlights: ["Base de galleta artesanal", "Coulis hecho en casa", "Sin conservadores"],
    specs: [
      { label: "Porciones", value: "1 · 10" },
      { label: "Alérgenos", value: "Gluten · Lácteos · Huevo" },
      { label: "Conservación", value: "Refrigerado, hasta 4 días" },
    ],
    // TODO: reemplazar por fotografía propia del cliente
    images: ["https://i.pinimg.com/736x/0d/98/3a/0d983a37b641b9fab99cfc69fd4c2ef8.jpg"],
    art: { tone: "pink", icon: "slice" },
  },
  {
    slug: "galletas-de-jengibre",
    name: "Galletas de Jengibre",
    category: "dulces",
    short: "Decoradas a mano, especiadas y con mucho cariño navideño.",
    description:
      "Galletas de jengibre y especias decoradas a mano con glaseado real. Perfectas para regalar o colgar en el árbol.",
    price: 10,
    badge: "Nuevo",
    featured: true,
    sizes: [
      { label: "6 pzas", detail: "Bolsita", price: 10 },
      { label: "12 pzas", detail: "Caja", price: 18 },
    ],
    highlights: ["Decoradas a mano", "Receta de temporada", "Duran hasta 2 semanas"],
    specs: [
      { label: "Piezas", value: "6 · 12" },
      { label: "Alérgenos", value: "Gluten · Huevo" },
      { label: "Conservación", value: "Lugar fresco y seco" },
    ],
    // TODO: reemplazar por fotografía propia del cliente
    images: ["https://i.pinimg.com/736x/09/a1/1f/09a11fb2f09eb5cc068637758a342115.jpg"],
    art: { tone: "butter", icon: "cookie" },
  },
  {
    slug: "cupcakes-surtidos",
    name: "Cupcakes Surtidos",
    category: "postres",
    short: "Media docena de cupcakes con betún de colores.",
    description:
      "Cupcakes esponjosos en sabores surtidos con betún de mantequilla en los colores de la casa.",
    price: 15,
    flavors: [
      { name: "Vainilla", swatch: "#f4ead8" },
      { name: "Chocolate", swatch: "#5b3a29" },
      { name: "Red velvet", swatch: "#a3253b" },
    ],
    sizes: [
      { label: "6 pzas", detail: "Media docena", price: 15 },
      { label: "12 pzas", detail: "Docena", price: 27 },
    ],
    highlights: ["Sabores surtidos", "Decoración temática bajo pedido", "Ideales para eventos"],
    specs: [
      { label: "Piezas", value: "6 · 12" },
      { label: "Alérgenos", value: "Gluten · Lácteos · Huevo" },
      { label: "Conservación", value: "Hasta 2 días" },
    ],
    // TODO: reemplazar por fotografía propia del cliente
    images: ["https://i.pinimg.com/736x/f7/02/79/f70279b0e41a921f5871d10fcb7aa0b8.jpg"],
    art: { tone: "sky", icon: "cupcake" },
  },
  {
    slug: "brownies-de-la-casa",
    name: "Brownies de la Casa",
    category: "postres",
    short: "Densos, chocolatosos y con costra crujiente.",
    description:
      "Brownies de chocolate intenso con centro húmedo y costra crujiente. Con o sin nuez.",
    price: 12,
    flavors: [
      { name: "Clásico", swatch: "#5b3a29" },
      { name: "Con nuez", swatch: "#8a5a3b" },
    ],
    sizes: [
      { label: "4 pzas", detail: "Para antojo", price: 12 },
      { label: "9 pzas", detail: "Para compartir", price: 24 },
    ],
    highlights: ["Chocolate semiamargo", "Con o sin nuez", "Duran hasta 5 días"],
    specs: [
      { label: "Piezas", value: "4 · 9" },
      { label: "Alérgenos", value: "Gluten · Lácteos · Huevo · Nuez (opcional)" },
    ],
    // TODO: reemplazar por fotografía propia del cliente
    images: ["https://i.pinimg.com/736x/2a/9a/c0/2a9ac003516350c7304cfecfb95ac2a4.jpg"],
    art: { tone: "cream", icon: "candy" },
  },
  {
    slug: "donas-glaseadas",
    name: "Mini Donas Glaseadas",
    category: "dulces",
    short: "Mini donas suavecitas con glaseado de colores y sprinkles.",
    description:
      "Mini donas esponjosas bañadas en glaseado de colores con sprinkles. Un bocado de felicidad.",
    price: 9,
    flavors: [
      { name: "Fresa", swatch: "#f5b5c8" },
      { name: "Vainilla", swatch: "#f4ead8" },
      { name: "Chocolate", swatch: "#5b3a29" },
    ],
    sizes: [
      { label: "12 pzas", detail: "Caja chica", price: 9 },
      { label: "24 pzas", detail: "Caja grande", price: 16 },
    ],
    highlights: ["Glaseados de colores", "Perfectas para fiestas infantiles"],
    specs: [
      { label: "Piezas", value: "12 · 24" },
      { label: "Alérgenos", value: "Gluten · Lácteos · Huevo" },
    ],
    // TODO: reemplazar por fotografía propia del cliente
    images: ["https://i.pinimg.com/736x/9b/63/2e/9b632e978706c09f4f3aff2407b173dc.jpg"],
    art: { tone: "sky", icon: "donut" },
  },
]

export const getProduct = (slug: string) => products.find((p) => p.slug === slug)

export const relatedProducts = (product: Product, limit = 4) =>
  [
    ...products.filter((p) => p.slug !== product.slug && p.category === product.category),
    ...products.filter((p) => p.slug !== product.slug && p.category !== product.category),
  ].slice(0, limit)
