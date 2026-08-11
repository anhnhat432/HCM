# Image Semantic Corrections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Execute inline in this repository; do not dispatch subagents.

**Goal:** Replace two semantically weak Present Day photographs and the modern Trace 02 1958 digital page with licensed, narrative-specific assets while preserving the existing image renderer and layouts.

**Architecture:** The existing `TraceImage` contract remains the only rendering interface. Research locks three provenance records, tests require fixed production paths and metadata, non-destructive derivatives replace the current files through new paths, and `data/traces.ts` supplies the selected crop and presentation values to the shared renderer.

**Tech Stack:** Next.js 16, React 19, TypeScript, Node test runner, Python Pillow, Python Playwright, public image-source APIs and official Vietnamese archives, GitHub CLI.

## Global Constraints

- Replace only Trace 01 Present Day, Trace 02 Present Day, and Trace 02 historical moment 1958.
- Keep `public/images/traces/dai-doan-ket/1945-independence-declaration.jpg` and its production metadata unchanged.
- Preserve Homepage, Trace 03 Present Day, all other historical assets, routes, layout, typography, interaction, responsive behavior, and reduced motion.
- Do not use AI-generated, staged historical, generic corporate, celebratory collaboration, or semantically adjacent documentary imagery.
- Present Day photographs must have a stated stock-photo or compatible reuse license.
- The 1958 document must identify the exact work and December 1958 publication context; keep the current asset when no more authentic acceptable source can be established.
- Keep Present Day images as `kind: "present"`, `fit: "cover"`, and portrait presentation.
- Keep the 1958 historical asset as `kind: "document"`, `fit: "contain"`, document presentation, natural tone, and paper background.
- Source originals and screenshots stay outside the repository.
- Push to the existing `phase-8-historical-assets` branch and update draft PR #1; do not merge.

---

### Task 1: Research And Lock Three Replacement Sources

**Files:**
- Create: `docs/image-sources/image-semantic-corrections.md`
- Read: `docs/superpowers/specs/2026-08-11-image-semantic-corrections-design.md`
- Read: `data/traces.ts`
- Output outside repository: `C:/Users/admin/.codex/visualizations/2026/08/11/image-semantic-corrections-sources/`

**Interfaces:**
- Consumes: three visual directions from the approved design spec.
- Produces: accepted source records with stable keys `trace-01-present`, `trace-02-present`, and `trace-02-1958`.
- Each record contains: `subject`, `sourcePageUrl`, `originalFileUrl`, `ownerOrCreator`, `license`, `usageStatus`, `verificationStatus`, `caption`, `alt`, `kind`, `fit`, `aspectRatio`, `tone`, `background`, and `objectPosition`.

- [ ] **Step 1: Search licensed Present Day candidates**

Search Unsplash, Wikimedia Commons, and other sources that publish explicit
reuse terms with these query families:

```text
students disagreement group project serious discussion
students deadline laptop documents serious discussion
team conflict unequal participation project
students reviewing laptop notes decision
```

Reject a result when the source page or asset license is unavailable, when a
single smiling presenter dominates, or when the scene reads as celebration,
corporate facilitation, or generic productivity.

- [ ] **Step 2: Search exact 1958 documentary evidence**

Search official Vietnamese archives, museum collections, library catalogues,
Wikimedia Commons, Internet Archive metadata, and indexed periodical scans for:

```text
"Đạo đức cách mạng" "Tạp chí Học tập" "số 12" 1958 scan
"Đạo đức cách mạng" "12-1958" facsimile
"Tạp chí Học tập" "tháng 12 năm 1958" Hồ Chí Minh
```

Open and inspect the actual file. Reject issue 9, modern re-typeset pages,
commentary, unrelated covers, and pages that do not visibly or authoritatively
identify the exact work and issue context.

- [ ] **Step 3: Apply semantic, crop, and rights gates**

Accept each source only when all applicable statements are true:

```text
The visible subject supports the exact opening or historical narrative.
The asset works in the existing portrait or document frame.
No essential subject is forced onto a crop edge.
The source identifies the owner or creator.
The source states a compatible license, or the historical document is covered by the recorded owner-approved policy.
Caption and alt text can remain factual without inferring invisible actions.
```

If no acceptable Trace 02 1958 source is found, stop before tests and report the
failed provenance or authenticity gate rather than replacing the current asset
with weaker evidence.

- [ ] **Step 4: Download accepted originals outside the repository**

Save each original under the audit root, preserving the source filename. Record
MIME type, pixel dimensions, and SHA-256 with:

```powershell
Get-FileHash -Algorithm SHA256 $fullPath
py -3 -c "from PIL import Image; p=r'$fullPath'; im=Image.open(p); print(im.format, im.size, im.mode)"
```

- [ ] **Step 5: Write and review the provenance manifest**

Write all interface fields plus semantic-fit rationale, crop assessment,
grayscale assessment, contextual-cue review, original SHA-256, and the explicit
rights-gate reason for all three stable keys.

Run:

```text
rg -n "TBD|TODO|unknown|unclear" docs/image-sources/image-semantic-corrections.md
git diff --check
```

Expected: no incomplete field and no whitespace error.

- [ ] **Step 6: Commit the locked source records**

```text
git add -- docs/image-sources/image-semantic-corrections.md
git commit -m "docs: record image semantic correction sources"
```

---

### Task 2: Write Failing Asset Registry And Acceptance Requirements

**Files:**
- Modify: `tests/trace-registry.test.ts`
- Modify: `tests/trace_acceptance.py`
- Read: `docs/image-sources/image-semantic-corrections.md`

**Interfaces:**
- Consumes: the three locked source records from Task 1.
- Produces: failing tests for fixed paths, provenance, presentation, focused opening captures, and the unchanged 1945 asset.

- [ ] **Step 1: Require fixed replacement paths in registry tests**

Add expectations for:

```ts
const semanticCorrectionAssets = new Map([
  ["dai-doan-ket:present", "/images/traces/dai-doan-ket/present-day-tension.jpg"],
  ["dao-duc-trach-nhiem:present", "/images/traces/dao-duc-trach-nhiem/present-day-decision.jpg"],
  ["dao-duc-trach-nhiem:1958", "/images/traces/dao-duc-trach-nhiem/1958-dao-duc-cach-mang-original.jpg"],
]);
```

Assert `verificationStatus`, `usageStatus`, `sourceUrl`, `credit`, and `license`
or `usageNote` for all three. Assert both Present Day images keep `present`,
`cover`, and `portrait`; assert the document keeps `document`, `contain`, and
`document`.

- [ ] **Step 2: Lock the unchanged 1945 image**

Assert both Trace 01 and Trace 03 continue to use:

```text
/images/traces/dai-doan-ket/1945-independence-declaration.jpg
```

with `kind: "historical-photo"`, `fit: "cover"`, and landscape presentation.

- [ ] **Step 3: Add focused Present Day screenshots**

Update browser acceptance so desktop captures include:

```python
FOCUSED_OPENINGS = {
    "trace-01": "trace-01-present-focused.png",
    "trace-02": "trace-02-present-focused.png",
}
```

Capture the visible `section.trace-opening` after reveal animations are made
stable by the existing screenshot preparation helper.

- [ ] **Step 4: Run unit tests and verify RED**

Run:

```text
npm test
```

Expected: failures identify the three old production paths while all unrelated
tests remain green.

---

### Task 3: Produce Non-Destructive Derivatives And Update Production Data

**Files:**
- Create: `public/images/traces/dai-doan-ket/present-day-tension.jpg`
- Create: `public/images/traces/dao-duc-trach-nhiem/present-day-decision.jpg`
- Create: `public/images/traces/dao-duc-trach-nhiem/1958-dao-duc-cach-mang-original.jpg`
- Modify: `data/traces.ts`
- Test: `tests/trace-registry.test.ts`

**Interfaces:**
- Consumes: original files and exact metadata from the provenance manifest.
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

- [ ] **Step 2: Replace Trace 01 Present Day metadata**

Use `/images/traces/dai-doan-ket/present-day-tension.jpg`, copy provenance fields
exactly from `trace-01-present`, preserve `kind: "present"`, and set the accepted
portrait `objectPosition` from the manifest.

- [ ] **Step 3: Replace Trace 02 Present Day metadata**

Use `/images/traces/dao-duc-trach-nhiem/present-day-decision.jpg`, copy provenance
fields exactly from `trace-02-present`, preserve `kind: "present"`, and set the
accepted portrait `objectPosition` from the manifest.

- [ ] **Step 4: Replace Trace 02 historical 1958 metadata**

Use `/images/traces/dao-duc-trach-nhiem/1958-dao-duc-cach-mang-original.jpg`, copy
all factual and rights fields from `trace-02-1958`, remove language describing a
modern digital edition, and preserve the document presentation contract.

- [ ] **Step 5: Run unit tests and verify GREEN**

Run:

```text
npm test
```

Expected: all registry, provenance, presentation, and narrative tests pass.

---

### Task 4: Run Production Visual Acceptance

**Files:**
- Modify only when screenshot evidence requires: `data/traces.ts`
- Output outside repository: `C:/Users/admin/.codex/visualizations/2026/08/11/image-semantic-corrections-final/`

**Interfaces:**
- Consumes: production build and three integrated assets.
- Produces: Homepage, Trace, focused opening, desktop, laptop, mobile, and reduced-motion acceptance evidence.

- [ ] **Step 1: Build and start production**

```text
npm run build
.\node_modules\.bin\next.cmd start -p 3700
```

- [ ] **Step 2: Run Homepage and Trace acceptance**

```powershell
$env:HCM_BASE_URL='http://localhost:3700'
$env:HCM_SCREENSHOT_DIR='C:\Users\admin\.codex\visualizations\2026\08\11\image-semantic-corrections-final\homepage-pass-1'
py -3 tests\homepage_acceptance.py
$env:HCM_TRACE_SCREENSHOT_DIR='C:\Users\admin\.codex\visualizations\2026\08\11\image-semantic-corrections-final\traces-pass-1'
py -3 tests\trace_acceptance.py
```

Expected: all routes pass with no console error or overflow.

- [ ] **Step 3: Review semantic fit and crop**

Inspect both focused Present Day screenshots at 1920x1080 plus full Trace pages
at 1366x768 and 390x844. Confirm visible subject behavior supports the narrative,
faces and decision surfaces remain in frame, the 1958 document remains complete
and legible, and the unchanged 1945 image is identical.

- [ ] **Step 4: Apply only metadata-level crop correction when required**

Allowed corrections are limited to `presentation.objectPosition`, `tone`, and
factual caption or alt wording when the screenshot exposes an inaccurate claim.
Do not change layout, shared CSS, content architecture, or other assets.

- [ ] **Step 5: Capture final Trace acceptance**

```powershell
$env:HCM_TRACE_SCREENSHOT_DIR='C:\Users\admin\.codex\visualizations\2026\08\11\image-semantic-corrections-final\traces-release'
py -3 tests\trace_acceptance.py
```

---

### Task 5: Final Verification, Commit, Push, And PR Update

**Files:**
- Review all modified data, test, manifest, and image files.

**Interfaces:**
- Consumes: visually accepted implementation.
- Produces: one implementation commit on the existing branch and an updated open draft PR; no merge.

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

Expected: only the manifest, three new assets, `data/traces.ts`, and required
test changes appear. The 1945 asset must not appear in the diff.

- [ ] **Step 3: Commit implementation**

```text
git add -- docs/image-sources/image-semantic-corrections.md data/traces.ts tests/trace-registry.test.ts tests/trace_acceptance.py public/images/traces/dai-doan-ket/present-day-tension.jpg public/images/traces/dao-duc-trach-nhiem/present-day-decision.jpg public/images/traces/dao-duc-trach-nhiem/1958-dao-duc-cach-mang-original.jpg
git commit -m "fix: replace semantically weak trace assets"
```

- [ ] **Step 4: Push and update PR #1**

```text
git push origin phase-8-historical-assets
gh pr edit 1 --repo anhnhat432/HCM --add-label "image-art-direction"
```

If the label does not exist, omit the label without creating repository
configuration. Update the PR body with the three new sources, licenses, visual
changes, verification results, and confirmation that the 1945 asset is unchanged.

- [ ] **Step 5: Inspect checks and stop without merging**

```text
gh pr checks 1 --repo anhnhat432/HCM --watch
```

Report the implementation commit, branch, PR URL, available check state, three
sources and licenses, final screenshot paths, and the unchanged 1945 status.
