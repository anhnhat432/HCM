# Vietnamese Typography Spacing Design

## Scope

Apply the approved typography audit corrections without redesigning the
Homepage or any Trace section. The change is limited to three shared heading
styles in `app/globals.css`:

- Thought Formation heading;
- Thought Formation conclusion climax;
- Next Trace title on mobile.

Routes, components, content, font sizes, letter spacing, layout, interactions,
image presentation, responsive structure, and reduced-motion behavior remain
unchanged.

## Approved Values

### Thought Formation Heading

Set the shared desktop line-height to `1.10` and the mobile override to `1.10`.
Keep `letter-spacing: -0.04em`. This gives Vietnamese diacritics consistent
vertical breathing room across all three Trace pages without changing wrapping
width or heading prominence.

### Conclusion Climax

Set the shared conclusion line-height to `1.04`. Keep
`letter-spacing: -0.05em`. Each authored heading line is a separate block
`span`; add `margin-top: 0.18em` only to adjacent spans. The project owner's
follow-up screenshot review confirmed that `0.12em` remained slightly tight
between below-baseline and above-cap diacritics. The explicit inter-line
gap separates Vietnamese diacritics without inflating the line box around the
first or last line, weakening the visual climax, or making the five-line Trace
03 conclusion unnecessarily tall.

### Next Trace Mobile

Keep the desktop line-height at `1.02`. Add a mobile line-height override of
`1.07` inside the existing mobile media query. Do not change the title width,
font size, content, or wrapping behavior.

## Regression Guardrails

Add a source-level test that locks the approved CSS values. Extend browser
acceptance to verify computed line-height ratios at 1920x1080, 1366x768, and
390x844. The acceptance suite must continue to cover every Trace, Homepage
regression, horizontal overflow, console errors, and reduced motion.

## Acceptance

- Thought Formation headings compute to a `1.10` line-height ratio at all three
  breakpoints.
- Conclusion headings compute to a `1.04` line-height ratio at all three
  breakpoints.
- Every conclusion line after the first computes to a `0.18em` top margin at
  all three breakpoints.
- Next Trace titles compute to `1.02` on desktop/laptop and `1.07` on mobile.
- No text clipping, overlap, horizontal overflow, or new console errors appear.
- Homepage and all existing tests continue to pass.

## Release Boundary

Implement on a new branch from `origin/main`, create focused documentation and
implementation commits, push the branch, and open a pull request. Do not merge
without an explicit user request.
