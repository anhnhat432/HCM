"use client";

import { useState } from "react";

import { QrShareDialog } from "@/components/share/qr-share-dialog";

interface ShareableWisdomCardProps {
  readonly title: string;
  readonly wisdomLines: readonly string[];
  readonly caseSlug: string;
  readonly categoryLabel?: string;
  readonly reframeHeading?: string;
  readonly reframeQuote?: string;
}

export function ShareableWisdomCard({
  title,
  wisdomLines,
  caseSlug,
  categoryLabel = "TƯ TƯỞNG HỒ CHÍ MINH",
  reframeHeading,
  reframeQuote,
}: ShareableWisdomCardProps) {
  const [copied, setCopied] = useState(false);

  const mainQuote = reframeQuote || wisdomLines.join(" ");

  const handleCopyQuote = async () => {
    try {
      const shareContent = reframeHeading
        ? `🔥 ĐUỐC HỒNG — ${title}\n“${reframeHeading}: ${mainQuote}”\n🔗 https://hcm-trace.vercel.app/ho-so/${caseSlug}`
        : `“${mainQuote}”\n— Trích từ Hồ sơ: ${title} (Dự án Đuốc Hồng)\n🔗 https://hcm-trace.vercel.app/ho-so/${caseSlug}`;
      await navigator.clipboard.writeText(shareContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="wisdom-card">
      <div className="wisdom-card__inner">
        {/* Top header with seal */}
        <div className="wisdom-card__header">
          <div className="wisdom-card__stamp" aria-hidden="true">
            <span>🔥</span>
            <span>ĐUỐC HỒNG</span>
            <small>2026</small>
          </div>
          <span className="wisdom-card__category">{categoryLabel}</span>
        </div>

        {/* Quote body */}
        <div className="wisdom-card__body">
          <span className="wisdom-card__quote-mark" aria-hidden="true">“</span>
          <blockquote className="wisdom-card__quote">
            {reframeQuote ? (
              <>
                {reframeHeading ? (
                  <strong className="wisdom-card__reframe-heading">
                    {reframeHeading}
                  </strong>
                ) : null}
                <span className="wisdom-card__reframe-body">{reframeQuote}</span>
              </>
            ) : (
              wisdomLines.map((line) => (
                <span key={line}>{line}</span>
              ))
            )}
          </blockquote>
          <p className="wisdom-card__attribution">
            Hồ sơ: <strong>{title}</strong>
          </p>
        </div>

        {/* Actions bar */}
        <div className="wisdom-card__footer">
          <button
            className={`wisdom-card__copy-btn ${copied ? "wisdom-card__copy-btn--success" : ""}`}
            onClick={handleCopyQuote}
            type="button"
          >
            <span aria-hidden="true">{copied ? "✓" : "📋"}</span>
            <span>{copied ? "Đã sao chép câu đúc kết!" : "Sao chép câu đúc kết"}</span>
          </button>

          <QrShareDialog label={`Chia sẻ thẻ tư tưởng: ${title}`} />
        </div>
      </div>
    </div>
  );
}
