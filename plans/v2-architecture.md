# marvinmessenzehl.com — V2 Branch Setup Plan

> This document captures everything decided in the planning phase.
> Goal: get the V2 branch to a clean, buildable baseline — no new designs implemented yet,
> just the right foundation to start building on.

---

## 1. Branch Strategy

Create a clean `v2` branch off `master`. Do not refactor in place.

```bash
git checkout master
git pull
git checkout -b v2
```

Everything from this point forward lives on `v2`. The `master` branch stays live and
untouched until V2 is ready to ship.

---

## 2. Dependency Overhaul

### Remove these packages entirely

| Package | Reason |
|---|---|
| `@headlessui/react` | Overkill — sidebar state handled with simple `useState` |
| `@heroicons/react` | Replaced by Iconoir |
| `@theme-toggles/react` | Removed — system preference only, no toggle UI |
| `next-mdx-remote` | Replaced by Velite |
| `date-fns` | Not needed — use `Intl.DateTimeFormat` natively |
| `@tailwindcss/forms` | Not needed in V2 |

### Add these packages

| Package | Version | Reason |
|---|---|---|
| `iconoir-react` | latest | Icon library (consistent with Figma) |
| `velite` | latest | MDX/content pipeline — typed, compiled at build time |
| `motion` | latest | Formerly framer-motion — required by motion principles |

### Upgrade these packages

| Package | From | To |
|---|---|---|
| `next` | 16.1.6 | latest |
| `react` | ^18.2.0 | ^19.x |
| `react-dom` | ^18.2.0 | ^19.x |
| `next-themes` | ^0.3.0 | ^0.4.x |
| `tailwindcss` | ^3.4.3 | ^4.x |
| `prettier` | ^2.8.8 | ^3.x |
| `prettier-plugin-tailwindcss` | ^0.1.13 | latest (must match Prettier 3) |
| `eslint` | ^9.39.3 | latest ^9.x |

### Keep as-is

| Package | Reason |
|---|---|
| `@vercel/analytics` | Already correct |
| `@tailwindcss/typography` | Still needed for MDX prose styling |
| `next-themes` | Keeps system preference dark mode |

### Final `package.json` dependencies

```json
{
  "dependencies": {
    "clsx": "latest",
    "iconoir-react": "latest",
    "motion": "latest",
    "next": "latest",
    "next-themes": "^0.4.x",
    "react": "^19.x",
    "react-dom": "^19.x",
    "tailwind-merge": "latest",
    "velite": "latest",
    "@vercel/analytics": "latest"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "latest",
    "@tailwindcss/typography": "latest",
    "@types/node": "latest",
    "@types/react": "^19.x",
    "@types/react-dom": "^19.x",
    "concurrently": "latest",
    "eslint": "^9.x",
    "eslint-config-next": "latest",
    "postcss": "latest",
    "prettier": "^3.x",
    "prettier-plugin-tailwindcss": "latest",
    "tailwindcss": "^4.x",
    "typescript": "^5.x"
  }
}
```

---

## 3. JavaScript → TypeScript Migration

Convert the entire codebase to TypeScript as you build V2. Do not run a bulk migration —
convert files as you touch them.

**Setup steps:**

1. Delete `jsconfig.json`
2. Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

3. Rename files as you build: `.js` → `.tsx` for components/pages, `.ts` for utilities

---

## 4. Folder Structure

Keep what works, add what's needed for V2. Final target structure:

```
/
├── CLAUDE.md                        ← Claude Code reads this
├── .cursor/
│   └── rules/
│       └── project.mdc              ← Cursor reads this
├── docs/
│   ├── design-system.md             ← Colors, type, spacing, components
│   ├── motion-principles.md         ← Animation rules
│   └── architecture.md              ← Stack, patterns, conventions
├── data/
│   └── blog/                        ← Existing MDX posts (migrate as-is)
├── content/                         ← NEW: Velite-managed content
│   ├── posts/                       ← Blog posts (migrated from data/blog)
│   ├── work/                        ← Case studies
│   └── projects/                    ← Personal/side projects
├── public/                          ← Static assets (keep as-is)
└── src/
    ├── app/
    │   ├── layout.tsx               ← Root layout with sidebar shell
    │   ├── page.tsx                 ← Homepage
    │   ├── about/
    │   │   └── page.tsx
    │   ├── work/
    │   │   ├── page.tsx
    │   │   └── [slug]/
    │   │       └── page.tsx
    │   ├── writing/                 ← Renamed from blog/
    │   │   ├── page.tsx
    │   │   └── [slug]/
    │   │       └── page.tsx
    │   ├── lab/                     ← NEW
    │   │   ├── page.tsx
    │   │   └── [slug]/
    │   │       └── page.tsx
    │   ├── now/
    │   │   └── page.tsx
    │   ├── imprint/
    │   │   └── page.tsx             ← Keep as-is from V1, rename .js → .tsx
    │   ├── privacy/
    │   │   └── page.tsx             ← Keep as-is from V1, rename .js → .tsx
    │   ├── sitemap/
    │   │   └── page.tsx             ← Keep as-is from V1, rename .js → .tsx
    │   ├── error.tsx
    │   └── not-found.tsx
    ├── components/
    │   ├── layout/
    │   │   ├── sidebar.tsx          ← Collapsible sidebar
    │   │   └── header.tsx           ← Mobile header with hamburger
    │   ├── ui/                      ← Reusable primitives
    │   │   ├── section-header.tsx   ← "Writing →" style headers
    │   │   └── project-row.tsx      ← icon + name + description row
    │   └── providers.tsx            ← ThemeProvider wrapper
    ├── lib/
    │   ├── utils.ts                 ← cn() utility (clsx + tailwind-merge)
    │   └── velite.ts                ← Velite config helpers
    └── styles/
        └── globals.css              ← Tailwind v4 base styles + CSS vars
```

**Notes:**
- `src/components/` — delete all existing `.js` components entirely. V2 components are built from scratch as `.tsx` files.
- `src/db/` — delete `blog.js`. MDX content migrates to `content/posts/` via Velite.
- `blog/` route renamed to `writing/` to match the new IA — set up a redirect from `/blog` to `/writing`
- `fighill/` route stays as-is for now, can be migrated later as a Lab experiment
- `imprint/`, `privacy/`, `sitemap/` — keep content as-is, just rename `.js` → `.tsx` and fix any type errors

---

## 5. Tailwind v4 Configuration

Tailwind v4 moves config into CSS. Delete `tailwind.config.js` and `postcss.config.js`
and replace with CSS-based configuration.

### Token Design Philosophy

The color system uses **semantic tokens** — every token has a named role, not a raw
value. Components reference tokens only, never raw zinc values. This means:

- Swapping the entire palette (zinc → neutral, zinc → olive, etc.) = editing one file
- AI tools cannot drift into inconsistent color usage if the rules are followed
- Dark mode is handled automatically — same token names, different values

The system mirrors what Brian Lovin uses on brianlovin.com: four text levels, four
background levels, two border levels. That four-level text hierarchy is what creates
the visual depth you see on his site — it's not size or weight doing all the work,
it's subtle tonal stepping.

### Token Reference

```
TEXT TOKENS — four levels of hierarchy
─────────────────────────────────────────────────────────────────────
--text-primary      Names, headings, post titles, body copy
                    The highest contrast text. Used sparingly — only
                    for the most important content on screen.

--text-secondary    Bios, descriptions, supporting body text
                    One step down. Readable but not dominant.
                    Brian uses this for his bio paragraph.

--text-tertiary     Section labels ("Writing", "Projects"), timestamps,
                    metadata, date strings, nav labels
                    Clearly muted — guides the eye without competing.

--text-quaternary   Icons, arrow indicators, disabled states, placeholders
                    Barely there. Decorative or structural only.

BACKGROUND TOKENS — four levels of depth
─────────────────────────────────────────────────────────────────────
--bg-page           The outermost page background
                    zinc-50, NOT pure white. Slightly warm, avoids the
                    clinical feel of #ffffff under bright screens.

--bg-surface        Content areas, sidebar background, cards
                    Pure white — creates subtle lift above the page bg.

--bg-subtle         Hover states on list rows, sidebar items
                    zinc-100. Only appears on interaction.

--bg-moderate       Active/pressed states, selected sidebar items
                    zinc-200. Stronger emphasis for selection.

BORDER TOKENS — two levels of weight
─────────────────────────────────────────────────────────────────────
--border-default    Section dividers, card outlines, major separators
                    zinc-200. The standard structural line.

--border-subtle     Separators between list items, very light dividers
                    zinc-100. Nearly invisible — implies structure
                    without drawing attention.
```

**`src/styles/globals.css`:**

```css
@import "tailwindcss";
@import "@tailwindcss/typography";

@theme {
  /* Typography */
  --font-sans: ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  /* No custom font loaded for mono — system stack only.
     Resolves to SF Mono (Mac), Consolas (Windows), system mono (Linux).
     Use for: dates, timestamps, numbers, stats, code blocks.
     Always pair with --text-tertiary or --text-quaternary — never primary. */

  /* Palette: zinc only. To switch palettes, change zinc → neutral/olive/etc.
     here and in the .dark block below. Nothing else needs to change. */
}

/* ─── Semantic color tokens ─────────────────────────────────────────── */
/* Tailwind v4 generates CSS vars for all palette values: var(--color-zinc-900) etc. */
:root {
  /* Text — four levels */
  --text-primary:    var(--color-zinc-900);   /* names, titles, body */
  --text-secondary:  var(--color-zinc-600);   /* descriptions, bio */
  --text-tertiary:   var(--color-zinc-400);   /* labels, timestamps, nav */
  --text-quaternary: var(--color-zinc-300);   /* icons, arrows, disabled */

  /* Backgrounds — four levels */
  --bg-page:         var(--color-zinc-50);    /* outermost page bg */
  --bg-surface:      var(--color-white);      /* content areas, sidebar */
  --bg-subtle:       var(--color-zinc-100);   /* hover states */
  --bg-moderate:     var(--color-zinc-200);   /* active/selected states */

  /* Borders — two levels */
  --border-default:  var(--color-zinc-200);   /* section dividers */
  --border-subtle:   var(--color-zinc-100);   /* list item separators */
}

.dark {
  /* Text */
  --text-primary:    var(--color-zinc-100);
  --text-secondary:  var(--color-zinc-400);
  --text-tertiary:   var(--color-zinc-500);
  --text-quaternary: var(--color-zinc-600);

  /* Backgrounds */
  --bg-page:         var(--color-zinc-950);
  --bg-surface:      var(--color-zinc-900);
  --bg-subtle:       var(--color-zinc-800);
  --bg-moderate:     var(--color-zinc-700);

  /* Borders */
  --border-default:  var(--color-zinc-800);
  --border-subtle:   var(--color-zinc-900);
}

/* ─── Base styles ────────────────────────────────────────────────────── */
body {
  background-color: var(--bg-page);
  color: var(--text-primary);
  font-family: var(--font-sans);
}

/* Reduced motion support — always included */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Palette Swap Note

To change from zinc to any other scale, edit exactly two blocks in this file:
the `:root` block and the `.dark` block. Replace `zinc` with `neutral`, `slate`,
`olive` (custom), or any other scale. Every component updates automatically because
nothing references raw color values directly.

### PostCSS Config

Tailwind v4 replaces autoprefixer with `@tailwindcss/postcss`. Delete the existing
`postcss.config.js` and replace it with:

**`postcss.config.js`:**

```js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

No `autoprefixer` entry needed — it's built into Tailwind v4.
Uses CommonJS (`module.exports`) because Next.js projects don't set `"type": "module"`.

---

## 6. Velite Setup (MDX Pipeline)

Replace `next-mdx-remote` with Velite for typed, compiled content.

**`velite.config.ts`** (project root):

```typescript
import { defineConfig, s } from 'velite'

export default defineConfig({
  root: 'content',
  collections: {
    posts: {
      name: 'Post',
      pattern: 'posts/**/*.mdx',
      schema: s.object({
        title: s.string(),
        description: s.string(),
        date: s.isodate(),
        slug: s.slug('posts'),
        published: s.boolean().default(true),
        body: s.mdx(),
      }),
    },
    work: {
      name: 'Work',
      pattern: 'work/**/*.mdx',
      schema: s.object({
        title: s.string(),
        description: s.string(),
        client: s.string(),
        date: s.isodate(),
        slug: s.slug('work'),
        published: s.boolean().default(true),
        body: s.mdx(),
      }),
    },
    projects: {
      name: 'Project',
      pattern: 'projects/**/*.mdx',
      schema: s.object({
        title: s.string(),
        description: s.string(),
        url: s.string().url().optional(),
        slug: s.slug('projects'),
        featured: s.boolean().default(false),
        body: s.mdx(),
      }),
    },
  },
})
```

**`next.config.ts`** update to include Velite:

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/blog', destination: '/writing', permanent: true },
      { source: '/blog/:slug', destination: '/writing/:slug', permanent: true },
    ]
  },
}

export default nextConfig
```

> Note: Next.js 16 enables Turbopack by default for both dev and build, making the
> webpack plugin approach incompatible. Velite is triggered via npm hooks instead:
> - `prebuild`: runs `velite build` automatically before `next build`
> - `dev`: runs `velite --watch` in parallel via `concurrently`

---

## 7. AI Rules Directory

Three files to create before writing any components.

### `CLAUDE.md` (project root)

```markdown
# marvinmessenzehl.com v2

Personal portfolio site for Marvin Messenzehl — design engineer based in Germany.
This is a working environment maintained in public. It should feel like a product.

## Before writing any UI code, read:
- docs/design-system.md — colors, typography, spacing, component patterns
- docs/motion-principles.md — when and how to animate
- docs/architecture.md — stack, folder structure, conventions

## Stack
- Next.js (latest), React 19, TypeScript
- Tailwind CSS v4 (CSS-based config, no tailwind.config.js)
- Velite for MDX content
- Iconoir for icons (iconoir-react)
- motion (framer-motion) for animations
- next-themes for dark mode (system preference only, no toggle)
- Vercel Analytics

## Hard rules
- Never introduce a dependency not listed above without flagging it
- Never use inline styles
- Never hardcode colors — use only the tokens defined in design-system.md
- TypeScript strict mode — no `any` types
- All components are server components by default; add 'use client' only when needed
```

### `docs/design-system.md`

```markdown
# Design System

## Philosophy
Zinc only. No accent color. No brand color. Let the work provide the color.
Hierarchy through weight and size, not hue.

## Color Tokens

Use ONLY these semantic tokens in components. Never hardcode hex values or
raw zinc-NNN values. Tokens are defined in `src/styles/globals.css`.

> **Palette swap:** To change from zinc to any other scale, edit only the
> `:root` and `.dark` blocks in `globals.css`. Nothing else needs to change.

### Text — four levels

| Token | Use for | Light | Dark |
|---|---|---|---|
| `--text-primary` | Names, headings, post titles, body copy. The highest contrast text — use sparingly for the most important content. | zinc-900 | zinc-100 |
| `--text-secondary` | Bios, descriptions, supporting body. One step down — readable but not dominant. | zinc-600 | zinc-400 |
| `--text-tertiary` | Section labels ("Writing"), timestamps, metadata, nav labels. Clearly muted — guides without competing. | zinc-400 | zinc-500 |
| `--text-quaternary` | Icons, arrow indicators, disabled states. Barely there — decorative or structural only. | zinc-300 | zinc-600 |

In Tailwind, always reference via CSS variable: `text-[var(--text-primary)]`
Never use raw zinc classes for color — that bypasses the token system and breaks palette swaps.

### Backgrounds — four levels

| Token | Use for | Light | Dark |
|---|---|---|---|
| `--bg-page` | Outermost page background. zinc-50 — NOT pure white. Slightly warm, avoids a clinical feel under bright screens. | zinc-50 | zinc-950 |
| `--bg-surface` | Content areas, sidebar background, cards. Pure white creates subtle lift above the page bg. | white | zinc-900 |
| `--bg-subtle` | Hover states on list rows, sidebar nav items. Only appears on interaction. | zinc-100 | zinc-800 |
| `--bg-moderate` | Active/pressed states, selected sidebar items. Stronger emphasis for selection. | zinc-200 | zinc-700 |

### Borders — two levels

| Token | Use for | Light | Dark |
|---|---|---|---|
| `--border-default` | Section dividers, card outlines, major structural lines. | zinc-200 | zinc-800 |
| `--border-subtle` | Separators between list items. Nearly invisible — implies structure without drawing attention. | zinc-100 | zinc-900 |

### Rules
- Never use: gray, slate, neutral, stone scales. Only zinc.
- Never hardcode hex values in components.
- Never add a color not listed here without updating this document first.
- No accent color. No brand color. Let the work provide the color.

## Typography
- Body: `text-sm` (14px), `leading-relaxed`, `font-normal`
- Names/titles in rows: `font-semibold`
- Section labels: `text-sm text-[var(--text-tertiary)]`
- Muted descriptions: `text-sm text-[var(--text-secondary)]`
- Post titles: `text-base font-medium`
- Page headings: `text-2xl font-semibold` — use sparingly
- Never use: `font-bold`, `text-xs` for body content, custom font sizes

### Monospace
- Use `font-mono` for: dates, timestamps, numbers, stats, code blocks
- System stack only — no custom font loaded (`ui-monospace` → SF Mono / Consolas)
- Always pair with `--text-tertiary` or `--text-quaternary` — never primary or secondary
- The coding aesthetic comes from the typeface, not from making it prominent
- Example: `<span className="font-mono text-[var(--text-tertiary)] text-sm">Jan '26</span>`

## Spacing
- Content max-width: `max-w-2xl mx-auto`
- Page padding: `px-4 md:px-8 py-12`
- Section gaps: `space-y-12`
- Item gaps within sections: `space-y-4`
- Row internal padding: `py-3`
- Never use: arbitrary values like `p-[13px]`, `mt-[7px]`

## Icons (Iconoir)
- Import from `iconoir-react`
- Size: always `width={18} height={18}` or `width={20} height={20}` in body content
- Color: `currentColor` always — never hardcode a color on an icon
- Never use icons larger than 24px in body/list content

## Component Patterns

> **Bootstrap reference** — delete this section once `project-row.tsx` and `section-header.tsx`
> are implemented. Read the actual components instead.

### Project row
```tsx
<div className="flex items-center gap-3 py-3">
  <Icon width={18} height={18} className="text-[var(--text-quaternary)] shrink-0" />
  <span className="font-semibold text-[var(--text-primary)]">Name</span>
  <span className="text-sm text-[var(--text-secondary)]">Short description</span>
  <ArrowUpRight className="ml-auto text-[var(--text-quaternary)]" width={16} height={16} />
</div>
```

### Section header
```tsx
<div className="flex items-center justify-between">
  <span className="text-sm text-[var(--text-tertiary)]">Section title</span>
  <Link href="/section" className="text-sm text-[var(--text-tertiary)] hover:text-[var(--text-primary)]">→</Link>
</div>
```

### Divider
```tsx
<hr className="border-[var(--border-default)]" />
```

## Utility: cn()
Always use cn() for conditional classes. Located at `src/lib/utils.ts`.
```tsx
import { cn } from '@/lib/utils'
```
```

### `docs/motion-principles.md`

```markdown
# Motion Principles

Based on Emil Kowalski, Jakub Krehel, and Jhey Tompkins.
Full audit skill: `npx add-skill kylezantos/design-motion-principles`

## The Decision Sequence (apply in order)
1. **Emil — Should this animate at all?** Check interaction frequency.
2. **Jakub — Is it subtle enough?** Would users notice it or just feel it?
3. **Jhey — What could this become?** Lab section only.

## Frequency Rules
The more often an interaction occurs, the less animation it should have.

| Interaction | Frequency | Animation rule |
|---|---|---|
| Sidebar toggle | High | ≤150ms, ease-out, no bounce |
| Page navigation | High | ≤200ms opacity fade only |
| Hover on list rows | High | ≤100ms, opacity/color shift |
| Photo fan hover | Rare | Expressive allowed, 300–400ms |
| Lab experiments | Variable | No rules — intentionally playful |

## Duration Scale
- Micro (hover, focus ring): 80–120ms
- Standard (show/hide, sidebar): 150–200ms
- Expressive (photo fan, lab): 300–500ms

## What to Animate (safe properties only)
- `opacity`
- `transform` (translate, scale, rotate)
- `filter` (blur only, sparingly)

## Never Animate
- `width`, `height`, `padding`, `margin` (causes layout recalculation)
- Background color on high-frequency interactions
- Anything on scroll unless it directly serves spatial orientation

## The Test
Remove the animation. Does something feel missing or broken? 
- Yes → keep it
- No → remove it
- Users comment "nice animation" → it's too prominent, dial it back

## Hard Rules
- Use `motion` (from the `motion` package) for all JS-driven animations
- Use Tailwind transition utilities for simple hover/focus states
- Never add `animate-*` classes without a clear functional reason
- Always include `prefers-reduced-motion` support:
  ```css
  @media (prefers-reduced-motion: reduce) {
    * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
  ```
```

### `docs/architecture.md`

```markdown
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

### Utilities
- `cn()` in `src/lib/utils.ts` — always use for conditional Tailwind classes
- Never use string concatenation for class names

## File Naming
- Pages: `page.tsx`
- Layouts: `layout.tsx`
- Components: `kebab-case.tsx`
- Utilities: `kebab-case.ts`
- Types: `types.ts` (co-located or in `src/lib/types.ts`)
```

---

## 8. `.cursor/rules/project.mdc`

```markdown
---
description: Project rules for marvinmessenzehl.com v2
alwaysApply: true
---

Read docs/design-system.md, docs/motion-principles.md, and docs/architecture.md
before writing any UI code.

Key constraints:
- Zinc color scale only. No accent colors. No hardcoded hex values.
- Iconoir icons only (iconoir-react). Size 18–20px. currentColor only.
- TypeScript strict. No `any`. Server components by default.
- Tailwind v4 CSS-based config. No tailwind.config.js.
- motion package for JS animations. Follow docs/motion-principles.md.
- max-w-2xl content container. No wider.
- Never add a dependency not listed in docs/architecture.md without flagging it.
```

---

## 9. Install the Motion Audit Skill

After branch setup, run once globally so it's available in Claude Code and Cursor:

```bash
npx add-skill kylezantos/design-motion-principles
```

This gives you a `/design-motion-principles` command you can run against any component
to get a per-designer motion audit.

---

## 10. Step-by-Step Execution Order

Work through these in sequence. Each step should result in a working (or at least
buildable) state before moving to the next.

### Step 1 — Branch
```bash
git checkout master && git pull
git checkout -b v2
```

### Step 2 — Dependencies
```bash
# Remove old packages (including @tailwindcss/forms)
npm uninstall @headlessui/react @heroicons/react @theme-toggles/react next-mdx-remote date-fns @tailwindcss/forms

# Add new packages
npm install iconoir-react motion velite clsx tailwind-merge

# Upgrade core
npm install next@latest react@latest react-dom@latest next-themes@latest @vercel/analytics@latest

# Dev dependencies
npm install -D typescript @types/react@latest @types/react-dom@latest @types/node \
  tailwindcss@latest @tailwindcss/postcss @tailwindcss/typography \
  prettier@latest prettier-plugin-tailwindcss \
  eslint@latest eslint-config-next@latest \
  concurrently

# Update dev script in package.json
# "dev": "concurrently \"velite --watch\" \"next dev\""
```

### Step 3 — TypeScript + Clean slate
- Delete `jsconfig.json`
- Create `tsconfig.json` (see section 3)
- Delete all files in `src/components/` — V2 components are written from scratch
- Delete `src/db/blog.js` — replaced by Velite
- Rename `src/app/layout.js` → `layout.tsx`, strip out all old component imports, stub with minimal shell
- Rename `src/app/page.js` → `page.tsx`, stub with placeholder content
- Rename `src/app/imprint/page.js` → `page.tsx`, keep content, fix any type errors
- Rename `src/app/privacy/page.js` → `page.tsx`, keep content, fix any type errors
- Rename `src/app/sitemap/page.js` → `page.tsx`, keep content, fix any type errors
- Delete all other `.js` page files — they get replaced by stubs in Step 6

### Step 4 — Tailwind v4
- Delete `tailwind.config.js`
- Replace `postcss.config.js` with the v4 version (see section 5 — PostCSS Config)
- Create `src/styles/globals.css` (see section 5)
- No `tailwind.config.js` created — v4 is configured entirely in CSS

### Step 4b — next.config rename
- Rename `next.config.mjs` → `next.config.ts` (enables TypeScript config, required for Velite plugin in Step 5)

### Step 5 — Content Structure
- Create `/content/posts/`, `/content/work/`, `/content/projects/` directories
- Migrate MDX files from `data/blog/` → `content/posts/`
- Update frontmatter to match Velite schema (title, description, date, published)
- Create `velite.config.ts` (see section 6)
- Update `next.config.ts` for Velite plugin

### Step 6 — Routing
- Create stub `page.tsx` files for all routes in section 7
- Add `/blog` → `/writing` redirect in `next.config.ts`
- Rename `src/app/blog/` → `src/app/writing/`

### Step 7 — AI Rules
- Create `CLAUDE.md` at project root
- Create `.cursor/rules/project.mdc`
- Create `docs/design-system.md`
- Create `docs/motion-principles.md`
- Create `docs/architecture.md`

### Step 8 — Utilities
- `clsx` and `tailwind-merge` were already installed in Step 2
- Create `src/lib/utils.ts` with `cn()`:
```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Step 9 — Providers
- Create `src/components/providers.tsx` with ThemeProvider:
```typescript
'use client'
import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}
```
- Update `src/app/layout.tsx` to wrap with Providers

### Step 10 — Verify
```bash
npm run build
```
Build should pass with no errors. All routes should be stubs that render without crashing.
No design work yet — just a clean, buildable TypeScript + Tailwind v4 + Velite baseline.

---

## 11. What's Explicitly NOT in This Setup

These are intentional deferred decisions — do not implement yet:

- **Sidebar component** — first thing to build after setup is complete
- **Any homepage design** — placeholder text only
- **Dark mode toggle UI** — system preference only, no toggle
- **CI/CD pipeline** — deferred until V2 is shipping regularly
- **GitHub activity graph** — deferred until commit activity justifies it
- **Strava API integration** — deferred to after core site is live
- **Any AI-powered features** — Lab section, deferred
- **Image photo fan component** — deferred to after shell is built

---

## 12. Definition of Done for V2 Setup

The setup phase is complete when:

- [ ] `v2` branch exists
- [ ] `npm run build` passes with zero errors
- [ ] TypeScript strict mode enabled, no `any` types
- [ ] Tailwind v4 configured with zinc-only token system
- [ ] Velite pipeline running, MDX posts migrated and building
- [ ] All route stubs created and rendering
- [ ] `/blog` redirects to `/writing`
- [ ] `CLAUDE.md`, `.cursor/rules/`, and `docs/` all created
- [ ] Motion audit skill installed globally
- [ ] `cn()` utility available
- [ ] ThemeProvider wrapping layout (system preference only)
- [ ] No old dependencies remaining (`@headlessui`, `@heroicons`, `next-mdx-remote`, `date-fns`, `@theme-toggles`, `@tailwindcss/forms`, `autoprefixer`)

When all boxes are checked: start building the sidebar.