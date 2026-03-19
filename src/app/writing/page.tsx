import { getWritingPosts } from '@/lib/notion/writing'
import { PostRow } from '@/components/ui/post-row'

export default async function WritingPage() {
  const posts = await getWritingPosts()

  const byYear = posts.reduce<Record<string, typeof posts>>((acc, post) => {
    const year = post.date
      ? new Date(post.date).getFullYear().toString()
      : 'Undated'
    ;(acc[year] ??= []).push(post)
    return acc
  }, {})

  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a))

  return (
    <>
      <h1 className="text-3xl leading-[1.2] font-bold -tracking-[0.64px] md:text-4xl lg:text-[2.5rem] text-[var(--text-primary)]">
        Writing
      </h1>

      <div className="space-y-12">
        {years.map((year) => (
          <section key={year}>
            <p className="mb-4 font-mono text-sm text-[var(--text-tertiary)]">
              {year}
            </p>
            <div>
              {byYear[year].map((post) => (
                <PostRow
                  key={post.id}
                  title={post.title}
                  href={`/writing/${post.slug}`}
                  draft={post.status === 'Draft'}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
