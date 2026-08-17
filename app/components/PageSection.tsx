'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface PageSectionProps {
  children: ReactNode;
  variant?: 'white' | 'cream';
  className?: string;
  animate?: boolean;
}

export default function PageSection({
  children,
  variant = 'white',
  className = '',
  animate = true,
}: PageSectionProps) {
  const reduceMotion = useReducedMotion();
  const bg = variant === 'cream' ? 'bg-surface-cream' : 'bg-white';

  if (!animate || reduceMotion) {
    return (
      <section className={`py-16 md:py-24 ${bg} ${className}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">{children}</div>
      </section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`py-16 md:py-24 ${bg} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">{children}</div>
    </motion.section>
  );
}
