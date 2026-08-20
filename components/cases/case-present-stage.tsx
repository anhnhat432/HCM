import { ExperienceGuide } from "@/components/cases/experience-guide";
import { PerspectivePrompt } from "@/components/cases/perspective-prompt";
import { getCaseFileNumber } from "@/lib/thought-case-registry";
import type { ThoughtCase } from "@/types/thought-case";

interface CasePresentStageProps {
  readonly item: ThoughtCase;
  readonly perspective?: string | null;
}

export function CasePresentStage({ item, perspective }: CasePresentStageProps) {
  const fileNumber = getCaseFileNumber(item);

  return (
    <>
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
            <p className="case-act-label">BƯỚC 1 / ĐỌC VẤN ĐỀ</p>
            <h1 id="case-present-heading">{item.title}</h1>
            <p className="case-present__context">{item.context}</p>
            <blockquote>{item.openingQuestion}</blockquote>
            <ExperienceGuide />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="case-assumption-heading"
        className="case-assumption"
        id="case-assumption"
      >
        <div className="site-container case-assumption__grid">
          <p className="case-act-label">GÓC NHÌN BAN ĐẦU (TÙY CHỌN)</p>
          <div>
            <h2 id="case-assumption-heading">
              Cách nhìn đầu tiên thường rất nhanh.
            </h2>
            <p className="case-assumption__statement">
              {item.reveals[0].assumption}
            </p>
            {item.optionalPerspective ? (
              <PerspectivePrompt
                initialPerspective={perspective}
                perspectives={item.optionalPerspective}
                slug={item.slug}
              />
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
