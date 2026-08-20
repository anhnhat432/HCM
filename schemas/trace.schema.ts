import { z } from "zod";
import {
  AssetProvenanceSchema,
  SourceCitationSchema,
} from "./provenance.schema";

export const TraceSlugSchema = z.enum([
  "dai-doan-ket",
  "dao-duc-trach-nhiem",
  "con-nguoi",
]);

export const TraceOrderSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
]);

export const TraceThemeKeySchema = z.enum([
  "unity",
  "responsibility",
  "humanity",
]);

export const TraceImagePresentationSchema = z.object({
  fit: z.enum(["cover", "contain"]).optional(),
  aspectRatio: z.enum(["portrait", "landscape", "document"]).optional(),
  tone: z.enum(["natural", "archival", "soft-archival"]).optional(),
  objectPosition: z.string().optional(),
  background: z.enum(["paper", "neutral"]).optional(),
});

export const TraceImageSchema = AssetProvenanceSchema.extend({
  presentation: TraceImagePresentationSchema.optional(),
  isPlaceholder: z.boolean().optional(),
});

export const HistoricalMomentSchema = z.object({
  id: z.string().min(1),
  year: z.string().min(4),
  title: z.string().min(1),
  summary: z.string().min(10),
  metadata: z.string().optional(),
  verification: z.string().min(10),
  image: TraceImageSchema.optional(),
  sources: z.array(SourceCitationSchema).min(1),
});

export const TracePresentDaySchema = z.object({
  label: z.string().min(1),
  headline: z.array(z.string()).min(1),
  summary: z.string().min(10),
  image: TraceImageSchema.extend({
    src: z.string().min(1),
  }),
});

export const TraceFormationFactorSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(10),
});

export const TraceFormationSchema = z.object({
  heading: z.array(z.string()).min(1),
  factors: z.tuple([
    TraceFormationFactorSchema,
    TraceFormationFactorSchema,
    TraceFormationFactorSchema,
  ]),
  conclusion: z.array(z.string()).min(1),
  verification: z.string().optional(),
  sources: z.array(SourceCitationSchema).optional(),
});

export const TraceApplicationItemSchema = z.object({
  number: z.enum(["01", "02", "03"]),
  title: z.string().min(1),
  summary: z.string().min(10),
});

export const TraceApplicationSchema = z.object({
  eyebrow: z.string().min(1),
  heading: z.array(z.string()).min(1),
  bridge: z.string().min(1),
  items: z.tuple([
    TraceApplicationItemSchema,
    TraceApplicationItemSchema,
    TraceApplicationItemSchema,
  ]),
});

export const TraceDataSchema = z.object({
  slug: TraceSlugSchema,
  order: TraceOrderSchema,
  title: z.string().min(1),
  shortTitle: z.string().min(1),
  theme: TraceThemeKeySchema,
  cardSummary: z.string().min(10),
  historicalMoments: z.tuple([
    HistoricalMomentSchema,
    HistoricalMomentSchema,
    HistoricalMomentSchema,
  ]),
  presentDay: TracePresentDaySchema.optional(),
  centralQuestion: z.string().optional(),
  thoughtFormation: TraceFormationSchema.optional(),
  application: TraceApplicationSchema.optional(),
});

export const JourneyClosingTopicSchema = z.object({
  order: TraceOrderSchema,
  title: z.string().min(1),
  takeaway: z.string().min(10),
});

export const JourneyClosingActionSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const JourneyClosingDataSchema = z.object({
  brand: z.string().min(1),
  heading: z.array(z.string()).min(1),
  topics: z.tuple([
    JourneyClosingTopicSchema,
    JourneyClosingTopicSchema,
    JourneyClosingTopicSchema,
  ]),
  statement: z.string().min(10),
  primaryAction: JourneyClosingActionSchema,
  methodAction: JourneyClosingActionSchema,
  secondaryAction: JourneyClosingActionSchema,
});
