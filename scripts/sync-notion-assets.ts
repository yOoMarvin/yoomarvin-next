/**
 * Downloads every Notion-hosted image referenced by published writing, work,
 * and TIL pages into `public/notion-assets/` at build time and emits a manifest
 * mapping stable Notion URL paths to the local asset paths.
 *
 * The runtime `localizeNotionUrl` helper rewrites URLs using this manifest so
 * the site never depends on Notion's signed S3 URLs (which expire after ~1 h).
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

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
loadEnvConfig(rootDir)

const PUBLIC_DIR = path.join(rootDir, 'public', 'notion-assets')
const MANIFEST_PATH = path.join(
    rootDir,
    'src',
    'generated',
    'notion-asset-manifest.json'
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
    dataSourceId: string
): Promise<PageObjectResponse[]> {
    const results: PageObjectResponse[] = []
    let cursor: string | undefined
    do {
        const response = await notion.dataSources.query({
            data_source_id: dataSourceId,
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

async function listAllBlocks(blockId: string): Promise<BlockObjectResponse[]> {
    const blocks: BlockObjectResponse[] = []
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
            blocks.push(block)
            if (block.has_children) {
                const children = await listAllBlocks(block.id)
                blocks.push(...children)
            }
        }
        cursor = response.has_more
            ? (response.next_cursor ?? undefined)
            : undefined
    } while (cursor)
    return blocks
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

async function collectNotionUrls(): Promise<NotionUrl[]> {
    const writingDbId = requireEnv('NOTION_WRITING_DB_ID')
    const workDbId = requireEnv('NOTION_WORK_DB_ID')
    const tilDbId = requireEnv('NOTION_TIL_DB_ID')

    const [writingDs, workDs, tilDs] = await Promise.all([
        resolveDataSourceId(writingDbId),
        resolveDataSourceId(workDbId),
        resolveDataSourceId(tilDbId),
    ])

    const [writingPages, workPages, tilPages] = await Promise.all([
        queryAllPages(writingDs),
        queryAllPages(workDs),
        queryAllPages(tilDs),
    ])

    const allPages = [...writingPages, ...workPages, ...tilPages]

    const seen = new Map<string, NotionUrl>()
    const rawUrls: string[] = []

    for (const page of workPages) {
        const cover = extractCoverImageUrl(page)
        if (cover) rawUrls.push(cover)
    }

    for (const page of allPages) {
        const blocks = await listAllBlocks(page.id)
        for (const block of blocks) rawUrls.push(...extractBlockUrls(block))
    }

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

    console.log('Collecting Notion-hosted URLs from writing, work, and TIL...')
    const urls = await collectNotionUrls()
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
