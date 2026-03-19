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
        href: 'https://www.figma.com/community/widget/1466711393588945290',
    },
    {
        title: 'Pixel Perfect Picks',
        description: 'A weekly newsletter about stuff I find',
        icon: 'Mail',
        href: 'https://world.hey.com/mrvn',
    },
]
