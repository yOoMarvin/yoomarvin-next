import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { renderBlocks } from '@/components/writing/render-blocks'
import { SectionHeader } from '@/components/ui/section-header'
import { WorkLinkRow } from '@/components/work/work-link-row'
import {
    getWorkItem,
    getWorkItems,
    getWorkStaticParams,
} from '@/lib/notion/work'

export async function generateStaticParams() {
    return getWorkStaticParams()
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const item = await getWorkItem(slug)
    if (!item) return {}

    return {
        title: item.title,
    }
}

export default async function WorkCaseStudyPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const [item, allItems] = await Promise.all([
        getWorkItem(slug),
        getWorkItems(),
    ])

    if (!item) notFound()

    const cleanDate = item.date
        ? new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
          }).format(new Date(item.date))
        : null

    const related = allItems
        .filter(
            (candidate) =>
                candidate.type === item.type && candidate.id !== item.id
        )
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
                    {item.title}
                </h1>
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
                {renderBlocks(item.blocks)}
            </div>

            {related.length > 0 && (
                <section className="space-y-4 border-t border-[var(--border-default)] pt-8">
                    <SectionHeader label="Related work" href="/work" />
                    <div className="flex flex-col gap-4 sm:gap-1.5">
                        {related.map((relatedItem) => (
                            <WorkLinkRow
                                key={relatedItem.id}
                                title={relatedItem.title}
                                description={relatedItem.excerpt}
                                href={
                                    relatedItem.linkMode === 'External' &&
                                    relatedItem.externalUrl
                                        ? relatedItem.externalUrl
                                        : relatedItem.slug
                                          ? `/work/${relatedItem.slug}`
                                          : '/work'
                                }
                                icon={relatedItem.icon || undefined}
                            />
                        ))}
                    </div>
                </section>
            )}
        </>
    )
}
