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
          <p className="case-act-label">BƯỚC 2 / XEM 3 MỐC LỊCH SỬ</p>
          <div className="case-file__sheet">
            <p>
              <span>HỒ SƠ LIÊN QUAN</span>
              <strong>{primaryTrace.title}</strong>
            </p>
            <h1 id="case-file-heading">Xem ba mốc lịch sử để nhìn lại vấn đề.</h1>
            <p>{primaryTrace.centralQuestion}</p>
            <p className="case-file__guide">
              Ba mốc nằm ngay bên dưới. Các nút nguồn và trang tư liệu đầy đủ
              chỉ để đọc sâu, không bắt buộc.
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Ba mốc lịch sử" className="case-evidence" id="case-evidence">
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
