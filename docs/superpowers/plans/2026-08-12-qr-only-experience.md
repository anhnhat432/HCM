# QR-Only Experience Rollback Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the pre-PR #10 visual experience while retaining accessible local QR sharing in Homepage and Trace headers.

**Architecture:** Use Git history as the exact rollback source: revert merge commit `6611fcc`, then cherry-pick the isolated QR commit `fba285f`. Add a static regression guard that proves QR remains while every storytelling-only component and selector is absent, then run the existing production acceptance matrix.

**Tech Stack:** Next.js 16.3, React 19, TypeScript, CSS, Framer Motion, local `qrcode`, Node test runner, Python Playwright, Git/GitHub CLI.

## Global Constraints

- Preserve all routes, Trace content, historical assets, TraceProgress, TraceRecap, Source Drawer, branding, and responsive behavior from before PR #10.
- Keep only local QR sharing from PR #10.
- Do not hide removed storytelling with CSS; remove its code and tests.
- Do not add dependencies or interactions.
- Ordinary scrolling remains the complete narrative interaction.
- Do not merge without explicit user authorization.

---

### Task 1: Add QR-Only Regression Guard

**Files:**
- Create: `tests/qr-only-experience.test.ts`

**Interfaces:**
- Consumes: repository files and `QrShareDialog` integration selectors.
- Produces: a static regression test that rejects storytelling artifacts.

- [ ] **Step 1: Write the failing test**

Create a test that reads production source and asserts:

```ts
assert.ok(homepage.includes("QrShareDialog"));
assert.ok(traceHeader.includes("QrShareDialog"));

for (const removedArtifact of [
  "trace-back-story",
  "formation-convergence",
  "historical-moment__continuity",
  "journey-trace-mark",
]) {
  assert.equal(sourceCorpus.includes(removedArtifact), false);
}
```

The first run must fail because PR #10 still contains all storytelling artifacts.

- [ ] **Step 2: Run RED**

```powershell
.\node_modules\.bin\tsx.cmd --test tests\qr-only-experience.test.ts
```

Expected: failure naming at least `trace-back-story`.

- [ ] **Step 3: Commit the RED test with the rollback slice**

The test is committed only after Task 2 turns it green.

---

### Task 2: Restore Pre-Storytelling Experience and Reapply QR

**Files:**
- Restore/remove: exact files changed by merge commit `6611fcc`.
- Reapply: exact files from commit `fba285f`.
- Keep: `tests/qr-only-experience.test.ts`.

**Interfaces:**
- Consumes: merge commit `6611fcc`, QR commit `fba285f`.
- Produces: pre-PR #10 UI plus `QrShareDialog` in both headers.

- [ ] **Step 1: Revert the merged feature**

```powershell
git revert -m 1 6611fcc --no-edit
```

Expected: all seven PR #10 commits are reversed in one new commit while the QR-only design/spec files on this branch remain.

- [ ] **Step 2: Reapply the isolated QR slice**

```powershell
git cherry-pick fba285f
```

Expected: `QrShareDialog`, `lib/share-url.ts`, QR dependencies, header integration, CSS, and QR tests return without storytelling files.

- [ ] **Step 3: Run GREEN**

```powershell
.\node_modules\.bin\tsx.cmd --test tests\qr-only-experience.test.ts tests\qr-share.test.ts
```

Expected: both suites pass.

- [ ] **Step 4: Commit regression guard**

```powershell
git add -- tests/qr-only-experience.test.ts
git commit -m "test: guard qr-only experience"
```

---

### Task 3: Align QA Documentation

**Files:**
- Modify: `docs/accessibility-qa.md`
- Modify: `docs/release-readiness.md`

**Interfaces:**
- Consumes: verified QR-only production behavior.
- Produces: release docs with no claim that removed storytelling exists.

- [ ] **Step 1: Update QA scope**

Record QR keyboard/local-generation checks while removing Trace Back,
convergence, continuity, and journey-mark claims.

- [ ] **Step 2: Update release status**

Describe the restored original experience plus QR sharing. Do not retain
Lighthouse numbers until they are freshly measured for this branch.

- [ ] **Step 3: Commit docs**

```powershell
git add -- docs/accessibility-qa.md docs/release-readiness.md
git commit -m "docs: record qr-only release state"
```

---

### Task 4: Full Verification and Publication

**Files:**
- Verify all branch changes.

**Interfaces:**
- Produces: one clean branch and one ready-for-review PR.

- [ ] **Step 1: Run source gates**

```powershell
npm test
npm run typecheck
npm run lint
npm run build
```

Expected: every command exits `0`.

- [ ] **Step 2: Run production acceptance**

Start the production build on port 3800 and run:

```powershell
$env:HCM_BASE_URL='http://localhost:3800'
python tests/homepage_acceptance.py
python tests/trace_acceptance.py
```

Expected: Homepage and all three Trace routes pass desktop/mobile/reflow,
forced-colors, reduced-motion, QR keyboard behavior, console, and overflow gates.

- [ ] **Step 3: Inspect final scope**

```powershell
git status --short --branch
git diff --check origin/main...HEAD
git diff --name-status origin/main...HEAD
```

Expected: only rollback, QR reapplication, regression test, design/plan, and QA docs.

- [ ] **Step 4: Push and open PR**

```powershell
git push -u origin revert/qr-only-experience
```

Open a non-draft PR titled:

```text
revert: restore original experience with QR sharing
```

Do not merge without a later explicit request.
