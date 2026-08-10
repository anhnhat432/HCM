"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
}

const revealEase = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.58, delay, ease: revealEase }}
      viewport={{ once: true, amount: 0.2 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}
