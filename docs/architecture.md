# Architecture

## Stack
- **Framework**: Next.js (latest), App Router, React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 (CSS-based config)
- **Content**: Velite (MDX, compiled at build time)
- **Icons**: Iconoir (`iconoir-react`)
- **Animation**: `motion` package
- **Theming**: `next-themes` (system preference only)
- **Analytics**: `@vercel/analytics`
- **Deployment**: Vercel

## Conventions

### Components
- Server components by default
- Add `'use client'` only when using: hooks, browser APIs, event handlers
- One component per file
- File named same as component in kebab-case: `sidebar.tsx`, `project-row.tsx`

### Content (Velite)
- All content lives in `/content` directory
- Three collections: `posts`, `work`, `projects`
- Access via: `import { posts } from '.velite'`
- Never fetch content client-side — always at build/request time via RSC

### Routing
- `/` — Homepage
- `/about` — About page
- `/work` — All client case studies
- `/work/[slug]` — Individual case study
- `/writing` — All blog posts
- `/writing/[slug]` — Individual post
- `/lab` — Experiments and UI playground
- `/lab/[slug]` — Individual experiment
- `/now` — What I'm focused on (manually updated MDX)

### Redirects
- `/blog` → `/writing` (301)
- `/blog/:slug` → `/writing/:slug` (301)

### Utilities
- `cn()` in `src/lib/utils.ts` — always use for conditional Tailwind classes
- Never use string concatenation for class names

## File Naming
- Pages: `page.tsx`
- Layouts: `layout.tsx`
- Components: `kebab-case.tsx`
- Utilities: `kebab-case.ts`
- Types: `types.ts` (co-located or in `src/lib/types.ts`)
