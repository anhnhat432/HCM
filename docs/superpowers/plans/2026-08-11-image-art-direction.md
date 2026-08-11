# Phase 7 Image Art Direction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. This repository must be executed inline without subagents, and the user has explicitly authorized work on `main` in `C:\HCM`.

**Goal:** Replace the universal historical-image treatment with a minimal data-driven taxonomy, preserve historical context, compact placeholders, validate every image in the real layouts, and produce a separately reviewed Homepage candidate comparison.

**Architecture:** `TraceImage.kind` and `TraceImage.presentation` become the only presentation contract. A small pure class-name helper feeds the existing `TraceOpening` and `HistoricalMoment` renderers, while CSS modifier families implement fit, aspect, tone, and background without year-specific components. Homepage keeps its current production asset until a candidate wins an in-layout review.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS, Node test runner, Python Playwright acceptance tests.

## Global Constraints

- Do not redesign layout, typography, narrative structure, verified historical content, routes, interactions, SEO, or reduced-motion behavior.
- Do not add a CMS, image registry framework, per-year renderer, feature, deployment, or AI-generated historical image.
- Do not commit the Yellowstone candidate as the final Homepage asset.
- Historical context takes priority over filling a frame.
- Document contents retain natural ratios and use `contain`.
- Production data must contain no top-level `TraceImage.objectPosition` after migration.
- Every crop and treatment must be reviewed in the actual layout at 1920x1080, 1366x768, and 390x844.
- Keep existing provenance, verification, usage, credit, `sourceUrl`, license, and owner-approval notes unchanged.
- Create one implementation commit named `feat: refine image art direction`.
- Do not deploy.

---

### Task 1: Lock the taxonomy and migrate Trace data

**Files:**
- Modify: `tests/trace-registry.test.ts`
- Modify: `types/trace.ts`
- Modify: `data/traces.ts`

**Interfaces:**
- Produces: `TraceImageKind`, `TraceImagePresentation`, and required `TraceImage.kind`.
- Produces: all crop metadata under `image.presentation.objectPosition`.
- Preserves: existing source, usage, verification, license, and approval-note values.

- [ ] **Step 1: Write failing schema tests**

Add assertions that every Present Day and historical image has one of the six
approved kinds; every placeholder uses `kind: "placeholder"`; documents use
`fit: "contain"`; historical photos and places use landscape presentation; and
serialized production data contains no top-level `objectPosition` property.

```ts
const imageKinds = new Set([
  "present",
  "historical-photo",
  "historical-place",
  "document",
  "artwork",
  "placeholder",
]);

test("every trace image declares the approved presentation taxonomy", () => {
  for (const trace of traces) {
    const images = [
      trace.presentDay?.image,
      ...trace.historicalMoments.map((moment) => moment.image),
    ].filter((image): image is TraceImage => Boolean(image));

    for (const image of images) {
      assert.equal(imageKinds.has(image.kind), true);
      assert.equal("objectPosition" in image, false);
    }
  }
});
```

- [ ] **Step 2: Verify RED**

Run: `npm test`

Expected: FAIL because `TraceImage.kind` and `presentation` are absent and
legacy top-level `objectPosition` values still exist.

- [ ] **Step 3: Add minimal taxonomy types**

Add the six image kinds and optional presentation properties to `types/trace.ts`.
Remove the top-level `objectPosition` field from `TraceImage`.

- [ ] **Step 4: Migrate all production data**

Use these decisions in `data/traces.ts`:

| Location | Kind | Fit | Aspect | Tone | Background |
| --- | --- | --- | --- | --- | --- |
| Trace 01 Present | present | cover | portrait | natural | neutral |
| Trace 01 1930 | artwork | contain | landscape | soft-archival | paper |
| Trace 01 1941 | historical-place | cover | landscape | soft-archival | neutral |
| Trace 01 1945 | historical-photo | contain | landscape | archival | neutral |
| Trace 02 Present | present | cover | portrait | natural | neutral |
| Trace 02 1927 | document | contain | document | natural | paper |
| Trace 02 1947 | placeholder | contain | landscape | soft-archival | paper |
| Trace 02 1958 | placeholder | contain | landscape | soft-archival | paper |
| Trace 03 Present | present | cover | portrait | natural | neutral |
| Trace 03 1945 | historical-photo | cover | landscape | archival | neutral |
| Trace 03 1958 | placeholder | contain | landscape | soft-archival | paper |
| Trace 03 1969 | placeholder | contain | landscape | soft-archival | paper |

Move each existing crop value to `presentation.objectPosition`. Add crop values
for the three Present Day assets, then refine them during visual validation.

- [ ] **Step 5: Verify GREEN**

Run: `npm test`

Expected: all registry tests pass and exactly three historical moments remain in
each Trace.

### Task 2: Derive renderer modifiers from presentation data

**Files:**
- Create: `lib/trace-image-presentation.ts`
- Create: `tests/trace-image-presentation.test.ts`
- Modify: `components/trace/historical-moment.tsx`
- Modify: `components/trace/trace-opening.tsx`

**Interfaces:**
- Produces: `getTraceImageFrameClassName(image: TraceImage, baseClassName: string): string`.
- Consumes: `TraceImage.kind` and `TraceImage.presentation`.

- [ ] **Step 1: Write failing class-name tests**

Test a document and a historical photograph so class names include kind, fit,
aspect, tone, and background modifiers without including year or legacy class
names.

```ts
assert.equal(
  getTraceImageFrameClassName(documentImage, "trace-figure__frame"),
  "trace-figure__frame trace-figure__frame--kind-document trace-figure__frame--fit-contain trace-figure__frame--aspect-document trace-figure__frame--tone-natural trace-figure__frame--background-paper",
);
```

- [ ] **Step 2: Verify RED**

Run: `npx tsx --test tests/trace-image-presentation.test.ts`

Expected: FAIL because `lib/trace-image-presentation.ts` does not exist.

- [ ] **Step 3: Implement the pure helper**

Build the class list from present metadata only. Do not infer values from years,
paths, verification status, or placeholder booleans.

- [ ] **Step 4: Verify helper GREEN**

Run: `npx tsx --test tests/trace-image-presentation.test.ts`

Expected: all helper tests pass.

- [ ] **Step 5: Update both renderers**

Use the helper on the frame in `HistoricalMoment` and `TraceOpening`. Keep one
image-or-placeholder branch. Read crop only from
`image.presentation?.objectPosition`. Remove `--historical`, `--present`, and
the legacy placeholder-frame branching where kind modifiers replace them.

- [ ] **Step 6: Verify renderer integration**

Run: `npm test && npm run typecheck`

Expected: tests and TypeScript pass with no top-level `objectPosition` access.

### Task 3: Implement the image grammar and document crop

**Files:**
- Modify: `app/globals.css`
- Create: `public/images/traces/dao-duc-trach-nhiem/1927-duong-kach-menh-crop.jpg`
- Modify: `data/traces.ts`
- Modify: `tests/trace-registry.test.ts`

**Interfaces:**
- Consumes: frame modifier classes from Task 2.
- Produces: kind-based aspect, fit, tone, paper field, and placeholder styles.

- [ ] **Step 1: Update the expected document asset path first**

Change the registry test expectation to
`/images/traces/dao-duc-trach-nhiem/1927-duong-kach-menh-crop.jpg`.

- [ ] **Step 2: Verify RED**

Run: `npm test`

Expected: FAIL because data still references the uncropped source image.

- [ ] **Step 3: Generate the tight document derivative**

Crop only the surrounding landscape margins from the existing 1927 source while
preserving the complete book edges. Save as the new path and keep the same
source, credit, usage, verification, and license metadata.

- [ ] **Step 4: Point data to the derivative and verify GREEN**

Run: `npm test`

Expected: all tests pass.

- [ ] **Step 5: Replace universal CSS assumptions**

Remove the global 3:4 historical frame and the universal historical
`grayscale + sepia + opacity + multiply` rule. Add:

- portrait `4 / 5`, landscape `4 / 3`, and flexible document frame rules;
- cover and contain fit modifiers;
- natural, archival, and soft-archival tone modifiers;
- paper and neutral background modifiers;
- historical-photo opacity 1 with no blend;
- historical-place readable contrast with no dark multiply;
- artwork muted-color preservation;
- document internal sizing, subtle border, and restrained shadow;
- warm-paper placeholder with small year, divider, and exact copy
  `Tư liệu đang được bổ sung`.

- [ ] **Step 6: Run static verification**

Run: `npm test && npm run typecheck && npm run lint`

Expected: all commands exit 0 and no generic historical filter remains in CSS.

### Task 4: Add browser acceptance for the presentation contract

**Files:**
- Modify: `tests/trace_acceptance.py`

**Interfaces:**
- Verifies actual renderer output and computed layout without pixel-level CSS assertions.

- [ ] **Step 1: Write failing browser assertions**

For the appropriate moments, assert the expected kind/aspect/fit classes,
placeholder copy, `object-fit`, and landscape frame width-to-height relationship.
Assert the 1927 document uses contain and all placeholders remain compact on
mobile.

- [ ] **Step 2: Start the production server**

Run: `npm run build` followed by `npm run start -- -p 3700`.

- [ ] **Step 3: Verify browser RED or expose integration gaps**

Run with `HCM_BASE_URL=http://localhost:3700`:
`python tests/trace_acceptance.py`

Expected before final integration: any missing class/copy/layout assertion fails
for the specific presentation contract rather than for navigation or content.

- [ ] **Step 4: Complete minimal renderer/CSS integration fixes**

Fix only the class, copy, fit, aspect, or sizing behavior proven by the failing
acceptance assertion.

- [ ] **Step 5: Verify browser GREEN**

Run both `python tests/trace_acceptance.py` and
`python tests/homepage_acceptance.py` against port 3700.

Expected: all routes, desktop/laptop/mobile, reduced motion, overflow, console,
and presentation assertions pass.

### Task 5: Run two in-layout visual correction passes

**Files:**
- Modify when evidence requires: `data/traces.ts`
- Modify when evidence requires: `app/globals.css`
- Output only: `artifacts/phase7/pass-1/`
- Output only: `artifacts/phase7/final/`

**Interfaces:**
- Produces the required desktop/mobile full-page and focused screenshots.

- [ ] **Step 1: Capture Pass 1**

Generate Homepage and all Trace screenshots at 1920x1080, 1366x768, and 390x844.
Capture focused screenshots for Trace 01 1930, 1941, 1945 and Trace 02 1927.

- [ ] **Step 2: Review Pass 1 in the real layouts**

Check narrative support, crop, historical context, tone, caption agreement,
document boundaries, placeholder density, mobile height, and editorial
consistency. Record concrete corrections before editing.

- [ ] **Step 3: Apply Pass 1 corrections**

Adjust only presentation metadata and image CSS. Do not change narrative layout,
typography, copy, or source metadata.

- [ ] **Step 4: Capture and review Pass 2**

Repeat all three viewports and focused screenshots. Correct any remaining crop,
object-position, tone, aspect, document-sizing, or placeholder-density defect.

- [ ] **Step 5: Produce final required screenshots**

Keep Homepage desktop/mobile; Trace 01, 02, and 03 desktop/mobile full-page; and
the four focused taxonomy screenshots under `artifacts/phase7/final/`.

### Task 6: Produce the Homepage candidate comparison without changing production

**Files:**
- Do not modify committed production source.
- Output only: `artifacts/phase7/homepage-candidates/`

**Interfaces:**
- Produces 2-3 candidate desktop and mobile previews inside the real Homepage frame.

- [ ] **Step 1: Research candidates**

Select 2-3 candidates from the approved Vietnam-related, neutral document
close-up, or neutral research-context directions. Reject candidates with unclear
source identity, misleading foreign branding, random stock narrative, or
unusable rights.

- [ ] **Step 2: Record provenance**

For each candidate record source URL, creator/owner, license or usage status, and
narrative rationale in `artifacts/phase7/homepage-candidates/candidates.md`.

- [ ] **Step 3: Inject candidates only in the browser session**

Use Playwright to replace the rendered Homepage `<img>` source with a local data
URL while preserving the real frame, object-fit, responsive CSS, caption area,
and surrounding layout. Do not copy a candidate into `public` or commit it.

- [ ] **Step 4: Capture desktop and mobile comparisons**

Capture each candidate and the current production asset at 1920x1080 and
390x844. If no candidate is clearly better in-layout and rights-safe, retain the
current production asset and report Homepage replacement as unresolved.

### Task 7: Final verification and implementation commit

**Files:**
- Review all modified source, test, data, CSS, and asset files.

- [ ] **Step 1: Review scope and diff**

Run `git diff --check`, inspect `git status --short`, and confirm no candidate
Homepage asset, temporary script, cache, server artifact, or unrelated file is
staged.

- [ ] **Step 2: Run the full required gate**

Run fresh, in order:

```text
npm test
npm run typecheck
npm run lint
npm run build
```

- [ ] **Step 3: Run production acceptance**

Run Homepage and Trace acceptance against the production server at desktop,
laptop, mobile, and reduced motion. Confirm no overflow or console errors.

- [ ] **Step 4: Commit the implementation**

Stage only Phase 7 implementation files and commit exactly:

```text
feat: refine image art direction
```

- [ ] **Step 5: Verify final repository state**

Confirm the new commit hash, branch state, working-tree state, remaining four
placeholders, unchanged Homepage production asset unless separately approved,
and no deployment.
