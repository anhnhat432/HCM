import Link from "next/link";

import { ShareableWisdomCard } from "@/components/cases/shareable-wisdom-card";
import { CASE_CATEGORY_LABELS } from "@/types/thought-case";
import type { ThoughtCase } from "@/types/thought-case";

interface CaseReturnProps {
  readonly evidenceHref: string;
  readonly item: ThoughtCase;
  readonly relatedCases: readonly [ThoughtCase, ThoughtCase];
}

export function CaseReturn({
  evidenceHref,
  item,
  relatedCases,
}: CaseReturnProps) {
  return (
    <section
      aria-labelledby="case-return-heading"
      className="case-return"
      id="case-return"
    >
      <div className="site-container case-return__grid">
        {/* 1. THREE ACTIONABLE LENSES */}
        <div className="case-return__intro">
          <p className="case-act-label">BA GỢI Ý CHO TÌNH HUỐNG NÀY</p>
          <h2 id="case-return-heading">BẠN CÓ THỂ THỬ GÌ NGÀY MAI?</h2>
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
