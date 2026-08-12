# Accessibility QA

## Scope and environment

- Date: 2026-08-12.
- Runtime: Next.js production build served locally at `http://localhost:3800`.
- Browser automation: Playwright Chromium.
- Automated scope: Homepage, `/phuong-phap`, all three Trace routes, Journey
  Closing, progress navigation, Source Drawer, local QR sharing, passive Trace
  Back storytelling, Thought Formation convergence, and the Journey trace mark.

## Automated evidence

- Responsive acceptance covers 1920x1080, 1366x768, 390x844, and 375x812.
- A 640x900 CSS viewport covers the WCAG 1.4.10 reflow equivalent of 200% zoom
  on a 1280px display.
- Forced-colors acceptance runs at 390x844 and verifies visible keyboard focus,
  progress controls, Source Drawer operation, and horizontal overflow.
- Reduced-motion acceptance runs on Homepage and all three Trace experiences.
- Trace Back acceptance samples the historical-image reveal throughout the
  sticky range and rejects any reversal while the page scrolls forward.
- The 640px reflow and reduced-motion variants render the completed Trace Back
  state without requiring animation or user input.
- Thought Formation checks exactly three decorative convergence branches, one
  merged line, readable conclusion content, and immediate reduced-motion paths.
- Journey Closing checks exactly three decorative input lines, one final torch
  line, bounded desktop/mobile height, reduced-motion completion, and absence
  from Trace 01 and Trace 02.
- QR dialog checks local data-URL generation, canonical URL use, keyboard focus
  containment, Escape dismissal, focus restoration, and no external QR request.
- Contrast regression resolves the rendered foreground against the nearest
  rendered background and includes element opacity.
- Source Drawer checks keyboard opening, dialog naming, initial close-button
  focus, Escape dismissal, and focus restoration to the trigger.
- Reflow checks cover Homepage-to-methodology navigation and Trace progress
  anchor navigation without horizontal scrolling.

## Lighthouse lab results

Lighthouse 12.8.2 was run three times per route against the production build
with the mobile default profile. Scores are lab measurements and can vary
between runs.

| Route | Performance runs | Performance median | Accessibility | Best Practices | SEO |
| --- | --- | ---: | ---: | ---: | ---: |
| Homepage `/` | 87, 88, 88 | 88 | 100 | 100 | 100 |
| Trace 01 `/trace/dai-doan-ket` | 76, 82, 80 | 80 | 100 | 100 | 100 |

The medians exceed the release gates of 82 for Homepage and 71 for Trace 01.

## Manual NVDA checklist

Status: **NOT EXECUTED**. NVDA is not available in this automated environment.

1. Open the Homepage in Firefox or Chrome with NVDA running.
2. Confirm the skip link is announced first and moves focus to the main content.
3. Navigate by landmarks and headings; confirm one clear page-level heading.
4. Tab through the Homepage CTA, three Trace choices, methodology link, and
   verify every control has a visible focus indicator.
5. Open Trace 01 and confirm the progress timeline announces the active item as
   the current step while scrolling through every historical milestone.
6. Confirm the Trace Back images remain decorative and the reading order moves
   directly from the Trace Back heading to the first historical section.
7. Open “Nguồn & kiểm chứng”; confirm the dialog name, verification description,
   source links, focus containment, Escape close, and focus restoration.
8. Open QR sharing and confirm the dialog name, generated URL, focus trap,
   Escape close, and trigger focus restoration.
9. Confirm present-day illustrations and historical images announce their
   intended alternative text without duplicating visible captions excessively.
10. Complete Trace 03 and confirm Journey Closing actions, including
   “Về dự án & phương pháp”, are announced in a logical order.

## Manual TalkBack checklist

Status: **NOT EXECUTED**. Android TalkBack is not available in this automated
environment.

1. Open the deployed site in Chrome for Android at 200% font/display scaling.
2. Swipe through Homepage headings, supporting copy, CTA, Trace choices, and
   methodology link; confirm reading order matches the visual order.
3. Open Trace 01 and confirm progress milestones are discoverable and the active
   milestone is announced as current.
4. Activate an in-page milestone link and confirm focus/context reaches the
   corresponding historical section.
5. Open and close Source Drawer using TalkBack gestures; confirm the dialog is
   named, background content is not traversed, and focus returns to the trigger.
6. Confirm no horizontal pan is required at 200% scaling and all controls remain
   reachable at 390px CSS width.

## Release note

Automated accessibility gates pass. Final public release should still include
the two manual screen-reader checklists above on the deployed origin because
browser automation does not reproduce NVDA or TalkBack speech behavior.
