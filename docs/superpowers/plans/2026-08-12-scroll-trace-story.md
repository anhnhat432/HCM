# Kéo Dấu Vết Xuyên Thời Gian Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add zero-effort scroll-linked storytelling and local QR sharing to the approved ĐUỐC HỒNG experience without changing Trace content, route architecture, or reading order.

**Architecture:** Keep `TracePage` and every existing section boundary. Add four small client boundaries: `QrShareDialog`, `TraceBackStory`, `FormationConvergence`, and `JourneyTraceMark`. Reuse current Trace images/data and Framer Motion primitives; server-rendered narrative remains the source of truth while JavaScript only enhances presentation.

**Tech Stack:** Next.js 16.3 App Router, React 19, TypeScript, Framer Motion 13, CSS, `qrcode` lazy import, Node test runner, Python Playwright.

## Global Constraints

- User behavior remains ordinary scrolling; no drag, forced click, scroll lock, snap, quiz, score, account, realtime room, poster, audio, video, WebGL, canvas animation, or analytics.
- Preserve Homepage and Trace content, assets, routes, section order, Source Drawer, TraceProgress, TraceRecap, responsive rules, and cream/ink/muted-red identity.
- Do not add or rewrite historical statements, application items, sources, or image metadata.
- Trace Back sticky sequence targets `130–150vh` desktop/laptop and `110–125vh` mobile; 640px reflow becomes linear.
- Reduced motion renders the completed static state immediately.
- QR generation is local, lazy-loaded, and uses the canonical URL; no external QR service.
- Lighthouse Accessibility, Best Practices, and SEO remain `100`; three-run median Performance stays at least Homepage `82` and Trace 01 `71`.
- Use TDD: add each behavioral test, verify RED, implement minimally, verify GREEN.
- Do not merge without a later explicit user request.

---

### Task 1: Local QR Sharing

**Files:**
- Create: `lib/share-url.ts`
- Create: `components/share/qr-share-dialog.tsx`
- Create: `tests/qr-share.test.ts`
- Modify: `app/page.tsx`
- Modify: `components/trace/trace-header.tsx`
- Modify: `app/globals.css`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `tests/homepage_acceptance.py`
- Modify: `tests/trace_acceptance.py`

**Interfaces:**
- Produces: `resolveShareUrl(canonicalHref: string | null, locationHref: string): string`.
- Produces: `QrShareDialog({ label }: { readonly label: string })`.
- Consumers: Homepage header and `TraceHeader`.

- [ ] **Step 1: Write failing pure URL and static trigger tests**

Add `tests/qr-share.test.ts`:

```ts
import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { QrShareDialog } from "@/components/share/qr-share-dialog";
import { resolveShareUrl } from "@/lib/share-url";

test("share URLs prefer canonical metadata", () => {
  assert.equal(
    resolveShareUrl(
      "https://hcm-trace.vercel.app/trace/dai-doan-ket",
      "http://localhost:3000/trace/dai-doan-ket#moment-1930",
    ),
    "https://hcm-trace.vercel.app/trace/dai-doan-ket",
  );
});

test("share URL fallback removes query and hash", () => {
  assert.equal(
    resolveShareUrl(null, "https://example.test/trace/con-nguoi?x=1#application"),
    "https://example.test/trace/con-nguoi",
  );
});

test("QR sharing exposes a text-named trigger without rendering an open dialog", () => {
  const markup = renderToStaticMarkup(
    createElement(QrShareDialog, { label: "Chia sẻ Trace bằng mã QR" }),
  );
  assert.ok(markup.includes("qr-share__trigger"));
  assert.ok(markup.includes("Chia sẻ Trace bằng mã QR"));
  assert.equal(markup.includes('role="dialog"'), false);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```powershell
.\node_modules\.bin\tsx.cmd --test tests\qr-share.test.ts
```

Expected: module-not-found failures for `@/lib/share-url` and `QrShareDialog`.

- [ ] **Step 3: Implement the pure URL helper**

Create `lib/share-url.ts`:

```ts
export function resolveShareUrl(
  canonicalHref: string | null,
  locationHref: string,
): string {
  const target = new URL(canonicalHref || locationHref, locationHref);
  target.search = "";
  target.hash = "";
  return target.toString();
}
```

- [ ] **Step 4: Install the local QR generator**

Run:

```powershell
npm install qrcode
npm install --save-dev @types/qrcode
```

Expected: `package.json` and `package-lock.json` record `qrcode` and its type package; no unrelated dependency changes.

- [ ] **Step 5: Implement `QrShareDialog`**

Create a client component that:

```ts
export interface QrShareDialogProps {
  readonly label: string;
}

export function QrShareDialog({ label }: QrShareDialogProps) {
  // Closed SSR output is one 44px button with an inline line icon.
  // On open: read canonical, dynamic import("qrcode"), call toDataURL(url),
  // portal an aria-modal dialog, focus close, trap Tab, restore trigger focus.
  // Copy uses navigator.clipboard when present and a textarea fallback.
  // Native share is rendered only when navigator.share exists.
}
```

Use status text in an `aria-live="polite"` region. Preserve the URL and copy action if QR generation rejects. Do not call any remote endpoint.

- [ ] **Step 6: Integrate the trigger into both headers**

In `app/page.tsx`, replace the single brand child with:

```tsx
<span className="brand-mark">ĐUỐC HỒNG</span>
<QrShareDialog label="Chia sẻ trang Đuốc Hồng bằng mã QR" />
```

In `components/trace/trace-header.tsx`, add the dialog after `TraceSwitcher`:

```tsx
<QrShareDialog label={`Chia sẻ Trace ${title} bằng mã QR`} />
```

Update header grids so the trigger remains secondary, 44px, and does not displace the current title/switcher.

- [ ] **Step 7: Verify unit GREEN**

Run:

```powershell
.\node_modules\.bin\tsx.cmd --test tests\qr-share.test.ts
npm run typecheck
```

Expected: all QR unit tests pass and TypeScript exits `0`.

- [ ] **Step 8: Add browser acceptance for dialog behavior**

Extend Homepage and Trace acceptance to assert:

```python
trigger = page.get_by_role("button", name="Chia sẻ trang Đuốc Hồng bằng mã QR")
trigger.click()
dialog = page.get_by_role("dialog", name="Chia sẻ bằng mã QR")
dialog.wait_for()
assert dialog.locator("img").get_attribute("src").startswith("data:image/png")
assert "https://hcm-trace.vercel.app" in dialog.inner_text()
page.keyboard.press("Escape")
dialog.wait_for(state="detached")
assert trigger.evaluate("element => element === document.activeElement")
```

Also verify no request host outside the local app is made when opening the dialog.

- [ ] **Step 9: Commit the independently working QR slice**

```powershell
git add -- package.json package-lock.json lib/share-url.ts components/share/qr-share-dialog.tsx app/page.tsx components/trace/trace-header.tsx app/globals.css tests/qr-share.test.ts tests/homepage_acceptance.py tests/trace_acceptance.py
git commit -m "feat: add local QR sharing"
```

---

### Task 2: Scroll-Linked Trace Back Story

**Files:**
- Create: `components/trace/trace-back-story.tsx`
- Create: `tests/scroll-story.test.ts`
- Modify: `components/trace/time-bridge.tsx`
- Modify: `components/trace/trace-page.tsx`
- Modify: `app/globals.css`
- Modify: `tests/trace_acceptance.py`

**Interfaces:**
- Produces: `TraceBackStoryProps` with `fromYear`, `toYear`, `presentImage`, and optional `historicalImage`.
- `TracePage` supplies `trace.presentDay.image` and `trace.historicalMoments[0].image`.
- Existing `TimeBridge` return variant remains unchanged.

- [ ] **Step 1: Write failing rendering/data-flow tests**

Add `tests/scroll-story.test.ts`:

```ts
import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { TracePage } from "@/components/trace/trace-page";
import { traces } from "@/data/traces";
import type { CompleteTraceData } from "@/types/trace";

test("every complete Trace renders a passive Trace Back story with existing images", () => {
  for (const trace of traces) {
    const markup = renderToStaticMarkup(
      createElement(TracePage, {
        trace: trace as CompleteTraceData,
        nextTrace: traces[(trace.order % traces.length)],
      }),
    );
    assert.ok(markup.includes("trace-back-story"));
    assert.ok(markup.includes(trace.presentDay?.image.src ?? "missing-present"));
    assert.ok(markup.includes(trace.historicalMoments[0].image?.src ?? "missing-history"));
    assert.ok(markup.includes("data-scroll-story=\"passive\""));
    assert.equal(markup.includes('type="range"'), false);
  }
});
```

- [ ] **Step 2: Run and verify RED**

```powershell
.\node_modules\.bin\tsx.cmd --test tests\scroll-story.test.ts
```

Expected: markup lacks `trace-back-story` and passive story metadata.

- [ ] **Step 3: Implement `TraceBackStory`**

Create a client component with this public contract:

```ts
interface TraceBackStoryProps {
  readonly fromYear: string;
  readonly toYear: string;
  readonly presentImage: TraceImage & { readonly src: string };
  readonly historicalImage?: TraceImage;
  readonly headingId: string;
}
```

Use `useRef`, `useScroll({ target, offset: ["start start", "end end"] })`,
`useTransform`, and `useReducedMotion`. Render both images with `next/image`;
the historical image remains lazy. Apply scroll progress only to presentation
styles: present opacity, historical `clipPath`, line scale, and year opacity.

Default server markup represents the completed static state. Track an
`isEnhanced` flag that becomes `true` in `useEffect`; only attach starting
clip/opacity motion styles when enhanced and reduced motion is off. Because the
story is below the fold, this avoids hiding content without JavaScript without
creating a visible first-paint flash.

The component must not render a button, slider, pointer handler, wheel handler,
or scroll lock.

- [ ] **Step 4: Integrate through `TimeBridge` and `TracePage`**

Extend `TimeBridgeProps` as a discriminated union:

```ts
type TimeBridgeProps =
  | {
      readonly variant: "back";
      readonly fromYear: string;
      readonly toYear: string;
      readonly presentImage: TracePresentDay["image"];
      readonly historicalImage?: TraceImage;
    }
  | {
      readonly variant: "return";
      readonly fromYear: string;
      readonly toYear: string;
    };
```

Pass the existing image objects from `TracePage`. Keep section IDs,
`data-trace-stage`, heading IDs, cue links, and stage order unchanged.

- [ ] **Step 5: Add responsive CSS**

Add focused classes:

```css
.time-bridge--story { --trace-sticky-offset: 6.75rem; min-height: 140svh; }
.trace-back-story { min-height: 140svh; }
.trace-back-story__sticky { position: sticky; top: var(--trace-sticky-offset); }
.trace-back-story__historical { clip-path: inset(100% 0 0); }
```

Use the existing image frame taxonomy. At `max-width: 48rem`, use `120svh` and
a one-column frame with `--trace-sticky-offset: 6.25rem`. At 640px reflow and
reduced motion, set `position: static`, `min-height: auto`, and show the
completed historical state.

- [ ] **Step 6: Verify unit GREEN and regressions**

```powershell
.\node_modules\.bin\tsx.cmd --test tests\scroll-story.test.ts tests\trace-enhancements.test.ts
npm run typecheck
```

Expected: focused tests and typecheck pass.

- [ ] **Step 7: Add production scroll assertions**

In `tests/trace_acceptance.py`, add `verify_trace_back_story`:

```python
story = page.locator(".trace-back-story")
assert story.get_attribute("data-scroll-story") == "passive"
assert story.locator('input, button').count() == 0
page.evaluate("element => window.scrollTo(0, element.offsetTop)", story.element_handle())
start_clip = story.locator(".trace-back-story__historical").evaluate(
    "element => getComputedStyle(element).clipPath"
)
page.evaluate(
    "element => window.scrollTo(0, element.offsetTop + element.offsetHeight - innerHeight)",
    story.element_handle(),
)
page.wait_for_function(
    "element => Number.parseFloat(getComputedStyle(element).opacity) > 0.95",
    arg=story.locator(".trace-back-story__to-year").element_handle(),
)
end_clip = story.locator(".trace-back-story__historical").evaluate(
    "element => getComputedStyle(element).clipPath"
)
assert start_clip != end_clip
```

Also fast-scroll directly to `#moment-{firstYear}` and assert title/copy/image are visible without waiting for the story.

- [ ] **Step 8: Commit Trace Back story**

```powershell
git add -- components/trace/trace-back-story.tsx components/trace/time-bridge.tsx components/trace/trace-page.tsx app/globals.css tests/scroll-story.test.ts tests/trace_acceptance.py
git commit -m "feat: add passive trace back story"
```

---

### Task 3: Historical Continuity and Formation Convergence

**Files:**
- Create: `components/trace/formation-convergence.tsx`
- Modify: `components/trace/historical-moment.tsx`
- Modify: `components/trace/thought-formation.tsx`
- Modify: `app/globals.css`
- Modify: `tests/scroll-story.test.ts`
- Modify: `tests/trace_acceptance.py`

**Interfaces:**
- Produces: decorative `.historical-moment__continuity` span per moment.
- Produces: `FormationConvergence({ children }: { readonly children: ReactNode })`.

- [ ] **Step 1: Add failing structure tests**

Append to `tests/scroll-story.test.ts`:

```ts
test("historical moments and Thought Formation expose one continuous line language", async () => {
  const { HistoricalMoment } = await import("@/components/trace/historical-moment");
  const { ThoughtFormation } = await import("@/components/trace/thought-formation");
  const trace = traces[0] as CompleteTraceData;
  const momentMarkup = renderToStaticMarkup(
    createElement(HistoricalMoment, {
      moment: trace.historicalMoments[0],
      imageRight: false,
      nextHref: "#moment-1941",
      nextLabel: "Tiếp theo",
    }),
  );
  const formationMarkup = renderToStaticMarkup(
    createElement(ThoughtFormation, { formation: trace.thoughtFormation }),
  );
  assert.ok(momentMarkup.includes("historical-moment__continuity"));
  assert.ok(formationMarkup.includes("formation-convergence"));
  assert.equal((formationMarkup.match(/formation-convergence__branch/g) ?? []).length, 3);
  assert.ok(formationMarkup.includes('aria-hidden="true"'));
});
```

- [ ] **Step 2: Run and verify RED**

```powershell
.\node_modules\.bin\tsx.cmd --test tests\scroll-story.test.ts
```

Expected: continuity and convergence selectors are absent.

- [ ] **Step 3: Add historical continuity markup and CSS**

Inside each `HistoricalMoment` section, add:

```tsx
<span className="historical-moment__continuity" aria-hidden="true" />
```

Style it as a thin muted-red/line rail that never overlaps copy or images. Hide
or simplify it at 640px reflow and forced colors; do not change section height.

- [ ] **Step 4: Implement `FormationConvergence`**

Create a client wrapper that renders an `aria-hidden="true"` SVG with exactly
three branch paths and one merged path. Animate `pathLength` using scroll
progress; reduced motion sets every path to `1` immediately. Render `children`
in the existing content column without changing their order.

- [ ] **Step 5: Integrate into `ThoughtFormation`**

Replace only the current decorative line wrapper:

```tsx
<FormationConvergence>
  <div className="thought-formation__content">...</div>
</FormationConvergence>
```

Keep heading, factor articles, conclusion, source links, continuation link, IDs,
and accessible headings unchanged.

- [ ] **Step 6: Verify GREEN**

```powershell
.\node_modules\.bin\tsx.cmd --test tests\scroll-story.test.ts tests\typography-regression.test.ts
npm run typecheck
```

Expected: focused tests and typography guardrails pass.

- [ ] **Step 7: Extend browser checks**

Assert three convergence branches exist, decorative SVG is hidden from the
accessibility tree, conclusion remains readable on fast scroll, and reduced
motion path lengths are complete immediately.

- [ ] **Step 8: Commit continuity/convergence**

```powershell
git add -- components/trace/formation-convergence.tsx components/trace/historical-moment.tsx components/trace/thought-formation.tsx app/globals.css tests/scroll-story.test.ts tests/trace_acceptance.py
git commit -m "feat: connect historical trace formation"
```

---

### Task 4: Journey Closing Trace Mark

**Files:**
- Create: `components/trace/journey-trace-mark.tsx`
- Modify: `components/trace/journey-closing.tsx`
- Modify: `app/globals.css`
- Modify: `tests/scroll-story.test.ts`
- Modify: `tests/trace_acceptance.py`

**Interfaces:**
- Produces: `JourneyTraceMark()` decorative SVG with three input paths and one final torch path.
- Consumer: `JourneyClosing` before its statement/actions.

- [ ] **Step 1: Add failing Journey mark test**

```ts
test("Journey Closing resolves three Trace lines into one decorative mark", () => {
  const markup = renderToStaticMarkup(
    createElement(JourneyClosing, { closing: journeyClosing }),
  );
  assert.ok(markup.includes("journey-trace-mark"));
  assert.equal((markup.match(/journey-trace-mark__input/g) ?? []).length, 3);
  assert.ok(markup.includes("journey-trace-mark__torch"));
  assert.match(markup, /journey-trace-mark[^>]*aria-hidden="true"/);
});
```

- [ ] **Step 2: Run and verify RED**

```powershell
.\node_modules\.bin\tsx.cmd --test tests\scroll-story.test.ts
```

Expected: Journey mark selectors are absent.

- [ ] **Step 3: Implement and integrate the mark**

Create a small client SVG component using `motion.path`, `whileInView`, and
`useReducedMotion`. Render it after `.journey-closing__topics` and before the
statement. Keep it `aria-hidden="true"`, non-focusable, and line-only.

- [ ] **Step 4: Add responsive/forced-color CSS**

Keep the mark inside the existing content width, no more than `10rem` tall on
desktop and `7rem` on mobile. In forced colors, use `CanvasText`/`Highlight`.

- [ ] **Step 5: Verify GREEN and browser rendering**

```powershell
.\node_modules\.bin\tsx.cmd --test tests\scroll-story.test.ts tests\trace-enhancements.test.ts
npm run typecheck
```

Extend acceptance to verify the mark exists only in Journey Closing, remains
decorative, has no overflow, and reaches final stroke state under reduced motion.

- [ ] **Step 6: Commit Journey payoff**

```powershell
git add -- components/trace/journey-trace-mark.tsx components/trace/journey-closing.tsx app/globals.css tests/scroll-story.test.ts tests/trace_acceptance.py
git commit -m "feat: add journey trace finale"
```

---

### Task 5: Full Responsive and Accessibility QA

**Files:**
- Modify: `tests/homepage_acceptance.py`
- Modify: `tests/trace_acceptance.py`
- Modify: `docs/accessibility-qa.md`
- Modify: `docs/release-readiness.md`

**Interfaces:**
- Consumes all components from Tasks 1–4.
- Produces final production evidence and release documentation.

- [ ] **Step 1: Add complete acceptance matrix before corrective CSS**

Cover:

```text
Homepage: 1920x1080, 1366x768, 390x844, 375x812, 640x900, forced colors,
reduced motion, QR dialog keyboard flow.

Trace 01/02/03: existing matrix plus story start/end, fast scroll, conclusion,
return, progress anchors, no required control, no overflow.
```

Run against the production build and record any genuine failure before changing
CSS or component behavior.

- [ ] **Step 2: Correct only failures found by the new gates**

Allowed corrections are limited to layout, motion range, line visibility,
focus, contrast, crop, sticky duration, and progressive fallback. Do not alter
historical content or add features.

- [ ] **Step 3: Run the complete local gate**

```powershell
npm test
npm run typecheck
npm run lint
npm run build
```

Expected: every command exits `0` with no warnings introduced by this feature.

- [ ] **Step 4: Run production acceptance**

Start the exact build on port 3800 and run:

```powershell
$env:HCM_BASE_URL='http://localhost:3800'
python tests/homepage_acceptance.py
python tests/trace_acceptance.py
```

Expected: Homepage and all three Trace suites pass with no console/hydration
errors or horizontal overflow.

- [ ] **Step 5: Visual QA**

Inspect screenshots for:

- Trace Back start/mid/end at 1366x768 and 390x844.
- Thought Formation climax desktop/mobile.
- Journey Closing mark desktop/mobile.
- QR dialog desktop/mobile/forced colors.

Confirm the visual remains editorial, readable, and free of long sticky dead
zones.

- [ ] **Step 6: Run Lighthouse three times per route**

Run Lighthouse 12.8.2 for `/` and `/trace/dai-doan-ket`, record each trial, and
compute category medians. Require:

```text
Homepage Performance median >= 82
Trace 01 Performance median >= 71
Accessibility = 100
Best Practices = 100
SEO = 100
```

- [ ] **Step 7: Update release evidence**

Document the new scrollytelling, QR behavior, reduced-motion/static fallback,
acceptance matrix, Lighthouse medians, and any remaining manual screen-reader
checks in `docs/accessibility-qa.md` and `docs/release-readiness.md`.

- [ ] **Step 8: Commit QA evidence**

```powershell
git add -- tests/homepage_acceptance.py tests/trace_acceptance.py docs/accessibility-qa.md docs/release-readiness.md
git commit -m "test: verify scroll trace release quality"
```

---

### Task 6: Branch Review and Publication

**Files:**
- Verify every file changed in Tasks 1–5.

**Interfaces:**
- Produces one clean feature branch and one non-draft PR against `main`.

- [ ] **Step 1: Inspect final scope**

```powershell
git status --short --branch
git diff origin/main...HEAD --stat
git diff origin/main...HEAD --check
```

Expected: only spec, plan, scoped implementation, tests, dependency lock, and QA
docs appear; no generated screenshots, Lighthouse reports, `.next`, or Python
cache are staged.

- [ ] **Step 2: Re-run fresh verification before publication**

Run the full commands from Task 5 again after the final source edit. Do not rely
on earlier output.

- [ ] **Step 3: Push the branch**

```powershell
git push -u origin feat/scroll-trace-story
```

- [ ] **Step 4: Open one non-draft PR**

Create a PR titled:

```text
feat: add scroll-linked trace storytelling
```

The body must summarize zero-effort scrollytelling, local QR sharing,
accessibility/performance evidence, and note that no Trace content changed.

- [ ] **Step 5: Verify remote state**

Confirm the PR is open, mergeable, checks are visible, and its head SHA matches
local `HEAD`. Do not merge without explicit user authorization.
