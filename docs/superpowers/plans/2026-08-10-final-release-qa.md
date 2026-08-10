# Final Release QA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Verify the complete Đuốc Hồng journey and close only evidence-backed release gaps without redesigning, changing historical narratives, or deploying.

**Architecture:** Keep the existing App Router pages and trace composition unchanged. Add release metadata through the existing root layout and dynamic trace page, strengthen acceptance checks around metadata and navigation, then record evidence and blockers in one concise release-readiness document.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Node test runner, Python Playwright acceptance scripts, Framer Motion.

## Global Constraints

- Do not redesign, add features, alter the trace architecture, replace historical placeholders, or deploy.
- Preserve verified historical narratives unless a factual or copy defect is proven.
- Keep ĐUỐC HỒNG as the only user-facing product brand.
- Treat historical assets with `usageStatus: "needs-review"` as unresolved for public release.
- Run `npm test`, `npm run typecheck`, `npm run lint`, and `npm run build` before committing.

---

### Task 1: Release metadata and production copy

**Files:**
- Modify: `tests/homepage_acceptance.py`
- Modify: `tests/trace_acceptance.py`
- Modify: `app/layout.tsx`
- Modify: `app/trace/[slug]/page.tsx`
- Modify: `app/not-found.tsx`
- Modify: `app/page.tsx`
- Modify: `README.md`

**Interfaces:**
- Consumes: existing `TraceData.title` and `TraceData.cardSummary` from `data/traces.ts`.
- Produces: page titles, descriptions, and Open Graph metadata for the Homepage, each Trace, and 404 state.

- [x] **Step 1: Write failing release metadata assertions**

Update acceptance expectations to require:

```python
assert page.title() == "Đuốc Hồng"
assert page.locator('meta[name="description"]').get_attribute("content")
assert page.locator('meta[property="og:site_name"]').get_attribute("content") == "Đuốc Hồng"
assert page.locator('meta[property="og:locale"]').get_attribute("content") == "vi_VN"
```

For each Trace, require `f"{trace_case['title']} | Đuốc Hồng"`. For 404, require `"Không tìm thấy | Đuốc Hồng"`. Require the Homepage footer to contain `ĐUỐC HỒNG — 2026` and no `Prototype` copy.

- [x] **Step 2: Run acceptance against the existing production build and confirm failure**

Run the current production server on an unused port and execute:

```powershell
$env:HCM_BASE_URL='http://localhost:3700'
python tests\homepage_acceptance.py
python tests\trace_acceptance.py
```

Expected: metadata/title or footer assertions fail because the current build still exposes the pre-release metadata.

- [x] **Step 3: Implement minimal Next.js metadata**

Use root metadata with a title template and Open Graph defaults:

```ts
export const metadata: Metadata = {
  title: { default: "Đuốc Hồng", template: "%s | Đuốc Hồng" },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "Đuốc Hồng",
    description: SITE_DESCRIPTION,
    siteName: "Đuốc Hồng",
    locale: "vi_VN",
    type: "website",
  },
};
```

Add `generateMetadata` to `app/trace/[slug]/page.tsx`, using the trace title and existing `cardSummary`. Return `Không tìm thấy` metadata for unknown slugs. Add explicit 404 metadata, replace the Homepage footer `Prototype` label, and update the stale README phase/brand text.

- [x] **Step 4: Rebuild and verify metadata assertions pass**

Run `npm run build`, start the production server, and rerun both acceptance scripts. Expected: Homepage, three Trace titles, Open Graph fields, and 404 metadata pass.

### Task 2: Full journey, responsive, keyboard, source, and runtime audit

**Files:**
- Modify only if a reproducible release-critical defect is found.
- Capture temporary evidence under `artifacts/phase6-audit/`; remove it before commit.

**Interfaces:**
- Consumes: production build and all public/internal routes.
- Produces: current-run screenshots, route/link evidence, accessibility observations, and release issue classification.

- [x] **Step 1: Capture full journey and direct-entry evidence**

Use the in-app Browser against the production server. Capture Homepage, Trace 01, Trace 02, Trace 03, and Closing in journey order. Open each Trace directly and confirm the route remains understandable without prior context.

- [x] **Step 2: Verify responsive behavior**

Check 1920×1080, 1440×900, 1366×768, 1024×768, 768×1024, 390×844, and 375×812 when supported. Record overflow, clipping, crop, sticky header, source text, CTA, touch target, formation, and closing results.

- [x] **Step 3: Verify keyboard and accessibility behavior**

Confirm skip link, logical Tab order, visible focus, Enter activation, no keyboard trap, one H1, heading hierarchy, landmarks, informative image alternatives, 44px touch targets, and reduced-motion comprehension. Run an automated accessibility scan only if a scanner is already available locally; do not install a new framework solely for this phase.

- [x] **Step 4: Verify error, link, source, console, and network states**

Check `/trace/khong-ton-tai`, root 404, every internal navigation link, historical source anchors, image requests, font requests, console errors, hydration warnings, and horizontal overflow. Validate external sources best-effort with HTTP checks.

- [x] **Step 5: Assess timing and performance**

Measure scroll/read burden without artificial delays and confirm each Trace remains within the intended 1.5–2 minute reading budget. Run Lighthouse for Homepage and Trace 01 only if an installed Lighthouse executable is available; otherwise record that numeric scores are unavailable. Audit Next Image priority/lazy loading, font loading, client boundaries, and hydration from code/runtime evidence.

### Task 3: Release-readiness record and final verification

**Files:**
- Create: `docs/release-readiness.md`
- Modify: `docs/superpowers/plans/2026-08-10-final-release-qa.md` only to mark executed steps if useful.

**Interfaces:**
- Consumes: Task 1 metadata results and Task 2 audit evidence.
- Produces: concise release status, asset matrix, limitations, blockers, and deploy prerequisites.

- [x] **Step 1: Write `docs/release-readiness.md`**

Include current status, verified routes, verified breakpoints, tests, historical asset status, known limitations, blockers, and deployment prerequisites. Classify the four unresolved historical-rights assets as public-release blockers unless usage permission is cleared or the assets are replaced with neutral placeholders.

- [x] **Step 2: Run cleanup scans**

Search for user-facing `HCM // TRACE`, `Prototype`, obsolete TODOs, debug logging, commented implementation, stale screenshots, and dead internal links. Preserve historical placeholder metadata that remains valid.

- [x] **Step 3: Run final gates sequentially**

```powershell
npm test
npm run typecheck
npm run lint
npm run build
```

Then rerun production acceptance, reduced motion, console/network checks, and `git diff --check`.

- [x] **Step 4: Commit**

```powershell
git add app README.md tests docs
git commit -m "chore: complete final release qa"
```

Confirm the working tree is clean and report the commit hash. Do not deploy.
