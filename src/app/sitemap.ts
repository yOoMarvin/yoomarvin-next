import type { MetadataRoute } from 'next'
import { getWritingPosts } from '@/lib/notion/writing'

const BASE_URL = 'https://marvinmessenzehl.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getWritingPosts()
  const publishedPosts = posts.filter((p) => p.status === 'Published' && p.slug)

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/work`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/writing`, changeFrequency: 'weekly', priority: 0.8 },
  ]

  const postRoutes: MetadataRoute.Sitemap = publishedPosts.map((post) => ({
    url: `${BASE_URL}/writing/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : undefined,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...postRoutes]
}
