import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function isExternalHref(href: string) {
    return href.startsWith('http') || href.startsWith('mailto')
}

export const inlineLinkClass =
    'underline decoration-[var(--text-tertiary)] underline-offset-2 transition-colors duration-100 hover:text-[var(--text-primary)] hover:decoration-[var(--text-primary)]'

export function formatWorkDateRange(
    start: string | null,
    end: string | null
): string | null {
    if (!start) return null
    const s = new Date(start)
    const fmt = (d: Date) =>
        d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    if (!end) return fmt(s)
    const e = new Date(end)
    return `${fmt(s)} – ${fmt(e)}`
}

export function formatWorkYearRange(
    start: string | null,
    end: string | null
): string | null {
    if (!start) return null
    const sYear = new Date(start).getFullYear()
    if (!end) return String(sYear)
    const eYear = new Date(end).getFullYear()
    return sYear === eYear ? String(sYear) : `${sYear} – ${eYear}`
}

export function getWorkItemHref(item: {
    linkMode: string
    externalUrl: string
    slug: string
}): string {
    if (item.linkMode === 'External' && item.externalUrl)
        return item.externalUrl
    return item.slug ? `/work/${item.slug}` : '/work'
}
