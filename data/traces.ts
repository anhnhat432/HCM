import type { TraceData } from "@/types/trace";

const HISTORICAL_ASSET_APPROVAL =
  "Chủ dự án xác nhận phê duyệt sử dụng công khai ngày 2026-08-10.";

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
        credit: "Unsplash",
        sourceUrl:
          "https://images.unsplash.com/photo-1552664730-d307ca884978",
        verificationStatus: "verified",
        usageStatus: "licensed",
        license: "Unsplash License",
      },
    },
    centralQuestion: "Điều gì có thể giữ một tập thể cùng hướng?",
    historicalMoments: [
      {
        id: "dang-cong-san-viet-nam",
        year: "1930",
        title: "Đảng Cộng sản Việt Nam",
        summary:
          "Đầu năm 1930 tại Hương Cảng, Nguyễn Ái Quốc chủ trì Hội nghị hợp nhất các tổ chức cộng sản, quy tụ lực lượng quanh mục tiêu chung và dẫn tới sự ra đời của Đảng Cộng sản Việt Nam.",
        metadata: "Hương Cảng — đầu tháng 2 năm 1930",
        verification:
          "Đã đối chiếu nguồn chính thống về vai trò chủ trì của Nguyễn Ái Quốc, Hội nghị hợp nhất và ngày thành lập Đảng; summary là diễn giải, không coi năm 1930 là điểm khởi nguồn tuyệt đối của tư tưởng đại đoàn kết.",
        image: {
          src: "/images/traces/dai-doan-ket/1930-party-foundation.jpg",
          alt: "Tranh tái hiện Nguyễn Ái Quốc chủ trì Hội nghị hợp nhất các tổ chức cộng sản tại Hương Cảng đầu năm 1930",
          caption: "Tranh tái hiện Hội nghị thành lập Đảng Cộng sản Việt Nam",
          credit:
            "Cổng Thông tin điện tử Hồ Chí Minh; ảnh chụp lại tranh của họa sĩ Phi Hoanh tại Bảo tàng Lịch sử Quốc gia",
          sourceUrl:
            "https://hochiminh.vn/hoc-va-lam-theo-bac/hoc-va-lam-theo-bac/vai-tro-cua-nguyen-ai-quoc-tai-hoi-nghi-hop-nhat-cac-to-chuc-cong-san-o-viet-nam-3992",
          verificationStatus: "verified",
          usageStatus: "approved",
          usageNote: HISTORICAL_ASSET_APPROVAL,
          license: "Không nêu giấy phép tái sử dụng",
          objectPosition: "50% center",
        },
        sources: [
          {
            title:
              "Vai trò của Nguyễn Ái Quốc tại Hội nghị hợp nhất các tổ chức cộng sản ở Việt Nam",
            url: "https://hochiminh.vn/hoc-va-lam-theo-bac/hoc-va-lam-theo-bac/vai-tro-cua-nguyen-ai-quoc-tai-hoi-nghi-hop-nhat-cac-to-chuc-cong-san-o-viet-nam-3992",
          },
          {
            title: "Ngày thành lập Đảng Cộng sản Việt Nam (3-2-1930)",
            url: "https://tulieuvankien.dangcongsan.vn/ho-so-su-kien-nhan-chung/su-kien-va-nhan-chung/ngay-thanh-lap-dang-cong-san-viet-nam-3-2-1930-3342",
          },
        ],
      },
      {
        id: "viet-minh",
        year: "1941",
        title: "Việt Minh",
        summary:
          "Tháng 5 năm 1941 tại Pác Bó, Nguyễn Ái Quốc chủ trì Hội nghị Trung ương lần thứ Tám. Hội nghị quyết định thành lập Việt Minh nhằm tập hợp rộng rãi các lực lượng yêu nước cho mục tiêu giải phóng dân tộc.",
        metadata: "Pác Bó, Cao Bằng — 10–19 tháng 5 năm 1941",
        verification:
          "Đã đối chiếu biên niên và nguồn bảo tàng về Hội nghị Trung ương lần thứ Tám, quyết định thành lập Việt Minh và mục tiêu tập hợp lực lượng; dùng tên Nguyễn Ái Quốc đúng bối cảnh năm 1941.",
        image: {
          src: "/images/traces/dai-doan-ket/1941-viet-minh-pac-bo.jpg",
          alt: "Lán Khuổi Nậm tại Pác Bó, nơi Hội nghị Trung ương lần thứ Tám diễn ra tháng 5 năm 1941",
          caption:
            "Lán Khuổi Nậm tại Pác Bó, nơi Hội nghị Trung ương lần thứ Tám quyết định thành lập Mặt trận Việt Minh",
          credit: "Bảo tàng Lịch sử Quốc gia",
          sourceUrl:
            "https://baotanglichsu.vn/vi/Articles/3097/16382/19-5-1941-thanh-lap-mat-tran-viet-minh.html",
          verificationStatus: "verified",
          usageStatus: "approved",
          usageNote: HISTORICAL_ASSET_APPROVAL,
          license: "Không nêu giấy phép tái sử dụng",
          objectPosition: "50% center",
        },
        sources: [
          {
            title:
              "Nguyễn Ái Quốc chủ trì Hội nghị lần thứ Tám của Trung ương Đảng Cộng sản Đông Dương",
            url: "https://baotanghochiminh.vn/nguyen-ai-quoc-chu-tri-hoi-nghi-lan-thu-tam-cua-trung-uong-dang-cong-san-dong-duong.htm",
          },
          {
            title: "19/5/1941: Thành lập Mặt trận Việt Minh",
            url: "https://baotanglichsu.vn/vi/Articles/3097/16382/19-5-1941-thanh-lap-mat-tran-viet-minh.html",
          },
        ],
      },
      {
        id: "tuyen-ngon-doc-lap",
        year: "1945",
        title: "Tuyên ngôn Độc lập",
        summary:
          "Ngày 2 tháng 9 năm 1945 tại Ba Đình, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập, tuyên bố sự ra đời của nước Việt Nam Dân chủ Cộng hòa sau quá trình tập hợp lực lượng vì độc lập dân tộc.",
        metadata: "Quảng trường Ba Đình, Hà Nội — 2 tháng 9 năm 1945",
        verification:
          "Đã đối chiếu nguồn lưu trữ và nguồn chính thống về ngày, địa điểm, việc công bố Tuyên ngôn; câu kết là diễn giải theo chủ đề Trace, không phải trích dẫn hay khẳng định điều kiện lịch sử duy nhất.",
        image: {
          src: "/images/traces/dai-doan-ket/1945-independence-declaration.jpg",
          alt: "Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập trên lễ đài tại vườn hoa Ba Đình ngày 2 tháng 9 năm 1945",
          caption:
            "Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại vườn hoa Ba Đình, ngày 2 tháng 9 năm 1945",
          credit:
            "Trung tâm Lưu trữ quốc gia III, Phông Nghệ sĩ nhiếp ảnh Nguyễn Bá Khoản, SLT 98-65, 3002, 44, 64",
          sourceUrl:
            "https://luutru.gov.vn/cong-bo-gioi-thieu-tai-lieu/ban-tuyen-ngon-doc-lap-va-mot-so-hinh-anh-ngay-2-9-1945-tai-quang-truong-ba-dinh-lich-su.htm",
          verificationStatus: "verified",
          usageStatus: "approved",
          usageNote: HISTORICAL_ASSET_APPROVAL,
          license: "Không nêu giấy phép tái sử dụng",
          objectPosition: "18% center",
        },
        sources: [
          {
            title:
              "Bản Tuyên ngôn Độc lập và một số hình ảnh ngày 2/9/1945 tại Quảng trường Ba Đình lịch sử",
            url: "https://luutru.gov.vn/cong-bo-gioi-thieu-tai-lieu/ban-tuyen-ngon-doc-lap-va-mot-so-hinh-anh-ngay-2-9-1945-tai-quang-truong-ba-dinh-lich-su.htm",
          },
        ],
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
        credit: "Unsplash",
        sourceUrl:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
        verificationStatus: "verified",
        usageStatus: "licensed",
        license: "Unsplash License",
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
          src: "/images/traces/dao-duc-trach-nhiem/1927-duong-kach-menh.jpg",
          alt: "Bìa cuốn Đường Kách mệnh xuất bản năm 1927, hiện vật được công nhận là bảo vật quốc gia",
          caption: "Cuốn Đường Kách mệnh, xuất bản năm 1927",
          credit: "Cục Di sản văn hóa",
          sourceUrl: "https://dsvh.gov.vn/cuon-duong-kach-menh-3022",
          verificationStatus: "verified",
          usageStatus: "approved",
          usageNote: HISTORICAL_ASSET_APPROVAL,
          license:
            "Website yêu cầu ghi rõ nguồn Cục Di sản văn hóa khi sử dụng lại thông tin",
          objectPosition: "50% center",
        },
        sources: [
          {
            title:
              "Vận dụng tư tưởng tác phẩm “Đường cách mệnh” trong xây dựng, chỉnh đốn Đảng",
            url: "https://hochiminh.vn/tu-tuong-dao-duc-ho-chi-minh/nghien-cuu-tu-tuong-dao-duc-ho-chi-minh/van-dung-tu-tuong-tac-pham-duong-cach-menh-trong-xay-dung-chinh-don-dang-6549",
          },
          {
            title: "Cuốn “Đường Kách mệnh”",
            url: "https://dsvh.gov.vn/cuon-duong-kach-menh-3022",
          },
        ],
      },
      {
        id: "sua-doi-loi-lam-viec",
        year: "1947",
        title: "Sửa đổi lối làm việc",
        summary:
          "Trong Sửa đổi lối làm việc, Hồ Chí Minh đưa yêu cầu về phẩm chất vào thực tiễn công tác: nhận diện bệnh chủ quan, hẹp hòi, sửa cách nghĩ, cách làm và nhấn mạnh trách nhiệm của cán bộ, đảng viên với tổ chức, tập thể.",
        metadata: "ATK Định Hóa, Thái Nguyên — tháng 10 năm 1947",
        verification:
          "Đã đối chiếu nguồn chính thống về bối cảnh Việt Bắc năm 1947, nội dung phê bình khuyết điểm và trách nhiệm của cán bộ, đảng viên; summary là diễn giải.",
        image: {
          alt: "Khung tư liệu trung tính cho tác phẩm Sửa đổi lối làm việc năm 1947",
          caption: "Chưa có tư liệu đúng bối cảnh và đủ điều kiện sử dụng",
          credit: "ĐUỐC HỒNG — placeholder trung tính",
          verificationStatus: "placeholder",
          usageStatus: "not-applicable",
          isPlaceholder: true,
        },
        sources: [
          {
            title:
              "60 năm tác phẩm Sửa đổi lối làm việc của Chủ tịch Hồ Chí Minh",
            url: "https://tulieuvankien.dangcongsan.vn/c-mac-angghen-lenin-ho-chi-minh/ho-chi-minh/nghien-cuu-hoc-tap-tu-tuong/60-nam-tac-pham-sua-doi-loi-lam-viec-cua-chu-tich-ho-chi-minh-10-1947-102007-y-nghia-va-gia-tri-tu-tuong-sua-doi-2488",
          },
          {
            title:
              "Tác phẩm “Sửa đổi lối làm việc” của Chủ tịch Hồ Chí Minh",
            url: "https://baotanglichsu.vn/vi/Articles/1002/12914/tac-pham-sua-djoi-loi-lam-viec-cua-chu-tich-ho-chi-minh-ky-niem-65-nam-ngay-tac-pham-ra-djoi.html",
          },
        ],
      },
      {
        id: "dao-duc-cach-mang",
        year: "1958",
        title: "Đạo đức cách mạng",
        summary:
          "Trong Đạo đức cách mạng, Hồ Chí Minh trình bày có hệ thống hơn về đạo đức, tu dưỡng, lợi ích chung và chống chủ nghĩa cá nhân. Tác phẩm phát triển mạch tư tưởng về phẩm chất, trách nhiệm đã đặt ra từ 1927, 1947.",
        metadata: "Tạp chí Học tập, số 12 — tháng 12 năm 1958",
        verification:
          "Đã đối chiếu nguồn chính thống về tên tác phẩm, bút danh Trần Lực và việc đăng trên Tạp chí Học tập số 12 năm 1958; summary là diễn giải, không phải trích dẫn.",
        image: {
          alt: "Khung tư liệu trung tính cho tác phẩm Đạo đức cách mạng năm 1958",
          caption: "Chưa có tư liệu đúng bối cảnh và đủ điều kiện sử dụng",
          credit: "ĐUỐC HỒNG — placeholder trung tính",
          verificationStatus: "placeholder",
          usageStatus: "not-applicable",
          isPlaceholder: true,
        },
        sources: [
          {
            title:
              "Tác phẩm Đạo đức cách mạng của Chủ tịch Hồ Chí Minh, ký bút danh Trần Lực, đăng trên Tạp chí Học tập, số 12 năm 1958",
            url: "https://baotanghochiminh.vn/tac-pham-dao-duc-cach-mang-cua-chu-tich-ho-chi-minh-ky-but-danh-tran-luc-dang-tren-tap-chi-hoc-tap-so-12-nam-1958.htm",
          },
          {
            title: "Đạo đức cách mạng (12-1958)",
            url: "https://vpctn.gov.vn/hoc-tap-tu-tuong-dao-duc-ho-chi-minh/dao-duc-cach-mang-12-1958-.html",
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
        credit: "Unsplash",
        sourceUrl:
          "https://images.unsplash.com/photo-1513258496099-48168024aec0",
        verificationStatus: "verified",
        usageStatus: "licensed",
        license: "Unsplash License",
      },
    },
    centralQuestion: "Giá trị của một con người được quyết định bởi điều gì?",
    historicalMoments: [
      {
        id: "tuyen-ngon-doc-lap",
        year: "1945",
        title: "Tuyên ngôn Độc lập",
        summary:
          "Tuyên ngôn Độc lập dẫn lại quyền sống, quyền tự do và bình đẳng, rồi phát triển lập luận về quyền độc lập, tự do của dân tộc Việt Nam. Dấu mốc làm rõ mối liên hệ giữa quyền con người và quyền dân tộc.",
        metadata: "Quảng trường Ba Đình, Hà Nội — 2 tháng 9 năm 1945",
        verification:
          "Đã đối chiếu nguồn chính thống về ngày công bố, quyền sống, tự do, bình đẳng và mối liên hệ giữa quyền con người với quyền dân tộc; summary là diễn giải.",
        image: {
          src: "/images/traces/dai-doan-ket/1945-independence-declaration.jpg",
          alt: "Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập trên lễ đài tại vườn hoa Ba Đình ngày 2 tháng 9 năm 1945",
          caption:
            "Tuyên ngôn Độc lập được công bố tại vườn hoa Ba Đình, ngày 2 tháng 9 năm 1945",
          credit:
            "Trung tâm Lưu trữ quốc gia III, Phông Nghệ sĩ nhiếp ảnh Nguyễn Bá Khoản, SLT 98-65, 3002, 44, 64",
          sourceUrl:
            "https://luutru.gov.vn/cong-bo-gioi-thieu-tai-lieu/ban-tuyen-ngon-doc-lap-va-mot-so-hinh-anh-ngay-2-9-1945-tai-quang-truong-ba-dinh-lich-su.htm",
          verificationStatus: "verified",
          usageStatus: "approved",
          usageNote: HISTORICAL_ASSET_APPROVAL,
          license: "Không nêu giấy phép tái sử dụng",
          objectPosition: "14% center",
        },
        sources: [
          {
            title: "Quyền con người trong Tuyên ngôn Độc lập của Chủ tịch Hồ Chí Minh",
            url: "https://tulieuvankien.dangcongsan.vn/c-mac-angghen-lenin-ho-chi-minh/ho-chi-minh/nghien-cuu-hoc-tap-tu-tuong/quyen-con-nguoi-trong-tuyen-ngon-doc-lap-cua-chu-tich-ho-chi-minh-2166",
          },
          {
            title:
              "Bản Tuyên ngôn Độc lập và một số hình ảnh ngày 2/9/1945 tại Quảng trường Ba Đình lịch sử",
            url: "https://luutru.gov.vn/cong-bo-gioi-thieu-tai-lieu/ban-tuyen-ngon-doc-lap-va-mot-so-hinh-anh-ngay-2-9-1945-tai-quang-truong-ba-dinh-lich-su.htm",
          },
        ],
      },
      {
        id: "trong-nguoi",
        year: "1958",
        title: "Trồng người",
        summary:
          "Ngày 13 tháng 9 năm 1958, khi nói chuyện tại lớp học chính trị của giáo viên cấp II, III toàn miền Bắc, Hồ Chí Minh dẫn lại quan niệm “vì lợi ích trăm năm thì phải trồng người” để nhấn mạnh trách nhiệm lâu dài của giáo dục.",
        metadata:
          "Lớp học chính trị của giáo viên cấp II, III — 13 tháng 9 năm 1958",
        verification:
          "Đã đối chiếu biên niên Bảo tàng Hồ Chí Minh, Báo Quân đội nhân dân và dẫn chiếu Hồ Chí Minh Toàn tập, tập 11, trang 528; phần trong ngoặc kép là trích dẫn trực tiếp từ nguồn.",
        image: {
          alt: "Khung tư liệu trung tính cho phát biểu về trồng người năm 1958",
          caption: "Chưa có tư liệu đúng bối cảnh và đủ điều kiện sử dụng",
          credit: "ĐUỐC HỒNG — placeholder trung tính",
          verificationStatus: "placeholder",
          usageStatus: "not-applicable",
          isPlaceholder: true,
        },
        sources: [
          {
            title:
              "Chủ tịch Hồ Chí Minh tới thăm Lớp học chính trị của giáo viên cấp II và cấp III toàn miền Bắc",
            url: "https://baotanghochiminh.vn/chu-tich-ho-chi-minh-toi-tham-lop-hoc-chinh-tri-cua-giao-vien-cap-ii-va-cap-iii-toan-mien-bac-to-chuc-tai-ha-noi-va-nguoi-den-tham-trien-lam-my-thuat-toan-quoc-nam-1958-tiep-giao-su-nguoi-mien-dien-la-u-oong-la-va-phu-nhan.htm",
          },
        ],
      },
      {
        id: "di-chuc",
        year: "1969",
        title: "Di chúc",
        summary:
          "Trong Di chúc công bố năm 1969, Hồ Chí Minh căn dặn giáo dục thanh niên, bồi dưỡng thế hệ cách mạng và nâng cao đời sống nhân dân. Những nội dung ấy gắn việc xây dựng xã hội với sự phát triển con người.",
        metadata: "Di chúc — công bố năm 1969, đề ngày 10 tháng 5",
        verification:
          "Đã đối chiếu toàn văn Di chúc về giáo dục thanh niên, bồi dưỡng thế hệ cách mạng và kế hoạch nâng cao đời sống nhân dân; summary là diễn giải.",
        image: {
          alt: "Khung tư liệu trung tính cho Di chúc năm 1969",
          caption: "Chưa có tư liệu đúng bối cảnh và đủ điều kiện sử dụng",
          credit: "ĐUỐC HỒNG — placeholder trung tính",
          verificationStatus: "placeholder",
          usageStatus: "not-applicable",
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
      verification:
        "Đây là kết luận khái quát của Trace, không phải trích dẫn nguyên văn; được đối chiếu với các nguồn chính thống về quyền con người, giáo dục, thế hệ kế tiếp và đời sống nhân dân.",
      sources: [
        {
          title:
            "Quyền con người trong Tuyên ngôn Độc lập của Chủ tịch Hồ Chí Minh",
          url: "https://tulieuvankien.dangcongsan.vn/c-mac-angghen-lenin-ho-chi-minh/ho-chi-minh/nghien-cuu-hoc-tap-tu-tuong/quyen-con-nguoi-trong-tuyen-ngon-doc-lap-cua-chu-tich-ho-chi-minh-2166",
        },
        {
          title:
            "Chủ tịch Hồ Chí Minh tới thăm Lớp học chính trị của giáo viên cấp II và cấp III toàn miền Bắc",
          url: "https://baotanghochiminh.vn/chu-tich-ho-chi-minh-toi-tham-lop-hoc-chinh-tri-cua-giao-vien-cap-ii-va-cap-iii-toan-mien-bac-to-chuc-tai-ha-noi-va-nguoi-den-tham-trien-lam-my-thuat-toan-quoc-nam-1958-tiep-giao-su-nguoi-mien-dien-la-u-oong-la-va-phu-nhan.htm",
        },
        {
          title: "Toàn văn Di chúc của Chủ tịch Hồ Chí Minh",
          url: "https://baochinhphu.vn/toan-van-di-chuc-cua-chu-tich-ho-chi-minh-102169104.htm",
        },
      ],
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
