"use client";

import { motion } from "framer-motion";

const traceEase = [0.22, 1, 0.36, 1] as const;

export function HeroTraceVisual() {
  return (
    <figure
      className="trace-visual"
      aria-label="Sơ đồ hành trình bắt đầu từ năm 2026, quay về quá khứ và trở lại hiện tại"
    >
      <span className="trace-visual__index" aria-hidden="true">
        2026
      </span>

      <svg
        className="trace-visual__line"
        viewBox="0 0 520 620"
        fill="none"
        aria-hidden="true"
      >
        <path
          className="trace-visual__guide"
          d="M112 70V184C112 232 151 271 199 271H354C391 271 421 301 421 338V367C421 410 386 445 343 445H206C154 445 112 487 112 539V558"
        />
        <motion.path
          className="trace-visual__path"
          d="M112 70V184C112 232 151 271 199 271H354C391 271 421 301 421 338V367C421 410 386 445 343 445H206C154 445 112 487 112 539V558"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: traceEase }}
        />
        <circle className="trace-visual__node" cx="112" cy="70" r="6" />
        <circle className="trace-visual__node" cx="421" cy="354" r="6" />
        <circle className="trace-visual__node" cx="112" cy="558" r="6" />
      </svg>

      <div className="trace-visual__label trace-visual__label--present">
        <span>Hiện tại</span>
        <strong>2026</strong>
      </div>

      <div className="trace-visual__label trace-visual__label--past">
        <span>Lần theo</span>
        <strong>03 dấu vết</strong>
      </div>

      <div className="trace-visual__label trace-visual__label--return">
        <span>Trở lại</span>
        <strong>2026</strong>
      </div>

      <figcaption className="sr-only">
        Mỗi hành trình bắt đầu từ một tình huống năm 2026, quay về ba dấu mốc
        lịch sử và trở lại hiện tại.
      </figcaption>
    </figure>
  );
}
