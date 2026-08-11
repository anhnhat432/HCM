import { getTraceRecapContent } from "@/lib/trace-journey";
import type { CompleteTraceData } from "@/types/trace";

interface TraceRecapProps {
  readonly trace: CompleteTraceData;
}

export function TraceRecap({ trace }: TraceRecapProps) {
  const recap = getTraceRecapContent(trace);

  return (
    <section
      className="trace-recap"
      id="trace-recap"
      aria-labelledby="trace-recap-title"
    >
      <div className="site-container trace-recap__inner">
        <p className="trace-recap__eyebrow">Nhìn lại hành trình</p>
        <h2 className="trace-recap__heading" id="trace-recap-title">
          {recap.question}
        </h2>

        <div className="trace-recap__comparison">
          <article className="trace-recap__before">
            <h3>Trước hành trình</h3>
            <p>{recap.beforeSummary}</p>
          </article>

          <span className="trace-recap__transition" aria-hidden="true">
            →
          </span>

          <div className="trace-recap__after">
            <h3>Sau hành trình</h3>
            <ol>
              {recap.afterItems.map((item) => (
                <li key={item.number}>
                  <span>{item.number}</span>
                  <strong>{item.title}</strong>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
