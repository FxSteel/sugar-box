import { cn } from "@/lib/utils"

/** Olas orgánicas de la caja (azul cielo + mantequilla) para bordes inferiores. */
export function Waves({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn("pointer-events-none w-full", className)}
    >
      <path
        fill="var(--brand-sky)"
        d="M0 60c120-40 260-50 380-10s170 60 220 60H0Z"
        opacity="0.9"
      />
      <path
        fill="var(--brand-butter)"
        d="M560 120c90-10 160-70 290-80s210 30 350 10v70Z"
        opacity="0.9"
      />
    </svg>
  )
}

/** Destello de cuatro puntas, como los de la caja. */
export function Sparkle({
  className,
  style,
}: {
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} style={style}>
      <path
        fill="currentColor"
        d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0Z"
      />
    </svg>
  )
}

/** Puñado de destellos y puntos dispersos (decoración de fondo). */
export function SparkleField({ className }: { className?: string }) {
  const items = [
    { x: "8%", y: "14%", s: 14 },
    { x: "22%", y: "70%", s: 10 },
    { x: "46%", y: "10%", s: 8 },
    { x: "70%", y: "24%", s: 16 },
    { x: "88%", y: "62%", s: 10 },
    { x: "60%", y: "82%", s: 8 },
  ]
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
      {items.map((it, i) => (
        <Sparkle
          key={i}
          className="absolute text-brand-cream/70"
          style={{ left: it.x, top: it.y, width: it.s, height: it.s }}
        />
      ))}
    </div>
  )
}
