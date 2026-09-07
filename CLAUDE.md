# marvinmessenzehl.com v2

Personal portfolio site for Marvin Messenzehl — design engineer based in Germany.
This is a working environment maintained in public. It should feel like a product.

## Before writing any UI code, read:

- docs/design-system.md — colors, typography, spacing, component patterns
- docs/motion-principles.md — when and how to animate
- docs/architecture.md — stack, folder structure, conventions
- docs/craft.md — micro-polish: border radius, shadows, optical alignment, image treatment

## Stack

- Next.js (latest), React 19, TypeScript
- Tailwind CSS v4 (CSS-based config, no tailwind.config.js)
- Notion API (`@notionhq/client`) for writing content
- Static data files for work items (`src/lib/work-data.ts`)
- Iconoir for icons (iconoir-react)
- motion for animations
- next-themes for dark mode (system preference only, no toggle)
- Vercel Analytics

## Hard rules

- Never introduce a dependency not listed above without flagging it
- Never use inline styles
- Never hardcode colors — use only the tokens defined in docs/design-system.md
- TypeScript strict mode — no `any` types
- All components are server components by default; add 'use client' only when needed

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
