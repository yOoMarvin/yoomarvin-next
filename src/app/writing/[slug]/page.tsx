import { getWritingPost, getWritingPosts } from '@/lib/notion/writing'
import { renderBlocks } from '@/components/writing/render-blocks'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const posts = await getWritingPosts()
  return posts
    .filter((p) => p.status === 'Published' && p.slug)
    .map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getWritingPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function WritingPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [post, allPosts] = await Promise.all([
    getWritingPost(slug),
    getWritingPosts(),
  ])

  if (!post) notFound()

  const cleanDate = post.date
    ? new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(new Date(post.date))
    : null

  const related = allPosts
    .filter((p) => p.status === 'Published' && p.slug !== post.slug)
    .slice(0, 5)

  return (
    <>
      <div className="space-y-3">
        {cleanDate && (
          <p className="font-mono text-sm text-[var(--text-tertiary)]">
            {cleanDate}
          </p>
        )}
        <h1 className="text-2xl font-semibold leading-snug text-[var(--text-primary)]">
          {post.title}
        </h1>
      </div>

      <div
        className="prose prose-zinc dark:prose-invert max-w-none
          prose-p:text-[var(--text-secondary)] prose-p:text-lg prose-p:leading-relaxed
          prose-headings:font-semibold
          prose-a:text-[var(--text-primary)] prose-a:underline prose-a:underline-offset-2
          prose-code:text-sm prose-code:font-mono
          prose-code:bg-[var(--bg-subtle)] prose-code:px-1 prose-code:rounded"
      >
        {renderBlocks(post.blocks)}
      </div>

      {related.length > 0 && (
        <div className="border-t border-[var(--border-default)] pt-8">
          <p className="mb-4 text-sm text-[var(--text-tertiary)]">Read next</p>
          <div className="space-y-1">
            {related.map((p) => (
              <Link
                key={p.id}
                href={`/writing/${p.slug}`}
                className="block py-1 text-sm text-[var(--text-secondary)] transition-colors duration-100 hover:text-[var(--text-primary)]"
              >
                {p.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
