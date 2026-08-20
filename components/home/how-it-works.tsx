import { Reveal } from "@/components/home/reveal";


interface StepItem {
  readonly number: string;
  readonly icon: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
}

const STEPS: readonly StepItem[] = [
  {
    number: "01",
    icon: "📌",
    title: "Chọn một trăn trở",
    subtitle: "VẤN ĐỀ THỰC TẾ 2026",
    description:
      "Bắt đầu từ những xung đột nhóm, áp lực tiến độ, sự hoài nghi bản thân hay trách nhiệm tập thể trong học tập và công việc hôm nay.",
  },
  {
    number: "02",
    icon: "⏳",
    title: "Ngược dòng lịch sử",
    subtitle: "03 DẤU VẾT XÁC THỰC",
    description:
      "Theo chân các mốc lịch sử xác thực (1930, 1941, 1945...) để chứng kiến Chủ tịch Hồ Chí Minh đã đối diện và đúc kết tư tưởng ra sao.",
  },
  {
    number: "03",
    icon: "💡",
    title: "Nhận gợi ý áp dụng",
    subtitle: "03 LĂNG KÍNH THỰC HÀNH",
    description:
      "Trở lại năm 2026 với những bài học cốt lõi, tấm thẻ bưu thiếp danh ngôn và 3 giải pháp thực tiễn có thể vận dụng ngay lập tức.",
  },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works-heading" className="how-it-works">
      <div className="site-container">
        <Reveal>
          <div className="how-it-works__header">
            <div className="section-pill">HƯỚNG DẪN TRẢI NGHIỆM</div>
            <h2 className="how-it-works__title" id="how-it-works-heading">
              Cách Đuốc Hồng đồng hành cùng bạn trong 2 phút
            </h2>
            <p className="how-it-works__desc">
              Một hành trình tương tác ngắn gọn, không áp đặt đáp án đúng sai, giúp bạn kết nối lịch sử với những quyết định thực tế hàng ngày.
            </p>
          </div>
        </Reveal>

        <div className="how-it-works__grid">
          {STEPS.map((step, index) => (
            <Reveal delay={index * 0.1} key={step.number}>
              <div className="how-it-works__card">
                <div className="how-it-works__card-header">
                  <span className="how-it-works__icon" aria-hidden="true">
                    {step.icon}
                  </span>
                  <span className="how-it-works__number">BƯỚC {step.number}</span>
                </div>
                <div className="how-it-works__card-body">
                  <span className="how-it-works__subtitle">{step.subtitle}</span>
                  <h3 className="how-it-works__card-title">{step.title}</h3>
                  <p className="how-it-works__card-desc">{step.description}</p>
                </div>
                <div className="how-it-works__step-connector" aria-hidden="true" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
