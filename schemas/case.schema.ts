import { z } from "zod";
import { TraceSlugSchema } from "./trace.schema";

export const CaseCategorySchema = z.enum([
  "study-teamwork",
  "leadership-responsibility",
  "conflicting-interests",
  "social-media",
  "human-development",
  "community-society",
]);

export const CaseEvidenceReferenceSchema = z.object({
  traceSlug: TraceSlugSchema,
  momentId: z.string().min(1),
});

export const CaseRevealSchema = z.object({
  assumption: z.string().min(5),
  finding: z.string().min(5),
  reframe: z.string().min(5),
  evidence: CaseEvidenceReferenceSchema,
});

export const PresentLensSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(5),
});

export const ThoughtCaseSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  category: CaseCategorySchema,
  title: z.string().min(3),
  shortPrompt: z.string().min(10),
  context: z.string().min(20),
  openingQuestion: z.string().min(10),
  primaryTrace: TraceSlugSchema,
  supportingTrace: TraceSlugSchema.optional(),
  optionalPerspective: z.tuple([z.string(), z.string()]).optional(),
  reveals: z.tuple([
    CaseRevealSchema,
    CaseRevealSchema,
    CaseRevealSchema,
  ]),
  returnHeading: z.string().min(3),
  returnSummary: z.string().min(10),
  presentLenses: z.tuple([
    PresentLensSchema,
    PresentLensSchema,
    PresentLensSchema,
  ]),
  relatedCaseSlugs: z.tuple([z.string(), z.string()]),
  featured: z.boolean().optional(),
});

export type ThoughtCaseData = z.infer<typeof ThoughtCaseSchema>;
