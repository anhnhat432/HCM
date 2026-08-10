export const TRACE_SLUGS = [
  "dai-doan-ket",
  "dao-duc-trach-nhiem",
  "con-nguoi",
] as const;

export type TraceSlug = (typeof TRACE_SLUGS)[number];
export type TraceOrder = 1 | 2 | 3;
export type TraceThemeKey = "unity" | "responsibility" | "humanity";

export interface TraceImage {
  readonly src: string;
  readonly alt: string;
  readonly caption?: string;
  readonly credit?: string;
}

export interface TraceSource {
  readonly title: string;
  readonly url: string;
}

export interface HistoricalMoment {
  readonly year: string;
  readonly title: string;
  readonly summary: string;
  readonly image?: TraceImage;
  readonly sources?: readonly TraceSource[];
}

export type HistoricalMoments = readonly [
  HistoricalMoment,
  HistoricalMoment,
  HistoricalMoment,
];

export interface TraceData {
  readonly slug: TraceSlug;
  readonly order: TraceOrder;
  readonly title: string;
  readonly shortTitle: string;
  readonly theme: TraceThemeKey;
  readonly cardSummary: string;
  readonly historicalMoments: HistoricalMoments;
}
