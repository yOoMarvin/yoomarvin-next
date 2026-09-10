import 'server-only'
import { cacheLife, cacheTag } from 'next/cache'
import { notion } from './client'
import { notionRequest } from './request'
import { getWritingDbId } from './config'
import { resolveDataSourceId } from './resolve-data-source-id'
import { listPageBlocks } from './list-page-blocks'
import type { PostMeta, Post, PageObjectResponse } from './types'

async function getDataSourceId(): Promise<string> {
    return resolveDataSourceId(getWritingDbId())
}

export async function getWritingPosts(): Promise<PostMeta[]> {
    'use cache'
    cacheLife('max')
    cacheTag('writing')

    const dataSourceId = await getDataSourceId()
    const response = await notionRequest(() =>
        notion.dataSources.query({
            data_source_id: dataSourceId,
            filter: {
                property: 'Status',
                select: { equals: 'Published' },
            },
            sorts: [{ property: 'Date', direction: 'descending' }],
        })
    )

    return response.results.map((page) =>
        pageToMeta(page as PageObjectResponse)
    )
}

export async function getWritingPost(slug: string): Promise<Post | null> {
    'use cache'
    cacheLife('max')
    cacheTag('writing', `writing:${slug}`)

    // Reuse the cached list rather than querying per slug, the way work.ts
    // does. A build prerenders every post, and one query each was enough extra
    // traffic to trip Notion's rate limit.
    const posts = await getWritingPosts()
    const meta = posts.find((post) => post.slug === slug)

    // Only a missing match means "no such post". Fetch errors deliberately
    // propagate: swallowing them made a transient Notion failure render
    // notFound(), which then got prerendered and cached as a permanent 404.
    if (!meta) return null

    const blocks = await listPageBlocks(meta.id)

    return { ...meta, blocks }
}

function pageToMeta(page: PageObjectResponse): PostMeta {
    const props = page.properties
    return {
        id: page.id,
        title:
            props.Title?.type === 'title'
                ? (props.Title.title[0]?.plain_text ?? 'Untitled')
                : 'Untitled',
        slug:
            props.Slug?.type === 'rich_text'
                ? (props.Slug.rich_text[0]?.plain_text ?? '')
                : '',
        status:
            props.Status?.type === 'select'
                ? ((props.Status.select?.name as PostMeta['status']) ?? 'Draft')
                : 'Draft',
        date:
            props.Date?.type === 'date'
                ? (props.Date.date?.start ?? null)
                : null,
        excerpt:
            props.Excerpt?.type === 'rich_text'
                ? (props.Excerpt.rich_text[0]?.plain_text ?? '')
                : '',
        likes: props.Likes?.type === 'number' ? (props.Likes.number ?? 0) : 0,
    }
}
