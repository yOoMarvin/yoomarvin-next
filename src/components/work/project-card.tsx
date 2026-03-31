import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'iconoir-react'
import type { WorkMeta } from '@/lib/notion/types'
import { isExternalHref, getWorkItemHref } from '@/lib/utils'

interface ProjectCardProps {
    item: WorkMeta
}

export function ProjectCard({ item }: ProjectCardProps) {
    const href = getWorkItemHref(item)
    const isExternal = isExternalHref(href)
    const hasImage = Boolean(item.coverImage)
    const showPlaceholder =
        !hasImage && (item.type === 'Inhouse' || item.type === 'Freelance')

    return (
        <Link
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="group block space-y-2"
        >
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[var(--bg-surface)] ring-1 ring-inset ring-[var(--border-default)]">
                {hasImage && (
                    <Image
                        src={item.coverImage ?? ''}
                        alt={item.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-200 group-hover:scale-[1.01]"
                    />
                )}
                {showPlaceholder && (
                    <div
                        className="h-full w-full bg-[var(--bg-subtle)]"
                        aria-hidden="true"
                    />
                )}
            </div>
            <div className="flex items-center gap-2 text-[var(--text-primary)]">
                <p className="text-xl font-medium group-hover:underline">
                    {item.title}
                </p>
                {isExternal && (
                    <ArrowUpRight
                        width={18}
                        height={18}
                        className="shrink-0 text-[var(--text-quaternary)]"
                    />
                )}
            </div>
        </Link>
    )
}
