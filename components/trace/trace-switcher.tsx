"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import type { TraceOrder, TraceSlug } from "@/types/trace";

export interface TraceSwitcherItem {
  readonly order: TraceOrder;
  readonly slug: TraceSlug;
  readonly title: string;
}

interface TraceSwitcherProps {
  readonly currentSlug: TraceSlug;
  readonly items: readonly TraceSwitcherItem[];
}

export function TraceSwitcher({ currentSlug, items }: TraceSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const currentItem = items.find((item) => item.slug === currentSlug);
  const chapter = String(currentItem?.order ?? 1).padStart(2, "0");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const focusCurrentItem = window.requestAnimationFrame(() => {
      rootRef.current
        ?.querySelector<HTMLAnchorElement>('[aria-current="page"]')
        ?.focus();
    });

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusCurrentItem);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      return;
    }

    const links = Array.from(
      rootRef.current?.querySelectorAll<HTMLAnchorElement>(
        ".trace-switcher__link",
      ) ?? [],
    );

    if (!links.length) {
      return;
    }

    event.preventDefault();
    const activeIndex = links.indexOf(document.activeElement as HTMLAnchorElement);
    let nextIndex = activeIndex;

    if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = links.length - 1;
    } else if (event.key === "ArrowDown") {
      nextIndex = activeIndex < 0 ? 0 : (activeIndex + 1) % links.length;
    } else {
      nextIndex = activeIndex <= 0 ? links.length - 1 : activeIndex - 1;
    }

    links[nextIndex]?.focus();
  };

  return (
    <div className="trace-switcher" ref={rootRef}>
      <button
        aria-controls={menuId}
        aria-expanded={isOpen}
        className="trace-switcher__trigger"
        onClick={() => setIsOpen((open) => !open)}
        ref={triggerRef}
        type="button"
      >
        <span>{chapter} / 03</span>
        <span aria-hidden="true" className="trace-switcher__chevron">
          ⌄
        </span>
        <span className="sr-only">Chuyển Trace</span>
      </button>

      <nav
        aria-label="Chuyển Trace"
        className="trace-switcher__menu"
        hidden={!isOpen}
        id={menuId}
        onKeyDown={handleMenuKeyDown}
      >
        <ol>
          {items.map((item) => {
            const isCurrent = item.slug === currentSlug;

            return (
              <li key={item.slug}>
                <Link
                  aria-current={isCurrent ? "page" : undefined}
                  className="trace-switcher__link"
                  href={`/trace/${item.slug}`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="trace-switcher__number">
                    {String(item.order).padStart(2, "0")}
                  </span>
                  <span>{item.title}</span>
                  {isCurrent ? (
                    <span className="trace-switcher__current">
                      <span aria-hidden="true">✓</span>
                      <span className="sr-only">Trace hiện tại</span>
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
