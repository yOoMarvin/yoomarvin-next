import Link from 'next/link'
import { Code } from 'iconoir-react'
import type { WorkMeta } from '@/lib/notion/types'
import { isExternalHref, getWorkItemHref } from '@/lib/utils'
import { iconMap } from '@/lib/work-icons'

interface PersonalProjectItemProps {
    item: WorkMeta
}

export function PersonalProjectItem({ item }: PersonalProjectItemProps) {
    const href = getWorkItemHref(item)
    const isExternal = isExternalHref(href)
    const Icon = item.icon ? iconMap[item.icon] : null

    return (
        <Link
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="group flex items-start gap-4"
        >
            <div className="flex size-11 items-center justify-center rounded-2xl bg-[var(--bg-subtle)] ring-1 ring-inset ring-[var(--border-default)] text-[var(--text-primary)]">
                {Icon ? (
                    <Icon width={24} height={24} />
                ) : (
                    <Code width={24} height={24} />
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
