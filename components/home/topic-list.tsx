import Link from "next/link";

import { Reveal } from "@/components/home/reveal";
import type { TraceData } from "@/types/trace";

interface TopicListProps {
  readonly traces: readonly TraceData[];
}

export function TopicList({ traces }: TopicListProps) {
  return (
    <ol className="topic-list">
      {traces.map((trace, index) => {
        const chapter = String(trace.order).padStart(2, "0");

        return (
          <li key={trace.slug}>
            <Reveal delay={index * 0.05}>
              <Link
                className="topic-link"
                href={`/trace/${trace.slug}`}
                aria-label={trace.title}
              >
                <span className="topic-link__number">{chapter}</span>
                <span className="topic-link__title">
                  {trace.title.toLocaleUpperCase("vi-VN")}
                </span>
                <span className="topic-link__idea">{trace.cardSummary}</span>
                <span className="topic-link__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
