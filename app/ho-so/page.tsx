import type { Metadata } from "next";
import Link from "next/link";

import { CaseLibraryFilters } from "@/components/cases/case-library-filters";
import { getCasePreviews } from "@/lib/thought-case-registry";

export const metadata: Metadata = {
  title: "Hồ sơ tư tưởng sống",
  description:
    "Khám phá 30 tình huống hôm nay qua những dấu vết lịch sử và tư tưởng Hồ Chí Minh.",
  alternates: {
    canonical: "/ho-so",
  },
  openGraph: {
    title: "Hồ sơ tư tưởng sống | Đuốc Hồng",
    description:
      "Bắt đầu từ một tình huống hiện tại, mở hồ sơ lịch sử và trở lại với ba góc nhìn thực tiễn.",
    siteName: "Đuốc Hồng",
    locale: "vi_VN",
    type: "website",
  },
};

export default function CaseLibraryPage() {
  const previews = getCasePreviews();

  return (
    <main className="case-library-page" id="main-content">
      <header className="case-library-page__header">
        <div className="site-container case-library-page__header-inner">
          <Link className="brand-mark" href="/">
            <span className="brand-mark__line" aria-hidden="true" />
            <span className="brand-mark__text">ĐUỐC HỒNG</span>
          </Link>

          <span>30 HỒ SƠ / 06 CHỦ ĐỀ</span>
        </div>
      </header>

      <section
        aria-labelledby="case-library-heading"
        className="case-library-page__intro"
      >
        <div className="site-container case-library-page__intro-grid">
          <p className="case-library-page__kicker">HỒ SƠ TƯ TƯỞNG SỐNG</p>
          <div>
            <h1 id="case-library-heading">
              Bắt đầu từ một tình huống đang xảy ra hôm nay.
            </h1>
            <p>
              Chọn điều khiến bạn băn khoăn. Mỗi hồ sơ sẽ đưa bạn qua ba dấu
              vết lịch sử, rồi trở lại vấn đề ban đầu bằng những góc nhìn có
              thể áp dụng ngay.
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Thư viện hồ sơ" className="case-library-page__body">
        <div className="site-container">
          <CaseLibraryFilters previews={previews} />
        </div>
      </section>

      <footer className="case-library-page__footer">
        <div className="site-container">
          <Link href="/">← Trở về trang chủ</Link>
        </div>
      </footer>
    </main>
  );
}
