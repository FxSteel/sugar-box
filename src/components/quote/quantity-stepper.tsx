"use client"

import { MinusIcon, PlusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  label,
  className,
}: {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  label: string
  className?: string
}) {
  const btn =
    "grid h-full w-9 place-items-center text-muted-foreground transition hover:text-foreground disabled:opacity-40 focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none"
  return (
    <div
      role="group"
      aria-label={label}
      className={cn("inline-flex h-9 items-stretch overflow-hidden rounded-lg border bg-white", className)}
    >
      <button
        type="button"
        className={btn}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Disminuir cantidad"
      >
        <MinusIcon className="size-4" />
      </button>
      <span className="grid w-10 place-items-center border-x text-sm tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className={btn}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Aumentar cantidad"
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  )
}
