import { CaseReturn } from "@/components/cases/case-return";
import { CognitiveReframeCard } from "@/components/cases/cognitive-reframe-card";
import { getCaseStageHref } from "@/lib/thought-case-journey";
import {
  getCaseEvidence,
  getRelatedCases,
} from "@/lib/thought-case-registry";
import type { ThoughtCase } from "@/types/thought-case";

interface CaseReturnStageProps {
  readonly item: ThoughtCase;
  readonly perspective?: string | null;
}

export function CaseReturnStage({ item, perspective }: CaseReturnStageProps) {
  const primaryTrace = item.reveals
    .map((reveal) => getCaseEvidence(reveal.evidence).trace)
    .find((trace) => trace.slug === item.primaryTrace);

  if (!primaryTrace) {
    throw new Error(`Case ${item.slug} does not resolve its primary Trace`);
  }

  const relatedCases = getRelatedCases(item);

  return (
    <>
      {/* 1. PAYOFF MOMENT: COGNITIVE REFRAME CARD RIGHT AT THE TOP */}
      <section
        aria-labelledby="case-reframe-title"
        className="case-reframe-section"
      >
        <div className="site-container">
          <p className="case-act-label">BƯỚC 3 / NHẬN GỢI Ý ÁP DỤNG</p>
          <CognitiveReframeCard item={item} perspective={perspective} />
        </div>
      </section>

      {/* 2. EXPLANATION: THOUGHT FORMATION FACTORS & CONCLUSION */}
      <section
        aria-labelledby="case-connection-heading"
        className="case-connection"
        id="case-connection"
      >
        <div className="site-container case-connection__grid">
          <p className="case-act-label">VÌ SAO CÓ SỰ CHUYỂN DỊCH NÀY?</p>
          <div>
            <h1 id="case-connection-heading">
              Từ ba mốc lịch sử đến một cách xử lý hôm nay.
            </h1>
            <ol>
              {primaryTrace.thoughtFormation.factors.map((factor, index) => (
                <li key={factor.title}>
                  <span
                    aria-hidden="true"
                    className="case-connection__timestamp"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2>{factor.title}</h2>
                  <p>{factor.summary}</p>
                </li>
              ))}
            </ol>
            <div className="case-connection__conclusion">
              <span className="case-connection__conclusion-label">
                GÓC NHÌN KẾT NỐI
              </span>
              <p>
                {primaryTrace.thoughtFormation.conclusion.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
            </div>
            <a className="case-connection__continue" href="#case-return">
              Xem ba gợi ý áp dụng <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. ACTIONABLE STEPS: THREE LENSES, WISDOM CARD & NEXT CASES */}
      <CaseReturn
        evidenceHref={getCaseStageHref(item.slug, "dau-vet", perspective)}
        item={item}
        relatedCases={relatedCases}
      />
    </>
  );
}
