import Link from "next/link";

export default function NotFound() {
  return (
    <main className="trace-placeholder" id="main-content">
      <div className="site-container trace-placeholder__inner">
        <header className="trace-placeholder__header">
          <Link className="trace-placeholder__brand" href="/">
            HCM // TRACE
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
