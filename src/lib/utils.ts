import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isExternalHref(href: string) {
  return href.startsWith('http') || href.startsWith('mailto')
}

export const inlineLinkClass =
  'underline decoration-[var(--text-tertiary)] underline-offset-2 transition-colors duration-100 hover:text-[var(--text-primary)] hover:decoration-[var(--text-primary)]'
