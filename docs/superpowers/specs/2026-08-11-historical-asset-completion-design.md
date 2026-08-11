# Phase 8 Historical Asset Completion Design

**Status:** Approved art direction on 2026-08-11

## Goal

Replace the four remaining historical placeholders with evidence-first assets
that accurately represent the associated work or event, preserve the existing
Phase 7 image taxonomy, and remain safe to use and credit.

## Scope

Phase 8 covers exactly these historical moments:

| Trace | Year | Required subject | Preferred asset |
| --- | --- | --- | --- |
| Đạo đức & trách nhiệm | 1947 | *Sửa đổi lối làm việc* | Cover, title page, manuscript, or authenticated publication page |
| Đạo đức & trách nhiệm | 1958 | *Đạo đức cách mạng* in *Tạp chí Học tập*, issue 12 | Original journal page, article page, or authenticated publication scan |
| Con người | 1958 | Hồ Chí Minh speaking to the political class for secondary-school teachers | Photograph of the stated event, or an official archival photograph whose caption identifies that event |
| Con người | 1969 | *Di chúc* | Original manuscript page, authenticated facsimile, or official archival scan |

Phase 8 does not redesign Homepage or Trace layouts, change typography,
rewrite historical copy, add interactions, replace Present Day photography,
replace existing approved historical assets, or introduce AI-generated
historical imagery.

## Art Direction

The selected direction is **Evidence-first**. The image must function as
historical evidence for the exact moment rather than as general atmosphere.

Written works use document imagery whenever a suitable asset exists. Document
boundaries, handwriting, typography, stamps, publication marks, and archival
texture remain visible. The renderer uses `contain` and the existing paper
background so source material is not cropped into a decorative texture.

The 1958 teacher event uses a historical photograph only when the source
caption or archival metadata identifies the stated event. It uses the existing
landscape historical-photo treatment and may be cropped only to remove
irrelevant outer margins without removing people or event context.

No asset is selected merely because it depicts Hồ Chí Minh, a book, a
classroom, teachers, handwriting, or the same year. Visual similarity without
event or document identity is insufficient.

## Source And Rights Gate

Candidates are accepted in this order:

1. Wikimedia Commons files with an explicit Public Domain, CC0, CC BY, or
   compatible Creative Commons statement on the file page.
2. Vietnamese government, museum, archive, or official publication sources
   that explicitly state reuse terms or provide an asset already covered by
   the project's owner-approved historical-asset policy.
3. A source whose visible provenance is authoritative but whose reuse terms are
   not explicit may be documented as a candidate, but it is not committed
   without an owner-approval note in `TraceImage.usageNote`.

Every committed asset records:

- descriptive `alt` text;
- a caption naming the document or event;
- source or archival owner in `credit`;
- exact `sourceUrl`;
- `verificationStatus`;
- `usageStatus`;
- license or approved usage note;
- `kind` and `presentation` metadata.

If no candidate passes both the semantic and rights gates, the existing
placeholder remains in production. A wrong or ambiguous historical image is a
regression compared with a clearly labeled placeholder.

## Presentation Contract

The existing `TraceImage` schema and shared renderer remain unchanged.

The intended metadata is:

| Moment | Kind | Fit | Aspect | Tone | Background |
| --- | --- | --- | --- | --- | --- |
| 1947 work | `document` | `contain` | `document` | `natural` | `paper` |
| 1958 article | `document` | `contain` | `document` | `natural` | `paper` |
| 1958 teacher event | `historical-photo` | `cover` or `contain` after in-layout review | `landscape` | `archival` | `neutral` |
| 1969 testament | `document` | `contain` | `document` | `natural` | `paper` |

No year-specific renderer, new component, card, icon, diagram, decorative
frame, or custom interaction is introduced. Crop behavior remains data-driven
through `presentation.objectPosition`.

## Asset Processing

Source files are preserved outside production. Production derivatives may:

- remove scanner borders or large empty photographic margins;
- normalize orientation;
- use high-quality JPEG output suitable for the current Next.js image pipeline;
- apply restrained grayscale only through existing CSS presentation modes.

Production derivatives must not remove signatures, stamps, titles, publication
identity, page edges needed to understand the document, people needed to
understand the event, or archival marks relevant to provenance.

## Content Integrity

Existing historical summaries, dates, titles, metadata, verification notes,
and content sources remain unchanged. Asset captions describe only what the
source proves. They do not add historical claims or infer identities absent
from the source metadata.

## Testing And Visual Validation

Registry tests must fail while the four moments remain placeholders and pass
only when every accepted image exposes the required provenance, rights, kind,
and presentation metadata.

Browser acceptance verifies:

- no placeholder remains for an accepted asset;
- documents render with `object-fit: contain` and retain visible boundaries;
- the event photograph uses a landscape frame;
- captions and credit links match the selected sources;
- no horizontal overflow or console error occurs;
- existing Trace content, navigation, responsive behavior, and reduced motion
  remain unchanged.

Visual review covers 1920x1080, 1366x768, and 390x844. Focused screenshots are
captured for all four moments. Documents must remain readable as documents on
mobile without making the section excessively tall. The 1958 event photograph
must retain enough people and setting to communicate the event rather than a
portrait.

Final verification runs:

```text
npm test
npm run typecheck
npm run lint
npm run build
python tests/homepage_acceptance.py
python tests/trace_acceptance.py
```

Homepage regression, all three Trace routes, desktop, laptop, mobile, reduced
motion, overflow, and browser console checks must pass before the implementation
commit is created.

## Acceptance Criteria

- Each of the four moments uses an exact document or event asset that passes the
  semantic and rights gates, or deliberately retains its placeholder when no
  such asset exists.
- No generic, modern, foreign-context, AI-generated, or merely year-adjacent
  image is committed.
- Existing architecture, layout, typography, content, routes, and interactions
  remain unchanged.
- Every committed asset has complete provenance, rights, caption, alt, and
  presentation metadata.
- Document pages remain uncropped and the 1958 event retains historical context
  at all required viewports.
- Automated gates and production acceptance pass with no Homepage regression.

