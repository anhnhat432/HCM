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
          <span className="brand-mark">ĐUỐC HỒNG</span>
          <QrShareDialog label="Chia sẻ trang Đuốc Hồng bằng mã QR" />
        </div>
      </header>

      <section className="home-hero" aria-labelledby="home-heading">
        <div className="site-container home-hero__grid">
          <div className="home-hero__copy">
            <p className="section-kicker">ĐUỐC HỒNG — 2026</p>

            <h1 className="home-hero__title" id="home-heading">
              <span className="home-hero__title-line">Một vấn đề{" "}</span>
              <span className="home-hero__title-line">hôm nay.{" "}</span>
              <span className="home-hero__title-line">Một tư tưởng{" "}</span>
              <span className="home-hero__title-line">từ quá khứ.{" "}</span>
            </h1>

            <p className="home-hero__supporting">
              Bắt đầu từ những câu hỏi của hiện tại, lần theo lịch sử và khám
              phá cách tư tưởng Hồ Chí Minh được hình thành.
            </p>

            <p className="home-hero__journey-meta">
              Khoảng 2 phút · Không có đáp án đúng hoặc sai.
            </p>

            <Link className="primary-action" href="#tinh-huong-goi-y">
              <span>Bắt đầu với một tình huống</span>
              <span className="primary-action__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>

          <div className="home-hero__visual">
            <figure className="home-hero__figure">
              <div className="home-hero__image-frame">
                <Image
                  alt={homepageHeroImage.alt}
                  className="home-hero__image"
                  fill
                  priority
                  sizes="(max-width: 48rem) calc(100vw - 4rem), 435px"
                  src={homepageHeroImage.src}
                />
              </div>
              <figcaption>
                <span>{homepageHeroImage.caption}</span>
                <span className="home-hero__credit">
                  Nguồn ảnh:{" "}
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
              <p>TÌNH HUỐNG GỢI Ý</p>
              <h2 id="scenario-picker-heading">
                Có thể bạn đang gặp một câu hỏi như thế này.
              </h2>
            </div>
          </Reveal>

          <ScenarioPicker previews={casePreviews} />
        </div>
      </section>

      <section className="topic-section" aria-labelledby="topic-heading">
        <div className="site-container">
          <Reveal>
            <h2 className="topic-section__label" id="topic-heading">
              Kho tư liệu nền
            </h2>
          </Reveal>

          <TopicList traces={traces} />
        </div>
      </section>

      <footer className="home-footer">
        <div className="site-container home-footer__inner">
          <p>ĐUỐC HỒNG — 2026</p>
          <div className="home-footer__links">
            <Link href="/ho-so">Hồ sơ tư tưởng sống</Link>
            <Link href="/phuong-phap">Về dự án & phương pháp</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
