# Public Release Polish Design

## Goal

Improve first-screen usability, historical action hierarchy, public-release
discoverability, and deep QA without redesigning the approved experience.

## Approved Scope

1. Compact vertical rhythm on low-height desktop/laptop viewports so the main
   Homepage and Trace actions appear earlier.
2. Keep historical sources secondary to the narrative continuation action.
3. Add canonical metadata, per-Trace social images, sitemap, robots, and a
   concise `/phuong-phap` page.
4. Extend QA to 200% reflow-equivalent viewports, forced colors, Lighthouse,
   and a reproducible NVDA/TalkBack checklist.

## Visual Approach

- Preserve the existing cream, ink, muted-red, thin-border editorial system.
- Use low-height media queries rather than changing the default approved
  desktop composition.
- Reduce spacing and type scale only enough to expose the next action sooner.
- Stack the historical utility action above the sequence action so “Tiếp theo”
  remains the clear narrative path.
- Style the methodology page as a quiet editorial document, not a marketing or
  dashboard page.

## Metadata Architecture

- `lib/site.ts` owns the verified production origin
  `https://hcm-trace.vercel.app`, with `NEXT_PUBLIC_SITE_URL` as an override.
- Root metadata supplies `metadataBase`, Homepage canonical data, and the
  Homepage archival image for Open Graph/Twitter.
- Trace metadata derives canonical URLs and social images from Trace data.
- `app/sitemap.ts` and `app/robots.ts` expose the public route inventory.
- `/phuong-phap` explains the Trace structure, source approach, image labels,
  and known license limits without adding new historical claims.

## QA Architecture

- Existing acceptance suites remain the primary production browser gate.
- Laptop checks assert that primary actions are inside the initial viewport.
- A 640px CSS viewport verifies the WCAG 1.4.10 reflow equivalent of 200% zoom
  on a 1280px display.
- Forced-colors pages verify visible controls, focus, and no overflow.
- Lighthouse runs as a release command rather than a runtime dependency.
- NVDA/TalkBack checks are documented as manual because neither assistive
  technology is available in the automated browser environment.

## Non-Goals

- No redesign, new navigation system, analytics, account state, search, audio,
  quiz, gamification, or new Trace content.
- No changes to Trace architecture, progress tracking, recap logic, or image
  assets.
