export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Writing', href: '/writing' },
]

import { projects } from '@/lib/work-data'

export const PERSONAL_PROJECTS = projects.map((p) => ({
  label: p.title,
  href: p.href,
}))

export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/marvinmessenzehl' },
  { label: 'X', href: 'https://twitter.com/yoomarvin' },
  { label: 'GitHub', href: 'https://github.com/yoomarvin' },
]

// Only routes listed here get a breadcrumb. Remove a route to hide it.
export const BREADCRUMB_ROUTES: Record<string, string> = {
  '/work': 'Work',
  '/writing': 'Writing',
  '/lab': 'Lab',
  '/now': 'Now',
  '/about': 'About',
}
