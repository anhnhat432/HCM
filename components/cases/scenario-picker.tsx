"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import {
  CASE_CATEGORY_LABELS,
  type ThoughtCasePreview,
} from "@/types/thought-case";

interface ScenarioPickerProps {
  readonly previews: readonly ThoughtCasePreview[];
}

export const VISIBLE_CASE_COUNT = 3;

export function ScenarioPicker({ previews }: ScenarioPickerProps) {
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(previews.length / VISIBLE_CASE_COUNT));

  const visiblePreviews = useMemo(() => {
    const start = page * VISIBLE_CASE_COUNT;
    return previews.slice(start, start + VISIBLE_CASE_COUNT);
  }, [page, previews]);

  const showNextPage = () => {
    setPage((currentPage) => (currentPage + 1) % pageCount);
  };

  return (
    <div className="scenario-picker">
      <ol aria-live="polite" className="scenario-picker__list">
        {visiblePreviews.map((item, index) => (
          <li key={item.slug}>
            <Link href={`/ho-so/${item.slug}`}>
              <span className="scenario-picker__number">
                {String(page * VISIBLE_CASE_COUNT + index + 1).padStart(2, "0")}
              </span>
              <span className="scenario-picker__copy">
                <span>{CASE_CATEGORY_LABELS[item.category]}</span>
                <strong>{item.title}</strong>
                <span>{item.shortPrompt}</span>
              </span>
              <span className="scenario-picker__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <div className="scenario-picker__actions">
        <button onClick={showNextPage} type="button">
          Đổi tình huống <span aria-hidden="true">↻</span>
        </button>
        <Link href="/ho-so">Xem đủ 30 hồ sơ →</Link>
      </div>
    </div>
  );
}
