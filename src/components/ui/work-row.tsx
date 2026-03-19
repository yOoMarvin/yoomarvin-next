import Link from 'next/link'
import { ArrowUpRight, Figma, Mail, Atom, Code, Wrench, SelectFace3d, LightBulb } from 'iconoir-react'
import type { ComponentType } from 'react'
import { isExternalHref } from '@/lib/utils'

const iconMap: Record<string, ComponentType<{ width?: number; height?: number; className?: string }>> = {
  Figma,
  Mail,
  Atom,
  Code,
  Wrench,
  SelectFace3d,
  LightBulb,
}

interface WorkRowProps {
  title: string
  description: string
  href: string
  icon?: string
}

export function WorkRow({ title, description, href, icon }: WorkRowProps) {
  const Icon = icon ? iconMap[icon] : null
  const isExternal = isExternalHref(href)

  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="group flex flex-col py-1 md:flex-row md:items-center md:gap-2"
    >
      <div className="flex items-center gap-2">
        {Icon && (
          <Icon width={24} height={24} className="shrink-0 text-[var(--text-primary)]" />
        )}
        <span className="text-xl font-medium text-[var(--text-primary)] group-hover:underline">{title}</span>
        {isExternal && (
          <ArrowUpRight width={14} height={14} strokeWidth={2} className="shrink-0 text-[var(--text-primary)]" />
        )}
      </div>
      <span className="pl-8 text-xl font-medium text-[var(--text-tertiary)] md:pl-0">{description}</span>
    </Link>
  )
}
