# Phase 7 Image Art Direction and Visual Consistency Design

**Status:** Audit and design direction approved on 2026-08-11; written spec awaiting review

## Scope

This specification covers Phase 7 only. It refines how existing Homepage and
Trace imagery is classified, framed, cropped, filtered, captioned, and rendered.
It preserves the current routes, narrative structure, typography, content,
interaction model, accessibility behavior, and historical verification.

Phase 7 does not:

- redesign the Homepage or Trace pages;
- change historical statements or verified content;
- add features, a CMS, or a general-purpose asset framework;
- introduce AI-generated historical imagery;
- deploy the application;
- treat the Yellowstone research-library candidate as the final Homepage asset.

## Art Direction

The image system supports the existing editorial, cinematic, and archival world
of ĐUỐC HỒNG without forcing every asset into the same visual treatment.
Consistency comes from disciplined frames, captions, spacing, restrained color,
and a shared paper-and-ink atmosphere. It does not come from applying grayscale,
sepia, opacity, and blend modes to every image.

The visual signature remains the existing Trace Line. Phase 7 adds no new
decorative device, animation, iconography, card system, or infographic.

## Approved Audit Decisions

| Location | Action | Final Phase 7 direction |
| --- | --- | --- |
| Homepage hero | REPLACE pending candidate approval | Keep the current production asset until 2-3 candidates are rendered in the real Homepage frame and one is approved. |
| Trace 01 Present Day | RE-CROP | Keep the licensed asset; use a 4:5 editorial crop that emphasizes separation within the group. |
| Trace 01 1930 | RE-TREAT | Classify as artwork; use a landscape/4:3 frame with restrained cover or contain and preserve muted color. |
| Trace 01 1941 | RE-TREAT | Classify as historical place; use a landscape/4:3 frame with a soft archival treatment and no low-opacity blend. |
| Trace 01 1945 | RE-CROP | Classify as historical photograph; use a landscape/4:3 crop that preserves the stage and event context. |
| Trace 02 Present Day | RE-CROP | Keep the licensed asset initially; crop toward the shared laptop and documents so smiling faces are less dominant. |
| Trace 02 1927 | RE-CROP | Classify as document; preserve the complete book and use contain on a neutral paper background. A tight derivative crop may remove only the surrounding source-image margins. |
| Trace 02 1947 | PLACEHOLDER | Keep a clearly non-evidentiary editorial paper placeholder. |
| Trace 02 1958 | PLACEHOLDER | Keep a clearly non-evidentiary editorial paper placeholder. |
| Trace 03 Present Day | KEEP | Preserve the asset and use a 4:5 natural treatment with only subtle desaturation. |
| Trace 03 1945 | RE-CROP | Reuse the existing physical file; use Trace-specific object positioning while preserving the historical event. |
| Trace 03 1958 | PLACEHOLDER | Keep a clearly non-evidentiary editorial paper placeholder. |
| Trace 03 1969 | PLACEHOLDER | Keep a document-oriented editorial paper placeholder. |

Trace 01 and Trace 02 Present Day images are not replaced unless a licensed
candidate is clearly better after being tested in the real opening frame.

## Minimal Image Taxonomy

`TraceImage` gains the minimum data required for a single renderer to understand
the nature and intended presentation of each asset.

```ts
export type TraceImageKind =
  | "present"
  | "historical-photo"
  | "historical-place"
  | "document"
  | "artwork"
  | "placeholder";

export type TraceImageFit = "cover" | "contain";
export type TraceImageAspectRatio = "portrait" | "landscape" | "document";
export type TraceImageTone = "natural" | "archival" | "soft-archival";
export type TraceImageBackground = "paper" | "neutral";

export interface TraceImagePresentation {
  readonly fit?: TraceImageFit;
  readonly aspectRatio?: TraceImageAspectRatio;
  readonly tone?: TraceImageTone;
  readonly objectPosition?: string;
  readonly background?: TraceImageBackground;
}
```

`TraceImage` stores `kind` and optional `presentation`. The existing provenance,
verification, usage, credit, source, license, and approval fields remain the
source of truth and are not weakened or renamed.

`objectPosition` moves into `presentation` so crop behavior is part of the
presentation contract. No year-specific renderer logic is introduced.

## Presentation Grammar

### Present-day photograph

- Default frame: 4:5.
- Default fit: cover.
- Treatment: natural color with subtle desaturation and restrained contrast.
- Never receives full grayscale, sepia, opacity reduction, or multiply blending.
- Crop must support the section's situation rather than merely show a group of
  people.

### Historical photograph

- Default frame: 4:3 landscape.
- Default fit: cover, with per-Trace object positioning when needed.
- Treatment: grayscale with moderate contrast and at most a very light warm tone.
- Opacity remains 1 and no multiply blend is used.
- Event context is preserved when it carries historical meaning.

### Historical place

- Default frame: 4:3 landscape.
- Default fit: cover.
- Treatment: soft archival, lighter than a historical photograph so landscape
  and architecture remain readable.
- Opacity remains 1 and no multiply blend is used.

### Document or book

- Default frame: document/4:5.
- Default fit: contain.
- Background: warm neutral paper.
- Treatment: no blend mode and no opacity reduction; source text and physical
  boundaries remain visible.
- A thin border and minimal shadow may separate the object from the paper field,
  but the frame must not read as a UI card.

### Artwork or reconstruction

- Default frame: 4:3 landscape.
- Fit is explicitly selected between restrained cover and contain according to
  the composition.
- Color is retained with only subtle saturation and contrast control.
- Caption explicitly identifies the asset as a reconstruction artwork.

### Placeholder

- Default frame: 4:3 landscape so missing material does not dominate the page.
- Background: warm paper with very restrained texture.
- Content: a small or medium year, one divider, and the exact status text
  `Tư liệu đang được bổ sung`.
- Strong grids, giant year typography, simulated historical content, and
  evidence-like imagery are prohibited.

## Renderer Architecture

`HistoricalMoment` remains the only historical image renderer. It derives
modifier classes from `image.kind` and `image.presentation`:

- `trace-figure__frame--kind-*`
- `trace-figure__frame--aspect-*`
- `trace-figure__frame--fit-*`
- `trace-figure__frame--tone-*`
- `trace-figure__frame--background-*`

The rendered markup remains one figure, one frame, one image-or-placeholder
branch, and one caption block. No component is created for a particular year.

`TraceOpening` uses the same metadata contract for Present Day assets, but its
existing opening layout remains unchanged. Homepage image metadata may be a
small local constant; Homepage is not added to `TraceData`.

## Caption and Credit Hierarchy

Every visual keeps the current provenance and rights metadata. The visible
hierarchy is:

1. descriptive caption;
2. quieter source/credit link.

Artwork, document, and place captions continue to identify the material
accurately with language such as `Tranh tái hiện`, `Cuốn`, or `Lán`. Placeholder
credit remains non-clickable and must not imply that an evidentiary asset exists.

## Homepage Candidate Gate

The current `homepage-archive.jpg` remains the production asset during the
taxonomy and Trace implementation. The Yellowstone candidate may appear only in
comparison artifacts and is not copied into `public` or committed as the final
Homepage asset.

Before the Homepage production asset changes, Phase 7 must provide 2-3 candidates
rendered inside the real Homepage frame. Each candidate report includes:

- a desktop Homepage-frame preview;
- source URL and owner/creator;
- license or usage status;
- a short narrative-fit rationale.

Candidate priority is:

1. archival or document material connected to Vietnam or Hồ Chí Minh with a
   suitable source and usage basis;
2. a neutral close-up of historical documents, books, paper texture, and light;
3. a young person researching materials in a neutral setting without obvious
   foreign archive identifiers.

Generic bookshelves, giant portraits, propaganda posters, identifiable foreign
archive rooms, and random student stock photography are excluded. Candidate
quality is judged only after compositing it in the current Homepage frame.

## Rights and Asset Policy

- Existing approved historical assets retain their source, credit, approval
  note, license statement, and usage status.
- Existing Unsplash Present Day assets retain their source and license metadata.
- A new historical asset with unclear reuse rights remains `needs-review` and is
  not substituted for a safe placeholder.
- No Pinterest, Facebook, random-blog, unknown repost, or AI-generated
  historical image is permitted.
- Derivative crops preserve attribution and do not change the underlying usage
  status.

## Responsive Behavior

Desktop and laptop retain the existing alternating image-copy composition.
Landscape historical frames use approximately 4:3 rather than 3:4. On a 390px
viewport this changes a typical historical image from roughly 311x415 to
roughly 311x233, reducing unnecessary scroll height while keeping the subject
legible.

Documents remain approximately 4:5 and use contain. Their paper field must not
produce excessive empty space. Captions wrap normally, preserve source links,
and never create horizontal overflow.

Present Day images retain 4:5. Existing section spacing, content density,
reading order, and responsive breakpoints remain unchanged unless a frame-level
adjustment is required to prevent crop or overflow defects.

## Testing Strategy

Schema behavior is developed test-first:

- every Trace image declares a valid kind;
- every placeholder declares `kind: "placeholder"`, has no source path, and
  retains `verificationStatus: "placeholder"`;
- every document uses contain and a document presentation;
- historical photos and places use landscape presentation;
- the reused 1945 physical file remains shared while object positioning may
  differ by Trace;
- provenance and existing usage approvals remain intact.

Browser acceptance verifies:

- expected modifier classes and object-fit values;
- placeholder copy and reduced visual height;
- caption/source hierarchy and links;
- no horizontal overflow;
- no console errors;
- Homepage and all Trace routes retain accessibility and reduced-motion
  behavior.

Final verification runs:

```text
npm test
npm run typecheck
npm run lint
npm run build
```

## Visual Validation

Validation covers Homepage and all three Traces at 1920x1080, 1366x768, and
390x844, plus reduced motion. Full-page screenshots are produced for the
Homepage desktop and every Trace on desktop and mobile.

Two correction passes are required:

1. frame, fit, crop, tone, caption, and mobile-height correction;
2. cross-Trace consistency, narrative support, overflow, reduced motion, and
   final Homepage candidate comparison.

Each image is checked for narrative support, natural crop, historical subject
visibility, treatment strength, stock-photo impression, and consistency with
the wider editorial publication.

## Acceptance Criteria

- One data-driven renderer supports present, historical photograph, historical
  place, document, artwork, and placeholder imagery.
- No historical image type is blindly subjected to the old universal filter.
- Trace 01 1930, 1941, and 1945 preserve substantially more source context.
- Trace 02 1927 shows the complete book as a document.
- Trace 03 Present Day remains the same licensed asset.
- All four missing historical assets remain clearly labeled placeholders unless
  separately sourced and approved.
- Mobile historical imagery is materially shorter where the source is
  landscape, without reducing document readability.
- Homepage keeps its current production asset until a framed candidate is
  explicitly approved.
- Existing content, routes, accessibility, SEO, reduced motion, and historical
  rights metadata remain intact.
- Required automated checks and production build pass.
- The implementation is committed as `feat: refine image art direction` and no
  deployment occurs.
