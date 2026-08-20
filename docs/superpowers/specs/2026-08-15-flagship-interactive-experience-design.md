# ĐUỐC HỒNG Flagship Interactive Experience Design

**Status:** Storyboard V2 approved on 2026-08-15. This document locks the UX and architecture before implementation.

## 1. Goal

Create one reusable investigation experience that turns three existing Thought Cases into the signature interaction of ĐUỐC HỒNG:

`Current problem -> initial decision -> historical investigation -> three collected clues -> thought map -> return to 2026 -> Before / After`

The experience must make the user visibly manipulate and interpret historical evidence. It must not feel like a sequence of presentation slides, a quiz, a dashboard, or a game.

## 2. Flagship Cases

Exactly three cases use investigation mode:

1. `nhom-gioi-nhung-khong-hop-tac` -> `dai-doan-ket`
2. `mot-nguoi-ganh-het-cong-viec` -> `dao-duc-trach-nhiem`
3. `diem-so-co-dinh-nghia-con-nguoi` -> `con-nguoi`

The third case is selected because it is directly relevant to students, introduces an individual-development problem instead of a third teamwork problem, and supports a clear personal Before / After.

The other 27 cases retain the current three-page experience without flagship client logic or visual changes.

## 3. Non-Goals

- Do not redesign the Homepage, the 27 standard Thought Cases, or the three Trace experiences.
- Do not add 3D, WebGL, video, particles, confetti, scores, XP, achievements, leaderboards, chat, AI, or correct/incorrect feedback.
- Do not add a new animation or graph dependency.
- Do not copy historical data, source URLs, licenses, or provenance out of `data/traces.ts`.
- Do not make drag the required interaction.
- Do not add new interaction concepts beyond approved Storyboard V2.

## 4. Experience Principles

1. **The 2026 decision is a persistent object.** The user's initial choice becomes a `Phiếu quyết định 2026` that is visually reconstructed in Stages 2 and 3.
2. **Server decides content; Client upgrades interaction.** Historical content is resolved on the server and remains present in server-rendered HTML.
3. **Evidence is explored in layers.** Each document follows `assumption -> comparison -> clue`, never one dense block containing assumption, finding, and reframe simultaneously.
4. **Collected clues are real state.** A clue moves from its historical document into the central board and is persisted for the browser session.
5. **The map is made, not shown.** The thought map only completes after the third clue is collected. Its lines animate from the collected clue positions into the current problem.
6. **Before / After is descriptive, not evaluative.** The product records choices without deciding whether the user improved or was correct.
7. **Clarity outranks spectacle.** Motion only explains continuity, collection, connection, or completion.

## 5. Data Model

Extend `ThoughtCase` with one optional, data-owned configuration:

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

export interface ThoughtCase {
  // Existing fields remain unchanged.
  readonly interactiveExperience?: InvestigationExperience;
}
```

Configuration is the only way to enable flagship mode. Components must not branch on case slugs or contain case-specific copy.

`clueLabels[index]` corresponds to `reveals[index]`. Historical evidence continues to be referenced by `traceSlug + momentId` through `reveal.evidence`.

### Flagship 01 locked copy

Initial choices:

1. `Giữ tốc độ cá nhân` — `Người giỏi nên có quyền tự chủ lớn hơn nhịp chung.`
2. `Ép vào một quy trình` — `Tập thể chỉ ổn khi tất cả tuân theo cùng một cách làm.`
3. `Thống nhất mục tiêu, giữ khác biệt` — `Không cần giống cách làm, nhưng phải cùng chịu trách nhiệm ở các điểm nối.`

Clue labels:

1. `MỤC TIÊU CHUNG`
2. `TÔN TRỌNG KHÁC BIỆT`
3. `ĐỒNG THUẬN THÀNH HÀNH ĐỘNG`

The other two flagship configurations follow the same shape and derive their clue meaning from their existing three reveals and present-day application.

## 6. Server-Resolved View Model

`CaseEvidenceStage` remains a Server Component. It resolves all `reveal.evidence` references before rendering the client island.

The client receives only the minimum serializable view model:

```ts
export interface InvestigationEvidence {
  readonly id: string;
  readonly index: 0 | 1 | 2;
  readonly traceSlug: TraceSlug;
  readonly year: string;
  readonly title: string;
  readonly summary: string;
  readonly metadata?: string;
  readonly image?: TraceImage;
  readonly assumption: string;
  readonly finding: string;
  readonly reframe: string;
  readonly clueLabel: string;
  readonly sourceDetails: SourceDrawerDetails;
}
```

The stable evidence ID is derived from the existing reference:

```text
<traceSlug>:<momentId>
```

`InvestigationBoard` must not import `data/traces.ts`, call the Trace registry, or receive a complete Trace object.

## 7. Component Boundaries

The three existing routes remain Server Components and keep their current metadata/static generation.

Only three top-level client islands are introduced:

```text
Stage 1 -> InitialDecision
Stage 2 -> InvestigationBoard
Stage 3 -> BeforeAfterDecision
```

Internal visual units such as the rewind transition, evidence workspace, clue token, thought map, and completion stamp may be child components, but they share their parent island's state. They must not become independent client state islands.

### Server branching

Each stage branches by configuration, not slug:

```tsx
if (item.interactiveExperience?.mode === "investigation") {
  return <FlagshipStage ... />;
}

return <CurrentStandardStage ... />;
```

The standard component path remains unchanged.

## 8. Session State

Use one versioned object per case in `sessionStorage`:

```ts
export interface FlagshipCaseSession {
  readonly version: 1;
  readonly initialChoiceId?: string;
  readonly viewedEvidenceIds: readonly string[];
  readonly finalLensIndex?: 0 | 1 | 2;
}

export interface CaseSessionValidation {
  readonly choiceIds: readonly string[];
  readonly evidenceIds: readonly string[];
}
```

Storage key:

```text
duoc-hong:case:<slug>:journey
```

`lib/case-session.ts` owns all storage access:

```ts
getCaseSession(
  slug: string,
  validation: CaseSessionValidation,
): FlagshipCaseSession
setInitialChoice(
  slug: string,
  validation: CaseSessionValidation,
  choiceId: string,
): FlagshipCaseSession
markEvidenceViewed(
  slug: string,
  validation: CaseSessionValidation,
  evidenceId: string,
): FlagshipCaseSession
setFinalLens(
  slug: string,
  validation: CaseSessionValidation,
  index: 0 | 1 | 2,
): FlagshipCaseSession
clearCaseSession(slug: string): void
```

Requirements:

- Allowed choice IDs come from `interactiveExperience.initialChoices`.
- Allowed evidence IDs come from the server-resolved investigation view model.
- `case-session.ts` must not import `data/thought-cases.ts`, `data/traces.ts`, the Thought Case registry, or the Trace registry.
- Access storage only in the browser.
- Catch unavailable/quota/security errors and continue with in-memory React state.
- Validate parsed values and ignore unknown choice IDs, evidence IDs, lens indexes, versions, and malformed JSON.
- Preserve evidence collection across refreshes within the same tab/session.
- Never send state to a server and never use `localStorage`.

## 9. Stage 1 — Initial Decision

### First ten seconds

The current question is the central object. Three decision directions surround it on desktop instead of appearing as three stacked form rows.

Hover, focus, or tap on a direction updates the perspective text inside the central question area. This preview does not persist a choice.

Selecting a direction:

1. sets `aria-pressed` or checked state;
2. stores `initialChoiceId`;
3. confirms the selected perspective without judgment;
4. visually compresses the composition into a `Phiếu quyết định 2026`;
5. reveals `Lần theo dấu vết lịch sử ->`.

The choices are semantic buttons or radio controls with a labelled group. Visual spatial placement must not change their logical DOM order.

### Mobile

Mobile uses one central question followed by three full-width typographic directions. It does not imitate the desktop orbit. Each target is at least 44px high.

### No JavaScript

The central problem, all three choices as text, and the normal Stage 2 route link are present in server HTML. The link is never created only after selection or hydration; JavaScript only changes its emphasis and accompanying confirmation state. Personalization is skipped if selection cannot be stored.

## 10. Stage 2 Entry — Time Rewind

The Stage 2 client island receives the selected initial choice if one exists. It reconstructs the same `Phiếu quyết định 2026` at the 2026 end of a timeline and animates the slip toward the first historical year.

This is a visual continuity effect across routes, not a new data dependency. The route must not rely on View Transitions API support.

Motion:

- duration: 700–1000ms;
- year and line motion only;
- the decision slip remains visible throughout;
- no blocking delay after the final state is ready;
- direct Stage 2 entry without a choice uses a neutral `Vấn đề 2026` slip;
- `prefers-reduced-motion: reduce` renders the final board state immediately.

## 11. Stage 2 — Spatial Investigation Board

### Desktop composition

The `Phiếu quyết định 2026` is the central physical object. Three archival dossiers sit asymmetrically around it with restrained position and rotation differences. The composition must remain editorial and tactile without corkboard texture, pins, or detective-film decoration.

Each dossier exposes:

- sequence label;
- year;
- title;
- historical image/document preview;
- text status: `CHƯA XEM`, `ĐANG MỞ`, or `ĐÃ THU THẬP`.

The layout must communicate spatial relationship at a glance. It must not look like a row of navigation cards.

### Tablet and mobile

- Tablet reduces overlap and uses a two-dimensional grid around a compact central slip.
- Mobile uses a vertical evidence stack with the current-problem slip pinned visually above the stack.
- Mobile never requires drag and never attempts to reproduce the desktop spatial board.

## 12. Evidence Exploration

Opening a dossier expands an in-page evidence workspace. It is not a modal, avoiding nested-dialog conflict with the existing `SourceDrawer`.

The historical image or document is the dominant object. Text is revealed in three explicit phases:

1. **Assumption** — one concise sentence showing the idea the user brought into the evidence.
2. **Comparison** — one concise finding revealed after the user chooses to compare with the historical material.
3. **Clue** — the reframe resolves into the configured clue label after the user chooses `Rút ra dấu vết`.

The full historical summary, metadata, and source access remain available as secondary information. They must not compete visually with the current discovery phase.

After the clue appears, the user chooses `Đưa dấu vết vào vấn đề 2026`. This action:

1. marks the evidence as viewed;
2. persists the evidence ID;
3. returns the board to focus;
4. animates the clue from the evidence workspace into the central slip area;
5. changes the dossier status to `ĐÃ THU THẬP`.

Desktop may additionally let the user drag the clue toward the central drop region. The button performs the identical action and remains the primary keyboard/touch path.

### Progressive enhancement

Each dossier uses a server-rendered disclosure base such as `<details>/<summary>` or an equivalent semantic HTML fallback. Without JavaScript, opening a dossier reveals all core historical content and normal source links at once. JavaScript enhances this same content into the staged `assumption -> comparison -> clue` flow rather than being required to create the content.

The client island must not use `if (!mounted) return null`, render only an empty dossier shell on the server, or construct core content only after reading session storage.

## 13. Thought Map Payoff

The map exists in the same board DOM and uses the three collected clue states. It is not a separate pre-rendered diagram section.

Before three clues are collected, map connector paths are absent or incomplete. After the third collection:

1. the evidence workspace closes;
2. dossier imagery and peripheral content fade to low emphasis;
3. the board expands into a near-full-viewport focus mode;
4. the three clue tokens retain their year provenance and move to final positions;
5. SVG paths animate from each clue to the current question using `pathLength`;
6. an `aria-live` status announces that all three clues are connected;
7. focus moves predictably to the map heading or completion region;
8. `Mang bản đồ này trở lại 2026 ->` appears after the map is complete.

Reduced motion renders the complete map immediately with no path animation.

The map must remain readable in forced colors. Connector meaning cannot depend on muted red alone; clue labels, year text, borders, and DOM order carry the relationship.

## 14. Stage 3 — Before, Clues, After

If an initial choice exists, Stage 3 reconstructs the original decision slip on one side, preserves the exact three clue tokens and styles in the middle, and positions the three existing `presentLenses` as possible approaches on the other side.

The lenses remain an accessible radio group or pressed-button group even though their visual placement is spatial rather than row-based.

Selecting a lens:

1. persists `finalLensIndex`;
2. completes the visual path from `TRƯỚC` through the three clues to `SAU`;
3. reveals the Before / After statement;
4. displays: `Bạn không nhận một đáp án có sẵn. Bạn vừa có thêm căn cứ để tự đưa ra lựa chọn.`;
5. reveals the restrained `HỒ SƠ ĐÃ HOÀN TẤT` stamp.

The product does not infer that the user changed, improved, or selected the correct option. Before / After records two moments in the journey, not a score.

If Stage 3 is entered directly without session state, the existing thought-formation and present-lens content remains available. The personalized Before / After block is omitted without inventing a previous choice.

### Mobile

Mobile uses a vertical path:

`TRƯỚC -> clue 1 -> clue 2 -> clue 3 -> SAU`

The same clue typography, border, labels, and year provenance from Stage 2 must be retained to communicate continuity.

## 15. Homepage Discovery

`ScenarioPicker` receives preview metadata derived from `interactiveExperience`.

The first page contains the three flagship cases in the locked order. Each includes a small editorial label `TRẢI NGHIỆM TƯƠNG TÁC` without a colored badge or new card style.

The hero CTA remains `Bắt đầu với một tình huống`. The library link reads `Xem toàn bộ 30 hồ sơ ->`. All 27 standard cases remain discoverable.

## 16. Accessibility

- Every action is available with mouse, touch, and keyboard.
- Drag is optional and has an equivalent named button.
- Evidence states use visible text and ARIA state, never color alone.
- Focus indicators reuse the existing global `:focus-visible` treatment.
- The evidence workspace is in-page and does not introduce a second focus trap.
- `SourceDrawer` retains Escape close, focus trap, body scroll lock, labels, and focus restoration.
- When state changes remove the active control, focus is explicitly restored to a stable heading, dossier summary, or next action.
- Status changes use concise `aria-live` messages.
- All important controls meet a 44px minimum target on mobile.
- Forced colors preserve borders, active states, statuses, and connector meaning.
- Reduced motion removes rewind, clue travel, path drawing, and stamp motion while keeping final states.
- Core historical content and route navigation remain usable without JavaScript.

## 17. Responsive Layout

Required viewports:

- 1440x900
- 1366x768
- 1024x768
- 768x1024
- 390x844
- 375x812

Breakpoints follow existing project conventions.

Desktop uses spatial dossier placement and optional drag. Tablet reduces rotation, overlap, and connector length. Mobile uses stacked disclosure, tap collection, vertical map, and vertical Before / After.

No viewport may produce horizontal overflow, clipped controls, an unreachable CTA, or an evidence workspace taller than necessary because all discovery layers are simultaneously visible.

## 18. Performance

- Add no dependency.
- Reuse Framer Motion and `useReducedMotion`.
- Keep routes and stage wrappers as Server Components.
- Send only the server-resolved investigation view model to Stage 2.
- Do not send complete Trace data to client code.
- Load flagship client references only when a case has investigation configuration.
- Do not clientize the full page or the standard 27-case path.
- Use existing Next Image behavior and responsive sizes.
- Do not run continuous or looping animation.

## 19. Error and Edge Handling

- Invalid flagship configuration fails in unit tests and build-time rendering rather than silently degrading.
- Unknown persisted choice or evidence IDs are ignored.
- Missing session state never blocks direct route entry.
- Storage failure falls back to in-memory state for the current page.
- Refreshing Stage 2 restores collected evidence after hydration without blanking server content.
- Refreshing Stage 3 restores the selected lens if valid.
- Browser back/forward navigation preserves route behavior and must not require replaying animations.
- Source URLs and image provenance remain unchanged.

## 20. Testing Strategy

### Configuration tests

- exactly three cases have `interactiveExperience.mode === "investigation"`;
- the exact three approved slugs are used;
- each has exactly three unique choice IDs;
- each has exactly three non-empty clue labels;
- each primary Trace resolves;
- all three evidence references resolve;
- clue labels align with the three reveals;
- all 27 standard cases remain valid without the optional field.

### Session tests

- default state is versioned and empty;
- allowed choice and evidence IDs are supplied through `CaseSessionValidation`;
- initial choice persists;
- evidence marking is idempotent;
- final lens persists;
- malformed and stale state is rejected safely;
- `case-session.ts` has no imports from Thought Case or Trace data/registries;
- clear removes only the selected case session;
- unavailable storage does not throw.

### Server markup tests

- standard case stages retain existing markup;
- flagship Stage 1 contains the current problem, all choices, and route link in server HTML;
- flagship Stage 2 contains all three evidence titles, summaries, interpretations, images, and source fallbacks in server HTML;
- flagship Stage 3 contains thought formation and all three lenses in server HTML;
- no component returns an empty pre-mount state.

### Production acceptance

Stage 1:

- hover/focus previews a perspective;
- keyboard and pointer selection persist the choice;
- the decision slip and Stage 2 CTA appear;
- direct Stage 2 navigation remains possible.

Stage 2:

- rewind finishes or is skipped under reduced motion;
- exactly three dossiers appear;
- all three open using pointer and keyboard;
- SourceDrawer continues to function and restore focus;
- assumption, comparison, and clue reveal in order;
- each collected clue updates visible and ARIA status;
- refresh restores collection state;
- the thought map remains incomplete after one or two clues;
- the map forms only after the third clue;
- click/tap provides the complete alternative to drag;
- Stage 3 CTA appears after completion.

Stage 3:

- initial decision is displayed when present;
- the same three clue identities are displayed;
- all present lenses are keyboard-selectable;
- selected lens persists;
- Before / After and completion stamp appear;
- direct entry without session state does not fabricate `TRƯỚC` content;
- related cases and library actions still work.

Cross-cutting:

- standard case route remains unchanged;
- all 90 case routes return successfully;
- required desktop, tablet, and mobile viewports have no horizontal overflow;
- controls meet mobile target sizes;
- reduced motion, forced colors, no-JavaScript, hydration, console, and anchor navigation checks pass.

## 21. Intended File Structure

Create or modify only the focused units below:

```text
types/thought-case.ts
data/thought-cases.ts
lib/thought-case-registry.ts
lib/case-session.ts

components/cases/case-present-stage.tsx
components/cases/case-evidence-stage.tsx
components/cases/case-return-stage.tsx
components/cases/case-return.tsx
components/cases/scenario-picker.tsx

components/cases/investigation/
  initial-decision.tsx
  investigation-board.tsx
  before-after-decision.tsx
  investigation-types.ts

app/globals.css

tests/flagship-investigation.test.ts
tests/living-thought-pages.test.ts
tests/case_acceptance.py
tests/homepage_acceptance.py
```

Internal child components may be split from the three investigation islands when a file becomes difficult to understand, but no additional top-level state island is introduced.

## 22. Definition of Done

The implementation is complete only when:

1. A new user understands what to do within the first flagship screen.
2. A real initial decision is made and retained through Stage 3.
3. Stage 2 visibly operates as an investigation space rather than three sequential content sections.
4. Every evidence follows `open -> compare -> extract clue`.
5. Every collected clue visibly moves into the current-problem board.
6. The thought map forms from collected state only after clue three.
7. Stage 3 displays a personalized `Before -> three clues -> After` path without judgment.
8. The 27 standard cases and three Trace experiences remain unchanged.
9. Mouse, touch, keyboard, reduced motion, forced colors, and no-JavaScript paths work.
10. Required responsive viewports have no overflow or inaccessible actions.
11. Existing tests, new tests, typecheck, lint, build, and production acceptance pass.
12. There are no console, hydration, or broken-navigation errors.
13. No new dependency, decorative interaction, or scope expansion is introduced.
