// Healthcheck para Dokploy. TODO: verificar también la conexión a PostgreSQL cuando exista.
export function GET() {
  return Response.json({ ok: true })
}
