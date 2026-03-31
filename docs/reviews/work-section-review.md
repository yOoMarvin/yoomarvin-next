# Work Section Code Review

Date: 2026-03-31
Branch: `work-section` (commit `67a9836`)
Reviewed against: home page (`src/app/page.tsx`) and writing section (`src/app/writing/`)

---

## Issues Found

### 1. No status filtering on Notion queries

**Severity:** Critical
**Files:** `src/lib/notion/work.ts:20-24`

`getWorkItems()` fetches all items without filtering by status. The writing section filters out archived posts (`writing.ts:21-24`). Draft and archived work items can leak onto the site.

Additionally, `getWorkItem()` (line 38-40) doesn't check `status === 'Published'`, so draft items are renderable via direct URL.

Related items on the detail page (`src/app/work/[slug]/page.tsx:49-54`) also lack a status filter — writing filters by `p.status === 'Published'`.

**Root cause:** `WorkMeta` in `src/lib/notion/types.ts` doesn't have a `status` field at all.

**Fix:** Add `WorkStatus` type and `status` field to `WorkMeta`. Add status filter to Notion query. Add status guard in `getWorkItem()`. Filter related items by status.

---

### 2. `WorkLinkRow` is a duplicate of `WorkRow`

**Severity:** High
**Files:** `src/components/work/work-link-row.tsx` vs `src/components/ui/work-row.tsx`

`WorkLinkRow` exists solely for the detail page's "Related work" section. It accepts the same props as `WorkRow` (icon, title, description, href) but with inconsistent styling:

| Aspect            | WorkRow           | WorkLinkRow                      |
| ----------------- | ----------------- | -------------------------------- |
| Title size        | `text-xl`         | `text-base`                      |
| Description size  | `text-xl`         | `text-sm`                        |
| Description color | `--text-tertiary` | `--text-secondary` (wrong token) |
| Icon size         | 24x24             | 18x18                            |
| Icon map          | copy #1           | copy #2                          |

The writing detail page uses `PostRow` (from `src/components/ui/`) for "Read next". The work detail page should use `WorkRow` (from `src/components/ui/`) for "Related work" — same pattern, no new component needed.

**Fix:** Delete `WorkLinkRow`. Use `WorkRow` in the detail page's related section.

---

### 3. Icon map duplicated 3x

**Severity:** Medium
**Files:**

- `src/components/ui/work-row.tsx:15-26`
- `src/components/work/work-link-row.tsx:15-26`
- `src/components/work/personal-project-item.tsx:15-26`

The identical `iconMap` (7 icons from iconoir-react) is defined in three separate files.

**Fix:** Extract to `src/lib/work-icons.ts`. After deleting `WorkLinkRow`, only 2 files need updating.

---

### 4. Href-building logic duplicated 4x

**Severity:** Medium
**Files:**

- `src/app/work/page.tsx:55-61`
- `src/app/work/[slug]/page.tsx:92-98`
- `src/components/work/project-card.tsx:12-16`
- `src/components/work/personal-project-item.tsx:34-38`

This pattern appears in all four places:

```tsx
const href =
    item.linkMode === 'External' && item.externalUrl
        ? item.externalUrl
        : item.slug
          ? `/work/${item.slug}`
          : '/work'
```

**Fix:** Add `getWorkItemHref()` to `src/lib/utils.ts`.

---

### 5. Missing metadata description

**Severity:** Medium
**File:** `src/app/work/[slug]/page.tsx:25-27`

`generateMetadata()` only returns `{ title }`. Writing returns `{ title, description: post.excerpt }`.

**Fix:** Add `description: item.excerpt`.

---

### 6. PersonalProjectItem icon size exceeds design system

**Severity:** Low
**File:** `src/components/work/personal-project-item.tsx:51,53`

Icons are 32x32px. Design system (`docs/design-system.md`) specifies max 24px for body/list content.

**Fix:** Reduce to 24x24px. Consider reducing container from 54px to 44px (`size-11`).

---

### 7. ProjectCard uses native `<img>` instead of `next/image`

**Severity:** Low
**File:** `src/components/work/project-card.tsx:32`

Uses `<img>` with an eslint-disable comment. Should use `next/image` with `unoptimized` (Notion image URLs are temporary/signed).

---

### 8. Spacing inconsistencies

**Severity:** Medium
**File:** `src/app/work/page.tsx`

| Location     | Current            | Expected (per home page)   | Issue                                                  |
| ------------ | ------------------ | -------------------------- | ------------------------------------------------------ |
| Line 22      | `space-y-14`       | `space-y-16 sm:space-y-24` | Non-standard gap between sections                      |
| Lines 24, 47 | `space-y-5`        | `space-y-4`                | Section inner spacing doesn't match home               |
| Line 26      | `gap-x-8 gap-y-6`  | `gap-5`                    | Personal projects grid differs from ProjectGridSection |
| Line 49      | `gap-5 sm:gap-2.5` | `gap-4 sm:gap-1.5`         | Row list gaps don't match home page                    |

Also `src/components/work/project-grid-section.tsx:14` uses `space-y-5` instead of `space-y-4`.

---

## Not an issue

### `work-data.ts` as dual data source

Initially flagged because the home page imports from `work-data.ts` while `/work` fetches from Notion. However, `work-data.ts` is also used by `src/components/nav/config.ts:8` for the sidebar's PERSONAL_PROJECTS. It serves as a curated highlight list (home + nav), separate from the full Notion catalog. This is a reasonable architecture choice.

---

## Fix Plan

### Phase 1: Foundation

1. Add `WorkStatus` type and `status` field to `WorkMeta` (`src/lib/notion/types.ts`)
2. Extract shared icon map to `src/lib/work-icons.ts`
3. Add `getWorkItemHref()` to `src/lib/utils.ts`

### Phase 2: Data layer

4. Add status filter to `getWorkItems()` Notion query (`src/lib/notion/work.ts`)
5. Add status extraction in `pageToMeta()` (`src/lib/notion/work.ts`)
6. Add `status === 'Published'` guard to `getWorkItem()` (`src/lib/notion/work.ts`)
7. Filter related items by status (`src/app/work/[slug]/page.tsx`)
8. Add metadata description (`src/app/work/[slug]/page.tsx`)

### Phase 3: Component cleanup

9. Delete `WorkLinkRow` — use `WorkRow` in detail page's related section
10. Fix PersonalProjectItem icon size (32px to 24px)
11. Fix ProjectCard to use `next/image`

### Phase 4: Spacing

12. Align all spacing values to home page patterns

### Files changed

| File                                            | Change                                                |
| ----------------------------------------------- | ----------------------------------------------------- |
| `src/lib/notion/types.ts`                       | Add WorkStatus + status field                         |
| `src/lib/work-icons.ts`                         | **New** — shared icon map                             |
| `src/lib/utils.ts`                              | Add getWorkItemHref()                                 |
| `src/lib/notion/work.ts`                        | Status filter, extraction, guard                      |
| `src/app/work/page.tsx`                         | Spacing fixes, use href utility                       |
| `src/app/work/[slug]/page.tsx`                  | WorkRow reuse, metadata, related filter, href utility |
| `src/components/ui/work-row.tsx`                | Import shared icon map                                |
| `src/components/work/work-link-row.tsx`         | **Delete**                                            |
| `src/components/work/personal-project-item.tsx` | Icon size, shared imports                             |
| `src/components/work/project-card.tsx`          | next/image, href utility                              |
| `src/components/work/project-grid-section.tsx`  | Spacing fix                                           |

---

## Lessons

- **Reuse over duplication:** When a component exists in `ui/`, use it. Don't create a variant in a feature folder with different styling — it drifts immediately.
- **Match the reference:** When adding a new section (work), copy the data fetching pattern from the reviewed section (writing) exactly — including status filters, metadata, and query strategy.
- **Spacing from the layout:** The root layout defines the rhythm (`space-y-16 sm:space-y-24`). Inner pages should echo it, not invent new values.
- **Design tokens are law:** `--text-tertiary` for supporting text, not `--text-secondary`. The design system doc is the source of truth.
