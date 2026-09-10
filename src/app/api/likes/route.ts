import { NextResponse } from 'next/server'
import { getLikes } from '@/lib/notion/likes'
import type { LikeableType } from '@/lib/notion/types'

function parseType(request: Request): LikeableType {
    const { searchParams } = new URL(request.url)
    return searchParams.get('type') === 'til' ? 'til' : 'writing'
}

/**
 * Every like count for one content type, so a page renders its LikeButtons
 * from a single request instead of one per button.
 */
export async function GET(request: Request) {
    const type = parseType(request)

    try {
        return NextResponse.json({ likes: await getLikes(type) })
    } catch (e) {
        console.error(`Failed to fetch ${type} likes:`, e)
        return NextResponse.json(
            { error: 'Failed to fetch likes' },
            { status: 500 }
        )
    }
}
