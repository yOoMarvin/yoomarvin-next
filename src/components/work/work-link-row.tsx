import Link from 'next/link'
import {
    ArrowUpRight,
    Atom,
    Code,
    Figma,
    LightBulb,
    Mail,
    SelectFace3d,
    Wrench,
} from 'iconoir-react'
import type { ComponentType } from 'react'
import { isExternalHref } from '@/lib/utils'

const iconMap: Record<
    string,
    ComponentType<{ width?: number; height?: number; className?: string }>
> = {
    Figma,
    Mail,
    Atom,
    Code,
    Wrench,
    SelectFace3d,
    LightBulb,
}

interface WorkLinkRowProps {
    title: string
    description: string
    href: string
    icon?: string
}

export function WorkLinkRow({
    title,
    description,
    href,
    icon,
}: WorkLinkRowProps) {
    const Icon = icon ? iconMap[icon] : null
    const isExternal = isExternalHref(href)

    return (
        <Link
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="group flex items-center gap-2 py-1"
        >
            {Icon && (
                <Icon
                    width={18}
                    height={18}
                    className="shrink-0 text-[var(--text-quaternary)]"
                />
            )}
            <p className="text-base font-medium text-[var(--text-primary)] group-hover:underline">
                {title}
            </p>
            {description && (
                <p className="text-sm text-[var(--text-secondary)]">
                    {description}
                </p>
            )}
            {isExternal && (
                <ArrowUpRight
                    width={18}
                    height={18}
                    className="shrink-0 text-[var(--text-quaternary)]"
                />
            )}
        </Link>
    )
}
