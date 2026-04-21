# Architecture

## Stack

- **Framework**: Next.js (latest), App Router, React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 (CSS-based config)
- **Content**: Notion API (`@notionhq/client`) for writing; static data files for work
- **Icons**: Iconoir (`iconoir-react`)
- **Animation**: `motion` package
- **Theming**: `next-themes` (system preference only)
- **Analytics**: `@vercel/analytics`
- **Deployment**: Vercel

## Content Strategy

### Writing (Notion)

- Notion database with properties: Title, Slug, Status, Date, Excerpt
- Fetched server-side via `@notionhq/client` SDK v5
- SDK v5 uses the `dataSources.query` API — the `data_source_id` is resolved at runtime from the database via `databases.retrieve`
- Cached with `'use cache'`, `cacheLife('max')`, and `cacheTag('writing')` — pages are built once and never re-fetched Notion between deploys
- Block content rendered by `src/components/writing/render-blocks.tsx`
- Data layer: `src/lib/notion/client.ts`, `types.ts`, `writing.ts`

### Notion-hosted images

Notion file URLs are signed S3 URLs that expire after ~1 hour. To keep the site
truly static we download every referenced image at build time.

- `scripts/sync-notion-assets.ts` runs as `prebuild` (Vercel build + `npm run build`)
- Downloads all image/video/cover assets from writing, work, and TIL into `public/notion-assets/`
- Emits `src/generated/notion-asset-manifest.json` (pathname → local path)
- `src/lib/notion/localize-url.ts` rewrites Notion URLs via the manifest at render time
- Fallback: if a URL is not in the manifest, the raw Notion URL is used (keeps `next dev` working before first sync)
- Run `npm run sync-notion-assets` manually to refresh local dev images

Both the manifest and `public/notion-assets/` are gitignored.

### Work (static)

- Curated list in `src/lib/work-data.ts`
- No CMS needed — items change rarely and are hand-ordered

### Environment Variables

- `NOTION_TOKEN` — Notion integration secret
- `NOTION_WRITING_DB_ID` — Notion database ID for writing posts
- See `.env.example` for reference

## Conventions

### Components

- Server components by default
- Add `'use client'` only when using: hooks, browser APIs, event handlers
- One component per file
- File named same as component in kebab-case: `sidebar.tsx`, `post-row.tsx`

### Caching

- `'use cache'` directive on data-fetching functions (requires `cacheComponents: true` in `next.config.ts`)
- `cacheLife('max')` for Notion data — pages are produced at build time and never re-fetch Notion between deploys
- `cacheTag('writing' | 'work' | 'til')` for potential on-demand revalidation
- `generateStaticParams` pre-renders published posts at build time
- Likes are read live from Notion via `GET /api/likes/[slug]` on the client; the likes `POST` does NOT call `revalidateTag` (pages stay static; the client crossfades the fresh count on mount)

### Routing

- `/` — Homepage
- `/about` — About page
- `/work` — All client case studies
- `/work/[slug]` — Individual case study
- `/writing` — All blog posts (grouped by year, drafts visible but not clickable)
- `/writing/[slug]` — Individual post (published only, 404 for drafts)
- `/lab` — Experiments and UI playground
- `/lab/[slug]` — Individual experiment
- `/now` — What I'm focused on

### Redirects

- `/blog` → `/writing` (308 permanent)
- `/blog/:slug` → `/writing/:slug` (308 permanent)

### Utilities

- `cn()` in `src/lib/utils.ts` — always use for conditional Tailwind classes
- Never use string concatenation for class names

## File Structure

```
src/
├── app/
│   ├── layout.tsx              ← root layout with metadata, nav, footer
│   ├── page.tsx                ← homepage (Notion writing + static work)
│   ├── favicon.ico             ← browser tab icon
│   ├── icon.png                ← PWA icon (192x192)
│   ├── apple-icon.png          ← iOS icon (180x180)
│   ├── opengraph-image.tsx     ← default OG image
│   ├── writing/
│   │   ├── page.tsx            ← /writing list
│   │   └── [slug]/
│   │       ├── page.tsx        ← /writing/[slug] detail
│   │       └── opengraph-image.tsx
│   └── ...
├── components/
│   ├── nav/                    ← navigation (menu, breadcrumb, sidebar)
│   ├── ui/                     ← shared UI components
│   └── writing/
│       └── render-blocks.tsx   ← Notion block → React renderer
├── lib/
│   ├── notion/
│   │   ├── client.ts           ← Notion client + env vars
│   │   ├── types.ts            ← PostMeta, Post, re-exported Notion types
│   │   └── writing.ts          ← getWritingPosts, getWritingPost
│   ├── work-data.ts            ← static work items
│   ├── about-data.ts           ← static experience + appearances
│   └── utils.ts                ← cn() helper
└── styles/
    └── globals.css             ← CSS variables, Tailwind imports
```

## File Naming

- Pages: `page.tsx`
- Layouts: `layout.tsx`
- Components: `kebab-case.tsx`
- Utilities: `kebab-case.ts`
- Types: `types.ts` (co-located or in `src/lib/types.ts`)
