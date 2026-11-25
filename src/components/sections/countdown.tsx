"use client"

import { useSyncExternalStore } from "react"

const subscribe = (cb: () => void) => {
  const id = setInterval(cb, 1000 * 30)
  return () => clearInterval(id)
}
const now = () => Math.floor(Date.now() / 30_000)

/** Cuenta regresiva (resolución de 30 s). Se renderiza solo en el cliente. */
export function Countdown({ target }: { target: string }) {
  const tick = useSyncExternalStore(subscribe, now, () => null)
  if (tick === null) return <span>—</span>

  const ms = Math.max(0, new Date(target).getTime() - tick * 30_000)
  const d = Math.floor(ms / 86_400_000)
  const h = Math.floor((ms % 86_400_000) / 3_600_000)
  const m = Math.floor((ms % 3_600_000) / 60_000)

  if (ms === 0) return <span>Pedidos cerrados</span>
  return (
    <time dateTime={target} className="font-semibold text-white tabular-nums">
      {d}d {h.toString().padStart(2, "0")}h {m.toString().padStart(2, "0")}m
    </time>
  )
}
