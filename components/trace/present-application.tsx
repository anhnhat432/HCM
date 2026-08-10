import Link from "next/link";

import { TraceReveal } from "@/components/trace/reveal";
import type { TraceApplication } from "@/types/trace";

interface PresentApplicationProps {
  readonly application: TraceApplication;
  readonly continuationHref?: string;
  readonly continuationLabel?: string;
}

export function PresentApplication({
  application,
  continuationHref = "#next-trace",
  continuationLabel = "Tiếp tục hành trình",
}: PresentApplicationProps) {
  return (
    <section
      className="present-application"
      data-trace-stage="application"
      id="application"
      aria-labelledby="application-title"
    >
      <div className="site-container present-application__grid">
        <div className="present-application__content">
          <TraceReveal>
            <p className="trace-eyebrow">{application.eyebrow}</p>
            <h2 className="present-application__heading" id="application-title">
              {application.heading.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
            <p className="present-application__bridge">{application.bridge}</p>
          </TraceReveal>

          <div className="application-list">
            {application.items.map((item, index) => (
              <TraceReveal delay={index * 0.05} key={item.number}>
                <article className="application-item">
                  <span>{item.number}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>
                  </div>
                </article>
              </TraceReveal>
            ))}
          </div>

          <Link className="trace-sequence-link" href={continuationHref}>
            <span aria-hidden="true" />
            {continuationLabel}
            <b aria-hidden="true">→</b>
          </Link>
        </div>

        <div className="present-application__anchor" aria-hidden="true">
          <span />
          <b />
          <time>2026</time>
        </div>
      </div>
    </section>
  );
}
