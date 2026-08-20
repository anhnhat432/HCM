import Image from "next/image";
import Link from "next/link";

import { ScenarioPicker } from "@/components/cases/scenario-picker";
import { Reveal } from "@/components/home/reveal";
import { TopicList } from "@/components/home/topic-list";
import { QrShareDialog } from "@/components/share/qr-share-dialog";
import { traces } from "@/data/traces";
import { getCasePreviews } from "@/lib/thought-case-registry";



const homepageHeroImage = {
  alt: "Trang đầu bản Tuyên ngôn Độc lập với bút tích và dấu lưu trữ",
  caption: "Bản Tuyên ngôn Độc lập — 1945",
  credit: "Trung tâm Lưu trữ quốc gia III",
  license: "Public domain",
  sourceUrl:
    "https://commons.wikimedia.org/wiki/File:B%E1%BA%A3n_Tuy%C3%AAn_ng%C3%B4n_%C4%91%E1%BB%99c_l%E1%BA%ADp_c%E1%BB%A7a_n%C6%B0%E1%BB%9Bc_Vi%E1%BB%87t_Nam_D%C3%A2n_ch%E1%BB%A7_C%E1%BB%99ng_h%C3%B2a._-_Trung_t%C3%A2m_L%C6%B0u_tr%E1%BB%AF_qu%E1%BB%91c_gia_III._Ph%C3%B4ng_Ph%E1%BB%A7_Th%E1%BB%A7_t%C6%B0%E1%BB%9Bng,_h%E1%BB%93_s%C6%A1_586,_t%E1%BB%9D_s%E1%BB%91_1_%E2%80%93_3.jpg",
  src: "/images/homepage-independence-declaration.jpg",
} as const;

export default function Home() {
  const casePreviews = getCasePreviews();

  return (
    <main className="home" id="main-content">
      <header className="home-header">
        <div className="site-container home-header__inner">
          <Link className="brand-mark" href="/">
            <span className="brand-mark__line" aria-hidden="true" />
            <span className="brand-mark__text">ĐUỐC HỒNG</span>
          </Link>

          <nav className="home-nav" aria-label="Điều hướng chính">
            <Link className="home-nav__link" href="#tinh-huong-goi-y">30 Tình huống</Link>
            <Link className="home-nav__link" href="/ho-so">Thư viện hồ sơ</Link>
            <Link className="home-nav__link" href="#kho-tu-lieu">Kho tư liệu nền</Link>
            <Link className="home-nav__link" href="/phuong-phap">Phương pháp</Link>
          </nav>

          <div className="home-header__actions">
            <QrShareDialog label="Chia sẻ trang Đuốc Hồng bằng mã QR" />
          </div>
        </div>
      </header>

      <section className="home-hero" aria-labelledby="home-heading">
        <div className="site-container home-hero__grid">
          <div className="home-hero__copy">
            <p className="home-hero__kicker">
              TƯ TƯỞNG HỒ CHÍ MINH &amp; THỰC TIỄN ĐƯƠNG ĐẠI
            </p>

            <h1 className="home-hero__title" id="home-heading">
              <span className="home-hero__title-line">Một vấn đề{" "}</span>
              <span className="home-hero__title-line"><strong className="text-highlight">hôm nay.</strong>{" "}</span>
              <span className="home-hero__title-line">Một tư tưởng{" "}</span>
              <span className="home-hero__title-line"><strong className="text-gold">từ quá khứ.</strong>{" "}</span>
            </h1>

            <p className="home-hero__supporting">
              Bắt đầu từ những trăn trở, xung đột thực tế của đời sống hiện đại, lần theo các dấu mốc lịch sử để hiểu cội nguồn và vận dụng sáng tạo <strong>Tư tưởng Hồ Chí Minh</strong>.
            </p>

            <p className="home-hero__journey-meta">
              Khoảng 2 phút · Không có đáp án đúng hoặc sai · Khám phá bước chuyển hóa nhận thức.
            </p>

            <div className="home-hero__cta-group">
              <Link className="primary-action" href="#tinh-huong-goi-y">
                <span>Bắt đầu với một tình huống</span>
                <span className="primary-action__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
              <Link className="home-hero__secondary-link" href="/ho-so">
                <span>Xem danh mục 30 hồ sơ</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="home-hero__visual">
            <figure className="home-hero__figure">
              <div className="home-hero__image-tag">
                <span className="home-hero__image-tag-dot" aria-hidden="true" />
                <span>TƯ LIỆU GỐC 1945</span>
              </div>
              <div className="home-hero__image-frame">
                <Image
                  alt={homepageHeroImage.alt}
                  className="home-hero__image"
                  fill
                  priority
                  sizes="(max-width: 48rem) calc(100vw - 4rem), 480px"
                  src={homepageHeroImage.src}
                />
              </div>
              <figcaption className="home-hero__caption">
                <strong className="home-hero__caption-title">{homepageHeroImage.caption}</strong>
                <span className="home-hero__credit">
                  Nguồn:{" "}
                  <a
                    href={homepageHeroImage.sourceUrl}
                    rel="noreferrer"
                    target="_blank"
                    title={`Giấy phép: ${homepageHeroImage.license}`}
                  >
                    {homepageHeroImage.credit}
                  </a>
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="scenario-picker-heading"
        className="scenario-picker-section"
        id="tinh-huong-goi-y"
      >
        <div className="site-container">
          <Reveal>
            <div className="scenario-picker-section__heading">
              <p className="section-label">HỒ SƠ TÌNH HUỐNG THỰC TẾ</p>
              <h2 id="scenario-picker-heading">
                Có thể bạn đang gặp một câu hỏi như thế này.
              </h2>
              <p className="section-desc">
                Mỗi hồ sơ xuất phát từ một tình huống thực tế của sinh viên, người trẻ ngày nay và mở ra hành trình đối thoại cùng lịch sử.
              </p>
            </div>
          </Reveal>

          <ScenarioPicker previews={casePreviews} />
        </div>
      </section>

      <section className="topic-section" id="kho-tu-lieu" aria-labelledby="topic-heading">
        <div className="site-container">
          <Reveal>
            <div className="topic-section__header-block">
              <p className="section-label">
                NỀN TẢNG HỌC THUẬT &amp; ĐỌC SÂU
              </p>
              <h2 className="topic-section__label" id="topic-heading">
                Kho tư liệu nền: 3 Trục tư tưởng lớn
              </h2>
              <p className="topic-section__desc">
                Dành cho ai muốn đào sâu: Hệ thống toàn văn các mốc lịch sử, bối cảnh thực tiễn và quá trình kết tinh những giá trị tư tưởng vĩ đại của Chủ tịch Hồ Chí Minh đứng phía sau 30 hồ sơ.
              </p>
            </div>
          </Reveal>

          <TopicList traces={traces} />
        </div>
      </section>

      <footer className="home-footer">
        <div className="site-container home-footer__inner">
          <div className="home-footer__brand">
            <span className="brand-mark">
              <span className="brand-mark__line" aria-hidden="true" />
              <span className="brand-mark__text">ĐUỐC HỒNG — 2026</span>
            </span>
            <p className="home-footer__tagline">
              Dự án học tập và trải nghiệm tương tác Tư tưởng Hồ Chí Minh qua lăng kính đương đại.
            </p>
          </div>
          <div className="home-footer__links">
            <Link href="/ho-so">Hồ sơ tư tưởng sống</Link>
            <Link href="/phuong-phap">Về dự án &amp; phương pháp</Link>
            <Link href="#main-content">Về đầu trang ↑</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
