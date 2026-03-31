import 'server-only'
import { notion } from './client'
import { getTilDbId } from './config'
import { resolveDataSourceId } from './resolve-data-source-id'
import { listPageBlocks } from './list-page-blocks'
import type { TilEntry, PageObjectResponse } from './types'

async function getDataSourceId(): Promise<string> {
    return resolveDataSourceId(getTilDbId())
}

export async function getTilEntries(): Promise<TilEntry[]> {
    const dataSourceId = await getDataSourceId()
    const response = await notion.dataSources.query({
        data_source_id: dataSourceId,
        filter: {
            property: 'Status',
            select: { does_not_equal: 'Archived' },
        },
        sorts: [{ property: 'Date', direction: 'descending' }],
    })

    const entries = await Promise.all(
        response.results.map(async (page) => {
            const p = page as PageObjectResponse
            const meta = pageToTilMeta(p)
            const blocks = await listPageBlocks(p.id)
            return { ...meta, blocks }
        })
    )

    return entries
}

function pageToTilMeta(page: PageObjectResponse): Omit<TilEntry, 'blocks'> {
    const props = page.properties
    return {
        id: page.id,
        title:
            props.Title?.type === 'title'
                ? (props.Title.title[0]?.plain_text ?? 'Untitled')
                : 'Untitled',
        status:
            props.Status?.type === 'select'
                ? ((props.Status.select?.name as TilEntry['status']) ?? 'Draft')
                : 'Draft',
        date:
            props.Date?.type === 'date'
                ? (props.Date.date?.start ?? null)
                : null,
        likes: props.Likes?.type === 'number' ? (props.Likes.number ?? 0) : 0,
    }
}
