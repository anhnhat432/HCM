# Verified Vietnamese Present-Day Imagery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Execute inline in this repository; do not dispatch subagents.

**Goal:** Replace all three Present Day photographs with licensed imagery whose source metadata explicitly establishes Vietnamese subjects or a photographed location in Vietnam, while preserving the existing Trace renderer and layouts.

**Architecture:** The existing `TraceImage` contract remains the only rendering interface. A provenance-first research task locks one Vietnamese-context source per Trace, tests require stable production paths and guarded historical assets, non-destructive derivatives preserve the full source, and `data/traces.ts` supplies factual metadata and crop position to the shared renderer. Trace 02 historical 1958 remains unchanged because no original-publication source has passed its separate authenticity gate.

**Tech Stack:** Next.js 16, React 19, TypeScript, Node test runner, Python Pillow, Python Playwright, licensed image-source pages, GitHub CLI.

## Global Constraints

- Replace Trace 01, Trace 02, and Trace 03 Present Day imagery.
- Each source must explicitly identify Vietnamese subjects or a photographed location in Vietnam through title, description, tags, caption, location, or creator notes.
- Do not infer nationality from facial appearance.
- Keep `public/images/traces/dai-doan-ket/1945-independence-declaration.jpg` and its production metadata unchanged.
- Keep `public/images/traces/dao-duc-trach-nhiem/1958-dao-duc-cach-mang.jpg` unchanged until an original scan, issue cover with authoritative linkage, or explicit archival facsimile passes the documentary gate.
- Preserve Homepage, historical assets, image taxonomy, shared renderer, routes, layout, typography, interaction, responsive behavior, and reduced motion.
- Do not use AI-generated imagery, foreign-context stock imagery, generic corporate collaboration, celebratory student imagery, or nationality inferred from appearance.
- Present Day photographs remain `kind: "present"`, `fit: "cover"`, `aspectRatio: "portrait"`, `tone: "natural"`, and `background: "neutral"`.
- Source originals and screenshots stay outside the repository.
- Production derivatives are RGB JPEG files, maximum dimension 2400 pixels, quality 92, with no baked semantic crop.
- Push to the existing `phase-8-historical-assets` branch and update draft PR #1; do not merge.

---

### Task 1: Research And Lock Three Verified Vietnamese Sources

**Files:**
- Modify: `docs/image-sources/image-semantic-corrections.md`
- Read: `docs/superpowers/specs/2026-08-11-image-semantic-corrections-design.md`
- Read: `data/traces.ts`
- Output outside repository: `C:/Users/admin/.codex/visualizations/2026/08/11/vietnamese-present-day-sources/`

**Interfaces:**
- Consumes: the approved Vietnamese-context authenticity gate and three Trace opening narratives.
- Produces: accepted source records with stable keys `trace-01-present`, `trace-02-present`, and `trace-03-present`; retains the failed-gate record `trace-02-1958`.
- Each accepted record contains: `subject`, `sourcePageUrl`, `originalFileUrl`, `ownerOrCreator`, `vietnamEvidence`, `license`, `usageStatus`, `verificationStatus`, `caption`, `alt`, `kind`, `fit`, `aspectRatio`, `tone`, `background`, and `objectPosition`.

- [ ] **Step 1: Search Trace 01 Vietnamese group candidates**

Search licensed sources with these query families:

```text
Vietnamese students group project discussion Vietnam
sinh viên Việt Nam thảo luận nhóm tài liệu
students teamwork Hanoi Vietnam serious discussion
young adults project meeting Ho Chi Minh City Vietnam
```

Reject candidates dominated by smiles, presentations, corporate workshops,
foreign landmarks, or one speaker. Require a shared document or project surface
plus visible difference in posture, attention, or gesture.

- [ ] **Step 2: Search Trace 02 Vietnamese decision candidates**

Search licensed sources with these query families:

```text
Vietnamese students laptop discussion Vietnam
sinh viên Việt Nam xem laptop thảo luận
hands laptop university Vietnam decision
students deadline documents Ho Chi Minh City Vietnam
```

Reject candidates that read as celebration, generic productivity, or corporate
collaboration. Require a laptop, document, notes, or hands under active review,
with personal identity secondary to the decision surface.

- [ ] **Step 3: Search Trace 03 Vietnamese student candidates**

Search licensed sources with these query families:

```text
Vietnamese student alone laptop studying Vietnam
sinh viên Việt Nam học một mình laptop suy tư
student stressed studying Hanoi Vietnam
university student notebook Ho Chi Minh City quiet
```

Reject graduation, awards, smiling success poses, corporate offices, and images
that require an invented visible score or CV. Require one student, a study
surface, and an introspective or emotionally quiet composition.

- [ ] **Step 4: Apply identity, semantic, crop, and rights gates**

Accept a candidate only when all statements are true:

```text
The source metadata explicitly establishes Vietnam or Vietnamese subject context.
The visible subject supports the exact Trace opening narrative.
The source provides a stable page and compatible reuse license.
The existing 4:5 frame preserves the required face, gesture, document, or laptop.
No foreign contextual cue contradicts the Vietnamese metadata.
Alt text remains factual and does not infer invisible actions or nationality.
```

- [ ] **Step 5: Download originals and produce frame previews outside the repository**

Save each original under the audit root. Record SHA-256, MIME type, dimensions,
and mode:

```powershell
Get-FileHash -Algorithm SHA256 $fullPath
py -3 -c "from PIL import Image; p=r'$fullPath'; im=Image.open(p); print(im.format, im.size, im.mode)"
```

Create desktop and mobile 4:5 crop previews without modifying source pixels.
Inspect each candidate in the actual opening-frame dimensions before selection.

- [ ] **Step 6: Replace the three Present source records in the manifest**

Record the exact interface fields plus semantic-fit rationale, Vietnamese-context
evidence, crop assessment, grayscale assessment, contextual-cue review, original
SHA-256, and rights-gate result. Keep the explicit failed authenticity record for
Trace 02 historical 1958.

Run:

```text
rg -n "TBD|TODO|unknown|unclear" docs/image-sources/image-semantic-corrections.md
git diff --check
```

Expected: no incomplete field and no whitespace error.

- [ ] **Step 7: Commit the locked source records**

```text
git add -- docs/image-sources/image-semantic-corrections.md
git commit -m "docs: record verified Vietnamese image sources"
```

---

### Task 2: Write Failing Registry And Acceptance Requirements

**Files:**
- Modify: `tests/trace-registry.test.ts`
- Modify: `tests/trace_acceptance.py`
- Read: `docs/image-sources/image-semantic-corrections.md`

**Interfaces:**
- Consumes: the three locked source records from Task 1.
- Produces: failing tests for stable paths, Vietnamese-context provenance, presentation, focused opening captures, and unchanged 1945/1958 historical assets.

- [ ] **Step 1: Require fixed Present Day replacement paths**

Require these paths:

```ts
const vietnamesePresentAssets = new Map([
  ["dai-doan-ket", "/images/traces/dai-doan-ket/present-day-vietnamese-group.jpg"],
  ["dao-duc-trach-nhiem", "/images/traces/dao-duc-trach-nhiem/present-day-vietnamese-decision.jpg"],
  ["con-nguoi", "/images/traces/con-nguoi/present-day-vietnamese-student.jpg"],
]);
```

For each image assert `verificationStatus: "verified"`,
`usageStatus: "licensed"`, factual `credit`, stable `sourceUrl`, explicit
license, `kind: "present"`, `fit: "cover"`, and portrait presentation.

- [ ] **Step 2: Lock Vietnamese-context provenance**

Add a test-only map using the exact `sourceUrl` and credit values from the
manifest. Assert all three records match the accepted source pages and creators;
do not infer nationality from alt text.

- [ ] **Step 3: Lock unchanged historical assets**

Assert Trace 01 and Trace 03 retain:

```text
/images/traces/dai-doan-ket/1945-independence-declaration.jpg
```

Assert Trace 02 historical 1958 retains:

```text
/images/traces/dao-duc-trach-nhiem/1958-dao-duc-cach-mang.jpg
```

- [ ] **Step 4: Capture all three focused Present Day openings**

Use:

```python
FOCUSED_OPENINGS = {
    "trace-01": "trace-01-present-focused.png",
    "trace-02": "trace-02-present-focused.png",
    "trace-03": "trace-03-present-focused.png",
}
```

Capture `section.trace-opening` after the existing screenshot preparation.

- [ ] **Step 5: Run unit tests and verify RED**

Run:

```text
npm test
```

Expected: failures identify the rejected trial/current Present paths and missing
Trace 03 replacement while unrelated tests remain green.

---

### Task 3: Produce Non-Destructive Derivatives And Update Production Data

**Files:**
- Create: `public/images/traces/dai-doan-ket/present-day-vietnamese-group.jpg`
- Create: `public/images/traces/dao-duc-trach-nhiem/present-day-vietnamese-decision.jpg`
- Create: `public/images/traces/con-nguoi/present-day-vietnamese-student.jpg`
- Remove rejected untracked trials: `public/images/traces/dai-doan-ket/present-day-tension.jpg`
- Remove rejected untracked trials: `public/images/traces/dao-duc-trach-nhiem/present-day-decision.jpg`
- Modify: `data/traces.ts`
- Test: `tests/trace-registry.test.ts`

**Interfaces:**
- Consumes: accepted originals and exact metadata from the provenance manifest.
- Produces: three RGB JPEG derivatives and three updated production `TraceImage` records.

- [ ] **Step 1: Generate derivatives without destructive crop**

For each accepted original, run:

```python
from pathlib import Path
from PIL import Image, ImageOps

source = Path(SOURCE_PATH)
destination = Path(DESTINATION_PATH)
image = ImageOps.exif_transpose(Image.open(source)).convert("RGB")
image.thumbnail((2400, 2400), Image.Resampling.LANCZOS)
destination.parent.mkdir(parents=True, exist_ok=True)
image.save(destination, "JPEG", quality=92, optimize=True, progressive=True)
```

Do not use `ImageOps.fit` or bake the UI crop into the derivative.

- [ ] **Step 2: Update Trace 01 Present Day metadata**

Use `/images/traces/dai-doan-ket/present-day-vietnamese-group.jpg`, copy all
provenance fields from `trace-01-present`, preserve `kind: "present"`, and use
the accepted `objectPosition`.

- [ ] **Step 3: Update Trace 02 Present Day metadata**

Use `/images/traces/dao-duc-trach-nhiem/present-day-vietnamese-decision.jpg`,
copy all provenance fields from `trace-02-present`, preserve `kind: "present"`,
and use the accepted `objectPosition`.

- [ ] **Step 4: Update Trace 03 Present Day metadata**

Use `/images/traces/con-nguoi/present-day-vietnamese-student.jpg`, copy all
provenance fields from `trace-03-present`, preserve `kind: "present"`, and use
the accepted `objectPosition`.

- [ ] **Step 5: Remove the two rejected trial derivatives**

Delete only the two untracked trial files named in this task. Do not delete the
previous production images or any historical asset.

- [ ] **Step 6: Run unit tests and verify GREEN**

Run:

```text
npm test
```

Expected: all registry, provenance, presentation, and narrative tests pass.

---

### Task 4: Run Production Visual Acceptance

**Files:**
- Modify only when screenshot evidence requires: `data/traces.ts`
- Output outside repository: `C:/Users/admin/.codex/visualizations/2026/08/11/vietnamese-present-day-final/`

**Interfaces:**
- Consumes: production build and three integrated Present Day assets.
- Produces: Homepage, full Trace, focused opening, desktop, laptop, mobile, and reduced-motion acceptance evidence.

- [ ] **Step 1: Build and start production**

```text
npm run build
.\node_modules\.bin\next.cmd start -p 3700
```

- [ ] **Step 2: Run Homepage and Trace acceptance**

```powershell
$env:HCM_BASE_URL='http://localhost:3700'
$env:HCM_SCREENSHOT_DIR='C:\Users\admin\.codex\visualizations\2026\08\11\vietnamese-present-day-final\homepage-pass-1'
py -3 tests\homepage_acceptance.py
$env:HCM_TRACE_SCREENSHOT_DIR='C:\Users\admin\.codex\visualizations\2026\08\11\vietnamese-present-day-final\traces-pass-1'
py -3 tests\trace_acceptance.py
```

Expected: all routes pass with no console error or overflow.

- [ ] **Step 3: Review semantic fit and crop at every breakpoint**

Inspect all three focused openings at 1920x1080 plus full pages at 1366x768 and
390x844. Confirm the source-backed Vietnamese context remains plausible in the
crop, required faces/gestures/study surfaces remain visible, and the unchanged
1945 and 1958 assets are identical.

- [ ] **Step 4: Apply only metadata-level crop correction when required**

Allowed corrections are limited to `presentation.objectPosition`, `tone`, and
factual caption or alt wording. Do not change layout, shared CSS, architecture,
or historical assets.

- [ ] **Step 5: Capture release acceptance**

```powershell
$env:HCM_TRACE_SCREENSHOT_DIR='C:\Users\admin\.codex\visualizations\2026\08\11\vietnamese-present-day-final\traces-release'
py -3 tests\trace_acceptance.py
```

---

### Task 5: Final Verification, Commit, Push, And PR Update

**Files:**
- Review all modified data, test, manifest, and image files.

**Interfaces:**
- Consumes: visually accepted implementation.
- Produces: one implementation commit on the existing branch and an updated draft PR; no merge.

- [ ] **Step 1: Run the fresh verification gate**

Stop the server, then run:

```text
npm test
npm run typecheck
npm run lint
npm run build
```

Restart the final build and rerun Homepage and Trace production acceptance at
desktop, laptop, mobile, and reduced motion.

- [ ] **Step 2: Inspect final scope**

```text
git diff --check
git status --short
git diff --stat
git diff --name-status
```

Expected: only the source manifest, three Present assets, `data/traces.ts`, and
required test changes appear. The 1945 and 1958 assets must not appear in the
diff.

- [ ] **Step 3: Commit implementation**

```text
git add -- docs/image-sources/image-semantic-corrections.md data/traces.ts tests/trace-registry.test.ts tests/trace_acceptance.py public/images/traces/dai-doan-ket/present-day-vietnamese-group.jpg public/images/traces/dao-duc-trach-nhiem/present-day-vietnamese-decision.jpg public/images/traces/con-nguoi/present-day-vietnamese-student.jpg
git commit -m "fix: use verified Vietnamese present-day imagery"
```

- [ ] **Step 4: Push and update PR #1**

```text
git push origin phase-8-historical-assets
```

Update the PR body with the three sources, Vietnamese-context evidence,
licenses, crop decisions, verification results, and confirmation that the 1945
and 1958 historical assets are unchanged.

- [ ] **Step 5: Inspect checks and stop without merging**

```text
gh pr checks 1 --repo anhnhat432/HCM --watch
```

Report the implementation commit, branch, PR URL, available check state, three
source pages and licenses, final screenshot paths, and unchanged 1945/1958
status. Do not merge.
