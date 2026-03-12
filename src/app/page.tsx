import { posts, work } from '.velite'
import { Hero } from '@/components/home/hero'
import { PhotoFan } from '@/components/home/photo-fan'
import { SectionHeader } from '@/components/ui/section-header'
import { WorkRow } from '@/components/ui/work-row'
import { PostRow } from '@/components/ui/post-row'

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
    <main className="max-w-2xl mx-auto px-6 pt-32 pb-12 space-y-24">
      <section>
        <Hero />
      </section>

      <section className="w-screen relative left-1/2 -translate-x-1/2">
        <PhotoFan />
      </section>

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

      <section className="space-y-4">
        <SectionHeader label="Writing" href="/writing" />
        <div className="space-y-1">
          {recentPosts.map((post) => (
            <PostRow
              key={post.slug}
              title={post.title}
              href={`/writing/${post.slug}`}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
