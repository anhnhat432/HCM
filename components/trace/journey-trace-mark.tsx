"use client";

import { motion, useReducedMotion } from "framer-motion";

const markEase = [0.22, 1, 0.36, 1] as const;

const inputPaths = [
  "M4 28H68C92 28 100 52 120 68",
  "M4 68H120",
  "M4 108H68C92 108 100 84 120 68",
] as const;

const torchPath =
  "M120 68H188V118M174 118H202M188 68C176 57 180 39 194 18C198 38 216 43 211 59C208 70 198 76 188 68Z";

export function JourneyTraceMark() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <figure className="journey-trace-mark" aria-hidden="true">
      <svg fill="none" focusable="false" viewBox="0 0 320 136">
        <g className="journey-trace-mark__guides">
          {inputPaths.map((path) => (
            <path d={path} key={path} />
          ))}
          <path d={torchPath} />
        </g>

        {inputPaths.map((path, index) => (
          <motion.path
            className="journey-trace-mark__input"
            d={path}
            initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
            key={path}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.72, delay: index * 0.08, ease: markEase }
            }
            viewport={{ once: true, amount: 0.45 }}
            whileInView={{ pathLength: 1 }}
          />
        ))}

        <motion.path
          className="journey-trace-mark__torch"
          d={torchPath}
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.88, delay: 0.3, ease: markEase }
          }
          viewport={{ once: true, amount: 0.45 }}
          whileInView={{ pathLength: 1 }}
        />
      </svg>
    </figure>
  );
}
