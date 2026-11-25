"use client"

import { motion } from "motion/react"

/** Flota suavemente en bucle (decorativo). */
export function Float({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      aria-hidden="true"
      className={className}
      animate={{ y: [0, -10, 0], rotate: [6, 3, 6] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  )
}
