import type { TraceSlug } from "@/types/trace";

export const CASE_CATEGORIES = [
  "study-teamwork",
  "leadership-responsibility",
  "conflicting-interests",
  "social-media",
  "human-development",
  "community-society",
] as const;

export type CaseCategory = (typeof CASE_CATEGORIES)[number];

export interface CaseEvidenceReference {
  readonly traceSlug: TraceSlug;
  readonly momentId: string;
}

export interface CaseReveal {
  readonly assumption: string;
  readonly finding: string;
  readonly reframe: string;
  readonly evidence: CaseEvidenceReference;
}

export interface PresentLens {
  readonly title: string;
  readonly summary: string;
}

export interface ThoughtCase {
  readonly slug: string;
  readonly category: CaseCategory;
  readonly title: string;
  readonly shortPrompt: string;
  readonly context: string;
  readonly openingQuestion: string;
  readonly primaryTrace: TraceSlug;
  readonly supportingTrace?: TraceSlug;
  readonly optionalPerspective?: readonly [string, string];
  readonly reveals: readonly [CaseReveal, CaseReveal, CaseReveal];
  readonly returnHeading: string;
  readonly returnSummary: string;
  readonly presentLenses: readonly [PresentLens, PresentLens, PresentLens];
  readonly relatedCaseSlugs: readonly [string, string];
  readonly featured?: boolean;
}

export interface ThoughtCasePreview {
  readonly slug: string;
  readonly category: CaseCategory;
  readonly title: string;
  readonly shortPrompt: string;
  readonly primaryTrace: TraceSlug;
}
