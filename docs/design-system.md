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

### Text Wrapping
- Apply `text-wrap: balance` to headings, short labels, and captions so text distributes evenly across lines and avoids orphaned words.
- Apply `text-wrap: pretty` to body paragraphs as a lighter alternative (browser support permitting).
- Never leave multi-line headlines without one of these — awkward breaks undermine visual polish.

### Font Rendering
- Apply `-webkit-font-smoothing: antialiased` at the root layout so text renders thinner and crisper on macOS. Already set in `globals.css` — do not override it on individual components.

### Numbers and Counters
- Apply `font-variant-numeric: tabular-nums` wherever digits update live (counters, stats, timestamps) to prevent layout shift as values change.
- Pair with `font-mono` for metrics and financial-style data.
- Note: Inter changes numeral appearance slightly when tabular-nums is applied — verify visually.

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
