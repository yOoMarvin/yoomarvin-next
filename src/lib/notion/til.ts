import 'server-only'
import { cacheLife, cacheTag } from 'next/cache'
import { getSnapshotPages, getSnapshotBlocks } from './content'
import type { TilEntry, PageObjectResponse } from './types'

export async function getTilEntries(): Promise<TilEntry[]> {
    'use cache'
    cacheLife('max')
    cacheTag('til')

    // Published-only and date-sorted already — see the note in writing.ts.
    return getSnapshotPages('til').map((page) => {
        const p = page as PageObjectResponse
        return { ...pageToTilMeta(p), blocks: getSnapshotBlocks('til', p.id) }
    })
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
