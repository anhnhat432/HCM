# Owner-Approved AI Present-Day Imagery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Execute inline in this repository; do not dispatch subagents.

**Goal:** Replace all three Present Day photographs with the exact AI illustrations supplied and approved by the project owner, disclose AI provenance transparently, and preserve the existing renderer and historical assets.

**Architecture:** The existing `TraceImage` contract remains the rendering interface. Tests first require three fixed production paths, owner-approved metadata, plain-text AI credit with no source link, and unchanged historical guardrails. Non-destructive RGB JPEG derivatives are created from the approved PNG files, then `data/traces.ts` supplies the assets and crop metadata to the unchanged shared renderer.

**Tech Stack:** Next.js 16, React 19, TypeScript, Node test runner, Python Pillow, Python Playwright, GitHub CLI.

## Global Constraints

- Use exactly these approved source files:
  - `C:/Users/admin/Downloads/Trace 01 — Đại đoàn kết.png`
  - `C:/Users/admin/Downloads/Trace 02 — Đạo đức & trách nhiệm.png`
  - `C:/Users/admin/Downloads/Trace 03 — Con người.png`
- Credit each production image as `Ảnh minh họa`.
- Do not add a `sourceUrl`; the generator and generator-license terms were not supplied.
- Set `verificationStatus: "verified"`, `usageStatus: "approved"`, and record the owner approval and missing generator terms in `usageNote` and `license`.
- Keep `public/images/traces/dai-doan-ket/1945-independence-declaration.jpg` and its metadata unchanged.
- Keep `public/images/traces/dao-duc-trach-nhiem/1958-dao-duc-cach-mang.jpg` and its metadata unchanged.
- Preserve Homepage, historical assets, image taxonomy, shared renderer, routes, layout, typography, interaction, responsive behavior, and reduced motion.
- Present Day images remain `kind: "present"`, `fit: "cover"`, `aspectRatio: "portrait"`, `tone: "natural"`, `background: "neutral"`, and centered.
- Source PNG files and screenshots stay outside the repository.
- Production derivatives are RGB JPEG files, maximum dimension 2400 pixels, quality 92, with no baked semantic crop.
- Push to the existing `phase-8-historical-assets` branch and update draft PR #1; do not merge.

---

### Task 1: Reconcile Provenance Documentation

**Files:**
- Modify: `docs/image-sources/image-semantic-corrections.md`
- Modify: `docs/superpowers/specs/2026-08-11-image-semantic-corrections-design.md`
- Modify: `docs/superpowers/plans/2026-08-11-image-semantic-corrections.md`

**Interfaces:**
- Consumes: owner approval dated 2026-08-11 and exact source-file hashes.
- Produces: a stable decision record for `trace-01-present`, `trace-02-present`, `trace-03-present`, and the unchanged `trace-02-1958` failed gate.

- [ ] **Step 1: Record exact approved source properties**

Record:

```text
Trace 01: PNG, 1122x1402, RGB, SHA-256 FFF906FD3A87C540534F6A707653B951F025526B43DCFE9FAD10A4A0EE75115D
Trace 02: PNG, 1122x1402, RGB, SHA-256 B6A85966FFF869BC3D2F77ACC88E3EE39FBCF6A3318355EB9FE9215ED5758120
Trace 03: PNG, 1856x2146, RGBA, SHA-256 DE45489B20761BB0C54E6F8412304E4AED21EAD440B6A172C0839C29718203C2
```

- [ ] **Step 2: Record transparent AI provenance**

Use:

```text
Visible credit: Ảnh minh họa
Usage status: approved
Verification status: verified
License: Không nêu giấy phép của công cụ tạo
Usage note: Chủ dự án cung cấp và duyệt ảnh minh họa AI ngày 2026-08-11; công cụ tạo và điều khoản giấy phép không được cung cấp.
Source URL: none
```

- [ ] **Step 3: Self-review documentation**

Run:

```text
rg -n "TBD|TODO|unknown|unclear|Unsplash|Pexels|licensed contemporary photograph|AI-created imagery is excluded" docs/image-sources/image-semantic-corrections.md docs/superpowers/specs/2026-08-11-image-semantic-corrections-design.md docs/superpowers/plans/2026-08-11-image-semantic-corrections.md
git diff --check
```

Expected: no stale stock-photo decision, incomplete field, or whitespace error.

- [ ] **Step 4: Commit reconciliation documentation**

```text
git add -- docs/image-sources/image-semantic-corrections.md docs/superpowers/specs/2026-08-11-image-semantic-corrections-design.md docs/superpowers/plans/2026-08-11-image-semantic-corrections.md
git commit -m "docs: approve AI present-day illustrations"
```

---

### Task 2: Write Failing AI Asset Requirements

**Files:**
- Modify: `tests/trace-registry.test.ts`
- Modify: `tests/trace_acceptance.py`

**Interfaces:**
- Consumes: the three approved source records from Task 1.
- Produces: failing tests for fixed paths, transparent AI metadata, absent source links, focused screenshots, and unchanged 1945/1958 assets.

- [ ] **Step 1: Require fixed production paths**

Require:

```ts
const approvedAiPresentAssets = new Map([
  ["dai-doan-ket", "/images/traces/dai-doan-ket/present-day-ai-group.jpg"],
  ["dao-duc-trach-nhiem", "/images/traces/dao-duc-trach-nhiem/present-day-ai-decision.jpg"],
  ["con-nguoi", "/images/traces/con-nguoi/present-day-ai-student.jpg"],
]);
```

- [ ] **Step 2: Require transparent metadata**

For all three assert:

```text
credit = Ảnh minh họa
sourceUrl = undefined
verificationStatus = verified
usageStatus = approved
license = Không nêu giấy phép của công cụ tạo
usageNote contains Chủ dự án and AI
kind = present
fit = cover
aspectRatio = portrait
```

- [ ] **Step 3: Lock historical guardrails and focused openings**

Assert the 1945 and 1958 paths remain unchanged. Configure:

```python
FOCUSED_OPENINGS = {
    "trace-01": "trace-01-present-focused.png",
    "trace-02": "trace-02-present-focused.png",
    "trace-03": "trace-03-present-focused.png",
}
```

Acceptance must expect zero source links in `.trace-opening .trace-figure__credit`.

- [ ] **Step 4: Run tests and verify RED**

```text
npm test
```

Expected: failures identify the old trial/current paths and stock metadata while unrelated tests remain green.

---

### Task 3: Produce Derivatives And Update Production Data

**Files:**
- Create: `public/images/traces/dai-doan-ket/present-day-ai-group.jpg`
- Create: `public/images/traces/dao-duc-trach-nhiem/present-day-ai-decision.jpg`
- Create: `public/images/traces/con-nguoi/present-day-ai-student.jpg`
- Modify: `data/traces.ts`
- Remove rejected untracked trials: `public/images/traces/dai-doan-ket/present-day-tension.jpg`
- Remove rejected untracked trials: `public/images/traces/dao-duc-trach-nhiem/present-day-decision.jpg`

**Interfaces:**
- Consumes: the exact approved PNG files.
- Produces: three RGB JPEG derivatives and three owner-approved `TraceImage` records.

- [ ] **Step 1: Generate non-destructive JPEG derivatives**

Use `ImageOps.exif_transpose`, convert to RGB, thumbnail to `2400x2400`, and save
JPEG quality 92 with optimize and progressive enabled. Do not use `ImageOps.fit`.

- [ ] **Step 2: Update all three Present Day records**

Use the fixed paths and metadata from Task 2. Alt text factually describes only
the visible scene and does not include an AI medium label. Preserve the existing
captions and use `objectPosition: "50% center"`.

- [ ] **Step 3: Remove only the rejected trial derivatives**

Delete the two named untracked trial files. Do not delete previous production
images or any historical file.

- [ ] **Step 4: Run tests and verify GREEN**

```text
npm test
```

Expected: all registry, provenance, presentation, and narrative tests pass.

---

### Task 4: Production Acceptance, Verification, Commit, And Publish

**Files:**
- Output outside repository: `C:/Users/admin/.codex/visualizations/2026/08/11/ai-present-day-final/`

**Interfaces:**
- Consumes: production build and three integrated AI illustrations.
- Produces: visual acceptance evidence, one implementation commit, and an updated draft PR; no merge.

- [ ] **Step 1: Run the fresh verification gate**

```text
npm test
npm run typecheck
npm run lint
npm run build
```

- [ ] **Step 2: Run production Homepage and Trace acceptance**

Start production on port 3700 and run `tests/homepage_acceptance.py` plus
`tests/trace_acceptance.py` with screenshots outside the repository. Verify
1920x1080, 1366x768, 390x844, and reduced motion.

- [ ] **Step 3: Inspect final visual evidence**

Confirm all three focused openings preserve the approved composition, Trace 03
has no visible watermark, AI-generated text is not dominant at production size,
and 1945/1958 remain unchanged.

- [ ] **Step 4: Inspect scope and commit implementation**

```text
git diff --check
git status --short
git diff --stat
git diff --name-status
git add -- data/traces.ts tests/trace-registry.test.ts tests/trace_acceptance.py public/images/traces/dai-doan-ket/present-day-ai-group.jpg public/images/traces/dao-duc-trach-nhiem/present-day-ai-decision.jpg public/images/traces/con-nguoi/present-day-ai-student.jpg
git commit -m "fix: use approved AI present-day illustrations"
```

- [ ] **Step 5: Push and update draft PR #1**

Push `phase-8-historical-assets`, update PR #1 with AI disclosure, hashes,
visual evidence, verification results, and unchanged historical guardrails.
Inspect available checks and stop without merging.
