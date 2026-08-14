export const CASE_JOURNEY_STAGES = [
  "hien-tai",
  "dau-vet",
  "tro-lai",
] as const;

export type CaseJourneyStage = (typeof CASE_JOURNEY_STAGES)[number];

export interface CaseJourneyStageItem {
  readonly id: CaseJourneyStage;
  readonly href: string;
  readonly label: string;
  readonly ariaLabel: string;
}

export interface CaseStageAction {
  readonly href: string;
  readonly label: string;
}

export interface CaseStageNavigation {
  readonly previous: CaseStageAction;
  readonly next: CaseStageAction;
}

const CASE_STAGE_COPY: Record<
  CaseJourneyStage,
  Pick<CaseJourneyStageItem, "label" | "ariaLabel">
> = {
  "hien-tai": {
    label: "Đọc vấn đề",
    ariaLabel: "Bước 1: Đọc vấn đề hiện tại",
  },
  "dau-vet": {
    label: "Xem 3 mốc",
    ariaLabel: "Bước 2: Xem ba mốc lịch sử",
  },
  "tro-lai": {
    label: "Nhận gợi ý",
    ariaLabel: "Bước 3: Nhận gợi ý áp dụng",
  },
};

export function getCaseStageHref(
  slug: string,
  stage: CaseJourneyStage,
): string {
  const baseHref = `/ho-so/${slug}`;
  return stage === "hien-tai" ? baseHref : `${baseHref}/${stage}`;
}

export function getCaseJourneyStages(
  slug: string,
): readonly CaseJourneyStageItem[] {
  return CASE_JOURNEY_STAGES.map((stage) => ({
    id: stage,
    href: getCaseStageHref(slug, stage),
    ...CASE_STAGE_COPY[stage],
  }));
}

export function getCaseStageNavigation(
  slug: string,
  stage: CaseJourneyStage,
): CaseStageNavigation {
  if (stage === "hien-tai") {
    return {
      previous: { href: "/ho-so", label: "Chọn tình huống khác" },
      next: {
        href: getCaseStageHref(slug, "dau-vet"),
        label: "Xem 3 mốc lịch sử",
      },
    };
  }

  if (stage === "dau-vet") {
    return {
      previous: {
        href: getCaseStageHref(slug, "hien-tai"),
        label: "Đọc lại vấn đề",
      },
      next: {
        href: getCaseStageHref(slug, "tro-lai"),
        label: "Nhận gợi ý áp dụng",
      },
    };
  }

  return {
    previous: {
      href: getCaseStageHref(slug, "dau-vet"),
      label: "Xem lại 3 mốc",
    },
    next: { href: "/ho-so", label: "Chọn tình huống khác" },
  };
}
