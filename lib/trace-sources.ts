import type {
  HistoricalMoment,
  TraceImageUsageStatus,
  TraceSource,
} from "@/types/trace";

export interface SourceDrawerImageDetails {
  readonly caption?: string;
  readonly credit: string;
  readonly sourceUrl?: string;
  readonly license?: string;
  readonly usageStatus: TraceImageUsageStatus;
}

export interface SourceDrawerDetails {
  readonly title: string;
  readonly year: string;
  readonly verification: string;
  readonly sources: readonly TraceSource[];
  readonly image?: SourceDrawerImageDetails;
}

export function getSourceDrawerDetails(
  moment: HistoricalMoment,
): SourceDrawerDetails {
  const image = moment.image;

  return {
    title: moment.title,
    year: moment.year,
    verification: moment.verification,
    sources: moment.sources,
    image: image
      ? {
          caption: image.caption,
          credit: image.credit,
          sourceUrl: image.sourceUrl,
          license: image.license,
          usageStatus: image.usageStatus,
        }
      : undefined,
  };
}
