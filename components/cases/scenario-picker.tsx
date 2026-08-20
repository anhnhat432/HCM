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
      <ol aria-live="polite" className="scenario-picker__ledger">
        {visiblePreviews.map((item, index) => {
          const itemNumber = String(page * VISIBLE_CASE_COUNT + index + 1).padStart(2, "0");
          return (
            <li className="scenario-picker__row" key={item.slug}>
              <Link className="scenario-picker__link" href={`/ho-so/${item.slug}`}>
                <div className="scenario-picker__meta">
                  <span className="scenario-picker__number">{itemNumber}</span>
                  <span className="scenario-picker__category">
                    {CASE_CATEGORY_LABELS[item.category]}
                  </span>
                </div>
                <div className="scenario-picker__body">
                  <strong className="scenario-picker__title">{item.title}</strong>
                  <p className="scenario-picker__prompt">{item.shortPrompt}</p>
                </div>
                <div className="scenario-picker__action">
                  <span className="scenario-picker__action-label">Mở hồ sơ</span>
                  <span className="scenario-picker__arrow" aria-hidden="true">
                    →
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>

      <div className="scenario-picker__actions">
        <button className="scenario-picker__btn-refresh" onClick={showNextPage} type="button">
          <span className="scenario-picker__icon-spin" aria-hidden="true">↻</span>
          <span>Đổi tình huống</span>
        </button>
        <Link className="scenario-picker__btn-all" href="/ho-so">
          <span>Xem trọn bộ 30 hồ sơ</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}

