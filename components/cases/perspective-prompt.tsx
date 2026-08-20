"use client";

import Link from "next/link";
import { useState } from "react";

import { getCaseStageHref } from "@/lib/thought-case-journey";

interface PerspectivePromptProps {
  readonly perspectives: readonly [string, string];
  readonly slug: string;
  readonly initialPerspective?: string | null;
}

export function PerspectivePrompt({
  perspectives,
  slug,
  initialPerspective = null,
}: PerspectivePromptProps) {
  const defaultIndex = initialPerspective !== null && initialPerspective !== undefined
    ? Number.parseInt(initialPerspective, 10)
    : null;

  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    defaultIndex !== null && !Number.isNaN(defaultIndex) && defaultIndex >= 0 && defaultIndex < perspectives.length
      ? defaultIndex
      : null,
  );

  const selectedText = selectedIndex !== null ? perspectives[selectedIndex] : null;

  return (
    <div className="perspective-prompt">
      <p className="perspective-prompt__label">
        Hãy chọn góc nhìn gần nhất với phản xạ tự nhiên của bạn:
      </p>
      <div
        aria-label="Chọn một góc nhìn ban đầu"
        className="perspective-prompt__choices"
        role="group"
      >
        {perspectives.map((perspective, index) => {
          const isSelected = selectedIndex === index;
          return (
            <button
              aria-pressed={isSelected}
              className={`perspective-prompt__button ${isSelected ? "perspective-prompt__button--active" : ""}`}
              key={perspective}
              onClick={() => setSelectedIndex(index)}
              type="button"
            >
              <span aria-hidden="true" className="perspective-prompt__indicator" />
              <span className="perspective-prompt__text">{perspective}</span>
            </button>
          );
        })}
      </div>

      <div aria-live="polite" className="perspective-prompt__status">
        {selectedText ? (
          <div className="perspective-prompt__active-state">
            <p>
              💡 <strong>Góc nhìn bạn chọn:</strong> “{selectedText}”
            </p>
            <p className="perspective-prompt__hint">
              Hãy cùng ngược dòng lịch sử để xem các quyết sách của Chủ tịch Hồ Chí Minh đối thoại và mở rộng góc nhìn này như thế nào.
            </p>
            <div className="perspective-prompt__actions">
              <Link
                className="primary-action perspective-prompt__cta"
                href={getCaseStageHref(slug, "dau-vet", selectedIndex)}
              >
                <span>Xem 3 mốc lịch sử với góc nhìn này</span>
                <span aria-hidden="true">→</span>
              </Link>
              <button
                className="perspective-prompt__clear"
                onClick={() => setSelectedIndex(null)}
                type="button"
              >
                Chọn lại
              </button>
            </div>
          </div>
        ) : (
          <p className="perspective-prompt__neutral">
            Không bắt buộc — bạn có thể chọn một góc nhìn ở trên để cá nhân hóa hành trình, hoặc tiếp tục xem ngay bên dưới.
          </p>
        )}
      </div>
    </div>
  );
}
