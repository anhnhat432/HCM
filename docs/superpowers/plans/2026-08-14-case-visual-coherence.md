# Case Visual Coherence Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the three-stage case journey into one coherent editorial system with a stable content grid, restrained typography, fewer redundant signals, and one Stage 3 climax.

**Architecture:** Preserve every React component, route, data interface, and interaction. Add source-level CSS regression assertions first, then update only existing selectors in `app/globals.css`; validate the shared templates through the existing production acceptance suite and browser screenshots.

**Tech Stack:** Next.js 16, React 19, TypeScript 5, CSS, Node test runner, Python Playwright production acceptance.

## Global Constraints

- Preserve routes, data, copy, images, component structure, source drawers, optional perspective interaction, and no-JavaScript behavior.
- Preserve the cream, ink, muted-red palette and the existing Be Vietnam Pro and Newsreader fonts.
- Do not redesign Homepage or Trace.
- Do not add dependencies, cards, gradients, shadows, icons, animation, or required interactions.
- Preserve visible focus, reduced motion, forced colors, 44px touch targets, and horizontal-overflow guardrails.

---

### Task 1: Lock The Editorial System With Failing Tests

**Files:**
- Modify: `tests/typography-regression.test.ts`

**Interfaces:**
- Consumes: existing `getRuleBlocks()` and `getDeclaration()` helpers.
- Produces: regression assertions for the shared grid, typography roles, Stage 3 surface, conclusion hierarchy, and primary links.

- [ ] **Step 1: Replace the paged-case scale assertions**

Use these exact desktop and mobile heading values:

```ts
assert.deepEqual(
  getRuleBlocks(".case-present__copy h1").map((block) =>
    getDeclaration(block, "font-size"),
  ),
  ["clamp(3.25rem, 5.1vw, 5.25rem)", "clamp(2.8rem, 12.5vw, 3.5rem)"],
);

assert.deepEqual(
  getRuleBlocks(".case-experience--paged .case-file__sheet h1").map(
    (block) => getDeclaration(block, "font-size"),
  ),
  ["clamp(3rem, 4.6vw, 4.75rem)", "clamp(2.55rem, 10.5vw, 3.1rem)"],
);

assert.deepEqual(
  getRuleBlocks(".case-experience--paged .case-connection h1").map(
    (block) => getDeclaration(block, "font-size"),
  ),
  ["clamp(3rem, 4.6vw, 4.75rem)", "clamp(2.55rem, 10.5vw, 3.1rem)"],
);
```

- [ ] **Step 2: Add coherence assertions**

Assert all of the following:

```ts
const editorialGrid = "minmax(9rem, 0.32fr) minmax(0, 1fr)";

for (const selector of [
  ".case-present__grid",
  ".case-file__grid",
  ".case-evidence__heading",
  ".case-connection__grid",
  ".case-return__grid",
]) {
  assert.equal(
    getDeclaration(getRuleBlocks(selector)[0], "grid-template-columns"),
    editorialGrid,
  );
}

assert.equal(
  getDeclaration(getRuleBlocks(".case-stage-progress__inner")[0], "grid-template-columns"),
  "1fr",
);
assert.equal(
  getDeclaration(getRuleBlocks(".case-stage-position")[0], "display"),
  "none",
);
assert.equal(
  getDeclaration(getRuleBlocks(".case-file__sheet")[0], "border"),
  "0",
);
assert.equal(
  getDeclaration(getRuleBlocks(".case-file__sheet")[0], "background"),
  "transparent",
);
assert.equal(
  getDeclaration(getRuleBlocks(".case-file__sheet::before")[0], "display"),
  "none",
);
```

Assert structural headings use `var(--font-body), sans-serif`, the Stage 3
surface uses `var(--color-canvas)` and `var(--color-ink)`, the formation list is
one column, and the conclusion uses
`clamp(3.5rem, 6.2vw, 6.25rem)` with the body font.

- [ ] **Step 3: Add primary-link assertions**

Assert `.case-scroll-cue` and `.case-file__sheet > a` both use sentence case,
no text decoration, a `1px solid currentColor` bottom border, `0.95rem` type,
and `500` weight.

- [ ] **Step 4: Run the focused test and verify RED**

```powershell
npx tsx --test tests/typography-regression.test.ts
```

Expected: FAIL because the current CSS still uses separate grids, a visible
position label, nested paper sheet, dark Stage 3 surface, serif structural
headings, and the previous poster-scale values.

---

### Task 2: Implement The CSS-Only Coherence Pass

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: all existing case class names and responsive breakpoints.
- Produces: one stable editorial layout without changing rendered content or behavior.

- [ ] **Step 1: Simplify the progress shell**

Set `.case-stage-progress__inner` to `grid-template-columns: 1fr` and
`.case-stage-position` to `display: none`. Keep the three equal stage links,
numbering, active border, focus, and `aria-current` behavior unchanged.

- [ ] **Step 2: Apply the shared desktop grid**

Set the first rule block for these selectors to
`grid-template-columns: minmax(9rem, 0.32fr) minmax(0, 1fr)` and
`gap: clamp(2rem, 6vw, 7rem)`:

```css
.case-present__grid
.case-file__grid
.case-evidence__heading
.case-connection__grid
.case-return__grid
```

Place `.experience-guide` in grid column 2 with a maximum width of `44rem`.
Hide the redundant `.case-present__file-mark span` and
`.case-file__sheet > p:first-child span` labels. Preserve the file number and
related Trace title.

- [ ] **Step 3: Restrain Stage 1 typography**

Use:

```css
.case-present__copy h1 {
  font-size: clamp(3.25rem, 5.1vw, 5.25rem);
}

.case-present blockquote,
.case-assumption h2,
.case-assumption__statement {
  font-family: var(--font-body), sans-serif;
}
```

Set the assumption H2 to `clamp(2.4rem, 4vw, 4rem)`, weight `700`, line-height
`1.05`; keep the perspective interaction unchanged.

- [ ] **Step 4: Remove the nested Stage 2 paper system**

Set `.case-file__sheet` to `max-width: 52rem`, `padding: 0`, `border: 0`, and
`background: transparent`. Set `.case-file__sheet::before` to `display: none`.
Keep the top metadata rule, first record, year, source interactions, and Trace
Line.

Use body-font structural typography:

```css
.case-evidence__heading h2,
.case-evidence__record h3,
.case-evidence__assumption,
.case-evidence__interpretation p {
  font-family: var(--font-body), sans-serif;
}
```

Use `clamp(2.4rem, 4vw, 4rem)` for the evidence H2 and
`clamp(1.9rem, 2.8vw, 3rem)` for record H3 titles.

- [ ] **Step 5: Rebuild Stage 3 as the shared editorial climax**

Use:

```css
.case-connection {
  color: var(--color-ink);
  background: var(--color-canvas);
}

.case-connection ol {
  max-width: 48rem;
  grid-template-columns: 1fr;
  gap: 0;
}

.case-connection__conclusion {
  max-width: 16ch;
  font-family: var(--font-body), sans-serif;
  font-size: clamp(3.5rem, 6.2vw, 6.25rem);
  font-weight: 700;
  color: var(--trace-accent, var(--color-accent));
}
```

Use ink/line/muted tokens for factor borders and copy. Use the body font for
factor headings, return headings, application headings, and related-case
headings. Keep the conclusion separated by at least `4.5rem` from the factors.

- [ ] **Step 6: Standardize stage-entry links**

Give `.case-scroll-cue` and `.case-file__sheet > a` the same primary text-action
treatment: `0.95rem`, weight `500`, no uppercase tracking, no underline, and a
`1px solid currentColor` bottom border. Preserve the boxed previous/next footer
navigation and secondary source links.

- [ ] **Step 7: Add equal-specificity mobile overrides**

Use:

```css
.case-present__copy h1 {
  font-size: clamp(2.8rem, 12.5vw, 3.5rem);
}

.case-experience--paged .case-file__sheet h1,
.case-experience--paged .case-connection h1 {
  font-size: clamp(2.55rem, 10.5vw, 3.1rem);
}

.case-connection__conclusion {
  font-size: clamp(3rem, 12.5vw, 3.7rem);
}
```

Keep all shared grids collapsed to one column. Remove the old sheet margin,
reduce Trace Line content offsets from `1.25rem` to `1rem`, and preserve the
three progress targets without horizontal scrolling.

- [ ] **Step 8: Run focused tests and verify GREEN**

```powershell
npx tsx --test tests/typography-regression.test.ts tests/accessibility-regression.test.ts
```

Expected: PASS.

---

### Task 3: Verify, Review, And Publish

**Files:**
- Modify only if a verified regression requires correction: `app/globals.css`
- Save QA evidence outside the repository under the current audit folder.

**Interfaces:**
- Consumes: the production build and representative shared routes.
- Produces: release evidence for visual coherence, accessibility guardrails, and regressions.

- [ ] **Step 1: Run the full technical gate**

```powershell
npm test
npm run typecheck
npm run lint
npm run build
```

- [ ] **Step 2: Run production acceptance**

Run `tests/case_acceptance.py` against the production server and confirm all 90
stage routes, desktop/mobile samples, route transitions, interactions, reduced
motion, forced colors, and no-JavaScript fallback pass.

- [ ] **Step 3: Compare representative screenshots**

Capture `/ho-so`, Stage 1, Stage 2, and Stage 3 at 1366x768 and 390x844. Confirm:

- the content anchor does not move between stages;
- Stage 2 has no nested card treatment;
- Stage 3 uses the cream editorial surface;
- the conclusion is the only oversized Stage 3 moment;
- no horizontal overflow or unreadable mobile wrapping appears.

- [ ] **Step 4: Review repository changes**

```powershell
git diff --check
git status --short
git diff -- app/globals.css tests/typography-regression.test.ts docs/superpowers/plans/2026-08-14-case-visual-coherence.md
```

- [ ] **Step 5: Commit and publish**

```powershell
git add -- app/globals.css tests/typography-regression.test.ts docs/superpowers/plans/2026-08-14-case-visual-coherence.md
git commit -m "style: unify case journey visual system"
git push origin feat/living-thought-cases
```

Update PR #12 with the verification evidence and stop without merging.
