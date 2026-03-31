import type { Metadata } from 'next'
import { getTilEntries } from '@/lib/notion/til'
import { renderBlocks } from '@/components/writing/render-blocks'
import { LikeButton } from '@/components/writing/like-button'

export const metadata: Metadata = {
    title: 'Today I Learned',
}

export default async function TilPage() {
    const entries = await getTilEntries()
    const published = entries.filter((e) => e.status === 'Published')

    return (
        <>
            <div className="sm:pl-[140px]">
                <h1 className="text-3xl leading-[1.2] font-bold -tracking-[0.64px] md:text-4xl lg:text-[2.5rem] text-[var(--text-primary)]">
                    Today I Learned
                </h1>
            </div>

            <div className="space-y-10">
                {published.map((entry) => {
                    const cleanDate = entry.date
                        ? new Intl.DateTimeFormat('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                          }).format(new Date(entry.date))
                        : null

                    return (
                        <article
                            key={entry.id}
                            className="grid grid-cols-1 sm:grid-cols-[108px_1fr] sm:gap-x-8 gap-y-2 border-b border-[var(--border-subtle)] pb-10 last:border-0"
                        >
                            {cleanDate && (
                                <p className="font-mono text-sm text-[var(--text-tertiary)] whitespace-nowrap sm:pt-1">
                                    {cleanDate}
                                </p>
                            )}

                            <h2 className="text-xl font-medium text-[var(--text-primary)] sm:row-start-1 sm:col-start-2">
                                {entry.title}
                            </h2>

                            <div className="mt-2 mb-4 sm:mb-0 sm:mt-4 flex sm:justify-end">
                                <LikeButton
                                    slug={entry.id}
                                    initialLikes={entry.likes}
                                    type="til"
                                />
                            </div>

                            <div
                                className="sm:col-start-2 prose prose-zinc dark:prose-invert max-w-none
                                    prose-p:text-lg prose-p:leading-relaxed prose-p:text-[var(--text-primary)]
                                    prose-headings:text-[var(--text-primary)] prose-headings:font-bold prose-headings:mb-2
                                    prose-li:text-[var(--text-primary)] prose-li:text-lg
                                    prose-blockquote:text-[var(--text-primary)]
                                    prose-strong:text-[var(--text-primary)]
                                    prose-a:text-[var(--text-primary)] prose-a:underline prose-a:decoration-[var(--text-tertiary)] prose-a:underline-offset-2
                                    prose-code:text-sm prose-code:font-mono prose-code:text-[var(--text-primary)]
                                    prose-code:bg-[var(--bg-subtle)] prose-code:px-1 prose-code:rounded"
                            >
                                {renderBlocks(entry.blocks)}
                            </div>
                        </article>
                    )
                })}
            </div>
        </>
    )
}
