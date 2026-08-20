import Link from "next/link";

import { ShareableWisdomCard } from "@/components/cases/shareable-wisdom-card";
import { CASE_CATEGORY_LABELS } from "@/types/thought-case";
import type { ThoughtCase } from "@/types/thought-case";

interface CaseReturnProps {
  readonly evidenceHref: string;
  readonly item: ThoughtCase;
  readonly relatedCases: readonly [ThoughtCase, ThoughtCase];
  readonly perspective?: string | null;
}

export function CaseReturn({
  evidenceHref,
  item,
  relatedCases,
  perspective,
}: CaseReturnProps) {
  const perspectiveIdx = perspective !== null && perspective !== undefined
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
    <section
      aria-labelledby="case-return-heading"
      className="case-return"
      id="case-return"
    >
      <div className="site-container case-return__grid">
        {/* 1. SIGNATURE MOMENT: COGNITIVE REFRAME CARD */}
        <div className="case-reframe-card">
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
              <h2 className="case-reframe-card__reframe-title" id="case-return-heading">
                {item.returnHeading}
              </h2>
              <p className="case-reframe-card__reframe-desc">
                {item.returnSummary}
              </p>
            </div>
          </div>
        </div>

        {/* 2. THREE ACTIONABLE LENSES */}
        <div className="case-return__intro">
          <p className="case-act-label">BA GỢI Ý CHO TÌNH HUỐNG NÀY</p>
          <h3>BẠN CÓ THỂ THỬ GÌ NGÀY MAI?</h3>
          <p>Chuyển hóa nhận thức thành các bước phối hợp và thực hành cụ thể.</p>
        </div>

        <ol className="case-return__lenses">
          {item.presentLenses.map((lens, index) => (
            <li key={lens.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{lens.title}</h3>
              <p>{lens.summary}</p>
            </li>
          ))}
        </ol>

        {/* 3. SHAREABLE REFRAME & WISDOM CARD */}
        <ShareableWisdomCard
          caseSlug={item.slug}
          categoryLabel={CASE_CATEGORY_LABELS[item.category]}
          reframeHeading={item.returnHeading}
          reframeQuote={item.returnSummary}
          title={item.title}
          wisdomLines={item.presentLenses.map((lens) => lens.title)}
        />

        {/* 4. NEXT CASES */}
        <div className="case-return__next">
          <div>
            <p>NẾU MUỐN TIẾP TỤC</p>
            <h3>Chọn một tình huống khác.</h3>
          </div>
          <ol>
            {relatedCases.map((related) => (
              <li key={related.slug}>
                <Link href={`/ho-so/${related.slug}`}>
                  <span>{related.title}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        {/* 5. DEEP DIVE LINKS */}
        <div className="case-return__actions">
          <Link className="primary-action" href="/ho-so">
            <span>Xem tất cả tình huống</span>
            <span aria-hidden="true">→</span>
          </Link>
          <div className="case-return__deep-links">
            <p>Đọc sâu (tùy chọn)</p>
            <Link href={`/trace/${item.primaryTrace}`}>Xem tư liệu đầy đủ</Link>
            <Link href={evidenceHref}>Kiểm tra nguồn lịch sử</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
