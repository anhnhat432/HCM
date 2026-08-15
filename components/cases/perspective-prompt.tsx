"use client";

import { useState } from "react";

interface PerspectivePromptProps {
  readonly perspectives: readonly [string, string];
}

export function PerspectivePrompt({ perspectives }: PerspectivePromptProps) {
  const [selectedPerspective, setSelectedPerspective] = useState<string | null>(
    null,
  );

  return (
    <div className="perspective-prompt">
      <p className="perspective-prompt__label">
        Nếu muốn, hãy chọn góc nhìn gần với phản ứng đầu tiên của bạn.
      </p>
      <div
        aria-label="Chọn một góc nhìn ban đầu"
        className="perspective-prompt__choices"
        role="group"
      >
        {perspectives.map((perspective) => (
          <button
            aria-pressed={selectedPerspective === perspective}
            key={perspective}
            onClick={() => setSelectedPerspective(perspective)}
            type="button"
          >
            <span aria-hidden="true" />
            {perspective}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="perspective-prompt__status">
        {selectedPerspective
          ? `Bạn đang nhìn tình huống từ góc: ${selectedPerspective}`
          : "Không cần chọn để tiếp tục đọc hồ sơ."}
      </p>
      {selectedPerspective ? (
        <button
          className="perspective-prompt__clear"
          onClick={() => setSelectedPerspective(null)}
          type="button"
        >
          Bỏ lựa chọn
        </button>
      ) : null}
    </div>
  );
}
