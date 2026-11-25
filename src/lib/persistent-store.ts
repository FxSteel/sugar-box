"use client"

import { useSyncExternalStore } from "react"

// Store mínimo persistido en localStorage. Si el storage falla (modo privado, bloqueado),
// el estado sigue funcionando en memoria. Con key null no persiste (solo memoria).
export function createPersistentStore<T>(key: string | null, initial: T) {
  let state = initial
  let hydrated = false
  const listeners = new Set<() => void>()

  const hydrate = () => {
    if (hydrated || !key || typeof window === "undefined") return
    hydrated = true
    try {
      const raw = window.localStorage.getItem(key)
      if (raw) state = JSON.parse(raw) as T
    } catch {}
  }

  const set = (updater: (prev: T) => T) => {
    hydrate()
    state = updater(state)
    if (key) {
      try {
        window.localStorage.setItem(key, JSON.stringify(state))
      } catch {}
    }
    listeners.forEach((l) => l())
  }

  const subscribe = (listener: () => void) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  const getSnapshot = () => {
    hydrate()
    return state
  }

  const useStore = () => useSyncExternalStore(subscribe, getSnapshot, () => initial)

  return { useStore, set }
}
