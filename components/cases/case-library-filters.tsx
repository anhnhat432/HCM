"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

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

function normalizeSearchValue(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .toLocaleLowerCase("vi-VN");
}

export function CaseLibraryFilters({ previews }: CaseLibraryFiltersProps) {
  const [activeCategory, setActiveCategory] =
    useState<ActiveCategory>("all");
  const [query, setQuery] = useState("");
  const normalizedQuery = normalizeSearchValue(query.trim());

  const filteredPreviews = useMemo(
    () =>
      previews.filter((item) => {
        const matchesCategory =
          activeCategory === "all" || item.category === activeCategory;
        const searchCorpus = normalizeSearchValue(
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
            onClick={() => setActiveCategory("all")}
            type="button"
          >
            Tất cả
          </button>
          {CASE_CATEGORIES.map((category) => (
            <button
              aria-pressed={activeCategory === category}
              key={category}
              onClick={() => setActiveCategory(category)}
              type="button"
            >
              {CASE_CATEGORY_LABELS[category]}
            </button>
          ))}
        </div>

        <div className="case-library__search">
          <label htmlFor="case-search">Tìm tình huống</label>
          <input
            id="case-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ví dụ: deadline, trách nhiệm, điểm số"
            type="search"
            value={query}
          />
        </div>
      </div>

      <p aria-live="polite" className="case-library__count">
        {filteredPreviews.length} hồ sơ phù hợp
      </p>

      {filteredPreviews.length ? (
        <ol className="case-library__list">
          {filteredPreviews.map((item, index) => (
            <li className="case-library__item" key={item.slug}>
              <Link href={`/ho-so/${item.slug}`}>
                <span className="case-library__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="case-library__copy">
                  <span className="case-library__category">
                    {CASE_CATEGORY_LABELS[item.category]}
                  </span>
                  <strong>{item.title}</strong>
                  <span>{item.shortPrompt}</span>
                </span>
                <span className="case-library__action">
                  Mở hồ sơ <span aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <p className="case-library__empty">
          Chưa có hồ sơ khớp với cách tìm này. Hãy thử một từ khóa hoặc chủ đề
          khác.
        </p>
      )}
    </div>
  );
}
