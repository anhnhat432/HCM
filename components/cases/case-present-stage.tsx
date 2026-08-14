import Link from "next/link";

import { ExperienceGuide } from "@/components/cases/experience-guide";
import { PerspectivePrompt } from "@/components/cases/perspective-prompt";
import { getCaseStageHref } from "@/lib/thought-case-journey";
import { getCaseFileNumber } from "@/lib/thought-case-registry";
import type { ThoughtCase } from "@/types/thought-case";

interface CasePresentStageProps {
  readonly item: ThoughtCase;
}

export function CasePresentStage({ item }: CasePresentStageProps) {
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
            <p className="case-act-label">HỒI 1 / VẤN ĐỀ HIỆN TẠI</p>
            <h1 id="case-present-heading">{item.title}</h1>
            <p className="case-present__context">{item.context}</p>
            <blockquote>{item.openingQuestion}</blockquote>
            <Link
              className="case-scroll-cue"
              href={getCaseStageHref(item.slug, "dau-vet")}
            >
              Mở ba dấu vết <span aria-hidden="true">→</span>
            </Link>
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
            <h2 id="case-assumption-heading">
              Cách nhìn đầu tiên thường rất nhanh.
            </h2>
            <p className="case-assumption__statement">
              {item.reveals[0].assumption}
            </p>
            {item.optionalPerspective ? (
              <PerspectivePrompt perspectives={item.optionalPerspective} />
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
