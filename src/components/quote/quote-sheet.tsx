"use client"

import { useState } from "react"
import { MessageCircleIcon, PackageOpenIcon, Trash2Icon } from "lucide-react"

import { QuantityStepper } from "@/components/quote/quantity-stepper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { site } from "@/config/site"
import { formatPrice } from "@/lib/format"
import { sendQuote } from "@/lib/send-quote"
import {
  clearQuote,
  lineId,
  setQuoteOpen,
  updateQuantity,
  useQuote,
  useQuoteOpen,
} from "@/lib/quote-store"
import { quoteTotal } from "@/lib/whatsapp"

export function QuoteSheet() {
  const open = useQuoteOpen()
  const lines = useQuote()
  const [name, setName] = useState("")
  const [date, setDate] = useState("")
  const [notes, setNotes] = useState("")
  const empty = lines.length === 0

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (empty) return
    sendQuote(lines, { name, date, notes })
    clearQuote()
    setQuoteOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={(next) => setQuoteOpen(next)}>
      <SheetContent className="w-full gap-0 bg-white sm:max-w-md">
        <SheetHeader className="border-b p-5">
          <SheetTitle className="text-xl font-semibold">Tu cotización</SheetTitle>
          <SheetDescription>
            Arma tu pedido y envíalo por WhatsApp. Te confirmamos disponibilidad, precio final y entrega.
          </SheetDescription>
        </SheetHeader>

        {empty ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <PackageOpenIcon className="size-10 text-brand-pink" strokeWidth={1.25} />
            <p className="font-heading text-lg">Tu caja está vacía</p>
            <p className="text-sm text-muted-foreground">
              Agrega tus antojos con el botón + de cada producto.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
            <ul className="flex-1 divide-y overflow-y-auto px-5">
              {lines.map((line) => (
                <li key={lineId(line)} className="flex items-start gap-3 py-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{line.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {[line.size, line.flavor].filter(Boolean).join(" · ")}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <QuantityStepper
                        value={line.quantity}
                        onChange={(q) => updateQuantity(line, q)}
                        min={0}
                        label={`Cantidad de ${line.name}`}
                        className="h-8"
                      />
                      <button
                        type="button"
                        onClick={() => updateQuantity(line, 0)}
                        aria-label={`Quitar ${line.name}`}
                        className="grid size-8 place-items-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
                      >
                        <Trash2Icon className="size-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-semibold tabular-nums">
                    {formatPrice(line.unitPrice * line.quantity)}
                  </p>
                </li>
              ))}
            </ul>

            <SheetFooter className="gap-4 border-t p-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="quote-name">Tu nombre</Label>
                  <Input
                    id="quote-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="quote-date">¿Para cuándo?</Label>
                  <Input
                    id="quote-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="quote-notes">Notas (opcional)</Label>
                <Textarea
                  id="quote-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Mensaje para la tarjeta, entrega a domicilio…"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total estimado</span>
                <span className="text-xl font-semibold tabular-nums">
                  {formatPrice(quoteTotal(lines))}
                </span>
              </div>
              <Button type="submit" size="lg" className="h-11 w-full text-base">
                <MessageCircleIcon />
                Enviar cotización por WhatsApp
              </Button>
              {!site.whatsapp && (
                <p className="text-center text-xs text-amber-700">
                  Falta configurar NEXT_PUBLIC_WHATSAPP.
                </p>
              )}
            </SheetFooter>
          </form>
        )}
      </SheetContent>
    </Sheet>
  )
}
