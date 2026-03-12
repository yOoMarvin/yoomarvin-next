'use client'

import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { GithubCircle, Linkedin, X } from 'iconoir-react'
import { NavLink } from './nav-link'
import { NAV_ITEMS, PERSONAL_PROJECTS } from './config'
import { isExternalHref } from '@/lib/utils'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/marvinmessenzehl', Icon: Linkedin },
  { label: 'X', href: 'https://twitter.com/yoomarvin', Icon: X },
  { label: 'GitHub', href: 'https://github.com/yoomarvin', Icon: GithubCircle },
]

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const shouldReduceMotion = useReducedMotion()

  const overlayVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : -8 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: shouldReduceMotion ? 0 : -8 },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : -4 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col bg-[var(--bg-page)] px-6 pt-20 pb-12"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: shouldReduceMotion ? 0 : 0.15, ease: 'easeOut' }}
        >
          <div className="flex flex-col gap-16">
            {/* Main navigation */}
            <motion.nav
              className="flex flex-col gap-3"
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.03, delayChildren: 0.05 }}
            >
              {NAV_ITEMS.map(({ label, href }) => (
                <motion.div key={href} variants={itemVariants} transition={{ duration: 0.15 }}>
                  <NavLink href={href} label={label} onClick={onClose} />
                </motion.div>
              ))}
            </motion.nav>

            {/* Personal projects */}
            <motion.div
              className="flex flex-col gap-3"
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.03, delayChildren: 0.05 }}
            >
              <motion.span
                variants={itemVariants}
                transition={{ duration: 0.15 }}
                className="text-sm text-[var(--text-tertiary)]"
              >
                Personal Projects
              </motion.span>
              {PERSONAL_PROJECTS.map(({ label, href }) => (
                <motion.div key={href} variants={itemVariants} transition={{ duration: 0.15 }}>
                  <NavLink
                    href={href}
                    label={label}
                    external={isExternalHref(href)}
                    onClick={onClose}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Social icons */}
            <motion.div
              className="flex gap-4"
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.03, delayChildren: 0.05 }}
            >
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  onClick={onClose}
                  variants={itemVariants}
                  transition={{ duration: 0.15 }}
                  className="text-[var(--text-secondary)] transition-colors duration-100 hover:text-[var(--text-primary)]"
                >
                  <Icon width={22} height={22} />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
