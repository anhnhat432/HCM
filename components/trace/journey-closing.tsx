import Link from "next/link";

import { TraceReveal } from "@/components/trace/reveal";
import type { JourneyClosingData } from "@/types/trace";

interface JourneyClosingProps {
  readonly closing: JourneyClosingData;
}

export function JourneyClosing({ closing }: JourneyClosingProps) {
  return (
    <section
      className="journey-closing"
      data-trace-stage="journey-closing"
      id="journey-closing"
      aria-labelledby="journey-closing-title"
    >
      <div className="site-container journey-closing__inner">
        <TraceReveal>
          <p className="journey-closing__brand">{closing.brand}</p>
          <h2 className="journey-closing__heading" id="journey-closing-title">
            {closing.heading.map((line) => (
              <span key={line}>{line}{" "}</span>
            ))}
          </h2>

          <ol className="journey-closing__topics">
            {closing.topics.map((topic) => (
              <li key={topic.order}>
                <span>{String(topic.order).padStart(2, "0")}</span>
                <strong>{topic.title}</strong>
              </li>
            ))}
          </ol>

          <p className="journey-closing__statement">{closing.statement}</p>

          <nav
            className="journey-closing__actions"
            aria-label="Điều hướng kết thúc hành trình"
          >
            <Link
              className="journey-closing__restart"
              href={closing.primaryAction.href}
            >
              {closing.primaryAction.label}
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              aria-label={closing.secondaryAction.label}
              className="journey-closing__home"
              href={closing.secondaryAction.href}
            >
              ← {closing.secondaryAction.label}
            </Link>
          </nav>
        </TraceReveal>
      </div>
    </section>
  );
}
