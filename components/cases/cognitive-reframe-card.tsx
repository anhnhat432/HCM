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
    <div className="case-reframe-scene" id="khoanh-khac-chuyen-hoa">
      <div className="case-reframe-scene__preamble">
        <span className="case-reframe-scene__kicker">
          KHOẢNH KHẮC CHUYỂN HÓA GÓC NHÌN
        </span>
      </div>

      <div className="case-reframe-scene__flow">
        {/* 1. Before: Mental Starting Point */}
        <div className="case-reframe-scene__before">
          <span className="case-reframe-scene__label">
            {chosenPerspective ? "GÓC NHÌN BẠN CHỌN BAN ĐẦU" : "GIẢ ĐỊNH THƯỜNG THẤY LÚC BẮT ĐẦU"}
          </span>
          <blockquote className="case-reframe-scene__quote">
            “{beforeText}”
          </blockquote>
        </div>

        {/* 2. Central Epistemic Shift Axis */}
        <div className="case-reframe-scene__shift" aria-hidden="true">
          <div className="case-reframe-scene__shift-line" />
          <span className="case-reframe-scene__shift-badge">3 DẤU VẾT LỊCH SỬ</span>
          <div className="case-reframe-scene__shift-line" />
          <span className="case-reframe-scene__shift-arrow">↓</span>
        </div>

        {/* 3. After: The Signature Reframe Climax */}
        <div className="case-reframe-scene__after">
          <span className="case-reframe-scene__label case-reframe-scene__label--gold">
            SAU KHI ĐỐI THOẠI CÙNG LỊCH SỬ
          </span>
          <h2 className="case-reframe-scene__heading" id="case-reframe-title">
            {item.returnHeading}
          </h2>
          <div className="case-reframe-scene__gold-rule" aria-hidden="true" />
          <p className="case-reframe-scene__summary">
            {item.returnSummary}
          </p>
        </div>
      </div>
    </div>
  );
}
