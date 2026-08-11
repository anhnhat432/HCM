# Public Release Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve low-height usability, source-action hierarchy, public metadata, and release QA while preserving the approved ĐUỐC HỒNG experience.

**Architecture:** Keep all existing server/client boundaries. Implement visual changes in existing CSS and one historical action wrapper; add server-only metadata route files and a static methodology page; extend the existing Python and Node acceptance suites.

**Tech Stack:** Next.js 16.3 App Router, React 19, TypeScript, CSS, Node test runner, Python Playwright.

## Global Constraints

- Preserve existing routes, Trace architecture, content, assets, branding, typography, and interaction model.
- Add no runtime dependency and no analytics or external data sink.
- Use `https://hcm-trace.vercel.app` as the verified fallback origin and allow `NEXT_PUBLIC_SITE_URL` to override it.
- Write each behavioral test before production implementation and verify RED then GREEN.
- Do not merge without a later explicit user request.

---

### Task 1: Low-height and mobile fold polish

**Files:**
- Modify: `tests/homepage_acceptance.py`
- Modify: `tests/trace_acceptance.py`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: existing `.primary-action`, `.trace-text-link`, `.journey-closing__topics`, and mobile Trace opening selectors.
- Produces: low-height responsive rules that leave default desktop styling unchanged.

- [ ] Add laptop assertions that Homepage and Trace primary actions end within the first viewport, plus mobile assertions that the central question begins within the first viewport.
- [ ] Run production acceptance and confirm those assertions fail on current CSS.
- [ ] Add a desktop/laptop `max-height` media query and a compact mobile Trace opening scale.
- [ ] Re-run Homepage and Trace acceptance and confirm the new fold assertions pass without overflow.

### Task 2: Historical action hierarchy

**Files:**
- Modify: `components/trace/historical-moment.tsx`
- Modify: `app/globals.css`
- Modify: `tests/trace-enhancements.test.ts`
- Modify: `tests/trace_acceptance.py`

**Interfaces:**
- Consumes: `SourceDrawer`, `.source-drawer-trigger`, and `.trace-sequence-link`.
- Produces: `.historical-moment__actions`, with the source utility before a visually stronger sequence link.

- [ ] Add a rendering test for the action wrapper and an acceptance assertion that source and sequence actions occupy separate rows.
- [ ] Run the targeted tests and confirm RED because the wrapper does not exist.
- [ ] Wrap the two actions and add minimal hierarchy/spacing CSS.
- [ ] Re-run targeted tests and confirm GREEN.

### Task 3: Public-release metadata and methodology

**Files:**
- Create: `lib/site.ts`
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Create: `app/phuong-phap/page.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Modify: `app/trace/[slug]/page.tsx`
- Modify: `components/trace/journey-closing.tsx`
- Modify: `data/journey-closing.ts`
- Modify: `types/trace.ts`
- Modify: `app/globals.css`
- Modify: `tests/trace-enhancements.test.ts`
- Modify: `tests/homepage_acceptance.py`
- Modify: `tests/trace_acceptance.py`

**Interfaces:**
- Consumes: Trace registry data and existing image paths.
- Produces: `siteUrl`, canonical metadata, route discovery files, and `/phuong-phap`.

- [ ] Add unit tests for the verified origin, sitemap route set, robots sitemap URL, and data-driven methodology action.
- [ ] Add browser assertions for canonical URLs, unique Trace Open Graph images, and methodology-page structure.
- [ ] Run targeted tests and confirm RED because the metadata routes/page do not exist.
- [ ] Implement the server-only metadata files, methodology page, and data-driven links.
- [ ] Re-run targeted and acceptance tests and confirm GREEN.

### Task 4: Deep release QA

**Files:**
- Create: `docs/accessibility-qa.md`
- Modify: `tests/homepage_acceptance.py`
- Modify: `tests/trace_acceptance.py`
- Modify: `docs/release-readiness.md`

**Interfaces:**
- Consumes: existing production acceptance helpers and public routes.
- Produces: 640px reflow and forced-colors browser gates plus manual screen-reader steps.

- [ ] Add 640px reflow-equivalent and forced-colors browser cases with overflow, focus, navigation, and dialog checks.
- [ ] Run the acceptance suites and fix only genuine failures uncovered by the new modes.
- [ ] Run Lighthouse against the production build for Homepage and Trace 01 and record fresh lab scores.
- [ ] Document automated evidence, Lighthouse results, and the exact NVDA/TalkBack manual checklist, clearly marking checks that cannot run in this environment.

### Task 5: Final verification and publication

**Files:**
- Verify all files changed by Tasks 1–4.

**Interfaces:**
- Consumes: completed implementation and tests.
- Produces: one reviewed commit and one non-draft pull request.

- [ ] Run `npm test` and confirm every test passes.
- [ ] Run `npm run typecheck`, `npm run lint`, and `npm run build` with zero errors.
- [ ] Run Homepage and Trace production acceptance across normal, low-height, reflow-equivalent, forced-colors, and reduced-motion modes.
- [ ] Inspect screenshots at 1366x768 and 390x844 and confirm the approved visual identity remains intact.
- [ ] Stage only scoped files, commit, push the feature branch, and open one non-draft PR against `main`.
