"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type { SourceDrawerDetails } from "@/lib/trace-sources";
import type { TraceImageUsageStatus } from "@/types/trace";

interface SourceDrawerProps {
  readonly details: SourceDrawerDetails;
}

const usageLabels: Record<TraceImageUsageStatus, string> = {
  licensed: "Đã ghi nhận giấy phép",
  approved: "Đã được duyệt sử dụng",
  "needs-review": "Cần rà soát quyền sử dụng",
  "not-applicable": "Không áp dụng",
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function SourceDrawer({ details }: SourceDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const titleId = useId();
  const verificationId = useId();

  const closeDrawer = (restoreFocus = true) => {
    setIsOpen(false);

    if (restoreFocus) {
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    }
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus());

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDrawer();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handlePanelKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Tab") {
      return;
    }

    const focusable = Array.from(
      panelRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
    );

    if (!focusable.length) {
      event.preventDefault();
      panelRef.current?.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const drawer = isOpen ? (
    <div
      className="source-drawer__overlay"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) {
          closeDrawer();
        }
      }}
    >
      <aside
        aria-describedby={verificationId}
        aria-labelledby={titleId}
        aria-modal="true"
        className="source-drawer"
        onKeyDown={handlePanelKeyDown}
        ref={panelRef}
        role="dialog"
        tabIndex={-1}
      >
        <header className="source-drawer__header">
          <p>Nguồn & kiểm chứng</p>
          <button
            aria-label="Đóng nguồn và kiểm chứng"
            className="source-drawer__close"
            onClick={() => closeDrawer()}
            ref={closeRef}
            type="button"
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <div className="source-drawer__body">
          <div className="source-drawer__event">
            <time dateTime={details.year}>{details.year}</time>
            <h2 id={titleId}>{details.title}</h2>
          </div>

          <section aria-labelledby={`${verificationId}-heading`}>
            <h3 id={`${verificationId}-heading`}>Kiểm chứng</h3>
            <p id={verificationId}>{details.verification}</p>
          </section>

          <section aria-labelledby={`${titleId}-sources`}>
            <h3 id={`${titleId}-sources`}>Nguồn nội dung</h3>
            <ol className="source-drawer__sources">
              {details.sources.map((source) => (
                <li key={source.url}>
                  <a
                    className="trace-source-link source-drawer__link"
                    href={source.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span>{source.title}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ol>
          </section>

          {details.image ? (
            <section aria-labelledby={`${titleId}-image`}>
              <h3 id={`${titleId}-image`}>Ảnh tư liệu</h3>
              <dl className="source-drawer__image-details">
                {details.image.caption ? (
                  <>
                    <dt>Chú thích</dt>
                    <dd>{details.image.caption}</dd>
                  </>
                ) : null}
                <dt>Nguồn ảnh</dt>
                <dd>
                  {details.image.sourceUrl ? (
                    <a
                      href={details.image.sourceUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {details.image.credit} <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    details.image.credit
                  )}
                </dd>
                {details.image.license ? (
                  <>
                    <dt>Giấy phép</dt>
                    <dd>{details.image.license}</dd>
                  </>
                ) : null}
                <dt>Trạng thái sử dụng</dt>
                <dd>{usageLabels[details.image.usageStatus]}</dd>
              </dl>
            </section>
          ) : null}
        </div>
      </aside>
    </div>
  ) : null;

  return (
    <>
      <button
        aria-haspopup="dialog"
        aria-label={`Nguồn và kiểm chứng cho ${details.title}, ${details.year}`}
        className="source-drawer-trigger"
        onClick={() => setIsOpen(true)}
        ref={triggerRef}
        type="button"
      >
        Nguồn & kiểm chứng <span aria-hidden="true">→</span>
      </button>
      {typeof document !== "undefined" && drawer
        ? createPortal(drawer, document.body)
        : null}
    </>
  );
}
