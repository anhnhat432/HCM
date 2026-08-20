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
        <p className="case-reframe-scene__lead">
          Sau khi đối thoại cùng 3 dấu mốc lịch sử, đây là sự dịch chuyển nhận thức cốt lõi:
        </p>
      </div>

      <div className="case-reframe-scene__stage">
        {/* Before: Mental Starting Point */}
        <div className="case-reframe-scene__pole case-reframe-scene__pole--before">
          <div className="case-reframe-scene__pole-header">
            <span className="case-reframe-scene__tag">
              {chosenPerspective ? "GÓC NHÌN BẠN CHỌN BAN ĐẦU" : "GIẢ ĐỊNH THƯỜNG THẤY LÚC BẮT ĐẦU"}
            </span>
          </div>
          <blockquote className="case-reframe-scene__before-text">
            “{beforeText}”
          </blockquote>
        </div>

        {/* The Epistemic Shift Axis */}
        <div className="case-reframe-scene__axis" aria-hidden="true">
          <div className="case-reframe-scene__axis-line" />
          <span className="case-reframe-scene__axis-badge">DỊCH CHUYỂN QUA 3 DẤU VẾT</span>
          <div className="case-reframe-scene__axis-line" />
          <span className="case-reframe-scene__axis-arrow">↓</span>
        </div>

        {/* After: The Reframe Awakening */}
        <div className="case-reframe-scene__pole case-reframe-scene__pole--after">
          <div className="case-reframe-scene__pole-header">
            <span className="case-reframe-scene__tag case-reframe-scene__tag--gold">
              NHẬN THỨC MỚI SAU LỊCH SỬ
            </span>
          </div>
          <h2 className="case-reframe-scene__heading" id="case-reframe-title">
            {item.returnHeading}
          </h2>
          <p className="case-reframe-scene__summary">
            {item.returnSummary}
          </p>
        </div>
      </div>
    </div>
  );
}
