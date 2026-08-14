# Living Thought Cases Design

## Product Goal

Turn DUOC HONG from a polished linear knowledge website into a repeatable,
curiosity-driven experience. A visitor starts from a recognizable problem in
the present, opens a source-backed case file, follows historical evidence, and
returns to the original problem with three practical lenses rather than one
declared correct answer.

The existing three Trace routes remain the historical source of truth. The new
case experience references Trace data; it does not fork, rewrite, or invent
historical facts.

## Success Criteria

1. The launch library contains exactly 30 curated situations across six useful
   present-day categories.
2. Every case has a static route at `/ho-so/[slug]` and follows the approved
   six-act narrative.
3. Every historical reveal resolves to an existing Trace moment and exposes its
   existing verification, image provenance, and source links.
4. A visitor can finish every case by ordinary scrolling. Prompts, comparison,
   evidence drawers, and perspective choices are optional.
5. A first-time visitor can identify where to start and how to continue without
   explanation from the project team.
6. The current Trace routes, content, assets, progress, recap, Source Drawer,
   branding, and QR sharing continue to work.
7. Server-rendered, reduced-motion, forced-colors, keyboard, screen-reader, and
   640px reflow experiences remain complete.
8. The build, unit tests, typecheck, lint, production acceptance, and performance
   gates pass before publication.

## Non-Goals

- No 3D scene or game mechanics.
- No login, account, score, leaderboard, mandatory quiz, or completion lock.
- No AI-generated historical statement or source.
- No free-text AI question flow in the launch version.
- No redesign of the three existing Trace pages.
- No new historical asset search in this phase.
- No realtime classroom system in the launch version.

## Product Principles

### Present First

Cases begin with a situation that a student or young adult can recognize within
five seconds. The historical topic is not revealed as a lesson title before the
visitor understands the present problem.

### Curiosity Without Friction

The core path is scrolling. An optional interaction may deepen understanding,
but never unlock required content.

### One Meaningful Reveal Per Act

Every 20-30 seconds, the visitor receives a new relationship, source, contrast,
or reframing. Motion never exists only as decoration.

### Evidence Before Interpretation

Every historical claim shown in a case is resolved from an existing verified
Trace moment. Case copy may interpret relevance to the present, but it must not
alter the underlying event, quotation, date, or source.

### Quiet Guidance

The interface explains the next useful action at the point of need. It avoids
long onboarding, mystery icons, and repeated popups.

## Information Architecture

Existing routes remain:

```text
/
/trace/dai-doan-ket
/trace/dao-duc-trach-nhiem
/trace/con-nguoi
/phuong-phap
```

New routes:

```text
/ho-so
/ho-so/[slug]
```

- `/ho-so` is the full case library with category filtering and search.
- `/ho-so/[slug]` is one six-act case experience.
- Homepage keeps its approved hero and document image, changes the main CTA to
  `Mo mot ho so`, adds three suggested cases, and preserves the current Trace
  list below under the label `Kho tu lieu nen`.

## Scenario Taxonomy

The launch library has six categories with five cases each.

| Category | Slug | Situation | Primary Trace | Supporting Trace |
| --- | --- | --- | --- | --- |
| Study and teamwork | `nhom-gioi-nhung-khong-hop-tac` | A talented member refuses to collaborate | Unity | Humanity |
| Study and teamwork | `mot-nguoi-ganh-het-cong-viec` | One person carries the whole project | Responsibility | Unity |
| Study and teamwork | `bat-dong-khi-chay-deadline` | Disagreement grows near a deadline | Unity | Responsibility |
| Study and teamwork | `thanh-vien-yeu-bi-bo-lai` | A weaker member is left behind | Humanity | Unity |
| Study and teamwork | `chia-cong-khong-cong-bang` | Work and credit are divided unfairly | Responsibility | Humanity |
| Leadership | `nguoi-lanh-dao-khong-nhan-loi` | A leader refuses to admit a mistake | Responsibility | Humanity |
| Leadership | `quyet-dinh-de-lam-nhung-sai` | The easiest decision is not the right one | Responsibility | Unity |
| Leadership | `thanh-tich-cua-nhom-cong-cua-ai` | Who owns a collective achievement? | Unity | Responsibility |
| Leadership | `noi-that-khi-khong-ai-biet` | Tell the truth when nobody can detect the shortcut | Responsibility | Humanity |
| Leadership | `ky-luat-va-long-tin` | Can discipline exist without destroying trust? | Responsibility | Unity |
| Conflicting interests | `loi-ich-ca-nhan-va-tap-the` | Personal gain conflicts with a shared goal | Unity | Responsibility |
| Conflicting interests | `uu-tien-nguoi-quen` | A familiar person receives an unfair advantage | Responsibility | Humanity |
| Conflicting interests | `chia-se-tai-nguyen-khan-hiem` | A group must share a scarce resource | Unity | Humanity |
| Conflicting interests | `thoa-hiep-den-dau` | How far should a group compromise? | Unity | Responsibility |
| Conflicting interests | `im-lang-truoc-sai-pham` | Silence protects the group but hides wrongdoing | Responsibility | Unity |
| Social media | `dam-dong-dang-cong-kich-mot-nguoi` | A crowd is attacking one person online | Humanity | Responsibility |
| Social media | `tin-chua-kiem-chung` | An alarming claim spreads before verification | Responsibility | Unity |
| Social media | `bat-dong-tren-mang` | Disagreement becomes personal hostility | Unity | Humanity |
| Social media | `thanh-tich-va-hinh-anh-ca-nhan` | Online identity reduces a person to achievements | Humanity | Responsibility |
| Social media | `noi-dung-gay-chia-re` | Divisive content benefits its creator | Unity | Responsibility |
| Human development | `diem-so-co-dinh-nghia-con-nguoi` | A score becomes a measure of human worth | Humanity | Responsibility |
| Human development | `nguoi-cham-tien-bo` | A slow learner is treated as incapable | Humanity | Unity |
| Human development | `co-hoi-thu-hai` | Should a person receive another opportunity? | Humanity | Responsibility |
| Human development | `ap-luc-nang-suat` | Productivity pressure erases individual needs | Humanity | Responsibility |
| Human development | `giao-duc-vi-thanh-tich` | Education serves metrics instead of growth | Humanity | Unity |
| Community | `khac-biet-the-he` | Generations disagree about what progress means | Unity | Humanity |
| Community | `nguoi-moi-trong-cong-dong` | A newcomer remains outside the group | Unity | Humanity |
| Community | `muc-tieu-chung-khi-loi-ich-khac-nhau` | Different interests must find one shared direction | Unity | Responsibility |
| Community | `phat-trien-nhung-bo-quen-con-nguoi` | Progress improves numbers but harms people | Humanity | Responsibility |
| Community | `trach-nhiem-truoc-van-de-chung` | Everyone waits for somebody else to act | Responsibility | Unity |

The visible Vietnamese titles and summaries will be authored in production
data. The English table labels document intent only.

## Case Data Model

```ts
export const CASE_CATEGORIES = [
  "study-teamwork",
  "leadership-responsibility",
  "conflicting-interests",
  "social-media",
  "human-development",
  "community-society",
] as const;

export type CaseCategory = (typeof CASE_CATEGORIES)[number];

export interface CaseEvidenceReference {
  readonly traceSlug: TraceSlug;
  readonly momentId: string;
}

export interface CaseReveal {
  readonly assumption: string;
  readonly finding: string;
  readonly reframe: string;
  readonly evidence: CaseEvidenceReference;
}

export interface PresentLens {
  readonly title: string;
  readonly summary: string;
}

export interface ThoughtCase {
  readonly slug: string;
  readonly category: CaseCategory;
  readonly title: string;
  readonly shortPrompt: string;
  readonly context: string;
  readonly openingQuestion: string;
  readonly primaryTrace: TraceSlug;
  readonly supportingTrace?: TraceSlug;
  readonly optionalPerspective?: readonly [string, string];
  readonly reveals: readonly [CaseReveal, CaseReveal, CaseReveal];
  readonly returnHeading: string;
  readonly returnSummary: string;
  readonly presentLenses: readonly [PresentLens, PresentLens, PresentLens];
  readonly relatedCaseSlugs: readonly [string, string];
  readonly featured?: boolean;
}
```

Build-time tests enforce exactly 30 unique slugs, five cases per category,
three reveals per case, valid related-case links, and resolvable evidence.

## Evidence Resolution

`CaseEvidenceReference` resolves through a new pure registry helper:

```ts
getCaseEvidence(reference: CaseEvidenceReference): {
  trace: CompleteTraceData;
  moment: HistoricalMoment;
}
```

The helper must throw during tests/build for unknown Trace slugs or moment IDs.
Case pages render the existing moment title, year, image metadata, verification,
and sources from `data/traces.ts` rather than copied case data.

## Six-Act Experience

### Act 1: The Present Problem

- Specific context, short enough to scan in 10-15 seconds.
- One clear page-level heading.
- Primary cue: `Cuon de mo ho so`.
- Optional two-view perspective prompt never blocks scrolling.

### Act 2: Initial Assumption

- Shows a common interpretation of the situation.
- If a visitor chose a perspective, the copy acknowledges it without declaring
  the choice correct or wrong.
- Without JavaScript, both perspectives remain readable as plain text.

### Act 3: Open the File

- Introduces the primary Trace and the first evidence reference.
- Uses archival typography, document crop, annotation, and one red trace line.
- Explicit control labels: `Mo dau vet`, `Xem nguon`, `Den moc lich su`.

### Act 4: Three Evidence Reveals

Each reveal follows:

```text
Ta thuong nghi...
Du kien cho thay...
Vi vay can nhin lai...
```

- Exactly one resolved historical moment per reveal.
- The visitor may open the existing Source Drawer or navigate to the full Trace.
- Every reveal is complete in server markup.

### Act 5: Thought Connection

- The three reveals connect to the primary Trace conclusion.
- Typography, spacing, one line, and muted red create the climax.
- No nodes, card diagram, infographic, or new historical assertion.

### Act 6: Return to the Present

- Repeats the opening situation in shorter form.
- Presents three practical lenses, not one correct answer.
- Offers `Mo ho so khac`, `Doc Trace day du`, and source review.
- Related cases create continued exploration without infinite-scroll pressure.

## Component Boundaries

### Server Components

- `app/ho-so/page.tsx`: metadata and full library shell.
- `app/ho-so/[slug]/page.tsx`: static params, metadata, not-found handling.
- `CaseFilePage`: composes all six acts from resolved data.
- `CaseEvidence`: renders resolved Trace moment and Source Drawer.
- `CaseReturn`: renders present lenses and related cases.

### Small Client Enhancements

- `ScenarioPicker`: rotates among curated case suggestions.
- `CaseLibraryFilters`: optional category/search filtering; all cases remain in
  server markup.
- `PerspectivePrompt`: optional local state with no persistence requirement.
- `CaseProgress`: active section tracking and anchor navigation.
- Existing `TraceReveal` or a case-specific reduced-motion-safe reveal wrapper.

No new dependency is required.

## Homepage Integration

The approved hero composition, document image, branding, QR button, and footer
remain. Changes are limited to:

1. Primary action links to `/ho-so` and reads `Mo mot ho so`.
2. A `ScenarioPicker` section appears after the hero with three featured cases
   and `Doi tinh huong`.
3. Existing Trace list remains below, relabeled `Kho tu lieu nen`.
4. A direct link to `/ho-so` is added to the footer or methodology navigation.

The Homepage must not become a dashboard or card grid.

## Visual Language

- Preserve cream canvas, ink, muted red, editorial typography, and archival
  imagery.
- Case pages introduce file numbers, marginal notes, redaction-like rules,
  paper layering, source stamps, and one continuous trace line.
- Avoid generic cards, glass surfaces, gradients-as-decoration, 3D, and game UI.
- At least one strong but content-driven visual reveal appears in each case.
- Historical image presentation continues to use the existing taxonomy.

## Quiet Guidance

1. One primary action per viewport region.
2. Important actions always include text labels; icons are secondary.
3. Contextual guidance appears where the action becomes available:
   `Cuon de mo tung dau vet`, `Cham de xem chi tiet tai lieu`.
4. Guidance disappears after the relevant action and never reopens automatically.
5. Case progress always names the current act and exposes anchor links.
6. Every interaction produces immediate visual and focus feedback.
7. `Cach trai nghiem` opens an optional three-step explanation under 20 seconds.
8. Mobile targets are at least 44 CSS pixels.

## Progressive Enhancement and Failure Modes

- Without JavaScript, all 30 cases, six acts, evidence, sources, and return lenses
  remain readable in document order.
- Optional filters fall back to the complete categorized library.
- Optional perspective prompts fall back to showing both perspectives.
- Unknown case slugs call `notFound()`.
- Invalid evidence references fail unit tests and static generation.
- Missing optional images use the existing Trace placeholder presentation.
- Reduced motion renders all reveals complete and removes scroll-linked movement.
- Forced colors uses semantic system colors and retains borders/active markers.
- No case completion state is required, so storage failure cannot block reading.

## Accessibility

- One `h1` per route and ordered section headings.
- Case progress uses `aria-current="step"` and a descriptive navigation label.
- Source Drawer behavior and focus restoration remain unchanged.
- Optional prompt buttons use visible selected text/check state, not color alone.
- Guidance is not announced repeatedly; status changes use a polite live region.
- Decorative paper/trace graphics are `aria-hidden="true"` and non-focusable.
- Skip link, focus-visible ring, keyboard anchors, and logical DOM order remain.

## SEO and Performance

- All 30 cases use `generateStaticParams` and unique Vietnamese metadata.
- Sitemap includes `/ho-so` and every case route.
- Case metadata derives its social image from the primary Trace present image
  until dedicated case images are approved.
- Server Components own content; client bundles are limited to picker, filters,
  prompt, and progress.
- No new runtime dependency.
- Images below the opening remain lazy and correctly sized.
- Performance gates use three Lighthouse trials; median thresholds must not be
  lower than the current release baselines documented at implementation start.

## Testing Strategy

### Unit and Static Tests

- Exactly 30 cases and five per category.
- Unique slugs and valid related links.
- Every evidence reference resolves to a verified Trace moment.
- No copied historical summary/source fields in case data.
- Homepage and sitemap expose case routes.
- Every case renders six acts and optional controls do not gate content.
- Quiet-guidance selectors and accessible labels exist.

### Production Acceptance

- Homepage and `/ho-so`: 1920x1080, 1366x768, 390x844, 375x812.
- Representative case from each category at desktop and 390x844.
- All 30 routes return success and one page-level heading.
- 640x900 reflow, forced colors, reduced motion, and no horizontal overflow.
- Keyboard navigation through picker, filters, prompt, progress, evidence, and
  related cases.
- Direct-entry, anchor navigation, no console/hydration errors, and Source Drawer
  regression.
- No-JavaScript smoke test confirms full narrative text and sources remain.

### Performance and Visual QA

- Three Lighthouse trials for Homepage, `/ho-so`, and one representative case.
- Inspect Homepage integration, library density, every act of one case, and the
  longest-copy case on desktop/mobile.
- Validate a first-click test with somebody unfamiliar with the project before
  public release when a human tester is available.

## Release Strategy

- Implement on one feature branch from the merged QR-only `main`.
- Use TDD and small commits by data foundation, library, case experience,
  guidance/accessibility, and release QA.
- Push one branch and open one non-draft PR.
- Do not merge without explicit user authorization.
