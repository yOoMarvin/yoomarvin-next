import { getWritingPost, getWritingPosts } from '@/lib/notion/writing'
import { renderBlocks } from '@/components/writing/render-blocks'
import { LikeButton } from '@/components/writing/like-button'
import { PostRow } from '@/components/ui/post-row'
import { SectionHeader } from '@/components/ui/section-header'
import { notFound } from 'next/navigation'
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
                <h1 className="text-3xl font-bold leading-[1.2] -tracking-[0.64px] md:text-4xl lg:text-[2.5rem] text-[var(--text-primary)]">
                    {post.title}
                </h1>
                <LikeButton slug={post.slug} initialLikes={post.likes} />
            </div>

            <div
                className="prose prose-zinc dark:prose-invert max-w-none
          prose-p:text-[var(--text-primary)] prose-p:text-lg prose-p:leading-relaxed
          prose-headings:text-[var(--text-primary)] prose-headings:font-bold prose-headings:mb-2
          prose-li:text-[var(--text-primary)] prose-li:text-lg
          prose-blockquote:text-[var(--text-primary)]
          prose-strong:text-[var(--text-primary)]
          prose-a:text-[var(--text-primary)] prose-a:underline prose-a:decoration-[var(--text-tertiary)] prose-a:underline-offset-2
          prose-code:text-sm prose-code:font-mono prose-code:text-[var(--text-primary)]
          prose-code:bg-[var(--bg-subtle)] prose-code:px-1 prose-code:rounded"
            >
                {renderBlocks(post.blocks)}
            </div>

            {related.length > 0 && (
                <section className="space-y-4 border-t border-[var(--border-default)] pt-8">
                    <SectionHeader label="Read next" href="/writing" />
                    <div className="flex flex-col gap-4 sm:gap-1.5">
                        {related.map((p) => (
                            <PostRow
                                key={p.id}
                                title={p.title}
                                href={`/writing/${p.slug}`}
                            />
                        ))}
                    </div>
                </section>
            )}
        </>
    )
}
