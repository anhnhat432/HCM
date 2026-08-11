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

Use the three owner-provided and owner-approved AI illustrations as conceptual
Present Day imagery.

The project owner reviewed each image inside the actual desktop and mobile Trace
opening frames and approved all three on 2026-08-11. They must not be attributed
to a stock-photo source or license. The website uses the neutral visible credit
`Ảnh minh họa`; AI provenance remains in internal metadata and the source
manifest rather than the rendered alt or credit copy.

## Owner-Approved AI Asset Gate

Each Present Day replacement must:

- use the exact file approved by the project owner;
- describe the visible scene factually without adding medium labels to alt text;
- use the visible credit `Ảnh minh họa`;
- avoid a source link because no stable generator source page was supplied;
- record that the generator and generator-license terms were not supplied;
- keep all required faces, gestures, documents, and study surfaces legible in
  the existing 4:5 desktop and mobile frame;
- contain no visible watermark, logo, or dominant generated text at production
  size.

The images are conceptual contemporary scenes only. They are not evidence for
historical facts, real identities, nationality, institutions, or actual events.

## Trace 01 Present Day Direction

The image must support the opening scenario: students share one project but
different levels of participation, opinion, and responsibility are creating
distance.

The approved AI illustration must:

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

The approved AI illustration must:

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

The approved AI illustration must:

- depicts one Vietnamese university student as a conceptual character without
  claiming a real identity;
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
- transparent AI `credit` with no `sourceUrl`;
- `verificationStatus` and `usageStatus`;
- `license` or an explicit `usageNote`;
- existing `kind` and `presentation` fields.

Source originals and comparison artifacts stay outside the repository.
Production derivatives are RGB JPEG files, maximum dimension 2400 pixels,
quality 92, with no destructive semantic crop. Portrait crop decisions remain
data-driven through `presentation.objectPosition`.

## Testing And Acceptance

Tests must first fail on the current three Present Day asset paths, then require
the selected replacement paths, owner-approved AI provenance fields, absent
source links, and presentation metadata. Trace 02 historical 1958 changes only
when its separate authenticity gate passes.

Production acceptance covers Homepage and all Trace routes at:

- 1920x1080;
- 1366x768;
- 390x844;
- reduced motion.

Focused review checks all three Present Day frames and the unchanged 1958
document for semantic fit, AI disclosure, watermark absence, crop safety,
readability, console errors, overflow, and regressions. The 1945 asset must
retain its current path and presentation metadata.

## Reconciliation Ledger

### Source Of Truth

| Source ID | Source and location | Revision/date | Evidence it can prove | Authority level | Owner | Conflicts |
|---|---|---|---|---|---|---|
| SRC-001 | Project owner approval in the active Codex task | 2026-08-11 | Exact approval of all three supplied AI images | Normative business decision | Project owner | Overrides the earlier no-AI constraint |
| SRC-002 | `docs/superpowers/specs/2026-08-11-image-semantic-corrections-design.md` | Commit `64d9825` | Earlier Vietnamese stock-photo requirement | Superseded design evidence | Project owner | Excluded AI before the owner reviewed generated alternatives |
| SRC-003 | Three files under `C:/Users/admin/Downloads/Trace 0*.png` | SHA-256 recorded in the source manifest on 2026-08-11 | Exact approved pixels | Approved asset evidence | Project owner | Generator and generator-license terms were not supplied |
| SRC-004 | Project owner visible-credit instruction in the active Codex task | 2026-08-11 | Exact rendered credit copy | Normative business decision | Project owner | Replaces proposed AI or owner-supplied wording with `Ảnh minh họa` |

### Business Decision

| Decision ID | Slice ID | Question | Options considered | Approved decision | Rationale | Approver | Decision date | Affected requirements |
|---|---|---|---|---|---|---|---|---|
| BD-001 | SL-001 | Which Present Day imagery should ship? | Foreign licensed stock; verified Vietnamese stock; owner-generated AI illustrations | Use the three exact owner-provided AI illustrations with transparent disclosure | They fit the three narratives and Vietnamese visual context better in the actual Trace frames | Project owner | 2026-08-11 | BR-001 through BR-005 |
| BD-002 | SL-001 | What credit should users see? | Explicit AI label; owner-supplied label; neutral illustration label | Display `Ảnh minh họa`; keep AI provenance internal | The owner requested neutral visible wording while retaining an accurate internal record | Project owner | 2026-08-11 | BR-004 |

### Requirements And Traceability

| Decision ID | Requirement ID | Slice/use case | Interface or API | Implementation location | Acceptance test ID | Evidence | Status |
|---|---|---|---|---|---|---|---|
| BD-001 | BR-001 | Trace 01 Present Day | `TraceImage` | `data/traces.ts` and `public/images/traces/dai-doan-ket/` | AT-001 | Fixed path and focused opening screenshot | approved-requirement |
| BD-001 | BR-002 | Trace 02 Present Day | `TraceImage` | `data/traces.ts` and `public/images/traces/dao-duc-trach-nhiem/` | AT-002 | Fixed path and focused opening screenshot | approved-requirement |
| BD-001 | BR-003 | Trace 03 Present Day | `TraceImage` | `data/traces.ts` and `public/images/traces/con-nguoi/` | AT-003 | Fixed path and focused opening screenshot | approved-requirement |
| BD-002 | BR-004 | Neutral visible credit and internal provenance | Optional `sourceUrl`, `credit`, `usageNote` | `data/traces.ts` and `components/trace/trace-opening.tsx` | AT-004 | `Nguồn ảnh: Ảnh minh họa`, zero source links, internal AI usage note | approved-requirement |
| BD-001 | BR-005 | Historical guardrails | Existing historical `TraceImage` records | `data/traces.ts` | AT-005 | 1945 and 1958 paths unchanged | approved-requirement |

## Release Boundary

The implementation is added to the existing `phase-8-historical-assets` branch
and draft PR #1 because that PR is still open and already owns the approved image
work. Create a separate implementation commit, push it, update the PR summary,
inspect available checks, and stop without merging.
