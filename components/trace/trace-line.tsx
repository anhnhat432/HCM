"use client";

import { motion, useReducedMotion } from "framer-motion";

interface TraceLineProps {
  readonly fromYear: string;
  readonly toYear: string;
  readonly direction: "back" | "return";
  readonly compact?: boolean;
}

const lineEase = [0.25, 0.1, 0.25, 1] as const;

export function TraceLine({
  fromYear,
  toYear,
  direction,
  compact = false,
}: TraceLineProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-label={`Dòng thời gian từ ${fromYear} đến ${toYear}`}
      className={`trace-line trace-line--${direction}${compact ? " trace-line--compact" : ""}`}
      role="img"
    >
      <time className="trace-line__year trace-line__year--from">{fromYear}</time>
      <div className="trace-line__track" aria-hidden="true">
        <motion.span
          className="trace-line__segment trace-line__segment--first"
          initial={{ scaleY: shouldReduceMotion ? 1 : 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.72, ease: lineEase }
          }
          viewport={{ once: true, amount: 0.6 }}
          whileInView={{ scaleY: 1 }}
        />
        <motion.span
          className="trace-line__node"
          initial={
            shouldReduceMotion
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.6 }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.32, delay: 0.48, ease: lineEase }
          }
          viewport={{ once: true, amount: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
        />
        <motion.span
          className="trace-line__segment trace-line__segment--second"
          initial={{ scaleY: shouldReduceMotion ? 1 : 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.72, delay: 0.18, ease: lineEase }
          }
          viewport={{ once: true, amount: 0.6 }}
          whileInView={{ scaleY: 1 }}
        />
      </div>
      <motion.time
        className="trace-line__year trace-line__year--to"
        initial={
          shouldReduceMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: direction === "back" ? -8 : 8 }
        }
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 0.5, delay: 0.72, ease: lineEase }
        }
        viewport={{ once: true, amount: 0.6 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        {toYear}
      </motion.time>
    </div>
  );
}
