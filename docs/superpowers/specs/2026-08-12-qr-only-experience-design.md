# QR-Only Experience Design

## Goal

Restore the approved ĐUỐC HỒNG experience that existed before PR #10 while
retaining only local QR sharing in the Homepage and Trace headers.

## Scope

Keep:

- `QrShareDialog` in the Homepage header and every Trace header.
- Local, lazy QR generation with canonical URLs.
- Copy, native-share fallback, keyboard focus containment, Escape dismissal,
  focus restoration, forced-colors support, and reduced-motion support.
- Existing routes, content, assets, TraceProgress, TraceRecap, Source Drawer,
  responsive behavior, and product branding.

Remove:

- Scroll-linked `TraceBackStory` and its sticky image transition.
- Historical continuity rails.
- Thought Formation convergence branches.
- Journey Closing trace/torch mark.
- Storytelling-only CSS, acceptance assertions, unit tests, specs, plans, and QA
  claims introduced by PR #10.

Restore:

- The original `TimeBridge` presentation and Trace data flow from before PR #10.
- The original Thought Formation decorative line.
- The original Journey Closing spacing and composition.
- Release documentation to describe QR sharing without claiming the removed
  storytelling features.

## Implementation Strategy

Use Git history as the source of truth:

1. Revert merge commit `6611fcc` to restore the complete pre-PR #10 state.
2. Cherry-pick QR commit `fba285f` to reapply only the approved QR slice.
3. Add a QR-only regression test that rejects storytelling selectors/components
   while confirming QR triggers remain in Homepage and Trace headers.
4. Update QA documentation to record the final QR-only experience.

This is preferred over hiding storytelling with CSS because it removes unused
client code, motion logic, tests, and maintenance surface instead of leaving a
dormant implementation in production.

## Verification

- `npm test`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- Homepage production acceptance at desktop, mobile, 640px reflow, forced
  colors, and reduced motion.
- Trace production acceptance for all three routes at desktop/mobile plus
  640px reflow, forced colors, and reduced motion.
- Confirm QR generation makes no request to an external QR service.
- Confirm no `trace-back-story`, `formation-convergence`,
  `historical-moment__continuity`, or `journey-trace-mark` markup remains.

## Completion

The site visually and behaviorally matches the pre-PR #10 experience, with the
single addition of accessible local QR sharing in both header contexts.
