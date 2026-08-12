# Kéo Dấu Vết Xuyên Thời Gian — Design Spec

## Mục tiêu

Nâng ĐUỐC HỒNG từ một trải nghiệm editorial tĩnh thành một hành trình
scrollytelling có khoảnh khắc khám phá rõ ràng, nhưng vẫn giữ nguyên nội dung,
kiến trúc Trace, khả năng đọc nhanh và chất lượng accessibility hiện tại.

Creative direction trung tâm:

> Người xem không đọc lịch sử từ trên xuống. Họ lần theo một dấu vết từ năm
> 2026 ngược về quá khứ, nhìn các yếu tố hội tụ thành tư tưởng, rồi trở lại hiện
> tại với một cách nhìn khác.

## Nguyên tắc đã duyệt

- Ưu tiên đơn giản, hiệu quả và chất lượng.
- Người dùng chỉ cần cuộn như bình thường; không có interaction bắt buộc.
- Không khóa cuộn, không yêu cầu kéo, chọn, trả lời hoặc hoàn thành animation.
- Motion tạo ra bằng Trace Line, typography và ảnh hiện có.
- Không thêm dữ kiện lịch sử, application item hoặc diễn giải tư tưởng mới.
- Không biến trải nghiệm thành quiz, game, phòng realtime hoặc công cụ khảo sát.
- Nội dung phải luôn đọc được khi JavaScript lỗi, reduced motion bật hoặc người
  dùng cuộn rất nhanh.

## Phạm vi trải nghiệm

### 1. Homepage

Homepage giữ nguyên bố cục, nội dung, hình ảnh và primary journey hiện tại.

Chỉ bổ sung một QR share trigger nhỏ trong header. Trigger không cạnh tranh với
branding và không trở thành CTA chính. Khi mở, dialog tạo QR cho URL hiện tại,
cho phép sao chép liên kết và gọi native share khi trình duyệt hỗ trợ.

### 2. Trace Opening

Trace Opening giữ nguyên toàn bộ headline, summary, central question, ảnh hiện
tại và CTA “Nhìn lại quá khứ”. Không biến Opening thành vùng sticky dài và
không làm CTA rơi khỏi viewport laptop đã được khóa.

CTA tiếp tục là anchor navigation bình thường. Scrollytelling bắt đầu ở
`TimeBridge — Trace Back`, ngay sau Opening, để người dùng không phải học một
cách điều khiển mới.

### 3. Trace Back Story

`TimeBridge` variant `back` trở thành sequence sticky ngắn:

1. Bắt đầu bằng ảnh hiện tại đã có trong Trace Opening.
2. Khi người dùng cuộn, Trace Line chạy từ `2026` tới historical year đầu tiên.
3. Lớp ảnh hiện tại được thay dần bằng ảnh của historical moment đầu tiên.
4. Typography “hãy lần theo dấu vết của tư tưởng” giữ vai trò dẫn chuyện.
5. Khi sequence hoàn tất, mốc lịch sử đầu tiên đã sẵn sàng ngay bên dưới.

Sequence không được dài quá mức:

- Desktop/laptop: khoảng `130–150vh`.
- Mobile: khoảng `110–125vh`.
- Reduced motion: layout tĩnh, hiển thị ngay trạng thái hoàn chỉnh.

Người dùng cuộn nhanh phải đi thẳng qua sequence, không bị snap hoặc chờ motion.

### 4. Historical Moments

Ba historical moment giữ nguyên grid, source drawer, nội dung, asset và anchor.

Motion được tinh chỉnh thành một nhịp đọc nhất quán:

1. Year và title xuất hiện.
2. Summary và metadata xuất hiện.
3. Historical visual xuất hiện.
4. Một đoạn Trace Line mảnh nối ý niệm sang moment tiếp theo.

Không thêm badge “đã thu thập”, không lưu completion state và không biến moment
thành card hoặc slide.

### 5. Thought Formation

Thought Formation tiếp tục là visual climax của mỗi Trace.

Ba formation factor hiện có được coi là ba dấu vết. Một convergence line
scroll-linked thể hiện ba nhịp đi vào cùng một kết luận. Conclusion chỉ được
nhấn bằng typography, spacing, line và muted-red accent như hệ thống hiện tại.

Không thêm node, circle, icon, diagram hoặc infographic.

Nếu motion không hoạt động, ba factor và conclusion vẫn xuất hiện theo đúng DOM
order và không mất quan hệ ngữ nghĩa.

### 6. Return 2026

`TimeBridge` variant `return` giữ layout tối và sử dụng cùng ngôn ngữ Trace Line
theo chiều ngược lại: historical year cuối → `2026`.

Không lặp lại image crossfade lớn. Điểm nhấn nằm ở chuyển động đường thời gian và
việc nội dung “Trở lại năm 2026” xuất hiện sau khi đường hoàn tất.

### 7. Journey Closing

Journey Closing giữ nguyên heading, ba takeaway, statement và actions.

Một line mark tối giản đại diện cho ba Trace xuất hiện trước phần actions. Ba
đường hội tụ thành silhouette ngọn đuốc trừu tượng, không dùng illustration,
particle hoặc glow. Mark mang tính tổng kết, không phải logo replacement.

Reduced motion hiển thị mark ở trạng thái cuối ngay lập tức.

## QR Sharing

QR trigger xuất hiện tại Homepage header và Trace header.

Dialog gồm:

- QR của canonical URL hiện tại.
- Tên trang/Trace đang chia sẻ.
- Action `Sao chép liên kết`.
- Action `Chia sẻ` khi `navigator.share` khả dụng.
- Close button, Escape dismissal, focus trap và focus restoration.

QR được tạo cục bộ. Không gọi dịch vụ QR bên ngoài và không gửi URL hoặc dữ liệu
người dùng tới hệ thống thứ ba. QR implementation được lazy-load khi mở dialog
để không ảnh hưởng initial bundle.

Nếu QR generation thất bại, dialog vẫn hiển thị URL và action sao chép.

## Kiến trúc component

### `TraceBackStory`

Client component mới, được render bên trong `TimeBridge` variant `back`.

Inputs:

- `fromYear`
- `toYear`
- present-day image hiện có
- first historical image hiện có

Responsibilities:

- Theo dõi scroll progress trong chính section.
- Ánh xạ progress sang Trace Line, year label, image clip và opacity.
- Trả về trạng thái hoàn chỉnh khi reduced motion bật.
- Không sở hữu hoặc thay đổi historical content.

### `FormationConvergence`

Client wrapper nhỏ quanh convergence line và content hiện có.

Responsibilities:

- Theo dõi progress trong Thought Formation.
- Điều khiển CSS custom properties cho line progression.
- Không thay đổi DOM order hoặc nội dung factor/conclusion.

### `JourneyTraceMark`

Client SVG/line component nhỏ trong Journey Closing.

Responsibilities:

- Vẽ ba đường hội tụ bằng stroke progression.
- Được đánh dấu `aria-hidden="true"` vì ba takeaway ngay cạnh đã truyền đạt đầy
  đủ ý nghĩa bằng text.
- Không thay thế branding hiện có.

### `QrShareDialog`

Client component dùng chung cho Homepage và Trace header.

Responsibilities:

- Đọc canonical URL của trang sau hydration; nếu canonical không tồn tại, dùng
  origin + pathname hiện tại và loại bỏ hash/query không cần thiết.
- Lazy-load QR generator khi dialog mở.
- Copy/share actions và accessible dialog behavior.
- Không lưu state ngoài vòng đời dialog.

### Data flow

`TracePage` truyền present-day image và first historical image đang có vào
`TimeBridge`. Không thêm historical field mới vào `TraceData` và không thay đổi
registry/route architecture.

## Motion implementation

- Tận dụng Framer Motion đã có: `useScroll`, `useTransform` và
  `useReducedMotion`.
- Chỉ animate `transform`, `opacity`, SVG stroke và `clip-path` có giới hạn.
- Không dùng WebGL, video, canvas animation hoặc scroll-jacking.
- Không thêm global scroll listener thủ công nếu Framer Motion đã cung cấp
  primitive tương ứng.
- Static server output luôn hiển thị content; JavaScript chỉ nâng cấp presentation.

## Responsive behavior

### Desktop/laptop

- Sticky visual dùng hai cột hoặc một frame tập trung theo breakpoint hiện có.
- Không làm Homepage/Trace Opening regression ở 1366x768.
- Sequence không che Trace header/progress timeline.

### Mobile

- Sticky duration ngắn hơn desktop.
- Ảnh giữ aspect ratio và crop rules từ presentation taxonomy hiện tại.
- Text không chồng lên phần ảnh quan trọng.
- Không horizontal overflow ở 375x812 và 390x844.

### Reflow và forced colors

- Tại 640px reflow, content chuyển về flow tuyến tính nếu sticky composition
  không còn đủ không gian.
- Forced colors giữ year, Trace Line, controls và focus indicator nhìn thấy được.

## Accessibility

- Scrollytelling không tạo control bắt buộc và không ảnh hưởng reading order.
- Year/time semantics và section headings hiện có được giữ nguyên.
- Motion tuân theo `prefers-reduced-motion` và `MotionConfig` hiện tại.
- QR dialog có label, modal semantics, focus trap, Escape và focus restoration.
- Link copy/share không chỉ dựa vào icon; accessible name luôn có text rõ nghĩa.
- Journey mark không được screen reader đọc thành nhiều path rời rạc.

## Progressive enhancement và lỗi

- Không JavaScript: core narrative, images và anchors vẫn xuất hiện theo layout
  tĩnh. QR dialog và Source Drawer tiếp tục là client enhancements, nhưng việc
  chúng không hoạt động không làm mất nội dung chính của Trace.
- QR lỗi: URL và copy action vẫn khả dụng.
- Share API lỗi/hủy: dialog giữ nguyên, không hiển thị trạng thái thành công giả.
- Image load lỗi: alt text và phần narrative không bị ẩn.

## Performance guardrails

- Không thêm historical asset mới.
- Reuse URL ảnh đã có để tận dụng browser cache.
- Historical overlay không được đánh `priority`.
- QR code chỉ load khi người dùng mở dialog.
- Không làm tăng số client component ngoài các boundary nhỏ đã nêu.
- Lighthouse Accessibility, Best Practices và SEO phải giữ `100` trên Homepage
  và Trace 01.
- Chạy ba Lighthouse trials cùng cấu hình và so sánh median. Homepage
  Performance không thấp hơn `82`; Trace 01 không thấp hơn `71`. Bất kỳ lần
  chạy nào giảm hơn 5 điểm so với baseline Homepage `87` hoặc Trace 01 `76`
  phải được điều tra trước khi release.

## Testing strategy

### Unit/component tests

- Trace Back nhận đúng present/historical image và years từ data hiện có.
- Reduced-motion state trả về presentation hoàn chỉnh.
- Journey mark render đúng một decorative graphic và không tạo redundant name.
- QR dialog tạo đúng canonical URL, copy fallback và share capability branching.

### Production acceptance

- Kiểm tra scroll story ở 1920x1080, 1366x768, 390x844 và 375x812.
- Xác nhận progress thay đổi theo scroll nhưng content không bị ẩn khi cuộn nhanh.
- Xác nhận anchor navigation, Source Drawer và TraceProgress không regression.
- Xác nhận reduced motion, forced colors và 640px reflow.
- Xác nhận không horizontal overflow, hydration error hoặc console error.
- Kiểm tra QR open/close, keyboard focus, copy link và fallback khi share không có.

### Visual QA

- Trace Back: đầu sequence, midpoint và trạng thái hoàn tất.
- Thought Formation: trước hội tụ và conclusion climax.
- Journey Closing: final line mark desktop/mobile.
- So sánh với visual identity cream/ink/muted-red hiện tại; không redesign.

## Ngoài phạm vi

- Personal choice, before/after survey hoặc poster cá nhân.
- Realtime room, audience aggregation hoặc backend state.
- Quiz, score, badge, streak, account hoặc analytics.
- Audio, video, WebGL hoặc AI-generated asset mới.
- Thay đổi historical claims, sources, Trace order hoặc application content.
- Redesign Homepage, Trace layout hoặc navigation architecture.

## Tiêu chí hoàn thành

1. Người dùng chỉ cần cuộn; không có thao tác bắt buộc mới.
2. Trace Back tạo được chuyển đổi rõ từ 2026 về historical year đầu tiên.
3. Historical flow và Thought Formation có continuity bằng Trace Line.
4. Return 2026 và Journey Closing tạo payoff rõ nhưng không kéo dài trải nghiệm.
5. QR sharing hoạt động mà không dùng dịch vụ bên ngoài.
6. Static/reduced-motion experience vẫn hoàn chỉnh.
7. Test, typecheck, lint, build và production acceptance pass.
8. Lighthouse accessibility/best-practices/SEO không regression.
