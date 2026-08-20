"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { normalizeCaseSearchValue } from "@/lib/thought-case-search";
import {
  CASE_CATEGORIES,
  CASE_CATEGORY_LABELS,
  type CaseCategory,
  type ThoughtCasePreview,
} from "@/types/thought-case";

interface CaseLibraryFiltersProps {
  readonly previews: readonly ThoughtCasePreview[];
}

type ActiveCategory = CaseCategory | "all";

export function CaseLibraryFilters({ previews }: CaseLibraryFiltersProps) {
  const [activeCategory, setActiveCategory] =
    useState<ActiveCategory>("all");
  const [query, setQuery] = useState("");
  const normalizedQuery = normalizeCaseSearchValue(query.trim());

  const filteredPreviews = useMemo(
    () =>
      previews.filter((item) => {
        const matchesCategory =
          activeCategory === "all" || item.category === activeCategory;
        const searchCorpus = normalizeCaseSearchValue(
          `${item.title} ${item.shortPrompt} ${CASE_CATEGORY_LABELS[item.category]}`,
        );

        return matchesCategory && searchCorpus.includes(normalizedQuery);
      }),
    [activeCategory, normalizedQuery, previews],
  );

  return (
    <div className="case-library">
      <div className="case-library__tools">
        <div
          aria-label="Lọc hồ sơ theo chủ đề"
          className="case-library__categories"
          role="group"
        >
          <button
            aria-pressed={activeCategory === "all"}
            className="case-library__category-pill case-library__category-all"
            onClick={() => setActiveCategory("all")}
            type="button"
          >
            Tất cả ({previews.length})
          </button>

          {CASE_CATEGORIES.map((category) => {
            const count = previews.filter((p) => p.category === category).length;
            return (
              <button
                aria-pressed={activeCategory === category}
                className="case-library__category-pill"
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {CASE_CATEGORY_LABELS[category]} ({count})
              </button>
            );
          })}
        </div>

        <div className="case-library__search">
          <label htmlFor="case-search">
            <span className="case-library__search-icon" aria-hidden="true">🔍</span>
            <span>Tìm tình huống</span>
          </label>
          <input
            id="case-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Nhập từ khóa (ví dụ: deadline, trách nhiệm, điểm số, tập thể...)"
            type="search"
            value={query}
          />
        </div>

      </div>

      <div className="case-library__meta-bar">
        <p aria-live="polite" className="case-library__count">
          Đang hiển thị <strong>{filteredPreviews.length}</strong> / {previews.length} hồ sơ tư tưởng
        </p>
      </div>

      {filteredPreviews.length ? (
        <div className="case-library__grid">
          {filteredPreviews.map((item, index) => {
            const caseNumber = String(index + 1).padStart(2, "0");
            return (
              <article className="case-card" key={item.slug}>
                <Link className="case-card__link" href={`/ho-so/${item.slug}`}>
                  <div className="case-card__header">
                    <span className="case-card__badge">
                      {CASE_CATEGORY_LABELS[item.category]}
                    </span>
                    <span className="case-card__number">#{caseNumber}</span>
                  </div>

                  <div className="case-card__body">
                    <h3 className="case-card__title">{item.title}</h3>
                    <p className="case-card__prompt">{item.shortPrompt}</p>
                  </div>

                  <div className="case-card__footer">
                    <span className="case-card__action">Mở hồ sơ & liên hệ thực tiễn</span>
                    <span className="case-card__arrow" aria-hidden="true">
                      →
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="case-library__empty">
          <p className="case-library__empty-title">Không tìm thấy hồ sơ phù hợp</p>
          <p className="case-library__empty-desc">
            Hãy thử tìm kiếm với từ khóa khác hoặc bấm nút &quot;Tất cả&quot; để xem toàn bộ 30 hồ sơ.
          </p>
          <button
            className="case-library__empty-btn"
            onClick={() => {
              setActiveCategory("all");
              setQuery("");
            }}
            type="button"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      )}
    </div>
  );
}

