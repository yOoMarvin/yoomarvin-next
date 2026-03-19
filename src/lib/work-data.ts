export interface WorkItem {
  title: string
  description: string
  icon?: string
  href: string
}

export const featuredWork: WorkItem[] = [
  {
    title: 'Fighill',
    description: 'A Figma plugin that makes design progress visible',
    icon: 'Figma',
    href: '/work/fighill',
  },
  {
    title: 'Lab',
    description: 'My playground & learnings for interaction concepts',
    icon: 'Atom',
    href: '/lab',
  },
  {
    title: 'Pixel Perfect Picks',
    description: 'A weekly newsletter about the stuff I find',
    icon: 'Mail',
    href: 'https://world.hey.com/mrvn',
  },
]
