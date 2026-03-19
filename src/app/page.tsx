import { getWritingPosts } from '@/lib/notion/writing'
import { projects } from '@/lib/work-data'
import { Hero } from '@/components/ui/hero'
import { PhotoFan } from '@/components/ui/photo-fan'
import { SectionHeader } from '@/components/ui/section-header'
import { WorkRow } from '@/components/ui/work-row'
import { PostRow } from '@/components/ui/post-row'

export default async function HomePage() {
  const allPosts = await getWritingPosts()
  const recentPosts = allPosts.slice(0, 6)

  return (
    <>
      <section>
        <Hero>
          <p className="text-2xl font-semibold text-[var(--text-secondary)] leading-snug text-pretty">
            I&apos;m a design engineer living in Germany. I build products with DAYY and spend the
            rest of my time making things I wished existed.
          </p>
        </Hero>
      </section>

      <section className="w-screen relative left-1/2 -translate-x-1/2">
        <PhotoFan />
      </section>

      <section className="space-y-4">
        <SectionHeader label="Projects" href="/work" />
        <div className="flex flex-col gap-4 sm:gap-1.5">
          {projects.map((item) => (
            <WorkRow
              key={item.title}
              title={item.title}
              description={item.description}
              href={item.href}
              icon={item.icon}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader label="Writing" href="/writing" />
        <div className="flex flex-col gap-4 sm:gap-1.5">
          {recentPosts.map((post) => (
            <PostRow
              key={post.id}
              title={post.title}
              href={`/writing/${post.slug}`}
              draft={post.status === 'Draft'}
            />
          ))}
        </div>
      </section>
    </>
  )
}
