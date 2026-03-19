import 'server-only'
import { cacheLife, cacheTag } from 'next/cache'
import { notion, WRITING_DB_ID } from './client'
import type {
    PostMeta,
    Post,
    PageObjectResponse,
    BlockObjectResponse,
} from './types'

// In Notion API v2025-09-03, databases contain "data sources" with their own IDs.
// We resolve the data_source_id from the database once, then use it for queries.
let resolvedDataSourceId: string | undefined

async function getDataSourceId(): Promise<string> {
    if (resolvedDataSourceId) return resolvedDataSourceId

    const db = await notion.databases.retrieve({ database_id: WRITING_DB_ID })
    const dataSources = (db as Record<string, unknown>).data_sources as
        | Array<{ id: string }>
        | undefined

    if (!dataSources?.length) {
        throw new Error(
            `No data sources found on database ${WRITING_DB_ID}. ` +
                'Ensure the database is shared with the integration.'
        )
    }

    resolvedDataSourceId = dataSources[0].id
    return resolvedDataSourceId
}

export async function getWritingPosts(): Promise<PostMeta[]> {
    'use cache'
    cacheLife('hours')
    cacheTag('writing')

    try {
        const dataSourceId = await getDataSourceId()
        const response = await notion.dataSources.query({
            data_source_id: dataSourceId,
            filter: {
                property: 'Status',
                select: { does_not_equal: 'Archived' },
            },
            sorts: [{ property: 'Date', direction: 'descending' }],
        })

        return response.results.map((page) =>
            pageToMeta(page as PageObjectResponse)
        )
    } catch (e) {
        console.error('Failed to fetch writing posts:', e)
        return []
    }
}

export async function getWritingPost(slug: string): Promise<Post | null> {
    'use cache'
    cacheLife('hours')
    cacheTag('writing', `writing:${slug}`)

    try {
        const dataSourceId = await getDataSourceId()
        const response = await notion.dataSources.query({
            data_source_id: dataSourceId,
            filter: {
                and: [
                    { property: 'Slug', rich_text: { equals: slug } },
                    { property: 'Status', select: { equals: 'Published' } },
                ],
            },
        })

        if (!response.results.length) return null

        const page = response.results[0] as PageObjectResponse
        const meta = pageToMeta(page)
        const blocks = await getBlocks(page.id)

        return { ...meta, blocks }
    } catch (e) {
        console.error(`Failed to fetch writing post "${slug}":`, e)
        return null
    }
}

async function getBlocks(pageId: string): Promise<BlockObjectResponse[]> {
    const blocks: BlockObjectResponse[] = []
    let cursor: string | undefined

    do {
        const response = await notion.blocks.children.list({
            block_id: pageId,
            start_cursor: cursor,
            page_size: 100,
        })
        blocks.push(...(response.results as BlockObjectResponse[]))
        cursor = response.has_more
            ? (response.next_cursor ?? undefined)
            : undefined
    } while (cursor)

    return blocks
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
    }
}
