import Link from "next/link";

import type { ThoughtCase } from "@/types/thought-case";

interface CaseReturnProps {
  readonly item: ThoughtCase;
  readonly relatedCases: readonly [ThoughtCase, ThoughtCase];
}

export function CaseReturn({ item, relatedCases }: CaseReturnProps) {
  return (
    <section
      aria-labelledby="case-return-heading"
      className="case-return"
      id="case-return"
    >
      <div className="site-container case-return__grid">
        <div className="case-return__intro">
          <p className="case-act-label">HỒI 6 / TRỞ LẠI HIỆN TẠI</p>
          <h2 id="case-return-heading">{item.returnHeading}</h2>
          <p>{item.returnSummary}</p>
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

        <div className="case-return__next">
          <div>
            <p>TIẾP TỤC LẦN THEO</p>
            <h3>Một tình huống khác có thể đổi góc nhìn của bạn.</h3>
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

        <div className="case-return__actions">
          <Link className="primary-action" href="/ho-so">
            <span>Mở hồ sơ khác</span>
            <span aria-hidden="true">→</span>
          </Link>
          <Link href={`/trace/${item.primaryTrace}`}>Đọc Trace đầy đủ</Link>
          <Link href="#case-evidence">Xem lại nguồn tư liệu</Link>
        </div>
      </div>
    </section>
  );
}
