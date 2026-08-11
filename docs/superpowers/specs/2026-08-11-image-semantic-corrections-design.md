# Image Semantic Corrections Design

## Scope

Replace exactly three production assets whose current imagery does not meet the
approved narrative standard:

- Trace 01 Present Day;
- Trace 02 Present Day;
- Trace 02 historical moment 1958.

The 1945 Independence Declaration photograph remains unchanged. Homepage,
Trace 03 Present Day, every other historical asset, image taxonomy, shared
renderer, routes, layout, typography, interaction, responsive behavior, and
reduced-motion behavior remain unchanged.

## Selected Approach

Use a license-first, narrative-specific replacement pass.

This approach is preferred over re-cropping because the owner explicitly
requested replacement after reviewing the existing subjects. Staged, generated,
or AI-created imagery is excluded because it would weaken documentary trust and
would not solve the semantic mismatch reliably.

## Trace 01 Present Day Direction

The image must support the opening scenario: students share one project but
different levels of participation, opinion, and responsibility are creating
distance.

Accept only a licensed contemporary photograph that:

- shows a small student or young-adult group rather than one presenter;
- contains visible separation, disagreement, unequal engagement, or unresolved
  discussion;
- avoids celebratory smiles, corporate facilitation, and generic sticky-note
  workshops;
- works in the existing 4:5 portrait frame with no essential face or gesture at
  the crop edge;
- remains legible after the existing natural treatment.

The caption continues to describe a shared goal with diverging directions. Alt
text must describe only what is visibly present.

## Trace 02 Present Day Direction

The image must support the ethical-choice scenario: a group is considering an
easy shortcut while working under deadline pressure.

Accept only a licensed contemporary photograph that:

- emphasizes a shared laptop, document, notes, or hands under active review;
- feels serious, uncertain, investigative, or pressured rather than cheerful;
- keeps personal identity secondary to the decision surface;
- avoids obvious celebration, generic collaboration, and stock-photo laughter;
- works in the existing 4:5 portrait frame without changing the opening layout.

The image does not need to depict plagiarism literally. It must make a difficult
group decision plausible without inventing visible evidence that is not present.

## Trace 02 Historical 1958 Direction

Replace the modern digital-edition opening page with exact documentary evidence
for *Đạo đức cách mạng* from December 1958.

Candidates are accepted in this order:

1. an original scan of the article as published in *Tạp chí Học tập* issue 12;
2. an original issue cover plus an authoritative source that identifies the
   article and issue;
3. an official facsimile or archival reproduction that preserves original
   publication evidence and is explicitly captioned as a reproduction.

Do not use a modern re-typeset page, a different 1958 issue, commentary about
the work, a generic Hồ Chí Minh portrait, or a merely year-adjacent document.
The accepted asset must have a stable source, explicit provenance, and either a
compatible reuse license or the existing owner-approved historical-asset usage
basis recorded transparently in metadata.

The asset remains `kind: "document"` with `fit: "contain"`, document aspect,
natural tone, and paper background. Complete page or cover boundaries must
remain visible.

## Data And Asset Contract

Production metadata remains in the existing `TraceImage` contract. Each new
asset records:

- `src`;
- factual `alt` and `caption`;
- `credit` and stable `sourceUrl`;
- `verificationStatus` and `usageStatus`;
- `license` or an explicit `usageNote`;
- existing `kind` and `presentation` fields.

Source originals and comparison artifacts stay outside the repository.
Production derivatives are RGB JPEG files, maximum dimension 2400 pixels,
quality 92, with no destructive semantic crop. Portrait crop decisions remain
data-driven through `presentation.objectPosition`.

## Testing And Acceptance

Tests must first fail on the current three asset paths, then require the selected
replacement paths and provenance fields.

Production acceptance covers Homepage and all Trace routes at:

- 1920x1080;
- 1366x768;
- 390x844;
- reduced motion.

Focused review checks both Present Day frames and the 1958 document for semantic
fit, crop safety, readability, console errors, overflow, and regressions. The
1945 asset must retain its current path and presentation metadata.

## Release Boundary

The implementation is added to the existing `phase-8-historical-assets` branch
and draft PR #1 because that PR is still open and already owns the approved image
work. Create a separate implementation commit, push it, update the PR summary,
inspect available checks, and stop without merging.
