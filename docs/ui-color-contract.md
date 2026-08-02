# UI color contract

Pocket Cosmos is a light-theme application. Components must describe the role of a color instead of relying on dark-theme utility names that are later inverted by global CSS.

## Approved semantic utilities

- Primary text: `text-ink`
- Secondary text: `text-ink-soft`
- Muted metadata: `text-ink-muted` or `text-slate-500`
- Text on a solid accent or dark control: `text-on-accent`
- White panel: `bg-surface`
- Neutral inset surface or input: `bg-surface-muted`
- Indigo-tinted surface: `bg-surface-tint` or `bg-surface-tint-strong`
- Standard border: `border-line`
- Stronger hover border: `border-line-strong`

Do not globally redefine Tailwind classes such as `text-white`, `bg-white`, or `border-white/10`. Their names must never mean the opposite of their rendered color.

`npm run lint` runs `scripts/check-color-contract.mjs`. It rejects the legacy ambiguous utilities and verifies the contrast ratio of the approved foreground/background pairs.
