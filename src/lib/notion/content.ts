import 'server-only'
import snapshot from '@/generated/notion-content.json'
import type {
    ContentSnapshot,
    NotionBlock,
    PageObjectResponse,
    SnapshotKey,
} from './types'

/**
 * Reads the build-time content snapshot written by `scripts/sync-notion-assets.ts`.
 *
 * The site is fully static: every page that renders Notion content is
 * prerendered, so the content only ever needs to be current as of the build.
 * Fetching it here instead of during prerender halves the build's Notion
 * traffic and, more importantly, keeps the rate limit off the prerender path —
 * a throttled request there blew Next's 50s cache-fill budget and failed the
 * build. Likes are the one thing still read from Notion at request time.
 *
 * The `as` cast is deliberate: TypeScript would otherwise infer a type for the
 * entire ~1 MB literal on every typecheck.
 */
const content = snapshot as unknown as ContentSnapshot

/** Pages for a database, already filtered and sorted the way Notion returned them. */
export function getSnapshotPages(key: SnapshotKey): PageObjectResponse[] {
    return content[key].pages
}

/** A page's block tree, nested children included. */
export function getSnapshotBlocks(
    key: SnapshotKey,
    pageId: string
): NotionBlock[] {
    return content[key].blocks[pageId] ?? []
}
