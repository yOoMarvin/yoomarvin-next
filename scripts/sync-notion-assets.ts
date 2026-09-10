/**
 * The single Notion crawl for a build.
 *
 * Walks every page and block of the writing, work and TIL databases exactly
 * once, then writes two files:
 *
 * - `public/notion-assets/` + `notion-asset-manifest.json` — every Notion-hosted
 *   image downloaded locally, so the site never depends on Notion's signed S3
 *   URLs (which expire after ~1 h). `localizeNotionUrl` rewrites URLs using it.
 * - `notion-content.json` — the pages and blocks themselves, which the app's
 *   data layer reads instead of querying Notion again.
 *
 * That second file exists because this script and `next build` used to crawl
 * Notion independently, back to back. ~184 requests against a ~3 req/s limit
 * meant the build got rate limited mid-prerender, and a post that failed to
 * render was cached as a permanent 404.
 */

import path from 'node:path'
import fs from 'node:fs/promises'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { loadEnvConfig } from '@next/env'
import { Client } from '@notionhq/client'
import type {
    PageObjectResponse,
    BlockObjectResponse,
    PartialBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import type {
    ContentSnapshot,
    DatabaseSnapshot,
    NotionBlock,
    SnapshotKey,
} from '../src/lib/notion/types'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
loadEnvConfig(rootDir)

const PUBLIC_DIR = path.join(rootDir, 'public', 'notion-assets')
const MANIFEST_PATH = path.join(
    rootDir,
    'src',
    'generated',
    'notion-asset-manifest.json'
)
const CONTENT_PATH = path.join(
    rootDir,
    'src',
    'generated',
    'notion-content.json'
)

const NOTION_HOST_PATTERNS = [
    /(^|\.)notion-static\.com$/i,
    /(^|\.)notion\.so$/i,
    /(^|\.)notion\.site$/i,
    /(^|\.)amazonaws\.com$/i,
]

type NotionUrl = { url: string; pathname: string }

function requireEnv(name: string): string {
    const value = process.env[name]
    if (!value)
        throw new Error(`Missing required environment variable: ${name}`)
    return value
}

const notion = new Client({ auth: requireEnv('NOTION_TOKEN') })

async function resolveDataSourceId(databaseId: string): Promise<string> {
    const db = await notion.databases.retrieve({ database_id: databaseId })
    const dataSources = (db as Record<string, unknown>).data_sources as
        | Array<{ id: string }>
        | undefined
    if (!dataSources?.length) {
        throw new Error(
            `No data sources found on database ${databaseId}. ` +
                'Ensure the database is shared with the integration.'
        )
    }
    return dataSources[0].id
}

async function queryAllPages(
    dataSourceId: string,
    options: { publishedOnly: boolean }
): Promise<PageObjectResponse[]> {
    const results: PageObjectResponse[] = []
    let cursor: string | undefined
    do {
        const response = await notion.dataSources.query({
            data_source_id: dataSourceId,
            // Mirrors the filter and sort the app's data layer used to send
            // itself. Keeping them identical is what lets the app read the
            // snapshot without re-sorting or re-filtering.
            filter: options.publishedOnly
                ? { property: 'Status', select: { equals: 'Published' } }
                : undefined,
            sorts: [{ property: 'Date', direction: 'descending' }],
            start_cursor: cursor,
            page_size: 100,
        })
        for (const page of response.results) {
            if ('properties' in page) results.push(page as PageObjectResponse)
        }
        cursor = response.has_more
            ? (response.next_cursor ?? undefined)
            : undefined
    } while (cursor)
    return results
}

/**
 * Fetches a block tree, nesting children under `children` — the same shape the
 * app's renderer expects, so the result can be stored in the snapshot as-is.
 */
async function listAllBlocks(blockId: string): Promise<NotionBlock[]> {
    const blocks: NotionBlock[] = []
    let cursor: string | undefined
    do {
        const response = await notion.blocks.children.list({
            block_id: blockId,
            start_cursor: cursor,
            page_size: 100,
        })
        for (const block of response.results as Array<
            BlockObjectResponse | PartialBlockObjectResponse
        >) {
            if (!('type' in block)) continue
            blocks.push(
                block.has_children
                    ? { ...block, children: await listAllBlocks(block.id) }
                    : block
            )
        }
        cursor = response.has_more
            ? (response.next_cursor ?? undefined)
            : undefined
    } while (cursor)
    return blocks
}

function flattenBlocks(blocks: NotionBlock[]): NotionBlock[] {
    return blocks.flatMap((block) => [
        block,
        ...flattenBlocks(block.children ?? []),
    ])
}

function isNotionHostedUrl(url: string): boolean {
    try {
        const parsed = new URL(url)
        if (parsed.searchParams.has('X-Amz-Signature')) return true
        return NOTION_HOST_PATTERNS.some((pattern) =>
            pattern.test(parsed.hostname)
        )
    } catch {
        return false
    }
}

function extractCoverImageUrl(page: PageObjectResponse): string | null {
    const cover = page.properties.CoverImage
    if (!cover || cover.type !== 'files' || cover.files.length === 0)
        return null
    const file = cover.files[0]
    if (file.type === 'external') return file.external.url
    if (file.type === 'file') return file.file.url
    return null
}

function extractBlockUrls(block: BlockObjectResponse): string[] {
    const urls: string[] = []
    if (block.type === 'image') {
        urls.push(
            block.image.type === 'external'
                ? block.image.external.url
                : block.image.file.url
        )
    } else if (block.type === 'video') {
        urls.push(
            block.video.type === 'external'
                ? block.video.external.url
                : block.video.file.url
        )
    } else if (block.type === 'file') {
        urls.push(
            block.file.type === 'external'
                ? block.file.external.url
                : block.file.file.url
        )
    }
    return urls
}

function toStableKey(url: string): NotionUrl | null {
    try {
        const { pathname } = new URL(url)
        return { url, pathname }
    } catch {
        return null
    }
}

function extFor(pathname: string): string {
    const ext = path.extname(pathname).toLowerCase()
    if (ext && ext.length <= 6) return ext
    return '.bin'
}

function hashFor(pathname: string): string {
    return crypto
        .createHash('sha256')
        .update(pathname)
        .digest('hex')
        .slice(0, 16)
}

async function download(url: string, dest: string): Promise<void> {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(
            `Failed to download ${url}: ${response.status} ${response.statusText}`
        )
    }
    const buffer = Buffer.from(await response.arrayBuffer())
    await fs.writeFile(dest, buffer)
}

async function fileExists(p: string): Promise<boolean> {
    try {
        await fs.stat(p)
        return true
    } catch {
        return false
    }
}

const DATABASES: Array<{
    key: SnapshotKey
    env: string
    // Work has no Status filter in Notion; the app drops archived items in
    // memory instead. Writing and TIL filter at the query.
    publishedOnly: boolean
}> = [
    { key: 'writing', env: 'NOTION_WRITING_DB_ID', publishedOnly: true },
    { key: 'work', env: 'NOTION_WORK_DB_ID', publishedOnly: false },
    { key: 'til', env: 'NOTION_TIL_DB_ID', publishedOnly: true },
]

async function crawlDatabase(
    env: string,
    publishedOnly: boolean
): Promise<DatabaseSnapshot> {
    const dataSourceId = await resolveDataSourceId(requireEnv(env))
    const pages = await queryAllPages(dataSourceId, { publishedOnly })

    const blocks: Record<string, NotionBlock[]> = {}
    for (const page of pages) {
        blocks[page.id] = await listAllBlocks(page.id)
    }

    return { pages, blocks }
}

async function crawl(): Promise<ContentSnapshot> {
    const snapshot: Partial<ContentSnapshot> = {
        generatedAt: new Date().toISOString(),
    }

    // Sequential on purpose. Notion allows ~3 requests/second and Vercel builds
    // on a single worker; running the three databases in parallel is what used
    // to push this over the limit.
    for (const { key, env, publishedOnly } of DATABASES) {
        const result = await crawlDatabase(env, publishedOnly)
        snapshot[key] = result
        console.log(`  ${key}: ${result.pages.length} page(s)`)
    }

    return snapshot as ContentSnapshot
}

function collectNotionUrls(snapshot: ContentSnapshot): NotionUrl[] {
    const rawUrls: string[] = []

    for (const page of snapshot.work.pages) {
        const cover = extractCoverImageUrl(page)
        if (cover) rawUrls.push(cover)
    }

    for (const { key } of DATABASES) {
        for (const blocks of Object.values(snapshot[key].blocks)) {
            for (const block of flattenBlocks(blocks)) {
                rawUrls.push(...extractBlockUrls(block))
            }
        }
    }

    const seen = new Map<string, NotionUrl>()
    for (const raw of rawUrls) {
        if (!isNotionHostedUrl(raw)) continue
        const entry = toStableKey(raw)
        if (!entry) continue
        if (!seen.has(entry.pathname)) seen.set(entry.pathname, entry)
    }

    return Array.from(seen.values())
}

async function sync(): Promise<void> {
    await fs.mkdir(PUBLIC_DIR, { recursive: true })
    await fs.mkdir(path.dirname(MANIFEST_PATH), { recursive: true })

    console.log('Crawling Notion (writing, work, TIL)...')
    const snapshot = await crawl()

    await fs.writeFile(CONTENT_PATH, JSON.stringify(snapshot) + '\n')
    console.log(
        `Content snapshot written (${(
            (await fs.stat(CONTENT_PATH)).size /
            1024 /
            1024
        ).toFixed(2)} MB)`
    )

    const urls = collectNotionUrls(snapshot)
    console.log(`Found ${urls.length} unique Notion-hosted asset(s)`)

    const manifest: Record<string, string> = {}
    let downloaded = 0
    let skipped = 0

    for (const { url, pathname } of urls) {
        const hash = hashFor(pathname)
        const ext = extFor(pathname)
        const filename = `${hash}${ext}`
        const localPath = `/notion-assets/${filename}`
        const dest = path.join(PUBLIC_DIR, filename)

        if (await fileExists(dest)) {
            skipped++
        } else {
            try {
                await download(url, dest)
                downloaded++
                console.log(`  downloaded ${filename}`)
            } catch (err) {
                console.warn(`  skipped ${filename}:`, (err as Error).message)
                continue
            }
        }
        manifest[pathname] = localPath
    }

    const sortedManifest: Record<string, string> = {}
    for (const key of Object.keys(manifest).sort()) {
        sortedManifest[key] = manifest[key]
    }

    await fs.writeFile(
        MANIFEST_PATH,
        JSON.stringify(sortedManifest, null, 2) + '\n'
    )

    console.log(
        `Manifest written with ${Object.keys(sortedManifest).length} entries (${downloaded} downloaded, ${skipped} cached)`
    )
}

sync().catch((err) => {
    console.error('sync-notion-assets failed:', err)
    process.exit(1)
})
