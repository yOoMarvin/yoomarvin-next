import Link from 'next/link'

interface AppearanceRowProps {
    title: string
    date: string
    href?: string
}

export function AppearanceRow({ title, date, href }: AppearanceRowProps) {
    const rowClass =
        'group flex flex-col items-start gap-0 leading-[1.6] sm:flex-row sm:items-center sm:justify-between sm:gap-4'

    const inner = (
        <>
            <span className="text-xl font-medium text-[var(--text-primary)] group-hover:underline">
                {title}
            </span>
            <span className="font-mono text-xl text-[var(--text-tertiary)] shrink-0">
                {date}
            </span>
        </>
    )

    if (href) {
        return (
            <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={rowClass}
            >
                {inner}
            </Link>
        )
    }

    return <div className={rowClass}>{inner}</div>
}
