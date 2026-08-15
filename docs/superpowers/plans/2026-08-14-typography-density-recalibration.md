# Typography And Density Recalibration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebalance shared display-heading sizes and intro spacing so the case library and all three case stages reveal meaningful content earlier without redesigning the approved experience.

**Architecture:** Keep all React components and data unchanged. Add source-level CSS regression assertions, then update only existing selectors in `app/globals.css`; verify the resulting shared templates in the production browser at desktop and mobile sizes.

**Tech Stack:** Next.js 16, React 19, TypeScript 5, CSS, Node test runner, Python Playwright production acceptance.

## Global Constraints

- Preserve routes, components, copy, images, fonts, interactions, Trace behavior, and data.
- Do not add dependencies or new visual elements.
- Keep one oversized climax only in the Stage 3 convergence conclusion.
- Preserve mobile target size, focus, reduced motion, forced colors, and no-JavaScript behavior.

---

### Task 1: Lock The Approved Typography Scale

**Files:**
- Modify: `tests/typography-regression.test.ts`

**Interfaces:**
- Consumes: existing `getRuleBlocks()` and `getDeclaration()` helpers.
- Produces: regression assertions for exact desktop and mobile clamp values.

- [ ] **Step 1: Add failing desktop type-scale assertions**

Assert the first rule block values:

```ts
assert.equal(getDeclaration(getRuleBlocks(".case-present__copy h1")[0], "font-size"), "clamp(3.75rem, 6.4vw, 6.75rem)");
assert.equal(getDeclaration(getRuleBlocks(".case-library-page__intro h1")[0], "font-size"), "clamp(3.4rem, 5.5vw, 5rem)");
assert.equal(getDeclaration(getRuleBlocks(".scenario-picker-section__heading h2")[0], "font-size"), "clamp(2.6rem, 4.6vw, 4.25rem)");
assert.equal(getDeclaration(getRuleBlocks(".case-return__intro h2")[0], "font-size"), "clamp(3.1rem, 5.2vw, 5.75rem)");
```

- [ ] **Step 2: Add failing paged and mobile assertions**

Assert exact values for `.case-experience--paged .case-file__sheet h1`,
`.case-experience--paged .case-connection h1`, and the second blocks of the
library, Stage 1, Stage 2 evidence, Stage 3 return, and scenario selectors.

- [ ] **Step 3: Run the focused test and verify RED**

```powershell
npx tsx --test tests/typography-regression.test.ts
```

Expected: FAIL because the current stylesheet still permits 96–109px headings.

---

### Task 2: Rebalance Desktop And Mobile CSS

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: existing case and Homepage class names.
- Produces: the approved responsive type scale and earlier first-view content.

- [ ] **Step 1: Reduce desktop heading clamps**

Use these exact values:

```css
.scenario-picker-section__heading h2 { font-size: clamp(2.6rem, 4.6vw, 4.25rem); }
.case-present__copy h1 { font-size: clamp(3.75rem, 6.4vw, 6.75rem); }
.case-assumption h2 { font-size: clamp(2.8rem, 4.8vw, 5rem); }
.case-evidence__heading h2 { font-size: clamp(3rem, 5vw, 5.5rem); }
.case-evidence__record h3 { font-size: clamp(2.3rem, 3.6vw, 4rem); }
.case-return__intro h2 { font-size: clamp(3.1rem, 5.2vw, 5.75rem); }
.case-library-page__intro h1 { font-size: clamp(3.4rem, 5.5vw, 5rem); }
```

Split the paged selectors:

```css
.case-experience--paged .case-file__sheet h1 {
  margin-top: clamp(2rem, 2.5vw, 2.5rem);
  font-size: clamp(2.9rem, 4.8vw, 5rem);
}

.case-experience--paged .case-connection h1 {
  font-size: clamp(2.9rem, 4.8vw, 5rem);
}
```

- [ ] **Step 2: Reduce vertical density**

Update the existing intro, sheet, evidence, connection, and return padding and
margin declarations from the approved design values. Do not alter layout grids.

- [ ] **Step 3: Add equal-specificity mobile overrides**

Use `@media (max-width: 48rem)` rules that include the paged modifier so mobile
sizes override the base paged rule reliably:

```css
.case-experience--paged .case-file__sheet h1 {
  font-size: clamp(2.65rem, 11vw, 3.25rem);
}

.case-experience--paged .case-connection h1 {
  font-size: clamp(2.75rem, 11.5vw, 3.5rem);
}
```

- [ ] **Step 4: Run the focused test and verify GREEN**

```powershell
npx tsx --test tests/typography-regression.test.ts tests/accessibility-regression.test.ts
```

Expected: PASS.

---

### Task 3: Visual And Release Verification

**Files:**
- Modify only if a verified regression requires correction: `app/globals.css`

**Interfaces:**
- Consumes: production build and representative shared routes.
- Produces: release evidence for type hierarchy, fold visibility, and regressions.

- [ ] **Step 1: Run the full technical gate**

```powershell
npm test
npm run typecheck
npm run lint
npm run build
```

- [ ] **Step 2: Verify production acceptance**

Run Homepage, Trace, and case acceptance against the production server. Confirm
no overflow, hydration, console, navigation, focus, no-JavaScript, reduced
motion, forced-color, or Source Drawer regressions.

- [ ] **Step 3: Compare representative screenshots**

Capture `/`, `/ho-so`, Stage 1, Stage 2, Stage 3, and Trace 01 at 1366x768 and
390x844. Confirm Stage 1 and Stage 2 actions are visible in the initial viewport,
the library reveals its content earlier, and Stage 3 remains the visual climax.

- [ ] **Step 4: Commit and publish**

```powershell
git add -- docs/superpowers/specs/2026-08-14-typography-density-recalibration-design.md docs/superpowers/plans/2026-08-14-typography-density-recalibration.md tests/typography-regression.test.ts app/globals.css
git commit -m "style: rebalance case typography density"
git push origin feat/living-thought-cases
```

Update PR #12 with the new typography evidence and stop without merging.
