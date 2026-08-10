import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/home/reveal";
import { TopicList } from "@/components/home/topic-list";
import { traces } from "@/data/traces";

export default function Home() {
  return (
    <main className="home" id="main-content">
      <header className="home-header">
        <div className="site-container home-header__inner">
          <span className="brand-mark">HCM // TRACE</span>
        </div>
      </header>

      <section className="home-hero" aria-labelledby="home-heading">
        <div className="site-container home-hero__grid">
          <div className="home-hero__copy">
            <Reveal>
              <p className="section-kicker">HCM // TRACE — 2026</p>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="home-hero__title" id="home-heading">
                <span className="home-hero__title-line">Một vấn đề</span>
                <span className="home-hero__title-line">hôm nay.</span>
                <span className="home-hero__title-line">Một tư tưởng</span>
                <span className="home-hero__title-line">từ quá khứ.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="home-hero__supporting">
                Bắt đầu từ những câu hỏi của hiện tại, lần theo lịch sử và
                khám phá cách tư tưởng Hồ Chí Minh được hình thành.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <Link className="primary-action" href="/trace/dai-doan-ket">
                <span>Bắt đầu hành trình</span>
                <span className="primary-action__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </Reveal>
          </div>

          <Reveal className="home-hero__visual" delay={0.1}>
            <figure className="home-hero__figure">
              <div className="home-hero__image-frame">
                <Image
                  alt="Kho lưu trữ lịch sử và tài liệu"
                  className="home-hero__image"
                  fill
                  priority
                  sizes="(max-width: 48rem) calc(100vw - 4rem), 435px"
                  src="/images/homepage-archive.jpg"
                />
              </div>
              <figcaption>Kho lưu trữ</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="topic-section" aria-labelledby="topic-heading">
        <div className="site-container">
          <Reveal>
            <h2 className="topic-section__label" id="topic-heading">
              Bạn muốn khám phá điều gì?
            </h2>
          </Reveal>

          <TopicList traces={traces} />
        </div>
      </section>

      <footer className="home-footer">
        <div className="site-container home-footer__inner">
          <p>HCM // TRACE — Prototype 2026</p>
        </div>
      </footer>
    </main>
  );
}
