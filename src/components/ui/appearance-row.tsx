import Link from 'next/link'

interface AppearanceRowProps {
  title: string
  date: string
  href?: string
}

export function AppearanceRow({ title, date, href }: AppearanceRowProps) {
  const inner = (
    <>
      <span className="text-xl font-medium text-[var(--text-primary)] group-hover:underline">{title}</span>
      <span className="font-mono text-xl text-[var(--text-tertiary)] shrink-0">{date}</span>
    </>
  )

  if (href) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 py-1">
        {inner}
      </Link>
    )
  }

  return <div className="flex items-center justify-between gap-4 py-1">{inner}</div>
}
