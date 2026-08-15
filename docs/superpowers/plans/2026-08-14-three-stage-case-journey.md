# Three-Stage Living Case Journey Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace every single-page six-act living case with a statically generated three-page journey that is easier to understand, easier to navigate on mobile, and fully preserves the approved case content and historical evidence.

**Architecture:** Keep `ThoughtCase` and Trace data unchanged. Add a pure three-stage route registry, render a shared Server Component shell with three route links, and split the existing composition into focused present, evidence, and return stage components. Fixed nested routes provide `/dau-vet` and `/tro-lai`; all optional interactions remain progressive enhancements.

**Tech Stack:** Next.js 16 App Router, React 19 Server Components, TypeScript 5, existing CSS architecture, Node test runner through `tsx`, Python Playwright production acceptance.

## Global Constraints

- Use exactly three stages: `hien-tai`, `dau-vet`, and `tro-lai`.
- Keep exactly 30 authored cases and all existing `ThoughtCase` fields.
- Keep all historical summaries, dates, images, sources, provenance, and verification resolved from existing Trace data.
- Keep perspective selection optional and local to Stage 1; do not persist it.
- Keep Source Drawer behavior unchanged on Stage 2.
- Do not add dependencies, animation systems, scoring, completion locks, accounts, or a second reading mode.
- Preserve Homepage, library, Trace routes, QR sharing, Trace progress, Trace recap, and Journey Closing.
- Keep one `h1` per stage page, 44px mobile targets, visible focus, forced colors, reduced motion, and no-JavaScript readability.
- Generate 30 base stage routes, 30 `/dau-vet` routes, and 30 `/tro-lai` routes.
- Update the existing `feat/living-thought-cases` branch and PR #12; do not merge.

---

## File Structure

- Modify `lib/thought-case-journey.ts`: three-stage definitions, hrefs, and previous/next navigation.
- Modify `tests/thought-case-journey.test.ts`: exact stage and navigation contracts.
- Create `components/cases/case-stage-progress.tsx`: server-rendered three-step route navigation.
- Create `components/cases/case-stage-navigation.tsx`: previous/next route actions.
- Create `components/cases/case-journey-shell.tsx`: shared case header, theme, progress, main landmark, and stage navigation.
- Create `components/cases/case-present-stage.tsx`: present situation and optional assumption choice.
- Create `components/cases/case-evidence-stage.tsx`: Trace framing and all three evidence reveals.
- Create `components/cases/case-return-stage.tsx`: thought formation, completion cue, practical lenses, and related cases.
- Create `lib/thought-case-metadata.ts`: stage-specific canonical and social metadata.
- Modify `components/cases/experience-guide.tsx`: replace hidden disclosure with concise visible guidance.
- Modify `components/cases/case-return.tsx`: add completion label and route-safe evidence/library actions.
- Modify `app/ho-so/[slug]/page.tsx`: Stage 1 route.
- Create `app/ho-so/[slug]/dau-vet/page.tsx`: Stage 2 route.
- Create `app/ho-so/[slug]/tro-lai/page.tsx`: Stage 3 route.
- Delete `components/cases/case-file-page.tsx`: superseded single-page composition.
- Delete `components/cases/case-progress.tsx`: superseded scroll observer.
- Modify `app/sitemap.ts`: include all 90 stage URLs.
- Modify `components/cases/case-library-filters.tsx`: remove mobile horizontal filter rail.
- Modify `app/globals.css`: stage shell, three-step progress, navigation, density, mobile grid filters, forced colors, and reduced motion.
- Modify `data/traces.ts`: replace mixed-language verification copy without changing meaning.
- Modify `tests/living-thought-pages.test.ts`: stage rendering and route source contracts.
- Modify `tests/public-release.test.ts`: 90 case-stage sitemap URLs.
- Modify `tests/accessibility-regression.test.ts`: paged progress, mobile filters, and stage layout guardrails.
- Modify `tests/case_acceptance.py`: all 90 routes, transitions, interaction, responsive, accessibility, and no-JavaScript coverage.
- Modify `docs/release-readiness.md`: final evidence and Lighthouse medians.

---

### Task 1: Three-Stage Journey Registry

**Files:**
- Modify: `lib/thought-case-journey.ts`
- Modify: `tests/thought-case-journey.test.ts`

**Interfaces:**
- Consumes: case slug strings.
- Produces: `CASE_JOURNEY_STAGES`, `CaseJourneyStage`, `getCaseJourneyStages()`, `getCaseStageHref()`, and `getCaseStageNavigation()`.

- [ ] **Step 1: Replace the six-anchor expectation with a failing three-route contract**

Use this expected shape in `tests/thought-case-journey.test.ts`:

```ts
const slug = "nhom-gioi-nhung-khong-hop-tac";

assert.deepEqual(getCaseJourneyStages(slug), [
  {
    id: "hien-tai",
    href: `/ho-so/${slug}`,
    label: "Hiện tại",
    ariaLabel: "Bước 1: Hiện tại",
  },
  {
    id: "dau-vet",
    href: `/ho-so/${slug}/dau-vet`,
    label: "Dấu vết",
    ariaLabel: "Bước 2: Dấu vết lịch sử",
  },
  {
    id: "tro-lai",
    href: `/ho-so/${slug}/tro-lai`,
    label: "Trở lại",
    ariaLabel: "Bước 3: Trở lại hiện tại",
  },
]);
```

Also assert exact previous/next navigation:

```ts
assert.deepEqual(getCaseStageNavigation(slug, "hien-tai"), {
  previous: { href: "/ho-so", label: "Chọn hồ sơ khác" },
  next: { href: `/ho-so/${slug}/dau-vet`, label: "Mở ba dấu vết" },
});

assert.deepEqual(getCaseStageNavigation(slug, "dau-vet"), {
  previous: { href: `/ho-so/${slug}`, label: "Quay lại vấn đề" },
  next: { href: `/ho-so/${slug}/tro-lai`, label: "Kết nối và trở lại" },
});

assert.deepEqual(getCaseStageNavigation(slug, "tro-lai"), {
  previous: { href: `/ho-so/${slug}/dau-vet`, label: "Xem lại dấu vết" },
  next: { href: "/ho-so", label: "Chọn hồ sơ tiếp theo" },
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```powershell
npx tsx --test tests/thought-case-journey.test.ts
```

Expected: FAIL because the current helper returns six hash milestones and the new exports do not exist.

- [ ] **Step 3: Implement the minimal pure registry**

Replace `lib/thought-case-journey.ts` with typed constants and pure helpers:

```ts
export const CASE_JOURNEY_STAGES = [
  "hien-tai",
  "dau-vet",
  "tro-lai",
] as const;

export type CaseJourneyStage = (typeof CASE_JOURNEY_STAGES)[number];

export interface CaseJourneyStageItem {
  readonly id: CaseJourneyStage;
  readonly href: string;
  readonly label: string;
  readonly ariaLabel: string;
}

export interface CaseStageAction {
  readonly href: string;
  readonly label: string;
}

export function getCaseStageHref(
  slug: string,
  stage: CaseJourneyStage,
): string {
  const base = `/ho-so/${slug}`;
  if (stage === "hien-tai") return base;
  return `${base}/${stage}`;
}
```

Build `getCaseJourneyStages()` and `getCaseStageNavigation()` from the exact copy asserted above. Do not read browser state or use client hooks.

- [ ] **Step 4: Run focused and full unit tests**

Run:

```powershell
npx tsx --test tests/thought-case-journey.test.ts
npm test
```

Expected: journey tests PASS; full suite may still fail only where old six-act page contracts require later tasks.

- [ ] **Step 5: Commit the route contract**

```powershell
git add -- lib/thought-case-journey.ts tests/thought-case-journey.test.ts
git commit -m "refactor: define three stage case journey"
```

---

### Task 2: Shared Server-Rendered Journey Shell

**Files:**
- Create: `components/cases/case-stage-progress.tsx`
- Create: `components/cases/case-stage-navigation.tsx`
- Create: `components/cases/case-journey-shell.tsx`
- Modify: `tests/living-thought-pages.test.ts`

**Interfaces:**
- Consumes: `ThoughtCase`, `CaseJourneyStage`, stage helpers, `traceThemes`, and `ReactNode`.
- Produces: a shared header, three-link progress landmark, one main landmark, and previous/next actions.

- [ ] **Step 1: Add failing shell markup tests**

Render the shell around a test `h1` and assert:

```ts
const html = renderToStaticMarkup(
  createElement(CaseJourneyShell, {
    item,
    stage: "dau-vet",
    children: createElement("h1", null, "Dấu vết"),
  }),
);

assert.equal((html.match(/case-stage-progress__link/g) ?? []).length, 3);
assert.match(html, /aria-current="step"/);
assert.match(html, new RegExp(`/ho-so/${item.slug}/dau-vet`));
assert.match(html, /Quay lại vấn đề/);
assert.match(html, /Kết nối và trở lại/);
assert.doesNotMatch(html, /requestAnimationFrame|addEventListener/);
```

- [ ] **Step 2: Run the focused test and verify RED**

```powershell
npx tsx --test tests/living-thought-pages.test.ts
```

Expected: FAIL because the three shared components do not exist.

- [ ] **Step 3: Implement the progress and navigation Server Components**

`CaseStageProgress` maps `getCaseJourneyStages(slug)` to `Link` elements and sets:

```tsx
aria-current={item.id === currentStage ? "step" : undefined}
```

`CaseStageNavigation` maps `getCaseStageNavigation(slug, currentStage)` to two route links. Use visible arrows only as `aria-hidden` decoration.

- [ ] **Step 4: Implement `CaseJourneyShell`**

Use this public contract:

```tsx
interface CaseJourneyShellProps {
  readonly children: ReactNode;
  readonly item: ThoughtCase;
  readonly stage: CaseJourneyStage;
}
```

Render the approved case header, theme class, `CaseStageProgress`, `<main id="main-content">`, children, and `CaseStageNavigation`. Resolve the theme from `getTraceBySlug(item.primaryTrace)` and fail loudly only if the Trace is missing.

- [ ] **Step 5: Run the focused test and verify GREEN**

```powershell
npx tsx --test tests/living-thought-pages.test.ts
```

Expected: shared shell tests PASS.

- [ ] **Step 6: Commit the shell**

```powershell
git add -- components/cases/case-stage-progress.tsx components/cases/case-stage-navigation.tsx components/cases/case-journey-shell.tsx tests/living-thought-pages.test.ts
git commit -m "feat: add three stage case shell"
```

---

### Task 3: Stage 1 - Present Situation And Optional Perspective

**Files:**
- Create: `components/cases/case-present-stage.tsx`
- Create: `lib/thought-case-metadata.ts`
- Modify: `components/cases/experience-guide.tsx`
- Modify: `app/ho-so/[slug]/page.tsx`
- Modify: `tests/living-thought-pages.test.ts`

**Interfaces:**
- Consumes: `ThoughtCase`, `getCaseFileNumber()`, `PerspectivePrompt`, and `CaseJourneyShell`.
- Produces: `/ho-so/[slug]` Stage 1 with one h1, visible guidance, optional perspective, metadata, and next route.

- [ ] **Step 1: Add a failing Stage 1 rendering test**

Assert that the rendered base route composition includes:

```ts
assert.equal((html.match(/<h1/g) ?? []).length, 1);
assert.match(html, /HỒI 1 \/ VẤN ĐỀ HIỆN TẠI/);
assert.match(html, /HỒI 2 \/ GIẢ ĐỊNH BAN ĐẦU/);
assert.match(html, /Bạn không cần chọn đáp án để tiếp tục/);
assert.match(html, new RegExp(`/ho-so/${item.slug}/dau-vet`));
assert.doesNotMatch(html, /case-evidence__reveal/);
assert.doesNotMatch(html, /HỒI 5 \/ KẾT NỐI TƯ TƯỞNG/);
```

- [ ] **Step 2: Run the focused test and verify RED**

```powershell
npx tsx --test tests/living-thought-pages.test.ts
```

Expected: FAIL because Stage 1 is still the complete single-page experience.

- [ ] **Step 3: Make guidance visible without an interaction**

Replace the `details` element in `ExperienceGuide` with:

```tsx
<aside aria-label="Cách trải nghiệm" className="experience-guide">
  <strong>Cách trải nghiệm</strong>
  <p>
    Đọc tình huống, mở ba dấu vết, rồi trở lại hiện tại.
    Bạn không cần chọn đáp án để tiếp tục.
  </p>
</aside>
```

- [ ] **Step 4: Implement `CasePresentStage`**

Move only the current `case-present` and `case-assumption` sections into the new component. Change the scroll cue to a `Link` whose href is `getCaseStageHref(item.slug, "dau-vet")` and label is `Mở ba dấu vết`.

Keep `PerspectivePrompt` unchanged except for CSS prominence in Task 7.

- [ ] **Step 5: Extract shared metadata generation**

Create:

```ts
export function getThoughtCaseMetadata(
  item: ThoughtCase,
  stage: CaseJourneyStage,
): Metadata;
```

Use the base case title for `hien-tai`, append `- Dấu vết lịch sử` for `dau-vet`, and append `- Trở lại hiện tại` for `tro-lai`. Use `getCaseStageHref()` for canonical URLs and reuse the primary Trace present-day image for Open Graph and Twitter.

- [ ] **Step 6: Replace the base route composition**

Keep `generateStaticParams()`, slug lookup, and `notFound()`. Render:

```tsx
<CaseJourneyShell item={item} stage="hien-tai">
  <CasePresentStage item={item} />
</CaseJourneyShell>
```

- [ ] **Step 7: Run focused tests and verify GREEN**

```powershell
npx tsx --test tests/living-thought-pages.test.ts
npm run typecheck
```

Expected: Stage 1 tests and typecheck PASS.

- [ ] **Step 8: Commit Stage 1**

```powershell
git add -- components/cases/case-present-stage.tsx components/cases/experience-guide.tsx lib/thought-case-metadata.ts app/ho-so/[slug]/page.tsx tests/living-thought-pages.test.ts
git commit -m "feat: split present case stage"
```

---

### Task 4: Stage 2 - Source-Backed Historical Evidence

**Files:**
- Create: `components/cases/case-evidence-stage.tsx`
- Create: `app/ho-so/[slug]/dau-vet/page.tsx`
- Modify: `tests/living-thought-pages.test.ts`

**Interfaces:**
- Consumes: `ThoughtCase`, `getCaseEvidence()`, `CaseEvidence`, `CaseJourneyShell`, and metadata helper.
- Produces: 30 static evidence routes with one h1, three reveals, Source Drawer triggers, and no-JavaScript source fallbacks.

- [ ] **Step 1: Add failing Stage 2 tests**

Render `CaseEvidenceStage` and assert:

```ts
assert.equal((html.match(/<h1/g) ?? []).length, 1);
assert.equal((html.match(/case-evidence__reveal/g) ?? []).length, 3);
assert.equal((html.match(/Nguồn &amp; kiểm chứng/g) ?? []).length, 3);
assert.equal((html.match(/case-evidence__no-script-sources/g) ?? []).length, 3);
assert.match(html, /HỒI 3 \/ MỞ HỒ SƠ/);
assert.match(html, /HỒI 4 \/ BA DẤU VẾT LỊCH SỬ/);
assert.doesNotMatch(html, /perspective-prompt/);
assert.doesNotMatch(html, /case-return__next/);
```

Also assert that `app/ho-so/[slug]/dau-vet/page.tsx` contains `generateStaticParams`, `getThoughtCaseMetadata`, `notFound`, and `stage="dau-vet"`.

- [ ] **Step 2: Run the focused test and verify RED**

```powershell
npx tsx --test tests/living-thought-pages.test.ts
```

Expected: FAIL because Stage 2 files do not exist.

- [ ] **Step 3: Implement `CaseEvidenceStage`**

Resolve all three reveals exactly as the old `CaseFilePage` did. Render a compact Stage 2 intro with one h1, the primary Trace central question, and then the existing `CaseEvidence` components in authored order.

Do not add click-to-reveal state. Keep all three articles in server markup.

- [ ] **Step 4: Implement the fixed evidence route**

Use the same 30 slug static params as the base page. Generate Stage 2 metadata and render:

```tsx
<CaseJourneyShell item={item} stage="dau-vet">
  <CaseEvidenceStage item={item} />
</CaseJourneyShell>
```

- [ ] **Step 5: Run focused tests and verify GREEN**

```powershell
npx tsx --test tests/living-thought-pages.test.ts
npm run typecheck
```

Expected: Stage 2 and metadata contracts PASS.

- [ ] **Step 6: Commit Stage 2**

```powershell
git add -- components/cases/case-evidence-stage.tsx app/ho-so/[slug]/dau-vet/page.tsx tests/living-thought-pages.test.ts
git commit -m "feat: add historical evidence case stage"
```

---

### Task 5: Stage 3 - Connection, Completion, And Continuation

**Files:**
- Create: `components/cases/case-return-stage.tsx`
- Create: `app/ho-so/[slug]/tro-lai/page.tsx`
- Modify: `components/cases/case-return.tsx`
- Modify: `tests/living-thought-pages.test.ts`

**Interfaces:**
- Consumes: `ThoughtCase`, primary Trace thought formation, related-case resolution, and `CaseReturn`.
- Produces: 30 static return routes with one h1, completion cue, three practical lenses, related cases, and route-safe evidence actions.

- [ ] **Step 1: Add failing Stage 3 tests**

Assert:

```ts
assert.equal((html.match(/<h1/g) ?? []).length, 1);
assert.match(html, /HỒI 5 \/ KẾT NỐI TƯ TƯỞNG/);
assert.match(html, /ĐIỀU MANG THEO/);
assert.match(html, /HỒI 6 \/ TRỞ LẠI HIỆN TẠI/);
assert.equal((html.match(/case-return__lenses/g) ?? []).length, 1);
assert.equal((html.match(/case-return__next/g) ?? []).length, 1);
assert.match(html, new RegExp(`/ho-so/${item.slug}/dau-vet`));
assert.doesNotMatch(html, /href="#case-evidence"/);
```

- [ ] **Step 2: Run the focused test and verify RED**

```powershell
npx tsx --test tests/living-thought-pages.test.ts
```

Expected: FAIL because Stage 3 does not exist and the current evidence action is a hash link.

- [ ] **Step 3: Update `CaseReturn` for paged navigation**

Add `evidenceHref: string` to its props. Render `ĐIỀU MANG THEO` above the existing return heading, preserve all authored return copy, and use `evidenceHref` for `Xem lại nguồn tư liệu`.

Keep the two related cases and full Trace action unchanged.

- [ ] **Step 4: Implement `CaseReturnStage`**

Resolve the primary Trace and related cases. Move the old connection section into the component, make its heading the page `h1`, and render `CaseReturn` after it.

- [ ] **Step 5: Implement the fixed return route**

Use the same static slug params, Stage 3 metadata, and shell:

```tsx
<CaseJourneyShell item={item} stage="tro-lai">
  <CaseReturnStage item={item} />
</CaseJourneyShell>
```

- [ ] **Step 6: Run focused tests and verify GREEN**

```powershell
npx tsx --test tests/living-thought-pages.test.ts
npm run typecheck
```

Expected: Stage 3 tests PASS with exactly one h1.

- [ ] **Step 7: Commit Stage 3**

```powershell
git add -- components/cases/case-return-stage.tsx components/cases/case-return.tsx app/ho-so/[slug]/tro-lai/page.tsx tests/living-thought-pages.test.ts
git commit -m "feat: add return to present case stage"
```

---

### Task 6: Remove Legacy Composition And Publish Every Route

**Files:**
- Delete: `components/cases/case-file-page.tsx`
- Delete: `components/cases/case-progress.tsx`
- Modify: `app/sitemap.ts`
- Modify: `tests/public-release.test.ts`
- Modify: `tests/living-thought-pages.test.ts`
- Modify: `data/traces.ts`

**Interfaces:**
- Consumes: `thoughtCases` and `getCaseStageHref()`.
- Produces: 90 sitemap case URLs and no remaining six-anchor scroll implementation.

- [ ] **Step 1: Add failing removal and sitemap tests**

Assert that the old files no longer exist, route sources do not import them, and sitemap includes:

```ts
const caseRoutes = thoughtCases.flatMap((item) => [
  `https://hcm-trace.vercel.app/ho-so/${item.slug}`,
  `https://hcm-trace.vercel.app/ho-so/${item.slug}/dau-vet`,
  `https://hcm-trace.vercel.app/ho-so/${item.slug}/tro-lai`,
]);

assert.equal(caseRoutes.length, 90);
assert.equal(urls.length, 96);
```

Also assert production source does not contain `summary là diễn giải` and does contain `phần tóm lược là diễn giải`.

- [ ] **Step 2: Run focused tests and verify RED**

```powershell
npx tsx --test tests/living-thought-pages.test.ts tests/public-release.test.ts
```

Expected: FAIL because the legacy files still exist and sitemap has 36 URLs.

- [ ] **Step 3: Delete the legacy components and imports**

Remove `CaseFilePage` and client `CaseProgress` only after all three routes compile against the new components. Do not remove `CaseEvidence`, `PerspectivePrompt`, `ExperienceGuide`, or `CaseReturn`.

- [ ] **Step 4: Expand sitemap routes**

Use `flatMap()` over `thoughtCases` and the pure stage href helper so each case contributes three URLs in stage order.

- [ ] **Step 5: Polish the mixed-language verification copy**

Replace only the phrase:

```text
summary là diễn giải
```

with:

```text
phần tóm lược là diễn giải
```

Do not rewrite adjacent verification content.

- [ ] **Step 6: Run focused tests and verify GREEN**

```powershell
npx tsx --test tests/living-thought-pages.test.ts tests/public-release.test.ts
npm run typecheck
```

Expected: route, sitemap, copy, and type contracts PASS.

- [ ] **Step 7: Commit route publication and cleanup**

```powershell
git add -- app/sitemap.ts data/traces.ts tests/public-release.test.ts tests/living-thought-pages.test.ts
git add -u -- components/cases/case-file-page.tsx components/cases/case-progress.tsx
git commit -m "refactor: publish paged case routes"
```

---

### Task 7: Responsive Usability And Accessibility Polish

**Files:**
- Modify: `app/globals.css`
- Modify: `components/cases/case-library-filters.tsx`
- Modify: `tests/accessibility-regression.test.ts`
- Modify: `tests/living-thought-pages.test.ts`

**Interfaces:**
- Consumes: new stage class names and existing design tokens.
- Produces: three-column progress at all breakpoints, visible guidance, compact stage intros, mobile grid filters, and forced-color coverage.

- [ ] **Step 1: Add failing CSS guardrail tests**

Require source patterns equivalent to:

```ts
assert.match(css, /\.case-stage-progress ol[\s\S]*?grid-template-columns:\s*repeat\(3/);
assert.doesNotMatch(css, /\.case-stage-progress ol[\s\S]*?min-width:\s*40rem/);
assert.match(css, /@media \(max-width: 48rem\)[\s\S]*?\.case-library__categories[\s\S]*?grid-template-columns:\s*repeat\(2/);
assert.match(css, /\.case-stage-navigation a[\s\S]*?min-height:\s*2\.75rem/);
assert.match(css, /@media \(forced-colors: active\)[\s\S]*?\.case-stage-progress/);
```

Require the filter component to expose the category controls without a horizontal-scroll instruction or carousel behavior.

- [ ] **Step 2: Run focused tests and verify RED**

```powershell
npx tsx --test tests/accessibility-regression.test.ts tests/living-thought-pages.test.ts
```

Expected: FAIL because old progress and mobile rail rules remain.

- [ ] **Step 3: Add stage shell and navigation styles**

Implement:

- `.case-stage-progress` as a sticky three-column grid;
- equal-width links with active bottom border and visible focus;
- `.case-stage-navigation` as two clear route actions with 44px mobile height;
- `.case-stage-position` copy such as `BƯỚC 1 / 3`;
- no client-scroll or horizontal overflow rules.

- [ ] **Step 4: Reduce dead vertical space without redesigning**

Use paged modifiers to reduce intro padding and heading caps:

```css
.case-experience--paged .case-evidence__heading h1,
.case-experience--paged .case-connection h1 {
  font-size: clamp(2.9rem, 5.4vw, 5.8rem);
}
```

At 1366x768, the first substantive content after each stage heading must peek within the viewport. Preserve existing typography, line, and color language.

- [ ] **Step 5: Make optional guidance readable**

Style `ExperienceGuide` as a visible aside, raise helper/status text to readable contrast, and keep `PerspectivePrompt` buttons unchanged in behavior.

- [ ] **Step 6: Replace the mobile library rail with a grid**

At `max-width: 48rem`, make the category group a two-column grid. `Tất cả` may span two columns; every category button remains at least 44px high. Remove horizontal overflow and native scrollbar styling for this control.

- [ ] **Step 7: Update forced colors and reduced motion**

Add the new progress, navigation, guide, and filter selectors to existing media blocks. Keep motion duration suppression and remove references to deleted `.case-progress` selectors.

- [ ] **Step 8: Run focused, full unit, type, and lint gates**

```powershell
npx tsx --test tests/accessibility-regression.test.ts tests/living-thought-pages.test.ts
npm test
npm run typecheck
npm run lint
```

Expected: all commands PASS.

- [ ] **Step 9: Commit UX polish**

```powershell
git add -- app/globals.css components/cases/case-library-filters.tsx tests/accessibility-regression.test.ts tests/living-thought-pages.test.ts
git commit -m "style: simplify paged case navigation"
```

---

### Task 8: Production Acceptance For 90 Stage Routes

**Files:**
- Modify: `tests/case_acceptance.py`

**Interfaces:**
- Consumes: production server URL and case slugs.
- Produces: release evidence for all routes, transitions, interactions, and accessibility modes.

- [ ] **Step 1: Rewrite acceptance expectations before implementation verification**

Define:

```python
STAGES = [
    ("hien-tai", ""),
    ("dau-vet", "/dau-vet"),
    ("tro-lai", "/tro-lai"),
]
```

For every stage, assert one h1, three `.case-stage-progress a` links, one `aria-current="step"`, no horizontal overflow, and no console errors.

Stage-specific assertions:

```python
# Stage 1
assert page.locator(".perspective-prompt").count() in (0, 1)
assert page.locator(".case-evidence__reveal").count() == 0

# Stage 2
assert page.locator(".case-evidence__reveal").count() == 3
assert page.locator(".source-drawer-trigger").count() == 3

# Stage 3
assert page.locator(".case-return__lenses li").count() == 3
assert page.locator(".case-return__next a").count() == 2
```

- [ ] **Step 2: Add the end-to-end route transition flow**

For one representative case:

```text
Homepage -> /ho-so -> Stage 1 -> Stage 2 -> Stage 3 -> related Stage 1
```

Assert visible action names and exact URLs. Verify previous links and browser Back.

- [ ] **Step 3: Cover all 90 static routes**

Loop over all 30 slugs and all three suffixes at 1366x768. For mobile, sample one case per category and all three stages at 390x844.

- [ ] **Step 4: Preserve interaction and accessibility mode checks**

- Stage 1: optional perspective `aria-pressed`, feedback, and clear action.
- Stage 2: Source Drawer open/close and focus restoration.
- Stage 3: related routes and Trace link.
- Forced colors: current progress step and navigation actions remain visible.
- Reduced motion: all three stage routes render without overflow.
- No JavaScript: Stage 1 next link, Stage 2 source fallbacks, and Stage 3 related links remain usable.
- Keyboard: skip link is first focus target on Stage 1.

- [ ] **Step 5: Build and start the production server**

Stop the current port 3700 server, then run:

```powershell
npm run build
npx next start -p 3700
```

Expected: build statically generates all case stages and server becomes ready.

- [ ] **Step 6: Run production acceptance**

```powershell
$env:HCM_BASE_URL='http://127.0.0.1:3700'; python tests/homepage_acceptance.py
$env:HCM_BASE_URL='http://127.0.0.1:3700'; python tests/trace_acceptance.py
$env:HCM_BASE_URL='http://127.0.0.1:3700'; python tests/case_acceptance.py
```

Expected: Homepage, all three Trace routes, all 90 case-stage routes, transitions, mobile samples, reduced motion, forced colors, and no-JavaScript PASS.

- [ ] **Step 7: Commit acceptance coverage**

```powershell
git add -- tests/case_acceptance.py
git commit -m "test: verify three stage case journeys"
```

---

### Task 9: Final Performance, Release Evidence, And PR Update

**Files:**
- Modify: `docs/release-readiness.md`

**Interfaces:**
- Consumes: final production build, acceptance results, and Lighthouse reports.
- Produces: exact release evidence on PR #12.

- [ ] **Step 1: Run the complete final verification gate**

Stop the Task 8 production server before rebuilding. After `npm run build`,
restart `npx next start -p 3700` before the three acceptance scripts.

```powershell
npm test
npm run typecheck
npm run lint
npm run build
$env:HCM_BASE_URL='http://127.0.0.1:3700'; python tests/homepage_acceptance.py
$env:HCM_BASE_URL='http://127.0.0.1:3700'; python tests/trace_acceptance.py
$env:HCM_BASE_URL='http://127.0.0.1:3700'; python tests/case_acceptance.py
```

Expected: every command exits 0 with no hydration, console, route, image, focus, Source Drawer, QR, Trace, or overflow regression.

- [ ] **Step 2: Record three-run Lighthouse medians**

Run Lighthouse 12.8.2 three times each against:

```text
/
/ho-so
/ho-so/nhom-gioi-nhung-khong-hop-tac
/ho-so/nhom-gioi-nhung-khong-hop-tac/dau-vet
/ho-so/nhom-gioi-nhung-khong-hop-tac/tro-lai
```

Do not lower existing baselines. Investigate any material Homepage or library regression before continuing.

- [ ] **Step 3: Update release readiness**

Record:

- the three-stage route model and 90 generated case URLs;
- production acceptance scope;
- no-JavaScript, forced-colors, reduced-motion, and mobile evidence;
- final Lighthouse run values and medians;
- remaining manual NVDA/TalkBack limitation.

- [ ] **Step 4: Commit release evidence**

```powershell
git add -- docs/release-readiness.md
git commit -m "docs: record paged case release evidence"
```

- [ ] **Step 5: Inspect and push the exact branch**

```powershell
git status --short --branch
git diff --check origin/main...HEAD
git push origin feat/living-thought-cases
```

Expected: clean branch, no whitespace errors, push succeeds.

- [ ] **Step 6: Update and verify PR #12**

Update the PR body to describe the three-stage journey, 90 routes, optional interaction, responsive simplification, test results, and Lighthouse medians. Verify:

```powershell
gh pr view 12 --json url,state,isDraft,mergeStateStatus,statusCheckRollup
gh pr checks 12 --watch --interval 10
```

Expected: PR #12 remains open and non-draft; required checks PASS. Stop without merging.

---

## Self-Review Record

- Spec coverage: route architecture, three stages, guidance, optional interaction, historical evidence, completion, metadata, sitemap, responsive behavior, accessibility, no-JavaScript, acceptance, performance, and PR publication map to Tasks 1-9.
- Completeness scan: every task contains exact files, interfaces, commands, expected failures, and expected passing evidence.
- Type consistency: `CaseJourneyStage`, `getCaseStageHref()`, `getCaseJourneyStages()`, and `getCaseStageNavigation()` use the same three IDs across helpers, components, routes, tests, sitemap, and acceptance.
- Architecture guard: `ThoughtCase`, Trace data, `CaseEvidence`, Source Drawer, QR, Homepage, and Trace components are reused rather than rewritten.
- Scope guard: the only library change is removal of the mobile horizontal category rail; no library redesign is included.
