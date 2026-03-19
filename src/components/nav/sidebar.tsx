'use client'

import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { GitHubIcon, LinkedInIcon, XIcon } from './social-icons'
import { NavLink } from './nav-link'
import { NAV_ITEMS, PERSONAL_PROJECTS, SOCIAL_LINKS } from './config'
import { isExternalHref } from '@/lib/utils'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const SOCIAL_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  LinkedIn: LinkedInIcon,
  X: XIcon,
  GitHub: GitHubIcon,
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const shouldReduceMotion = useReducedMotion()
  const duration = shouldReduceMotion ? 0 : 0.15

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col bg-[var(--bg-page)] px-6 pt-20 pb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration, ease: 'easeOut' }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex flex-col gap-16">
            <nav aria-label="Main navigation" className="flex flex-col gap-3">
              {NAV_ITEMS.map(({ label, href }) => (
                <NavLink
                  key={href}
                  href={href}
                  label={label}
                  isActive={href === '/' ? pathname === '/' : pathname.startsWith(href)}
                  onClick={onClose}
                />
              ))}
            </nav>

            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium text-[var(--text-tertiary)]">
                Personal Projects
              </span>
              {PERSONAL_PROJECTS.map(({ label, href }) => (
                <NavLink
                  key={href}
                  href={href}
                  label={label}
                  external={isExternalHref(href)}
                  isActive={pathname.startsWith(href)}
                  onClick={onClose}
                />
              ))}
            </div>

            <div className="flex gap-4" role="list" aria-label="Social links">
              {SOCIAL_LINKS.map(({ label, href }) => {
                const Icon = SOCIAL_ICONS[label]
                return (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    role="listitem"
                    onClick={onClose}
                    className="text-[var(--text-secondary)] transition-colors duration-100 hover:text-[var(--text-primary)]"
                  >
                    <Icon size={22} />
                  </a>
                )
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
