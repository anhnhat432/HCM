import type { JourneyClosingData } from "@/types/trace";

export const journeyClosing = {
  brand: "ĐUỐC HỒNG",
  heading: [
    "Ba câu hỏi của hôm nay.",
    "Ba hành trình nhìn lại quá khứ.",
  ],
  topics: [
    {
      order: 1,
      title: "Đại đoàn kết",
      takeaway:
        "Khác biệt có thể cùng hướng khi được quy tụ bởi một mục tiêu chung.",
    },
    {
      order: 2,
      title: "Đạo đức & trách nhiệm",
      takeaway:
        "Lựa chọn đúng bắt đầu từ tự rèn mình và trách nhiệm với lợi ích chung.",
    },
    {
      order: 3,
      title: "Con người",
      takeaway:
        "Phát triển có ý nghĩa khi con người được tôn trọng và có cơ hội trưởng thành.",
    },
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
