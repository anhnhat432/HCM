# Living Thought Cases Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a 30-situation "Hồ sơ tư tưởng sống" library and a source-backed six-act case experience while preserving the approved Trace routes and QR-only foundation.

**Architecture:** Keep all authored case content in typed static data and resolve every historical reference through the existing Trace registry. Render the library and six-act narratives as Server Component content, then add small client-only enhancements for filtering, suggestion rotation, optional perspective selection, and named scroll progress. Reuse the existing Source Drawer and Trace image metadata so historical facts and provenance remain single-sourced.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5, Node test runner through `tsx`, existing CSS architecture, Python Playwright acceptance scripts.

## Global Constraints

- Launch with exactly 30 curated situations: five in each of six approved categories.
- Keep `/trace/dai-doan-ket`, `/trace/dao-duc-trach-nhiem`, and `/trace/con-nguoi` as the historical source of truth.
- The core case path must be fully readable by scrolling and in server-rendered markup.
- Prompts, search, filters, source drawers, and perspective choices are optional enhancements.
- Do not add AI input, login, scoring, completion locks, 3D, game mechanics, new dependencies, or new historical assertions.
- Preserve the cream, ink, muted-red editorial identity and the current Trace visual language.
- Preserve the Homepage hero image, branding, QR sharing, Trace content, Trace progress, Trace recap, and Source Drawer behavior.
- Provide quiet guidance, named progress, visible focus, 44px mobile targets, reduced motion, forced colors, no-JavaScript readability, SEO, and performance coverage.
- Use test-first RED -> GREEN cycles for every new production behavior.
- Publish one non-draft PR from `feat/living-thought-cases`; do not merge without explicit authorization.

---

## File Structure

- Create `types/thought-case.ts`: category constants and immutable case contracts.
- Create `data/thought-cases.ts`: all 30 Vietnamese case records and lightweight category labels.
- Create `lib/thought-case-registry.ts`: case lookup, preview projection, evidence resolution, and related-case resolution.
- Create `lib/thought-case-journey.ts`: pure six-act progress milestone definitions.
- Create `app/ho-so/page.tsx`: server-rendered case library route and metadata.
- Create `app/ho-so/[slug]/page.tsx`: static case route, metadata, Open Graph image reuse, and not-found behavior.
- Create `components/cases/case-library-filters.tsx`: optional search/category enhancement over server-rendered case summaries.
- Create `components/cases/scenario-picker.tsx`: three-at-a-time Homepage suggestions with deterministic rotation.
- Create `components/cases/case-file-page.tsx`: six-act server composition.
- Create `components/cases/case-evidence.tsx`: resolved historical moment, image, Trace link, and Source Drawer reuse.
- Create `components/cases/case-return.tsx`: three present lenses and two related cases.
- Create `components/cases/perspective-prompt.tsx`: optional two-view selection with immediate accessible feedback.
- Create `components/cases/case-progress.tsx`: named active-act anchor navigation.
- Create `components/cases/experience-guide.tsx`: optional concise native guidance disclosure.
- Modify `app/page.tsx`: route the hero to `/ho-so`, add three suggestions, relabel the Trace list, and retain QR sharing.
- Modify `app/sitemap.ts`: include `/ho-so` and all case routes.
- Modify `app/globals.css`: case library, dossier narrative, responsive, reduced-motion, and forced-colors styling.
- Create `tests/thought-case-registry.test.ts`: taxonomy, links, evidence, copy guardrails, and lookup behavior.
- Create `tests/living-thought-pages.test.ts`: six-act server markup, Homepage integration, and progressive-enhancement contracts.
- Create `tests/thought-case-journey.test.ts`: progress milestone order and accessible labels.
- Create `tests/case_acceptance.py`: production browser coverage for library, representative cases, accessibility modes, and all static routes.
- Modify `docs/release-readiness.md`: record final case QA and performance evidence.

---

### Task 1: Typed Case Registry and 30 Curated Situations

**Files:**
- Create: `types/thought-case.ts`
- Create: `data/thought-cases.ts`
- Create: `lib/thought-case-registry.ts`
- Test: `tests/thought-case-registry.test.ts`

**Interfaces:**
- Consumes: `TraceSlug`, `CompleteTraceData`, and `HistoricalMoment` from `types/trace.ts`; `getTraceBySlug()` from `lib/trace-registry.ts`.
- Produces: `thoughtCases`, `CASE_CATEGORIES`, `CASE_CATEGORY_LABELS`, `getThoughtCaseBySlug()`, `getCaseEvidence()`, `getCasePreviews()`, and `getRelatedCases()`.

- [ ] **Step 1: Write the failing registry contract tests**

Create `tests/thought-case-registry.test.ts` with assertions equivalent to:

```ts
import assert from "node:assert/strict";
import test from "node:test";

import { thoughtCases } from "@/data/thought-cases";
import {
  getCaseEvidence,
  getRelatedCases,
  getThoughtCaseBySlug,
} from "@/lib/thought-case-registry";
import { CASE_CATEGORIES } from "@/types/thought-case";

const expectedSlugs = [
  "nhom-gioi-nhung-khong-hop-tac",
  "mot-nguoi-ganh-het-cong-viec",
  "bat-dong-khi-chay-deadline",
  "thanh-vien-yeu-bi-bo-lai",
  "chia-cong-khong-cong-bang",
  "nguoi-lanh-dao-khong-nhan-loi",
  "quyet-dinh-de-lam-nhung-sai",
  "thanh-tich-cua-nhom-cong-cua-ai",
  "noi-that-khi-khong-ai-biet",
  "ky-luat-va-long-tin",
  "loi-ich-ca-nhan-va-tap-the",
  "uu-tien-nguoi-quen",
  "chia-se-tai-nguyen-khan-hiem",
  "thoa-hiep-den-dau",
  "im-lang-truoc-sai-pham",
  "dam-dong-dang-cong-kich-mot-nguoi",
  "tin-chua-kiem-chung",
  "bat-dong-tren-mang",
  "thanh-tich-va-hinh-anh-ca-nhan",
  "noi-dung-gay-chia-re",
  "diem-so-co-dinh-nghia-con-nguoi",
  "nguoi-cham-tien-bo",
  "co-hoi-thu-hai",
  "ap-luc-nang-suat",
  "giao-duc-vi-thanh-tich",
  "khac-biet-the-he",
  "nguoi-moi-trong-cong-dong",
  "muc-tieu-chung-khi-loi-ich-khac-nhau",
  "phat-trien-nhung-bo-quen-con-nguoi",
  "trach-nhiem-truoc-van-de-chung",
] as const;

test("launch registry exposes exactly the approved 30 unique case slugs", () => {
  assert.deepEqual(thoughtCases.map((item) => item.slug), expectedSlugs);
  assert.equal(new Set(expectedSlugs).size, 30);
});

test("every category contains exactly five complete cases", () => {
  for (const category of CASE_CATEGORIES) {
    const cases = thoughtCases.filter((item) => item.category === category);
    assert.equal(cases.length, 5, category);
  }

  for (const item of thoughtCases) {
    assert.equal(item.reveals.length, 3, item.slug);
    assert.equal(item.presentLenses.length, 3, item.slug);
    assert.equal(item.relatedCaseSlugs.length, 2, item.slug);
    assert.ok(item.context.length >= 80, item.slug);
    assert.ok(item.context.length <= 360, item.slug);
  }
});

test("every case resolves three source-backed Trace moments", () => {
  for (const item of thoughtCases) {
    for (const reveal of item.reveals) {
      const { trace, moment } = getCaseEvidence(reveal.evidence);
      assert.equal(trace.slug, reveal.evidence.traceSlug);
      assert.equal(moment.id, reveal.evidence.momentId);
      assert.ok(moment.verification.length > 0);
      assert.ok(moment.sources.length > 0);
    }
  }
});

test("case data never copies historical source or moment fields", () => {
  const forbiddenKeys = new Set([
    "year",
    "historicalSummary",
    "verification",
    "sources",
    "image",
    "sourceUrl",
  ]);

  for (const item of thoughtCases) {
    for (const reveal of item.reveals) {
      for (const key of Object.keys(reveal)) {
        assert.equal(forbiddenKeys.has(key), false, `${item.slug}:${key}`);
      }
    }
  }
});

test("lookup and related-case resolution reject broken links", () => {
  assert.equal(
    getThoughtCaseBySlug("diem-so-co-dinh-nghia-con-nguoi")?.primaryTrace,
    "con-nguoi",
  );
  assert.equal(getThoughtCaseBySlug("khong-ton-tai"), undefined);

  for (const item of thoughtCases) {
    const related = getRelatedCases(item);
    assert.equal(related.length, 2);
    assert.ok(related.every((candidate) => candidate.slug !== item.slug));
  }
});

test("invalid evidence fails loudly", () => {
  assert.throws(
    () =>
      getCaseEvidence({
        traceSlug: "dai-doan-ket",
        momentId: "khong-ton-tai",
      }),
    /Unknown historical moment/,
  );
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npx tsx --test tests/thought-case-registry.test.ts`

Expected: FAIL because `data/thought-cases.ts`, `types/thought-case.ts`, and `lib/thought-case-registry.ts` do not exist.

- [ ] **Step 3: Add immutable case contracts**

Create `types/thought-case.ts` with the approved category tuple and interfaces:

```ts
import type { TraceSlug } from "@/types/trace";

export const CASE_CATEGORIES = [
  "study-teamwork",
  "leadership-responsibility",
  "conflicting-interests",
  "social-media",
  "human-development",
  "community-society",
] as const;

export type CaseCategory = (typeof CASE_CATEGORIES)[number];

export interface CaseEvidenceReference {
  readonly traceSlug: TraceSlug;
  readonly momentId: string;
}

export interface CaseReveal {
  readonly assumption: string;
  readonly finding: string;
  readonly reframe: string;
  readonly evidence: CaseEvidenceReference;
}

export interface PresentLens {
  readonly title: string;
  readonly summary: string;
}

export interface ThoughtCase {
  readonly slug: string;
  readonly category: CaseCategory;
  readonly title: string;
  readonly shortPrompt: string;
  readonly context: string;
  readonly openingQuestion: string;
  readonly primaryTrace: TraceSlug;
  readonly supportingTrace?: TraceSlug;
  readonly optionalPerspective?: readonly [string, string];
  readonly reveals: readonly [CaseReveal, CaseReveal, CaseReveal];
  readonly returnHeading: string;
  readonly returnSummary: string;
  readonly presentLenses: readonly [PresentLens, PresentLens, PresentLens];
  readonly relatedCaseSlugs: readonly [string, string];
  readonly featured?: boolean;
}

export interface ThoughtCasePreview {
  readonly slug: string;
  readonly category: CaseCategory;
  readonly title: string;
  readonly shortPrompt: string;
  readonly primaryTrace: TraceSlug;
}
```

- [ ] **Step 4: Author all 30 case records as direct typed literals**

Create `data/thought-cases.ts`. Use the exact slug order asserted by the test and the exact category/primary/supporting mappings in the approved design spec. Each entry must include Vietnamese present-day copy, three evidence references chosen only from these existing IDs, and two valid related slugs:

```ts
import type { CaseCategory, ThoughtCase } from "@/types/thought-case";

export const CASE_CATEGORY_LABELS: Record<CaseCategory, string> = {
  "study-teamwork": "Học tập & làm việc nhóm",
  "leadership-responsibility": "Lãnh đạo & trách nhiệm",
  "conflicting-interests": "Xung đột lợi ích",
  "social-media": "Mạng xã hội",
  "human-development": "Phát triển con người",
  "community-society": "Cộng đồng & xã hội",
};

const APPROVED_EVIDENCE_IDS = {
  "dai-doan-ket": [
    "dang-cong-san-viet-nam",
    "viet-minh",
    "tuyen-ngon-doc-lap",
  ],
  "dao-duc-trach-nhiem": [
    "tu-cach-nguoi-cach-menh",
    "sua-doi-loi-lam-viec",
    "dao-duc-cach-mang",
  ],
  "con-nguoi": ["tuyen-ngon-doc-lap", "trong-nguoi", "di-chuc"],
} as const;
```

For primary Trace cases, use all three primary moments in chronological order. For cases with a supporting Trace, one reveal may resolve to that Trace only when its reframe clearly needs the supporting lens; the underlying historical summary remains rendered from `data/traces.ts`. Keep `finding` to a present-day relationship sentence, not a copied historical fact.

The first record establishes the production shape:

```ts
{
  slug: "nhom-gioi-nhung-khong-hop-tac",
  category: "study-teamwork",
  title: "Khi người giỏi nhất không muốn hợp tác",
  shortPrompt: "Một thành viên làm rất tốt phần mình nhưng từ chối phối hợp với cả nhóm.",
  context:
    "Nhóm của bạn có một thành viên nổi bật về năng lực. Bạn ấy hoàn thành phần việc nhanh và tốt, nhưng không chia sẻ tiến độ, không lắng nghe góp ý và cho rằng kết quả cá nhân đủ để bảo đảm thành công chung.",
  openingQuestion: "Một tập thể có thể đi xa nếu người giỏi nhất đứng ngoài nhịp chung không?",
  primaryTrace: "dai-doan-ket",
  supportingTrace: "con-nguoi",
  optionalPerspective: [
    "Ưu tiên để người giỏi tự quyết phần việc của mình",
    "Ưu tiên một cách phối hợp mà mọi người cùng theo được",
  ],
  reveals: [
    {
      assumption: "Chỉ cần từng người làm tốt phần của mình thì nhóm tự khắc sẽ mạnh.",
      finding: "Năng lực riêng chỉ trở thành sức mạnh chung khi được đặt vào một mục tiêu có thể cùng chia sẻ.",
      reframe: "Câu hỏi không còn là ai giỏi nhất, mà là điều gì khiến các năng lực khác nhau cùng hướng.",
      evidence: {
        traceSlug: "dai-doan-ket",
        momentId: "dang-cong-san-viet-nam",
      },
    },
    {
      assumption: "Muốn phối hợp thì mọi người phải suy nghĩ giống nhau.",
      finding: "Một mục tiêu chung có thể quy tụ nhiều vị trí và cách đóng góp khác nhau.",
      reframe: "Đoàn kết không xóa khác biệt; nó tạo một lý do đủ rõ để khác biệt cùng hành động.",
      evidence: { traceSlug: "dai-doan-ket", momentId: "viet-minh" },
    },
    {
      assumption: "Kết quả cuối cùng quan trọng hơn cách cả nhóm đi đến đó.",
      finding: "Một kết quả chung bền hơn khi mỗi người nhìn thấy vị trí và trách nhiệm của mình trong đó.",
      reframe: "Thành công tập thể cần được xây bằng sự tham gia, không chỉ ghép từ các phần việc riêng lẻ.",
      evidence: {
        traceSlug: "dai-doan-ket",
        momentId: "tuyen-ngon-doc-lap",
      },
    },
  ],
  returnHeading: "Đưa người giỏi trở lại nhịp chung",
  returnSummary:
    "Bạn không cần làm giảm năng lực cá nhân. Điều cần thay đổi là cách năng lực ấy kết nối với mục tiêu, trách nhiệm và những người còn lại.",
  presentLenses: [
    {
      title: "Nói rõ mục tiêu chung",
      summary: "Đặt kết quả cả nhóm cần đạt lên trước cách làm riêng của từng người.",
    },
    {
      title: "Thiết kế điểm phối hợp",
      summary: "Chọn những thời điểm bắt buộc phải chia sẻ tiến độ, quyết định và trở ngại.",
    },
    {
      title: "Ghi nhận cả đóng góp lẫn kết nối",
      summary: "Đánh giá chất lượng phần việc cùng khả năng giúp tập thể tiến lên.",
    },
  ],
  relatedCaseSlugs: ["bat-dong-khi-chay-deadline", "thanh-tich-cua-nhom-cong-cua-ai"],
  featured: true,
}
```

- [ ] **Step 5: Implement pure registry resolution**

Create `lib/thought-case-registry.ts`:

```ts
import { thoughtCases } from "@/data/thought-cases";
import { getTraceBySlug } from "@/lib/trace-registry";
import type { CompleteTraceData, HistoricalMoment } from "@/types/trace";
import type {
  CaseEvidenceReference,
  ThoughtCase,
  ThoughtCasePreview,
} from "@/types/thought-case";

function isCompleteTrace(trace: ReturnType<typeof getTraceBySlug>): trace is CompleteTraceData {
  return Boolean(
    trace?.presentDay &&
      trace.centralQuestion &&
      trace.thoughtFormation &&
      trace.application,
  );
}

export function getThoughtCaseBySlug(slug: string): ThoughtCase | undefined {
  return thoughtCases.find((item) => item.slug === slug);
}

export function getCaseEvidence(reference: CaseEvidenceReference): {
  trace: CompleteTraceData;
  moment: HistoricalMoment;
} {
  const trace = getTraceBySlug(reference.traceSlug);
  if (!isCompleteTrace(trace)) {
    throw new Error(`Unknown or incomplete Trace: ${reference.traceSlug}`);
  }

  const moment = trace.historicalMoments.find(
    (candidate) => candidate.id === reference.momentId,
  );
  if (!moment) {
    throw new Error(
      `Unknown historical moment: ${reference.traceSlug}:${reference.momentId}`,
    );
  }

  return { trace, moment };
}

export function getCasePreviews(): readonly ThoughtCasePreview[] {
  return thoughtCases.map(({ slug, category, title, shortPrompt, primaryTrace }) => ({
    slug,
    category,
    title,
    shortPrompt,
    primaryTrace,
  }));
}

export function getRelatedCases(item: ThoughtCase): readonly [ThoughtCase, ThoughtCase] {
  const related = item.relatedCaseSlugs.map((slug) => getThoughtCaseBySlug(slug));
  if (!related[0] || !related[1]) {
    throw new Error(`Unknown related case for ${item.slug}`);
  }
  return [related[0], related[1]];
}
```

- [ ] **Step 6: Run registry tests and the existing suite**

Run: `npx tsx --test tests/thought-case-registry.test.ts`

Expected: PASS with all registry tests.

Run: `npm test`

Expected: all existing and new unit tests PASS.

- [ ] **Step 7: Commit the data foundation**

```bash
git add types/thought-case.ts data/thought-cases.ts lib/thought-case-registry.ts tests/thought-case-registry.test.ts
git commit -m "feat: add living thought case registry"
```

---

### Task 2: Server-Rendered Case Library and Optional Filters

**Files:**
- Create: `app/ho-so/page.tsx`
- Create: `components/cases/case-library-filters.tsx`
- Test: `tests/living-thought-pages.test.ts`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `getCasePreviews()`, `CASE_CATEGORIES`, and `CASE_CATEGORY_LABELS`.
- Produces: `/ho-so`, `.case-library`, `.case-library__item`, category buttons, and a search input; all case links remain in initial server HTML.

- [ ] **Step 1: Write failing library route and progressive-enhancement tests**

Create `tests/living-thought-pages.test.ts` with source and data assertions:

```ts
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { getCasePreviews } from "@/lib/thought-case-registry";

function readSource(path: string): string {
  return readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
}

test("case library keeps all 30 links in its initial render data", () => {
  const previews = getCasePreviews();
  assert.equal(previews.length, 30);
  assert.equal(new Set(previews.map((item) => item.slug)).size, 30);
});

test("case library exposes labelled optional filters without gating links", () => {
  const route = readSource("app/ho-so/page.tsx");
  const filters = readSource("components/cases/case-library-filters.tsx");
  assert.match(route, /CaseLibraryFilters/);
  assert.match(route, /id="main-content"/);
  assert.match(filters, /aria-label="Lọc hồ sơ theo chủ đề"/);
  assert.match(filters, /Tìm tình huống/);
  assert.match(filters, /previews\.map/);
  assert.doesNotMatch(filters, /fetch\(/);
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npx tsx --test tests/living-thought-pages.test.ts`

Expected: FAIL because the route and filter component do not exist.

- [ ] **Step 3: Implement the library as complete initial markup**

Create `app/ho-so/page.tsx` as a Server Component with unique metadata, a compact page header, `ExperienceGuide`, and `CaseLibraryFilters previews={getCasePreviews()}`. Create `components/cases/case-library-filters.tsx` as a client component that initializes with category `all` and empty query, then filters the already-provided previews in memory. Render all 30 links during the initial render and show a polite result count after user input.

Use explicit labels:

```tsx
<input
  id="case-search"
  onChange={(event) => setQuery(event.target.value)}
  placeholder="Ví dụ: deadline, trách nhiệm, điểm số"
  type="search"
  value={query}
/>
```

Every category control must be a text button with `aria-pressed`, and every case link must include its category label, title, short prompt, and `Mở hồ sơ` action text.

- [ ] **Step 4: Add library styling and mobile density rules**

Add scoped `.case-library*` rules to `app/globals.css`. Use editorial rows rather than a dashboard card grid, ensure 44px filter targets, allow the category strip to wrap on desktop and scroll safely on narrow mobile, and keep `overflow-x: clip` on the page shell.

- [ ] **Step 5: Run focused and full unit tests**

Run: `npx tsx --test tests/living-thought-pages.test.ts`

Expected: PASS.

Run: `npm test`

Expected: PASS.

- [ ] **Step 6: Commit the case library**

```bash
git add app/ho-so/page.tsx components/cases/case-library-filters.tsx app/globals.css tests/living-thought-pages.test.ts
git commit -m "feat: add living thought case library"
```

---

### Task 3: Homepage Entry and Three-at-a-Time Suggestions

**Files:**
- Create: `components/cases/scenario-picker.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Modify: `tests/living-thought-pages.test.ts`
- Modify: `tests/qr-only-experience.test.ts`

**Interfaces:**
- Consumes: `getCasePreviews()`.
- Produces: the `Mở một hồ sơ` hero action, three visible suggestions, `Đổi tình huống`, and the preserved `Kho tư liệu nền` Trace list.

- [ ] **Step 1: Add failing Homepage integration tests**

Append tests that require:

```ts
test("Homepage makes living cases primary while retaining QR and Trace foundations", () => {
  const homepage = readSource("app/page.tsx");
  assert.match(homepage, /href="\/ho-so"/);
  assert.match(homepage, /Mở một hồ sơ/);
  assert.match(homepage, /ScenarioPicker/);
  assert.match(homepage, /Kho tư liệu nền/);
  assert.match(homepage, /QrShareDialog/);
  assert.match(homepage, /TopicList/);
});

test("scenario picker shows exactly three suggestions per rotation", () => {
  const picker = readSource("components/cases/scenario-picker.tsx");
  assert.match(picker, /VISIBLE_CASE_COUNT = 3/);
  assert.match(picker, /Đổi tình huống/);
  assert.match(picker, /aria-live="polite"/);
});
```

Update `tests/qr-only-experience.test.ts` so it continues to guard QR sharing and the absence of the previously reverted mandatory storytelling artifacts, without treating the newly approved `/ho-so` feature as a regression.

- [ ] **Step 2: Run the tests and verify RED**

Run: `npx tsx --test tests/living-thought-pages.test.ts tests/qr-only-experience.test.ts`

Expected: FAIL because `ScenarioPicker` and the new Homepage copy do not exist.

- [ ] **Step 3: Implement deterministic suggestion rotation**

Create a client component with `VISIBLE_CASE_COUNT = 3`, an integer page state, modulo wrapping, and a polite live region. The button changes only which three existing links are visible; it never randomizes after hydration and never blocks direct access to `/ho-so`.

- [ ] **Step 4: Integrate without redesigning the hero**

In `app/page.tsx`, keep the approved document image, title, supporting copy, header QR, and footer. Change only the hero action target/label, insert the suggestion section after the hero, relabel the existing topic heading to `Kho tư liệu nền`, and add a footer link to `/ho-so`.

- [ ] **Step 5: Style the suggestions as editorial prompts**

Add `.scenario-picker*` rules that use numbered rows, restrained red rules, and existing typography. Keep one prominent `Đổi tình huống` text button and avoid filled cards, shadows, gradients, or decorative motion.

- [ ] **Step 6: Run tests and commit**

Run: `npm test`

Expected: PASS.

```bash
git add app/page.tsx components/cases/scenario-picker.tsx app/globals.css tests/living-thought-pages.test.ts tests/qr-only-experience.test.ts
git commit -m "feat: feature living cases on homepage"
```

---

### Task 4: Static Six-Act Case Routes and Reused Historical Evidence

**Files:**
- Create: `app/ho-so/[slug]/page.tsx`
- Create: `components/cases/case-file-page.tsx`
- Create: `components/cases/case-evidence.tsx`
- Create: `components/cases/case-return.tsx`
- Create: `components/cases/experience-guide.tsx`
- Modify: `tests/living-thought-pages.test.ts`

**Interfaces:**
- Consumes: `ThoughtCase`, `getCaseEvidence()`, `getRelatedCases()`, `getSourceDrawerDetails()`, `SourceDrawer`, and existing Trace image presentation metadata.
- Produces: static `/ho-so/[slug]` pages with `#case-present`, `#case-assumption`, `#case-file`, `#case-evidence`, `#case-connection`, and `#case-return`.

- [ ] **Step 1: Write a failing server-markup test for all six acts**

Use `renderToStaticMarkup` against one known case:

```ts
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { CaseFilePage } from "@/components/cases/case-file-page";
import { getThoughtCaseBySlug } from "@/lib/thought-case-registry";

test("case page server markup contains the complete six-act narrative", () => {
  const item = getThoughtCaseBySlug("nhom-gioi-nhung-khong-hop-tac");
  assert.ok(item);
  const html = renderToStaticMarkup(createElement(CaseFilePage, { item }));

  for (const id of [
    "case-present",
    "case-assumption",
    "case-file",
    "case-evidence",
    "case-connection",
    "case-return",
  ]) {
    assert.match(html, new RegExp(`id="${id}"`));
  }

  assert.equal((html.match(/<h1/g) ?? []).length, 1);
  assert.equal((html.match(/case-evidence__reveal/g) ?? []).length, 3);
  assert.equal((html.match(/Nguồn &amp; kiểm chứng/g) ?? []).length, 3);
  assert.match(html, /Mở hồ sơ khác/);
  assert.match(html, /Đọc Trace đầy đủ/);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npx tsx --test tests/living-thought-pages.test.ts`

Expected: FAIL because the case route and components do not exist.

- [ ] **Step 3: Implement static params, metadata, and not-found behavior**

Create `app/ho-so/[slug]/page.tsx` using every `thoughtCases` slug in `generateStaticParams()`. Metadata uses the Vietnamese title and short prompt, canonical `/ho-so/${slug}`, and the primary Trace present-day image for Open Graph/Twitter. Unknown slugs call `notFound()`.

- [ ] **Step 4: Compose the six server-rendered acts**

`CaseFilePage` must render in document order:

1. present context and opening question;
2. common initial assumption and optional perspective text;
3. dossier opening with primary Trace title and a direct anchor to the first reveal;
4. three `CaseEvidence` sections;
5. primary Trace formation factors and conclusion;
6. `CaseReturn` with three lenses and related cases.

Every act receives an explicit eyebrow such as `Hồi 1 / Hiện tại`, and the page header links back to both `/` and `/ho-so`.

- [ ] **Step 5: Reuse Trace evidence without copying history**

For each reveal, call `getCaseEvidence(reveal.evidence)`, render `moment.year`, `moment.title`, `moment.summary`, `moment.metadata`, the existing image and credit, `SourceDrawer details={getSourceDrawerDetails(moment)}`, and a link to `/trace/${trace.slug}#moment-${moment.year}`. Keep authored `assumption`, `finding`, and `reframe` visually separate from the historical summary.

- [ ] **Step 6: Add native optional guidance**

Create `ExperienceGuide` with a `<details>` element labelled `Cách trải nghiệm`. Its three concise steps are: begin with the present question, scroll through three pieces of evidence, and return to compare three lenses. It must not open automatically or intercept scrolling.

- [ ] **Step 7: Run tests and commit**

Run: `npm test`

Expected: PASS.

```bash
git add -- 'app/ho-so/[slug]/page.tsx' components/cases/case-file-page.tsx components/cases/case-evidence.tsx components/cases/case-return.tsx components/cases/experience-guide.tsx tests/living-thought-pages.test.ts
git commit -m "feat: add six act living case experience"
```

---

### Task 5: Optional Perspective Prompt and Named Case Progress

**Files:**
- Create: `lib/thought-case-journey.ts`
- Create: `components/cases/perspective-prompt.tsx`
- Create: `components/cases/case-progress.tsx`
- Create: `tests/thought-case-journey.test.ts`
- Modify: `components/cases/case-file-page.tsx`
- Modify: `tests/living-thought-pages.test.ts`

**Interfaces:**
- Consumes: the six fixed section IDs and `ThoughtCase.optionalPerspective`.
- Produces: `getCaseProgressMilestones()`, optional selected perspective feedback, and `aria-current="step"` active progress links.

- [ ] **Step 1: Write failing journey helper tests**

Create `tests/thought-case-journey.test.ts`:

```ts
import assert from "node:assert/strict";
import test from "node:test";

import { getCaseProgressMilestones } from "@/lib/thought-case-journey";

test("case progress names all six acts in narrative order", () => {
  assert.deepEqual(getCaseProgressMilestones(), [
    { id: "case-present", href: "#case-present", label: "Vấn đề", ariaLabel: "Hồi 1: Vấn đề hiện tại" },
    { id: "case-assumption", href: "#case-assumption", label: "Giả định", ariaLabel: "Hồi 2: Giả định ban đầu" },
    { id: "case-file", href: "#case-file", label: "Mở hồ sơ", ariaLabel: "Hồi 3: Mở hồ sơ lịch sử" },
    { id: "case-evidence", href: "#case-evidence", label: "Dấu vết", ariaLabel: "Hồi 4: Ba dấu vết lịch sử" },
    { id: "case-connection", href: "#case-connection", label: "Kết nối", ariaLabel: "Hồi 5: Kết nối tư tưởng" },
    { id: "case-return", href: "#case-return", label: "Trở lại", ariaLabel: "Hồi 6: Trở lại hiện tại" },
  ]);
});
```

- [ ] **Step 2: Run journey tests and verify RED**

Run: `npx tsx --test tests/thought-case-journey.test.ts`

Expected: FAIL because the helper does not exist.

- [ ] **Step 3: Implement the pure milestone helper**

Return the exact readonly six-item array asserted by the test. Do not derive labels from DOM text.

- [ ] **Step 4: Implement optional perspective selection**

Create `PerspectivePrompt` as a small client component. Initial server markup shows both text choices. Each 44px button uses `aria-pressed`; selection updates a polite status sentence such as `Bạn đang nhìn tình huống từ góc: …`. Include `Bỏ lựa chọn` after selection. Do not store, score, or require the choice.

- [ ] **Step 5: Implement named progress without changing TraceProgress**

Create `CaseProgress` with the existing `requestAnimationFrame` scroll pattern used by `TraceProgress`. Its navigation label is `Tiến trình hồ sơ`, active links use `aria-current="step"`, click anchors remain normal links, and no content visibility depends on the state.

- [ ] **Step 6: Integrate enhancements and assert accessibility source contracts**

Render `CaseProgress` before `<main>` and `PerspectivePrompt` only when the tuple exists. Extend `tests/living-thought-pages.test.ts` to assert `aria-pressed`, `aria-live="polite"`, `aria-current`, `Tiến trình hồ sơ`, and the absence of `localStorage`, `preventDefault()` scroll locking, or completion gates.

- [ ] **Step 7: Run tests and commit**

Run: `npm test`

Expected: PASS.

```bash
git add lib/thought-case-journey.ts components/cases/perspective-prompt.tsx components/cases/case-progress.tsx components/cases/case-file-page.tsx tests/thought-case-journey.test.ts tests/living-thought-pages.test.ts
git commit -m "feat: add quiet guidance to living cases"
```

---

### Task 6: Editorial Dossier Styling and Accessibility Modes

**Files:**
- Modify: `app/globals.css`
- Modify: `tests/accessibility-regression.test.ts`
- Modify: `tests/living-thought-pages.test.ts`

**Interfaces:**
- Consumes: all `.case-*`, `.scenario-picker*`, and `.case-library*` class names.
- Produces: responsive dossier composition, one red trace line, readable controls, forced-colors markers, reduced-motion completion, and 640px reflow.

- [ ] **Step 1: Add failing CSS regression checks**

Require the stylesheet to expose scoped rules for `.case-file`, `.case-progress`, `.case-evidence`, `.case-connection`, `.case-return`, `@media (max-width: 48rem)`, `@media (forced-colors: active)`, and `@media (prefers-reduced-motion: reduce)`. Assert interactive case selectors have `min-height: 44px` or equivalent block sizing and never suppress the global focus outline.

- [ ] **Step 2: Run accessibility tests and verify RED**

Run: `npx tsx --test tests/accessibility-regression.test.ts tests/living-thought-pages.test.ts`

Expected: FAIL because the complete case stylesheet does not exist.

- [ ] **Step 3: Implement the dossier visual system**

Add scoped CSS that uses existing variables and fonts:

- cream page field with subtle paper layering made from borders and pseudo-elements;
- narrow file-number/marginal-note column on desktop;
- one continuous muted-red trace rule through the evidence sequence;
- historical media using current image fit/aspect metadata classes;
- large editorial headings and restrained sans-serif metadata;
- no generic filled cards, gradient decoration, shadow stack, icon-only control, or scroll-driven transform.

- [ ] **Step 4: Implement responsive behavior**

At 48rem and below, collapse marginalia into inline metadata, keep the progress strip horizontally scrollable without page overflow, reduce headings with `clamp()`, preserve 44px controls, and keep each present lens near two to three mobile lines through reasonable measure rather than truncation.

- [ ] **Step 5: Implement forced colors and reduced motion**

In forced colors, use `Canvas`, `CanvasText`, `LinkText`, and visible borders for active progress/prompt state. In reduced motion, remove transitions and reveal transforms from case elements, leaving every section fully visible. Do not override the global `:focus-visible` rule.

- [ ] **Step 6: Run unit gates and commit**

Run: `npm test`

Expected: PASS.

Run: `npm run typecheck`

Expected: PASS.

Run: `npm run lint`

Expected: PASS.

```bash
git add app/globals.css tests/accessibility-regression.test.ts tests/living-thought-pages.test.ts
git commit -m "style: refine living case dossier experience"
```

---

### Task 7: Static SEO, Sitemap, and Route Completeness

**Files:**
- Modify: `app/sitemap.ts`
- Modify: `tests/living-thought-pages.test.ts`
- Modify: `tests/public-release.test.ts`

**Interfaces:**
- Consumes: `thoughtCases`, `siteUrl`, and primary Trace present images.
- Produces: 31 new sitemap entries (`/ho-so` plus 30 cases, in addition to existing routes) and unique canonical metadata.

- [ ] **Step 1: Add failing sitemap and metadata tests**

Import `sitemap()` and assert every `/ho-so/${slug}` URL appears exactly once, `/ho-so` appears once, all previous public routes remain, and the total is the previous five routes plus 31 new routes. Source-check the dynamic route for `generateStaticParams`, canonical metadata, Open Graph image reuse, and `notFound()`.

- [ ] **Step 2: Run the tests and verify RED**

Run: `npx tsx --test tests/living-thought-pages.test.ts tests/public-release.test.ts`

Expected: FAIL because the sitemap does not include case routes.

- [ ] **Step 3: Extend the sitemap from typed case data**

Keep the existing public routes and append `/ho-so` plus `thoughtCases.map(({ slug }) => `/ho-so/${slug}`)`. Build absolute URLs through `siteUrl` exactly as the current implementation does.

- [ ] **Step 4: Run release unit tests and build**

Run: `npm test`

Expected: PASS.

Run: `npm run typecheck`

Expected: PASS.

Run: `npm run lint`

Expected: PASS.

Run: `npm run build`

Expected: PASS and all 30 case routes appear as statically generated pages.

- [ ] **Step 5: Commit SEO coverage**

```bash
git add app/sitemap.ts tests/living-thought-pages.test.ts tests/public-release.test.ts
git commit -m "feat: publish living case routes"
```

---

### Task 8: Production Acceptance, Performance Evidence, and Release PR

**Files:**
- Create: `tests/case_acceptance.py`
- Modify: `docs/release-readiness.md`

**Interfaces:**
- Consumes: a production server at `http://127.0.0.1:3700` and the existing Python Playwright conventions.
- Produces: browser evidence for all 30 routes, representative interaction paths, accessibility modes, no-JavaScript readability, and Lighthouse medians.

- [ ] **Step 1: Write the production acceptance script before final fixes**

Create `tests/case_acceptance.py` following the existing acceptance helpers. Cover:

- Homepage and `/ho-so` at 1920x1080, 1366x768, 390x844, and 375x812;
- one representative case from each category at desktop and 390x844;
- all 30 routes returning success with exactly one `h1` and six act anchors;
- search, category filter, `Đổi tình huống`, optional perspective selection, every progress anchor, Source Drawer, related cases, and Trace deep links;
- keyboard-only traversal and visible focus;
- 640x900 reflow, forced colors, reduced motion, no JavaScript, no horizontal overflow, no hydration error, and no console error;
- Homepage QR and existing Trace progress/recap regression.

Use locator waits or `wait_for_function`; avoid fixed long sleeps.

- [ ] **Step 2: Run production acceptance and observe failures**

Run the production build and server:

```powershell
npm run build
$env:PORT='3700'; npm run start
```

In a second shell run:

```powershell
$env:ACCEPTANCE_BASE_URL='http://127.0.0.1:3700'; python tests/case_acceptance.py
```

Expected on first run: any remaining browser-level issue is reported with route, viewport, and selector evidence.

- [ ] **Step 3: Fix each acceptance issue through a focused RED -> GREEN regression**

For each issue, first add the smallest failing TypeScript or Python assertion that reproduces it, run that assertion to confirm the failure, patch only the responsible component/style, then rerun the focused assertion and the full unit suite.

- [ ] **Step 4: Run the full release gates**

Run:

```powershell
npm test
npm run typecheck
npm run lint
npm run build
$env:ACCEPTANCE_BASE_URL='http://127.0.0.1:3700'; python tests/homepage_acceptance.py
$env:ACCEPTANCE_BASE_URL='http://127.0.0.1:3700'; python tests/trace_acceptance.py
$env:ACCEPTANCE_BASE_URL='http://127.0.0.1:3700'; python tests/case_acceptance.py
```

Expected: every command PASS with no console, hydration, overflow, anchor, QR, Source Drawer, Trace progress, or Trace recap regression.

- [ ] **Step 5: Record three-run Lighthouse medians**

Measure Homepage, `/ho-so`, and one representative case three times each against the production server. Record median Performance, Accessibility, Best Practices, and SEO values in `docs/release-readiness.md`. Do not lower the release baseline to force acceptance; fix regressions that exceed ordinary run variance.

- [ ] **Step 6: Commit release evidence**

```bash
git add tests/case_acceptance.py docs/release-readiness.md
git commit -m "test: verify living thought case release"
```

- [ ] **Step 7: Push and open one non-draft PR**

```bash
git status --short --branch
git diff --check origin/main...HEAD
git push -u origin feat/living-thought-cases
$prBody = @'
## What changed
- Adds the 30-case Hồ sơ tư tưởng sống taxonomy and full `/ho-so` library.
- Adds source-backed six-act case journeys with quiet optional guidance.
- Preserves the approved Trace, Source Drawer, QR, responsive, and accessibility foundations.

## Verification
- Unit tests, typecheck, lint, build, Homepage acceptance, Trace acceptance, and case acceptance pass.
- Three-run Lighthouse medians are recorded in `docs/release-readiness.md`.
'@
gh pr create --base main --head feat/living-thought-cases --title "feat: add living thought case experience" --body $prBody
```

The PR body must summarize the 30-case taxonomy, six-act source-backed journey, quiet guidance, progressive enhancement, test/build/acceptance results, and Lighthouse medians. Stop after reporting the non-draft PR URL; do not merge.

---

## Self-Review Record

- Spec coverage: all success criteria, non-goals, 30-case taxonomy, six acts, Homepage integration, quiet guidance, accessibility modes, SEO, performance, and release constraints map to Tasks 1-8.
- Deferred-work scan: implementation steps contain concrete files, interfaces, tests, commands, and expected results; no unfinished feature work is left inside the launch scope.
- Type consistency: `ThoughtCase`, `CaseEvidenceReference`, `ThoughtCasePreview`, `getCaseEvidence()`, `getCasePreviews()`, and the six progress IDs remain identical across data, routes, components, and tests.
- Architecture guard: existing Trace data, Trace routes, TraceProgress, TraceRecap, SourceDrawer, image taxonomy, and QR behavior are consumed or regression-tested rather than rewritten.
