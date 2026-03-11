import Link from 'next/link'

interface PostRowProps {
  title: string
  href: string
  draft?: boolean
}

export function PostRow({ title, href, draft }: PostRowProps) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-2 py-1"
    >
      <span className="text-xl font-medium text-[var(--text-primary)] group-hover:underline">
        {title}
      </span>
      {draft && (
        <span className="rounded border border-[var(--border-default)] px-1.5 py-0.5 font-mono text-xs text-[var(--text-tertiary)]">
          DRAFT
        </span>
      )}
    </Link>
  )
}
