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
