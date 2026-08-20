import Link from "next/link";

import {
  getCaseStageNavigation,
  type CaseJourneyStage,
} from "@/lib/thought-case-journey";

interface CaseStageNavigationProps {
  readonly currentStage: CaseJourneyStage;
  readonly slug: string;
  readonly perspective?: string | null;
}

export function CaseStageNavigation({
  currentStage,
  slug,
  perspective,
}: CaseStageNavigationProps) {
  const navigation = getCaseStageNavigation(slug, currentStage, perspective);

  return (
    <nav aria-label="Điều hướng giữa các bước" className="case-stage-navigation">
      <div className="site-container case-stage-navigation__inner">
        <Link
          className="case-stage-navigation__link case-stage-navigation__link--previous"
          href={navigation.previous.href}
        >
          <span aria-hidden="true">←</span>
          <span>{navigation.previous.label}</span>
        </Link>
        <Link
          className="case-stage-navigation__link case-stage-navigation__link--next"
          href={navigation.next.href}
        >
          <span>{navigation.next.label}</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </nav>
  );
}
