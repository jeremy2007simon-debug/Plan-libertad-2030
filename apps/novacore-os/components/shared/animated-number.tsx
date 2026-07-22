"use client"

import * as React from "react"
import { animate } from "framer-motion"

export type NumberFormatKind = "number" | "currency" | "percent" | "days"

const currencyFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
})

const formatters: Record<NumberFormatKind, (n: number) => string> = {
  number: (n) => Math.round(n).toLocaleString("es-ES"),
  currency: (n) => currencyFormatter.format(n),
  percent: (n) => `${Math.round(n)}%`,
  days: (n) => `${Math.round(n)} días`,
}

export function AnimatedNumber({
  value,
  kind = "number",
  duration = 1,
  className,
}: {
  value: number
  kind?: NumberFormatKind
  duration?: number
  className?: string
}) {
  const [display, setDisplay] = React.useState(0)

  React.useEffect(() => {
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setDisplay,
    })
    return () => controls.stop()
  }, [value, duration])

  return <span className={className}>{formatters[kind](display)}</span>
}
