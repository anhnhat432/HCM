import { z } from "zod";

export const VerificationStatusSchema = z.enum(["verified", "placeholder"]);

export const UsageStatusSchema = z.enum([
  "licensed",
  "approved",
  "needs-review",
  "not-applicable",
]);

export const ImageKindSchema = z.enum([
  "present",
  "historical-photo",
  "historical-place",
  "document",
  "artwork",
  "placeholder",
]);

export const SourceCitationSchema = z.object({
  title: z.string().min(1, "Source title is required"),
  url: z.string().url("Source URL must be a valid URL"),
});

export const AssetProvenanceSchema = z.object({
  src: z.string().optional(),
  alt: z.string().min(1, "Alt text is required for accessibility"),
  caption: z.string().optional(),
  credit: z.string().min(1, "Credit/attribution is required"),
  sourceUrl: z.string().url("Source URL must be valid").optional(),
  verificationStatus: VerificationStatusSchema,
  usageStatus: UsageStatusSchema,
  usageNote: z.string().optional(),
  license: z.string().optional(),
  kind: ImageKindSchema,
});

export type AssetProvenance = z.infer<typeof AssetProvenanceSchema>;
export type SourceCitation = z.infer<typeof SourceCitationSchema>;
