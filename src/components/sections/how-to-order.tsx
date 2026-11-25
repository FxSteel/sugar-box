import { Reveal } from "@/components/motion/reveal"
import { CakeSliceIcon, MessageCircleIcon, TruckIcon } from "lucide-react"

const steps = [
  {
    icon: CakeSliceIcon,
    title: "Elige tus antojos",
    body: "Agrega productos con el botón +, elige sabor, tamaño y cantidad.",
  },
  {
    icon: MessageCircleIcon,
    title: "Envía tu cotización",
    body: "Con un clic se abre WhatsApp con tu pedido listo. Sin pagos en línea.",
  },
  {
    icon: TruckIcon,
    title: "Confirmamos y entregamos",
    body: "Te confirmamos precio final, fecha y entrega. ¡Y a disfrutar!",
  },
]

export function HowToOrder() {
  return (
    <section id="como-pedir" aria-labelledby="como-pedir-title" className="mx-auto max-w-7xl scroll-mt-20 px-4 pt-20 sm:px-6">
      <p className="eyebrow text-brand-indigo">Cómo pedir</p>
      <h2 id="como-pedir-title" className="mt-2 text-3xl font-semibold sm:text-4xl">
        Tres pasos para tu caja feliz
      </h2>
      <ol className="mt-8 grid gap-3 md:grid-cols-3">
        {steps.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 0.1} className="relative h-full rounded-2xl border bg-muted/60 p-6">
            <span className="absolute top-5 right-6 font-heading text-5xl font-semibold text-brand-indigo/10">
              {i + 1}
            </span>
            <span className="grid size-11 place-items-center rounded-xl bg-brand-butter text-brand-night">
              <s.icon className="size-5" />
            </span>
            <h3 className="mt-5 font-sans text-lg font-semibold">{s.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
