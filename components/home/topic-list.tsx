import Link from "next/link";

import { Reveal } from "@/components/home/reveal";
import type { TraceData } from "@/types/trace";

interface TopicListProps {
  readonly traces: readonly TraceData[];
}

export function TopicList({ traces }: TopicListProps) {
  return (
    <div className="topic-grid">
      {traces.map((trace, index) => {
        const chapter = String(trace.order).padStart(2, "0");
        const years = trace.historicalMoments.map((m) => m.year).join(" · ");

        return (
          <Reveal delay={index * 0.08} key={trace.slug}>
            <Link
              aria-label={trace.title}
              className="topic-card"
              href={`/trace/${trace.slug}`}
            >
              <div className="topic-card__header">
                <span className="topic-card__number">CHUYÊN ĐỀ {chapter}</span>
                <span className="topic-card__years">{years}</span>
              </div>

              <div className="topic-card__content">
                <h3 className="topic-card__title">{trace.title}</h3>
                <p className="topic-card__summary">{trace.cardSummary}</p>
                <p className="topic-card__question">
                  <em>&ldquo;{trace.centralQuestion}&rdquo;</em>
                </p>
              </div>

              <div className="topic-card__footer">
                <span className="topic-card__cta">Khám phá dòng tư tưởng</span>
                <span className="topic-card__arrow" aria-hidden="true">
                  →
                </span>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}

