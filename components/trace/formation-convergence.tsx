"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

interface FormationConvergenceProps {
  readonly children: ReactNode;
}

export function FormationConvergence({
  children,
}: FormationConvergenceProps) {
  const convergenceRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: convergenceRef,
    offset: ["start 85%", "end 45%"],
  });
  const firstBranch = useTransform(scrollYProgress, [0.02, 0.42], [0, 1]);
  const secondBranch = useTransform(scrollYProgress, [0.2, 0.62], [0, 1]);
  const thirdBranch = useTransform(scrollYProgress, [0.4, 0.8], [0, 1]);
  const mergedLine = useTransform(scrollYProgress, [0.72, 0.96], [0, 1]);

  return (
    <div className="formation-convergence" ref={convergenceRef}>
      <svg
        aria-hidden="true"
        className="formation-convergence__graphic"
        fill="none"
        focusable="false"
        preserveAspectRatio="none"
        viewBox="0 0 56 720"
      >
        <g className="formation-convergence__guides">
          <path d="M4 72C18 72 18 512 28 558" />
          <path d="M4 274C18 274 20 528 28 558" />
          <path d="M4 476C18 476 22 544 28 558" />
          <path d="M28 558V696" />
        </g>
        <motion.path
          className="formation-convergence__branch"
          d="M4 72C18 72 18 512 28 558"
          style={{ pathLength: shouldReduceMotion ? 1 : firstBranch }}
        />
        <motion.path
          className="formation-convergence__branch"
          d="M4 274C18 274 20 528 28 558"
          style={{ pathLength: shouldReduceMotion ? 1 : secondBranch }}
        />
        <motion.path
          className="formation-convergence__branch"
          d="M4 476C18 476 22 544 28 558"
          style={{ pathLength: shouldReduceMotion ? 1 : thirdBranch }}
        />
        <motion.path
          className="formation-convergence__merged"
          d="M28 558V696"
          style={{ pathLength: shouldReduceMotion ? 1 : mergedLine }}
        />
      </svg>

      {children}
    </div>
  );
}
