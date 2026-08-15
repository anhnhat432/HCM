# Transcript Case Language Design QA

## Comparison Target

- Source visual truth: `C:\Users\admin\.codex\visualizations\2026\08\10\019feab3-ffe1-7e92-a42a-94672b973e1d\anti-ai-preview\02.png`
- Browser implementation: `http://localhost:3700/ho-so/nhom-gioi-nhung-khong-hop-tac/tro-lai`
- Full-view comparison: `C:\HCM\artifacts\design-qa-transcript\comparison-source-vs-implementation.png`
- Focused desktop conclusion: `C:\HCM\artifacts\design-qa-transcript\implementation-desktop-conclusion.png`
- Focused mobile conclusion: `C:\HCM\artifacts\design-qa-transcript\stage-3-mobile-conclusion-390x844.png`

## Viewport And Normalization

- Source pixels: 736 x 1000.
- Source CSS intent: fixed editorial reference frame.
- Implementation CSS viewport: 736 x 1000 at device scale factor 1.
- Browser full-page capture: 720 x 2580 because the vertical scrollbar consumes the remaining viewport width.
- Normalization: implementation capture resized to 736 px wide, then cropped to the first 1000 px before the side-by-side comparison.
- Responsive evidence: 1366 x 768 desktop and 390 x 844 mobile captures for all three stages.
- Compared state: Stage 3 at the top of `HỒI 5`, with `Trở lại` as the active progress step.

## Full-View Comparison

The implementation carries the selected transcript direction without changing the existing product shell or content: one cream archival surface, IBM Plex structural text, compact Newsreader statements, green tabular timestamps, horizontal record rules, and a single green conclusion rule. The actual product copy is longer than the concept copy, so line wrapping and vertical density intentionally differ.

No P0, P1, or P2 mismatch remains. The source mock includes an external white presentation margin and omits the existing site route structure; those differences are intentional constraints rather than implementation drift.

## Focused Region Comparison

- Formation factors use `00:01`, `00:02`, and `00:03` as stable scan anchors.
- The conclusion removes the previous red poster treatment and uses a four-pixel archival-green rule, a small structural label, and a restrained Newsreader statement.
- Stage 1 and Stage 2 reuse the same palette, typography hierarchy, numeric treatment, and square rule language.
- Historical images, source drawers, perspective selection, and route navigation remain unchanged and functional.

## Required Fidelity Surfaces

- Fonts and typography: passed. Newsreader is limited to narrative statements; IBM Plex Sans carries structure, timestamps, and body copy. Heading scale is materially smaller than the previous build and wraps naturally on mobile.
- Spacing and layout rhythm: passed. The shared rail and narrative field remain stable on desktop; mobile collapses cleanly without the former left-line offset.
- Colors and visual tokens: passed. Case pages use scoped `#315044` archival green on the existing cream, ink, muted, and line tokens. Contrast remains strong and forced-colors overrides cover the new timestamps and conclusion label.
- Image quality and asset fidelity: passed. No historical asset, crop, frame, caption, or source treatment changed.
- Copy and content: passed. Existing case and Trace content is unchanged; only transcript timestamps and the structural conclusion label were added.
- Accessibility and behavior: passed. At 390 px, all three routes have one H1, one active `aria-current="step"`, and no horizontal overflow. Perspective select/clear and progress-link navigation work. Browser console warnings and errors: none.

## Comparison History

### Iteration 1

- Finding: the previous live design used oversized serif headings, a dominant red vertical Trace Line, and a poster-scale red conclusion that conflicted with the selected transcript reference.
- Fix: reduced the heading scale, removed the paged-case red line motif, added tabular transcript timestamps, introduced a scoped archival-green token, and rebuilt the conclusion around one horizontal rule.
- Post-fix evidence: the combined source/implementation comparison and the desktop/mobile focused captures listed above.
- Remaining P3: the production copy is longer and the existing shell is wider than the conceptual mock, so the implementation is less compressed. This preserves content and route architecture and does not reduce usability.

## Primary Interactions Tested

- Selected and cleared an optional initial perspective; `aria-pressed` and the live status copy updated correctly.
- Activated the Stage 2 progress link from Stage 1 and confirmed route navigation.
- Inspected all three stage routes at 390 x 844; active progress state and H1 structure remained correct.
- Checked captured browser logs after navigation and interaction; no warnings or errors were recorded.

## Final Result

final result: passed
