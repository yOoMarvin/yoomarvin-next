import 'server-only'
import { cacheLife, cacheTag } from 'next/cache'
import { notion } from './client'
import { getWritingDbId } from './config'
import { resolveDataSourceId } from './resolve-data-source-id'
import { listPageBlocks } from './list-page-blocks'
import type { PostMeta, Post, PageObjectResponse } from './types'

async function getDataSourceId(): Promise<string> {
    return resolveDataSourceId(getWritingDbId())
}

export async function getWritingPosts(): Promise<PostMeta[]> {
    'use cache'
    cacheLife('hours')
    cacheTag('writing')

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
        const blocks = await listPageBlocks(page.id)

        return { ...meta, blocks }
    } catch (e) {
        console.error(`Failed to fetch writing post "${slug}":`, e)
        return null
    }
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
