# TIL (Today I Learned) Page

## Context

Adding a fast-paced, short-form blogging section at `/til`. Unlike the writing section (which has individual post pages), TIL is a single page where all entries are displayed inline with their rich text body. Content comes from a new Notion database. Each entry has a title, date, like counter, and short rich text body — all visible on the one page.

## Layout

Two-column grid per entry. Page title aligns vertically with the right (content) column:

```
                     Today I Learned
                     ===============

[Date]               [Entry Title]
[♥ ##]               Lorem ipsum dolor sit amet...

[Date]               [Entry Title]
[♥ ##]               Lorem ipsum dolor sit amet...
```

On mobile, collapses to single column (date+likes stacked above title+body).

## Files to Create

### 1. `src/lib/notion/til.ts` — Data fetcher

- Mirror `writing.ts` pattern with `'use cache'`, `cacheLife('hours')`, `cacheTag('til')`
- `getTilEntries(): Promise<TilEntry[]>` — fetches all published entries sorted by date desc
- Unlike writing, fetches blocks for every entry (since body is rendered inline on list page)
- Use `Promise.all` to parallelize block fetching per entry
- `pageToTilMeta()` — extracts Title, Slug, Status, Date, Likes from Notion properties
- Reuse: `notion` client, `resolveDataSourceId()`, `listPageBlocks()` from existing modules

### 2. `src/app/til/page.tsx` — The TIL page

- Server component, metadata: `{ title: 'Today I Learned' }`
- Two-column CSS grid: `grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-8`
- Page title positioned in the right column via an empty grid cell on the left
- Each entry: left column = date + LikeButton, right column = title + `renderBlocks(entry.blocks)`
- Entry dividers between items via `border-b border-[var(--border-subtle)]`
- Prose styling: smaller than blog posts — `prose-p:text-sm prose-p:leading-relaxed` (matches body text size from design system)
- Title: `text-base font-medium` (matches PostRow title sizing)
- Date format: same `Intl.DateTimeFormat` as writing posts

## Files to Modify

### 3. `src/lib/notion/types.ts` — Add TIL types

```ts
export interface TilMeta {
    id: string
    title: string
    slug: string
    status: PostStatus
    date: string | null
    likes: number
}
export interface TilEntry extends TilMeta {
    blocks: NotionBlock[]
}
```

### 4. `src/lib/notion/config.ts` — Add `getTilDbId()`

```ts
export function getTilDbId(): string {
    return getEnv('NOTION_TIL_DB_ID')
}
```

### 5. `.env.example` — Add `NOTION_TIL_DB_ID=`

### 6. `src/app/api/likes/[slug]/route.ts` — Support TIL likes

- Add `?type=til` query param support
- Read `type` from URL search params, resolve correct DB ID
- Update cache revalidation tags: `'til'` vs `'writing'`
- Backward compatible: no `type` param defaults to writing

### 7. `src/components/writing/like-button.tsx` — Add `type` prop

- New optional prop: `type?: 'writing' | 'til'` (defaults to `'writing'`)
- Append `?type=til` to API URLs when type is `'til'`
- Update localStorage key to `likes:${type}:${slug}` to avoid collisions
- Affects 3 fetch calls: initial load, flushLikes, unmount cleanup

### 8. `src/lib/work-data.ts` — Add TIL as a project

- Append `{ title: 'TIL', description: 'Things I learned', icon: 'LightBulb', href: '/til' }` to the `projects` array
- This automatically adds TIL to both the homepage Projects section (via `WorkRow`) and sidebar Personal Projects (via `PERSONAL_PROJECTS` in nav config which derives from this array)

### 9. `src/components/nav/config.ts` — Add breadcrumb

- Add `'/til': 'TIL'` to `BREADCRUMB_ROUTES`

## Notion Database Setup

The user needs to create a Notion database with these properties:
| Property | Type | Notes |
|----------|---------|--------------------------|
| Title | title | Entry name |
| Date | date | When learned |
| Slug | rich_text | Identifier for like API |
| Status | select | Draft / Published / Archived |
| Likes | number | Default 0 |
| (body) | page content | Rich text blocks |

## Implementation Order

1. Config + Types + Env (`config.ts`, `types.ts`, `.env.example`)
2. Data fetcher (`til.ts`)
3. API route update (`likes/[slug]/route.ts`) + LikeButton update (`like-button.tsx`)
4. TIL page (`til/page.tsx`)
5. Work data + Nav config (`work-data.ts` for project entry, `nav/config.ts` for breadcrumb)

## Verification

1. Set `NOTION_TIL_DB_ID` in `.env.local` and create test entries in Notion
2. Run `npm run dev` and visit `/til` — verify two-column layout, rich text rendering, like counter
3. Test like counter: click heart, verify localStorage, verify Notion updates via API
4. Check sidebar: TIL appears under Personal Projects (auto via work-data.ts)
5. Check homepage: TIL appears in Projects section as a WorkRow
6. Test responsive: verify mobile layout collapses to single column
7. Run `npm run build` to verify no TypeScript errors or build issues
