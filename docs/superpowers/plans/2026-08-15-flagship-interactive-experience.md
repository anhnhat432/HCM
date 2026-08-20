# Flagship Interactive Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. The user explicitly prohibited commit, push, and merge; use diff review checkpoints instead of commits.

**Goal:** Build the approved Storyboard V2 investigation experience for exactly three Thought Cases while preserving the existing 27 standard cases and three Trace experiences.

**Architecture:** Server stage components select flagship mode through `interactiveExperience`, resolve historical evidence into a minimal serializable view model, and render three bounded client islands: `InitialDecision`, `InvestigationBoard`, and `BeforeAfterDecision`. A validated session store persists the initial choice, viewed evidence IDs, and final lens in `sessionStorage` without importing Thought Case or Trace data.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Framer Motion 13, CSS in `app/globals.css`, Node test runner through `tsx --test`, Python Playwright production acceptance.

## Global Constraints

- Enable investigation mode for exactly `nhom-gioi-nhung-khong-hop-tac`, `mot-nguoi-ganh-het-cong-viec`, and `diem-so-co-dinh-nghia-con-nguoi`.
- Do not redesign the Homepage, 27 standard cases, three Trace routes, SourceDrawer, QR sharing, Journey Closing, or `/phuong-phap`.
- Do not add dependencies, 3D, WebGL, video, particles, scoring, quiz correctness, chat, or new interactions outside Storyboard V2.
- Server resolves all evidence. Client code must not import `data/traces.ts`, `data/thought-cases.ts`, or either registry for session validation.
- Core historical content and route navigation must exist in server-rendered HTML.
- Drag is desktop-only progressive enhancement; click/tap/keyboard is the complete flow.
- Respect reduced motion, forced colors, keyboard focus, minimum 44px mobile targets, and no-JavaScript fallback.
- Do not commit, push, or merge.

---

### Task 1: Flagship Configuration and Data Contracts

**Files:**
- Modify: `types/thought-case.ts`
- Modify: `data/thought-cases.ts`
- Modify: `lib/thought-case-registry.ts`
- Create: `tests/flagship-investigation.test.ts`

**Interfaces:**
- Produces: `InvestigationInitialChoice`, `InvestigationExperience`, `interactiveExperience?`, and preview-level `interactiveMode?`.
- Produces: exactly three data configurations consumed by all later tasks.

- [ ] **Step 1: Write failing configuration tests**

Create `tests/flagship-investigation.test.ts` with assertions equivalent to:

```ts
import assert from "node:assert/strict";
import test from "node:test";

import { thoughtCases } from "@/data/thought-cases";
import { getCaseEvidence } from "@/lib/thought-case-registry";

const FLAGSHIP_SLUGS = [
  "nhom-gioi-nhung-khong-hop-tac",
  "mot-nguoi-ganh-het-cong-viec",
  "diem-so-co-dinh-nghia-con-nguoi",
] as const;

test("exactly the approved three cases enable investigation mode", () => {
  const flagship = thoughtCases.filter(
    (item) => item.interactiveExperience?.mode === "investigation",
  );
  assert.deepEqual(flagship.map((item) => item.slug), FLAGSHIP_SLUGS);
  assert.equal(thoughtCases.length - flagship.length, 27);
});

test("every flagship configuration resolves three unique choices and clues", () => {
  for (const item of thoughtCases.filter((candidate) => candidate.interactiveExperience)) {
    const config = item.interactiveExperience!;
    assert.equal(config.initialChoices.length, 3);
    assert.equal(new Set(config.initialChoices.map((choice) => choice.id)).size, 3);
    assert.equal(config.clueLabels.length, 3);
    assert.ok(config.clueLabels.every(Boolean));
    item.reveals.forEach((reveal) => assert.doesNotThrow(() => getCaseEvidence(reveal.evidence)));
  }
});
```

- [ ] **Step 2: Run the focused test and confirm RED**

Run:

```bash
npx tsx --test tests/flagship-investigation.test.ts
```

Expected: TypeScript or assertion failure because `interactiveExperience` does not exist.

- [ ] **Step 3: Add the optional contracts**

Add to `types/thought-case.ts`:

```ts
export interface InvestigationInitialChoice {
  readonly id: string;
  readonly label: string;
  readonly perspective: string;
}

export interface InvestigationExperience {
  readonly mode: "investigation";
  readonly clueLabels: readonly [string, string, string];
  readonly initialChoices: readonly [
    InvestigationInitialChoice,
    InvestigationInitialChoice,
    InvestigationInitialChoice,
  ];
}
```

Add `interactiveExperience?: InvestigationExperience` to `ThoughtCase` and `interactiveMode?: "investigation"` to `ThoughtCasePreview`.

- [ ] **Step 4: Add the three locked configurations**

Flagship 01:

```ts
interactiveExperience: {
  mode: "investigation",
  clueLabels: [
    "MỤC TIÊU CHUNG",
    "TÔN TRỌNG KHÁC BIỆT",
    "ĐỒNG THUẬN THÀNH HÀNH ĐỘNG",
  ],
  initialChoices: [
    {
      id: "giu-toc-do-ca-nhan",
      label: "Giữ tốc độ cá nhân",
      perspective: "Người giỏi nên có quyền tự chủ lớn hơn nhịp chung.",
    },
    {
      id: "ep-vao-mot-quy-trinh",
      label: "Ép vào một quy trình",
      perspective: "Tập thể chỉ ổn khi tất cả tuân theo cùng một cách làm.",
    },
    {
      id: "thong-nhat-muc-tieu",
      label: "Thống nhất mục tiêu, giữ khác biệt",
      perspective: "Không cần giống cách làm, nhưng phải cùng chịu trách nhiệm ở các điểm nối.",
    },
  ],
},
```

Flagship 02 choices:

```ts
[
  {
    id: "lam-thay-de-cuu-deadline",
    label: "Làm thay để cứu deadline",
    perspective: "Kết quả trước mắt quan trọng hơn việc ai đang thực sự gánh trách nhiệm.",
  },
  {
    id: "tra-viec-ve-dung-nguoi",
    label: "Trả việc về đúng người",
    perspective: "Trách nhiệm chỉ tồn tại khi mỗi người thực sự sở hữu phần việc của mình.",
  },
  {
    id: "ho-tro-nhung-khong-lam-thay",
    label: "Hỗ trợ nhưng không làm thay",
    perspective: "Có thể tháo điểm nghẽn khẩn cấp mà vẫn giữ quyền sở hữu công việc cho từng người.",
  },
]
```

Flagship 02 clues:

```ts
["TRÁCH NHIỆM ĐÚNG NGƯỜI", "QUY TRÌNH MINH BẠCH", "HỖ TRỢ CÓ GIỚI HẠN"]
```

Flagship 03 choices:

```ts
[
  {
    id: "diem-la-ket-luan-nang-luc",
    label: "Xem điểm là kết luận về năng lực",
    perspective: "Một kết quả thấp là tín hiệu khách quan rằng khả năng của mình có giới hạn.",
  },
  {
    id: "tam-gac-diem-sang-ben",
    label: "Tạm gác điểm sang một bên",
    perspective: "Điều quan trọng lúc này là bảo vệ bản thân khỏi áp lực và so sánh.",
  },
  {
    id: "dung-diem-de-dieu-chinh",
    label: "Dùng điểm để điều chỉnh cách học",
    perspective: "Điểm số là một dữ kiện để tìm phần thiếu, không phải phán quyết về giá trị lâu dài.",
  },
]
```

Flagship 03 clues:

```ts
["GIÁ TRỊ KHÔNG BỊ THU GỌN", "CÓ THỂ ĐƯỢC BỒI DƯỠNG", "PHÁT TRIỂN BỀN VỮNG"]
```

Update `getCasePreviews()` to derive `interactiveMode` without exposing full config.

- [ ] **Step 5: Run focused and registry tests and confirm GREEN**

```bash
npx tsx --test tests/flagship-investigation.test.ts tests/thought-case-registry.test.ts
```

Expected: all selected tests pass.

- [ ] **Step 6: Review diff without committing**

```bash
git diff --check -- types/thought-case.ts data/thought-cases.ts lib/thought-case-registry.ts tests/flagship-investigation.test.ts
```

---

### Task 2: Validated Session Store

**Files:**
- Create: `lib/case-session.ts`
- Extend: `tests/flagship-investigation.test.ts`

**Interfaces:**
- Consumes: allowed choice IDs and evidence IDs supplied by a client island.
- Produces: `CaseSessionValidation`, `FlagshipCaseSession`, and five storage functions.

- [ ] **Step 1: Write failing session tests**

Use a small `Storage` test double and assert:

```ts
const validation = {
  choiceIds: ["choice-a", "choice-b", "choice-c"],
  evidenceIds: ["trace:e1", "trace:e2", "trace:e3"],
};

test("session validation removes unknown persisted IDs", () => {
  storage.setItem(key, JSON.stringify({
    version: 1,
    initialChoiceId: "unknown",
    viewedEvidenceIds: ["trace:e1", "unknown"],
    finalLensIndex: 9,
  }));
  assert.deepEqual(getCaseSession(slug, validation, storage), {
    version: 1,
    viewedEvidenceIds: ["trace:e1"],
  });
});

test("markEvidenceViewed is idempotent", () => {
  markEvidenceViewed(slug, validation, "trace:e1", storage);
  const result = markEvidenceViewed(slug, validation, "trace:e1", storage);
  assert.deepEqual(result.viewedEvidenceIds, ["trace:e1"]);
});
```

Allow an optional injected `Storage` parameter for tests while production defaults to `window.sessionStorage`.

- [ ] **Step 2: Run focused test and confirm RED**

```bash
npx tsx --test tests/flagship-investigation.test.ts
```

Expected: module-not-found for `lib/case-session.ts`.

- [ ] **Step 3: Implement the session module**

Use these exact public signatures:

```ts
export interface CaseSessionValidation {
  readonly choiceIds: readonly string[];
  readonly evidenceIds: readonly string[];
}

export interface FlagshipCaseSession {
  readonly version: 1;
  readonly initialChoiceId?: string;
  readonly viewedEvidenceIds: readonly string[];
  readonly finalLensIndex?: 0 | 1 | 2;
}

export function getCaseSession(
  slug: string,
  validation: CaseSessionValidation,
  storage?: Storage,
): FlagshipCaseSession;
```

Implement `setInitialChoice`, `markEvidenceViewed`, `setFinalLens`, and `clearCaseSession` with the same optional storage parameter. Use `duoc-hong:case:${slug}:journey`, version checking, `try/catch`, and a safe empty state.

Do not import any data or registry module.

- [ ] **Step 4: Run focused tests and confirm GREEN**

```bash
npx tsx --test tests/flagship-investigation.test.ts
```

- [ ] **Step 5: Enforce the client-boundary constraint**

Add a source assertion to the test:

```ts
assert.doesNotMatch(sessionSource, /data\/thought-cases|data\/traces|thought-case-registry|trace-registry/);
```

- [ ] **Step 6: Review diff without committing**

```bash
git diff --check -- lib/case-session.ts tests/flagship-investigation.test.ts
```

---

### Task 3: Server-Resolved Investigation View Model

**Files:**
- Create: `components/cases/investigation/investigation-types.ts`
- Modify: `components/cases/case-evidence-stage.tsx`
- Extend: `tests/flagship-investigation.test.ts`
- Modify: `tests/living-thought-pages.test.ts`

**Interfaces:**
- Consumes: `ThoughtCase.reveals`, `getCaseEvidence`, and `getSourceDrawerDetails` on the server.
- Produces: `InvestigationEvidence[]` passed to Stage 2 client code.

- [ ] **Step 1: Write failing view-model and server-markup tests**

Assert that each flagship evidence item contains the expected minimal fields and that the rendered flagship Stage 2 HTML contains all three years, titles, summaries, assumptions, findings, reframes, clue labels, and source fallback links.

Also assert source code boundaries:

```ts
const boardSource = readSource("components/cases/investigation/investigation-board.tsx");
assert.doesNotMatch(boardSource, /data\/traces|trace-registry|getCaseEvidence/);
```

- [ ] **Step 2: Run tests and confirm RED**

```bash
npx tsx --test tests/flagship-investigation.test.ts tests/living-thought-pages.test.ts
```

- [ ] **Step 3: Define the serializable view model**

Create `InvestigationEvidence` exactly as approved in the design spec, using `TraceImage` and `SourceDrawerDetails` types.

- [ ] **Step 4: Resolve evidence in the Server Component**

In `CaseEvidenceStage`, map each reveal to:

```ts
{
  id: `${reveal.evidence.traceSlug}:${reveal.evidence.momentId}`,
  index,
  traceSlug: trace.slug,
  year: moment.year,
  title: moment.title,
  summary: moment.summary,
  metadata: moment.metadata,
  image: moment.image,
  assumption: reveal.assumption,
  finding: reveal.finding,
  reframe: reveal.reframe,
  clueLabel: item.interactiveExperience.clueLabels[index],
  sourceDetails: getSourceDrawerDetails(moment),
}
```

Render the current standard Stage 2 unchanged when no investigation config exists. Render `InvestigationBoard` only for flagship mode.

- [ ] **Step 5: Run focused tests and confirm GREEN**

```bash
npx tsx --test tests/flagship-investigation.test.ts tests/living-thought-pages.test.ts
```

- [ ] **Step 6: Review diff without committing**

```bash
git diff --check -- components/cases/investigation/investigation-types.ts components/cases/case-evidence-stage.tsx tests
```

---

### Task 4: Stage 1 Initial Decision Island

**Files:**
- Create: `components/cases/investigation/initial-decision.tsx`
- Modify: `components/cases/case-present-stage.tsx`
- Modify: `app/globals.css`
- Extend: `tests/living-thought-pages.test.ts`
- Extend: `tests/case_acceptance.py`

**Interfaces:**
- Consumes: `item.slug`, `item.openingQuestion`, and `interactiveExperience.initialChoices`.
- Produces: persisted `initialChoiceId`, visual `Phiếu quyết định 2026`, and the existing Stage 2 route link.

- [ ] **Step 1: Write failing server-markup and acceptance assertions**

Server markup must contain the question, all three choices, `Phiếu quyết định 2026`, and `Lần theo dấu vết lịch sử` before hydration.

Playwright must select a choice using keyboard, verify `aria-pressed` or checked state, inspect session storage, and follow the Stage 2 link.

- [ ] **Step 2: Run focused tests and confirm RED**

```bash
npx tsx --test tests/living-thought-pages.test.ts
```

- [ ] **Step 3: Implement `InitialDecision`**

Use one client island with:

```ts
const [previewChoiceId, setPreviewChoiceId] = useState<string | null>(null);
const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
```

Initialize selection from `getCaseSession` in an effect without returning `null` before mount. Always render the route link. Preview on pointer/focus changes only the central perspective; click/keyboard selection persists state and applies the decision-slip visual state.

- [ ] **Step 4: Keep standard Stage 1 unchanged**

`CasePresentStage` renders the current `ExperienceGuide`, CTA, assumption section, and `PerspectivePrompt` for standard cases. Flagship mode replaces only the approved Stage 1 body.

- [ ] **Step 5: Add namespaced Stage 1 CSS**

Use `.case-investigation` and `.case-investigation__decision-*`. Desktop uses spatial directions; mobile converts to a logical vertical group. Reuse current palette, typography, lines, and global focus ring.

- [ ] **Step 6: Run focused tests and browser check**

```bash
npx tsx --test tests/living-thought-pages.test.ts tests/flagship-investigation.test.ts
```

Then run the Stage 1 subsection of `tests/case_acceptance.py` against production later in Task 9.

---

### Task 5: Stage 2 Disclosure and Investigation State Machine

**Files:**
- Create: `components/cases/investigation/investigation-board.tsx`
- Modify: `app/globals.css`
- Extend: `tests/living-thought-pages.test.ts`
- Extend: `tests/case_acceptance.py`

**Interfaces:**
- Consumes: `slug`, `openingQuestion`, initial choices, and three `InvestigationEvidence` records.
- Produces: disclosure, phased evidence exploration, persisted viewed IDs, and clue collection.

- [ ] **Step 1: Write failing markup tests for semantic disclosure**

Assert exactly three `<details>` and three `<summary>` elements in server markup. Each details body must contain full assumption, finding, reframe, summary, source fallback, and clue label.

- [ ] **Step 2: Write failing interaction acceptance**

For Flagship 01:

1. enter Stage 2 directly and assert three dossiers;
2. open evidence 1 using keyboard;
3. reveal comparison;
4. reveal clue;
5. collect clue;
6. assert visible `ĐÃ THU THẬP`, `aria` state, and session storage;
7. refresh and assert restoration;
8. repeat for evidence 2 and 3.

- [ ] **Step 3: Run focused tests and confirm RED**

```bash
npx tsx --test tests/living-thought-pages.test.ts tests/flagship-investigation.test.ts
```

- [ ] **Step 4: Implement the board state machine**

Use parent-island state only:

```ts
type EvidencePhase = "assumption" | "comparison" | "clue";

const [activeEvidenceId, setActiveEvidenceId] = useState<string | null>(null);
const [phaseByEvidence, setPhaseByEvidence] = useState<Record<string, EvidencePhase>>({});
const [viewedEvidenceIds, setViewedEvidenceIds] = useState<readonly string[]>([]);
```

The native details body contains all content. With JavaScript, namespaced CSS and state visually reveal one phase at a time without deleting core DOM content.

Collection calls `markEvidenceViewed`, restores focus to a stable dossier summary, and exposes the clue at the central decision slip.

- [ ] **Step 5: Implement optional desktop drag**

Use Framer Motion drag only on a revealed clue token. `onDragEnd` collects when the token intersects the central drop target. Keep the named `Đưa dấu vết vào vấn đề 2026` button as the full alternative.

- [ ] **Step 6: Implement the rewind state**

Reconstruct the decision slip from the selected choice and animate from the 2026 endpoint toward the first evidence year. Skip immediately for reduced motion and avoid replay after browser back/forward when the board is already restored.

- [ ] **Step 7: Add responsive board/workspace CSS**

Desktop: asymmetrical dossiers around a central slip. Tablet: reduced rotation/overlap. Mobile: vertical details stack with no drag and a compact sticky-looking problem slip that does not use `position: fixed`.

- [ ] **Step 8: Run focused tests and inspect SSR output**

```bash
npx tsx --test tests/living-thought-pages.test.ts tests/flagship-investigation.test.ts
```

Render static markup and confirm all evidence text exists before browser effects.

---

### Task 6: Thought Map Payoff

**Files:**
- Modify: `components/cases/investigation/investigation-board.tsx`
- Modify: `app/globals.css`
- Extend: `tests/case_acceptance.py`
- Extend: `tests/accessibility-regression.test.ts`

**Interfaces:**
- Consumes: the three persisted viewed evidence IDs and their clue tokens.
- Produces: near-full-viewport map completion and Stage 3 CTA.

- [ ] **Step 1: Add failing tests for the three-clue gate**

Acceptance must assert:

- no completed map and no Stage 3 flagship CTA after one or two clues;
- completed map, three clue labels, three year labels, and CTA after clue three;
- reduced motion renders the same final map without animated delay.

- [ ] **Step 2: Run the acceptance subsection and confirm RED**

Run the new targeted Playwright function against the current production server when available; expected failure is missing map state.

- [ ] **Step 3: Implement map completion from collected state**

Derive:

```ts
const isMapComplete = evidence.every(({ id }) => viewedEvidenceIds.includes(id));
```

Do not create a separate map data source. Keep map clue nodes identical to the collected clue components.

Render SVG connector paths only in complete mode. Animate `pathLength` from 0 to 1 using Framer Motion; reduced motion uses `pathLength: 1` immediately.

- [ ] **Step 4: Implement focus and announcement behavior**

When clue three is collected, announce `Ba dấu vết đã được kết nối với vấn đề 2026.` and move focus to a `tabIndex={-1}` map heading after the final layout is present.

- [ ] **Step 5: Add forced-color and mobile map rules**

Forced colors use system borders and text labels. Mobile maps clues vertically and avoids SVG lines crossing text.

- [ ] **Step 6: Run focused unit/accessibility tests**

```bash
npx tsx --test tests/accessibility-regression.test.ts tests/living-thought-pages.test.ts tests/flagship-investigation.test.ts
```

---

### Task 7: Stage 3 Before / Clues / After Island

**Files:**
- Create: `components/cases/investigation/before-after-decision.tsx`
- Modify: `components/cases/case-return-stage.tsx`
- Modify: `components/cases/case-return.tsx`
- Modify: `app/globals.css`
- Extend: `tests/living-thought-pages.test.ts`
- Extend: `tests/case_acceptance.py`

**Interfaces:**
- Consumes: initial choices, clue labels/year provenance, and existing `presentLenses`.
- Produces: persisted final lens, Before / After path, completion statement, and completion stamp.

- [ ] **Step 1: Write failing markup and acceptance tests**

Flagship Stage 3 server markup must contain thought formation, all lenses, all clue labels, and normal related-case actions. Direct entry without session must not render fake previous-choice text.

Acceptance with prepared session must select a lens via keyboard and assert the Before / After region and `HỒ SƠ ĐÃ HOÀN TẤT`.

- [ ] **Step 2: Run focused tests and confirm RED**

```bash
npx tsx --test tests/living-thought-pages.test.ts tests/flagship-investigation.test.ts
```

- [ ] **Step 3: Implement `BeforeAfterDecision`**

Use a semantic radio group or pressed-button group in logical order. Restore `finalLensIndex` from validated session. Selecting a lens completes the path but never says that the user improved or changed.

Always use:

```text
Bạn không nhận một đáp án có sẵn. Bạn vừa có thêm căn cứ để tự đưa ra lựa chọn.
```

- [ ] **Step 4: Preserve standard Stage 3**

Standard cases keep the current `CaseReturnStage` and `CaseReturn` markup. Flagship mode adds the approved path around the existing thought-formation and lens content without changing Trace data.

- [ ] **Step 5: Add responsive continuity CSS**

Desktop uses `TRƯỚC | three clues | SAU`. Mobile uses the vertical sequence. Clue token typography/borders/year labels match Stage 2 exactly.

- [ ] **Step 6: Run focused tests and review diff**

```bash
npx tsx --test tests/living-thought-pages.test.ts tests/flagship-investigation.test.ts
git diff --check -- components/cases app/globals.css tests
```

---

### Task 8: Homepage Discovery and Regression Guardrails

**Files:**
- Modify: `components/cases/scenario-picker.tsx`
- Modify: `app/page.tsx` only if prop shape needs adjustment
- Modify: `app/globals.css`
- Extend: `tests/living-thought-pages.test.ts`
- Extend: `tests/homepage_acceptance.py`
- Extend: `tests/typography-regression.test.ts`

**Interfaces:**
- Consumes: preview-level `interactiveMode`.
- Produces: the three flagship cases as the first picker page with restrained interaction labels.

- [ ] **Step 1: Write failing picker tests**

Assert the first three previews are the approved flagship slugs and each visible link includes `TRẢI NGHIỆM TƯƠNG TÁC`. Assert the remaining 27 previews remain reachable through rotation and the library link remains visible.

- [ ] **Step 2: Run focused tests and confirm RED**

```bash
npx tsx --test tests/living-thought-pages.test.ts tests/typography-regression.test.ts
```

- [ ] **Step 3: Update ScenarioPicker**

Order previews with investigation cases first while preserving data order inside the flagship and standard groups. Render a small label only when `interactiveMode === "investigation"`. Use the requested copy `Xem toàn bộ 30 hồ sơ ->`.

- [ ] **Step 4: Add restrained label styling**

No badge fill, rounded pill, or new card surface. Use utility typography and a muted red/archival accent consistent with current tokens.

- [ ] **Step 5: Run focused tests and Homepage acceptance later in Task 9**

```bash
npx tsx --test tests/living-thought-pages.test.ts tests/typography-regression.test.ts
```

---

### Task 9: Full Production Verification and Visual QA

**Files:**
- Modify as required by discovered defects only, with a failing regression test before each fix.
- Update: `tests/case_acceptance.py`
- Update: `tests/homepage_acceptance.py`

**Interfaces:**
- Produces: verified flagship and standard production behavior; no repository publication.

- [ ] **Step 1: Run all static verification**

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

Expected: every command exits 0.

- [ ] **Step 2: Start the production build locally**

Run `next start -p 3700` from the completed build and verify readiness before browser tests.

- [ ] **Step 3: Run Homepage and existing Case acceptance**

```bash
$env:HCM_BASE_URL='http://localhost:3700'; python tests/homepage_acceptance.py
$env:HCM_BASE_URL='http://localhost:3700'; python tests/case_acceptance.py
```

- [ ] **Step 4: Verify all required viewports**

Exercise the full Flagship 01 flow at:

```text
1440x900
1366x768
1024x768
768x1024
390x844
375x812
```

Also sample Flagship 02 and 03 at 1366x768 and 390x844.

- [ ] **Step 5: Verify accessibility modes**

Check keyboard-only flow, reduced motion, forced colors, and JavaScript-disabled core content. Confirm drag is never required.

- [ ] **Step 6: Verify runtime quality**

Assert no horizontal overflow, console error, hydration error, broken SourceDrawer focus restoration, broken direct navigation, or unreachable Stage 3 CTA.

- [ ] **Step 7: Capture QA screenshots**

Capture representative Stage 1 decision, Stage 2 board, evidence workspace, completed thought map, and Stage 3 Before / After on desktop and mobile for visual review.

- [ ] **Step 8: Review final repository state without publishing**

```bash
git diff --check
git status --short
git diff --stat
```

Do not commit, push, or merge.

