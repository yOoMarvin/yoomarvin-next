import Link from 'next/link'
import { Figma, Mail, Atom, Code, Wrench, SelectFace3d } from 'iconoir-react'
import type { ComponentType } from 'react'

const iconMap: Record<string, ComponentType<{ width?: number; height?: number; className?: string }>> = {
  Figma,
  Mail,
  Atom,
  Code,
  Wrench,
  SelectFace3d,
}

interface WorkRowProps {
  title: string
  description: string
  href: string
  icon?: string
}

export function WorkRow({ title, description, href, icon }: WorkRowProps) {
  const Icon = icon ? iconMap[icon] : null
  const isExternal = href.startsWith('http')

  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="group flex items-center gap-2 py-1"
    >
      {Icon && (
        <Icon width={24} height={24} className="shrink-0 text-[var(--text-primary)]" />
      )}
      <span className="text-xl font-medium text-[var(--text-primary)] group-hover:underline">{title}</span>
      <span className="text-xl font-medium text-[var(--text-tertiary)]">{description}</span>
    </Link>
  )
}
