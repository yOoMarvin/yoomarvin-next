import Link from 'next/link'
import { cn } from '@/lib/utils'

interface PostRowProps {
  title: string
  href: string
  draft?: boolean
}

export function PostRow({ title, href, draft }: PostRowProps) {
  const inner = (
    <div
      className={cn(
        'group flex items-center gap-2 py-1',
        draft && 'opacity-50 cursor-not-allowed select-none'
      )}
    >
      <span
        className={cn(
          'text-xl font-medium text-[var(--text-primary)]',
          !draft && 'group-hover:underline'
        )}
      >
        {title}
      </span>
      {draft && (
        <span className="rounded border border-[var(--border-default)] px-1.5 py-0.5 font-mono text-xs text-[var(--text-tertiary)]">
          DRAFT
        </span>
      )}
    </div>
  )

  if (draft) return inner

  return (
    <Link href={href} className="block">
      {inner}
    </Link>
  )
}
