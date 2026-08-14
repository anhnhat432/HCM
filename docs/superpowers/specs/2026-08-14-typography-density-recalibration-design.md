# Typography And Density Recalibration Design

## Context

The approved visual identity remains strong, but the case library and paged
case journey repeat poster-scale serif headings too often. A fresh audit at
1366x768 and 390x844 measured 95.6px for the library H1, 109.3px for the Stage
1 H1, and 95.6px for the Stage 3 return H2. Their first card or primary action
often begins below the initial viewport. The existing Trace opening is the
reference balance: its 48.8px desktop H1 keeps the narrative, action, and image
visible together.

## Goal

Rebalance the shared typography scale and vertical density so each page keeps
one memorable display moment while exposing meaningful content earlier.

## Constraints

- Do not redesign the Homepage, library, Trace, or three-stage architecture.
- Do not change routes, components, data, copy, images, interactions, or fonts.
- Preserve the cream, ink, muted-red, dark editorial palette and Trace Line.
- Preserve 44px mobile targets, body readability, focus, reduced motion, forced
  colors, and no-JavaScript behavior.
- Keep the Homepage hero, Trace opening, and Stage 3 dark opening visually
  prominent.
- Do not add dependencies, cards, shadows, gradients, icons, or animation.

## Typography Hierarchy

The display serif is reserved for one dominant statement per surface. Shared
secondary headings step down rather than repeating the same poster scale.

- Homepage hero: unchanged.
- Homepage scenario heading: about 63px desktop and 41px mobile.
- Library H1: about 75px desktop and 49px mobile.
- Stage 1 H1: about 87px desktop and 55px mobile.
- Stage 2 opening H1: about 66px desktop and 43px mobile.
- Stage 2 section H2: about 68px desktop and 43px mobile.
- Stage 2 historical H3: about 49px desktop and 41px mobile.
- Stage 3 opening H1: about 66px desktop and 45px mobile.
- Stage 3 return H2: about 71px desktop and 45px mobile.
- The Stage 3 convergence conclusion remains the single oversized climax.

## Density Rules

- Reduce library intro padding enough for the first case card to peek at
  1366x768.
- Reduce paged Stage 1 top padding enough for its primary CTA to appear within
  1366x768 and comfortably within 390x844.
- Reduce Stage 2 file padding, sheet padding, heading margin, and heading size
  so the first historical cue and CTA fit within the initial viewport.
- Reduce later evidence and return-section spacing without making historical
  records feel compressed.
- Keep Stage 3's first formation factor visible in the initial viewport.

## Regression Guardrails

Source-level typography tests lock the approved clamp values for the library,
Homepage scenario heading, Stage 1, Stage 2, and Stage 3. Production acceptance
and screenshot QA verify no overflow, visible actions, and responsive hierarchy
at 1366x768 and 390x844.

## Success Criteria

1. The library and case pages no longer feel like consecutive title cards.
2. Desktop display headings remain prominent but stay below the audited
   96–109px values.
3. Stage 1 and Stage 2 show their primary action within the initial viewport.
4. Homepage and Trace retain their approved visual identity.
5. Unit tests, typecheck, lint, build, and production acceptance pass.

