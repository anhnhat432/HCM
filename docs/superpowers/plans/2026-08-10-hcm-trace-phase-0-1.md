# HCM // TRACE Phase 0-1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Next.js foundation and a responsive editorial Homepage for HCM // TRACE without implementing Trace 01.

**Architecture:** Use Next.js App Router with Server Components by default, a local typed trace registry, statically generated placeholder trace routes, and two small Client Components for purposeful motion. The Homepage reads topic content from the registry and presents it as an editorial sequence rather than a card dashboard.

**Tech Stack:** Next.js 16, React 19, TypeScript strict, Tailwind CSS 4, Framer Motion 13, next/font, Node test runner through tsx.

## Global Constraints

- Public routes are `/`, `/trace/dai-doan-ket`, `/trace/dao-duc-trach-nhiem`, and `/trace/con-nguoi`.
- Closing remains a future section at the end of Trace 03, not a route.
- Each Trace has exactly three Historical Moments.
- `HistoricalMoment` has no detail field.
- Native scrolling only.
- Server Components are the default.
- Do not implement Trace 01 content or components.
- Homepage body text is at least 16px on mobile.
- Respect `prefers-reduced-motion`.

---

### Task 1: Scaffold the Application Foundation

**Files:**

- Create through official scaffold: `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`
- Create through official scaffold: `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- Modify: `package.json`

**Interfaces:**

- Produces npm scripts `dev`, `build`, `lint`, `typecheck`, and `test`.
- Produces alias `@/*` mapped to the repository root.

- [ ] **Step 1: Generate a clean App Router scaffold outside the non-empty repository and copy it into the repository root**

Use create-next-app 16 with TypeScript, Tailwind, ESLint, App Router, npm,
empty template, no generated Git repository, and no dependency install in the
temporary folder.

- [ ] **Step 2: Install production and development dependencies**

Run:

```powershell
npm install
npm install framer-motion
npm install --save-dev tsx
```

- [ ] **Step 3: Add verification scripts**

`package.json` must contain:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "tsx --test tests/**/*.test.ts"
  }
}
```

- [ ] **Step 4: Confirm strict TypeScript and root alias**

Expected `tsconfig.json` requirements:

```json
{
  "compilerOptions": {
    "strict": true,
    "paths": { "@/*": ["./*"] }
  }
}
```

### Task 2: Build the Trace Registry Test-First

**Files:**

- Create: `tests/trace-registry.test.ts`
- Create: `types/trace.ts`
- Create: `data/traces.ts`
- Create: `lib/trace-registry.ts`
- Create: `lib/trace-themes.ts`

**Interfaces:**

- Produces `TRACE_SLUGS`, `TraceSlug`, `TraceData`, `traces`,
  `getTraceBySlug(slug)`, and `getNextTraceSlug(slug)`.

- [ ] **Step 1: Write failing registry tests**

The tests must assert:

```ts
import assert from "node:assert/strict";
import test from "node:test";
import { traces } from "@/data/traces";
import { getNextTraceSlug, getTraceBySlug } from "@/lib/trace-registry";

test("registry exposes exactly three uniquely ordered traces", () => {
  assert.equal(traces.length, 3);
  assert.deepEqual(traces.map((trace) => trace.order), [1, 2, 3]);
  assert.equal(new Set(traces.map((trace) => trace.slug)).size, 3);
});

test("lookup returns a trace only for a known slug", () => {
  assert.equal(getTraceBySlug("dai-doan-ket")?.title, "Đại đoàn kết");
  assert.equal(getTraceBySlug("khong-ton-tai"), undefined);
});

test("next trace follows the approved journey order", () => {
  assert.equal(getNextTraceSlug("dai-doan-ket"), "dao-duc-trach-nhiem");
  assert.equal(getNextTraceSlug("dao-duc-trach-nhiem"), "con-nguoi");
  assert.equal(getNextTraceSlug("con-nguoi"), null);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run `npm test`. Expected failure: trace registry modules do not exist.

- [ ] **Step 3: Implement minimal immutable types and registry data**

`HistoricalMoment` contains only `year`, `title`, `summary`, optional `image`,
and optional `sources`. Placeholder history content remains empty because Phase 1
only requires Homepage summaries.

- [ ] **Step 4: Implement registry helpers**

Required signatures:

```ts
export function getTraceBySlug(slug: string): TraceData | undefined;
export function getNextTraceSlug(slug: TraceSlug): TraceSlug | null;
```

- [ ] **Step 5: Run `npm test` and verify GREEN**

Expected: 3 tests pass and 0 fail.

### Task 3: Add Routing and Font Foundations

**Files:**

- Modify: `app/layout.tsx`
- Create: `app/not-found.tsx`
- Create: `app/trace/[slug]/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**

- Consumes `TraceData`, `traces`, and `getTraceBySlug`.
- Produces three statically generated placeholder trace routes.

- [ ] **Step 1: Configure next/font**

Use Newsreader for display text and IBM Plex Sans for body/metadata. Expose both
as CSS variables from `RootLayout` and verify Vietnamese copy compiles.

- [ ] **Step 2: Add static trace route generation**

`generateStaticParams` returns all three slugs. Invalid slugs call `notFound()`.
The placeholder contains only brand, `01 / 03`, topic title, a short message that
the trace will be implemented later, and a link home.

- [ ] **Step 3: Add semantic tokens and container utilities**

Define color, type, spacing, focus, reduced-motion, and responsive container
tokens in `app/globals.css` without adding a component library.

- [ ] **Step 4: Run `npm run typecheck` and `npm run lint`**

Expected: both commands exit 0.

### Task 4: Define Homepage Acceptance Before Implementation

**Files:**

- Create: `tests/homepage_acceptance.py`

**Interfaces:**

- Tests the rendered application at `http://127.0.0.1:3000`.

- [ ] **Step 1: Write a Playwright acceptance script**

The script must check:

- one `h1` containing both approved headline sentences;
- one primary link named `Bắt đầu hành trình` with Trace 01 href;
- the topic heading `Bạn muốn khám phá điều gì?`;
- three topic links with correct titles and hrefs;
- no horizontal overflow at a 390px viewport;
- no browser console errors;
- screenshots at 1920x1080 and 390x844.

- [ ] **Step 2: Run against the scaffold and verify RED**

Use the webapp-testing `with_server.py` helper. Expected failure: the approved
Homepage headline and links are not present.

### Task 5: Implement the Homepage

**Files:**

- Modify: `app/page.tsx`
- Create: `components/home/hero-trace-visual.tsx`
- Create: `components/home/reveal.tsx`
- Create: `components/home/topic-list.tsx`
- Modify: `app/globals.css`

**Interfaces:**

- Consumes `traces` from `data/traces.ts`.
- Produces an accessible, responsive Homepage with one primary CTA.

- [ ] **Step 1: Implement the server-rendered page composition**

Use semantic `main`, `header`, and `section` landmarks. The hero contains the
brand, approved headline, supporting copy, one CTA, and the Trace Line preview.
The topic section maps the three registry items into full-width editorial links.

- [ ] **Step 2: Implement restrained Client Components**

`Reveal` handles one-time opacity/vertical reveals and respects reduced motion.
`HeroTraceVisual` draws the Trace Line once and renders statically for reduced
motion. Neither component owns content or navigation.

- [ ] **Step 3: Implement editorial responsive styling**

Desktop uses an asymmetric hero split and wide topic rows. Mobile uses a single
column, at least 16px body text, at least 44px targets, no hover dependency, and
no horizontal scrolling. Avoid rounded card containers and decorative boxes.

- [ ] **Step 4: Run the acceptance script and verify GREEN**

Expected: all assertions pass, screenshots are generated, and console error list
is empty.

### Task 6: Review, Verify, and Integrate Phase 0-1

**Files:**

- Review all changed files.
- Do not create Trace 01 components or content.

- [ ] **Step 1: Inspect desktop and mobile screenshots**

Review hierarchy, CTA dominance, topic clickability, content density, motion
restraint, and whether mobile looks intentionally composed.

- [ ] **Step 2: Correct verified UX issues with test-first coverage where behavior changes**

Do not add sections or interactions outside the approved specification.

- [ ] **Step 3: Run the complete verification gate**

```powershell
npm test
npm run typecheck
npm run lint
npm run build
git diff --check
```

Expected: every command exits 0.

- [ ] **Step 4: Commit Phase 0-1**

Commit only the approved Foundation, Homepage, tests, and design documentation.

