import { z } from "zod"

const lineSchema = z.object({
  slug: z.string().max(100),
  name: z.string().max(200),
  flavor: z.string().max(100).optional(),
  size: z.string().max(100).optional(),
  unitPrice: z.number().nonnegative(),
  quantity: z.number().int().positive().max(999),
})

const leadSchema = z.object({
  type: z.enum(["quote", "contact", "newsletter"]),
  name: z.string().trim().max(120).optional(),
  phone: z.string().trim().max(30).optional(),
  email: z.email().max(200).optional(),
  date: z.string().max(30).optional(),
  message: z.string().max(2000).optional(),
  products: z.array(lineSchema).max(50).default([]),
  total: z.number().nonnegative().optional(),
  page: z.string().max(200).optional(),
  // honeypot: los bots lo llenan, las personas no lo ven
  company: z.string().max(200).optional(),
})

// Rate limit en memoria: suficiente para una sola instancia en Dokploy.
const hits = new Map<string, number[]>()
const WINDOW_MS = 60_000
const MAX_HITS = 5

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > MAX_HITS
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: "too_many_requests" }, { status: 429 })
  }

  const parsed = leadSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return Response.json({ ok: false, error: "invalid_payload" }, { status: 400 })
  }
  const { company, ...lead } = parsed.data
  // Bot detectado: respondemos ok sin procesar nada
  if (company) return Response.json({ ok: true })
  const payload = { ...lead, source: "landing", createdAt: new Date().toISOString() }

  // TODO: persistir en PostgreSQL (tabla leads, n8n_status) antes de reenviar — ver CLAUDE.md

  const url = process.env.N8N_WEBHOOK_URL
  if (!url) {
    console.warn("[lead] N8N_WEBHOOK_URL no configurado; lead no reenviado")
    return Response.json({ ok: true, forwarded: false })
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Webhook-Secret": process.env.N8N_WEBHOOK_SECRET ?? "",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) throw new Error(`n8n respondió ${res.status}`)
    return Response.json({ ok: true, forwarded: true })
  } catch (err) {
    console.error("[lead] error reenviando a n8n", err)
    // El usuario ya va camino a WhatsApp: no exponemos el error interno
    return Response.json({ ok: true, forwarded: false })
  }
}
