import Link from "next/link";
import type { ReactNode } from "react";

import { CaseStageNavigation } from "@/components/cases/case-stage-navigation";
import { CaseStageProgress } from "@/components/cases/case-stage-progress";
import type { CaseJourneyStage } from "@/lib/thought-case-journey";
import { getTraceBySlug } from "@/lib/trace-registry";
import { traceThemes } from "@/lib/trace-themes";
import type { ThoughtCase } from "@/types/thought-case";

interface CaseJourneyShellProps {
  readonly children: ReactNode;
  readonly item: ThoughtCase;
  readonly stage: CaseJourneyStage;
}

export function CaseJourneyShell({
  children,
  item,
  stage,
}: CaseJourneyShellProps) {
  const primaryTrace = getTraceBySlug(item.primaryTrace);

  if (!primaryTrace) {
    throw new Error(`Case ${item.slug} does not resolve its primary Trace`);
  }

  return (
    <div
      className={`case-experience case-experience--paged ${traceThemes[primaryTrace.theme]}`}
    >
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

      <CaseStageProgress currentStage={stage} slug={item.slug} />

      <main id="main-content">{children}</main>

      <CaseStageNavigation currentStage={stage} slug={item.slug} />
    </div>
  );
}
