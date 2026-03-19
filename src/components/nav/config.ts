export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Writing', href: '/writing' },
]

export const PERSONAL_PROJECTS = [
  { label: 'Fighill', href: 'https://fighill.com' },
  { label: 'Pixel Perfect Picks', href: 'https://pixelperfectpicks.com' },
  { label: 'TIL', href: '/til' },
  { label: 'Experiments', href: '/lab' },
]

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
