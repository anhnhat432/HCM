import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Về dự án & phương pháp",
  description:
    "Cách Đuốc Hồng xây dựng các Trace, ghi nhận nguồn, kiểm chứng nội dung và sử dụng hình ảnh.",
  alternates: {
    canonical: "/phuong-phap",
  },
  openGraph: {
    title: "Về dự án & phương pháp | Đuốc Hồng",
    description:
      "Cách Đuốc Hồng xây dựng các Trace, ghi nhận nguồn, kiểm chứng nội dung và sử dụng hình ảnh.",
    type: "website",
  },
};

export default function MethodologyPage() {
  return (
    <main className="methodology" id="main-content">
      <header className="methodology__header">
        <div className="site-container methodology__header-inner">
          <Link className="methodology__brand" href="/">
            ĐUỐC HỒNG
          </Link>
          <span>VỀ DỰ ÁN & PHƯƠNG PHÁP</span>
        </div>
      </header>

      <article className="site-container methodology__article">
        <div className="methodology__intro">
          <p className="methodology__eyebrow">ĐUỐC HỒNG — 2026</p>
          <h1>Về dự án</h1>
          <p>
            Đuốc Hồng là một trải nghiệm đọc theo tuyến thời gian: bắt đầu từ
            một câu hỏi của hiện tại, lần theo các dấu mốc lịch sử, rồi trở lại
            năm 2026 để suy ngẫm về cách vận dụng.
          </p>
        </div>

        <div className="methodology__sections">
          <section aria-labelledby="method-trace">
            <p className="methodology__number">01</p>
            <div>
              <h2 id="method-trace">Cách một Trace được xây dựng</h2>
              <p>
                Mỗi Trace giữ cùng một nhịp: vấn đề hiện tại, ba khoảnh khắc
                lịch sử, phần hình thành tư tưởng, trở về hiện tại và ba gợi ý
                ứng dụng. Cấu trúc này giúp người đọc phân biệt rõ hiện tại với
                quá khứ trong suốt hành trình.
              </p>
            </div>
          </section>

          <section aria-labelledby="method-sources">
            <p className="methodology__number">02</p>
            <div>
              <h2 id="method-sources">Nguồn và kiểm chứng</h2>
              <p>
                Các mốc lịch sử và phần hình thành tư tưởng đi kèm đường dẫn
                nguồn để người đọc có thể kiểm tra thêm. Những ghi chú cần xác
                minh được lưu trong dữ liệu dự án thay vì được diễn giải thành
                một kết luận mới.
              </p>
            </div>
          </section>

          <section aria-labelledby="method-images">
            <p className="methodology__number">03</p>
            <div>
              <h2 id="method-images">Hình ảnh và quyền sử dụng</h2>
              <p>
                Tư liệu lịch sử hiển thị nguồn, tình trạng xác minh và thông
                tin quyền sử dụng khi đã ghi nhận được. Hình ảnh dựng cho bối
                cảnh hiện tại được ghi là “Ảnh minh họa” để không bị hiểu nhầm
                là tư liệu lịch sử.
              </p>
            </div>
          </section>

          <section aria-labelledby="method-limits">
            <p className="methodology__number">04</p>
            <div>
              <h2 id="method-limits">Giới hạn của trải nghiệm</h2>
              <p>
                Đuốc Hồng là một hành trình nhập môn có chủ đích, không phải hồ
                sơ lịch sử toàn diện hay tài liệu thay thế cho nguồn gốc. Một số
                trang nguồn bên ngoài có thể thay đổi theo thời gian, và thông
                tin giấy phép chỉ phản ánh dữ liệu đã ghi nhận tại thời điểm
                kiểm tra.
              </p>
            </div>
          </section>
        </div>

        <nav className="methodology__actions" aria-label="Điều hướng dự án">
          <Link className="methodology__primary" href="/trace/dai-doan-ket">
            Bắt đầu hành trình <span aria-hidden="true">→</span>
          </Link>
          <Link className="methodology__secondary" href="/">
            ← Về trang chủ
          </Link>
        </nav>
      </article>
    </main>
  );
}
