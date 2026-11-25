import { cn } from "@/lib/utils"

// TODO: reemplazar por el logo oficial en SVG cuando el cliente lo entregue (public/brand/).
export function DripBlob({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 110" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M10 50C10 20 35 4 60 4s50 16 50 46v38c0 10-10 10-10 0v-8c0-6-10-6-10 0v16c0 10-12 10-12 0V82c0-6-10-6-10 0v8c0 10-12 10-12 0v-6c0-6-10-6-10 0v14c0 10-12 10-12 0V82c0-6-10-6-10 0v8c0 10-14 10-14 0Z"
      />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <DripBlob className="size-8 text-brand-pink" />
      <span className="font-heading text-lg leading-none font-semibold tracking-tight">
        the Sugar box
      </span>
    </span>
  )
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-grid place-items-center", className)}>
      <DripBlob className="absolute inset-0 size-full text-brand-pink" />
      <span className="relative -mt-[12%] text-center font-heading leading-[0.85] font-bold text-brand-indigo">
        <span className="block text-[0.55em]">the</span>
        <span className="block">Sugar</span>
        <span className="block">box</span>
      </span>
    </span>
  )
}
