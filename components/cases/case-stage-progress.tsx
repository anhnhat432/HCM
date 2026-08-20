import Link from "next/link";

import {
  getCaseJourneyStages,
  type CaseJourneyStage,
} from "@/lib/thought-case-journey";

interface CaseStageProgressProps {
  readonly currentStage: CaseJourneyStage;
  readonly slug: string;
  readonly perspective?: string | null;
}

export function CaseStageProgress({
  currentStage,
  slug,
  perspective,
}: CaseStageProgressProps) {
  const stages = getCaseJourneyStages(slug, perspective);
  const currentIndex = stages.findIndex((item) => item.id === currentStage);

  return (
    <nav aria-label="Tiến trình hồ sơ" className="case-stage-progress">
      <div className="site-container case-stage-progress__inner">
        <p className="case-stage-position">
          BƯỚC {currentIndex + 1} / {stages.length}
        </p>
        <ol>
          {stages.map((item, index) => (
            <li key={item.id}>
              <Link
                aria-current={item.id === currentStage ? "step" : undefined}
                aria-label={item.ariaLabel}
                className="case-stage-progress__link"
                href={item.href}
              >
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
