# Writing Section — Implementation Plan (Refined)

## Overview

Two pages to build: `/writing` (list) and `/writing/[slug]` (post detail).
Powered by Notion. Statically generated with `'use cache'` for performance.
Draft posts visible in the list but not clickable.

Additionally: remove Velite entirely from the project and migrate the homepage to use Notion for writing + a static data file for work items.

### Next.js config requirement

`'use cache'` is stable in Next.js 16 but must be explicitly enabled in `next.config.ts`:

```ts
const nextConfig: NextConfig = {
    cacheComponents: true,
    // ... existing config
}
```

### Key API notes (verified against latest docs)

- **`'use cache'`**: stable in v16, requires `cacheComponents: true`
- **`cacheLife` / `cacheTag`**: imported from `next/cache`
- **`params`**: is a `Promise` in all page components, `generateMetadata`, and OG image files — must `await`
- **`generateStaticParams`**: with Cache Components, must return at least one param — empty array causes build error. We guard against this with `dynamicParams = true` (default) so unlisted slugs still render on-demand.
- **Notion rate limit**: 3 requests/second per integration — fine with caching, no special handling needed
- **Rich text annotations**: includes `bold`, `italic`, `strikethrough`, `underline`, `code`, `color` — we handle all relevant ones in the renderer

---

## Phase 1: Remove Velite & Migrate Homepage Data

### 1a. Create `src/lib/work-data.ts`

Static work items array following the existing `about-data.ts` pattern:

```ts
export interface WorkItem {
    title: string
    description: string
    icon?: string // Iconoir icon name
    href: string // internal or external URL
}

export const featuredWork: WorkItem[] = [
    {
        title: 'Fighill',
        description: 'A Figma plugin that makes design progress visible',
        icon: 'Figma',
        href: '/work/fighill',
    },
    {
        title: 'Lab',
        description: 'My playground & learnings for interaction concepts',
        icon: 'Atom',
        href: '/lab',
    },
    {
        title: 'Pixel Perfect Picks',
        description: 'A weekly newsletter about the stuff I find',
        icon: 'Mail',
        href: 'https://world.hey.com/mrvn',
    },
]
```

### 1b. Update homepage (`src/app/page.tsx`)

- Remove `import { posts, work } from '.velite'`
- Import `featuredWork` from `@/lib/work-data`
- Writing section: fetch from Notion via `getWritingPosts()`, filter to published, take first 6
- Work section: use static `featuredWork` array directly (no filter/sort needed — already curated)

### 1c. Delete Velite-related files

- `velite.config.ts`
- `content/posts/` (all MDX files — 19 posts)
- `content/work/` (3 MDX files)
- `.velite/` (generated output)

### 1d. Uninstall Velite & cleanup

```bash
npm uninstall velite
```

- Remove `.velite` from `.gitignore`
- Remove any `velite` scripts from `package.json`
- Remove any Velite webpack plugin from `next.config.ts` (already clean — no plugin present)
- Add `cacheComponents: true` to `next.config.ts` (required for `'use cache'`)

**Files modified:** `src/app/page.tsx`, `package.json`, `.gitignore`, `next.config.ts`
**Files created:** `src/lib/work-data.ts`
**Files deleted:** `velite.config.ts`, `content/posts/`, `content/work/`, `.velite/`

---

## Phase 2: Notion Data Layer

### Notion DB Schema (already created)

| Property | Type      | Notes                              |
| -------- | --------- | ---------------------------------- |
| Title    | title     | —                                  |
| Slug     | rich_text | url-safe, manually set             |
| Status   | select    | `Draft` / `Published` / `Archived` |
| Date     | date      | publish date (null for drafts)     |
| Excerpt  | rich_text | listing + OG meta                  |

Future content types (case studies, TIL, projects) will use **separate Notion databases** — no Type/Category property needed here.

### 2a. `src/lib/notion/client.ts`

```ts
import { Client } from '@notionhq/client'

export const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})

export const WRITING_DB_ID = process.env.NOTION_WRITING_DB_ID!
```

### 2b. `src/lib/notion/types.ts`

```ts
import type {
    PageObjectResponse,
    BlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'

export type PostStatus = 'Draft' | 'Published' | 'Archived'

export interface PostMeta {
    id: string
    title: string
    slug: string
    status: PostStatus
    date: string | null // ISO date, null for drafts
    excerpt: string
}

export interface Post extends PostMeta {
    blocks: BlockObjectResponse[]
}

// Re-export for convenience
export type { PageObjectResponse, BlockObjectResponse }
```

### 2c. `src/lib/notion/writing.ts`

```ts
import 'server-only'
import { cacheLife, cacheTag } from 'next/cache'
import { notion, WRITING_DB_ID } from './client'
import type {
    PostMeta,
    Post,
    PageObjectResponse,
    BlockObjectResponse,
} from './types'

// ─── List all posts (published + drafts, exclude archived) ──────────────────
export async function getWritingPosts(): Promise<PostMeta[]> {
    'use cache'
    cacheLife('hours')
    cacheTag('writing')

    const response = await notion.databases.query({
        database_id: WRITING_DB_ID,
        filter: {
            property: 'Status',
            select: { does_not_equal: 'Archived' },
        },
        sorts: [{ property: 'Date', direction: 'descending' }],
    })

    return response.results.map((page) =>
        pageToMeta(page as PageObjectResponse)
    )
}

// ─── Single post by slug (published only) ───────────────────────────────────
export async function getWritingPost(slug: string): Promise<Post | null> {
    'use cache'
    cacheLife('hours')
    cacheTag('writing', `writing:${slug}`)

    const response = await notion.databases.query({
        database_id: WRITING_DB_ID,
        filter: {
            and: [
                { property: 'Slug', rich_text: { equals: slug } },
                { property: 'Status', select: { equals: 'Published' } },
            ],
        },
    })

    if (!response.results.length) return null

    const page = response.results[0] as PageObjectResponse
    const meta = pageToMeta(page)
    const blocks = await getBlocks(page.id)

    return { ...meta, blocks }
}

// ─── Fetch blocks (handles pagination) ──────────────────────────────────────
async function getBlocks(pageId: string): Promise<BlockObjectResponse[]> {
    const blocks: BlockObjectResponse[] = []
    let cursor: string | undefined

    do {
        const response = await notion.blocks.children.list({
            block_id: pageId,
            start_cursor: cursor,
            page_size: 100,
        })
        blocks.push(...(response.results as BlockObjectResponse[]))
        cursor = response.has_more
            ? (response.next_cursor ?? undefined)
            : undefined
    } while (cursor)

    return blocks
}

// ─── Notion page → PostMeta ─────────────────────────────────────────────────
function pageToMeta(page: PageObjectResponse): PostMeta {
    const props = page.properties
    return {
        id: page.id,
        title:
            props.Title?.type === 'title'
                ? (props.Title.title[0]?.plain_text ?? 'Untitled')
                : 'Untitled',
        slug:
            props.Slug?.type === 'rich_text'
                ? (props.Slug.rich_text[0]?.plain_text ?? '')
                : '',
        status:
            props.Status?.type === 'select'
                ? ((props.Status.select?.name as PostMeta['status']) ?? 'Draft')
                : 'Draft',
        date:
            props.Date?.type === 'date'
                ? (props.Date.date?.start ?? null)
                : null,
        excerpt:
            props.Excerpt?.type === 'rich_text'
                ? (props.Excerpt.rich_text[0]?.plain_text ?? '')
                : '',
    }
}
```

**Files created:** `src/lib/notion/client.ts`, `src/lib/notion/types.ts`, `src/lib/notion/writing.ts`

---

## Phase 3: Extend PostRow Component

Update existing `src/components/ui/post-row.tsx` to handle draft state properly:

```tsx
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface PostRowProps {
    title: string
    href: string
    draft?: boolean
}

export function PostRow({ title, href, draft }: PostRowProps) {
    const inner = (
        <div
            className={cn(
                'group flex items-center gap-2 py-1',
                draft && 'opacity-50 cursor-not-allowed select-none'
            )}
        >
            <span
                className={cn(
                    'text-xl font-medium text-[var(--text-primary)]',
                    !draft && 'group-hover:underline'
                )}
            >
                {title}
            </span>
            {draft && (
                <span className="rounded border border-[var(--border-default)] px-1.5 py-0.5 font-mono text-xs text-[var(--text-tertiary)]">
                    DRAFT
                </span>
            )}
        </div>
    )

    if (draft) return inner

    return (
        <Link href={href} className="block">
            {inner}
        </Link>
    )
}
```

Key changes from current:

- When `draft` is true: no `<Link>` wrapper, muted opacity, `cursor-not-allowed`, no hover underline
- When `draft` is false: wrapped in `<Link>`, hover underline on title
- Uses existing CSS variable tokens (already correct in current component)

**Files modified:** `src/components/ui/post-row.tsx`

---

## Phase 4: Notion Block Renderer

### `src/components/writing/render-blocks.tsx`

Key improvements over original plan:

1. **List grouping** — consecutive `bulleted_list_item` / `numbered_list_item` blocks are grouped into `<ul>` / `<ol>` wrappers
2. **No redundant `<span>` wrappers** — plain text without annotations rendered directly
3. **CSS variable tokens** for all colors
4. **Proper types** from Notion SDK

```tsx
import type {
    BlockObjectResponse,
    RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'

export function renderBlocks(blocks: BlockObjectResponse[]) {
    const elements: React.ReactNode[] = []
    let i = 0

    while (i < blocks.length) {
        const block = blocks[i]

        // Group consecutive list items into <ul> or <ol>
        if (block.type === 'bulleted_list_item') {
            const items: BlockObjectResponse[] = []
            while (
                i < blocks.length &&
                blocks[i].type === 'bulleted_list_item'
            ) {
                items.push(blocks[i])
                i++
            }
            elements.push(
                <ul key={items[0].id}>
                    {items.map((item) => (
                        <li key={item.id}>
                            {renderRichText(
                                (item as Record<string, unknown>)
                                    .bulleted_list_item.rich_text
                            )}
                        </li>
                    ))}
                </ul>
            )
            continue
        }

        if (block.type === 'numbered_list_item') {
            const items: BlockObjectResponse[] = []
            while (
                i < blocks.length &&
                blocks[i].type === 'numbered_list_item'
            ) {
                items.push(blocks[i])
                i++
            }
            elements.push(
                <ol key={items[0].id}>
                    {items.map((item) => (
                        <li key={item.id}>
                            {renderRichText(
                                (item as Record<string, unknown>)
                                    .numbered_list_item.rich_text
                            )}
                        </li>
                    ))}
                </ol>
            )
            continue
        }

        elements.push(<Block key={block.id} block={block} />)
        i++
    }

    return elements
}

function Block({ block }: { block: BlockObjectResponse }) {
    // Type narrowing helper — access block content safely
    const b = block as Record<string, unknown>

    switch (block.type) {
        case 'paragraph':
            return <p>{renderRichText(b.paragraph.rich_text)}</p>
        case 'heading_1':
            return <h1>{renderRichText(b.heading_1.rich_text)}</h1>
        case 'heading_2':
            return <h2>{renderRichText(b.heading_2.rich_text)}</h2>
        case 'heading_3':
            return <h3>{renderRichText(b.heading_3.rich_text)}</h3>
        case 'quote':
            return <blockquote>{renderRichText(b.quote.rich_text)}</blockquote>
        case 'code':
            return (
                <pre>
                    <code>{renderRichText(b.code.rich_text)}</code>
                </pre>
            )
        case 'image': {
            const src =
                b.image.type === 'external'
                    ? b.image.external.url
                    : b.image.file.url
            const caption = b.image.caption?.[0]?.plain_text ?? ''
            return (
                <figure>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={src}
                        alt={caption}
                        className="w-full rounded-lg"
                    />
                    {caption && (
                        <figcaption className="mt-2 text-center text-sm text-[var(--text-tertiary)]">
                            {caption}
                        </figcaption>
                    )}
                </figure>
            )
        }
        case 'divider':
            return <hr />
        default:
            return null
    }
}

function renderRichText(richText: RichTextItemResponse[]) {
    if (!richText?.length) return null
    return richText.map((t, i) => {
        let node: React.ReactNode = t.plain_text

        if (t.annotations.bold) node = <strong key={i}>{node}</strong>
        if (t.annotations.italic) node = <em key={i}>{node}</em>
        if (t.annotations.strikethrough) node = <s key={i}>{node}</s>
        if (t.annotations.underline) node = <u key={i}>{node}</u>
        if (t.annotations.code) node = <code key={i}>{node}</code>
        if (t.href)
            node = (
                <a key={i} href={t.href}>
                    {node}
                </a>
            )

        const hasAnnotation =
            t.annotations.bold ||
            t.annotations.italic ||
            t.annotations.strikethrough ||
            t.annotations.underline ||
            t.annotations.code ||
            t.href
        if (hasAnnotation) return node
        return richText.length > 1 ? <span key={i}>{node}</span> : node
    })
}
```

> **Note on typing:** The Notion SDK's `BlockObjectResponse` is a discriminated union, but accessing block-specific properties (e.g., `block.paragraph.rich_text`) requires type narrowing per block type. The `as Record<string, unknown>` cast is a pragmatic approach — the switch/case on `block.type` already provides runtime safety. This can be improved with proper type guards if the renderer grows.

**Files created:** `src/components/writing/render-blocks.tsx`

---

## Phase 5: Writing Pages

### 5a. `/writing` list page — `src/app/writing/page.tsx`

Posts grouped by year. Draft posts shown with badge but not clickable.

```
Writing

2025
────────────────────────────────────
Building Fighill
The state of design tools    [DRAFT]

2024
────────────────────────────────────
Book Bites 2024
...
```

```tsx
import { getWritingPosts } from '@/lib/notion/writing'
import { PostRow } from '@/components/ui/post-row'

export default async function WritingPage() {
    const posts = await getWritingPosts()

    // Group by year
    const byYear = posts.reduce<Record<string, typeof posts>>((acc, post) => {
        const year = post.date
            ? new Date(post.date).getFullYear().toString()
            : 'Undated'
        ;(acc[year] ??= []).push(post)
        return acc
    }, {})

    const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a))

    return (
        <>
            <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
                Writing
            </h1>

            <div className="space-y-12">
                {years.map((year) => (
                    <section key={year}>
                        <p className="mb-4 font-mono text-sm text-[var(--text-tertiary)]">
                            {year}
                        </p>
                        <div className="divide-y divide-[var(--border-subtle)]">
                            {byYear[year].map((post) => (
                                <PostRow
                                    key={post.id}
                                    title={post.title}
                                    href={`/writing/${post.slug}`}
                                    draft={post.status === 'Draft'}
                                />
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </>
    )
}
```

### 5b. `/writing/[slug]` post detail — `src/app/writing/[slug]/page.tsx`

```tsx
import { getWritingPost, getWritingPosts } from '@/lib/notion/writing'
import { renderBlocks } from '@/components/writing/render-blocks'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateStaticParams() {
    const posts = await getWritingPosts()
    return posts
        .filter((p) => p.status === 'Published' && p.slug)
        .map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const post = await getWritingPost(slug)
    if (!post) return {}
    return {
        title: post.title,
        description: post.excerpt,
    }
}

export default async function WritingPostPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const [post, allPosts] = await Promise.all([
        getWritingPost(slug),
        getWritingPosts(),
    ])

    if (!post) notFound()

    const cleanDate = post.date
        ? new Intl.DateTimeFormat('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
          }).format(new Date(post.date))
        : null

    // Related: 5 most recent published posts excluding current
    const related = allPosts
        .filter((p) => p.status === 'Published' && p.slug !== post.slug)
        .slice(0, 5)

    return (
        <>
            {/* Header */}
            <div className="space-y-3">
                {cleanDate && (
                    <p className="font-mono text-sm text-[var(--text-tertiary)]">
                        {cleanDate}
                    </p>
                )}
                <h1 className="text-2xl font-semibold leading-snug text-[var(--text-primary)]">
                    {post.title}
                </h1>
            </div>

            {/* Body */}
            <div
                className="prose prose-zinc dark:prose-invert max-w-none
        prose-p:text-[var(--text-secondary)] prose-p:text-lg prose-p:leading-relaxed
        prose-headings:font-semibold
        prose-a:text-[var(--text-primary)] prose-a:underline prose-a:underline-offset-2
        prose-code:text-sm prose-code:font-mono
        prose-code:bg-[var(--bg-subtle)] prose-code:px-1 prose-code:rounded"
            >
                {renderBlocks(post.blocks)}
            </div>

            {/* Footer — Read next */}
            {related.length > 0 && (
                <div className="border-t border-[var(--border-default)] pt-8">
                    <p className="mb-4 text-sm text-[var(--text-tertiary)]">
                        Read next
                    </p>
                    <div className="space-y-1">
                        {related.map((p) => (
                            <Link
                                key={p.id}
                                href={`/writing/${p.slug}`}
                                className="block py-1 text-sm text-[var(--text-secondary)]
                  transition-colors duration-100
                  hover:text-[var(--text-primary)]"
                            >
                                {p.title}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
```

### 5c. OG image — `src/app/writing/[slug]/opengraph-image.tsx`

```tsx
import { ImageResponse } from 'next/og'
import { getWritingPost } from '@/lib/notion/writing'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const post = await getWritingPost(slug)

    return new ImageResponse(
        <div
            style={{
                background: '#fafafa',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '80px',
            }}
        >
            <p
                style={{
                    color: '#a1a1aa',
                    fontSize: 24,
                    margin: '0 0 16px',
                    fontFamily: 'ui-monospace, monospace',
                }}
            >
                marvinmessenzehl.com
            </p>
            <p
                style={{
                    color: '#18181b',
                    fontSize: 56,
                    fontWeight: 600,
                    margin: 0,
                    lineHeight: 1.1,
                }}
            >
                {post?.title ?? 'Writing'}
            </p>
        </div>,
        size
    )
}
```

Inline styles are required by `ImageResponse` — this is an intentional exception to the "no inline styles" rule.

**Files created:** `src/app/writing/page.tsx`, `src/app/writing/[slug]/page.tsx`, `src/app/writing/[slug]/opengraph-image.tsx`

---

## Phase 6: Redirects & Environment

### Redirects

Already configured in `next.config.ts`:

- `/blog` → `/writing` (308 permanent)
- `/blog/:slug` → `/writing/:slug` (308 permanent)

No changes needed.

### Environment variables

**.env.local** (never commit):

```bash
NOTION_TOKEN=secret_xxx
NOTION_WRITING_DB_ID=2fdcad6f-34e5-40c9-bb73-e58bca3b6e5a
```

**.env.example** (commit — safe reference):

```bash
NOTION_TOKEN=
NOTION_WRITING_DB_ID=
```

**Vercel:** Add both variables, scope to Production + Preview.

**.gitignore** — confirm `.env.local` and `.env*.local` are listed (they are).

---

## Legibility — Typography Rules

These go in `globals.css` or as Tailwind prose config. Non-negotiable.

| Property          | Value                             | Reason                               |
| ----------------- | --------------------------------- | ------------------------------------ |
| `max-width`       | same as main layout (`max-w-2xl`) | Consistent with the rest of the site |
| `font-size`       | `text-lg` (18px)                  | Comfortable reading size             |
| `line-height`     | `leading-relaxed` (1.625)         | Breathing room between lines         |
| `font-weight`     | `font-normal`                     | Light weight reduces eye fatigue     |
| Paragraph spacing | prose default                     | Clear separation between thoughts    |
| Mobile font-size  | Same — no reduction               | `text-lg` holds on all sizes         |

The `@tailwindcss/typography` prose classes handle most of this automatically.

---

## File Structure (final)

```
src/
├── lib/
│   ├── work-data.ts             ← static work items (replaces Velite)
│   ├── about-data.ts            ← existing, unchanged
│   ├── utils.ts                 ← existing, unchanged
│   └── notion/
│       ├── client.ts            ← Notion client + env vars
│       ├── types.ts             ← PostMeta, Post, re-exported Notion types
│       └── writing.ts           ← getWritingPosts, getWritingPost
├── app/
│   ├── page.tsx                 ← homepage (uses Notion + static work data)
│   ├── writing/
│   │   ├── page.tsx             ← /writing list
│   │   └── [slug]/
│   │       ├── page.tsx         ← /writing/[slug] detail
│   │       └── opengraph-image.tsx
└── components/
    ├── ui/
    │   └── post-row.tsx         ← extended with draft support
    └── writing/
        └── render-blocks.tsx    ← Notion block → React renderer
```

---

## Implementation Order

1. Install `@notionhq/client`, set up `.env.local`
2. Create Notion data layer (`client.ts`, `types.ts`, `writing.ts`)
3. Create `src/lib/work-data.ts` (static work items)
4. Update homepage to use Notion for writing, static data for work
5. Remove Velite entirely (config, content, package, .gitignore)
6. Extend `PostRow` component with draft handling
7. Build `render-blocks.tsx` (with list grouping)
8. Build `/writing` list page (replace placeholder)
9. Build `/writing/[slug]` detail page (replace placeholder)
10. Build OG image generator
11. Create `.env.example`
12. Verify build passes

---

## Testing Checklist

### Data layer

- [ ] `getWritingPosts()` returns both published and draft posts
- [ ] `getWritingPost(slug)` returns `null` for drafts
- [ ] `getWritingPost(slug)` returns `null` for unknown slugs → triggers `notFound()`
- [ ] Pagination works: posts with >100 blocks render fully

### Homepage

- [ ] Recent writing section shows posts from Notion
- [ ] Work section shows static items correctly
- [ ] No Velite imports remain anywhere

### Writing list page

- [ ] Published posts render as clickable links
- [ ] Draft posts render with DRAFT badge, `cursor-not-allowed`, no `<Link>`
- [ ] Archived posts do not appear
- [ ] Posts group correctly by year
- [ ] Drafts with no date don't crash
- [ ] Dark mode + mobile correct

### Post detail page

- [ ] Published post slug renders correctly
- [ ] Draft slug returns 404
- [ ] Archived slug returns 404
- [ ] Unknown slug returns 404
- [ ] Date formats correctly (e.g., "Feb 1, 2025")
- [ ] "Read next" shows up to 5 posts, never includes current
- [ ] All block types render correctly (paragraphs, headings, lists, quotes, code, images, dividers)
- [ ] List items are properly wrapped in `<ul>` / `<ol>`
- [ ] Rich text annotations (bold, italic, strikethrough, underline, code, links) render correctly

### OG Images

- [ ] `/writing/[slug]/opengraph-image` returns 1200x630 PNG
- [ ] Post title renders in the image
- [ ] Falls back to "Writing" when post not found

### Build

- [ ] `npm run build` passes with no errors
- [ ] Writing routes are statically generated
- [ ] No Notion API calls in browser network tab

### Legibility (manual)

- [ ] Body text comfortable on desktop (1440px)
- [ ] Body text comfortable on mobile (375px)
- [ ] Line length feels right
- [ ] Dark mode contrast passes WCAG AA

---

## Cleanup — What Was Removed

In a dedicated commit:

- `velite.config.ts` — deleted
- `content/posts/` — deleted (19 MDX files)
- `content/work/` — deleted (3 MDX files)
- `.velite/` — deleted (generated output)
- `velite` — uninstalled from `package.json`
- `.velite` — removed from `.gitignore`
- All `import ... from '.velite'` — replaced with Notion/static data imports

The only new dependency added: `@notionhq/client`.
