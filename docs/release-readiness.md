# Release Readiness

## Current status

**READY WITH LIMITATIONS for public release.** The functional experience and
technical QA are release-ready. The project owner approved public use of the
four unique archival files on 2026-08-10; their original source and license
notes remain recorded separately from that approval.

## Verified experience

- Routes: `/`, `/trace/dai-doan-ket`, `/trace/dao-duc-trach-nhiem`,
  `/trace/con-nguoi`, Journey Closing, and branded 404 states.
- Breakpoints: 1920x1080, 1440x900, 1366x768, 1024x768, 768x1024,
  390x844, and 375x812.
- QA: full journey, direct entry, keyboard navigation, visible focus, reduced
  motion, internal links, console/network state, responsive overflow, image
  loading, metadata, and Vietnamese branding.
- Sources: 17/17 external content, image, and theory URLs returned HTTP 200 in
  the best-effort check on 2026-08-10.
- Performance: production build uses `next/image`, lazy historical images,
  priority only for opening imagery, `next/font`, and bounded motion client
  components. Lighthouse was not installed, so no numeric score is reported.

## Historical asset status

| Trace | Moment | Asset | Verification | Usage | Release recommendation |
| --- | --- | --- | --- | --- | --- |
| Đại đoàn kết | 1930 | `1930-party-foundation.jpg` | verified | approved | Cleared by project-owner approval for public use |
| Đại đoàn kết | 1941 | `1941-viet-minh-pac-bo.jpg` | verified | approved | Cleared by project-owner approval for public use |
| Đại đoàn kết | 1945 | `1945-independence-declaration.jpg` | verified | approved | Cleared by project-owner approval for public use |
| Đạo đức & trách nhiệm | 1927 | `1927-duong-kach-menh.jpg` | verified | approved | Cleared by project-owner approval for public use |
| Đạo đức & trách nhiệm | 1947 | Neutral placeholder | placeholder | not-applicable | Can ship with the known limitation |
| Đạo đức & trách nhiệm | 1958 | Neutral placeholder | placeholder | not-applicable | Can ship with the known limitation |
| Con người | 1945 | Reuses `1945-independence-declaration.jpg` | verified | approved | Covered by the same project-owner approval as Trace 01 |
| Con người | 1958 | Neutral placeholder | placeholder | not-applicable | Can ship with the known limitation |
| Con người | 1969 | Neutral placeholder | placeholder | not-applicable | Can ship with the known limitation |

Present-day images for all three Trace openings are verified, carry Unsplash
license metadata, use descriptive alternative text, and remain visually
distinct from historical imagery.

## Known limitations

- Four historical moments intentionally retain neutral placeholders.
- No Lighthouse score is available in this environment.
- External URL availability is time-sensitive and should be rechecked before
  deployment.

## Release blockers

None currently recorded. The four neutral placeholders remain visible, known
limitations rather than deployment blockers.

## Deployment prerequisites

1. Run the full test, typecheck, lint, build, and production acceptance gates on
   the exact release commit.
2. Configure the production host and verify metadata, internal routes, fonts,
   images, console, and network behavior on the deployed origin.
