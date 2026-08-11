# Image Semantic Corrections Design

## Scope

Replace the three Present Day production assets whose current imagery does not
meet the approved Vietnamese-context and narrative standards:

- Trace 01 Present Day;
- Trace 02 Present Day;
- Trace 03 Present Day.

Trace 02 historical moment 1958 remains a requested correction, but it changes
only when an authentic original-publication source passes the documentary gate
defined below. Until then, the current production asset remains unchanged and
its limitation stays explicit in the source manifest.

The 1945 Independence Declaration photograph remains unchanged. Homepage,
every other historical asset, image taxonomy, shared renderer, routes, layout,
typography, interaction, responsive behavior, and reduced-motion behavior
remain unchanged.

## Selected Approach

Use a license-first, narrative-specific replacement pass.

This approach is preferred over re-cropping because the owner explicitly
requested replacement after reviewing the existing subjects. Staged, generated,
or AI-created imagery is excluded because it would weaken documentary trust and
would not solve the semantic mismatch reliably.

## Vietnamese Context Authenticity Gate

Every Present Day replacement must be supported by source metadata that
explicitly identifies either Vietnamese subjects or a photographed location in
Vietnam. Visual appearance alone is not evidence of nationality and must not be
used to classify a person as Vietnamese.

Accept a candidate only when:

- the source title, description, tags, caption, location field, or creator notes
  explicitly establish Vietnam or Vietnamese subject context;
- the context is visible or remains plausible after the existing 4:5 crop;
- no foreign landmark, institution, corporate office, or culturally specific
  setting contradicts the Vietnamese context;
- the source provides a compatible reuse license and stable source page;
- factual alt text can describe the visible scene without claiming nationality
  that is not supported by the source.

If no candidate passes all gates for a Trace, do not select a foreign or merely
East-Asian-looking substitute. Keep the previously approved production asset
temporarily and report the failed gate.

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

## Trace 03 Present Day Direction

The image must support the opening scenario: a student begins to question
whether grades, productivity, achievements, and CV metrics have reduced their
human value to numbers.

Accept only a licensed contemporary photograph that:

- shows a Vietnamese student or a student photographed in Vietnam, as verified
  by source metadata;
- centers one person working or pausing alone with a laptop, paper, notebook, or
  academic material;
- feels introspective, pressured, uncertain, or emotionally quiet rather than
  celebratory, aspirational, or visibly successful;
- does not require a visible grade, score, CV, or private personal information
  to communicate the setup;
- avoids graduation imagery, awards, staged success poses, corporate offices,
  and generic smiling-student stock photography;
- works in the existing 4:5 portrait frame while preserving the face, posture,
  and study surface needed for the narrative.

The caption continues to frame results as an overly narrow measure. Alt text
describes only the visible student and study setting.

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

Tests must first fail on the current three Present Day asset paths, then require
the selected replacement paths, Vietnamese-context provenance fields, and
presentation metadata. Trace 02 historical 1958 changes only when its separate
authenticity gate passes.

Production acceptance covers Homepage and all Trace routes at:

- 1920x1080;
- 1366x768;
- 390x844;
- reduced motion.

Focused review checks all three Present Day frames and the unchanged 1958
document for semantic fit, Vietnamese-context evidence, crop safety,
readability, console errors, overflow, and regressions. The 1945 asset must
retain its current path and presentation metadata.

## Release Boundary

The implementation is added to the existing `phase-8-historical-assets` branch
and draft PR #1 because that PR is still open and already owns the approved image
work. Create a separate implementation commit, push it, update the PR summary,
inspect available checks, and stop without merging.
