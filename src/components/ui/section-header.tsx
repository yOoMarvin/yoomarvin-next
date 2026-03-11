import Link from 'next/link'
import { NavArrowRight } from 'iconoir-react'

interface SectionHeaderProps {
  label: string
  href?: string
}

export function SectionHeader({ label, href }: SectionHeaderProps) {
  return (
    <div className="flex items-center">
      {href ? (
        <Link
          href={href}
          className="flex items-center gap-0.5 text-base font-normal text-[var(--text-tertiary)] transition-colors duration-100 hover:text-[var(--text-primary)]"
        >
          {label}
          <NavArrowRight width={16} height={16} strokeWidth={2} />
        </Link>
      ) : (
        <span className="text-base font-normal text-[var(--text-tertiary)]">{label}</span>
      )}
    </div>
  )
}
