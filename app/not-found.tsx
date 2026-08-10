import type { Metadata } from "next";
import Link from "next/link";

const description =
  "Trang bạn tìm kiếm không tồn tại trong hành trình Đuốc Hồng.";

export const metadata: Metadata = {
  title: "Không tìm thấy",
  description,
  openGraph: {
    title: "Không tìm thấy | Đuốc Hồng",
    description,
    siteName: "Đuốc Hồng",
    locale: "vi_VN",
    type: "website",
  },
};

export default function NotFound() {
  return (
    <main className="trace-placeholder" id="main-content">
      <div className="site-container trace-placeholder__inner">
        <header className="trace-placeholder__header">
          <Link className="trace-placeholder__brand" href="/">
            ĐUỐC HỒNG
          </Link>
          <span>404</span>
        </header>

        <div className="trace-placeholder__content">
          <p className="trace-placeholder__eyebrow">Không tìm thấy dấu vết</p>
          <h1>Trang này không tồn tại.</h1>
          <p className="trace-placeholder__message">
            Hãy trở về điểm bắt đầu để chọn một trong ba chủ đề của hành trình.
          </p>
          <Link className="text-link" href="/">
            Về trang chủ <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
