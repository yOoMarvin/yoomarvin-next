import Image from 'next/image'
import { posts, work } from '.velite'
import { SectionHeader } from '@/components/ui/section-header'
import { WorkRow } from '@/components/ui/work-row'
import { PostRow } from '@/components/ui/post-row'
import { PhotoFan } from '@/components/home/photo-fan'

function getFeaturedWork() {
  return work
    .filter((item) => item.featured && item.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

function getRecentPosts(count = 6) {
  return posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count)
}

export default function HomePage() {
  const featuredWork = getFeaturedWork()
  const recentPosts = getRecentPosts()

  return (
    <main className="max-w-2xl mx-auto px-4 md:px-8 py-12 space-y-32">
      {/* Hero */}
      <section>
        <div className="flex flex-col gap-4">
          <Image
            src="/marvin-profile.webp"
            alt="Marvin Messenzehl"
          width={56}
          height={56}
          className="rounded-full size-14 object-cover mb-8"
            priority
          />
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">Marvin Messenzehl</h1>
          <p className="text-2xl font-semibold text-[var(--text-secondary)] leading-snug">
            I&apos;m a design engineer living in Germany. I build products with DAYY and spend the
            rest of my time making things I wished existed.
          </p>
        </div>
      </section>

      {/* Photo fan — full-bleed, centered */}
      <section className="w-screen relative left-1/2 -translate-x-1/2 flex justify-center">
        <PhotoFan />
      </section>

      {/* Selected Projects */}
      <section className="space-y-4">
        <SectionHeader label="Selected Projects" href="/work" />
        <div className="space-y-1">
          {featuredWork.map((item) => (
            <WorkRow
              key={item.slug}
              title={item.title}
              description={item.description}
              href={item.href ?? `/work/${item.slug}`}
              icon={item.icon}
            />
          ))}
        </div>
      </section>

      {/* Writing */}
      <section className="space-y-4">
        <SectionHeader label="Writing" href="/writing" />
        <div className="space-y-1">
          {recentPosts.map((post) => (
            <PostRow
              key={post.slug}
              title={post.title}
              href={`/writing/${post.slug}`}
              draft={!post.published}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
