"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface TraceRevealProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
  readonly image?: boolean;
}

const revealEase = [0.22, 1, 0.36, 1] as const;

export function TraceReveal({
  children,
  className,
  delay = 0,
  image = false,
}: TraceRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        shouldReduceMotion
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: image ? 18 : 0, y: image ? 0 : 20 }
      }
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.62, delay, ease: revealEase }
      }
      viewport={{ once: true, amount: 0.18 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
    >
      {children}
    </motion.div>
  );
}
