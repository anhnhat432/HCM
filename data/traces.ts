import type { HistoricalMoments, TraceData } from "@/types/trace";

const placeholderMoments: HistoricalMoments = [
  {
    year: "—",
    title: "Dấu mốc lịch sử 01",
    summary: "Nội dung sẽ được biên soạn và xác minh trong phase Trace.",
  },
  {
    year: "—",
    title: "Dấu mốc lịch sử 02",
    summary: "Nội dung sẽ được biên soạn và xác minh trong phase Trace.",
  },
  {
    year: "—",
    title: "Dấu mốc lịch sử 03",
    summary: "Nội dung sẽ được biên soạn và xác minh trong phase Trace.",
  },
];

export const traces = [
  {
    slug: "dai-doan-ket",
    order: 1,
    title: "Đại đoàn kết",
    shortTitle: "Đoàn kết",
    theme: "unity",
    cardSummary: "Khi những khác biệt cần tìm được một hướng chung.",
    historicalMoments: placeholderMoments,
  },
  {
    slug: "dao-duc-trach-nhiem",
    order: 2,
    title: "Đạo đức & trách nhiệm",
    shortTitle: "Trách nhiệm",
    theme: "responsibility",
    cardSummary: "Khi mỗi lựa chọn cá nhân đều tác động đến người khác.",
    historicalMoments: placeholderMoments,
  },
  {
    slug: "con-nguoi",
    order: 3,
    title: "Con người",
    shortTitle: "Con người",
    theme: "humanity",
    cardSummary: "Con người đứng ở đâu trong một xã hội đang thay đổi?",
    historicalMoments: placeholderMoments,
  },
] as const satisfies readonly TraceData[];
