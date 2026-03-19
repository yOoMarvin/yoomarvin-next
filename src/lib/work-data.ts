export interface ProjectItem {
  title: string
  description: string
  icon?: string
  href: string
}

export const projects: ProjectItem[] = [
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
  {
    title: 'TIL',
    description: 'Things I learned along the way',
    icon: 'LightBulb',
    href: '/til',
  },
]
