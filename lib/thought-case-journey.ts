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

export interface CaseProgressMilestone {
  readonly id: string;
  readonly href: string;
  readonly label: string;
  readonly ariaLabel: string;
}

const LEGACY_CASE_PROGRESS_MILESTONES = [
  {
    id: "case-present",
    href: "#case-present",
    label: "Vấn đề",
    ariaLabel: "Hồi 1: Vấn đề hiện tại",
  },
  {
    id: "case-assumption",
    href: "#case-assumption",
    label: "Giả định",
    ariaLabel: "Hồi 2: Giả định ban đầu",
  },
  {
    id: "case-file",
    href: "#case-file",
    label: "Mở hồ sơ",
    ariaLabel: "Hồi 3: Mở hồ sơ lịch sử",
  },
  {
    id: "case-evidence",
    href: "#case-evidence",
    label: "Dấu vết",
    ariaLabel: "Hồi 4: Ba dấu vết lịch sử",
  },
  {
    id: "case-connection",
    href: "#case-connection",
    label: "Kết nối",
    ariaLabel: "Hồi 5: Kết nối tư tưởng",
  },
  {
    id: "case-return",
    href: "#case-return",
    label: "Trở lại",
    ariaLabel: "Hồi 6: Trở lại hiện tại",
  },
] as const satisfies readonly CaseProgressMilestone[];

const CASE_STAGE_COPY: Record<
  CaseJourneyStage,
  Pick<CaseJourneyStageItem, "label" | "ariaLabel">
> = {
  "hien-tai": {
    label: "Hiện tại",
    ariaLabel: "Bước 1: Hiện tại",
  },
  "dau-vet": {
    label: "Dấu vết",
    ariaLabel: "Bước 2: Dấu vết lịch sử",
  },
  "tro-lai": {
    label: "Trở lại",
    ariaLabel: "Bước 3: Trở lại hiện tại",
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
      previous: { href: "/ho-so", label: "Chọn hồ sơ khác" },
      next: {
        href: getCaseStageHref(slug, "dau-vet"),
        label: "Mở ba dấu vết",
      },
    };
  }

  if (stage === "dau-vet") {
    return {
      previous: {
        href: getCaseStageHref(slug, "hien-tai"),
        label: "Quay lại vấn đề",
      },
      next: {
        href: getCaseStageHref(slug, "tro-lai"),
        label: "Kết nối và trở lại",
      },
    };
  }

  return {
    previous: {
      href: getCaseStageHref(slug, "dau-vet"),
      label: "Xem lại dấu vết",
    },
    next: { href: "/ho-so", label: "Chọn hồ sơ tiếp theo" },
  };
}

export function getCaseProgressMilestones(): readonly CaseProgressMilestone[] {
  return LEGACY_CASE_PROGRESS_MILESTONES;
}
