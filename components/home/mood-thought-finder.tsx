"use client";

import Link from "next/link";
import { useState } from "react";

import { Reveal } from "@/components/home/reveal";


interface MoodOption {
  readonly id: string;
  readonly label: string;
  readonly emoji: string;
  readonly prompt: string;
  readonly targetSlug: string;
  readonly targetTitle: string;
  readonly category: string;
  readonly wisdomTakeaway: string;
}

const MOODS: readonly MoodOption[] = [
  {
    id: "teamwork",
    label: "Bất đồng khi làm việc nhóm",
    emoji: "🤝",
    prompt: "Ai cũng có cái tôi cao, tranh luận gay gắt khiến dự án chung dậm chân tại chỗ.",
    targetSlug: "nhom-gioi-nhung-khong-hop-tac",
    targetTitle: "Nhóm toàn người giỏi nhưng không hợp tác được",
    category: "ĐOÀN KẾT & HỢP TÁC",
    wisdomTakeaway: "Đoàn kết không phải là cào bằng, mà là cùng hướng về mục tiêu lớn hơn cái tôi cá nhân.",
  },
  {
    id: "overload",
    label: "Một người phải gánh hết việc",
    emoji: "⚖️",
    prompt: "Chia việc không đều, người ôm đồm kiệt sức còn người khác ngoài cuộc.",
    targetSlug: "mot-nguoi-ganh-het-cong-viec",
    targetTitle: "Một người gánh hết công việc trong nhóm",
    category: "TỔ CHỨC & TRÁCH NHIỆM",
    wisdomTakeaway: "Lãnh đạo và tổ chức cốt ở phân công đúng người, tin cậy và trao quyền minh bạch.",
  },
  {
    id: "deadline",
    label: "Áp lực chạy deadline & tiến độ",
    emoji: "⏰",
    prompt: "Thời gian gấp gáp, mâu thuẫn cách làm dẫn đến căng thẳng và giảm chất lượng.",
    targetSlug: "bat-dong-khi-chay-deadline",
    targetTitle: "Bất đồng ý kiến khi đang chạy deadline",
    category: "ỨNG BIẾN THỰC TIỄN",
    wisdomTakeaway: "Càng trong lúc gấp rút, càng cần sự bình tĩnh, kỷ luật và thống nhất ưu tiên.",
  },
  {
    id: "self-growth",
    label: "Tự rèn luyện & vượt qua sai sót",
    emoji: "🌱",
    prompt: "Sợ bị đánh giá khi mắc lỗi, ngại nói thẳng điều cần sửa đổi với đồng đội.",
    targetSlug: "tu-phe-binh-khong-ngai-thang-than",
    targetTitle: "Tự phê bình không ngại thẳng thắn",
    category: "CON NGƯỜI & ĐẠO ĐỨC",
    wisdomTakeaway: "Tự phê bình như rửa mặt hàng ngày — dũng cảm nhìn thẳng để ngày càng tiến bộ hơn.",
  },
  {
    id: "integrity",
    label: "Giữ chữ tín & đứng trước lựa chọn khó",
    emoji: "🧭",
    prompt: "Đứng trước cám dỗ đi đường tắt hoặc quên đi cam kết ban đầu.",
    targetSlug: "giu-chu-tin-trong-loi-hua",
    targetTitle: "Giữ chữ tín trong lời hứa và cam kết",
    category: "ĐẠO ĐỨC & TRÁCH NHIỆM",
    wisdomTakeaway: "Chữ tín là danh dự. Lời nói phải đi đôi với việc làm, trước sau như một.",
  },
];

export function MoodThoughtFinder() {
  const [selectedId, setSelectedId] = useState<string>(MOODS[0].id);

  const currentMood = MOODS.find((m) => m.id === selectedId) ?? MOODS[0];

  return (
    <section aria-labelledby="mood-finder-heading" className="mood-finder-section">
      <div className="site-container">
        <Reveal>
          <div className="mood-finder__header">
            <div className="section-pill">TRẮC NGHIỆM TÌNH HUỐNG 1-CHẠM</div>
            <h2 className="mood-finder__title" id="mood-finder-heading">
              Hôm nay bạn đang băn khoăn điều gì nhất?
            </h2>
            <p className="mood-finder__desc">
              Bấm chọn một cảm xúc hoặc vấn đề bạn đang đối mặt để nhận ngay hồ sơ tư tưởng và lời khuyên then chốt.
            </p>
          </div>
        </Reveal>

        <div className="mood-finder__interactive">
          {/* Mood selection buttons */}
          <div
            aria-label="Chọn tình huống bạn đang băn khoăn"
            className="mood-finder__pills"
            role="tablist"
          >
            {MOODS.map((mood) => {
              const isSelected = mood.id === selectedId;
              return (
                <button
                  aria-selected={isSelected}
                  className={`mood-finder__pill ${isSelected ? "mood-finder__pill--active" : ""}`}
                  key={mood.id}
                  onClick={() => setSelectedId(mood.id)}
                  role="tab"
                  type="button"
                >
                  <span className="mood-finder__pill-emoji" aria-hidden="true">
                    {mood.emoji}
                  </span>
                  <span>{mood.label}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Result Card */}
          <div className="mood-finder__result-wrapper">
            <div className="mood-finder__card">
              <div className="mood-finder__card-badge">
                <span>{currentMood.category}</span>
                <span className="mood-finder__card-dot" aria-hidden="true">•</span>
                <span>GỢI Ý PHÙ HỢP NHẤT</span>
              </div>

              <div className="mood-finder__card-content">
                <div className="mood-finder__card-left">
                  <span className="mood-finder__card-prompt-label">TRĂN TRỞ HIỆN TẠI:</span>
                  <p className="mood-finder__card-prompt">“{currentMood.prompt}”</p>
                  <h3 className="mood-finder__card-title">{currentMood.targetTitle}</h3>
                </div>

                <div className="mood-finder__card-divider" aria-hidden="true" />

                <div className="mood-finder__card-right">
                  <span className="mood-finder__card-wisdom-label">💡 GÓC NHÌN ĐÚC KẾT:</span>
                  <p className="mood-finder__card-wisdom">
                    “{currentMood.wisdomTakeaway}”
                  </p>

                  <div className="mood-finder__card-actions">
                    <Link
                      className="mood-finder__card-btn"
                      href={`/ho-so/${currentMood.targetSlug}`}
                    >
                      <span>Mở hành trình khám phá</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
