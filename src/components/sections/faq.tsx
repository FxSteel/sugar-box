import { JsonLd } from "@/components/seo/json-ld"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs } from "@/data/faqs"
import { faqSchema } from "@/lib/schema"

export function Faq() {
  return (
    <section id="preguntas" aria-labelledby="preguntas-title" className="mx-auto grid max-w-7xl scroll-mt-20 gap-8 px-4 pt-20 sm:px-6 md:grid-cols-[1fr_1.5fr]">
      <div>
        <p className="eyebrow text-brand-indigo">Preguntas frecuentes</p>
        <h2 id="preguntas-title" className="mt-2 text-3xl font-semibold sm:text-4xl">
          Todo lo que quieres saber
        </h2>
        <p className="mt-3 font-script text-2xl text-brand-indigo">¿Algo más? Escríbenos.</p>
      </div>
      <Accordion className="rounded-2xl border bg-muted/60 px-5">
        {faqs.map((f) => (
          <AccordionItem key={f.q} value={f.q}>
            <AccordionTrigger className="py-4 text-base">{f.q}</AccordionTrigger>
            {/* keepMounted: el texto queda en el HTML para buscadores */}
            <AccordionContent keepMounted className="pb-4 text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <JsonLd data={faqSchema(faqs)} />
    </section>
  )
}
