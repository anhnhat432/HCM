# Release Readiness

## Current status

**READY WITH LIMITATIONS for public release.** The functional experience and
technical QA are release-ready. All nine historical moments now use verified
assets across eight unique files; the 1945 declaration image is intentionally
reused in Trace 01 and Trace 03. Source, license, and project-owner approval
notes remain recorded in `data/traces.ts`.

## Verified experience

- Routes: `/`, `/trace/dai-doan-ket`, `/trace/dao-duc-trach-nhiem`,
  `/trace/con-nguoi`, `/phuong-phap`, Journey Closing, and branded 404 states.
- Breakpoints: 1920x1080, 1440x900, 1366x768, 1024x768, 768x1024,
  640x900 reflow-equivalent, 390x844, and 375x812.
- QA: full journey, direct entry, keyboard navigation, visible focus, reduced
  motion, forced colors, internal links, console/network state, responsive
  overflow, image loading, metadata, and Vietnamese branding.
- Trace support: progress timeline, Before/After recap, compact Trace switcher,
  data-driven Journey Closing takeaways, per-moment Source Drawer, passive
  scroll-linked Trace Back, historical continuity, Thought Formation
  convergence, and a line-only Journey trace finale.
- Sharing: Homepage and Trace headers expose a locally generated QR dialog using
  canonical URLs; no external QR service or required interaction is introduced.
- Progressive enhancement: ordinary scrolling remains the only required user
  behavior. Reflow, no-JavaScript, and reduced-motion variants expose complete
  static content without sticky animation dependencies.
- Sources: content, theory, and image provenance links are recorded in data and
  exposed through the narrative or Source Drawer as appropriate.
- Performance: production build uses `next/image`, lazy historical images,
  priority only for opening imagery, `next/font`, lazy local QR generation, and
  bounded motion client components. Three Lighthouse 12.8.2 trials produced
  Performance medians of 88 for Homepage and 80 for Trace 01; both routes score
  100 for Accessibility, Best Practices, and SEO in every trial.

## Historical asset status

| Trace | Moment | Asset | Verification | Usage | Release recommendation |
| --- | --- | --- | --- | --- | --- |
| Đại đoàn kết | 1930 | `1930-party-foundation.jpg` | verified | approved | Cleared by project-owner approval for public use |
| Đại đoàn kết | 1941 | `1941-viet-minh-pac-bo.jpg` | verified | approved | Cleared by project-owner approval for public use |
| Đại đoàn kết | 1945 | `1945-independence-declaration.jpg` | verified | approved | Cleared by project-owner approval for public use |
| Đạo đức & trách nhiệm | 1927 | `1927-duong-kach-menh-crop.jpg` | verified | approved | Use with recorded provenance and approval note |
| Đạo đức & trách nhiệm | 1947 | `1947-sua-doi-loi-lam-viec.jpg` | verified | approved | Public domain asset with recorded provenance |
| Đạo đức & trách nhiệm | 1958 | `1958-dao-duc-cach-mang.jpg` | verified | approved | Use with recorded provenance and approval note |
| Con người | 1945 | Reuses `1945-independence-declaration.jpg` | verified | approved | Covered by the same project-owner approval as Trace 01 |
| Con người | 1958 | `1958-political-class-teachers.jpg` | verified | approved | Use with recorded provenance and approval note |
| Con người | 1969 | `1969-testament.jpg` | verified | approved | Public domain asset with recorded provenance |

Present-day images for all three Trace openings are project-owner-approved
illustrations with descriptive alternative text. Their generator and license
terms were not provided, as recorded in `data/traces.ts`.

## Known limitations

- Several official source pages do not state a reusable-content license; the
  recorded project-owner approval does not replace third-party license terms.
- The generator and license terms for the three present-day illustrations are
  not recorded.
- NVDA and Android TalkBack checks remain manual; the exact release checklist is
  recorded in `docs/accessibility-qa.md`.
- External URL availability is time-sensitive and should be rechecked before
  deployment.

## Release blockers

None currently recorded.

## Deployment prerequisites

1. Run the full test, typecheck, lint, build, and production acceptance gates on
   the exact release commit.
2. Configure the production host and verify metadata, internal routes, fonts,
   images, console, and network behavior on the deployed origin.
