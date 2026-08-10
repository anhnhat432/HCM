import type { JourneyClosingData } from "@/types/trace";

export const journeyClosing = {
  brand: "ĐUỐC HỒNG",
  heading: [
    "Ba câu hỏi của hôm nay.",
    "Ba hành trình nhìn lại quá khứ.",
  ],
  topics: [
    { order: 1, title: "Đại đoàn kết" },
    { order: 2, title: "Đạo đức & trách nhiệm" },
    { order: 3, title: "Con người" },
  ],
  statement:
    "Nhìn lại lịch sử không phải để tìm một câu trả lời có sẵn. Giá trị của tư tưởng nằm ở cách mỗi thế hệ hiểu và vận dụng trong hiện tại.",
  primaryAction: {
    label: "Bắt đầu lại",
    href: "/trace/dai-doan-ket",
  },
  secondaryAction: {
    label: "Về trang chủ",
    href: "/",
  },
} as const satisfies JourneyClosingData;
