"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
}

const revealEase = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.58, delay, ease: revealEase }
      }
      viewport={{ once: true, amount: 0.2 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}
