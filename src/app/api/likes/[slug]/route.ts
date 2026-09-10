import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { notion } from '@/lib/notion/client'
import { getWritingDbId, getTilDbId } from '@/lib/notion/config'
import { resolveDataSourceId } from '@/lib/notion/resolve-data-source-id'
import { getLikes } from '@/lib/notion/likes'
import type { LikeableType, PageObjectResponse } from '@/lib/notion/types'

function getDbId(type: LikeableType): string {
    return type === 'til' ? getTilDbId() : getWritingDbId()
}

function parseType(request: Request): LikeableType {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    return type === 'til' ? 'til' : 'writing'
}

async function findPage(
    slug: string,
    type: LikeableType
): Promise<PageObjectResponse | null> {
    if (type === 'til') {
        try {
            const page = await notion.pages.retrieve({ page_id: slug })
            return page as PageObjectResponse
        } catch {
            return null
        }
    }

    const dataSourceId = await resolveDataSourceId(getDbId(type))
    const response = await notion.dataSources.query({
        data_source_id: dataSourceId,
        filter: {
            and: [
                { property: 'Slug', rich_text: { equals: slug } },
                { property: 'Status', select: { equals: 'Published' } },
            ],
        },
    })
    return response.results.length
        ? (response.results[0] as PageObjectResponse)
        : null
}

/**
 * Single count. The UI reads `GET /api/likes?type=…` instead, but this shares
 * that endpoint's cached map so there is only one read path.
 */
export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params
    const type = parseType(request)

    try {
        const likes = await getLikes(type)
        if (!(slug in likes)) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ likes: likes[slug] })
    } catch {
        return NextResponse.json(
            { error: 'Failed to fetch likes' },
            { status: 500 }
        )
    }
}

export async function POST(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params
    const type = parseType(request)

    const body = await request.json()
    const count = body?.count
    if (!Number.isInteger(count) || count < 1 || count > 10) {
        return NextResponse.json(
            { error: 'count must be an integer between 1 and 10' },
            { status: 400 }
        )
    }

    try {
        const page = await findPage(slug, type)
        if (!page) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            )
        }

        const props = page.properties
        const currentLikes =
            props.Likes?.type === 'number' ? (props.Likes.number ?? 0) : 0
        const newTotal = currentLikes + count

        await notion.pages.update({
            page_id: page.id,
            properties: {
                Likes: { number: newTotal },
            },
        })

        // Only the likes map — page caches deliberately stay untouched so
        // posts remain static (see docs/architecture.md).
        revalidateTag(`likes:${type}`, 'max')

        return NextResponse.json({ likes: newTotal })
    } catch (e) {
        console.error(`Failed to update likes for "${slug}":`, e)
        return NextResponse.json(
            { error: 'Failed to update likes' },
            { status: 500 }
        )
    }
}
