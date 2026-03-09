import { defineConfig, s } from 'velite'

export default defineConfig({
  root: 'content',
  collections: {
    posts: {
      name: 'Post',
      pattern: 'posts/**/*.mdx',
      schema: s.object({
        title: s.string(),
        description: s.string(),
        date: s.isodate(),
        published: s.boolean().default(true),
        body: s.mdx(),
      }).transform((data, { meta }) => ({
        ...data,
        slug: meta.path.replace(/^posts\//, '').replace(/\.mdx$/, ''),
      })),
    },
    work: {
      name: 'Work',
      pattern: 'work/**/*.mdx',
      schema: s.object({
        title: s.string(),
        description: s.string(),
        client: s.string(),
        date: s.isodate(),
        published: s.boolean().default(true),
        body: s.mdx(),
      }).transform((data, { meta }) => ({
        ...data,
        slug: meta.path.replace(/^work\//, '').replace(/\.mdx$/, ''),
      })),
    },
    projects: {
      name: 'Project',
      pattern: 'projects/**/*.mdx',
      schema: s.object({
        title: s.string(),
        description: s.string(),
        url: s.string().url().optional(),
        featured: s.boolean().default(false),
        body: s.mdx(),
      }).transform((data, { meta }) => ({
        ...data,
        slug: meta.path.replace(/^projects\//, '').replace(/\.mdx$/, ''),
      })),
    },
  },
})
