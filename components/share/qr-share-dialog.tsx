"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { resolveShareUrl } from "@/lib/share-url";

interface QrShareDialogProps {
  readonly label: string;
}

const focusableSelector = [
  "button:not([disabled])",
  "a[href]",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function copyWithTextarea(value: string): boolean {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  return copied;
}

export function QrShareDialog({ label }: QrShareDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [status, setStatus] = useState("");
  const [canShare, setCanShare] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const titleId = useId();
  const statusId = useId();

  const closeDialog = useCallback((restoreFocus = true) => {
    setIsOpen(false);
    setStatus("");

    if (restoreFocus) {
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }, []);

  const openDialog = () => {
    const canonicalHref = document
      .querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?.getAttribute("href") ?? null;

    setShareUrl(resolveShareUrl(canonicalHref, window.location.href));
    setQrDataUrl("");
    setCanShare(typeof navigator.share === "function");
    setStatus("Đang tạo mã QR…");
    setIsOpen(true);
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
        closeDialog();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeDialog, isOpen]);

  useEffect(() => {
    if (!isOpen || !shareUrl) {
      return;
    }

    let isCurrent = true;

    void import("qrcode")
      .then(({ toDataURL }) =>
        toDataURL(shareUrl, {
          width: 320,
          margin: 2,
          color: {
            dark: "#161616",
            light: "#f3f0e8",
          },
        }),
      )
      .then((dataUrl) => {
        if (isCurrent) {
          setQrDataUrl(dataUrl);
          setStatus("");
        }
      })
      .catch(() => {
        if (isCurrent) {
          setStatus("Không thể tạo mã QR. Bạn vẫn có thể sao chép liên kết.");
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [isOpen, shareUrl]);

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

  const copyLink = async () => {
    if (!shareUrl) {
      return;
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else if (!copyWithTextarea(shareUrl)) {
        throw new Error("copy failed");
      }
      setStatus("Đã sao chép liên kết.");
    } catch {
      setStatus("Không thể tự sao chép. Hãy chọn liên kết hiển thị bên trên.");
    }
  };

  const shareLink = async () => {
    if (!shareUrl || typeof navigator.share !== "function") {
      return;
    }

    try {
      await navigator.share({
        title: document.title,
        text: "Khám phá Đuốc Hồng",
        url: shareUrl,
      });
      setStatus("Đã mở bảng chia sẻ.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      setStatus("Không thể mở bảng chia sẻ. Bạn vẫn có thể sao chép liên kết.");
    }
  };

  const dialog = isOpen ? (
    <div
      className="qr-share__overlay"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) {
          closeDialog();
        }
      }}
    >
      <section
        aria-describedby={statusId}
        aria-labelledby={titleId}
        aria-modal="true"
        className="qr-share__dialog"
        onKeyDown={handlePanelKeyDown}
        ref={panelRef}
        role="dialog"
        tabIndex={-1}
      >
        <header className="qr-share__header">
          <div>
            <p>ĐUỐC HỒNG</p>
            <h2 id={titleId}>Chia sẻ bằng mã QR</h2>
          </div>
          <button
            aria-label="Đóng chia sẻ bằng mã QR"
            className="qr-share__close"
            onClick={() => closeDialog()}
            ref={closeRef}
            type="button"
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <div className="qr-share__body">
          <div className="qr-share__code" aria-live="polite">
            {qrDataUrl ? (
              <Image
                alt={`Mã QR cho ${document.title}`}
                height={256}
                src={qrDataUrl}
                unoptimized
                width={256}
              />
            ) : (
              <span aria-hidden="true" />
            )}
          </div>
          <p className="qr-share__url">{shareUrl}</p>
          <p className="qr-share__status" id={statusId} aria-live="polite">
            {status}
          </p>
        </div>

        <div className="qr-share__actions">
          <button onClick={copyLink} type="button">
            Sao chép liên kết
          </button>
          {canShare ? (
            <button onClick={shareLink} type="button">
              Chia sẻ
            </button>
          ) : null}
        </div>
      </section>
    </div>
  ) : null;

  return (
    <>
      <button
        aria-haspopup="dialog"
        aria-label={label}
        className="qr-share__trigger"
        onClick={openDialog}
        ref={triggerRef}
        type="button"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z" />
          <path d="M14 14h2v2h-2zM18 14h2v6h-2zM14 18h2v2h-2z" />
        </svg>
      </button>
      {typeof document !== "undefined" && dialog
        ? createPortal(dialog, document.body)
        : null}
    </>
  );
}
