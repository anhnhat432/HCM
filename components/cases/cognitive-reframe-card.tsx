import type { ThoughtCase } from "@/types/thought-case";

interface CognitiveReframeCardProps {
  readonly item: ThoughtCase;
  readonly perspective?: string | null;
}

export function CognitiveReframeCard({
  item,
  perspective,
}: CognitiveReframeCardProps) {
  const perspectiveIdx =
    perspective !== null && perspective !== undefined
      ? Number.parseInt(perspective, 10)
      : null;

  const chosenPerspective =
    perspectiveIdx !== null &&
    !Number.isNaN(perspectiveIdx) &&
    item.optionalPerspective &&
    item.optionalPerspective[perspectiveIdx]
      ? item.optionalPerspective[perspectiveIdx]
      : null;

  const beforeText = chosenPerspective || item.reveals[0].assumption;

  return (
    <div className="case-reframe-card" id="khoanh-khac-chuyen-hoa">
      <div className="case-reframe-card__header">
        <span className="case-reframe-card__badge">
          <span aria-hidden="true">🔥</span> KHOẢNH KHẮC CHUYỂN HÓA GÓC NHÌN
        </span>
        <p className="case-reframe-card__intro">
          Sau khi đi qua 3 dấu mốc lịch sử, đây là sự dịch chuyển nhận thức cốt lõi cho tình huống này:
        </p>
      </div>

      <div className="case-reframe-card__comparison">
        {/* Before */}
        <div className="case-reframe-card__side case-reframe-card__side--before">
          <span className="case-reframe-card__side-label">
            {chosenPerspective ? "GÓC NHÌN BẠN CHỌN BAN ĐẦU" : "LÚC BẮT ĐẦU (GIẢ ĐỊNH THƯỜNG GẶP)"}
          </span>
          <blockquote className="case-reframe-card__quote">
            “{beforeText}”
          </blockquote>
        </div>

        {/* Shift Indicator */}
        <div className="case-reframe-card__arrow-col" aria-hidden="true">
          <span className="case-reframe-card__arrow-circle">↓</span>
        </div>

        {/* After */}
        <div className="case-reframe-card__side case-reframe-card__side--after">
          <span className="case-reframe-card__side-label">
            SAU 3 DẤU VẾT LỊCH SỬ (TƯ DUY MỚI)
          </span>
          <h2 className="case-reframe-card__reframe-title" id="case-reframe-title">
            {item.returnHeading}
          </h2>
          <p className="case-reframe-card__reframe-desc">
            {item.returnSummary}
          </p>
        </div>
      </div>
    </div>
  );
}
