import type { TraceSlug } from "@/types/trace";
import type {
  CaseCategory,
  CaseEvidenceReference,
  ThoughtCase,
} from "@/types/thought-case";

export const CASE_CATEGORY_LABELS: Record<CaseCategory, string> = {
  "study-teamwork": "Học tập & làm việc nhóm",
  "leadership-responsibility": "Lãnh đạo & trách nhiệm",
  "conflicting-interests": "Xung đột lợi ích",
  "social-media": "Mạng xã hội",
  "human-development": "Phát triển con người",
  "community-society": "Cộng đồng & xã hội",
};

const PRIMARY_EVIDENCE_IDS = {
  "dai-doan-ket": [
    "dang-cong-san-viet-nam",
    "viet-minh",
    "tuyen-ngon-doc-lap",
  ],
  "dao-duc-trach-nhiem": [
    "tu-cach-nguoi-cach-menh",
    "sua-doi-loi-lam-viec",
    "dao-duc-cach-mang",
  ],
  "con-nguoi": ["tuyen-ngon-doc-lap", "trong-nguoi", "di-chuc"],
} as const satisfies Record<TraceSlug, readonly [string, string, string]>;

function primaryEvidence(
  traceSlug: TraceSlug,
  index: 0 | 1 | 2,
): CaseEvidenceReference {
  return {
    traceSlug,
    momentId: PRIMARY_EVIDENCE_IDS[traceSlug][index],
  };
}

export const thoughtCases = [
  {
    slug: "nhom-gioi-nhung-khong-hop-tac",
    category: "study-teamwork",
    title: "Khi người giỏi nhất không muốn hợp tác",
    shortPrompt:
      "Một thành viên làm rất tốt phần mình nhưng từ chối phối hợp với cả nhóm.",
    context:
      "Nhóm của bạn có một thành viên nổi bật về năng lực. Bạn ấy hoàn thành phần việc nhanh và tốt, nhưng không chia sẻ tiến độ, không lắng nghe góp ý và cho rằng kết quả cá nhân đủ để bảo đảm thành công chung.",
    openingQuestion:
      "Một tập thể có thể đi xa nếu người giỏi nhất đứng ngoài nhịp chung không?",
    primaryTrace: "dai-doan-ket",
    supportingTrace: "con-nguoi",
    optionalPerspective: [
      "Ưu tiên để người giỏi tự quyết phần việc của mình",
      "Ưu tiên một cách phối hợp mà mọi người cùng theo được",
    ],
    reveals: [
      {
        assumption:
          "Chỉ cần từng người làm tốt phần của mình thì nhóm tự khắc sẽ mạnh.",
        finding:
          "Năng lực riêng chỉ trở thành sức mạnh chung khi được đặt vào một mục tiêu có thể cùng chia sẻ.",
        reframe:
          "Câu hỏi không còn là ai giỏi nhất, mà là điều gì khiến các năng lực khác nhau cùng hướng.",
        evidence: primaryEvidence("dai-doan-ket", 0),
      },
      {
        assumption:
          "Muốn phối hợp thì mọi người phải suy nghĩ giống nhau.",
        finding:
          "Một mục tiêu chung có thể quy tụ nhiều vị trí và cách đóng góp khác nhau.",
        reframe:
          "Đoàn kết không xóa khác biệt; nó tạo một lý do đủ rõ để khác biệt cùng hành động.",
        evidence: primaryEvidence("dai-doan-ket", 1),
      },
      {
        assumption:
          "Kết quả cuối cùng quan trọng hơn cách cả nhóm đi đến đó.",
        finding:
          "Một kết quả chung bền hơn khi mỗi người nhìn thấy vị trí và trách nhiệm của mình trong đó.",
        reframe:
          "Thành công tập thể cần được xây bằng sự tham gia, không chỉ ghép từ các phần việc riêng lẻ.",
        evidence: primaryEvidence("dai-doan-ket", 2),
      },
    ],
    returnHeading: "Đưa người giỏi trở lại nhịp chung",
    returnSummary:
      "Bạn không cần làm giảm năng lực cá nhân. Điều cần thay đổi là cách năng lực ấy kết nối với mục tiêu, trách nhiệm và những người còn lại.",
    presentLenses: [
      {
        title: "Nói rõ mục tiêu chung",
        summary:
          "Đặt kết quả cả nhóm cần đạt lên trước cách làm riêng của từng người.",
      },
      {
        title: "Thiết kế điểm phối hợp",
        summary:
          "Chọn những thời điểm bắt buộc phải chia sẻ tiến độ, quyết định và trở ngại.",
      },
      {
        title: "Ghi nhận cả đóng góp lẫn kết nối",
        summary:
          "Đánh giá chất lượng phần việc cùng khả năng giúp tập thể tiến lên.",
      },
    ],
    relatedCaseSlugs: [
      "bat-dong-khi-chay-deadline",
      "thanh-tich-cua-nhom-cong-cua-ai",
    ],
    featured: true,
  },
  {
    slug: "mot-nguoi-ganh-het-cong-viec",
    category: "study-teamwork",
    title: "Khi một người gánh gần hết công việc",
    shortPrompt:
      "Một thành viên liên tục làm thay để cứu tiến độ, còn cả nhóm dần phụ thuộc.",
    context:
      "Deadline đến gần và một thành viên có năng lực nhất âm thầm nhận thêm việc của mọi người. Dự án vẫn chạy, nhưng người ấy kiệt sức, các thành viên khác mất cơ hội chịu trách nhiệm và nhóm không còn biết ai thực sự làm chủ phần nào.",
    openingQuestion:
      "Làm thay để cứu nhóm là trách nhiệm, hay đang khiến trách nhiệm biến mất?",
    primaryTrace: "dao-duc-trach-nhiem",
    supportingTrace: "dai-doan-ket",
    optionalPerspective: [
      "Cứ hoàn thành trước, phân công tính sau",
      "Dừng lại để trả trách nhiệm về đúng người",
    ],
    reveals: [
      {
        assumption:
          "Người có khả năng hơn nên tự nhiên làm nhiều hơn để bảo đảm kết quả.",
        finding:
          "Tinh thần trách nhiệm không chỉ nằm ở lượng việc nhận về, mà còn ở cách mỗi người rèn năng lực tự chịu phần mình.",
        reframe:
          "Cứu tiến độ hôm nay có thể làm suy yếu khả năng tự đứng vững của cả nhóm ngày mai.",
        evidence: primaryEvidence("dao-duc-trach-nhiem", 0),
      },
      {
        assumption:
          "Miễn sản phẩm xong thì cách làm bên trong không còn quan trọng.",
        finding:
          "Một tập thể cần nhìn thẳng vào cách phân công và sửa lối làm việc khiến trách nhiệm bị dồn lệch.",
        reframe:
          "Kết quả tốt không bù được một quy trình khiến một người kiệt sức và những người khác đứng ngoài.",
        evidence: primaryEvidence("dao-duc-trach-nhiem", 1),
      },
      {
        assumption:
          "Trách nhiệm thuộc về người chủ động nhất, không phải tất cả mọi người.",
        finding:
          "Trách nhiệm trở thành sức mạnh khi nó là chuẩn mực tự thân của từng thành viên.",
        reframe:
          "Giúp nhóm không đồng nghĩa với làm thay; đôi khi là buộc mỗi người nhận lại phần việc của mình.",
        evidence: primaryEvidence("dao-duc-trach-nhiem", 2),
      },
    ],
    returnHeading: "Cứu dự án mà không làm thay cả nhóm",
    returnSummary:
      "Tiến độ cần được bảo vệ, nhưng năng lực chịu trách nhiệm của từng người cũng vậy. Một giải pháp tốt phải giữ được cả hai.",
    presentLenses: [
      {
        title: "Hiển thị đúng tải công việc",
        summary:
          "Đưa mọi phần việc và người chịu trách nhiệm ra công khai thay vì cứu âm thầm.",
      },
      {
        title: "Hỗ trợ có giới hạn",
        summary:
          "Giúp tháo nút thắt nhưng không nhận luôn quyền sở hữu phần việc của người khác.",
      },
      {
        title: "Chốt lại trách nhiệm sau khủng hoảng",
        summary:
          "Sau deadline, sửa cách phân công để tình trạng gánh thay không lặp lại.",
      },
    ],
    relatedCaseSlugs: [
      "chia-cong-khong-cong-bang",
      "trach-nhiem-truoc-van-de-chung",
    ],
  },
  {
    slug: "bat-dong-khi-chay-deadline",
    category: "study-teamwork",
    title: "Bất đồng giữa lúc chạy deadline",
    shortPrompt:
      "Hai hướng làm đều có lý, nhưng thời gian chỉ còn đủ để chọn một.",
    context:
      "Nhóm đang ở chặng cuối thì nảy sinh hai phương án trái ngược. Mỗi bên đều có lý lẽ và đều lo phương án kia làm hỏng kết quả. Cuộc trao đổi nhanh chóng chuyển từ tranh luận cách làm sang bảo vệ cái tôi.",
    openingQuestion:
      "Khi không còn thời gian để tất cả đồng ý, nhóm nên dựa vào điều gì để quyết định?",
    primaryTrace: "dai-doan-ket",
    supportingTrace: "dao-duc-trach-nhiem",
    optionalPerspective: [
      "Chọn nhanh theo ý kiến của số đông",
      "Dừng lại để xác định tiêu chí chung",
    ],
    reveals: [
      {
        assumption:
          "Đoàn kết nghĩa là tránh tranh luận để giữ không khí yên ổn.",
        finding:
          "Một hướng chung chỉ có ý nghĩa khi nó xử lý được khác biệt đang tồn tại, không phải che chúng đi.",
        reframe:
          "Bất đồng không phải vấn đề chính; thiếu một mục tiêu và tiêu chí chung mới khiến bất đồng thành chia rẽ.",
        evidence: primaryEvidence("dai-doan-ket", 0),
      },
      {
        assumption:
          "Bên đông người hơn tự nhiên đại diện cho lợi ích chung.",
        finding:
          "Sự quy tụ cần một mục tiêu đủ rộng để nhiều vị trí nhận ra phần mình trong quyết định.",
        reframe:
          "Số đông giúp chốt lựa chọn, nhưng lý do chung mới giúp những người không thắng vẫn cùng thực hiện.",
        evidence: primaryEvidence("dai-doan-ket", 1),
      },
      {
        assumption:
          "Sau khi quyết định, những ý kiến còn lại không cần được nhắc đến nữa.",
        finding:
          "Một quyết định tập thể mạnh khi nó biến đồng thuận tối thiểu thành hành động có trách nhiệm.",
        reframe:
          "Chốt phương án là điểm bắt đầu của phối hợp, không phải chiến thắng của một phe.",
        evidence: primaryEvidence("dai-doan-ket", 2),
      },
    ],
    returnHeading: "Đưa tranh luận trở lại vấn đề chung",
    returnSummary:
      "Nhóm không cần đạt đồng thuận tuyệt đối. Nhóm cần một tiêu chí chung đủ rõ để chọn, cam kết và cùng chịu kết quả.",
    presentLenses: [
      {
        title: "Tách người khỏi phương án",
        summary:
          "Phản biện lựa chọn bằng tiêu chí, không gắn lựa chọn với giá trị của người đề xuất.",
      },
      {
        title: "Chốt tiêu chí trước khi bỏ phiếu",
        summary:
          "Thống nhất điều gì quan trọng nhất: thời gian, chất lượng hay mức rủi ro.",
      },
      {
        title: "Phân công lại sau quyết định",
        summary:
          "Để cả người không được chọn vẫn có vai trò rõ trong phương án cuối.",
      },
    ],
    relatedCaseSlugs: [
      "nhom-gioi-nhung-khong-hop-tac",
      "thoa-hiep-den-dau",
    ],
  },
  {
    slug: "thanh-vien-yeu-bi-bo-lai",
    category: "study-teamwork",
    title: "Khi thành viên yếu bị bỏ lại",
    shortPrompt:
      "Cả nhóm tăng tốc bằng cách giao phần ít quan trọng nhất cho người chậm hơn.",
    context:
      "Một thành viên học chậm và thường cần giải thích thêm. Để bảo đảm điểm số, nhóm dần loại bạn ấy khỏi các quyết định quan trọng, chỉ giao việc phụ và nói rằng đây là cách hiệu quả nhất cho tất cả.",
    openingQuestion:
      "Hiệu quả của nhóm có còn trọn vẹn nếu một người không còn cơ hội tiến bộ?",
    primaryTrace: "con-nguoi",
    supportingTrace: "dai-doan-ket",
    optionalPerspective: [
      "Ưu tiên kết quả chung trong thời gian ngắn",
      "Giữ một phần cơ hội học thật cho người yếu hơn",
    ],
    reveals: [
      {
        assumption:
          "Năng lực hiện tại quyết định một người xứng đáng tham gia đến đâu.",
        finding:
          "Giá trị và quyền được tham gia của con người không thể bị thu gọn vào một kết quả nhất thời.",
        reframe:
          "Điểm xuất phát thấp không phải lý do để tước đi vị trí của một người trong tập thể.",
        evidence: primaryEvidence("con-nguoi", 0),
      },
      {
        assumption:
          "Đào tạo người chậm là việc riêng của giảng viên, không phải của nhóm.",
        finding:
          "Sự phát triển con người cần một môi trường trao cơ hội học, thử và được hướng dẫn.",
        reframe:
          "Nhóm không chỉ tạo sản phẩm; cách nhóm làm việc cũng đang tạo ra hoặc thu hẹp năng lực của từng người.",
        evidence: primaryEvidence("con-nguoi", 1),
      },
      {
        assumption:
          "Một người đóng góp ít hôm nay sẽ luôn là gánh nặng về sau.",
        finding:
          "Đầu tư vào con người là một lựa chọn dài hạn, không thể đo chỉ bằng tốc độ tức thời.",
        reframe:
          "Câu hỏi nên là cần điều kiện gì để người ấy đóng góp tốt hơn, không phải loại họ khỏi phần việc có ý nghĩa.",
        evidence: primaryEvidence("con-nguoi", 2),
      },
    ],
    returnHeading: "Giữ tiến độ và vẫn giữ cơ hội phát triển",
    returnSummary:
      "Không phải mọi việc đều có thể giao cho người đang yếu hơn. Nhưng mỗi người vẫn cần một phần việc thật, hỗ trợ thật và tiêu chí tiến bộ rõ ràng.",
    presentLenses: [
      {
        title: "Giao việc vừa sức nhưng có ý nghĩa",
        summary:
          "Chọn phần việc ảnh hưởng thật đến sản phẩm thay vì một nhiệm vụ tượng trưng.",
      },
      {
        title: "Ghép hỗ trợ với quyền tự làm",
        summary:
          "Cho ví dụ, phản hồi và mốc kiểm tra nhưng không làm thay toàn bộ.",
      },
      {
        title: "Đo tiến bộ, không chỉ đo tốc độ",
        summary:
          "Nhìn vào mức trưởng thành qua từng vòng thay vì đóng khung bằng lần đầu.",
      },
    ],
    relatedCaseSlugs: ["nguoi-cham-tien-bo", "mot-nguoi-ganh-het-cong-viec"],
  },
  {
    slug: "chia-cong-khong-cong-bang",
    category: "study-teamwork",
    title: "Chia công và chia điểm không công bằng",
    shortPrompt:
      "Mức đóng góp khác nhau nhưng cả nhóm đang nhận cùng một phần ghi nhận.",
    context:
      "Dự án kết thúc với kết quả tốt, nhưng một số người làm nhiều phần khó trong khi vài người chỉ xuất hiện ở cuối. Khi phải tự đánh giá đóng góp, nhóm ngại nói thật vì sợ mất hòa khí và ảnh hưởng quan hệ.",
    openingQuestion:
      "Giữ hòa khí bằng cách chia đều có thực sự công bằng với tập thể không?",
    primaryTrace: "dao-duc-trach-nhiem",
    supportingTrace: "con-nguoi",
    optionalPerspective: [
      "Chia đều để tránh xung đột",
      "Phân biệt rõ mức đóng góp dù cuộc nói chuyện khó chịu",
    ],
    reveals: [
      {
        assumption:
          "Đối xử giống nhau trong mọi trường hợp là cách công bằng nhất.",
        finding:
          "Trách nhiệm đòi hỏi mỗi người tự nhìn đúng phần mình đã làm và chưa làm.",
        reframe:
          "Công bằng không chỉ là kết quả được chia thế nào, mà còn là sự trung thực với quá trình.",
        evidence: primaryEvidence("dao-duc-trach-nhiem", 0),
      },
      {
        assumption:
          "Nói rõ thiếu sót sẽ phá hỏng đoàn kết của nhóm.",
        finding:
          "Một tập thể trưởng thành cần có khả năng tự phê bình và sửa cách làm việc.",
        reframe:
          "Im lặng có thể giữ yên một buổi họp nhưng làm bất công lặp lại ở dự án sau.",
        evidence: primaryEvidence("dao-duc-trach-nhiem", 1),
      },
      {
        assumption:
          "Chỉ người làm ít mới phải chịu trách nhiệm về sự chênh lệch.",
        finding:
          "Chuẩn mực trách nhiệm thuộc về cả cách nhóm phân công, theo dõi và phản hồi.",
        reframe:
          "Đánh giá cuối kỳ không thể sửa hết một quy trình đã để đóng góp trở nên vô hình.",
        evidence: primaryEvidence("dao-duc-trach-nhiem", 2),
      },
    ],
    returnHeading: "Nói thật về đóng góp mà không hạ thấp con người",
    returnSummary:
      "Nhóm có thể phân biệt mức đóng góp nhưng vẫn tôn trọng từng thành viên, nếu đánh giá dựa trên dữ kiện và mở đường cho lần làm tốt hơn.",
    presentLenses: [
      {
        title: "Dùng dấu vết công việc",
        summary:
          "Dựa vào nhiệm vụ, phiên bản và mốc bàn giao thay vì ấn tượng cá nhân.",
      },
      {
        title: "Tách đánh giá khỏi xúc phạm",
        summary:
          "Nói về hành vi và cam kết cụ thể, không gắn nhãn phẩm chất con người.",
      },
      {
        title: "Sửa quy trình cho lần sau",
        summary:
          "Chốt cách phân công và kiểm tra sớm để đóng góp không chỉ lộ ra ở cuối.",
      },
    ],
    relatedCaseSlugs: [
      "mot-nguoi-ganh-het-cong-viec",
      "thanh-tich-cua-nhom-cong-cua-ai",
    ],
  },
  {
    slug: "nguoi-lanh-dao-khong-nhan-loi",
    category: "leadership-responsibility",
    title: "Khi người dẫn dắt không nhận sai",
    shortPrompt:
      "Một quyết định sai gây hậu quả, nhưng người đứng đầu đẩy lỗi xuống thành viên.",
    context:
      "Trưởng nhóm chọn một hướng làm dù đã được cảnh báo về rủi ro. Khi phương án thất bại, bạn ấy giải thích rằng thành viên thực hiện chưa tốt và tránh nhắc đến quyết định ban đầu của mình.",
    openingQuestion:
      "Một người còn có thể dẫn dắt nếu luôn bảo vệ hình ảnh của mình trước sự thật không?",
    primaryTrace: "dao-duc-trach-nhiem",
    supportingTrace: "con-nguoi",
    optionalPerspective: [
      "Giữ uy tín lãnh đạo bằng cách xử lý nội bộ",
      "Công khai phần trách nhiệm của người ra quyết định",
    ],
    reveals: [
      {
        assumption:
          "Lãnh đạo phải luôn tỏ ra chắc chắn và không được để lộ sai lầm.",
        finding:
          "Tư cách của người dẫn dắt được thể hiện qua khả năng tự yêu cầu mình trước khi yêu cầu người khác.",
        reframe:
          "Nhận sai không làm mất vai trò; né tránh trách nhiệm mới làm mất niềm tin.",
        evidence: primaryEvidence("dao-duc-trach-nhiem", 0),
      },
      {
        assumption:
          "Chỉ cần sửa kết quả, không cần nhìn lại cách người đứng đầu ra quyết định.",
        finding:
          "Sửa lối làm việc bắt đầu bằng việc gọi đúng nguyên nhân và tự phê bình có căn cứ.",
        reframe:
          "Nếu quyền quyết định không đi cùng trách nhiệm giải trình, lỗi cũ sẽ trở lại dưới tên mới.",
        evidence: primaryEvidence("dao-duc-trach-nhiem", 1),
      },
      {
        assumption:
          "Uy tín đến từ việc không bao giờ sai trước tập thể.",
        finding:
          "Uy tín bền hơn khi lời nói, quyết định và trách nhiệm cá nhân thống nhất với nhau.",
        reframe:
          "Một lời nhận lỗi có giá trị khi nó kéo theo thay đổi trong cách làm, không chỉ là câu xin lỗi.",
        evidence: primaryEvidence("dao-duc-trach-nhiem", 2),
      },
    ],
    returnHeading: "Biến nhận lỗi thành năng lực lãnh đạo",
    returnSummary:
      "Người dẫn dắt cần nói rõ phần quyết định thuộc về mình, bảo vệ thành viên khỏi việc gánh thay và cho thấy điều gì sẽ thay đổi sau sai lầm.",
    presentLenses: [
      {
        title: "Nhận đúng phần quyết định",
        summary:
          "Phân biệt lỗi trong chỉ đạo với lỗi trong thực hiện trước khi quy trách nhiệm.",
      },
      {
        title: "Nói rõ tác động",
        summary:
          "Không dừng ở xin lỗi; xác nhận hậu quả mà tập thể đã phải chịu.",
      },
      {
        title: "Công bố thay đổi cụ thể",
        summary:
          "Cho mọi người biết quy trình ra quyết định nào sẽ được sửa ở lần tiếp theo.",
      },
    ],
    relatedCaseSlugs: ["noi-that-khi-khong-ai-biet", "chia-cong-khong-cong-bang"],
    featured: true,
  },
  {
    slug: "quyet-dinh-de-lam-nhung-sai",
    category: "leadership-responsibility",
    title: "Quyết định dễ làm nhưng biết là sai",
    shortPrompt:
      "Một lối tắt giúp cả nhóm đạt mục tiêu, còn hậu quả có thể không ai phát hiện.",
    context:
      "Nhóm có thể sao chép một phần nội dung cũ để kịp hạn. Khả năng bị phát hiện rất thấp và kết quả trước mắt gần như chắc chắn tốt hơn, nhưng mọi người đều hiểu cách làm ấy không trung thực.",
    openingQuestion:
      "Nếu không ai kiểm tra, điều gì còn khiến ta phải chọn cách khó hơn?",
    primaryTrace: "dao-duc-trach-nhiem",
    supportingTrace: "dai-doan-ket",
    optionalPerspective: [
      "Chấp nhận lối tắt để bảo vệ kết quả chung",
      "Chấp nhận kết quả thấp hơn để giữ nguyên tắc",
    ],
    reveals: [
      {
        assumption:
          "Một lựa chọn chỉ sai khi có người phát hiện và xử phạt.",
        finding:
          "Đạo đức bắt đầu từ yêu cầu tự thân đối với hành vi, kể cả khi không có giám sát.",
        reframe:
          "Câu hỏi quan trọng không phải có bị bắt hay không, mà là ta đang trở thành người thế nào qua lựa chọn ấy.",
        evidence: primaryEvidence("dao-duc-trach-nhiem", 0),
      },
      {
        assumption:
          "Áp lực tiến độ đủ để biện minh cho một cách làm thiếu trung thực.",
        finding:
          "Khó khăn cần được xử lý bằng việc sửa cách tổ chức, không phải hạ chuẩn trách nhiệm.",
        reframe:
          "Lối tắt giải quyết một deadline nhưng có thể biến thành thói quen mỗi khi tập thể gặp áp lực.",
        evidence: primaryEvidence("dao-duc-trach-nhiem", 1),
      },
      {
        assumption:
          "Lợi ích của tập thể luôn đứng cao hơn nguyên tắc cá nhân.",
        finding:
          "Lợi ích chung không bền nếu được xây trên hành vi mà từng người đều biết là không đúng.",
        reframe:
          "Bảo vệ tập thể đôi khi là từ chối một kết quả đẹp nhưng làm suy yếu chuẩn mực bên trong.",
        evidence: primaryEvidence("dao-duc-trach-nhiem", 2),
      },
    ],
    returnHeading: "Chọn điều đúng khi lối tắt đang rất gần",
    returnSummary:
      "Nhóm cần một phương án khả thi hơn là lời kêu gọi đạo đức chung chung: thu hẹp phạm vi, xin gia hạn hoặc làm ít hơn nhưng làm thật.",
    presentLenses: [
      {
        title: "Gọi đúng lối tắt",
        summary:
          "Nói rõ điều gì đang bị vi phạm thay vì dùng áp lực để làm nó mơ hồ.",
      },
      {
        title: "Giảm tham vọng, không giảm chuẩn",
        summary:
          "Cắt bớt phạm vi để phần còn lại vẫn là công việc trung thực của nhóm.",
      },
      {
        title: "Chia sẻ hậu quả quyết định",
        summary:
          "Để cả nhóm cùng chịu kết quả thay vì đẩy người phản đối vào thế đơn độc.",
      },
    ],
    relatedCaseSlugs: ["noi-that-khi-khong-ai-biet", "im-lang-truoc-sai-pham"],
  },
  {
    slug: "thanh-tich-cua-nhom-cong-cua-ai",
    category: "leadership-responsibility",
    title: "Thành tích của nhóm được tính cho ai?",
    shortPrompt:
      "Người đại diện được khen ngợi, còn đóng góp phía sau dần biến mất.",
    context:
      "Dự án thành công và người thuyết trình nhận phần lớn lời khen từ giảng viên. Bạn ấy không nói sai, nhưng cũng không chủ động nhắc đến những người làm nghiên cứu, thiết kế và xử lý các phần khó phía sau.",
    openingQuestion:
      "Một người có thể nhận thành tích chung đến đâu trước khi sự ghi nhận trở thành chiếm hữu?",
    primaryTrace: "dai-doan-ket",
    supportingTrace: "dao-duc-trach-nhiem",
    optionalPerspective: [
      "Người đại diện xứng đáng nhận phần nổi bật hơn",
      "Thành tích phải phản ánh toàn bộ mạng lưới đóng góp",
    ],
    reveals: [
      {
        assumption:
          "Người xuất hiện trước công chúng tự nhiên là người tạo ra thành công.",
        finding:
          "Một kết quả chung hình thành khi nhiều vai trò được quy tụ quanh mục tiêu mà không vai trò nào tự đủ.",
        reframe:
          "Khả năng đại diện là một đóng góp, không phải quyền sở hữu toàn bộ thành quả.",
        evidence: primaryEvidence("dai-doan-ket", 0),
      },
      {
        assumption:
          "Ghi nhận từng người sẽ làm câu chuyện thành tích bớt rõ ràng.",
        finding:
          "Sức mạnh tập thể nằm ở khả năng làm cho các lực lượng khác nhau cùng được nhìn thấy trong mục tiêu chung.",
        reframe:
          "Một câu chuyện ngắn vẫn có thể trung thực nếu người đại diện chỉ rõ mình đứng trên đóng góp của ai.",
        evidence: primaryEvidence("dai-doan-ket", 1),
      },
      {
        assumption:
          "Sau khi đạt kết quả, cách chia sự ghi nhận không còn ảnh hưởng đến nhóm.",
        finding:
          "Ý nghĩa của thành quả chung phụ thuộc cả vào việc nó củng cố hay làm rạn nứt quan hệ giữa những người tạo ra nó.",
        reframe:
          "Ghi nhận công bằng không chỉ trả lại quá khứ; nó quyết định ai còn muốn đóng góp ở lần sau.",
        evidence: primaryEvidence("dai-doan-ket", 2),
      },
    ],
    returnHeading: "Kể lại thành công như một thành quả chung",
    returnSummary:
      "Người đại diện không cần thu nhỏ vai trò của mình. Điều cần làm là đặt vai trò ấy đúng trong chuỗi đóng góp đã tạo nên kết quả.",
    presentLenses: [
      {
        title: "Nêu tên đóng góp cụ thể",
        summary:
          "Gắn từng phần nổi bật với người hoặc nhóm đã thực sự làm ra nó.",
      },
      {
        title: "Chia quyền xuất hiện",
        summary:
          "Để nhiều thành viên cùng trình bày, trả lời hoặc đại diện ở các thời điểm khác nhau.",
      },
      {
        title: "Thống nhất cách ghi nhận từ đầu",
        summary:
          "Không chờ đến lúc được khen mới tranh luận ai xứng đáng được nhắc tới.",
      },
    ],
    relatedCaseSlugs: [
      "chia-cong-khong-cong-bang",
      "nhom-gioi-nhung-khong-hop-tac",
    ],
  },
  {
    slug: "noi-that-khi-khong-ai-biet",
    category: "leadership-responsibility",
    title: "Nói thật khi không ai có thể biết",
    shortPrompt:
      "Bạn phát hiện một sai sót có lợi cho mình và hoàn toàn có thể im lặng.",
    context:
      "Điểm số của bạn được nhập cao hơn thực tế do một lỗi nhỏ. Không ai khác biết, không có dấu hiệu hệ thống sẽ kiểm tra lại và việc báo lỗi có thể khiến kết quả cá nhân của bạn giảm đáng kể.",
    openingQuestion:
      "Sự trung thực còn có ý nghĩa gì khi chỉ chính mình biết sự thật?",
    primaryTrace: "dao-duc-trach-nhiem",
    supportingTrace: "con-nguoi",
    optionalPerspective: [
      "Giữ im lặng vì lỗi không do mình tạo ra",
      "Chủ động báo lại dù chịu thiệt",
    ],
    reveals: [
      {
        assumption:
          "Ta chỉ chịu trách nhiệm cho lỗi do chính mình gây ra.",
        finding:
          "Tư cách thể hiện ở cách ta phản ứng với lợi ích không đúng, không chỉ ở việc ai tạo ra sai sót.",
        reframe:
          "Không sửa một điều mình biết sai cũng là một lựa chọn có trách nhiệm đạo đức.",
        evidence: primaryEvidence("dao-duc-trach-nhiem", 0),
      },
      {
        assumption:
          "Một sai lệch nhỏ không ảnh hưởng ai nên không cần làm lớn chuyện.",
        finding:
          "Sửa lối làm việc bắt đầu từ sự thật cụ thể, kể cả khi nó bất tiện và không tạo tiếng vang.",
        reframe:
          "Điều nhỏ hôm nay đang đặt ra chuẩn cho cách ta xử lý lợi ích lớn hơn ngày mai.",
        evidence: primaryEvidence("dao-duc-trach-nhiem", 1),
      },
      {
        assumption:
          "Trung thực chỉ là quy tắc bên ngoài để hệ thống vận hành.",
        finding:
          "Đạo đức là năng lực tự điều chỉnh hành vi ngay cả khi không có người buộc ta phải làm đúng.",
        reframe:
          "Giá trị của lời nói thật nằm ở việc nó không phụ thuộc vào khả năng bị phát hiện.",
        evidence: primaryEvidence("dao-duc-trach-nhiem", 2),
      },
    ],
    returnHeading: "Chọn sự thật khi nó khiến mình mất lợi thế",
    returnSummary:
      "Bạn không cần biến việc báo lỗi thành một màn thể hiện. Chỉ cần đưa thông tin đúng đến đúng người và chấp nhận kết quả được sửa lại.",
    presentLenses: [
      {
        title: "Xác nhận dữ kiện trước",
        summary:
          "Kiểm tra chắc chắn sai sót thay vì phản ứng chỉ dựa trên cảm giác.",
      },
      {
        title: "Báo qua kênh phù hợp",
        summary:
          "Nói trực tiếp với người có thể sửa lỗi, không biến nó thành câu chuyện công khai.",
      },
      {
        title: "Chấp nhận phần thiệt chính đáng",
        summary:
          "Không dùng việc mình vô can ban đầu để giữ một lợi ích mà mình biết là sai.",
      },
    ],
    relatedCaseSlugs: ["quyet-dinh-de-lam-nhung-sai", "im-lang-truoc-sai-pham"],
  },
  {
    slug: "ky-luat-va-long-tin",
    category: "leadership-responsibility",
    title: "Kỷ luật có thể tồn tại cùng lòng tin?",
    shortPrompt:
      "Nhóm muốn siết quy định sau nhiều lần trễ hạn, nhưng sợ biến mọi người thành đối tượng bị giám sát.",
    context:
      "Một số thành viên liên tục trễ cam kết khiến dự án chậm. Trưởng nhóm đề xuất kiểm tra dày hơn và phạt rõ ràng, trong khi những người khác lo cách đó sẽ tạo cảm giác nghi ngờ và làm mọi người chỉ đối phó.",
    openingQuestion:
      "Làm sao đặt kỷ luật mà không biến quan hệ hợp tác thành kiểm soát?",
    primaryTrace: "dao-duc-trach-nhiem",
    supportingTrace: "dai-doan-ket",
    optionalPerspective: [
      "Siết quy định để bảo vệ tiến độ",
      "Ưu tiên trao quyền để giữ lòng tin",
    ],
    reveals: [
      {
        assumption:
          "Kỷ luật chỉ có hiệu lực khi đi kèm sự giám sát chặt và hình phạt.",
        finding:
          "Nền tảng sâu hơn của kỷ luật là khả năng tự yêu cầu mình thực hiện điều đã cam kết.",
        reframe:
          "Quy định bên ngoài cần giúp hình thành trách nhiệm bên trong, không thay thế nó mãi mãi.",
        evidence: primaryEvidence("dao-duc-trach-nhiem", 0),
      },
      {
        assumption:
          "Có quy định rõ thì không cần bàn về nguyên nhân trễ hạn.",
        finding:
          "Sửa cách làm việc đòi hỏi nhìn vào cả hành vi, điều kiện và cơ chế đang tạo ra sai lệch.",
        reframe:
          "Kỷ luật chỉ xử lý biểu hiện sẽ khiến nhóm giỏi che giấu hơn chứ chưa chắc làm tốt hơn.",
        evidence: primaryEvidence("dao-duc-trach-nhiem", 1),
      },
      {
        assumption:
          "Lòng tin nghĩa là không cần kiểm tra nhau.",
        finding:
          "Trách nhiệm bền vững cần lời hứa, hành động và khả năng giải trình đi cùng nhau.",
        reframe:
          "Một mốc kiểm tra minh bạch có thể bảo vệ lòng tin nếu nó áp dụng công bằng và giúp đỡ đúng lúc.",
        evidence: primaryEvidence("dao-duc-trach-nhiem", 2),
      },
    ],
    returnHeading: "Đặt kỷ luật để nuôi trách nhiệm",
    returnSummary:
      "Nhóm cần ít quy tắc nhưng rõ mục đích, có cơ hội báo khó sớm và có hệ quả nhất quán khi cam kết bị bỏ qua.",
    presentLenses: [
      {
        title: "Giải thích điều quy tắc bảo vệ",
        summary:
          "Liên kết mỗi mốc kiểm tra với tiến độ hoặc quyền lợi chung, không chỉ quyền của trưởng nhóm.",
      },
      {
        title: "Cho phép báo khó trước hạn",
        summary:
          "Phân biệt người chủ động xin hỗ trợ với người im lặng rồi bỏ cam kết.",
      },
      {
        title: "Áp dụng hệ quả nhất quán",
        summary:
          "Không nương tay theo quan hệ và cũng không phạt vượt quá tác động thực tế.",
      },
    ],
    relatedCaseSlugs: [
      "nguoi-lanh-dao-khong-nhan-loi",
      "trach-nhiem-truoc-van-de-chung",
    ],
  },
  {
    slug: "loi-ich-ca-nhan-va-tap-the",
    category: "conflicting-interests",
    title: "Khi lợi ích cá nhân va vào mục tiêu chung",
    shortPrompt:
      "Một lựa chọn tốt cho bạn lại làm cả nhóm khó đạt kết quả đã cam kết.",
    context:
      "Bạn nhận được một cơ hội cá nhân quan trọng đúng vào giai đoạn nhóm cần tập trung nhất. Nếu nhận lời, bạn có lợi thế rõ rệt cho tương lai, nhưng phần việc còn lại sẽ dồn sang những người đã cùng cam kết từ đầu.",
    openingQuestion:
      "Một mục tiêu chung có quyền đòi hỏi cá nhân hy sinh đến mức nào?",
    primaryTrace: "dai-doan-ket",
    supportingTrace: "dao-duc-trach-nhiem",
    optionalPerspective: [
      "Ưu tiên cơ hội không chắc sẽ quay lại",
      "Giữ trọn cam kết với tập thể hiện tại",
    ],
    reveals: [
      {
        assumption:
          "Đoàn kết nghĩa là cá nhân luôn phải đặt lợi ích riêng xuống sau tập thể.",
        finding:
          "Một mục tiêu chung chỉ quy tụ được lâu dài khi thừa nhận các nhu cầu khác nhau và tìm điểm có thể cùng chấp nhận.",
        reframe:
          "Vấn đề không phải xóa lợi ích cá nhân, mà là thương lượng nó minh bạch với trách nhiệm đã có.",
        evidence: primaryEvidence("dai-doan-ket", 0),
      },
      {
        assumption:
          "Mỗi người tự lo cho tương lai của mình thì tập thể sẽ tự thích nghi.",
        finding:
          "Sự quy tụ cần lời hứa chung đủ rõ để từng người biết lựa chọn riêng của mình đang tác động đến ai.",
        reframe:
          "Tự do lựa chọn không tách khỏi nghĩa vụ báo sớm, bàn giao và giảm thiệt hại cho những người còn lại.",
        evidence: primaryEvidence("dai-doan-ket", 1),
      },
      {
        assumption:
          "Chỉ có hai lựa chọn: hy sinh hoàn toàn hoặc rời bỏ cam kết.",
        finding:
          "Một kết quả chung có thể được bảo vệ bằng cách biến đồng thuận thành phân công mới và hành động cụ thể.",
        reframe:
          "Giải pháp tốt thường nằm ở việc thiết kế lại trách nhiệm, không phải ép một bên mất tất cả.",
        evidence: primaryEvidence("dai-doan-ket", 2),
      },
    ],
    returnHeading: "Thương lượng lợi ích mà không trốn cam kết",
    returnSummary:
      "Bạn có thể theo đuổi cơ hội cá nhân nếu nói sớm, nhận đúng phần trách nhiệm và cùng nhóm tạo một phương án thay thế khả thi.",
    presentLenses: [
      {
        title: "Nói rõ lợi ích đang xung đột",
        summary:
          "Đừng che lựa chọn cá nhân dưới lý do mơ hồ hoặc thông báo khi đã quá muộn.",
      },
      {
        title: "Định lượng phần thiếu hụt",
        summary:
          "Chỉ ra công việc, thời gian và rủi ro nhóm sẽ phải gánh nếu bạn thay đổi cam kết.",
      },
      {
        title: "Đề xuất cách bù trách nhiệm",
        summary:
          "Bàn giao, thu hẹp vai trò hoặc hoàn thành trước phần quan trọng thay vì rời đi trắng tay.",
      },
    ],
    relatedCaseSlugs: ["thoa-hiep-den-dau", "mot-nguoi-ganh-het-cong-viec"],
  },
  {
    slug: "uu-tien-nguoi-quen",
    category: "conflicting-interests",
    title: "Ưu tiên người quen trong một quyết định chung",
    shortPrompt:
      "Bạn có quyền lựa chọn và một người thân quen đang chờ được ưu tiên.",
    context:
      "Bạn được giao chọn thành viên cho một cơ hội có giới hạn. Một người bạn thân đáp ứng mức tối thiểu nhưng không nổi bật bằng ứng viên khác. Nếu không chọn, quan hệ có thể rạn nứt; nếu chọn, bạn biết tiêu chí chung đã bị bẻ cong.",
    openingQuestion:
      "Sự tử tế với một người có thể trở thành bất công với những người còn lại không?",
    primaryTrace: "dao-duc-trach-nhiem",
    supportingTrace: "con-nguoi",
    optionalPerspective: [
      "Ưu tiên người mình hiểu và tin tưởng",
      "Giữ tiêu chí chung dù ảnh hưởng quan hệ",
    ],
    reveals: [
      {
        assumption:
          "Giúp người quen là chuyện tình cảm riêng, không liên quan đến trách nhiệm công việc.",
        finding:
          "Khi nắm quyền lựa chọn, tư cách cá nhân thể hiện ở khả năng tự giới hạn lợi ích và quan hệ riêng.",
        reframe:
          "Điều tử tế trong quan hệ cá nhân có thể trở thành đặc quyền khi dùng nguồn lực chung.",
        evidence: primaryEvidence("dao-duc-trach-nhiem", 0),
      },
      {
        assumption:
          "Chỉ cần người được chọn làm được việc thì cách lựa chọn không quan trọng.",
        finding:
          "Một quy trình cần được sửa ngay từ cách đặt tiêu chí và công khai quyết định, không chỉ nhìn kết quả cuối.",
        reframe:
          "Kết quả chấp nhận được không làm một lựa chọn thiên vị trở nên công bằng.",
        evidence: primaryEvidence("dao-duc-trach-nhiem", 1),
      },
      {
        assumption:
          "Ai ở vị trí đó cũng sẽ ưu tiên người mình biết nên đây là điều bình thường.",
        finding:
          "Chuẩn mực đạo đức có ý nghĩa chính khi nó yêu cầu ta làm khác điều có lợi và quen thuộc.",
        reframe:
          "Tính phổ biến của thiên vị không làm giảm trách nhiệm của người đang có quyền quyết định.",
        evidence: primaryEvidence("dao-duc-trach-nhiem", 2),
      },
    ],
    returnHeading: "Giữ tình cảm riêng ngoài tiêu chí chung",
    returnSummary:
      "Bạn có thể tôn trọng mối quan hệ và vẫn từ chối ưu tiên, nếu tiêu chí được công khai trước và quyết định có thể giải thích với mọi ứng viên.",
    presentLenses: [
      {
        title: "Công bố tiêu chí trước khi biết người",
        summary:
          "Khóa các điều kiện đánh giá trước khi quan hệ cá nhân tác động vào quyết định.",
      },
      {
        title: "Rút khỏi quyết định khi cần",
        summary:
          "Nhờ người độc lập đánh giá nếu quan hệ quá gần khiến tính khách quan khó bảo đảm.",
      },
      {
        title: "Giải thích bằng cùng một chuẩn",
        summary:
          "Dùng một hệ tiêu chí cho người quen và người lạ, không tạo ngoại lệ kín.",
      },
    ],
    relatedCaseSlugs: ["chia-se-tai-nguyen-khan-hiem", "chia-cong-khong-cong-bang"],
  },
  {
    slug: "chia-se-tai-nguyen-khan-hiem",
    category: "conflicting-interests",
    title: "Chia sẻ một nguồn lực đang khan hiếm",
    shortPrompt:
      "Nhiều người cùng cần một nguồn lực, nhưng không thể chia đều mà vẫn hiệu quả.",
    context:
      "Cả lớp chỉ có một thiết bị tốt cho nhiều nhóm dùng trong thời gian ngắn. Nhóm nào cũng có lý do chính đáng và việc chia đều số phút có thể khiến không ai đủ thời gian hoàn thành phần quan trọng.",
    openingQuestion:
      "Công bằng là chia bằng nhau, hay ưu tiên nơi nguồn lực tạo ra tác động lớn nhất?",
    primaryTrace: "dai-doan-ket",
    supportingTrace: "con-nguoi",
    optionalPerspective: [
      "Chia đều để mọi người có phần như nhau",
      "Ưu tiên theo mức cần thiết và tác động",
    ],
    reveals: [
      {
        assumption:
          "Mọi người nhận một phần bằng nhau thì tự nhiên sẽ đoàn kết.",
        finding:
          "Một hướng chung cần xuất phát từ mục tiêu và hoàn cảnh cụ thể của các bên, không chỉ từ phép chia hình thức.",
        reframe:
          "Bình đẳng về lượng có thể tạo bất bình đẳng về khả năng hoàn thành mục tiêu.",
        evidence: primaryEvidence("dai-doan-ket", 0),
      },
      {
        assumption:
          "Nhóm mạnh hơn nên được ưu tiên vì có khả năng tạo kết quả tốt hơn.",
        finding:
          "Sự quy tụ rộng chỉ tồn tại khi cả những nhóm yếu thế vẫn nhìn thấy quyền lợi và tiếng nói của mình.",
        reframe:
          "Hiệu quả không thể là lý do để một số người bị loại khỏi cơ hội sử dụng nguồn lực chung.",
        evidence: primaryEvidence("dai-doan-ket", 1),
      },
      {
        assumption:
          "Chỉ cần người quản lý đưa ra lịch là tranh chấp sẽ kết thúc.",
        finding:
          "Đồng thuận cần được biến thành quy tắc sử dụng, trách nhiệm bàn giao và cách xử lý khi nhu cầu thay đổi.",
        reframe:
          "Một lịch chia tốt không chỉ phân thời gian; nó tạo cách để các nhóm cùng bảo vệ nguồn lực chung.",
        evidence: primaryEvidence("dai-doan-ket", 2),
      },
    ],
    returnHeading: "Chia nguồn lực theo nguyên tắc mọi người hiểu được",
    returnSummary:
      "Nhóm cần thống nhất mục tiêu ưu tiên, bảo đảm mức tiếp cận tối thiểu và công khai lý do của mọi khác biệt trong phân bổ.",
    presentLenses: [
      {
        title: "Bảo đảm một mức tiếp cận tối thiểu",
        summary:
          "Không để nhóm nào bị loại hoàn toàn khỏi nguồn lực chung.",
      },
      {
        title: "Ưu tiên theo nhu cầu có bằng chứng",
        summary:
          "Dùng mốc công việc và mức phụ thuộc thực tế thay vì sức ảnh hưởng của người xin.",
      },
      {
        title: "Công khai lịch và lý do",
        summary:
          "Để mọi người nhìn thấy nguyên tắc, thời lượng và cách điều chỉnh khi có thay đổi.",
      },
    ],
    relatedCaseSlugs: ["uu-tien-nguoi-quen", "muc-tieu-chung-khi-loi-ich-khac-nhau"],
  },
  {
    slug: "thoa-hiep-den-dau",
    category: "conflicting-interests",
    title: "Một tập thể nên thỏa hiệp đến đâu?",
    shortPrompt:
      "Giữ mọi người ở lại có thể buộc nhóm từ bỏ phần quan trọng nhất của mục tiêu.",
    context:
      "Hai nhóm nhỏ chỉ đồng ý hợp tác nếu phương án cuối bỏ bớt những yêu cầu mà bên còn lại xem là cốt lõi. Nhượng bộ giúp dự án tiếp tục, nhưng nếu nhượng thêm, kết quả có thể không còn giải quyết vấn đề ban đầu.",
    openingQuestion:
      "Thỏa hiệp đang tạo điểm chung, hay đang làm mục tiêu chung mất ý nghĩa?",
    primaryTrace: "dai-doan-ket",
    supportingTrace: "dao-duc-trach-nhiem",
    optionalPerspective: [
      "Nhượng bộ để giữ liên minh",
      "Giữ nguyên nguyên tắc dù có người rời đi",
    ],
    reveals: [
      {
        assumption:
          "Đoàn kết càng rộng thì càng phải chấp nhận mọi yêu cầu của các bên.",
        finding:
          "Sự thống nhất cần một mục tiêu chung đủ rõ; không có mục tiêu ấy, việc đứng cùng nhau chỉ còn là hình thức.",
        reframe:
          "Thỏa hiệp có giá trị khi bảo vệ khả năng cùng hành động, không phải khi xóa lý do để hành động.",
        evidence: primaryEvidence("dai-doan-ket", 0),
      },
      {
        assumption:
          "Mọi khác biệt đều có thể giải quyết bằng cách chia đôi khoảng cách.",
        finding:
          "Một liên minh rộng có thể giữ khác biệt nhưng cần phân biệt điều linh hoạt với điều quyết định hướng đi.",
        reframe:
          "Không phải vấn đề nào cũng có điểm giữa công bằng; đôi khi cần thống nhất thứ tự ưu tiên.",
        evidence: primaryEvidence("dai-doan-ket", 1),
      },
      {
        assumption:
          "Khi đã đạt thỏa thuận, không cần nói rõ phần nào mỗi bên đã từ bỏ.",
        finding:
          "Đồng thuận chỉ bền khi được chuyển thành cam kết cụ thể và mọi bên hiểu giới hạn của nó.",
        reframe:
          "Một thỏa thuận mơ hồ trì hoãn xung đột; một thỏa thuận rõ giúp tập thể biết khi nào cần thương lượng lại.",
        evidence: primaryEvidence("dai-doan-ket", 2),
      },
    ],
    returnHeading: "Thỏa hiệp mà không đánh mất điều cốt lõi",
    returnSummary:
      "Hãy tách mục tiêu không thể bỏ, cách làm có thể đổi và lợi ích có thể bù trừ. Chỉ thương lượng sau khi ba lớp đó đã rõ.",
    presentLenses: [
      {
        title: "Gọi tên giới hạn không thể vượt",
        summary:
          "Nói rõ điều gì nếu mất đi sẽ khiến dự án không còn phục vụ mục tiêu ban đầu.",
      },
      {
        title: "Mở nhiều cách đạt cùng mục tiêu",
        summary:
          "Giữ nguyên đích nhưng cho phép các bên thay đổi phương pháp và vai trò.",
      },
      {
        title: "Đặt mốc xem lại thỏa thuận",
        summary:
          "Không biến một nhượng bộ trong khủng hoảng thành luật cố định cho mọi giai đoạn.",
      },
    ],
    relatedCaseSlugs: ["loi-ich-ca-nhan-va-tap-the", "bat-dong-khi-chay-deadline"],
  },
  {
    slug: "im-lang-truoc-sai-pham",
    category: "conflicting-interests",
    title: "Im lặng để bảo vệ nhóm trước sai phạm",
    shortPrompt:
      "Nói ra có thể làm cả nhóm chịu hậu quả, nhưng im lặng khiến sai phạm được che giấu.",
    context:
      "Bạn phát hiện một thành viên đã chỉnh số liệu để kết quả dự án đẹp hơn. Nếu báo, cả nhóm có thể mất điểm và uy tín; nếu im lặng, mọi người được bảo vệ trước mắt nhưng sản phẩm chung dựa trên thông tin sai.",
    openingQuestion:
      "Bảo vệ tập thể có thể là lý do để che một điều mà tập thể đã làm sai không?",
    primaryTrace: "dao-duc-trach-nhiem",
    supportingTrace: "dai-doan-ket",
    optionalPerspective: [
      "Xử lý kín để tránh cả nhóm bị liên lụy",
      "Báo đúng sự thật dù tập thể chịu hậu quả",
    ],
    reveals: [
      {
        assumption:
          "Trung thành với nhóm nghĩa là không đưa sai phạm của nhóm ra ngoài.",
        finding:
          "Tư cách và trách nhiệm đòi hỏi mỗi người tự giữ chuẩn mực ngay cả khi lợi ích chung bị đe dọa.",
        reframe:
          "Trung thành với con người không đồng nghĩa với trung thành với một hành vi sai.",
        evidence: primaryEvidence("dao-duc-trach-nhiem", 0),
      },
      {
        assumption:
          "Che đi một lần sẽ giúp nhóm có thời gian tự sửa mà không chịu tổn thất.",
        finding:
          "Sửa lối làm việc bắt đầu từ việc nhìn đúng sai sót và chịu trách nhiệm về tác động đã tạo ra.",
        reframe:
          "Không có dữ kiện thật, việc 'tự sửa' dễ trở thành cách kéo dài im lặng.",
        evidence: primaryEvidence("dao-duc-trach-nhiem", 1),
      },
      {
        assumption:
          "Người nói ra là người làm tập thể mất đoàn kết.",
        finding:
          "Đạo đức cá nhân và trách nhiệm tập thể phải gặp nhau ở hành động bảo vệ điều đúng.",
        reframe:
          "Đoàn kết bền không được xây bằng việc cùng nhau giữ một điều sai khỏi ánh sáng.",
        evidence: primaryEvidence("dao-duc-trach-nhiem", 2),
      },
    ],
    returnHeading: "Bảo vệ con người nhưng không che hành vi sai",
    returnSummary:
      "Cách xử lý cần xác minh, cho người liên quan cơ hội giải trình và sửa dữ liệu, đồng thời báo đúng cấp có trách nhiệm nếu sai phạm không được khắc phục.",
    presentLenses: [
      {
        title: "Xác minh trước khi kết luận",
        summary:
          "Giữ bản ghi, kiểm tra nguồn và tránh biến nghi ngờ thành cáo buộc công khai.",
      },
      {
        title: "Yêu cầu sửa sai có thời hạn",
        summary:
          "Cho người liên quan cơ hội hành động nhưng không để lời hứa kéo dài vô hạn.",
      },
      {
        title: "Báo theo mức cần thiết",
        summary:
          "Đưa sự việc đến đúng người có trách nhiệm, không phát tán rộng hơn mục đích sửa sai.",
      },
    ],
    relatedCaseSlugs: ["noi-that-khi-khong-ai-biet", "noi-dung-gay-chia-re"],
  },
  {
    slug: "dam-dong-dang-cong-kich-mot-nguoi",
    category: "social-media",
    title: "Khi đám đông đang công kích một người",
    shortPrompt:
      "Một sai lầm bị lan truyền nhanh và người trong cuộc bị thu gọn thành mục tiêu công kích.",
    context:
      "Một đoạn video ngắn cho thấy một người có hành vi đáng phản đối. Hàng nghìn bình luận xuất hiện, nhiều người tìm thông tin cá nhân và kêu gọi trừng phạt trước khi bối cảnh đầy đủ được xác minh.",
    openingQuestion:
      "Phản đối một hành vi đến đâu thì biến thành phủ nhận toàn bộ một con người?",
    primaryTrace: "con-nguoi",
    supportingTrace: "dao-duc-trach-nhiem",
    optionalPerspective: [
      "Tham gia lên án để tạo áp lực",
      "Dừng lại cho đến khi có đủ bối cảnh",
    ],
    reveals: [
      {
        assumption:
          "Một hành vi xấu đủ để xác định toàn bộ giá trị của người thực hiện.",
        finding:
          "Phẩm giá và quyền của con người không biến mất chỉ vì một khoảnh khắc bị đưa ra phán xét.",
        reframe:
          "Có thể phản đối mạnh một hành vi mà không biến con người thành đối tượng bị tước mọi giới hạn bảo vệ.",
        evidence: primaryEvidence("con-nguoi", 0),
      },
      {
        assumption:
          "Trừng phạt công khai càng mạnh thì người khác càng học được bài học.",
        finding:
          "Sự phát triển con người cần khả năng học, sửa và được dẫn trở lại trách nhiệm.",
        reframe:
          "Một môi trường chỉ biết loại bỏ có thể tạo sợ hãi nhưng không chắc tạo ra sự trưởng thành.",
        evidence: primaryEvidence("con-nguoi", 1),
      },
      {
        assumption:
          "Trên mạng, mỗi bình luận cá nhân quá nhỏ để tạo hậu quả thật.",
        finding:
          "Con người vừa là mục tiêu vừa là chủ thể của xã hội; từng hành động góp phần tạo môi trường mà mọi người phải sống trong đó.",
        reframe:
          "Một lời công kích nhỏ khi nhập vào đám đông có thể trở thành áp lực vượt xa sai phạm ban đầu.",
        evidence: primaryEvidence("con-nguoi", 2),
      },
    ],
    returnHeading: "Phản đối hành vi mà không tham gia hủy hoại con người",
    returnSummary:
      "Bạn có thể từ chối lan truyền, yêu cầu bằng chứng, tập trung vào hành vi cụ thể và để việc xử lý thuộc về nơi có trách nhiệm.",
    presentLenses: [
      {
        title: "Không khuếch đại dữ liệu cá nhân",
        summary:
          "Không chia sẻ địa chỉ, trường lớp hoặc thông tin gia đình để tăng áp lực.",
      },
      {
        title: "Nói về hành vi có bằng chứng",
        summary:
          "Tránh gắn nhãn toàn bộ nhân cách từ một đoạn nội dung ngắn.",
      },
      {
        title: "Chừa đường cho sửa sai",
        summary:
          "Đòi hỏi trách nhiệm nhưng không biến trừng phạt vô hạn thành mục tiêu giải trí.",
      },
    ],
    relatedCaseSlugs: ["tin-chua-kiem-chung", "co-hoi-thu-hai"],
    featured: true,
  },
  {
    slug: "tin-chua-kiem-chung",
    category: "social-media",
    title: "Một tin chưa kiểm chứng đang lan rất nhanh",
    shortPrompt:
      "Thông tin có vẻ khẩn cấp và hữu ích, nhưng nguồn gốc vẫn chưa rõ.",
    context:
      "Bạn nhận được một bài đăng cảnh báo về sự việc nghiêm trọng trong cộng đồng. Nội dung phù hợp với điều nhiều người đang lo, đã có hàng nghìn lượt chia sẻ, nhưng không dẫn nguồn gốc và chưa có xác nhận độc lập.",
    openingQuestion:
      "Trong tình huống khẩn cấp, chia sẻ sớm là trách nhiệm hay là thêm một rủi ro?",
    primaryTrace: "dao-duc-trach-nhiem",
    supportingTrace: "dai-doan-ket",
    optionalPerspective: [
      "Chia sẻ ngay kèm lời nhắc tự kiểm chứng",
      "Chờ nguồn đáng tin dù thông tin lan chậm hơn",
    ],
    reveals: [
      {
        assumption:
          "Ý định cảnh báo tốt đủ để miễn trách nhiệm nếu thông tin hóa ra sai.",
        finding:
          "Trách nhiệm nằm cả ở cách hành động được chuẩn bị, không chỉ ở mục đích người chia sẻ tự gán cho mình.",
        reframe:
          "Muốn giúp người khác không làm giảm nghĩa vụ kiểm tra điều mình sắp khuếch đại.",
        evidence: primaryEvidence("dao-duc-trach-nhiem", 0),
      },
      {
        assumption:
          "Tin đã có nhiều người đăng lại thì độ tin cậy tự nhiên cao hơn.",
        finding:
          "Sửa lối làm việc đòi hỏi quay về nguồn, dữ kiện và quy trình kiểm tra thay vì dựa vào quán tính số đông.",
        reframe:
          "Số lượt chia sẻ đo tốc độ lan truyền, không đo chất lượng bằng chứng.",
        evidence: primaryEvidence("dao-duc-trach-nhiem", 1),
      },
      {
        assumption:
          "Một lượt chia sẻ cá nhân không đủ lớn để gây hậu quả.",
        finding:
          "Trách nhiệm đạo đức hình thành từ từng hành động nhỏ lặp lại thành chuẩn mực chung.",
        reframe:
          "Mỗi người là một mắt xích quyết định thông tin dừng lại để được kiểm tra hay tiếp tục nhân lên.",
        evidence: primaryEvidence("dao-duc-trach-nhiem", 2),
      },
    ],
    returnHeading: "Làm chậm một nhịp trước khi khuếch đại",
    returnSummary:
      "Kiểm tra nguồn đầu tiên, tìm xác nhận độc lập và nếu vẫn cần cảnh báo, nói rõ mức độ chưa chắc chắn thay vì trình bày như sự thật đã kết luận.",
    presentLenses: [
      {
        title: "Tìm nguồn đầu tiên",
        summary:
          "Không dùng một trang đăng lại khác làm bằng chứng cho nội dung ban đầu.",
      },
      {
        title: "Tách dữ kiện khỏi suy đoán",
        summary:
          "Chỉ ra phần nào đã xác nhận, phần nào là diễn giải và phần nào còn thiếu.",
      },
      {
        title: "Sửa công khai nếu đã chia sẻ sai",
        summary:
          "Đính chính ở cùng nơi và với mức rõ ràng tương xứng bài đăng trước.",
      },
    ],
    relatedCaseSlugs: ["dam-dong-dang-cong-kich-mot-nguoi", "noi-dung-gay-chia-re"],
  },
  {
    slug: "bat-dong-tren-mang",
    category: "social-media",
    title: "Khi bất đồng trên mạng thành thù địch",
    shortPrompt:
      "Một cuộc tranh luận về ý kiến đang chuyển sang chế giễu và chia phe.",
    context:
      "Hai người bắt đầu bằng một bất đồng thật về vấn đề xã hội. Sau vài lượt bình luận, bạn bè mỗi bên tham gia, cắt câu chữ khỏi bối cảnh và biến cuộc trao đổi thành cuộc thi xem phe nào hạ được đối phương.",
    openingQuestion:
      "Làm sao tiếp tục bất đồng mà không biến người khác thành kẻ thù?",
    primaryTrace: "dai-doan-ket",
    supportingTrace: "con-nguoi",
    optionalPerspective: [
      "Phản công mạnh để bảo vệ quan điểm",
      "Rút khỏi cuộc đấu phe và quay lại vấn đề",
    ],
    reveals: [
      {
        assumption:
          "Muốn giữ lập trường thì phải chứng minh phía kia hoàn toàn sai.",
        finding:
          "Một hướng chung có thể bắt đầu từ mục tiêu được chia sẻ dù cách hiểu và lợi ích còn khác nhau.",
        reframe:
          "Tìm điểm chung không buộc bạn bỏ lập trường; nó xác định điều hai bên vẫn có thể cùng bảo vệ.",
        evidence: primaryEvidence("dai-doan-ket", 0),
      },
      {
        assumption:
          "Khi đã chia phe, chỉ có chiến thắng mới kết thúc tranh luận.",
        finding:
          "Sự quy tụ rộng đòi hỏi khả năng tách mục tiêu chung khỏi khác biệt đang tồn tại giữa các lực lượng.",
        reframe:
          "Thắng một lượt bình luận có thể khiến khả năng hợp tác ngoài đời giảm đi.",
        evidence: primaryEvidence("dai-doan-ket", 1),
      },
      {
        assumption:
          "Ngôn từ gay gắt chỉ là phong cách trên mạng, không ảnh hưởng hành động chung.",
        finding:
          "Đồng thuận chỉ trở thành sức mạnh khi con người còn khả năng đứng cùng nhau sau khác biệt.",
        reframe:
          "Cách tranh luận hôm nay đang quyết định liệu ngày mai hai bên còn có thể cùng giải quyết vấn đề hay không.",
        evidence: primaryEvidence("dai-doan-ket", 2),
      },
    ],
    returnHeading: "Giữ bất đồng ở cấp độ có thể đối thoại",
    returnSummary:
      "Hãy thu hẹp về một luận điểm, hỏi điều có thể kiểm chứng và dừng khi cuộc trao đổi chỉ còn tạo khán giả thay vì tạo hiểu biết.",
    presentLenses: [
      {
        title: "Nói lại điểm mình hiểu từ phía kia",
        summary:
          "Cho thấy bạn đang phản hồi lập luận thật, không phải phiên bản dễ công kích nhất.",
      },
      {
        title: "Giới hạn một luận điểm mỗi lượt",
        summary:
          "Tránh kéo thêm lịch sử, nhân cách và phe nhóm vào câu hỏi đang bàn.",
      },
      {
        title: "Dừng trước khi thành biểu diễn",
        summary:
          "Rời cuộc trao đổi khi mục tiêu đã chuyển từ hiểu vấn đề sang làm nhục đối phương.",
      },
    ],
    relatedCaseSlugs: ["noi-dung-gay-chia-re", "khac-biet-the-he"],
  },
  {
    slug: "thanh-tich-va-hinh-anh-ca-nhan",
    category: "social-media",
    title: "Khi hình ảnh cá nhân chỉ còn là thành tích",
    shortPrompt:
      "Bạn thấy mình phải liên tục chứng minh giá trị bằng kết quả được công khai.",
    context:
      "Trang cá nhân của bạn dần chỉ còn chứng chỉ, giải thưởng và những khoảnh khắc thành công. Mỗi khi không có kết quả mới để đăng, bạn cảm thấy mình đang tụt lại và sợ người khác nhìn thấy những phần chưa hoàn thiện.",
    openingQuestion:
      "Nếu hình ảnh luôn phải hoàn hảo, con người thật còn chỗ nào để phát triển?",
    primaryTrace: "con-nguoi",
    supportingTrace: "dao-duc-trach-nhiem",
    optionalPerspective: [
      "Duy trì hình ảnh mạnh để mở cơ hội",
      "Cho phép bản thân xuất hiện cả khi chưa hoàn hảo",
    ],
    reveals: [
      {
        assumption:
          "Giá trị xã hội của một người bằng tổng thành tích có thể nhìn thấy.",
        finding:
          "Phẩm giá và giá trị con người không thể bị thu gọn vào thước đo hay hình ảnh đang được công nhận.",
        reframe:
          "Thành tích kể một phần hành trình, không có quyền đại diện toàn bộ con người.",
        evidence: primaryEvidence("con-nguoi", 0),
      },
      {
        assumption:
          "Chỉ những phần đã hoàn thiện mới xứng đáng được xuất hiện.",
        finding:
          "Phát triển con người là quá trình dài cần học tập, thử nghiệm và cả những giai đoạn chưa có kết quả đẹp.",
        reframe:
          "Che mọi bước chưa hoàn thiện có thể bảo vệ hình ảnh nhưng làm mất không gian học thật.",
        evidence: primaryEvidence("con-nguoi", 1),
      },
      {
        assumption:
          "Xây dựng thương hiệu cá nhân là chuyện riêng, không ảnh hưởng cách ta nhìn người khác.",
        finding:
          "Mỗi người vừa chịu tác động vừa góp phần tạo ra chuẩn mực đánh giá con người trong xã hội.",
        reframe:
          "Cách ta trình bày bản thân cũng có thể củng cố một môi trường nơi ai cũng bị buộc phải tỏ ra thành công.",
        evidence: primaryEvidence("con-nguoi", 2),
      },
    ],
    returnHeading: "Dùng thành tích như bằng chứng, không như căn cước",
    returnSummary:
      "Bạn vẫn có thể giới thiệu kết quả tốt, nhưng cần giữ những không gian nơi mình được học, thất bại và kết nối mà không phải biến mọi thứ thành nội dung chứng minh giá trị.",
    presentLenses: [
      {
        title: "Kể cả quá trình, không chỉ đích đến",
        summary:
          "Cho thấy điều đã học và phần còn chưa giải quyết bên cạnh kết quả cuối.",
      },
      {
        title: "Giữ một vùng không cần biểu diễn",
        summary:
          "Không biến mọi sở thích, quan hệ và nỗ lực thành tài sản cho hình ảnh công khai.",
      },
      {
        title: "Đọc người khác rộng hơn hồ sơ",
        summary:
          "Không dùng chuẩn thành tích của chính mình để thu gọn giá trị của người khác.",
      },
    ],
    relatedCaseSlugs: ["diem-so-co-dinh-nghia-con-nguoi", "ap-luc-nang-suat"],
  },
  {
    slug: "noi-dung-gay-chia-re",
    category: "social-media",
    title: "Khi nội dung gây chia rẽ đem lại lợi ích",
    shortPrompt:
      "Một bài đăng cực đoan giúp tăng tương tác dù làm các nhóm đối đầu hơn.",
    context:
      "Bạn nhận ra những nội dung nhấn mạnh xung đột, gán nhãn và buộc người xem chọn phe luôn có lượt tương tác cao hơn. Cách làm đó giúp kênh phát triển nhanh, dù cuộc thảo luận sau mỗi bài trở nên thù địch.",
    openingQuestion:
      "Nếu chia rẽ đem lại phần thưởng rõ ràng, điều gì khiến người tạo nội dung phải dừng lại?",
    primaryTrace: "dai-doan-ket",
    supportingTrace: "dao-duc-trach-nhiem",
    optionalPerspective: [
      "Tận dụng định dạng đang hiệu quả rồi điều chỉnh sau",
      "Chấp nhận tăng trưởng chậm để không nuôi chia rẽ",
    ],
    reveals: [
      {
        assumption:
          "Nêu khác biệt càng sắc thì công chúng càng hiểu rõ vấn đề.",
        finding:
          "Một mục tiêu chung chỉ xuất hiện khi khác biệt được đặt trong quan hệ với điều các bên vẫn cùng cần.",
        reframe:
          "Nội dung chỉ làm rõ đường ranh mà không làm rõ vấn đề đang biến khác biệt thành sản phẩm.",
        evidence: primaryEvidence("dai-doan-ket", 0),
      },
      {
        assumption:
          "Người xem tự chịu trách nhiệm cho cách họ phản ứng với nội dung.",
        finding:
          "Sự quy tụ hay phân rã chịu ảnh hưởng từ cách thông điệp lựa chọn mục tiêu, đối tượng và ngôn ngữ.",
        reframe:
          "Người tạo nội dung không kiểm soát mọi phản ứng, nhưng chịu trách nhiệm cho cấu trúc khuyến khích phản ứng nào.",
        evidence: primaryEvidence("dai-doan-ket", 1),
      },
      {
        assumption:
          "Miễn thông tin không sai thì cách đóng khung để tăng tương tác là vô hại.",
        finding:
          "Một kết quả chung cần được xây bằng đồng thuận và hành động, không chỉ bằng việc tập trung sự chú ý.",
        reframe:
          "Đúng dữ kiện nhưng cố ý kích hoạt đối đầu vẫn có thể làm suy yếu khả năng giải quyết vấn đề.",
        evidence: primaryEvidence("dai-doan-ket", 2),
      },
    ],
    returnHeading: "Tạo sự chú ý mà không bán đi khả năng đối thoại",
    returnSummary:
      "Nội dung vẫn có thể sắc và hấp dẫn nếu nó đặt xung đột vào một câu hỏi thật, chỉ rõ dữ kiện và mở một hướng hành động thay vì chỉ tạo phe.",
    presentLenses: [
      {
        title: "Kiểm tra điều tiêu đề đang kích hoạt",
        summary:
          "Xem nó mời người đọc hiểu vấn đề hay chỉ mời họ phẫn nộ với một nhóm.",
      },
      {
        title: "Đưa vào một điểm chung có thật",
        summary:
          "Không làm mềm xung đột, nhưng chỉ ra điều các bên cùng có nguy cơ mất.",
      },
      {
        title: "Đo chất lượng ngoài tương tác",
        summary:
          "Theo dõi mức hiểu, nguồn được mở và hành động hữu ích thay vì chỉ lượt bình luận.",
      },
    ],
    relatedCaseSlugs: ["bat-dong-tren-mang", "tin-chua-kiem-chung"],
  },
  {
    slug: "diem-so-co-dinh-nghia-con-nguoi",
    category: "human-development",
    title: "Điểm số có định nghĩa một con người?",
    shortPrompt:
      "Một kết quả thấp bắt đầu làm bạn nghi ngờ toàn bộ giá trị và khả năng của mình.",
    context:
      "Sau một kỳ thi quan trọng, bạn nhận kết quả thấp hơn rất nhiều so với kỳ vọng. Những lời so sánh từ gia đình, bạn bè và chính bản thân khiến một con số dần trở thành kết luận rằng bạn không đủ giỏi để đi tiếp.",
    openingQuestion:
      "Một kết quả có thể nói điều gì về bạn, và điều gì nó không có quyền kết luận?",
    primaryTrace: "con-nguoi",
    supportingTrace: "dao-duc-trach-nhiem",
    optionalPerspective: [
      "Xem điểm số là tín hiệu năng lực khách quan",
      "Xem điểm số là một dữ kiện trong quá trình dài hơn",
    ],
    reveals: [
      {
        assumption:
          "Một thước đo chung phản ánh đầy đủ giá trị của mọi người tham gia.",
        finding:
          "Phẩm giá và quyền phát triển của con người không phụ thuộc vào vị trí trên một bảng xếp hạng.",
        reframe:
          "Điểm số có thể mô tả một lần thể hiện, nhưng không thể cấp hay tước giá trị con người.",
        evidence: primaryEvidence("con-nguoi", 0),
      },
      {
        assumption:
          "Kết quả thấp chứng minh khả năng học của một người đã chạm giới hạn.",
        finding:
          "Giáo dục là quá trình bồi dưỡng lâu dài, nơi điều kiện học và cơ hội sửa sai có vai trò thiết yếu.",
        reframe:
          "Một kết quả nên mở ra câu hỏi cần học thế nào, không đóng lại câu hỏi có thể học được hay không.",
        evidence: primaryEvidence("con-nguoi", 1),
      },
      {
        assumption:
          "Muốn tiến bộ thì phải liên tục dùng áp lực thành tích để ép bản thân.",
        finding:
          "Phát triển con người cần cả yêu cầu, điều kiện sống và khả năng đóng góp bền vững.",
        reframe:
          "Một phương pháp chỉ tạo kết quả nhưng làm con người mất khả năng tiếp tục không phải phát triển trọn vẹn.",
        evidence: primaryEvidence("con-nguoi", 2),
      },
    ],
    returnHeading: "Đặt điểm số trở lại đúng kích thước",
    returnSummary:
      "Hãy dùng kết quả để xác định khoảng trống kiến thức và cách học tiếp, đồng thời giữ nó tách khỏi phán quyết về phẩm giá hay tiềm năng lâu dài.",
    presentLenses: [
      {
        title: "Đọc điểm theo từng năng lực",
        summary:
          "Tách phần đã hiểu, phần thiếu và lỗi do chiến lược thay vì nhìn một con số tổng.",
      },
      {
        title: "So với chính quá trình của mình",
        summary:
          "Theo dõi thay đổi qua nhiều lần học thay vì chỉ so vị trí với người khác.",
      },
      {
        title: "Giữ một mục tiêu ngoài điểm",
        summary:
          "Duy trì kỹ năng, mối quan tâm hoặc đóng góp không phụ thuộc vào bảng điểm.",
      },
    ],
    relatedCaseSlugs: ["nguoi-cham-tien-bo", "thanh-tich-va-hinh-anh-ca-nhan"],
  },
  {
    slug: "nguoi-cham-tien-bo",
    category: "human-development",
    title: "Khi một người tiến bộ quá chậm",
    shortPrompt:
      "Nỗ lực có thật nhưng kết quả thay đổi rất ít, khiến mọi người dần mất kiên nhẫn.",
    context:
      "Một thành viên đã cố gắng qua nhiều tuần nhưng vẫn cần nhiều thời gian hơn người khác để làm cùng một nhiệm vụ. Nhóm bắt đầu cho rằng đầu tư hỗ trợ thêm chỉ làm chậm tiến độ và không còn đáng công.",
    openingQuestion:
      "Ta nên kiên nhẫn đến đâu trước khi kết luận một người không thể tiến bộ?",
    primaryTrace: "con-nguoi",
    supportingTrace: "dai-doan-ket",
    optionalPerspective: [
      "Chuyển nguồn lực sang người có khả năng tiến nhanh hơn",
      "Tiếp tục đầu tư nhưng thay cách hỗ trợ",
    ],
    reveals: [
      {
        assumption:
          "Tốc độ thấp cho thấy một người có ít giá trị hơn trong tập thể.",
        finding:
          "Quyền được tôn trọng và phát triển không phụ thuộc vào việc một người theo kịp chuẩn chung nhanh đến đâu.",
        reframe:
          "Chậm hơn là thông tin về điều kiện và phương pháp, không phải phán quyết về phẩm giá.",
        evidence: primaryEvidence("con-nguoi", 0),
      },
      {
        assumption:
          "Nếu đã hướng dẫn nhiều lần mà chưa được, cách duy nhất là dừng hỗ trợ.",
        finding:
          "Bồi dưỡng con người là quá trình dài cần thay đổi cách dạy, cơ hội thực hành và mức trách nhiệm phù hợp.",
        reframe:
          "Lặp lại cùng một cách hỗ trợ không hiệu quả không chứng minh mọi cách hỗ trợ đều vô ích.",
        evidence: primaryEvidence("con-nguoi", 1),
      },
      {
        assumption:
          "Đầu tư vào người chậm luôn lấy mất cơ hội của cả tập thể.",
        finding:
          "Sự phát triển xã hội có ý nghĩa khi mở rộng khả năng đóng góp của con người, không chỉ tối ưu kết quả tức thời.",
        reframe:
          "Cần đo cả chi phí hỗ trợ và giá trị của việc thêm một người có thể tham gia bền vững.",
        evidence: primaryEvidence("con-nguoi", 2),
      },
    ],
    returnHeading: "Đổi cách hỗ trợ trước khi bỏ cuộc",
    returnSummary:
      "Đặt một mục tiêu nhỏ có thể quan sát, thay phương pháp và thống nhất mốc đánh giá lại. Kiên nhẫn không có nghĩa là hỗ trợ vô thời hạn mà không đo thay đổi.",
    presentLenses: [
      {
        title: "Thu nhỏ đơn vị tiến bộ",
        summary:
          "Đo một kỹ năng hoặc bước làm cụ thể thay vì chờ thay đổi toàn bộ cùng lúc.",
      },
      {
        title: "Đổi người hoặc cách hướng dẫn",
        summary:
          "Thử ví dụ, thực hành cặp đôi hoặc phản hồi sớm thay cho nhắc lại cùng một lời giải thích.",
      },
      {
        title: "Đặt mốc đánh giá minh bạch",
        summary:
          "Cho người học biết tiêu chí tiếp tục hỗ trợ, thay vai trò hoặc cần phương án khác.",
      },
    ],
    relatedCaseSlugs: ["thanh-vien-yeu-bi-bo-lai", "co-hoi-thu-hai"],
  },
  {
    slug: "co-hoi-thu-hai",
    category: "human-development",
    title: "Một người có xứng đáng với cơ hội thứ hai?",
    shortPrompt:
      "Một sai lầm nghiêm trọng đã xảy ra, còn người mắc lỗi nói rằng mình đã thay đổi.",
    context:
      "Một thành viên từng làm mất niềm tin của nhóm bằng cách bỏ việc và che giấu tiến độ. Sau một thời gian, bạn ấy xin quay lại, nhận lỗi và đề nghị bắt đầu từ vai trò nhỏ hơn, nhưng mọi người sợ rủi ro lặp lại.",
    openingQuestion:
      "Tha thứ có phải là quên rủi ro, và từ chối có phải là đóng cửa phát triển?",
    primaryTrace: "con-nguoi",
    supportingTrace: "dao-duc-trach-nhiem",
    optionalPerspective: [
      "Không đánh cược niềm tin của nhóm thêm lần nữa",
      "Cho một cơ hội có điều kiện để chứng minh thay đổi",
    ],
    reveals: [
      {
        assumption:
          "Một sai lầm nghiêm trọng đủ để xác định con người mãi mãi.",
        finding:
          "Phẩm giá con người và khả năng tham gia xã hội không bị xóa bỏ bởi một thời điểm thất bại.",
        reframe:
          "Không thu gọn con người vào sai lầm không có nghĩa là xóa trách nhiệm về sai lầm ấy.",
        evidence: primaryEvidence("con-nguoi", 0),
      },
      {
        assumption:
          "Nếu thật sự thay đổi, người ấy phải được trả lại ngay vị trí cũ.",
        finding:
          "Phát triển cần cơ hội học và rèn luyện theo từng bước, không phải một tuyên bố là đủ.",
        reframe:
          "Cơ hội thứ hai có thể bắt đầu nhỏ, có giới hạn và tạo bằng chứng mới cho niềm tin.",
        evidence: primaryEvidence("con-nguoi", 1),
      },
      {
        assumption:
          "Tập thể chỉ cần chọn giữa tin hoàn toàn hoặc loại bỏ hoàn toàn.",
        finding:
          "Xây dựng con người và xã hội cần điều kiện để đóng góp đi cùng trách nhiệm đối với người khác.",
        reframe:
          "Một cấu trúc kiểm chứng được có thể vừa bảo vệ nhóm vừa mở đường cho sự trưởng thành.",
        evidence: primaryEvidence("con-nguoi", 2),
      },
    ],
    returnHeading: "Cho cơ hội mà không giao lại niềm tin vô điều kiện",
    returnSummary:
      "Xác định điều cần sửa, bắt đầu bằng cam kết nhỏ, kiểm tra đều và mở rộng vai trò khi hành động mới đủ nhất quán.",
    presentLenses: [
      {
        title: "Yêu cầu nhận lỗi cụ thể",
        summary:
          "Người quay lại cần gọi đúng hành vi, tác động và trách nhiệm của mình.",
      },
      {
        title: "Bắt đầu bằng rủi ro thấp",
        summary:
          "Giao một phần việc rõ, có mốc kiểm tra và không đặt cả nhóm vào thế phụ thuộc.",
      },
      {
        title: "Mở rộng theo bằng chứng mới",
        summary:
          "Để niềm tin trở lại từ hành động lặp lại, không chỉ từ lời hứa hoặc áp lực tình cảm.",
      },
    ],
    relatedCaseSlugs: ["nguoi-cham-tien-bo", "nguoi-lanh-dao-khong-nhan-loi"],
  },
  {
    slug: "ap-luc-nang-suat",
    category: "human-development",
    title: "Khi năng suất trở thành thước đo duy nhất",
    shortPrompt:
      "Mọi phút nghỉ đều tạo cảm giác có lỗi, còn con người bị nhìn như một chuỗi đầu việc.",
    context:
      "Bạn đã quen đo ngày của mình bằng số nhiệm vụ hoàn thành. Khi làm ít hơn kế hoạch, dù vì mệt hoặc cần chăm sóc người khác, bạn thấy mình vô dụng và cố bù bằng cách kéo dài thời gian làm việc.",
    openingQuestion:
      "Một cách sống tạo ra nhiều kết quả nhưng làm con người cạn kiệt có còn là phát triển?",
    primaryTrace: "con-nguoi",
    supportingTrace: "dao-duc-trach-nhiem",
    optionalPerspective: [
      "Tăng kỷ luật để vượt qua cảm giác mệt",
      "Điều chỉnh nhịp làm việc để giữ khả năng lâu dài",
    ],
    reveals: [
      {
        assumption:
          "Giá trị của một người tăng giảm theo lượng sản phẩm tạo ra mỗi ngày.",
        finding:
          "Con người có phẩm giá và nhu cầu vượt ra ngoài vai trò tạo ra kết quả đo được.",
        reframe:
          "Năng suất là một năng lực hữu ích, không phải đơn vị đo toàn bộ giá trị sống.",
        evidence: primaryEvidence("con-nguoi", 0),
      },
      {
        assumption:
          "Muốn trưởng thành thì phải liên tục tăng tốc và chịu nhiều áp lực hơn.",
        finding:
          "Bồi dưỡng con người là quá trình lâu dài cần điều kiện học tập và phát triển bền vững.",
        reframe:
          "Tăng tốc không ngừng có thể làm mất chính khả năng học sâu và đóng góp lâu dài.",
        evidence: primaryEvidence("con-nguoi", 1),
      },
      {
        assumption:
          "Nghỉ ngơi là phần thời gian không tạo giá trị cho xã hội.",
        finding:
          "Phát triển hướng tới đời sống con người, không chỉ lượng công việc mà xã hội có thể lấy từ họ.",
        reframe:
          "Nghỉ ngơi hợp lý bảo vệ khả năng sống, học và đóng góp; nó không đối lập với trách nhiệm.",
        evidence: primaryEvidence("con-nguoi", 2),
      },
    ],
    returnHeading: "Đo hiệu quả mà không biến mình thành công cụ",
    returnSummary:
      "Giữ mục tiêu rõ, giới hạn số việc quan trọng và theo dõi cả năng lượng lẫn kết quả. Một nhịp bền vững phải cho phép bạn tiếp tục vào ngày mai.",
    presentLenses: [
      {
        title: "Chọn ít việc thật sự quan trọng",
        summary:
          "Phân biệt tiến bộ có ý nghĩa với cảm giác bận rộn do danh sách dài.",
      },
      {
        title: "Đặt giới hạn kết thúc ngày",
        summary:
          "Dùng một mốc dừng rõ để công việc không mở rộng chiếm toàn bộ đời sống.",
      },
      {
        title: "Theo dõi khả năng hồi phục",
        summary:
          "Xem giấc ngủ, sự tập trung và sức khỏe là dữ kiện của hiệu suất, không phải trở ngại cá nhân.",
      },
    ],
    relatedCaseSlugs: ["giao-duc-vi-thanh-tich", "thanh-tich-va-hinh-anh-ca-nhan"],
  },
  {
    slug: "giao-duc-vi-thanh-tich",
    category: "human-development",
    title: "Khi giáo dục chỉ còn phục vụ thành tích",
    shortPrompt:
      "Lớp đạt chỉ số đẹp nhưng người học ngày càng sợ sai và ít hiểu sâu.",
    context:
      "Một chương trình học liên tục luyện đúng dạng bài để tăng điểm kiểm tra. Kết quả thống kê cải thiện nhanh, nhưng học viên tránh câu hỏi lạ, không dám thử cách mới và quên kiến thức ngay sau kỳ đánh giá.",
    openingQuestion:
      "Một hệ thống giáo dục đạt mục tiêu đo lường nhưng làm người học ngừng tò mò có thành công không?",
    primaryTrace: "con-nguoi",
    supportingTrace: "dai-doan-ket",
    optionalPerspective: [
      "Ưu tiên kết quả đo được để bảo đảm chuẩn chung",
      "Chấp nhận chỉ số chậm hơn để giữ khả năng học thật",
    ],
    reveals: [
      {
        assumption:
          "Khi điểm số tăng, giá trị người học và chất lượng giáo dục tự nhiên tăng theo.",
        finding:
          "Giá trị con người không thể được đại diện đầy đủ bởi một hệ đo thành tích.",
        reframe:
          "Chỉ số cần phục vụ việc hiểu người học, không biến người học thành phương tiện làm đẹp chỉ số.",
        evidence: primaryEvidence("con-nguoi", 0),
      },
      {
        assumption:
          "Nhiệm vụ của giáo dục là tạo đáp án đúng nhanh nhất.",
        finding:
          "Giáo dục là công việc lâu dài nhằm bồi dưỡng khả năng suy nghĩ, trưởng thành và đóng góp.",
        reframe:
          "Dạy để qua một dạng bài có thể tạo kết quả ngắn nhưng không tạo năng lực bước vào vấn đề mới.",
        evidence: primaryEvidence("con-nguoi", 1),
      },
      {
        assumption:
          "Miễn hệ thống có nhiều người đạt chuẩn thì những người bị bỏ lại là chi phí chấp nhận được.",
        finding:
          "Phát triển xã hội cần hướng tới đời sống và khả năng của con người, không chỉ tổng số thành tích.",
        reframe:
          "Một hệ thống tốt phải hỏi ai đang tiến bộ, ai đang bị loại và chuẩn hiện tại đang tạo ra kiểu con người nào.",
        evidence: primaryEvidence("con-nguoi", 2),
      },
    ],
    returnHeading: "Để thành tích phục vụ việc học",
    returnSummary:
      "Giữ đánh giá nhưng bổ sung nhiệm vụ mở, phản hồi quá trình và cơ hội sửa. Kết quả cần giúp người học biết bước tiếp theo, không chỉ xếp họ vào vị trí.",
    presentLenses: [
      {
        title: "Đo cả cách nghĩ",
        summary:
          "Đánh giá lập luận, thử nghiệm và khả năng giải thích bên cạnh đáp án cuối.",
      },
      {
        title: "Cho phép sửa sau phản hồi",
        summary:
          "Biến lỗi thành đầu vào của học tập thay vì chỉ là phần điểm bị mất.",
      },
      {
        title: "Theo dõi người bị bỏ lại",
        summary:
          "Không để điểm trung bình đẹp che số người không còn theo được quá trình.",
      },
    ],
    relatedCaseSlugs: ["diem-so-co-dinh-nghia-con-nguoi", "phat-trien-nhung-bo-quen-con-nguoi"],
  },
  {
    slug: "khac-biet-the-he",
    category: "community-society",
    title: "Khi các thế hệ hiểu khác nhau về tiến bộ",
    shortPrompt:
      "Người trẻ muốn thay đổi nhanh, người lớn tuổi sợ những giá trị quan trọng bị bỏ lại.",
    context:
      "Trong một hoạt động cộng đồng, nhóm trẻ đề xuất chuyển hoàn toàn sang cách làm mới. Những người lớn tuổi cho rằng thay đổi quá nhanh sẽ làm mất kinh nghiệm và mối liên kết đã duy trì nhiều năm.",
    openingQuestion:
      "Làm sao tạo hướng đi chung khi mỗi thế hệ đang bảo vệ một điều khác nhau?",
    primaryTrace: "dai-doan-ket",
    supportingTrace: "con-nguoi",
    optionalPerspective: [
      "Ưu tiên tốc độ đổi mới",
      "Ưu tiên sự tiếp nối và đồng thuận",
    ],
    reveals: [
      {
        assumption:
          "Muốn tiến bộ thì phải để cách cũ và người bảo vệ nó ở lại phía sau.",
        finding:
          "Một mục tiêu chung có thể quy tụ các lực lượng khác nhau khi điều cần bảo vệ được nói rõ.",
        reframe:
          "Bất đồng thế hệ thường che một điểm chung: cả hai đều muốn cộng đồng tiếp tục có ý nghĩa.",
        evidence: primaryEvidence("dai-doan-ket", 0),
      },
      {
        assumption:
          "Giữ truyền thống nghĩa là từ chối mọi thay đổi về phương pháp.",
        finding:
          "Sự quy tụ rộng cho phép nhiều cách tham gia khi chúng cùng phục vụ một mục tiêu lớn hơn.",
        reframe:
          "Có thể giữ giá trị cốt lõi và thay công cụ, vai trò hoặc nhịp triển khai.",
        evidence: primaryEvidence("dai-doan-ket", 1),
      },
      {
        assumption:
          "Chỉ cần tổ chức một cuộc họp chung là khoảng cách thế hệ sẽ được giải quyết.",
        finding:
          "Đồng thuận cần được chuyển thành trách nhiệm và hành động mà từng nhóm có thể cùng thực hiện.",
        reframe:
          "Hiểu nhau chỉ trở thành thay đổi khi mỗi thế hệ có một phần quyền quyết định và phần việc thật.",
        evidence: primaryEvidence("dai-doan-ket", 2),
      },
    ],
    returnHeading: "Đổi mới mà không cắt đứt sự tiếp nối",
    returnSummary:
      "Tách giá trị cần giữ khỏi phương pháp có thể đổi, thử một phạm vi nhỏ và để cả hai thế hệ cùng đánh giá tác động trước khi mở rộng.",
    presentLenses: [
      {
        title: "Hỏi điều mỗi bên đang bảo vệ",
        summary:
          "Đi qua ngôn ngữ 'cũ' và 'mới' để thấy giá trị, nỗi lo và lợi ích cụ thể.",
      },
      {
        title: "Thử thay đổi ở quy mô nhỏ",
        summary:
          "Tạo bằng chứng thực tế thay vì buộc mọi người đặt niềm tin vào lời hứa.",
      },
      {
        title: "Chia quyền đánh giá kết quả",
        summary:
          "Để cả người đề xuất lẫn người chịu tác động cùng quyết định bước tiếp theo.",
      },
    ],
    relatedCaseSlugs: ["bat-dong-tren-mang", "nguoi-moi-trong-cong-dong"],
  },
  {
    slug: "nguoi-moi-trong-cong-dong",
    category: "community-society",
    title: "Khi người mới luôn đứng ngoài cộng đồng",
    shortPrompt:
      "Cánh cửa mở về hình thức, nhưng mọi quan hệ và quyết định vẫn thuộc về người cũ.",
    context:
      "Một thành viên mới được mời tham gia đầy đủ các buổi gặp, nhưng mọi câu chuyện đều dựa trên kinh nghiệm cũ, các quyết định quan trọng được bàn trước trong nhóm thân quen và ý kiến của người mới hiếm khi được nối tiếp.",
    openingQuestion:
      "Có mặt trong một cộng đồng đã đủ để thật sự thuộc về cộng đồng ấy chưa?",
    primaryTrace: "dai-doan-ket",
    supportingTrace: "con-nguoi",
    optionalPerspective: [
      "Người mới cần tự thích nghi và chứng minh mình",
      "Cộng đồng cần chủ động tạo chỗ tham gia thật",
    ],
    reveals: [
      {
        assumption:
          "Chỉ cần không ai cấm cản thì cộng đồng đã mở với người mới.",
        finding:
          "Sự quy tụ cần một mục tiêu chung mà mỗi người có thể nhìn thấy vị trí của mình trong đó.",
        reframe:
          "Không bị loại trừ chưa đồng nghĩa với được trao một vai trò có ý nghĩa.",
        evidence: primaryEvidence("dai-doan-ket", 0),
      },
      {
        assumption:
          "Người mới phải tự học mọi quy tắc ngầm trước khi được tin tưởng.",
        finding:
          "Một tập hợp rộng cần cách kết nối những người khác nền tảng vào cùng hoạt động chung.",
        reframe:
          "Giải thích bối cảnh và mở đường tham gia là trách nhiệm của cộng đồng, không chỉ bài kiểm tra của người mới.",
        evidence: primaryEvidence("dai-doan-ket", 1),
      },
      {
        assumption:
          "Mời người mới vào nhóm chat và cuộc họp là đủ để tạo cảm giác thuộc về.",
        finding:
          "Đồng thuận trở nên thật khi được chuyển thành quyền tham gia và trách nhiệm cụ thể.",
        reframe:
          "Cảm giác thuộc về xuất hiện khi đóng góp của người mới làm thay đổi một phần kết quả chung.",
        evidence: primaryEvidence("dai-doan-ket", 2),
      },
    ],
    returnHeading: "Biến lời chào thành một vị trí thật",
    returnSummary:
      "Cộng đồng cần người giới thiệu bối cảnh, một phần việc có chủ quyền và một không gian nơi ý kiến mới được phản hồi thay vì chỉ được nghe lịch sự.",
    presentLenses: [
      {
        title: "Giải thích lịch sử và quy tắc ngầm",
        summary:
          "Không để người mới phải đoán các mối quan hệ và cách quyết định được hình thành.",
      },
      {
        title: "Trao một phần việc có quyền quyết định",
        summary:
          "Để người mới tạo dấu ấn thật thay vì chỉ hỗ trợ việc đã được định sẵn.",
      },
      {
        title: "Nối ý kiến với hành động",
        summary:
          "Phản hồi điều gì được dùng, điều gì chưa phù hợp và vì sao.",
      },
    ],
    relatedCaseSlugs: ["khac-biet-the-he", "thanh-vien-yeu-bi-bo-lai"],
  },
  {
    slug: "muc-tieu-chung-khi-loi-ich-khac-nhau",
    category: "community-society",
    title: "Tìm mục tiêu chung khi lợi ích khác nhau",
    shortPrompt:
      "Các nhóm đều muốn giải quyết vấn đề, nhưng mỗi nhóm sẽ chịu lợi ích và chi phí khác nhau.",
    context:
      "Một dự án cộng đồng được nhiều bên ủng hộ về nguyên tắc. Tuy nhiên, nhóm hưởng lợi nhiều nhất muốn triển khai nhanh, nhóm chịu chi phí lo mất quyền lợi, còn nhóm thực hiện cần thêm nguồn lực mới có thể cam kết.",
    openingQuestion:
      "Mục tiêu chung phải được xây thế nào để không chỉ là khẩu hiệu của bên mạnh hơn?",
    primaryTrace: "dai-doan-ket",
    supportingTrace: "dao-duc-trach-nhiem",
    optionalPerspective: [
      "Chốt theo lợi ích của số đông để hành động sớm",
      "Tiếp tục thương lượng đến khi các nhóm chịu chi phí có tiếng nói thật",
    ],
    reveals: [
      {
        assumption:
          "Các bên cùng nói muốn giải quyết vấn đề thì đã có mục tiêu chung.",
        finding:
          "Mục tiêu chung cần quy tụ lợi ích khác nhau quanh một hướng mà các bên thực sự có thể tham gia.",
        reframe:
          "Cùng dùng một câu khẩu hiệu không bảo đảm mọi người đang hiểu cùng một kết quả.",
        evidence: primaryEvidence("dai-doan-ket", 0),
      },
      {
        assumption:
          "Bên đông hơn có thể tự xác định điều gì là lợi ích chung.",
        finding:
          "Sức mạnh quy tụ đến từ khả năng mở rộng sự tham gia, đặc biệt với những lực lượng có vị trí và nhu cầu khác nhau.",
        reframe:
          "Số đông có thể quyết định, nhưng mục tiêu chỉ thực sự chung khi chi phí của thiểu số được nhìn thấy và xử lý.",
        evidence: primaryEvidence("dai-doan-ket", 1),
      },
      {
        assumption:
          "Đạt đồng thuận về nguyên tắc là đủ để dự án tự vận hành.",
        finding:
          "Đồng thuận cần được chuyển thành phân công, nguồn lực và hành động cụ thể.",
        reframe:
          "Một mục tiêu không có người chịu trách nhiệm và nguồn lực đi kèm chỉ trì hoãn xung đột sang giai đoạn thực hiện.",
        evidence: primaryEvidence("dai-doan-ket", 2),
      },
    ],
    returnHeading: "Biến mục tiêu chung thành một thỏa thuận có thể thực hiện",
    returnSummary:
      "Nói rõ lợi ích, chi phí và điều mỗi bên phải đóng góp. Chỉ gọi là mục tiêu chung khi các nhóm chịu tác động cũng có vai trò trong cách triển khai.",
    presentLenses: [
      {
        title: "Lập bản đồ lợi ích và chi phí",
        summary:
          "Không chỉ hỏi ai hưởng lợi; hỏi ai trả thời gian, nguồn lực và rủi ro.",
      },
      {
        title: "Trao tiếng nói cho bên chịu tác động",
        summary:
          "Đưa họ vào quá trình thiết kế, không chỉ xin ý kiến khi phương án đã gần chốt.",
      },
      {
        title: "Gắn mục tiêu với nguồn lực",
        summary:
          "Chỉ cam kết phần việc khi đã rõ người làm, thời gian và hỗ trợ cần thiết.",
      },
    ],
    relatedCaseSlugs: ["chia-se-tai-nguyen-khan-hiem", "loi-ich-ca-nhan-va-tap-the"],
  },
  {
    slug: "phat-trien-nhung-bo-quen-con-nguoi",
    category: "community-society",
    title: "Phát triển nhưng bỏ quên con người",
    shortPrompt:
      "Các chỉ số tốt lên nhanh, trong khi một số người phải chịu điều kiện sống và làm việc tệ hơn.",
    context:
      "Một thay đổi giúp dự án phục vụ được nhiều người hơn và giảm chi phí tổng thể. Tuy vậy, nhóm vận hành phải làm việc căng hơn, một số người dùng cũ khó tiếp cận và những tác động này không xuất hiện trong báo cáo thành tích.",
    openingQuestion:
      "Một kết quả được gọi là phát triển nếu những người tạo ra hoặc chịu tác động đang bị bỏ lại?",
    primaryTrace: "con-nguoi",
    supportingTrace: "dao-duc-trach-nhiem",
    optionalPerspective: [
      "Ưu tiên lợi ích tổng thể rồi khắc phục tác động sau",
      "Điều chỉnh tốc độ để bảo vệ những người chịu chi phí",
    ],
    reveals: [
      {
        assumption:
          "Chỉ cần tổng lợi ích tăng thì thiệt hại của một nhóm nhỏ là chấp nhận được.",
        finding:
          "Quyền và phẩm giá con người đặt giới hạn cho cách một kết quả chung được tạo ra.",
        reframe:
          "Số đông hưởng lợi không tự động làm mọi chi phí đặt lên thiểu số trở nên chính đáng.",
        evidence: primaryEvidence("con-nguoi", 0),
      },
      {
        assumption:
          "Con người sẽ tự thích nghi nếu thay đổi đủ hiệu quả và không thể đảo ngược.",
        finding:
          "Phát triển cần bồi dưỡng khả năng của con người để họ tham gia vào điều kiện mới.",
        reframe:
          "Đào tạo và thời gian chuyển tiếp không phải chi phí phụ; chúng là một phần của thiết kế phát triển.",
        evidence: primaryEvidence("con-nguoi", 1),
      },
      {
        assumption:
          "Các chỉ số đầu ra đủ để kết luận một chính sách hay dự án thành công.",
        finding:
          "Con người vừa là mục tiêu vừa là động lực, nên chất lượng đời sống và khả năng đóng góp phải nằm trong cách đo kết quả.",
        reframe:
          "Phát triển không chỉ hỏi tạo ra bao nhiêu, mà còn hỏi con người sống và tham gia thế nào sau thay đổi.",
        evidence: primaryEvidence("con-nguoi", 2),
      },
    ],
    returnHeading: "Đặt con người vào ngay trong thước đo phát triển",
    returnSummary:
      "Bổ sung dữ kiện về người chịu tác động, thiết kế hỗ trợ chuyển tiếp và sẵn sàng điều chỉnh mục tiêu nếu kết quả đẹp được tạo bằng sự kiệt sức hoặc loại trừ.",
    presentLenses: [
      {
        title: "Đo tác động phân bổ",
        summary:
          "Tách dữ liệu theo nhóm để thấy ai được lợi, ai chịu chi phí và ai không tiếp cận được.",
      },
      {
        title: "Thiết kế giai đoạn chuyển tiếp",
        summary:
          "Cho thời gian, đào tạo và kênh hỗ trợ trước khi yêu cầu mọi người theo cách mới.",
      },
      {
        title: "Cho phép điều chỉnh mục tiêu",
        summary:
          "Không giữ một chỉ số đẹp nếu bằng chứng cho thấy con người đang bị tổn hại rõ ràng.",
      },
    ],
    relatedCaseSlugs: ["giao-duc-vi-thanh-tich", "trach-nhiem-truoc-van-de-chung"],
  },
  {
    slug: "trach-nhiem-truoc-van-de-chung",
    category: "community-society",
    title: "Khi ai cũng chờ người khác hành động",
    shortPrompt:
      "Mọi người đều đồng ý vấn đề quan trọng, nhưng không ai thấy mình là người phải bắt đầu.",
    context:
      "Một vấn đề chung đã được nhắc nhiều lần và ai cũng cho rằng cần giải quyết. Tuy nhiên, mỗi người đều có lý do hợp lý để chờ người có quyền hơn, có thời gian hơn hoặc liên quan trực tiếp hơn hành động trước.",
    openingQuestion:
      "Trách nhiệm chung bắt đầu từ đâu khi không ai được chỉ định chịu trách nhiệm riêng?",
    primaryTrace: "dao-duc-trach-nhiem",
    supportingTrace: "dai-doan-ket",
    optionalPerspective: [
      "Chờ người có thẩm quyền đứng ra tổ chức",
      "Bắt đầu một hành động nhỏ trong phạm vi của mình",
    ],
    reveals: [
      {
        assumption:
          "Không được giao nhiệm vụ thì không thể bị xem là thiếu trách nhiệm.",
        finding:
          "Tư cách và trách nhiệm thể hiện ở khả năng tự nhận ra phần việc mình có thể làm, không chỉ chờ mệnh lệnh.",
        reframe:
          "Một vấn đề chung tồn tại lâu thường vì từng người chỉ nhìn vào phần trách nhiệm chưa được giao cho mình.",
        evidence: primaryEvidence("dao-duc-trach-nhiem", 0),
      },
      {
        assumption:
          "Một hành động nhỏ không thay đổi được vấn đề lớn nên bắt đầu cũng vô ích.",
        finding:
          "Sửa lối làm việc bắt đầu từ việc nhìn thẳng vào điểm có thể thay đổi và tổ chức lại hành động cụ thể.",
        reframe:
          "Hành động đầu tiên không cần giải quyết toàn bộ; nó cần làm trách nhiệm trở nên nhìn thấy và có thể nối tiếp.",
        evidence: primaryEvidence("dao-duc-trach-nhiem", 1),
      },
      {
        assumption:
          "Khi nhiều người cùng liên quan, trách nhiệm của từng người tự nhiên nhỏ đi.",
        finding:
          "Đạo đức và trách nhiệm cần trở thành chuẩn mực tự thân, rồi mới có thể tạo sức mạnh tập thể.",
        reframe:
          "Trách nhiệm chung không chia nhỏ đến mức biến mất; nó cần được chuyển thành phần việc có tên và người nhận.",
        evidence: primaryEvidence("dao-duc-trach-nhiem", 2),
      },
    ],
    returnHeading: "Biến sự đồng ý thành người bắt đầu",
    returnSummary:
      "Chọn một bước nhỏ trong phạm vi của bạn, gọi tên người cần phối hợp và đặt thời điểm kiểm tra lại. Hành động đầu tiên nên làm đường cho người khác tham gia.",
    presentLenses: [
      {
        title: "Chọn phần mình kiểm soát được",
        summary:
          "Bắt đầu bằng thông tin, kết nối hoặc công việc cụ thể thay vì đợi toàn bộ quyền lực.",
      },
      {
        title: "Mời một người cùng chịu trách nhiệm",
        summary:
          "Biến vấn đề từ lời than phiền chung thành một cam kết giữa những người có tên.",
      },
      {
        title: "Đặt mốc hành động gần",
        summary:
          "Chốt một việc có thể hoàn thành sớm để tạo bằng chứng rằng vấn đề đang dịch chuyển.",
      },
    ],
    relatedCaseSlugs: ["ky-luat-va-long-tin", "muc-tieu-chung-khi-loi-ich-khac-nhau"],
  },
] as const satisfies readonly ThoughtCase[];
