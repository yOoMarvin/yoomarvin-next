'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight } from 'iconoir-react'
import { cn } from '@/lib/utils'

interface NavLinkProps {
  href: string
  label: string
  external?: boolean
  onClick?: () => void
}

export function NavLink({ href, label, external = false, onClick }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onClick={onClick}
      className={cn(
        'group flex items-center gap-1.5 transition-colors duration-100',
        'text-xl font-semibold',
        isActive
          ? 'text-[var(--text-primary)]'
          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
      )}
    >
      {label}
      {external && (
        <ArrowUpRight
          width={16}
          height={16}
          className="transition-transform duration-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </Link>
  )
}
