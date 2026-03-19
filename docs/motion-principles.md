# Motion Principles

Based on Emil Kowalski, Jakub Krehel, and Jhey Tompkins.
Full audit skill: `npx add-skill kylezantos/design-motion-principles`

## The Decision Sequence (apply in order)

1. **Emil — Should this animate at all?** Check interaction frequency.
2. **Jakub — Is it subtle enough?** Would users notice it or just feel it?
3. **Jhey — What could this become?** Lab section only.

## Frequency Rules

The more often an interaction occurs, the less animation it should have.

| Interaction        | Frequency | Animation rule                   |
| ------------------ | --------- | -------------------------------- |
| Sidebar toggle     | High      | ≤150ms, ease-out, no bounce      |
| Page navigation    | High      | ≤200ms opacity fade only         |
| Hover on list rows | High      | ≤100ms, opacity/color shift      |
| Photo fan hover    | Rare      | Expressive allowed, 300–400ms    |
| Lab experiments    | Variable  | No rules — intentionally playful |

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

## Icon Transitions

When icons appear or disappear contextually (e.g. state changes, hover reveals), animate with `opacity` + `scale` + `blur` together. Spring animations feel more natural than CSS easing for appearing elements — use `motion` springs rather than CSS keyframes here.

## Interruptible Animations

Use transitions (CSS or motion springs) for all interactive state changes — not keyframe animations. Keyframes run on a fixed timeline and cannot retarget mid-way. Transitions interpolate toward the latest state, so they handle interrupted gestures gracefully.

**Rule:** Keyframe animations only for staged sequences that play once (loaders, intro reveals). Everything interactive uses transitions.

## Stagger Entering Elements

Don't animate an entire section as a single block. Break it into meaningful chunks and stagger:

- Title, description, and actions: ~100ms delay between each
- Text split into words: ~80ms delay per word-level span
- Use CSS custom properties (`--i`) to calculate stagger offsets

Non-text elements (images, cards) stay as single blocks — only split text.

## Exit Animations

Exit animations should be smaller and faster than entrances. Departing elements don't need attention — keep movement subtle:

- Translate: ~12px max (not full off-screen)
- Pair with reduced opacity and light blur
- Maintain direction cue without a jarring departure

## The Test

Remove the animation. Does something feel missing or broken?

- Yes → keep it
- No → remove it
- Users comment "nice animation" → it's too prominent, dial it back

## Hard Rules

- Use `motion` (from the `motion` package) for all JS-driven animations
- Use Tailwind transition utilities for simple hover/focus states
- Never add `animate-*` classes without a clear functional reason
- Always include `prefers-reduced-motion` support (already in globals.css)
