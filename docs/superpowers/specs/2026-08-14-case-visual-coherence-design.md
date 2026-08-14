# Case Visual Coherence Design

## Context

The paged case journey is functionally complete, responsive, and accessible,
but its three stages currently feel like separate exhibition systems. Stage 1
uses a dossier-style three-column opening, Stage 2 introduces a nested paper
sheet, and Stage 3 switches to a dark manifesto surface with two competing
climaxes. The result is visually rich but harder to learn and less coherent
than the Homepage and Trace reference surfaces.

## Product Goal

Make the case journey feel like one continuous editorial investigation from a
present-day question, through historical evidence, and back to present action.
The experience should become calmer and easier to scan without losing its
archival identity or its final emotional payoff.

## Audience And Job

- Audience: classmates and lecturers experiencing the project for the first
  time, usually on a laptop or mobile device.
- Single job: understand where they are, follow the historical trace, and carry
  one clear idea back to the present without relearning the interface at each
  stage.

## Constraints

- Preserve all routes, data, copy, images, component structure, interactions,
  source drawers, progress semantics, and no-JavaScript behavior.
- Preserve the existing cream, ink, muted-red palette and the approved fonts.
- Do not redesign the Homepage or Trace pages.
- Do not add dependencies, cards, gradients, shadows, icons, animation, or new
  interaction requirements.
- Preserve visible focus, reduced motion, forced colors, touch targets, and
  horizontal-overflow guardrails.

## Chosen Direction: One Editorial System

The shared visual system uses one stable two-column frame: a narrow archival
rail and a broad narrative field. The muted-red Trace Line is the single
signature device. It carries file identity, historical continuity, and return
to the present without introducing a new visual metaphor on each route.

```text
┌──────────────────────────────────────────────────────────────┐
│ Product shell + three-stage progress                         │
├───────────────┬──────────────────────────────────────────────┤
│ archival rail │ narrative statement                          │
│ marker / act  │ supporting copy                              │
│ trace line    │ evidence, guidance, or application           │
└───────────────┴──────────────────────────────────────────────┘
```

## Typography

- Be Vietnam Pro remains the product shell, body, structural heading, CTA, and
  historical-record typeface.
- Newsreader is reserved for the single opening narrative statement on the
  library and each case stage.
- Stage 1 H1 is reduced from its poster scale to the same family of sizes used
  by Stage 2 and Stage 3.
- Section headings, historical titles, formation factors, application titles,
  and related-case headings use Be Vietnam Pro with a restrained scale.
- The Stage 3 conclusion remains the sole climax. It uses bold sans typography,
  muted red, and extra separation after the formation factors.

## Layout By Stage

### Stage 1: Present

- Replace the three-column opening with the shared rail + narrative grid.
- Keep the case number in the rail while removing its redundant visible
  "HỒ SƠ" label.
- Place the experience guide below the main narrative in the same content
  column so it reads as support, not a competing sidebar.
- Keep the opening question and optional perspective interaction unchanged.

### Stage 2: Historical Evidence

- Remove the nested-sheet border, offset duplicate border, and white card
  treatment from the opening.
- Keep the Trace Line, related Trace title, year, and first-record cue.
- Align the opening, evidence heading, and record content to the same narrative
  field used by the other stages.
- Use sans typography for evidence headings and record titles; keep Newsreader
  only for the opening H1.

### Stage 3: Return

- Replace the dark opening surface with the shared cream editorial surface.
- Stack the three formation factors vertically so they form one readable
  argument instead of a competing three-column poster.
- Separate the conclusion from the first viewport and keep it as the single
  visual climax.
- Use the same rail + narrative grid for the return section. Existing three
  application items remain intact.

## Navigation And Labels

- Keep the three progress links, active line, numbering, and `aria-current`.
- Hide the redundant visible "BƯỚC X / 3" line because the same state is already
  communicated by the active stage link.
- Hide the redundant visible "HỒ SƠ LIÊN QUAN" label while retaining the Trace
  title itself.
- Keep act labels that communicate a real narrative transition.
- Style the two stage-entry links as the same restrained primary text action.
  Footer previous/next navigation remains boxed because it has a separate
  route-navigation role.

## Responsive Behavior

- Desktop uses the same `minmax(9rem, 0.32fr) minmax(0, 1fr)` frame as the case
  library intro.
- Mobile collapses to one column while preserving the Trace Line and reducing
  its content offset.
- Mobile stage headings stay below the previous poster scale, retain natural
  wrapping, and do not truncate.
- The progress row remains one line with three equal targets and no horizontal
  scrolling.

## Accessibility And Testing

- Existing semantic landmarks, heading levels, link labels, focus rings, and
  source dialogs remain unchanged.
- Source-level CSS regression tests lock the shared grid, type roles, Stage 3
  surface, conclusion hierarchy, and primary-action treatment.
- Production acceptance continues to cover all 90 static case routes,
  representative mobile routes, transitions, interactions, reduced motion,
  forced colors, and no-JavaScript fallback.

## Self-Review

- No placeholders or unresolved design decisions remain.
- The direction changes presentation only; it does not expand architecture or
  behavior.
- The final conclusion, not the opening heading, is explicitly the single Stage
  3 climax.
- The continuous Trace Line is the only signature element, avoiding additional
  decorative systems.

## Success Criteria

1. The user does not need to relearn the layout between the three stages.
2. Stage 1, Stage 2, and Stage 3 share one content anchor and one typography
   hierarchy.
3. The Stage 2 opening no longer looks like a card nested inside a page.
4. Stage 3 no longer feels like a separate dark product and has one clear
   climax.
5. Progress remains obvious after removing the redundant position label.
6. Desktop and mobile remain free of overflow, console errors, and interaction
   regressions.
