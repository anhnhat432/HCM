# Accessibility QA

## Scope and environment

- Date: 2026-08-12.
- Runtime: Next.js production build served locally at `http://localhost:3800`.
- Browser automation: Playwright Chromium.
- Automated scope: Homepage, `/phuong-phap`, all three Trace routes, Journey
  Closing, progress navigation, and Source Drawer.

## Automated evidence

- Responsive acceptance covers 1920x1080, 1366x768, 390x844, and 375x812.
- A 640x900 CSS viewport covers the WCAG 1.4.10 reflow equivalent of 200% zoom
  on a 1280px display.
- Forced-colors acceptance runs at 390x844 and verifies visible keyboard focus,
  progress controls, Source Drawer operation, and horizontal overflow.
- Reduced-motion acceptance runs on Homepage and all three Trace experiences.
- Local QR sharing acceptance covers Homepage and Trace headers, canonical URL
  generation, keyboard focus containment, Escape dismissal, focus restoration,
  and confirmation that no external QR service is requested.
- Contrast regression resolves the rendered foreground against the nearest
  rendered background and includes element opacity.
- Source Drawer checks keyboard opening, dialog naming, initial close-button
  focus, Escape dismissal, and focus restoration to the trigger.
- Reflow checks cover Homepage-to-methodology navigation and Trace progress
  anchor navigation without horizontal scrolling.

## Lighthouse lab results

Lighthouse 12.8.2 was run three times per route against the QR-only production
build with the mobile default profile. Scores are lab measurements and can vary
between runs.

| Route | Performance runs | Performance median | Accessibility | Best Practices | SEO |
| --- | --- | ---: | ---: | ---: | ---: |
| Homepage `/` | 89, 88, 88 | 88 | 100 | 100 | 100 |
| Trace 01 `/trace/dai-doan-ket` | 82, 82, 81 | 82 | 100 | 100 | 100 |

## Manual NVDA checklist

Status: **NOT EXECUTED**. NVDA is not available in this automated environment.

1. Open the Homepage in Firefox or Chrome with NVDA running.
2. Confirm the skip link is announced first and moves focus to the main content.
3. Navigate by landmarks and headings; confirm one clear page-level heading.
4. Tab through the Homepage CTA, three Trace choices, methodology link, and
   verify every control has a visible focus indicator.
5. Open Trace 01 and confirm the progress timeline announces the active item as
   the current step while scrolling through every historical milestone.
6. Open QR sharing and confirm the dialog name, generated URL, focus trap,
   Escape close, and trigger focus restoration.
7. Open “Nguồn & kiểm chứng”; confirm the dialog name, verification description,
   source links, focus containment, Escape close, and focus restoration.
8. Confirm present-day illustrations and historical images announce their
   intended alternative text without duplicating visible captions excessively.
9. Complete Trace 03 and confirm Journey Closing actions, including
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
