import { thoughtCases } from "@/data/thought-cases";
import { getTraceBySlug } from "@/lib/trace-registry";
import type { CompleteTraceData, HistoricalMoment } from "@/types/trace";
import type {
  CaseEvidenceReference,
  ThoughtCase,
  ThoughtCasePreview,
} from "@/types/thought-case";

function isCompleteTrace(
  trace: ReturnType<typeof getTraceBySlug>,
): trace is CompleteTraceData {
  return Boolean(
    trace?.presentDay &&
      trace.centralQuestion &&
      trace.thoughtFormation &&
      trace.application,
  );
}

export function getThoughtCaseBySlug(slug: string): ThoughtCase | undefined {
  return thoughtCases.find((item) => item.slug === slug);
}

export function getCaseEvidence(reference: CaseEvidenceReference): {
  trace: CompleteTraceData;
  moment: HistoricalMoment;
} {
  const trace = getTraceBySlug(reference.traceSlug);

  if (!isCompleteTrace(trace)) {
    throw new Error(`Unknown or incomplete Trace: ${reference.traceSlug}`);
  }

  const moment = trace.historicalMoments.find(
    (candidate) => candidate.id === reference.momentId,
  );

  if (!moment) {
    throw new Error(
      `Unknown historical moment: ${reference.traceSlug}:${reference.momentId}`,
    );
  }

  return { trace, moment };
}

export function getCasePreviews(): readonly ThoughtCasePreview[] {
  return thoughtCases.map(
    ({ slug, category, title, shortPrompt, primaryTrace }) => ({
      slug,
      category,
      title,
      shortPrompt,
      primaryTrace,
    }),
  );
}

export function getRelatedCases(
  item: ThoughtCase,
): readonly [ThoughtCase, ThoughtCase] {
  const related = item.relatedCaseSlugs.map((slug) =>
    getThoughtCaseBySlug(slug),
  );

  if (!related[0] || !related[1]) {
    throw new Error(`Unknown related case for ${item.slug}`);
  }

  return [related[0], related[1]];
}
