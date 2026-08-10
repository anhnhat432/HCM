export const TRACE_SLUGS = [
  "dai-doan-ket",
  "dao-duc-trach-nhiem",
  "con-nguoi",
] as const;

export type TraceSlug = (typeof TRACE_SLUGS)[number];
export type TraceOrder = 1 | 2 | 3;
export type TraceThemeKey = "unity" | "responsibility" | "humanity";
export type TraceImageVerificationStatus = "verified" | "placeholder";
export type TraceImageUsageStatus =
  | "licensed"
  | "needs-review"
  | "not-applicable";

export interface TraceImage {
  readonly src?: string;
  readonly alt: string;
  readonly caption?: string;
  readonly credit: string;
  readonly sourceUrl?: string;
  readonly verificationStatus: TraceImageVerificationStatus;
  readonly usageStatus: TraceImageUsageStatus;
  readonly license?: string;
  readonly objectPosition?: string;
  readonly isPlaceholder?: boolean;
}

export interface TraceSource {
  readonly title: string;
  readonly url: string;
}

export interface HistoricalMoment {
  readonly id: string;
  readonly year: string;
  readonly title: string;
  readonly summary: string;
  readonly metadata?: string;
  readonly verification: string;
  readonly image?: TraceImage;
  readonly sources: readonly [TraceSource, ...TraceSource[]];
}

export type HistoricalMoments = readonly [
  HistoricalMoment,
  HistoricalMoment,
  HistoricalMoment,
];

export interface TracePresentDay {
  readonly label: string;
  readonly headline: readonly string[];
  readonly summary: string;
  readonly image: TraceImage & { readonly src: string };
}

export interface TraceFormationFactor {
  readonly title: string;
  readonly summary: string;
}

export interface TraceFormation {
  readonly heading: readonly string[];
  readonly factors: readonly [
    TraceFormationFactor,
    TraceFormationFactor,
    TraceFormationFactor,
  ];
  readonly conclusion: readonly string[];
  readonly verification?: string;
  readonly sources?: readonly [TraceSource, ...TraceSource[]];
}

export interface TraceApplicationItem {
  readonly number: "01" | "02" | "03";
  readonly title: string;
  readonly summary: string;
}

export interface TraceApplication {
  readonly eyebrow: string;
  readonly heading: readonly string[];
  readonly bridge: string;
  readonly items: readonly [
    TraceApplicationItem,
    TraceApplicationItem,
    TraceApplicationItem,
  ];
}

export interface JourneyClosingTopic {
  readonly order: TraceOrder;
  readonly title: string;
}

export interface JourneyClosingAction {
  readonly label: string;
  readonly href: string;
}

export interface JourneyClosingData {
  readonly brand: string;
  readonly heading: readonly string[];
  readonly topics: readonly [
    JourneyClosingTopic,
    JourneyClosingTopic,
    JourneyClosingTopic,
  ];
  readonly statement: string;
  readonly primaryAction: JourneyClosingAction;
  readonly secondaryAction: JourneyClosingAction;
}

export interface TraceData {
  readonly slug: TraceSlug;
  readonly order: TraceOrder;
  readonly title: string;
  readonly shortTitle: string;
  readonly theme: TraceThemeKey;
  readonly cardSummary: string;
  readonly historicalMoments: HistoricalMoments;
  readonly presentDay?: TracePresentDay;
  readonly centralQuestion?: string;
  readonly thoughtFormation?: TraceFormation;
  readonly application?: TraceApplication;
}

export type CompleteTraceData = TraceData & {
  readonly presentDay: TracePresentDay;
  readonly centralQuestion: string;
  readonly thoughtFormation: TraceFormation;
  readonly application: TraceApplication;
};
