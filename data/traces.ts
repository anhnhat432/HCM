import type { HistoricalMoments, TraceData } from "@/types/trace";

const placeholderMoments: HistoricalMoments = [
  {
    id: "placeholder-01",
    year: "—",
    title: "Dấu mốc lịch sử 01",
    summary: "Nội dung sẽ được biên soạn và xác minh trong phase Trace.",
  },
  {
    id: "placeholder-02",
    year: "—",
    title: "Dấu mốc lịch sử 02",
    summary: "Nội dung sẽ được biên soạn và xác minh trong phase Trace.",
  },
  {
    id: "placeholder-03",
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
    presentDay: {
      label: "2026 — Điểm xuất phát",
      headline: ["Khi khác biệt", "biến thành", "khoảng cách."],
      summary:
        "Một nhóm sinh viên cùng làm việc hướng đến một dự án chung, nhưng sự khác biệt trong mức độ tham gia, quan điểm và trách nhiệm dần trở thành xung đột.",
      image: {
        src: "/images/traces/dai-doan-ket/present-day.jpg",
        alt: "Nhóm sinh viên cùng làm việc nhưng có sự khác biệt trong mức độ tham gia",
        caption: "Cùng mục tiêu, khác hướng đi",
        credit: "Unsplash reference from Figma Make",
      },
    },
    centralQuestion: "Điều gì có thể giữ một tập thể cùng hướng?",
    historicalMoments: [
      {
        id: "dang-cong-san-viet-nam",
        year: "1930",
        title: "Đảng Cộng sản Việt Nam",
        summary:
          "Ngày 3 tháng 2, tại Hương Cảng, Nguyễn Ái Quốc hợp nhất ba tổ chức cộng sản riêng lẻ thành một đảng thống nhất. Bài học đầu tiên của đại đoàn kết: sức mạnh chỉ đến khi nhiều lực lượng cùng chung một ý chí.",
        metadata: "Hương Cảng — 3 tháng 2, 1930",
        image: {
          src: "/images/traces/dai-doan-ket/1930-placeholder.jpg",
          alt: "Bản đồ lưu trữ gợi bối cảnh Hương Cảng năm 1930",
          caption: "Hình bối cảnh tham chiếu — chờ bổ sung tư liệu xác thực",
          credit: "TODO: 1930 archival asset needs verification",
          isPlaceholder: true,
        },
      },
      {
        id: "viet-minh",
        year: "1941",
        title: "Việt Minh",
        summary:
          "Từ căn cứ địa Pắc Bó, Hồ Chí Minh thành lập Mặt trận Việt Minh — liên minh vượt qua ranh giới giai cấp, tôn giáo và vùng miền để hướng đến mục tiêu độc lập chung. Tư tưởng đại đoàn kết lần đầu được thể chế hóa.",
        metadata: "Pắc Bó, Cao Bằng — 1941",
        image: {
          src: "/images/traces/dai-doan-ket/1941-placeholder.jpg",
          alt: "Cảnh quan rừng núi gợi bối cảnh căn cứ địa Pắc Bó",
          caption: "Hình bối cảnh tham chiếu — chờ bổ sung tư liệu xác thực",
          credit: "TODO: 1941 archival asset needs verification",
          isPlaceholder: true,
        },
      },
      {
        id: "tuyen-ngon-doc-lap",
        year: "1945",
        title: "Tuyên ngôn Độc lập",
        summary:
          "Ngày 2 tháng 9, trước hàng trăm nghìn người tại Quảng trường Ba Đình, Hồ Chí Minh tuyên bố nền độc lập. Tuyên ngôn là kết tinh: đoàn kết không phải phương tiện — mà là điều kiện tiên quyết của tự do.",
        metadata: "Quảng trường Ba Đình, Hà Nội — 2 tháng 9, 1945",
        image: {
          alt: "Đám đông gợi bối cảnh một sự kiện công cộng quy mô lớn",
          caption: "Khung tư liệu trung tính — chờ bổ sung ảnh lưu trữ xác thực",
          credit: "TODO: 1945 archival asset required",
          isPlaceholder: true,
        },
      },
    ],
    thoughtFormation: {
      heading: ["Tư tưởng ấy", "được hình thành", "như thế nào?"],
      factors: [
        {
          title: "Truyền thống dân tộc",
          summary:
            "Tinh thần yêu nước, tương thân tương ái và đoàn kết đã hình thành qua lịch sử dân tộc.",
        },
        {
          title: "Thực tiễn cách mạng",
          summary:
            "Kinh nghiệm thực tiễn cho thấy sức mạnh chỉ xuất hiện khi các lực lượng tập hợp quanh mục tiêu chung.",
        },
        {
          title: "Cơ sở lý luận",
          summary:
            "Các cơ sở lý luận giúp tư tưởng đoàn kết được phát triển thành một quan điểm có hệ thống.",
        },
      ],
      conclusion: ["Đại đoàn kết", "dân tộc"],
    },
    application: {
      eyebrow: "Tư tưởng Đại đoàn kết trong thực tiễn",
      heading: ["Điều này có nghĩa gì", "với bạn hôm nay?"],
      bridge: "Quay lại nhóm sinh viên ban đầu.",
      items: [
        {
          number: "01",
          title: "Tìm mục tiêu chung",
          summary:
            "Xác định điều mà cả nhóm đều muốn đạt được — không phải sự đồng nhất, mà là điểm đồng thuận.",
        },
        {
          number: "02",
          title: "Tôn trọng khác biệt",
          summary:
            "Khác biệt về quan điểm không tự nhiên làm suy yếu tập thể; khi được lắng nghe, nó có thể trở thành sức mạnh.",
        },
        {
          number: "03",
          title: "Biến đồng thuận thành hành động",
          summary:
            "Chuyển mục tiêu chung thành trách nhiệm rõ ràng và các bước đi cụ thể.",
        },
      ],
    },
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
