import Link from "next/link";

import { TraceReveal } from "@/components/trace/reveal";
import type { TraceData } from "@/types/trace";

interface TraceNavigationProps {
  readonly nextTrace: TraceData;
}

export function TraceNavigation({ nextTrace }: TraceNavigationProps) {
  const chapter = String(nextTrace.order).padStart(2, "0");

  return (
    <section
      className="trace-navigation"
      data-trace-stage="next-trace"
      id="next-trace"
      aria-labelledby="next-trace-title"
    >
      <div className="site-container trace-navigation__inner">
        <TraceReveal>
          <p className="trace-navigation__label">Tiếp tục hành trình</p>
          <Link
            aria-label={nextTrace.title}
            className="trace-navigation__next"
            href={`/trace/${nextTrace.slug}`}
          >
            <span className="trace-navigation__number">{chapter}</span>
            <span className="trace-navigation__title" id="next-trace-title">
              {nextTrace.title.toLocaleUpperCase("vi-VN")}
            </span>
            <span className="trace-navigation__arrow" aria-hidden="true">
              →
            </span>
            <span className="trace-navigation__summary">{nextTrace.cardSummary}</span>
          </Link>
          <div className="trace-navigation__home">
            <Link aria-label="Về trang chủ" href="/">
              ← Về trang chủ
            </Link>
          </div>
        </TraceReveal>
      </div>
    </section>
  );
}
