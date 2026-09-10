import 'server-only'
import { cacheLife, cacheTag } from 'next/cache'
import { notion } from './client'
import { notionRequest } from './request'
import { getTilDbId, getWritingDbId } from './config'
import { resolveDataSourceId } from './resolve-data-source-id'
import type { LikeableType, PageObjectResponse } from './types'

/**
 * Every like count for a content type, keyed by the identifier the client
 * likes against — slug for writing, page id for TIL.
 *
 * /til mounts one LikeButton per entry, and each used to fetch its own count.
 * A single page view therefore cost 29 Notion requests against a ~3 req/s
 * limit, competing with the build for the same budget. One query serves the
 * whole page instead.
 *
 * Cached with the 'seconds' profile rather than 'max': counts should still
 * read as live (see docs/architecture.md), but concurrent readers now collapse
 * onto one Notion request instead of each issuing their own.
 */
export async function getLikes(
    type: LikeableType
): Promise<Record<string, number>> {
    'use cache'
    cacheLife('seconds')
    cacheTag('likes', `likes:${type}`)

    const dataSourceId = await resolveDataSourceId(
        type === 'til' ? getTilDbId() : getWritingDbId()
    )
    const response = await notionRequest(() =>
        notion.dataSources.query({
            data_source_id: dataSourceId,
            filter: {
                property: 'Status',
                select: { equals: 'Published' },
            },
        })
    )

    const likes: Record<string, number> = {}
    for (const result of response.results) {
        const page = result as PageObjectResponse
        const key = type === 'til' ? page.id : slugOf(page)
        if (key) likes[key] = likeCountOf(page)
    }
    return likes
}

function slugOf(page: PageObjectResponse): string {
    const slug = page.properties.Slug
    return slug?.type === 'rich_text'
        ? (slug.rich_text[0]?.plain_text ?? '')
        : ''
}

function likeCountOf(page: PageObjectResponse): number {
    const likes = page.properties.Likes
    return likes?.type === 'number' ? (likes.number ?? 0) : 0
}
