import 'server-only'
import { cacheLife, cacheTag } from 'next/cache'
import { notion } from './client'
import { getWorkDbId } from './config'
import { resolveDataSourceId } from './resolve-data-source-id'
import { listPageBlocks } from './list-page-blocks'
import { localizeNotionUrl } from './localize-url'
import type {
    PageObjectResponse,
    WorkItem,
    WorkMeta,
    WorkType,
    WorkStatus,
} from './types'

const SECTION_ORDER: WorkType[] = ['Personal', 'Inhouse', 'Freelance', 'Others']

async function getDataSourceId(): Promise<string> {
    return resolveDataSourceId(getWorkDbId())
}

export async function getWorkItems(): Promise<WorkMeta[]> {
    'use cache'
    cacheLife('max')
    cacheTag('work')

    const dataSourceId = await getDataSourceId()
    const response = await notion.dataSources.query({
        data_source_id: dataSourceId,
        sorts: [{ property: 'Date', direction: 'descending' }],
    })

    // Filter out archived items in memory. Once a "Status" select property
    // is added to the Notion work database, move this to a query-level filter
    // like writing.ts does.
    return response.results
        .map((page) => pageToMeta(page as PageObjectResponse))
        .filter((item) => item.status !== 'Archived')
        .sort(sortByDateDesc)
}

export async function getWorkItem(slug: string): Promise<WorkItem | null> {
    'use cache'
    cacheLife('max')
    cacheTag('work', `work:${slug}`)

    try {
        const items = await getWorkItems()
        const match = items.find(
            (item) =>
                item.linkMode === 'Internal' &&
                item.slug === slug &&
                item.status === 'Published'
        )
        if (!match) return null

        const blocks = await listPageBlocks(match.id)
        return { ...match, blocks }
    } catch (e) {
        console.error(`Failed to fetch work item "${slug}":`, e)
        return null
    }
}

export async function getWorkStaticParams(): Promise<Array<{ slug: string }>> {
    const items = await getWorkItems()
    return items
        .filter((item) => item.linkMode === 'Internal' && item.slug)
        .map((item) => ({ slug: item.slug }))
}

export function groupWorkSections(
    items: WorkMeta[]
): Record<WorkType, WorkMeta[]> {
    const groups: Record<WorkType, WorkMeta[]> = {
        Personal: [],
        Inhouse: [],
        Freelance: [],
        Others: [],
    }

    for (const item of items) {
        groups[item.type].push(item)
    }

    for (const type of SECTION_ORDER) {
        groups[type].sort(sortByDateDesc)
    }

    return groups
}

function sortByDateDesc(a: WorkMeta, b: WorkMeta): number {
    const aTime = a.date ? new Date(a.date).getTime() : 0
    const bTime = b.date ? new Date(b.date).getTime() : 0
    return bTime - aTime
}

function pageToMeta(page: PageObjectResponse): WorkMeta {
    const props = page.properties
    const title =
        props.Title?.type === 'title'
            ? (props.Title.title[0]?.plain_text ?? 'Untitled')
            : 'Untitled'
    const notionSlug =
        props.Slug?.type === 'rich_text'
            ? (props.Slug.rich_text[0]?.plain_text ?? '')
            : ''
    const slug = notionSlug || slugify(title)

    return {
        id: page.id,
        title,
        slug,
        status:
            props.Status?.type === 'select'
                ? ((props.Status.select?.name as WorkStatus) ?? 'Draft')
                : 'Draft',
        type:
            props.Type?.type === 'select' &&
            isWorkType(props.Type.select?.name ?? '')
                ? (props.Type.select?.name as WorkType)
                : 'Others',
        date:
            props.Date?.type === 'date'
                ? (props.Date.date?.start ?? null)
                : null,
        dateEnd:
            props.Date?.type === 'date' ? (props.Date.date?.end ?? null) : null,
        excerpt:
            props.Excerpt?.type === 'rich_text'
                ? (props.Excerpt.rich_text[0]?.plain_text ?? '')
                : '',
        coverImage: getCoverImage(props.CoverImage),
        linkMode:
            props.LinkMode?.type === 'select' &&
            props.LinkMode.select?.name === 'External'
                ? 'External'
                : 'Internal',
        externalUrl:
            props.ExternalUrl?.type === 'url'
                ? (props.ExternalUrl.url ?? '')
                : '',
        icon: getIconName(props.Icon),
    }
}

function slugify(value: string): string {
    return value
        .toLowerCase()
        .trim()
        .replace(/['"]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

function isWorkType(value: string): value is WorkType {
    return (
        value === 'Personal' ||
        value === 'Inhouse' ||
        value === 'Freelance' ||
        value === 'Others'
    )
}

function getCoverImage(
    property: PageObjectResponse['properties'][string] | undefined
): string | null {
    if (!property || property.type !== 'files' || property.files.length === 0) {
        return null
    }

    const file = property.files[0]
    if (file.type === 'external') return localizeNotionUrl(file.external.url)
    if (file.type === 'file') return localizeNotionUrl(file.file.url)
    return null
}

function getIconName(
    property: PageObjectResponse['properties'][string] | undefined
): string {
    if (!property) return ''
    if (property.type === 'rich_text') {
        return property.rich_text[0]?.plain_text?.trim() ?? ''
    }
    // Backward-compatible fallback in case older entries still use select.
    if (property.type === 'select') {
        return property.select?.name?.trim() ?? ''
    }
    return ''
}
