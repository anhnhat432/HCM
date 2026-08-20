# ĐUỐC HỒNG

> Trải nghiệm web tương tác bắt đầu từ những câu hỏi của năm 2026, lần theo các dấu mốc lịch sử trong quá trình hình thành tư tưởng Hồ Chí Minh và trở lại hiện tại để liên hệ với thực tiễn.

---

## 🎯 Mô hình Trải nghiệm (Product Architecture)

Sản phẩm được thiết kế theo 3 tầng thông tin rõ ràng, đáp ứng từ nhu cầu tương tác nhanh đến nghiên cứu chuyên sâu:

1. **Trọng tâm (Core Experience) — 30 Hồ sơ Tư tưởng Sống (`/ho-so`)**
   - Trải nghiệm tương tác 3 chặng ngắn gọn (~2–3 phút/hồ sơ):
     - **Chặng 1: Hiện tại (`/ho-so/[slug]`)** — Khởi đầu từ một tình huống thực tiễn nan giải của năm 2026.
     - **Chặng 2: Dấu vết (`/ho-so/[slug]/dau-vet`)** — Lần theo 3 mốc lịch sử mang tính gợi mở phương pháp luận.
     - **Chặng 3: Trở lại (`/ho-so/[slug]/tro-lai`)** — Đúc kết lăng kính hành động và gợi ý hồ sơ liên quan.
   - Phân loại theo 6 nhóm chủ đề: *Học tập & làm việc nhóm, Lãnh đạo & trách nhiệm, Xung đột lợi ích, Mạng xã hội, Phát triển con người, Cộng đồng & xã hội*.

2. **Chuyên đề (Deep Dive) — 3 Tuyến Dấu ấn Lịch sử (`/trace/[slug]`)**
   - Dòng thời gian lịch sử tổng quan và quá trình hình thành tư tưởng:
     - `/trace/dai-doan-ket` — Tuyến 01: Đại đoàn kết (1930 – 1941 – 1945)
     - `/trace/dao-duc-trach-nhiem` — Tuyến 02: Đạo đức & trách nhiệm (1927 – 1947 – 1958)
     - `/trace/con-nguoi` — Tuyến 03: Con người (1945 – 1958 – 1969)

3. **Cơ sở & Kiểm chứng (Provenance & Reference) (`/phuong-phap`)**
   - Minh bạch nguồn gốc học thuật (*Hồ Chí Minh Toàn tập*, Bảo tàng Lịch sử Quốc gia, Cổng Thông tin điện tử Hồ Chí Minh...).
   - Hệ thống Source Drawer tương tác tra cứu trực tiếp tại từng cứ liệu lịch sử.

---

## 🛠️ Cấu trúc Dữ liệu & Content Schema

Toàn bộ nội dung tư liệu được tách biệt độc lập khỏi mã nguồn trong thư mục `content/` và được kiểm thực chặt chẽ qua Zod schema:

```text
content/
├── cases/                     # 30 file JSON tương ứng 30 hồ sơ tình huống sống
│   ├── nhom-gioi-nhung-khong-hop-tac.json
│   └── ...
├── traces/                    # 3 file JSON tương ứng 3 tuyến tư tưởng chuyên đề
│   ├── dai-doan-ket.json
│   ├── dao-duc-trach-nhiem.json
│   └── con-nguoi.json
└── journey-closing.json       # Tổng kết và thông điệp kết thúc hành trình
schemas/
├── case.schema.ts             # Zod schema cho cấu trúc hồ sơ 3 chặng
├── trace.schema.ts            # Zod schema cho tư liệu và dấu mốc lịch sử
└── provenance.schema.ts       # Zod schema kiểm thực bản quyền và nguồn gốc tư liệu
```

---

## 🚀 Lệnh Phát triển & Quy trình Release (Development & Release Pipeline)

```bash
# Chạy môi trường phát triển local
npm run dev

# Kiểm thực toàn diện trước khi release (Typecheck, Lint, Schema, Provenance, Unit Tests, Build)
npm run verify

# Kiểm tra dữ liệu & nguồn tư liệu độc lập
npm run test:content
npm run test:provenance

# Chạy bộ unit tests
npm test

# Build production tĩnh (SSG 101 pages)
npm run build
```

Mở [http://localhost:3000](http://localhost:3000) sau khi khởi động dev server.

---

## 🌐 Public Routes (101 Static Pages)

- **Trang chủ**: `/`
- **Thư viện Hồ sơ**: `/ho-so`
- **30 Tuyến Hồ sơ (90 pages)**:
  - Chặng 1: `/ho-so/[slug]` (30 routes)
  - Chặng 2: `/ho-so/[slug]/dau-vet` (30 routes)
  - Chặng 3: `/ho-so/[slug]/tro-lai` (30 routes)
- **3 Tuyến Trace Chuyên đề**:
  - `/trace/dai-doan-ket`
  - `/trace/dao-duc-trach-nhiem`
  - `/trace/con-nguoi`
- **Phương pháp & Nguồn tư liệu**: `/phuong-phap`
