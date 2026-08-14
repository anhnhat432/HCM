import Link from "next/link";

import { CaseEvidence } from "@/components/cases/case-evidence";
import { CaseProgress } from "@/components/cases/case-progress";
import { CaseReturn } from "@/components/cases/case-return";
import { ExperienceGuide } from "@/components/cases/experience-guide";
import { PerspectivePrompt } from "@/components/cases/perspective-prompt";
import {
  getCaseEvidence,
  getCaseFileNumber,
  getRelatedCases,
} from "@/lib/thought-case-registry";
import { traceThemes } from "@/lib/trace-themes";
import type { ThoughtCase } from "@/types/thought-case";

interface CaseFilePageProps {
  readonly item: ThoughtCase;
}

export function CaseFilePage({ item }: CaseFilePageProps) {
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

  const relatedCases = getRelatedCases(item);
  const fileNumber = getCaseFileNumber(item);

  return (
    <div className={`case-experience ${traceThemes[primaryTrace.theme]}`}>
      <header className="case-header">
        <div className="site-container case-header__inner">
          <Link className="case-header__brand" href="/">
            ĐUỐC HỒNG
          </Link>
          <Link className="case-header__library" href="/ho-so">
            30 HỒ SƠ <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </header>

      <CaseProgress />

      <main id="main-content">
        <section
          aria-labelledby="case-present-heading"
          className="case-present"
          id="case-present"
        >
          <div className="site-container case-present__grid">
            <div className="case-present__file-mark" aria-hidden="true">
              <span>HỒ SƠ</span>
              <strong>{fileNumber}</strong>
              <i />
            </div>
            <div className="case-present__copy">
              <p className="case-act-label">HỒI 1 / VẤN ĐỀ HIỆN TẠI</p>
              <h1 id="case-present-heading">{item.title}</h1>
              <p className="case-present__context">{item.context}</p>
              <blockquote>{item.openingQuestion}</blockquote>
              <a className="case-scroll-cue" href="#case-assumption">
                Cuộn để mở hồ sơ <span aria-hidden="true">↓</span>
              </a>
            </div>
            <ExperienceGuide />
          </div>
        </section>

        <section
          aria-labelledby="case-assumption-heading"
          className="case-assumption"
          id="case-assumption"
        >
          <div className="site-container case-assumption__grid">
            <p className="case-act-label">HỒI 2 / GIẢ ĐỊNH BAN ĐẦU</p>
            <div>
              <h2 id="case-assumption-heading">Cách nhìn đầu tiên thường rất nhanh.</h2>
              <p className="case-assumption__statement">
                {item.reveals[0].assumption}
              </p>
              {item.optionalPerspective ? (
                <PerspectivePrompt perspectives={item.optionalPerspective} />
              ) : null}
            </div>
          </div>
        </section>

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
              <h2 id="case-file-heading">Một câu hỏi hôm nay có thể mang dấu vết của nhiều thời điểm.</h2>
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
            <h2 id="case-evidence-heading">Không tìm một đáp án sẵn. Tìm cách câu hỏi đã được đặt lại.</h2>
            <p>Cuộn để mở từng dấu vết. Nguồn và kiểm chứng luôn ở cạnh nội dung.</p>
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

        <section
          aria-labelledby="case-connection-heading"
          className="case-connection"
          id="case-connection"
        >
          <div className="site-container case-connection__grid">
            <p className="case-act-label">HỒI 5 / KẾT NỐI TƯ TƯỞNG</p>
            <div>
              <h2 id="case-connection-heading">
                Ba dấu vết gặp nhau trong một cách nhìn.
              </h2>
              <ol>
                {primaryTrace.thoughtFormation.factors.map((factor) => (
                  <li key={factor.title}>
                    <h3>{factor.title}</h3>
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

        <CaseReturn item={item} relatedCases={relatedCases} />
      </main>
    </div>
  );
}
