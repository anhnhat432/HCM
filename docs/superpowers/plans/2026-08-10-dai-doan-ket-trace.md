# Dai Doan Ket Trace Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the complete native-scrolling `/trace/dai-doan-ket` experience as the reusable master template for future traces while leaving the approved Homepage and the other two trace routes unchanged.

**Architecture:** Keep the App Router route as a Server Component that selects trace data and renders a reusable trace composition only when complete experience data exists. Store all narrative content in `data/traces.ts`; use small Server Components for sections and two focused Client Components for viewport reveals and Trace Line motion.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS, Framer Motion 13, Node test runner, Python Playwright acceptance tests.

## Global Constraints

- Figma Make is the visual and UX source of truth; `C:\HCM` is the technical source of truth.
- Do not redesign or modify the approved Homepage.
- Preserve the sequence `2026 -> Trace Back -> 1930 -> 1941 -> 1945 -> Thought Formation -> Return to 2026 -> Application -> Next Trace`.
- Keep exactly three historical moments in chronological order.
- Use native scrolling with no scroll hijacking, parallax, particles, custom cursor, quiz, cards, modal, accordion, carousel, or progress percentage.
- Keep motion limited to reveal, Trace Line, time transition, image entrance, and subtle CTA hover.
- Preserve semantic headings, visible focus, keyboard access, alt text, 44px touch targets, contrast, and reduced-motion behavior.
- Validate at 1920x1080, 1366x768, 390x844, and reduced motion.
- Stop after Trace 01; do not implement Trace 02 or Trace 03.

---

### Task 1: Extend the trace content contract with test-first coverage

**Files:**
- Modify: `tests/trace-registry.test.ts`
- Modify: `types/trace.ts`
- Modify: `data/traces.ts`

**Interfaces:**
- Produces: `TracePresentDay`, `TraceFormation`, `TraceApplication`, richer `HistoricalMoment`, and optional complete experience fields on `TraceData`.
- Produces: Trace 01 data with three chronological moments and a next route of `/trace/dao-duc-trach-nhiem`.

- [ ] **Step 1: Write the failing registry tests**

```ts
test("dai doan ket exposes the complete approved narrative", () => {
  const trace = getTraceBySlug("dai-doan-ket");
  assert.ok(trace?.presentDay);
  assert.equal(trace.centralQuestion, "Điều gì có thể giữ một tập thể cùng hướng?");
  assert.deepEqual(trace.historicalMoments.map((moment) => moment.year), ["1930", "1941", "1945"]);
  assert.equal(trace.thoughtFormation?.factors.length, 3);
  assert.equal(trace.application?.items.length, 3);
});

test("dai doan ket continues to the existing second trace route", () => {
  assert.equal(getNextTraceSlug("dai-doan-ket"), "dao-duc-trach-nhiem");
});
```

- [ ] **Step 2: Run `npm test` and confirm the new content assertions fail because the fields are missing**

- [ ] **Step 3: Add the minimal content types**

```ts
export interface TracePresentDay {
  readonly label: string;
  readonly headline: readonly string[];
  readonly summary: string;
  readonly image: TraceImage;
}

export interface TraceFormation {
  readonly heading: readonly string[];
  readonly factors: readonly TraceFormationFactor[];
  readonly conclusion: readonly string[];
}

export interface TraceApplication {
  readonly heading: readonly string[];
  readonly bridge: string;
  readonly items: readonly TraceApplicationItem[];
}
```

- [ ] **Step 4: Populate Trace 01 content and add only neutral placeholder metadata to Trace 02 and Trace 03**

- [ ] **Step 5: Run `npm test` and confirm all registry tests pass**

---

### Task 2: Build the reusable native-scrolling trace composition

**Files:**
- Create: `components/trace/trace-page.tsx`
- Create: `components/trace/trace-header.tsx`
- Create: `components/trace/trace-opening.tsx`
- Create: `components/trace/time-bridge.tsx`
- Create: `components/trace/historical-sequence.tsx`
- Create: `components/trace/historical-moment.tsx`
- Create: `components/trace/thought-formation.tsx`
- Create: `components/trace/present-application.tsx`
- Create: `components/trace/trace-navigation.tsx`
- Modify: `app/trace/[slug]/page.tsx`

**Interfaces:**
- Consumes: `TraceData` from Task 1.
- Produces: `TracePage({ trace, nextTrace })` with one semantic `h1`, chronological section IDs, and normal links for all navigation.

- [ ] **Step 1: Add an acceptance assertion that Trace 01 renders the nine required stages while Trace 02 remains a placeholder**

- [ ] **Step 2: Run the acceptance test against the current production route and confirm it fails at the opening label**

- [ ] **Step 3: Implement `TraceHeader` as a thin sticky Server Component**

```tsx
<header className="trace-header">
  <Link href="/">HCM // TRACE</Link>
  <span className="trace-header__title">{trace.title}</span>
  <span>{chapter} / 03</span>
</header>
```

- [ ] **Step 4: Implement the opening, historical sequence, formation, application, and navigation sections as focused Server Components**

- [ ] **Step 5: Route complete experience data to `TracePage`; preserve the existing placeholder for incomplete traces**

- [ ] **Step 6: Run `npm test` and `npm run typecheck`**

---

### Task 3: Add restrained motion and the Trace Line signature

**Files:**
- Create: `components/trace/reveal.tsx`
- Create: `components/trace/trace-line.tsx`
- Modify: `components/trace/time-bridge.tsx`
- Modify: `components/trace/historical-moment.tsx`
- Modify: `components/trace/thought-formation.tsx`

**Interfaces:**
- Produces: `TraceReveal` for subtle opacity/position entrance.
- Produces: `TraceLine({ fromYear, toYear, direction })` for back and return states.

- [ ] **Step 1: Implement `TraceReveal` with one viewport tween and no state**

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.18 }}
  transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
>
```

- [ ] **Step 2: Implement `TraceLine` with a thin muted-red scale animation and static reduced-motion end state**

- [ ] **Step 3: Reuse the Trace Line in Trace Back, Thought Formation, and Return to 2026**

- [ ] **Step 4: Run `npm run typecheck` and `npm run lint`**

---

### Task 4: Add local visual assets and responsive styling

**Files:**
- Create: `public/images/traces/dai-doan-ket/present-day.jpg`
- Create: `public/images/traces/dai-doan-ket/1930-placeholder.jpg`
- Create: `public/images/traces/dai-doan-ket/1941-placeholder.jpg`
- Modify: `components/trace/historical-moment.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: approved color tokens and existing fonts.
- Produces: desktop two-column editorial sections, mobile text-first flow, centered bridges, vertical formation, and 44px controls.

- [ ] **Step 1: Download the Figma Make present-day, map, and Pắc Bó reference images to stable local paths**

- [ ] **Step 2: Mark historical images as contextual placeholders and render a neutral non-photographic frame for 1945 rather than using the misleading modern reference image**

- [ ] **Step 3: Add trace-only CSS using the existing palette `#F3F0E8`, `#161616`, `#77736D`, `#982E30`, `#D4CFC6`, and `#2A2520`**

- [ ] **Step 4: Add responsive rules for 1366px and 390px without modifying Homepage selectors**

- [ ] **Step 5: Run `npm test`, `npm run typecheck`, and `npm run lint`**

---

### Task 5: Production acceptance and visual correction

**Files:**
- Create: `tests/trace_acceptance.py`
- Modify: trace components and `app/globals.css` only when evidence identifies a mismatch.

**Interfaces:**
- Produces: screenshots for desktop, laptop, and mobile plus assertions for order, overflow, console errors, touch targets, sticky header, links, and reduced motion.

- [ ] **Step 1: Build the application with `npm run build` and start the production server**

- [ ] **Step 2: Run `python tests/trace_acceptance.py` at 1920x1080, 1366x768, 390x844, and reduced motion**

- [ ] **Step 3: Compare header, opening, bridges, all three historical moments, formation, application, navigation, spacing, typography, and colors with the Figma Make reference**

- [ ] **Step 4: Perform at least one visual correction pass and rerun the acceptance suite**

- [ ] **Step 5: Run the final gate: `npm test`, `npm run typecheck`, `npm run lint`, and `npm run build`**

- [ ] **Step 6: Confirm `git status` contains only Phase 2 changes and commit with `feat: implement dai doan ket trace`**
