import Link from "next/link";

import { TraceReveal } from "@/components/trace/reveal";
import type { TraceFormation } from "@/types/trace";

interface ThoughtFormationProps {
  readonly formation: TraceFormation;
}

export function ThoughtFormation({ formation }: ThoughtFormationProps) {
  return (
    <section
      className="thought-formation"
      data-trace-stage="thought-formation"
      id="thought-formation"
      aria-labelledby="thought-formation-title"
    >
      <div className="site-container thought-formation__inner">
        <TraceReveal>
          <h2 className="thought-formation__heading" id="thought-formation-title">
            {formation.heading.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
        </TraceReveal>

        <div className="thought-formation__convergence">
          <div className="thought-formation__line" aria-hidden="true">
            <span />
            <b>↓</b>
          </div>

          <div className="thought-formation__content">
            {formation.factors.map((factor, index) => (
              <TraceReveal delay={index * 0.06} key={factor.title}>
                <article className="formation-factor">
                  <h3>{factor.title}</h3>
                  <p>{factor.summary}</p>
                </article>
              </TraceReveal>
            ))}

            <TraceReveal delay={0.16}>
              <div className="thought-formation__conclusion">
                <p>Tư tưởng hình thành</p>
                <h3>
                  {formation.conclusion.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h3>
              </div>
            </TraceReveal>
          </div>
        </div>

        <Link className="trace-sequence-link" href="#return-2026">
          <span aria-hidden="true" />
          Trở lại hiện tại
          <b aria-hidden="true">→</b>
        </Link>
      </div>
    </section>
  );
}
