import Link from "next/link";

import { HeroTraceVisual } from "@/components/home/hero-trace-visual";
import { Reveal } from "@/components/home/reveal";
import { TopicList } from "@/components/home/topic-list";
import { traces } from "@/data/traces";

export default function Home() {
  return (
    <main className="home" id="main-content">
      <header className="home-hero">
        <div className="site-container home-hero__inner">
          <div className="home-hero__topline">
            <span className="brand-mark">HCM // TRACE</span>
            <span className="home-hero__meta">03 chủ đề · 05–10 phút</span>
          </div>

          <div className="home-hero__grid">
            <div className="home-hero__copy">
              <Reveal>
                <p className="section-kicker">Từ hiện tại, lần theo lịch sử</p>
              </Reveal>

              <Reveal delay={0.06}>
                <h1 className="home-hero__title">
                  <span>Một vấn đề hôm nay.</span>
                  <span>Một tư tưởng từ quá khứ.</span>
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
              <HeroTraceVisual />
            </Reveal>
          </div>
        </div>
      </header>

      <section className="topic-section" aria-labelledby="topic-heading">
        <div className="site-container">
          <Reveal>
            <div className="topic-section__heading">
              <p className="section-kicker">Ba câu hỏi của hiện tại</p>
              <h2 id="topic-heading">Bạn muốn khám phá điều gì?</h2>
            </div>
          </Reveal>

          <TopicList traces={traces} />
        </div>
      </section>
    </main>
  );
}
