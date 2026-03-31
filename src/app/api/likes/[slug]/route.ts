import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { notion } from '@/lib/notion/client'
import { getWritingDbId } from '@/lib/notion/config'
import { resolveDataSourceId } from '@/lib/notion/resolve-data-source-id'
import type { PageObjectResponse } from '@/lib/notion/types'

export async function POST(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params

    const body = await request.json()
    const count = body?.count
    if (!Number.isInteger(count) || count < 1 || count > 10) {
        return NextResponse.json(
            { error: 'count must be an integer between 1 and 10' },
            { status: 400 }
        )
    }

    try {
        const dataSourceId = await resolveDataSourceId(getWritingDbId())
        const response = await notion.dataSources.query({
            data_source_id: dataSourceId,
            filter: {
                and: [
                    { property: 'Slug', rich_text: { equals: slug } },
                    { property: 'Status', select: { equals: 'Published' } },
                ],
            },
        })

        if (!response.results.length) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            )
        }

        const page = response.results[0] as PageObjectResponse
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

        revalidateTag('writing', 'max')
        revalidateTag(`writing:${slug}`, 'max')

        return NextResponse.json({ likes: newTotal })
    } catch (e) {
        console.error(`Failed to update likes for "${slug}":`, e)
        return NextResponse.json(
            { error: 'Failed to update likes' },
            { status: 500 }
        )
    }
}
