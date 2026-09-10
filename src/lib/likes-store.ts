import type { LikeableType } from '@/lib/notion/types'

// Long enough that every LikeButton mounting on the same page shares one
// request, short enough that counts still look live when you navigate back.
const TTL_MS = 30_000

interface CacheEntry {
    likes: Promise<Record<string, number>>
    fetchedAt: number
}

const cache = new Map<LikeableType, CacheEntry>()

/**
 * Fetches every like count for a content type, deduplicating concurrent and
 * repeated callers. /til mounts 29 LikeButtons; without this they would issue
 * 29 requests, each of which costs a Notion call server-side.
 */
export function fetchLikes(
    type: LikeableType
): Promise<Record<string, number>> {
    const cached = cache.get(type)
    if (cached && Date.now() - cached.fetchedAt < TTL_MS) {
        return cached.likes
    }

    const likes = fetch(`/api/likes?type=${type}`)
        .then((res) => res.json())
        .then((data) => (data?.likes as Record<string, number>) ?? {})

    // Never cache a failure — the next mount should retry.
    likes.catch(() => cache.delete(type))
    cache.set(type, { likes, fetchedAt: Date.now() })

    return likes
}

/** Drops the cached counts so the next read reflects a just-posted like. */
export function invalidateLikes(type: LikeableType): void {
    cache.delete(type)
}
