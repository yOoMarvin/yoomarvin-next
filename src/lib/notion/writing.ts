import 'server-only'
import { cacheLife, cacheTag } from 'next/cache'
import { getSnapshotPages, getSnapshotBlocks } from './content'
import type { PostMeta, Post, PageObjectResponse } from './types'

export async function getWritingPosts(): Promise<PostMeta[]> {
    'use cache'
    cacheLife('max')
    cacheTag('writing')

    // Published-only and date-sorted already — the snapshot crawl sends the
    // same filter and sort this function used to send itself.
    return getSnapshotPages('writing').map((page) =>
        pageToMeta(page as PageObjectResponse)
    )
}

export async function getWritingPost(slug: string): Promise<Post | null> {
    'use cache'
    cacheLife('max')
    cacheTag('writing', `writing:${slug}`)

    const posts = await getWritingPosts()
    const meta = posts.find((post) => post.slug === slug)

    // Only a missing match means "no such post". Anything else must throw:
    // swallowing an error here made a transient failure render notFound(),
    // which then got prerendered and cached as a permanent 404.
    if (!meta) return null

    return { ...meta, blocks: getSnapshotBlocks('writing', meta.id) }
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
