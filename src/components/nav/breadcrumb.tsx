'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useReducedMotion } from 'motion/react'
import { BREADCRUMB_ROUTES } from './config'

export function Breadcrumb() {
  const pathname = usePathname()
  const shouldReduceMotion = useReducedMotion()

  // Find label: exact match first, then prefix match
  let label: string | undefined = BREADCRUMB_ROUTES[pathname]
  if (!label) {
    for (const [route, routeLabel] of Object.entries(BREADCRUMB_ROUTES)) {
      if (route !== '/' && pathname.startsWith(route)) {
        label = routeLabel
        break
      }
    }
  }

  if (!label) return null

  return (
    <motion.div
      className="fixed top-6 left-[72px] z-50 flex items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.15 }}
    >
      <Link
        href="/"
        className="text-base font-medium text-[var(--text-primary)] transition-colors duration-100 hover:text-[var(--text-secondary)]"
      >
        Marvin
      </Link>
      <span className="text-base font-medium text-[var(--text-tertiary)]">/</span>
      <Link
        href={Object.entries(BREADCRUMB_ROUTES).find(([, l]) => l === label)?.[0] ?? '/'}
        className="text-base font-medium text-[var(--text-primary)] transition-colors duration-100 hover:text-[var(--text-secondary)]"
      >
        {label}
      </Link>
    </motion.div>
  )
}
