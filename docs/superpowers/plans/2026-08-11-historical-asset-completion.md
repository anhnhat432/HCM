# Phase 8 Historical Asset Completion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Execute inline in this repository; do not dispatch subagents.

**Goal:** Replace the four remaining Trace placeholders with exact, rights-safe historical documents or event photography while preserving the existing Phase 7 renderer and layout.

**Architecture:** The existing `TraceImage` taxonomy remains the only rendering contract. Research produces a committed provenance manifest, processed derivatives are added under the existing Trace image directories, and `data/traces.ts` supplies exact source, rights, kind, fit, aspect, tone, and crop metadata to the shared renderer.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS, Node test runner, Python Pillow, Python Playwright, Wikimedia Commons API, GitHub CLI.

## Global Constraints

- Scope is limited to Trace 02 years 1947 and 1958, and Trace 03 years 1958 and 1969.
- Do not redesign Homepage or Trace layouts, change typography, rewrite historical content, add interactions, or replace any currently approved image.
- Do not use AI-generated, generic, modern, foreign-context, year-adjacent, or semantically ambiguous historical imagery.
- Accept only an exact document or event asset whose provenance and usage basis pass the approved design gate.
- Keep a placeholder when an exact rights-safe asset cannot be established; never replace certainty with a misleading image.
- Documents retain page boundaries and use `contain`; the 1958 teacher event retains people and setting in a landscape frame.
- Preserve existing `TraceImage` types, renderer architecture, routes, responsive behavior, accessibility, and reduced motion.
- Run all required unit, type, lint, build, Homepage, and Trace production acceptance gates.
- Work on branch `phase-8-historical-assets`, push the branch, and open a pull request to `main`; do not merge.

---

### Task 1: Research And Lock Four Rights-Safe Sources

**Files:**
- Create: `docs/image-sources/phase-8-historical-assets.md`
- Read: `data/traces.ts`
- Read: `docs/superpowers/specs/2026-08-11-historical-asset-completion-design.md`
- Output outside repository: `C:/Users/admin/.codex/visualizations/2026/08/11/phase8-source-assets/`

**Interfaces:**
- Consumes: the four exact moment identities and source/rights gate in the approved design spec.
- Produces: four accepted source records with stable keys `trace-02-1947`, `trace-02-1958`, `trace-03-1958`, and `trace-03-1969`.
- Each record contains: `subject`, `sourcePageUrl`, `originalFileUrl`, `ownerOrCreator`, `license`, `usageStatus`, `verificationStatus`, `caption`, `alt`, `kind`, `fit`, `aspectRatio`, `tone`, `background`, and optional `objectPosition`.

- [ ] **Step 1: Search Wikimedia Commons for exact subjects**

Run focused MediaWiki API searches, preserving JSON responses outside the
repository. Use these exact query families:

```powershell
$auditRoot = 'C:\Users\admin\.codex\visualizations\2026\08\11\phase8-source-assets'
New-Item -ItemType Directory -Force -Path $auditRoot | Out-Null
$queries = @(
  'Sửa đổi lối làm việc Hồ Chí Minh 1947',
  'Đạo đức cách mạng Tạp chí Học tập 1958',
  'Hồ Chí Minh lớp học chính trị giáo viên 1958',
  'Di chúc Hồ Chí Minh 1969 manuscript'
)
foreach ($query in $queries) {
  $uri = 'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrlimit=20&prop=imageinfo&iiprop=url%7Cextmetadata&format=json&origin=*&gsrsearch=' + [uri]::EscapeDataString($query)
  $safeName = ($query -replace '[^\p{L}\p{N}]+', '-').Trim('-')
  Invoke-RestMethod -Uri $uri | ConvertTo-Json -Depth 20 | Set-Content -Encoding utf8 (Join-Path $auditRoot "$safeName.json")
}
```

Expected: each JSON file records file titles, source pages, original image URLs,
and Commons license metadata for manual semantic review.

- [ ] **Step 2: Inspect official Vietnamese source pages already tied to the content**

Inspect the existing source URLs in `data/traces.ts` for the exact document or
event image and its caption/provenance:

```text
1947: tulieuvankien.dangcongsan.vn article on 60 years of Sửa đổi lối làm việc
1958 work: baotanghochiminh.vn page for Đạo đức cách mạng, Tạp chí Học tập issue 12
1958 event: baotanghochiminh.vn chronology page for the political class of teachers
1969: baochinhphu.vn full text of the Di chúc
```

Record the page title, image URL, visible caption, owner, and reuse statement.
Do not infer that an image is reusable merely because it is publicly visible.

- [ ] **Step 3: Apply the semantic and rights gates**

Accept a source only when all statements below are true:

```text
The source identifies the exact work or event.
The image itself preserves identifying document or event evidence.
The file page or authoritative source identifies its owner or creator.
The license is Public Domain, CC0, CC BY, compatible CC, or covered by the existing owner-approved historical-asset policy.
The asset works as a document contain-frame or contextual landscape event photograph.
```

If any of the four keys has no acceptable source, stop before changing tests or
production data and report the exact failed gate.

- [ ] **Step 4: Download accepted originals outside the repository**

Use each record's `originalFileUrl` and preserve its original filename:

```powershell
Invoke-WebRequest -Uri $originalFileUrl -OutFile (Join-Path $auditRoot $originalFilename)
```

Verify MIME type, dimensions, and SHA-256:

```powershell
Get-FileHash -Algorithm SHA256 (Join-Path $auditRoot $originalFilename)
py -3 -c "from PIL import Image; p=r'$fullPath'; im=Image.open(p); print(im.format, im.size, im.mode)"
```

- [ ] **Step 5: Write the provenance manifest**

Create `docs/image-sources/phase-8-historical-assets.md` with one section per
stable key. Include every interface field, the SHA-256 of the downloaded
original, a concise semantic-fit rationale, any foreign/contextual cue review,
crop assessment, grayscale assessment, and the explicit reason the rights gate
passes.

- [ ] **Step 6: Review and commit the manifest**

Run:

```text
rg -n "TBD|TODO|unknown|unclear" docs/image-sources/phase-8-historical-assets.md
git diff --check
```

Expected: no incomplete provenance field and no whitespace error.

Commit:

```text
docs: record historical asset sources
```

---

### Task 2: Write Failing Registry And Browser Requirements

**Files:**
- Modify: `tests/trace-registry.test.ts`
- Modify: `tests/trace_acceptance.py`
- Read: `docs/image-sources/phase-8-historical-assets.md`

**Interfaces:**
- Consumes: the four accepted manifest records from Task 1.
- Produces: failing tests that require exact production paths, complete provenance, no remaining placeholders, three document presentations, and one landscape historical photograph.

- [ ] **Step 1: Replace the four placeholder expectations in registry tests**

Set `expectedPlaceholders` to an empty set and add the four production paths to
the historical image map:

```ts
const expectedPlaceholders = new Set<string>();

const phase8Assets = new Map([
  ["dao-duc-trach-nhiem:1947", "/images/traces/dao-duc-trach-nhiem/1947-sua-doi-loi-lam-viec.jpg"],
  ["dao-duc-trach-nhiem:1958", "/images/traces/dao-duc-trach-nhiem/1958-dao-duc-cach-mang.jpg"],
  ["con-nguoi:1958", "/images/traces/con-nguoi/1958-political-class-teachers.jpg"],
  ["con-nguoi:1969", "/images/traces/con-nguoi/1969-testament.jpg"],
]);
```

Assert for each image:

```ts
assert.equal(image?.src, expectedPath);
assert.equal(image?.isPlaceholder, undefined);
assert.equal(image?.verificationStatus, "verified");
assert.notEqual(image?.usageStatus, "not-applicable");
assert.ok(image?.sourceUrl);
assert.ok(image?.credit);
assert.ok(image?.license || image?.usageNote);
```

- [ ] **Step 2: Require the approved presentation kinds**

Update the presentation test so the three written works are `document` with
`contain`, `document`, and `paper`, while the teacher event is
`historical-photo` with `landscape`:

```ts
assert.equal(work1947?.kind, "document");
assert.equal(article1958?.kind, "document");
assert.equal(testament1969?.kind, "document");
assert.equal(teacherEvent1958?.kind, "historical-photo");
assert.equal(teacherEvent1958?.presentation?.aspectRatio, "landscape");
```

- [ ] **Step 3: Update browser presentation cases and focused screenshots**

Use these expected presentation tuples:

```python
"trace-02": [
    ("1927", "document", "contain", "document"),
    ("1947", "document", "contain", "document"),
    ("1958", "document", "contain", "document"),
],
"trace-03": [
    ("1945", "historical-photo", "cover", "landscape"),
    ("1958", "historical-photo", "cover", "landscape"),
    ("1969", "document", "contain", "document"),
],
```

Set both placeholder counts to `0` and add focused captures:

```python
FOCUSED_MOMENTS = {
    "trace-01": ["1930", "1941", "1945"],
    "trace-02": ["1927", "1947", "1958"],
    "trace-03": ["1958", "1969"],
}
```

- [ ] **Step 4: Run unit tests and verify RED**

Run:

```text
npm test
```

Expected: failures identify the four placeholder image blocks, missing paths,
and placeholder presentation kinds. Existing unrelated tests remain green.

---

### Task 3: Produce Non-Destructive Production Derivatives

**Files:**
- Create: `public/images/traces/dao-duc-trach-nhiem/1947-sua-doi-loi-lam-viec.jpg`
- Create: `public/images/traces/dao-duc-trach-nhiem/1958-dao-duc-cach-mang.jpg`
- Create: `public/images/traces/con-nguoi/1958-political-class-teachers.jpg`
- Create: `public/images/traces/con-nguoi/1969-testament.jpg`
- Read: `docs/image-sources/phase-8-historical-assets.md`

**Interfaces:**
- Consumes: accepted original files and SHA-256 records from Task 1.
- Produces: four RGB JPEG derivatives, maximum dimension 2400 pixels, quality 92, with no semantic crop.

- [ ] **Step 1: Generate document derivatives without cropping**

Run this Pillow process for the 1947, Trace 02 1958, and 1969 originals:

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

Do not use `ImageOps.fit`, center crop, or edge trimming. Page boundaries,
titles, signatures, stamps, and publication identity remain visible.

- [ ] **Step 2: Generate the event photograph derivative without removing context**

Use the same orientation, RGB conversion, maximum dimension, and JPEG settings.
Do not crop people or setting. Crop refinement, if required, is expressed later
through `presentation.objectPosition` after in-layout review.

- [ ] **Step 3: Verify derivatives**

Run:

```powershell
Get-FileHash -Algorithm SHA256 public\images\traces\dao-duc-trach-nhiem\1947-sua-doi-loi-lam-viec.jpg
Get-FileHash -Algorithm SHA256 public\images\traces\dao-duc-trach-nhiem\1958-dao-duc-cach-mang.jpg
Get-FileHash -Algorithm SHA256 public\images\traces\con-nguoi\1958-political-class-teachers.jpg
Get-FileHash -Algorithm SHA256 public\images\traces\con-nguoi\1969-testament.jpg
```

Inspect dimensions with Pillow and view all four files before changing data.

---

### Task 4: Replace Placeholder Data With Exact Manifest Metadata

**Files:**
- Modify: `data/traces.ts`
- Test: `tests/trace-registry.test.ts`
- Test: `tests/trace-image-presentation.test.ts`

**Interfaces:**
- Consumes: four production paths from Task 3 and exact provenance fields from the manifest.
- Produces: four non-placeholder `TraceImage` objects using the existing schema and renderer.

- [ ] **Step 1: Replace Trace 02 year 1947**

Use the fixed production path and document presentation:

```ts
src: "/images/traces/dao-duc-trach-nhiem/1947-sua-doi-loi-lam-viec.jpg",
kind: "document",
presentation: {
  fit: "contain",
  aspectRatio: "document",
  tone: "natural",
  objectPosition: "50% center",
  background: "paper",
},
```

Copy `alt`, `caption`, `credit`, `sourceUrl`, `verificationStatus`,
`usageStatus`, `license`, and any `usageNote` exactly from manifest key
`trace-02-1947`. Remove `isPlaceholder`.

- [ ] **Step 2: Replace Trace 02 year 1958**

Use path
`/images/traces/dao-duc-trach-nhiem/1958-dao-duc-cach-mang.jpg`, the same
document presentation, and exact manifest key `trace-02-1958`. Remove
`isPlaceholder`.

- [ ] **Step 3: Replace Trace 03 year 1958**

Use path `/images/traces/con-nguoi/1958-political-class-teachers.jpg` and:

```ts
kind: "historical-photo",
presentation: {
  fit: "cover",
  aspectRatio: "landscape",
  tone: "archival",
  objectPosition: "50% center",
  background: "neutral",
},
```

Copy exact manifest key `trace-03-1958` and remove `isPlaceholder`.

- [ ] **Step 4: Replace Trace 03 year 1969**

Use path `/images/traces/con-nguoi/1969-testament.jpg`, the document
presentation, and exact manifest key `trace-03-1969`. Remove `isPlaceholder`.

- [ ] **Step 5: Run unit tests and verify GREEN**

Run:

```text
npm test
```

Expected: all registry, taxonomy, provenance, and existing narrative tests pass.

---

### Task 5: Run Production Browser Acceptance And Two Visual Passes

**Files:**
- Modify only when evidence requires: `data/traces.ts`
- Modify only when evidence requires: `app/globals.css`
- Output outside repository: `C:/Users/admin/.codex/visualizations/2026/08/11/phase8-final-artifacts/`

**Interfaces:**
- Consumes: production build and four integrated assets.
- Produces: desktop, laptop, mobile, reduced-motion, and focused screenshots with accepted crop/fit decisions.

- [ ] **Step 1: Build and start production**

Run:

```text
npm run build
.\node_modules\.bin\next.cmd start -p 3700
```

- [ ] **Step 2: Run Homepage and Trace acceptance**

Run with screenshot directories outside the repository:

```powershell
$env:HCM_BASE_URL='http://localhost:3700'
$env:HCM_SCREENSHOT_DIR='C:\Users\admin\.codex\visualizations\2026\08\11\phase8-final-artifacts\homepage'
py -3 tests\homepage_acceptance.py
$env:HCM_TRACE_SCREENSHOT_DIR='C:\Users\admin\.codex\visualizations\2026\08\11\phase8-final-artifacts\traces-pass-1'
py -3 tests\trace_acceptance.py
```

Expected: Homepage regression passes; all Trace routes pass with zero
placeholders and no overflow or browser console error.

- [ ] **Step 3: Review Pass 1**

Inspect the four focused screenshots at 1920x1080 and full Trace pages at
1920x1080, 1366x768, and 390x844. Verify complete document boundaries,
recognizable title/signature/stamp details, intentional paper negative space,
mobile height, and contextual people/setting for the event photograph.

- [ ] **Step 4: Apply only evidence-backed presentation corrections**

Allowed corrections are limited to:

```text
presentation.fit
presentation.objectPosition
presentation.tone
presentation.background
existing shared document-frame padding when all document assets require it
```

Do not alter content, route, layout, typography, animation, or component
architecture.

- [ ] **Step 5: Capture and review Pass 2**

Run Trace acceptance again with:

```powershell
$env:HCM_TRACE_SCREENSHOT_DIR='C:\Users\admin\.codex\visualizations\2026\08\11\phase8-final-artifacts\traces-final'
py -3 tests\trace_acceptance.py
```

Expected: the second pass resolves every crop, readability, excessive-height,
or context issue found in Pass 1.

---

### Task 6: Final Verification, Commit, Push, And Pull Request

**Files:**
- Review all modified source, test, manifest, CSS, and image files.

**Interfaces:**
- Consumes: visually approved Phase 8 implementation.
- Produces: one implementation commit and one open pull request; no merge.

- [ ] **Step 1: Run the full fresh gate**

Stop the production server, then run in order:

```text
npm test
npm run typecheck
npm run lint
npm run build
```

Start the final build and rerun Homepage and Trace production acceptance with
desktop, laptop, mobile, and reduced motion.

- [ ] **Step 2: Inspect final scope**

Run:

```text
git diff --check
git status --short
git diff --stat
git diff --name-status
```

Expected: only the provenance manifest, four assets, Trace data, and required
test or narrowly justified presentation changes appear.

- [ ] **Step 3: Commit implementation**

Stage only Phase 8 implementation files and commit:

```text
feat: complete historical trace assets
```

- [ ] **Step 4: Verify branch and push**

Run:

```text
git status --short --branch
git log -3 --oneline
git push -u origin phase-8-historical-assets
```

- [ ] **Step 5: Open the pull request**

Run:

```text
gh pr create --base main --head phase-8-historical-assets --title "feat: complete historical trace assets" --body "Completes the four evidence-first historical assets documented in docs/image-sources/phase-8-historical-assets.md. Preserves the Phase 7 renderer and existing layouts. Verification: npm test, typecheck, lint, build, Homepage production acceptance, and Trace production acceptance. No placeholders remain in the approved four-moment scope."
```

The PR body reports the four selected sources and licenses, visual treatment,
remaining placeholders, tests/build, production acceptance, and confirms that
Homepage and existing Trace architecture remain unchanged.

- [ ] **Step 6: Watch checks without merging**

Run:

```text
gh pr checks --watch
```

Report the implementation commit hash, pushed branch, PR URL, CI state, exact
sources/licenses, final placeholder count, and final screenshot paths. Stop
without merging.
