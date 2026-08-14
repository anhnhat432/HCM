import { CaseEvidence } from "@/components/cases/case-evidence";
import { getCaseEvidence } from "@/lib/thought-case-registry";
import type { ThoughtCase } from "@/types/thought-case";

interface CaseEvidenceStageProps {
  readonly item: ThoughtCase;
}

export function CaseEvidenceStage({ item }: CaseEvidenceStageProps) {
  const resolvedEvidence = item.reveals.map((reveal) => ({
    reveal,
    ...getCaseEvidence(reveal.evidence),
  }));
  const primaryTrace = resolvedEvidence.find(
    ({ trace }) => trace.slug === item.primaryTrace,
  )?.trace;

  if (!primaryTrace) {
    throw new Error(`Case ${item.slug} does not resolve its primary Trace`);
  }

  return (
    <>
      <section
        aria-labelledby="case-file-heading"
        className="case-file"
        id="case-file"
      >
        <div className="site-container case-file__grid">
          <p className="case-act-label">HỒI 3 / MỞ HỒ SƠ</p>
          <div className="case-file__sheet">
            <p>
              <span>HỒ SƠ LIÊN QUAN</span>
              <strong>{primaryTrace.title}</strong>
            </p>
            <h1 id="case-file-heading">
              Một câu hỏi hôm nay có thể mang dấu vết của nhiều thời điểm.
            </h1>
            <p>{primaryTrace.centralQuestion}</p>
            <div className="case-file__first-record">
              <time dateTime={resolvedEvidence[0].moment.year}>
                {resolvedEvidence[0].moment.year}
              </time>
              <span>{resolvedEvidence[0].moment.title}</span>
            </div>
            <a href="#case-reveal-1">
              Mở dấu vết đầu tiên <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="case-evidence-heading"
        className="case-evidence"
        id="case-evidence"
      >
        <div className="site-container case-evidence__heading">
          <p className="case-act-label">HỒI 4 / BA DẤU VẾT LỊCH SỬ</p>
          <h2 id="case-evidence-heading">
            Không tìm một đáp án sẵn. Tìm cách câu hỏi đã được đặt lại.
          </h2>
          <p>
            Ba dấu vết được mở sẵn. Nguồn và kiểm chứng luôn ở cạnh nội dung.
          </p>
        </div>

        {resolvedEvidence.map(({ moment, reveal, trace }, index) => (
          <CaseEvidence
            index={index as 0 | 1 | 2}
            key={`${trace.slug}:${moment.id}`}
            moment={moment}
            reveal={reveal}
            trace={trace}
          />
        ))}
      </section>
    </>
  );
}
