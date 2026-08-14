# Three-Stage Living Case Journey Design

## Product Goal

Make every "Ho so tu tuong song" easier to understand and finish by replacing
the current six-act single long page with three short, explicit pages:

```text
Hien tai -> Dau vet lich su -> Tro lai hien tai
```

The change improves orientation and pacing without turning the experience into
a quiz, game, slide deck, or interaction-heavy wizard. The visitor only needs
two `Tiep tuc` actions to finish a case. Perspective choices, source drawers,
and links to the full Trace remain optional.

The existing 30 case records and three Trace routes remain the source of truth.
No historical statement, source, image, or case interpretation is rewritten as
part of this navigation refactor.

## Problem Statement

The current case experience is complete and visually distinctive, but one page
contains six large acts and three full historical reveals. The audit found four
recurring usability costs:

1. Large transition headings often occupy most of a 1366x768 viewport before
   the next meaningful content appears.
2. The optional experience guide is too quiet for a visitor who is already
   unsure how to continue.
3. Six progress items require horizontal scrolling on mobile and expose a
   native scrollbar with partially hidden labels.
4. The final section offers useful related cases but does not create a strong
   enough sense that one investigation has been completed.

The information itself is not the problem. The delivery unit is too long.

## Success Criteria

1. Every case is delivered through exactly three stages and requires no more
   than two `Tiep tuc` actions to reach the return to the present.
2. The three-stage progress navigation fits at 375x812 and 390x844 without a
   horizontal scrollbar or hidden stage label.
3. Each stage has one page-level heading, a clear current-step marker, a visible
   primary next action, and a secondary previous action where relevant.
4. The first stage states plainly that choosing a perspective is optional.
5. The evidence stage contains all three existing source-backed reveals and the
   unchanged Source Drawer behavior.
6. The return stage contains the existing thought formation, three practical
   lenses, related cases, Trace link, and a clear completion cue built only from
   existing case content.
7. All 30 base routes and 60 stage routes are statically generated.
8. Server-rendered, no-JavaScript, keyboard, screen-reader, reduced-motion,
   forced-colors, reflow, metadata, sitemap, and performance behavior remain
   release-ready.
9. Homepage, library, all three Trace routes, QR sharing, Trace progress, Trace
   recap, and Journey Closing do not regress.

## Non-Goals

- No redesign of Homepage, the case library, or any Trace route.
- No mandatory answer, score, progress lock, timer, account, or persistence.
- No animation, transition library, dependency, or page-swipe gesture.
- No new historical fact, image, source, or interpretation.
- No six-page-per-case flow.
- No duplicate "continuous reading" mode.
- No change to `ThoughtCase` data fields unless a route helper type requires it.

## Chosen Information Architecture

Every case uses three routes:

```text
/ho-so/[slug]
/ho-so/[slug]/dau-vet
/ho-so/[slug]/tro-lai
```

### Stage 1: Hien tai

Route: `/ho-so/[slug]`

Contains the current Hoi 1 and Hoi 2 material:

- case number and present-day situation;
- opening question;
- always-visible one-sentence journey guide;
- initial assumption;
- optional two-perspective choice;
- explicit statement that no choice is required;
- primary action `Mo ba dau vet`;
- secondary action `Chon ho so khac`.

The guide copy is concise and visible without opening a disclosure:

```text
Doc tinh huong, mo ba dau vet, roi tro lai hien tai.
Ban khong can chon dap an de tiep tuc.
```

Production copy uses Vietnamese diacritics.

### Stage 2: Dau vet lich su

Route: `/ho-so/[slug]/dau-vet`

Contains the current Hoi 3 and Hoi 4 material:

- primary Trace title and central question;
- a compact stage heading that does not consume the full viewport;
- all three existing evidence reveals in their approved order;
- current historical image, caption, verification, sources, and provenance;
- Source Drawer triggers and no-JavaScript source fallbacks;
- primary action `Ket noi va tro lai`;
- secondary action `Quay lai van de`.

The page does not add a reveal gate. All evidence remains readable by ordinary
scrolling.

### Stage 3: Tro lai hien tai

Route: `/ho-so/[slug]/tro-lai`

Contains the current Hoi 5 and Hoi 6 material:

- the three existing thought-formation factors;
- the existing conclusion;
- `DIEU MANG THEO` as a completion label above the existing return heading;
- the existing return summary and three practical lenses;
- two related cases;
- actions for the case library, full Trace, and evidence stage;
- secondary action `Xem lai dau vet`.

The completion cue does not generate a score or new takeaway. It gives greater
prominence to the existing `returnHeading` and `returnSummary` so the visitor
feels that the investigation has reached a result.

## Navigation Model

The existing six-item scroll observer is replaced by a server-rendered
three-stage navigation:

| Step | Visible label | Route suffix | Accessible label |
| --- | --- | --- | --- |
| 01 | Hien tai | base route | `Buoc 1: Hien tai` |
| 02 | Dau vet | `/dau-vet` | `Buoc 2: Dau vet lich su` |
| 03 | Tro lai | `/tro-lai` | `Buoc 3: Tro lai hien tai` |

The current route receives `aria-current="step"`. Every item is a normal link
and works without JavaScript. The layout uses a three-column grid at every
breakpoint, so no horizontal scrolling, auto-centering, or client-side scroll
tracking is required.

Each stage ends with a shared navigation block:

```text
Stage 1: [Chon ho so khac] [Mo ba dau vet ->]
Stage 2: [<- Quay lai van de] [Ket noi va tro lai ->]
Stage 3: [<- Xem lai dau vet] [Chon ho so tiep theo ->]
```

Browser Back remains valid because each transition is a real route navigation.

## Component Architecture

The route shell and stage bodies are separated by responsibility:

```text
app/ho-so/[slug]/page.tsx
  -> CaseJourneyShell(stage="hien-tai")
     -> CasePresentStage

app/ho-so/[slug]/dau-vet/page.tsx
  -> CaseJourneyShell(stage="dau-vet")
     -> CaseEvidenceStage

app/ho-so/[slug]/tro-lai/page.tsx
  -> CaseJourneyShell(stage="tro-lai")
     -> CaseReturnStage
```

Shared components:

- `CaseJourneyShell` renders the existing brand/library header and receives the
  active stage directly from each Server Component route. A parent layout does
  not infer the current pathname.
- `CaseStageProgress` is a Server Component. It does not observe scroll or own
  client state.
- `CaseStageNavigation` renders previous/next links and stage position copy.
- `CasePresentStage`, `CaseEvidenceStage`, and `CaseReturnStage` own only their
  stage markup.
- `CaseEvidence`, `PerspectivePrompt`, `SourceDrawer`, and image presentation
  helpers are reused rather than rewritten.

The old `CaseFilePage` and client `CaseProgress` are removed after all routes
use the new components.

## Data And State

`ThoughtCase` remains unchanged. Route helpers in
`lib/thought-case-journey.ts` define:

```ts
export const CASE_JOURNEY_STAGES = ["hien-tai", "dau-vet", "tro-lai"] as const;

export type CaseJourneyStage = (typeof CASE_JOURNEY_STAGES)[number];

export function getCaseStageHref(slug: string, stage: CaseJourneyStage): string;
```

Perspective selection remains local to Stage 1 because it does not alter later
content. It is intentionally not stored in cookies, local storage, session
storage, or URL parameters.

Evidence resolution continues through `getCaseEvidence()`. Related-case
resolution continues through `getRelatedCases()`.

## Metadata And Static Generation

- The base route keeps the current case title and canonical URL.
- Stage 2 uses `{case title} - Dau vet lich su` and its own canonical route.
- Stage 3 uses `{case title} - Tro lai hien tai` and its own canonical route.
- All three stages reuse the current primary Trace image for Open Graph data.
- `generateStaticParams()` produces 30 base pages, 30 evidence pages, and 30
  return pages.
- Sitemap output includes `/ho-so`, all 90 case-stage URLs, the existing Trace
  routes, Homepage, methodology, and Journey Closing.

Unknown slugs continue to render the branded not-found state. Fixed stage
folders avoid accepting unknown stage values.

## Visual And Responsive Rules

- Preserve the cream, ink, muted-red, and dark editorial palette.
- Preserve the current type families and historical image taxonomy.
- Reduce stage-intro vertical padding so the first meaningful content is
  visible or clearly peeking within 1366x768.
- Keep stage headings prominent but cap their desktop and mobile size below the
  current full-act transition headings.
- Keep body copy at least 16px on mobile.
- Keep every interactive target at least 44px high on mobile.
- Use a three-column progress grid at 375px and above with no horizontal rail.
- Use existing borders and Trace Line language; add no cards, shadows,
  gradients, icons, or decorative diagrams.
- Preserve reduced motion and forced-colors fallbacks.

## Copy Polish

The Source Drawer verification phrase `summary la dien giai` is replaced with
`phan tom luoc la dien giai` wherever it appears in production data. The change
does not alter the historical assertion or verification status.

All new visible UI copy is Vietnamese. Route slugs remain ASCII.

## Accessibility

- Every stage contains exactly one `h1`.
- Progress is a named navigation landmark with `aria-current="step"`.
- Previous and next actions have descriptive visible text.
- Perspective choices retain `aria-pressed`, visible feedback, and a clear
  `Bo lua chon` action.
- The optional-choice explanation is not conveyed only through muted color.
- Source Drawer naming, focus containment, Escape behavior, and restoration are
  unchanged.
- Stage routes remain complete without JavaScript.
- Page-level horizontal overflow is prohibited at 375x812, 390x844, 640x900,
  1366x768, and 1920x1080.

## Testing And Acceptance

Unit and source-contract tests verify:

- the exact three-stage registry and route builder;
- one h1 per rendered stage;
- stage-specific content boundaries;
- all 30 cases resolve all three routes;
- stage progress uses route links and `aria-current` without scroll listeners;
- old six-act anchor progress is removed;
- sitemap includes all 90 case-stage routes;
- no-JavaScript evidence sources remain present on Stage 2;
- new guidance and completion labels use approved copy.

Production acceptance verifies:

- Homepage -> library -> Stage 1 -> Stage 2 -> Stage 3 -> related case;
- Back and previous links;
- all 90 case-stage routes return successful responses;
- representative cases from all six categories on 390x844;
- progress navigation, optional perspective feedback, Source Drawer, and
  related-case links;
- desktop, laptop, mobile, compact mobile, reduced motion, forced colors, and
  no-JavaScript;
- no horizontal overflow, hydration error, console error, broken image, or
  broken internal route;
- Homepage and all three Trace acceptance suites remain green.

Final release gates remain:

```text
npm test
npm run typecheck
npm run lint
npm run build
Homepage production acceptance
Trace production acceptance
Case production acceptance
Lighthouse: Homepage, /ho-so, Stage 1, Stage 2, Stage 3
```

## Rollout And Compatibility

The current base case URLs remain valid and become Stage 1. New stage links are
additive. There is no database, migration, external API, or dependency change.

The existing open PR is updated with this refactor and its verification
evidence. The branch is not merged without explicit user authorization.
