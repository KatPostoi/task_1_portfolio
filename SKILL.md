---
name: portfolio-frontend
description: Use when modifying this portfolio frontend. Captures project-wide patterns: plain React + colocated CSS, local ownership of interactions, caution around child-order-dependent layouts, portals for full-screen overlays, and avoiding premature abstractions.
---

# Portfolio Frontend

## Core Patterns

- Keep ownership local. Page composition belongs in `HomePage`, section-specific interaction belongs inside the section component, and layout wrappers like `MainWrapper` should stay dumb.
- Add UI in colocated component folders with the project pattern: `Component.tsx`, component CSS, and `index.ts`.
- Treat layout work as desktop-first by default: design and stabilize the large-screen composition first, then add explicit breakpoint overrides for smaller viewports.
- Use semantic elements for interaction: `button` for actions, `a` for navigation.
- For full-screen layers such as modals, lightboxes, or overlays, render through `createPortal(..., document.body)` and keep close/focus/scroll-lock logic local to that feature.
- Prefer simple local state and component-level effects over shared hooks or global abstractions until repetition is real.
- Reuse design tokens from `src/assets/styles/root.css`, but keep new selectors component-scoped and explicit because the project uses plain global CSS.

## Important Project Constraints

- Before changing JSX in grid-heavy sections, inspect CSS for `nth-child`, direct-child ordering, and layout coupling. Preserve child order unless you refactor the selectors first.
- The global `*` rule in `root.css` affects defaults such as color, text alignment, decoration, and margins. Any new interactive element needs explicit local reset styles.
- Full-screen overlays must define their own stacking level and be checked against existing fixed UI such as the scroll-to-top button.

## Anti-Patterns

- Do not move section-specific behavior into `App`, `HomePage`, or layout wrappers unless the behavior is truly page-wide.
- Do not build generic modal, hook, or UI frameworks for one-off interactions.
- Do not rely on default browser styling for `button` or overlay-like elements.
- Do not add wrappers or reorder nodes inside layout-sensitive blocks without auditing the CSS.
- Do not keep adding asset references in CSS via `../../src/...`; prefer Vite-safe asset handling instead of expanding a pattern that already causes build warnings.

## Validation

- Run `npm run lint`.
- Run `npm run build`.
- Manually verify desktop and mobile behavior for overlays, focus handling, scroll lock, and stacking.
