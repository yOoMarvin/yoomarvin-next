# Craft

Micro-polish rules that apply across design and motion. These are the details
users can't name but always feel. Based on Jakub Krehel's writing on interface craft.

## Concentric Border Radius

When nesting an element inside a container with rounded corners, the radii must
be concentric — not equal.

**Formula:** `outer radius = inner radius + padding`

```
inner: 12px, padding: 8px → outer: 20px
```

Equal radii on nested elements look off even when users can't articulate why.
If a card has `rounded-2xl` (16px) and 8px inner padding, the inner element
should use `rounded-xl` (12px), not the same `rounded-2xl`.

## Optical Alignment

Geometric center ≠ visual center. Shapes create visual weight that math doesn't
account for. When something looks misaligned despite being numerically correct,
trust your eyes.

Common cases:

- Icons next to text need slightly less padding on the icon side for optical balance
- Prefer fixing spacing inside the SVG file itself over adding CSS overrides
- Round numbers with `rounded` often need icons nudged 1px up to feel centered

## Shadows Over Borders

Prefer `box-shadow` over `border` for depth and separation. Shadows use
transparency and work on any background; solid border colors break on
non-matching surfaces.

**Layer multiple shadows for nuance:**

```css
box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.06),
    /* thin outline */ 0 1px 3px rgba(0, 0, 0, 0.08),
    /* soft fill */ 0 4px 12px rgba(0, 0, 0, 0.05); /* ambient depth */
```

In dark mode, flip to white-tinted shadows at lower opacity.

Borders (`--border-default`, `--border-subtle`) are still correct for structural
dividers and list separators — this rule applies to card-style surfaces and
interactive elements.

## Image Outlines

Add a 1px inset outline to images to create depth and visual containment,
especially where images can bleed into the page background.

```css
outline: 1px solid rgba(0, 0, 0, 0.1);
outline-offset: -1px;
```

In dark mode, switch to `rgba(255, 255, 255, 0.1)`.

In Tailwind, use the `ring` utilities:

```tsx
<img className="ring-1 ring-black/10 dark:ring-white/10" ... />
```

`outline-offset: -1px` is key — it keeps the outline inside the image boundary
so it doesn't bleed outside rounded corners.
