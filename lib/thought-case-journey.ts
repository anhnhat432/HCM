export interface CaseProgressMilestone {
  readonly id: string;
  readonly href: string;
  readonly label: string;
  readonly ariaLabel: string;
}

const CASE_PROGRESS_MILESTONES = [
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

export function getCaseProgressMilestones(): readonly CaseProgressMilestone[] {
  return CASE_PROGRESS_MILESTONES;
}
