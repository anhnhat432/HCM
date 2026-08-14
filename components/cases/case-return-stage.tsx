import { CaseReturn } from "@/components/cases/case-return";
import { getCaseStageHref } from "@/lib/thought-case-journey";
import {
  getCaseEvidence,
  getRelatedCases,
} from "@/lib/thought-case-registry";
import type { ThoughtCase } from "@/types/thought-case";

interface CaseReturnStageProps {
  readonly item: ThoughtCase;
}

export function CaseReturnStage({ item }: CaseReturnStageProps) {
  const primaryTrace = item.reveals
    .map((reveal) => getCaseEvidence(reveal.evidence).trace)
    .find((trace) => trace.slug === item.primaryTrace);

  if (!primaryTrace) {
    throw new Error(`Case ${item.slug} does not resolve its primary Trace`);
  }

  const relatedCases = getRelatedCases(item);

  return (
    <>
      <section
        aria-labelledby="case-connection-heading"
        className="case-connection"
        id="case-connection"
      >
        <div className="site-container case-connection__grid">
          <p className="case-act-label">HỒI 5 / KẾT NỐI TƯ TƯỞNG</p>
          <div>
            <h1 id="case-connection-heading">
              Ba dấu vết gặp nhau trong một cách nhìn.
            </h1>
            <ol>
              {primaryTrace.thoughtFormation.factors.map((factor) => (
                <li key={factor.title}>
                  <h2>{factor.title}</h2>
                  <p>{factor.summary}</p>
                </li>
              ))}
            </ol>
            <p className="case-connection__conclusion">
              {primaryTrace.thoughtFormation.conclusion.map((line) => (
                <span key={line}>{line} </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      <CaseReturn
        evidenceHref={getCaseStageHref(item.slug, "dau-vet")}
        item={item}
        relatedCases={relatedCases}
      />
    </>
  );
}
