import type { TraceData } from "@/types/trace";

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
    presentDay: {
      label: "2026 — Điểm xuất phát",
      headline: [
        "Khi điều dễ làm",
        "không phải lúc nào",
        "cũng là điều nên làm.",
      ],
      summary:
        "Trong lúc chạy nước rút cho một project, một thành viên phát hiện nhóm có thể dùng lại nội dung của người khác để tiết kiệm thời gian. Lối tắt ấy giúp cả nhóm hoàn thành nhanh hơn, nhưng buộc mỗi người cân nhắc trách nhiệm của mình với kết quả chung.",
      image: {
        src: "/images/traces/dao-duc-trach-nhiem/present-day.jpg",
        alt: "Nhóm sinh viên cùng xem tài liệu trên laptop khi làm project",
        caption: "Một lối tắt đặt cả nhóm trước lựa chọn chung",
        credit: "Unsplash reference — modern student project scene",
      },
    },
    centralQuestion:
      "Điều gì định hướng một lựa chọn đúng khi không ai buộc ta phải làm đúng?",
    historicalMoments: [
      {
        id: "tu-cach-nguoi-cach-menh",
        year: "1927",
        title: "Tư cách một người cách mệnh",
        summary:
          "Trong Đường Kách mệnh, Nguyễn Ái Quốc đặt “Tư cách một người cách mệnh” ở đầu tác phẩm, nêu yêu cầu về bản thân, với người và công việc. Đạo đức được xác lập sớm như nền tảng gắn với hành động cách mạng.",
        metadata: "Tác phẩm Đường Kách mệnh — xuất bản năm 1927",
        verification:
          "Đã đối chiếu nguồn chính thống về năm 1927, bối cảnh các bài giảng và vai trò của chuẩn mực đạo đức; summary là diễn giải, không phải trích dẫn.",
        image: {
          alt: "Khung tư liệu trung tính cho tác phẩm Đường Kách mệnh năm 1927",
          caption: "Chờ bổ sung tư liệu lưu trữ đã được xác minh",
          credit: "TODO: 1927 archival asset required",
          isPlaceholder: true,
        },
        sources: [
          {
            title:
              "Vận dụng tư tưởng tác phẩm “Đường cách mệnh” trong xây dựng, chỉnh đốn Đảng",
            url: "https://hochiminh.vn/tu-tuong-dao-duc-ho-chi-minh/nghien-cuu-tu-tuong-dao-duc-ho-chi-minh/van-dung-tu-tuong-tac-pham-duong-cach-menh-trong-xay-dung-chinh-don-dang-6549",
          },
        ],
      },
      {
        id: "sua-doi-loi-lam-viec",
        year: "1947",
        title: "Sửa đổi lối làm việc",
        summary:
          "Trong Sửa đổi lối làm việc, Hồ Chí Minh đưa yêu cầu về phẩm chất vào thực tiễn công tác: nhận diện bệnh chủ quan, hẹp hòi, sửa cách nghĩ, cách làm và nhấn mạnh trách nhiệm của cán bộ, đảng viên với tổ chức, tập thể.",
        metadata: "Việt Bắc — tháng 10, 1947",
        verification:
          "Đã đối chiếu nguồn chính thống về bối cảnh Việt Bắc năm 1947, nội dung phê bình khuyết điểm và trách nhiệm của cán bộ, đảng viên; summary là diễn giải.",
        image: {
          alt: "Khung tư liệu trung tính cho tác phẩm Sửa đổi lối làm việc năm 1947",
          caption: "Chờ bổ sung tư liệu lưu trữ đã được xác minh",
          credit: "TODO: 1947 archival asset required",
          isPlaceholder: true,
        },
        sources: [
          {
            title:
              "60 năm tác phẩm Sửa đổi lối làm việc của Chủ tịch Hồ Chí Minh",
            url: "https://tulieuvankien.dangcongsan.vn/c-mac-angghen-lenin-ho-chi-minh/ho-chi-minh/nghien-cuu-hoc-tap-tu-tuong/60-nam-tac-pham-sua-doi-loi-lam-viec-cua-chu-tich-ho-chi-minh-10-1947-102007-y-nghia-va-gia-tri-tu-tuong-sua-doi-2488",
          },
        ],
      },
      {
        id: "dao-duc-cach-mang",
        year: "1958",
        title: "Đạo đức cách mạng",
        summary:
          "Trong Đạo đức cách mạng, Hồ Chí Minh trình bày có hệ thống hơn về đạo đức, tu dưỡng, lợi ích chung và chống chủ nghĩa cá nhân. Tác phẩm phát triển mạch tư tưởng về phẩm chất, trách nhiệm đã đặt ra từ 1927, 1947.",
        metadata: "Tạp chí Học tập, số 12 — 1958",
        verification:
          "Đã đối chiếu nguồn chính thống về tên tác phẩm, bút danh Trần Lực và việc đăng trên Tạp chí Học tập số 12 năm 1958; summary là diễn giải, không phải trích dẫn.",
        image: {
          alt: "Khung tư liệu trung tính cho tác phẩm Đạo đức cách mạng năm 1958",
          caption: "Chờ bổ sung tư liệu lưu trữ đã được xác minh",
          credit: "TODO: 1958 archival asset required",
          isPlaceholder: true,
        },
        sources: [
          {
            title: "“Đạo đức cách mạng” của Chủ tịch Hồ Chí Minh",
            url: "https://hochiminh.vn/tin-tuc/dao-duc-cach-mang-cua-chu-tich-ho-chi-minh-1431",
          },
        ],
      },
    ],
    thoughtFormation: {
      heading: ["Tư tưởng ấy", "được hình thành", "như thế nào?"],
      factors: [
        {
          title: "Đạo đức là nền tảng",
          summary:
            "Lựa chọn đúng bắt đầu từ việc tự rèn mình, không chỉ từ quy định bên ngoài.",
        },
        {
          title: "Trách nhiệm trong hành động",
          summary:
            "Một nguyên tắc chỉ có ý nghĩa khi được thể hiện trong cách làm việc và nhận trách nhiệm.",
        },
        {
          title: "Lợi ích chung",
          summary:
            "Lợi ích cá nhân cần được đặt trong quan hệ với tập thể và những người chịu tác động.",
        },
      ],
      conclusion: ["Đạo đức &", "trách nhiệm"],
    },
    application: {
      eyebrow: "Đạo đức & trách nhiệm trong thực tiễn",
      heading: ["Điều này có nghĩa gì", "với bạn hôm nay?"],
      bridge: "Quay lại nhóm sinh viên ban đầu.",
      items: [
        {
          number: "01",
          title: "Trung thực với lựa chọn",
          summary:
            "Kiểm tra nguồn, nói rõ điều nhóm định sử dụng và chọn cách có thể giải thích minh bạch với mọi người.",
        },
        {
          number: "02",
          title: "Chịu trách nhiệm với hành động",
          summary:
            "Cùng nhận phần hậu quả của quyết định và chủ động sửa lại khi lựa chọn của nhóm có vấn đề.",
        },
        {
          number: "03",
          title: "Đặt lợi ích chung đúng chỗ",
          summary:
            "Ưu tiên kết quả bền vững của cả nhóm, kể cả khi điều đó cần thêm thời gian thay vì một lối tắt.",
        },
      ],
    },
  },
  {
    slug: "con-nguoi",
    order: 3,
    title: "Con người",
    shortTitle: "Con người",
    theme: "humanity",
    cardSummary: "Con người đứng ở đâu trong một xã hội đang thay đổi?",
    presentDay: {
      label: "2026 — Điểm xuất phát",
      headline: ["Khi một con người", "bị đo bằng", "những con số."],
      summary:
        "Điểm số, thành tích, năng suất và những dòng trong CV dần trở thành thước đo quen thuộc. Khi kết quả không như mong đợi, một sinh viên bắt đầu tự hỏi liệu giá trị của mình có đang bị thu gọn vào những con số ấy.",
      image: {
        src: "/images/traces/con-nguoi/present-day.jpg",
        alt: "Một sinh viên tập trung trước laptop trong không gian học tập",
        caption: "Khi kết quả dần trở thành thước đo duy nhất",
        credit: "Unsplash reference — student studying at a laptop",
      },
    },
    centralQuestion: "Giá trị của một con người được quyết định bởi điều gì?",
    historicalMoments: [
      {
        id: "tuyen-ngon-doc-lap",
        year: "1945",
        title: "Tuyên ngôn Độc lập",
        summary:
          "Trong Tuyên ngôn Độc lập, Hồ Chí Minh đặt quyền sống, tự do và bình đẳng của con người trong lập luận về độc lập dân tộc. Phẩm giá con người vì thế gắn với quyền tự quyết của cả cộng đồng.",
        metadata: "Quảng trường Ba Đình, Hà Nội — 2 tháng 9, 1945",
        verification:
          "Đã đối chiếu nguồn chính thống về ngày công bố, quyền sống, tự do, bình đẳng và mối liên hệ giữa quyền con người với quyền dân tộc; summary là diễn giải.",
        image: {
          alt: "Khung tư liệu trung tính cho Tuyên ngôn Độc lập năm 1945",
          caption: "Chờ bổ sung tư liệu lưu trữ đã được xác minh",
          credit: "TODO: 1945 archival asset required",
          isPlaceholder: true,
        },
        sources: [
          {
            title: "Quyền con người trong Tuyên ngôn Độc lập của Chủ tịch Hồ Chí Minh",
            url: "https://tulieuvankien.dangcongsan.vn/c-mac-angghen-lenin-ho-chi-minh/ho-chi-minh/nghien-cuu-hoc-tap-tu-tuong/quyen-con-nguoi-trong-tuyen-ngon-doc-lap-cua-chu-tich-ho-chi-minh-2166",
          },
        ],
      },
      {
        id: "trong-nguoi",
        year: "1958",
        title: "Trồng người",
        summary:
          "Tại lớp học chính trị của giáo viên cấp II, III toàn miền Bắc, Hồ Chí Minh nhấn mạnh “trồng người” là công việc lâu dài. Giáo dục không chỉ truyền đạt kiến thức mà còn bồi dưỡng con người để trưởng thành và đóng góp.",
        metadata:
          "Lớp học chính trị của giáo viên cấp II, III — 13 tháng 9, 1958",
        verification:
          "Đã đối chiếu Báo Quân đội nhân dân và dẫn chiếu Hồ Chí Minh Toàn tập, tập 11, trang 528 về phát biểu ngày 13 tháng 9 năm 1958.",
        image: {
          alt: "Khung tư liệu trung tính cho phát biểu về trồng người năm 1958",
          caption: "Chờ bổ sung tư liệu lưu trữ đã được xác minh",
          credit: "TODO: 1958 archival asset required",
          isPlaceholder: true,
        },
        sources: [
          {
            title: "13-9-1958: Bác Hồ căn dặn chuyện trồng cây — trồng người",
            url: "https://www.qdnd.vn/tu-lieu-ho-so/ngay-nay-nam-xua/13-9-1958-bac-ho-can-dan-chuyen-trong-cay-trong-nguoi-671049",
          },
        ],
      },
      {
        id: "di-chuc",
        year: "1969",
        title: "Di chúc",
        summary:
          "Trong Di chúc, Hồ Chí Minh quan tâm đến giáo dục thanh niên, bồi dưỡng thế hệ kế tiếp và nâng cao đời sống nhân dân. Những căn dặn ấy đặt con người ở trung tâm công việc xây dựng xã hội sau chiến tranh.",
        metadata: "Di chúc của Chủ tịch Hồ Chí Minh — 1969",
        verification:
          "Đã đối chiếu toàn văn Di chúc về giáo dục thanh niên, bồi dưỡng thế hệ cách mạng và kế hoạch nâng cao đời sống nhân dân; summary là diễn giải.",
        image: {
          alt: "Khung tư liệu trung tính cho Di chúc năm 1969",
          caption: "Chờ bổ sung tư liệu lưu trữ đã được xác minh",
          credit: "TODO: 1969 archival asset required",
          isPlaceholder: true,
        },
        sources: [
          {
            title: "Toàn văn Di chúc của Chủ tịch Hồ Chí Minh",
            url: "https://baochinhphu.vn/toan-van-di-chuc-cua-chu-tich-ho-chi-minh-102169104.htm",
          },
        ],
      },
    ],
    thoughtFormation: {
      heading: ["Tư tưởng ấy", "được hình thành", "như thế nào?"],
      factors: [
        {
          title: "Quyền và phẩm giá con người",
          summary:
            "Quyền sống, tự do và bình đẳng được đặt trong quan hệ với quyền độc lập, tự quyết của dân tộc.",
        },
        {
          title: "Giáo dục và phát triển con người",
          summary:
            "Con người cần được học tập, bồi dưỡng và tạo điều kiện để phát triển lâu dài.",
        },
        {
          title: "Con người trong xây dựng xã hội",
          summary:
            "Sự phát triển chỉ có ý nghĩa khi hướng tới đời sống nhân dân và phát huy khả năng đóng góp của mỗi người.",
        },
      ],
      conclusion: ["Con người", "vừa là mục tiêu,", "vừa là động lực"],
    },
    application: {
      eyebrow: "Con người trong thực tiễn",
      heading: ["Điều này có nghĩa gì", "với bạn hôm nay?"],
      bridge: "Quay lại sinh viên ở điểm xuất phát.",
      items: [
        {
          number: "01",
          title: "Không thu gọn con người vào thành tích",
          summary:
            "Điểm số, năng suất hay kết quả tức thời chỉ phản ánh một phần, không thể đại diện cho toàn bộ một con người.",
        },
        {
          number: "02",
          title: "Tạo điều kiện để con người phát triển",
          summary:
            "Giáo dục và môi trường tập thể cần mở ra cơ hội để mỗi người học hỏi, trưởng thành và đóng góp.",
        },
        {
          number: "03",
          title: "Đặt con người vào trung tâm",
          summary:
            "Một quyết định tốt cần cân nhắc cả kết quả đạt được lẫn ảnh hưởng của nó tới những người liên quan.",
        },
      ],
    },
  },
] as const satisfies readonly TraceData[];
