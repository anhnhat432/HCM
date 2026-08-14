# Release Readiness

## Current status

**READY WITH LIMITATIONS for public release.** The functional experience and
technical QA are release-ready. The release now includes the 30-case "Hồ sơ tư
tưởng sống" library and source-backed six-act case journeys while preserving
the approved Trace experience. All nine historical moments use verified assets
across eight unique files; the 1945 declaration image is intentionally reused
in Trace 01 and Trace 03. Source, license, and project-owner approval notes
remain recorded in `data/traces.ts`.

## Verified experience

- Routes: `/`, `/ho-so`, all 30 statically generated `/ho-so/[slug]` routes,
  `/trace/dai-doan-ket`, `/trace/dao-duc-trach-nhiem`, `/trace/con-nguoi`,
  `/phuong-phap`, Journey Closing, and branded 404 states.
- Breakpoints: 1920x1080, 1440x900, 1366x768, 1024x768, 768x1024,
  640x900 reflow-equivalent, 390x844, and 375x812.
- QA: full journey, direct entry, keyboard navigation, visible focus, reduced
  motion, forced colors, no-JavaScript case readability, internal links,
  console/network state, responsive overflow, image loading, metadata, and
  Vietnamese branding.
- Living cases: exactly 30 curated situations across six categories; the
  library keeps all case links in server-rendered markup, and each case exposes
  three evidence reveals, six named acts, optional perspective selection,
  related cases, Trace links, and no-JavaScript source fallbacks.
- Trace support: progress timeline, Before/After recap, compact Trace switcher,
  data-driven Journey Closing takeaways, and per-moment Source Drawer.
- Sharing: Homepage and Trace headers expose an accessible, locally generated
  QR dialog using canonical URLs and no external QR service.
- Sources: content, theory, and image provenance links are recorded in data and
  exposed through the narrative or Source Drawer as appropriate.
- Performance: production build uses `next/image`, lazy historical images,
  priority only for opening imagery, `next/font`, lazy local QR generation, and
  bounded motion client components. Homepage above-fold content is not delayed
  by decorative reveal wrappers, and Homepage-only content no longer requests
  the Trace display family.

### Lighthouse lab results

Three Lighthouse 12.8.2 mobile-profile trials per route produced the following
results:

| Route | Performance runs | Median | Accessibility | Best Practices | SEO |
| --- | --- | ---: | ---: | ---: | ---: |
| Homepage `/` | 91, 91, 92 | 91 | 100 | 100 | 100 |
| Case library `/ho-so` | 92, 91, 91 | 91 | 100 | 100 | 100 |
| Representative case `/ho-so/nhom-gioi-nhung-khong-hop-tac` | 85, 85, 85 | 85 | 100 | 100 | 100 |

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
