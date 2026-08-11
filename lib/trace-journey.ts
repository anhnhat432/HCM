import type { CompleteTraceData, HistoricalMoments } from "@/types/trace";

export interface TraceProgressMilestone {
  readonly id: string;
  readonly href: `#${string}`;
  readonly label: string;
  readonly ariaLabel: string;
}

export function getTraceProgressMilestones(
  moments: HistoricalMoments,
): readonly TraceProgressMilestone[] {
  return [
    {
      id: "trace-opening",
      href: "#trace-opening",
      label: "2026",
      ariaLabel: "Điểm bắt đầu năm 2026",
    },
    ...moments.map((moment, index) => ({
      id: `moment-${moment.year}`,
      href: `#moment-${moment.year}` as const,
      label: moment.year,
      ariaLabel: `Dấu mốc lịch sử ${index + 1}, năm ${moment.year}`,
    })),
    {
      id: "application",
      href: "#application",
      label: "2026",
      ariaLabel: "Trở lại hiện tại năm 2026",
    },
  ];
}

export function getTraceRecapContent(trace: CompleteTraceData) {
  return {
    question: trace.centralQuestion,
    beforeSummary: trace.presentDay.summary,
    afterItems: trace.application.items.map(({ number, title }) => ({
      number,
      title,
    })),
  } as const;
}
