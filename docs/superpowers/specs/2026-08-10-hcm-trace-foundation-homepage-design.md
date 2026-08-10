# HCM // TRACE Foundation and Homepage Design

**Status:** Approved for implementation on 2026-08-10

## Scope

This specification covers only Phase 0 (Foundation) and Phase 1 (Homepage).
It does not implement Trace 01, historical content, or the final Closing.

## Product Structure

Public routes:

- `/`
- `/trace/dai-doan-ket`
- `/trace/dao-duc-trach-nhiem`
- `/trace/con-nguoi`

The three trace routes share one future page template. Closing will be rendered
at the end of Trace 03 rather than on a separate route.

## Homepage Job

Within approximately five seconds, a first-time visitor must understand:

1. This is an interactive experience about Ho Chi Minh Thought.
2. It begins with current-day questions and traces their historical formation.
3. The primary action is to start the journey with Trace 01.

The page contains only:

- a brand and hero thesis;
- one primary journey CTA;
- an editorial list of three directly selectable topics.

There is no About section, feature list, FAQ, historical timeline, large footer,
course explanation, dashboard, or onboarding flow.

## Content

Brand: `HCM // TRACE`

Headline:

> Một vấn đề hôm nay.  
> Một tư tưởng từ quá khứ.

Supporting text:

> Bắt đầu từ những câu hỏi của hiện tại, lần theo lịch sử và khám phá cách tư
> tưởng Hồ Chí Minh được hình thành.

Primary action: `Bắt đầu hành trình` -> `/trace/dai-doan-ket`

Topic section heading: `Bạn muốn khám phá điều gì?`

Topics:

1. Đại đoàn kết — Khi những khác biệt cần tìm được một hướng chung.
2. Đạo đức & trách nhiệm — Khi mỗi lựa chọn cá nhân đều tác động đến người khác.
3. Con người — Con người đứng ở đâu trong một xã hội đang thay đổi?

## Visual Direction

The visual language combines cinematic documentary composition, editorial
typography, archival precision, and a modern digital rhythm. It must not look
like a traditional museum, LMS, dashboard, glassmorphic product, or nostalgic
paper replica.

### Color Tokens

- Mineral canvas: `#E9ECE7`
- Deep ink: `#172127`
- Muted steel: `#5C686E`
- Structural line: `#BEC5C0`
- Lacquer accent: `#A63D36`
- Slate field: `#26373D`
- Clear white: `#F8FAF7`

The canvas is cool and mineral rather than sepia. Lacquer red is used only for
the primary action, active trace marks, and intentional hover/focus feedback.

### Typography

- Display: Newsreader, loaded with `next/font` and used for the hero and topic
  titles.
- Body and metadata: IBM Plex Sans, loaded with `next/font`.
- Both families must render Vietnamese diacritics correctly.
- Mobile body text is at least 16px.
- Paragraphs never use all caps.

### Layout

Desktop hero uses an asymmetric editorial split: thesis and CTA on the left,
one restrained time-trace composition on the right. Topic selection is a
full-width numbered list separated by hairlines rather than a card grid.

Mobile preserves the same reading order, turns the hero into one column, and
keeps every topic row obviously clickable without relying on hover.

### Signature Visual

The Trace Line is the one memorable device. On the Homepage it previews the
movement from 2026 toward historical traces and back to the present. It is not
a persistent timeline and does not animate continuously.

## Motion

- Hero content reveals once with short opacity/vertical transitions.
- The Trace Line draws once on entry.
- Topic rows reveal once when entering the viewport.
- Hover feedback is limited to line, color, and arrow displacement.
- Narrative motion uses controlled tweens; no decorative springs.
- `prefers-reduced-motion` renders content immediately and keeps all meaning.

No smooth-scroll library, scroll hijacking, custom cursor, particles, 3D,
strong parallax, or looping background animation is allowed.

## Data Foundation

Every trace has exactly three historical moments in the MVP. Historical moments
contain only year, title, summary, optional image, and optional sources. There
is no detail field or progressive disclosure fallback.

Homepage topic data is read from the same trace registry that future trace pages
will use. `nextTrace` is derived from ordered slugs and is not stored in content.

## Accessibility

- Semantic landmarks and one `h1` on the Homepage.
- Visible keyboard focus.
- Minimum 44px interactive targets.
- AA text contrast.
- No hover-only information.
- No horizontal overflow at 390px.
- Motion respects user preferences.
- Route placeholders remain understandable without animation.

## Performance

- Server Components by default.
- Client Components only for reveal and Trace Line motion.
- Local static data and statically generated trace slugs.
- No visual asset is required for the Phase 1 hero; the signature composition is
  code-native and avoids placeholder stock imagery.
- Only `transform` and `opacity` are animated.

## Acceptance Criteria

- The Homepage communicates the concept within five seconds.
- The journey CTA is visually dominant and links to Trace 01.
- All three topic rows are clearly clickable and link to their correct routes.
- The composition does not resemble a dashboard or generic card grid.
- Desktop at 1920x1080 and mobile near 390px are both intentionally composed.
- Typecheck, lint, tests, and production build pass.
- Trace routes contain foundation placeholders only; Trace 01 is not implemented.

