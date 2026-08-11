# Vietnamese Typography Spacing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Execute inline in this repository; do not dispatch subagents.

**Goal:** Apply the three approved Vietnamese line-height corrections and lock them with source-level and browser regression coverage.

**Architecture:** Keep the existing shared CSS selectors and responsive media query. A focused Node test reads `app/globals.css` to prevent value drift, while the existing Playwright acceptance suite validates the computed browser styles across all Trace routes and breakpoints.

**Tech Stack:** Next.js 16, React 19, TypeScript, Node test runner, Python Playwright, GitHub CLI.

## Global Constraints

- Change only line-height declarations for the three approved typography targets.
- Thought Formation heading: `1.10` on desktop and mobile.
- Conclusion climax: `1.04` on desktop and mobile.
- Next Trace title: keep `1.02` on desktop/laptop and use `1.07` on mobile.
- Keep existing font sizes, letter spacing, widths, layout, content, interactions, routes, and responsive structure.
- Preserve Homepage behavior and reduced-motion behavior.
- Do not merge without explicit user authorization.

---

### Task 1: Add Source-Level Regression Coverage

**Files:**
- Create: `tests/typography-regression.test.ts`

**Interfaces:**
- Consumes: `app/globals.css`.
- Produces: deterministic assertions for the approved base and mobile declarations.

- [ ] **Step 1: Write a CSS rule extraction helper**

Read the stylesheet with `readFileSync`, extract all blocks for a selector, and
extract individual declaration values without adding a CSS parser dependency.

- [ ] **Step 2: Add the failing approved-value assertions**

Require:

```text
.thought-formation__heading base line-height = 1.1
.thought-formation__heading mobile line-height = 1.1
.thought-formation__conclusion h3 base line-height = 1.04
.trace-navigation__title base line-height = 1.02
.trace-navigation__title mobile line-height = 1.07
```

- [ ] **Step 3: Run the focused test and verify RED**

```text
npx tsx --test tests/typography-regression.test.ts
```

Expected: failures report the current `1.04`, `1.06`, `0.94`, and missing
mobile `1.07` declarations.

---

### Task 2: Apply the Minimal CSS Correction

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: the failing values from Task 1.
- Produces: shared computed line-height values used by all Trace pages.

- [ ] **Step 1: Update the Thought Formation heading values**

Set the base and mobile line-height declarations to `1.1`.

- [ ] **Step 2: Update the conclusion value**

Set `.thought-formation__conclusion h3` line-height to `1.04`.

- [ ] **Step 3: Add the mobile Next Trace value**

Add `line-height: 1.07` to the existing mobile
`.trace-navigation__title` rule while retaining the base `1.02` declaration.

- [ ] **Step 4: Run the focused test and verify GREEN**

```text
npx tsx --test tests/typography-regression.test.ts
```

Expected: all typography regression assertions pass.

---

### Task 3: Extend Runtime Acceptance

**Files:**
- Modify: `tests/trace_acceptance.py`

**Interfaces:**
- Consumes: rendered computed styles from the production application.
- Produces: breakpoint-specific line-height ratio assertions.

- [ ] **Step 1: Add a computed line-height ratio helper**

Calculate `parseFloat(lineHeight) / parseFloat(fontSize)` for the target
locator.

- [ ] **Step 2: Assert shared heading ratios**

For every Trace and viewport, assert Thought Formation is within `0.01` of
`1.10` and Conclusion is within `0.01` of `1.04`.

- [ ] **Step 3: Assert Next Trace responsive ratios**

For Trace 01 and Trace 02, assert `1.02` above 480px and `1.07` at 390px.

- [ ] **Step 4: Run production acceptance**

Run the production server on port 3700 and execute Homepage and Trace
acceptance with screenshots outside the repository.

---

### Task 4: Verify And Publish

**Files:**
- No additional production files.

**Interfaces:**
- Consumes: the complete implementation diff.
- Produces: verification evidence, commits, pushed branch, and pull request.

- [ ] **Step 1: Run the full verification gate**

```text
npm test
npm run typecheck
npm run lint
npm run build
```

- [ ] **Step 2: Inspect scope**

```text
git diff --check
git status --short
git diff --stat
git diff --name-status
```

- [ ] **Step 3: Commit and publish**

Create a documentation commit and a focused implementation commit, push
`fix/vietnamese-typography-spacing`, open a pull request to `main`, inspect its
available checks, and stop without merging.
