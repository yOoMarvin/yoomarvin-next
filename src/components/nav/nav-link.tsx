import Link from 'next/link'
import { ArrowUpRight } from 'iconoir-react'
import { cn } from '@/lib/utils'

interface NavLinkProps {
    href: string
    label: string
    isActive?: boolean
    external?: boolean
    onClick?: () => void
}

export function NavLink({
    href,
    label,
    isActive = false,
    external = false,
    onClick,
}: NavLinkProps) {
    return (
        <Link
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            onClick={onClick}
            className={cn(
                'flex items-center gap-1.5 text-xl font-semibold transition-colors duration-100',
                isActive
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            )}
        >
            {label}
            {external && (
                <ArrowUpRight
                    width={16}
                    height={16}
                    className="text-[var(--text-tertiary)]"
                />
            )}
        </Link>
    )
}
