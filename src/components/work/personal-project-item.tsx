import Link from 'next/link'
import {
    Atom,
    Code,
    Figma,
    LightBulb,
    Mail,
    SelectFace3d,
    Wrench,
} from 'iconoir-react'
import type { ComponentType } from 'react'
import type { WorkMeta } from '@/lib/notion/types'
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

interface PersonalProjectItemProps {
    item: WorkMeta
}

export function PersonalProjectItem({ item }: PersonalProjectItemProps) {
    const href =
        item.linkMode === 'External' && item.externalUrl
            ? item.externalUrl
            : item.slug
              ? `/work/${item.slug}`
              : '/work'
    const isExternal = isExternalHref(href)
    const Icon = item.icon ? iconMap[item.icon] : null

    return (
        <Link
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="group flex items-start gap-4"
        >
            <div className="flex h-[54px] w-[54px] items-center justify-center rounded-2xl bg-[var(--bg-subtle)] ring-1 ring-inset ring-[var(--border-default)] text-[var(--text-primary)]">
                {Icon ? (
                    <Icon width={32} height={32} />
                ) : (
                    <Code width={32} height={32} />
                )}
            </div>
            <div className="min-w-0 flex-1 space-y-1">
                <p className="text-xl font-medium text-[var(--text-primary)] group-hover:underline">
                    {item.title}
                </p>
                {item.excerpt && (
                    <p className="text-xl font-medium leading-snug text-[var(--text-tertiary)]">
                        {item.excerpt}
                    </p>
                )}
            </div>
        </Link>
    )
}
